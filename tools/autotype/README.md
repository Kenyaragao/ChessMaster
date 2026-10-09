# autotype

Types a file into the focused window with simulated keystrokes (Windows `SendInput`),
so editors that convert pasted tabs to spaces (e.g. Avrora) receive real Tab presses.

```
g++ -o autotype.exe autotype.cpp -static
autotype.exe cl_base.cpp
```

Or just drag a file onto `autotype.exe`, or double-click it and drag/type the file
path into the window when asked. When started from Explorer the window stays open
until you press Enter.

- 5-second countdown to click into the target editor, then types the file.
- `\t` → Tab key, `\n` → Enter key, `\r` is skipped.
- Other characters are sent as real key presses when the keyboard layout has them
  (with Shift if needed), otherwise as Unicode input — so `+ ^ % ~ ( ) { } [ ]`
  and non-ASCII text arrive literally.
- ~1–2 ms between keystrokes. Press **ESC** while typing to abort.
- Files are read as UTF-8 (BOM optional), falling back to the ANSI code page.

Tip: turn off the editor's auto-indent and auto-closing of brackets/quotes first,
otherwise the editor adds its own indentation/brackets on top of what is typed.
