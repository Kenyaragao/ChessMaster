"""Auto Typer Pro - digita automaticamente o texto colado, simulando o teclado.

Uso:
    pip install pynput
    python auto_typer.py

Atalhos globais (funcionam com qualquer janela em foco):
    F8  - iniciar a digitação (após a contagem regressiva)
    F9  - parar a digitação
"""

import faulthandler
import os
import queue
import random
import sys
import threading
import traceback
import time
import tkinter as tk
from tkinter import messagebox, ttk

try:
    from pynput import keyboard
except ImportError:  # pragma: no cover - mensagem amigável para o usuário
    raise SystemExit("Instale a dependência primeiro:  pip install pynput")

if sys.platform == "win32":
    import ctypes
    from ctypes import wintypes

    _INPUT_KEYBOARD = 1
    _KEYEVENTF_KEYUP = 0x0002
    _KEYEVENTF_UNICODE = 0x0004

    class _MOUSEINPUT(ctypes.Structure):
        _fields_ = [("dx", wintypes.LONG), ("dy", wintypes.LONG),
                    ("mouseData", wintypes.DWORD), ("dwFlags", wintypes.DWORD),
                    ("time", wintypes.DWORD), ("dwExtraInfo", ctypes.c_size_t)]

    class _KEYBDINPUT(ctypes.Structure):
        _fields_ = [("wVk", wintypes.WORD), ("wScan", wintypes.WORD),
                    ("dwFlags", wintypes.DWORD), ("time", wintypes.DWORD),
                    ("dwExtraInfo", ctypes.c_size_t)]

    class _HARDWAREINPUT(ctypes.Structure):
        _fields_ = [("uMsg", wintypes.DWORD), ("wParamL", wintypes.WORD),
                    ("wParamH", wintypes.WORD)]

    class _INPUTUNION(ctypes.Union):
        _fields_ = [("mi", _MOUSEINPUT), ("ki", _KEYBDINPUT), ("hi", _HARDWAREINPUT)]

    class _INPUT(ctypes.Structure):
        _fields_ = [("type", wintypes.DWORD), ("u", _INPUTUNION)]

    _SendInput = ctypes.windll.user32.SendInput
    _SendInput.argtypes = (wintypes.UINT, ctypes.POINTER(_INPUT), ctypes.c_int)
    _SendInput.restype = wintypes.UINT

    def send_unicode_char(char: str) -> None:
        """Envia o caractere como Unicode, independente do layout do teclado
        (evita símbolos trocados/perdidos como < > # em teclados ABNT2/russo)."""
        data = char.encode("utf-16-le")
        units = [int.from_bytes(data[i:i + 2], "little") for i in range(0, len(data), 2)]
        inputs = []
        for unit in units:
            for flags in (_KEYEVENTF_UNICODE, _KEYEVENTF_UNICODE | _KEYEVENTF_KEYUP):
                inp = _INPUT(type=_INPUT_KEYBOARD)
                inp.u.ki = _KEYBDINPUT(0, unit, flags, 0, 0)
                inputs.append(inp)
        array = (_INPUT * len(inputs))(*inputs)
        _SendInput(len(inputs), array, ctypes.sizeof(_INPUT))
else:
    send_unicode_char = None

LOG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "auto_typer_erro.log")

INDENT_ADJUST = "Ajustar ao editor (evita espaços acumulados)"
INDENT_KEEP = "Digitar exatamente como está"
INDENT_STRIP = "Remover toda a indentação"

START_HOTKEY = "<f8>"
STOP_HOTKEY = "<f9>"


