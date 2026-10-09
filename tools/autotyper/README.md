# Auto Typer Pro

Programa em Python (Tkinter) que digita automaticamente um texto, simulando o teclado —
útil em editores/sites que bloqueiam o "colar".

## Instalação

```bash
pip install -r requirements.txt
python auto_typer.py
```

Para gerar um `.exe` no Windows: `pip install pyinstaller` e
`pyinstaller --onefile --noconsole auto_typer.py`.

## Como usar

1. Clique em **Colar da área de transferência** (ou digite/cole o texto na caixa).
2. Ajuste o atraso por tecla e a contagem inicial, se quiser.
3. Marque **Remover indentação** se o editor de destino já indenta sozinho
   (caso contrário os espaços ficam duplicados).
4. Pressione **F8** (ou clique em Iniciar) e coloque o cursor no campo de destino
   durante a contagem regressiva.
5. **F9** interrompe a digitação a qualquer momento.

> No macOS é preciso liberar o Terminal/Python em *Ajustes > Privacidade e Segurança >
> Acessibilidade*. No Linux, funciona em X11 (Wayland bloqueia simulação de teclado).
