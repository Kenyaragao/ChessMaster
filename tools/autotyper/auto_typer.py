"""Auto Typer Pro - digita automaticamente o texto colado, simulando o teclado.

Uso:
    pip install pynput
    python auto_typer.py

Atalhos globais (funcionam com qualquer janela em foco):
    F8  - iniciar a digitação (após a contagem regressiva)
    F9  - parar a digitação
"""

import random
import threading
import time
import tkinter as tk
from tkinter import messagebox, ttk

try:
    from pynput import keyboard
except ImportError:  # pragma: no cover - mensagem amigável para o usuário
    raise SystemExit("Instale a dependência primeiro:  pip install pynput")

START_HOTKEY = "<f8>"
STOP_HOTKEY = "<f9>"


class AutoTyper:
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.kb = keyboard.Controller()
        self.stop_event = threading.Event()
        self.worker: threading.Thread | None = None

        root.title("Auto Typer Pro")
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
        self.strip_indent = tk.BooleanVar(value=False)
        ttk.Checkbutton(
            root,
            text="Remover indentação (ative se o editor duplicar os espaços)",
            variable=self.strip_indent,
        ).pack(pady=(0, 6))

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
            START_HOTKEY: lambda: self.root.after(0, self.start),
            STOP_HOTKEY: lambda: self.root.after(0, self.stop),
        })
        self.hotkeys.start()
        root.protocol("WM_DELETE_WINDOW", self.on_close)

    # ------------------------------------------------------------------ ações
    def paste_clipboard(self) -> None:
        try:
            content = self.root.clipboard_get()
        except tk.TclError:
            messagebox.showwarning("Auto Typer Pro", "A área de transferência está vazia.")
            return
        self.text.delete("1.0", "end")
        self.text.insert("1.0", content)

    def clear(self) -> None:
        self.text.delete("1.0", "end")

    def prepared_text(self) -> str:
        content = self.text.get("1.0", "end-1c").replace("\r\n", "\n")
        if self.strip_indent.get():
            content = "\n".join(line.lstrip(" \t") for line in content.split("\n"))
        return content

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

        total = len(content)
        for i, char in enumerate(content, 1):
            if self.stop_event.is_set():
                return self.finish(f"Parado em {i - 1}/{total} caracteres.")
            if char == "\n":
                self.kb.tap(keyboard.Key.enter)
            elif char == "\t":
                self.kb.tap(keyboard.Key.tab)
            else:
                self.kb.type(char)
            if i % 20 == 0:
                self.set_status(f"Digitando... {i}/{total}")
            if delay:
                time.sleep(delay * random.uniform(0.5, 1.5) if humanize else delay)
        self.finish(f"Concluído! {total} caracteres digitados.")

    def set_status(self, msg: str) -> None:
        self.root.after(0, self.status.set, msg)

    def finish(self, msg: str) -> None:
        self.set_status(msg)
        self.root.after(0, lambda: self.start_btn.state(["!disabled"]))

    def on_close(self) -> None:
        self.stop_event.set()
        self.hotkeys.stop()
        self.root.destroy()


def main() -> None:
    root = tk.Tk()
    AutoTyper(root)
    root.mainloop()


if __name__ == "__main__":
    main()