class AutoTyper:
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.kb = keyboard.Controller()
        self.stop_event = threading.Event()
        self.worker: threading.Thread | None = None
        # O Tkinter só pode ser usado pela thread principal; as outras threads
        # (atalhos e digitação) mandam pedidos por esta fila.
        self.ui_queue: queue.Queue = queue.Queue()

        root.title("Auto Typer Pro v4 (indentação ajustada)")
        root.geometry("560x600")
        root.minsize(420, 420)

        # --- Barra de botões -------------------------------------------------
        top = ttk.Frame(root, padding=(10, 10, 10, 0))
        top.pack(fill="x")
        ttk.Button(top, text="📋 Colar da área de transferência",
                   command=self.paste_clipboard).pack(side="left")
        ttk.Button(top, text="🗑 Limpar", command=self.clear).pack(side="left", padx=6)

        # --- Área de texto ---------------------------------------------------
        text_frame = ttk.Frame(root, padding=10)
        text_frame.pack(fill="both", expand=True)
        self.text = tk.Text(text_frame, wrap="none", undo=True, font=("Consolas", 10))
        yscroll = ttk.Scrollbar(text_frame, orient="vertical", command=self.text.yview)
        xscroll = ttk.Scrollbar(text_frame, orient="horizontal", command=self.text.xview)
        self.text.configure(yscrollcommand=yscroll.set, xscrollcommand=xscroll.set)
        self.text.grid(row=0, column=0, sticky="nsew")
        yscroll.grid(row=0, column=1, sticky="ns")
        xscroll.grid(row=1, column=0, sticky="ew")
        text_frame.rowconfigure(0, weight=1)
        text_frame.columnconfigure(0, weight=1)

        # --- Opções ----------------------------------------------------------
        indent_frame = ttk.Frame(root, padding=(10, 0))
        indent_frame.pack(fill="x", pady=(0, 6))
        ttk.Label(indent_frame, text="Indentação:").pack(side="left")
        self.indent_mode = tk.StringVar(value=INDENT_ADJUST)
        ttk.Combobox(
            indent_frame, textvariable=self.indent_mode, state="readonly", width=48,
            values=(INDENT_ADJUST, INDENT_KEEP, INDENT_STRIP),
        ).pack(side="left", padx=4)

        opts = ttk.Frame(root, padding=(10, 0))
        opts.pack(fill="x")
        ttk.Label(opts, text="Atraso por tecla (ms):").pack(side="left")
        self.delay_ms = tk.IntVar(value=30)
        ttk.Spinbox(opts, from_=0, to=1000, width=5,
                    textvariable=self.delay_ms).pack(side="left", padx=(4, 12))
        ttk.Label(opts, text="Contagem inicial (s):").pack(side="left")
        self.countdown = tk.IntVar(value=3)
        ttk.Spinbox(opts, from_=0, to=30, width=4,
                    textvariable=self.countdown).pack(side="left", padx=4)
        self.humanize = tk.BooleanVar(value=True)
        ttk.Checkbutton(opts, text="Variação humana",
                        variable=self.humanize).pack(side="left", padx=12)

        # --- Iniciar / parar -------------------------------------------------
        actions = ttk.Frame(root, padding=10)
        actions.pack(fill="x")
        self.start_btn = ttk.Button(actions, text="▶ Iniciar (F8)", command=self.start)
        self.start_btn.pack(side="left")
        ttk.Button(actions, text="■ Parar (F9)", command=self.stop).pack(side="left", padx=6)
        self.status = tk.StringVar(value="Pronto. Coloque o cursor no destino e pressione F8.")
        ttk.Label(actions, textvariable=self.status).pack(side="left", padx=10)

        # Atalhos globais (rodam em outra thread -> repassar ao Tk via after)
        self.hotkeys = keyboard.GlobalHotKeys({
            START_HOTKEY: lambda: self.ui_queue.put(self.start),
            STOP_HOTKEY: self.stop_event.set,
        })
        self.hotkeys.start()
        root.report_callback_exception = self.report_error
        self.process_queue()
        root.protocol("WM_DELETE_WINDOW", self.on_close)

    # ------------------------------------------------------------------ ações
    def paste_clipboard(self) -> None:
        try:
            content = self.root.clipboard_get()
        except tk.TclError:
            messagebox.showwarning("Auto Typer Pro",
                                   "A área de transferência está vazia ou não contém texto.")
            return
        self.text.delete("1.0", "end")
        self.text.insert("1.0", content)

    def clear(self) -> None:
        self.text.delete("1.0", "end")

    def prepared_text(self) -> list:
        content = self.text.get("1.0", "end-1c").replace("\r\n", "\n")
        return build_actions(content, self.indent_mode.get())

    def start(self) -> None:
        if self.worker and self.worker.is_alive():
            return
        content = self.prepared_text()
        if not content:
            self.set_status("Nada para digitar.")
            return
        try:
            delay = max(0, int(self.delay_ms.get())) / 1000
            countdown = max(0, int(self.countdown.get()))
        except (tk.TclError, ValueError):
            self.set_status("Valores inválidos nas opções.")
            return
        self.stop_event.clear()
        self.start_btn.state(["disabled"])
        self.worker = threading.Thread(
            target=self.type_text,
            args=(content, delay, countdown, self.humanize.get()),
            daemon=True,
        )
        self.worker.start()

    def stop(self) -> None:
        self.stop_event.set()

    # --------------------------------------------------------- thread de digitação
    def type_text(self, content: str, delay: float, countdown: int, humanize: bool) -> None:
        for remaining in range(countdown, 0, -1):
            if self.stop_event.is_set():
                return self.finish("Cancelado.")
            self.set_status(f"Começando em {remaining}...")
            time.sleep(1)

        try:
            self._type_chars(content, delay, humanize)
        except Exception:
            log_error(traceback.format_exc())
            self.finish(f"Erro durante a digitação (veja {LOG_PATH}).")

    def _type_chars(self, content: list, delay: float, humanize: bool) -> None:
        total = len(content)
        for i, char in enumerate(content, 1):
            if self.stop_event.is_set():
                return self.finish(f"Parado em {i - 1}/{total} teclas.")
            if isinstance(char, keyboard.Key):
                self.kb.tap(char)
            elif char == "\n":
                self.kb.tap(keyboard.Key.enter)
            elif char == "\t":
                self.kb.tap(keyboard.Key.tab)
            elif send_unicode_char is not None:
                send_unicode_char(char)
            else:
                self.kb.type(char)
            if i % 20 == 0:
                self.set_status(f"Digitando... {i}/{total}")
            if delay:
                time.sleep(delay * random.uniform(0.5, 1.5) if humanize else delay)
        self.finish(f"Concluído! {total} teclas enviadas.")

    def set_status(self, msg: str) -> None:
        self.ui_queue.put(lambda: self.status.set(msg))

    def finish(self, msg: str) -> None:
        self.set_status(msg)
        self.ui_queue.put(lambda: self.start_btn.state(["!disabled"]))

    # ------------------------------------------------------ thread principal (Tk)
    def process_queue(self) -> None:
        try:
            while True:
                self.ui_queue.get_nowait()()
        except queue.Empty:
            pass
        self.root.after(50, self.process_queue)

    def report_error(self, *exc_info) -> None:
        text = "".join(traceback.format_exception(*exc_info))
        log_error(text)
        messagebox.showerror("Auto Typer Pro", f"Ocorreu um erro (salvo em {LOG_PATH}):\n\n{text}")

    def on_close(self) -> None:
        self.stop_event.set()
        self.hotkeys.stop()
        self.root.destroy()


def indent_level(line: str, tab_size: int = 4) -> int:
    """Nível de indentação da linha (1 tab ou 4 espaços = 1 nível)."""
    width = 0
    for ch in line:
        if ch == "\t":
            width += tab_size - width % tab_size
        elif ch == " ":
            width += 1
        else:
            break
    return width // tab_size


def build_actions(content: str, mode: str) -> list:
    """Converte o texto na sequência de teclas a enviar.

    No modo "ajustar", parte do princípio de que o editor repete sozinho a
    indentação da linha anterior ao apertar Enter: em vez de digitar a
    indentação inteira, envia só a diferença (Tab para entrar, Backspace
    para voltar). Assim os espaços não se acumulam.
    """
    lines = content.split("\n")
    if mode == INDENT_KEEP:
        return list(content)
    if mode == INDENT_STRIP:
        return list("\n".join(line.lstrip(" \t") for line in lines))

    actions: list = []
    current = 0  # indentação que o editor coloca sozinho após o Enter
    for n, line in enumerate(lines):
        if n:
            actions.append("\n")
        body = line.lstrip(" \t")
        if not body:
            continue  # linha vazia: mantém a indentação automática
        target = indent_level(line)
        if target > current:
            actions.extend([keyboard.Key.tab] * (target - current))
        elif target < current:
            actions.extend([keyboard.Key.backspace] * (current - target))
        current = target
        actions.extend(body)
    return actions


def log_error(text: str) -> None:
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(time.strftime("[%Y-%m-%d %H:%M:%S]\n") + text + "\n")


def main() -> None:
    # Registra até travamentos "duros" (quando a janela fecha sem mensagem).
    crash_log = open(LOG_PATH, "a", encoding="utf-8")
    faulthandler.enable(crash_log)
    root = tk.Tk()
    AutoTyper(root)
    root.mainloop()


if __name__ == "__main__":
    main()
