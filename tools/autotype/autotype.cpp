// autotype.cpp - types the contents of a file into the focused window by
// simulating real keystrokes, so editors that convert pasted tabs to spaces
// (e.g. Avrora) receive genuine Tab key presses instead.
//
// Build:  g++ -o autotype.exe autotype.cpp -static
// Usage:  autotype.exe <file>
//
// Press ESC at any time while typing to abort.

#include <windows.h>
#include <stdio.h>
#include <string>

static const int COUNTDOWN_SECONDS = 5;
static const DWORD KEY_DELAY_MS = 1; // ~1-2ms once the timer resolution is 1ms

// ---------------------------------------------------------------------------
// Timing
// ---------------------------------------------------------------------------

// The default Windows timer tick is ~15.6ms, which would make Sleep(1) far
// slower than intended. timeBeginPeriod lives in winmm.dll; load it at runtime
// so the plain "g++ ... -static" command line works without -lwinmm.
typedef UINT (WINAPI *TimePeriodFn)(UINT);
static TimePeriodFn g_timeEndPeriod = NULL;

static void raiseTimerResolution() {
    HMODULE winmm = LoadLibraryA("winmm.dll");
    if (!winmm) return;
    TimePeriodFn begin = (TimePeriodFn)(void*)GetProcAddress(winmm, "timeBeginPeriod");
    g_timeEndPeriod = (TimePeriodFn)(void*)GetProcAddress(winmm, "timeEndPeriod");
    if (begin) begin(1);
}

static void restoreTimerResolution() {
    if (g_timeEndPeriod) g_timeEndPeriod(1);
}

// ---------------------------------------------------------------------------
// Keyboard input
// ---------------------------------------------------------------------------

static INPUT makeVkInput(WORD vk, bool keyUp) {
    INPUT in;
    ZeroMemory(&in, sizeof(in));
    in.type = INPUT_KEYBOARD;
    in.ki.wVk = vk;
    in.ki.wScan = (WORD)MapVirtualKeyW(vk, MAPVK_VK_TO_VSC);
    in.ki.dwFlags = keyUp ? KEYEVENTF_KEYUP : 0;
    return in;
}

static INPUT makeUnicodeInput(wchar_t ch, bool keyUp) {
    INPUT in;
    ZeroMemory(&in, sizeof(in));
    in.type = INPUT_KEYBOARD;
    in.ki.wVk = 0;
    in.ki.wScan = ch;
    in.ki.dwFlags = KEYEVENTF_UNICODE | (keyUp ? KEYEVENTF_KEYUP : 0);
    return in;
}

static void sendInputs(INPUT* inputs, UINT count) {
    SendInput(count, inputs, sizeof(INPUT));
    Sleep(KEY_DELAY_MS);
}

// Press and release a single virtual key (Tab, Enter, ...).
static void tapVirtualKey(WORD vk) {
    INPUT seq[2] = { makeVkInput(vk, false), makeVkInput(vk, true) };
    sendInputs(seq, 2);
}

// Send one character as Unicode input. This bypasses the keyboard layout
// entirely, so characters like + ^ % ~ ( ) { } [ ] arrive literally and can
// never be interpreted as shortcuts or SendKeys-style escapes.
static void typeUnicodeUnit(wchar_t ch) {
    INPUT seq[2] = { makeUnicodeInput(ch, false), makeUnicodeInput(ch, true) };
    sendInputs(seq, 2);
}

// Type a printable character. Characters that the current layout can produce
// with at most Shift are sent as real key presses (most compatible with
// editors); anything else (AltGr symbols, non-layout characters) falls back
// to Unicode input.
static void typeChar(wchar_t ch) {
    SHORT scan = VkKeyScanW(ch);
    if (scan != -1) {
        WORD vk = LOBYTE(scan);
        BYTE mods = HIBYTE(scan);
        bool needShift = (mods & 1) != 0;
        bool otherMods = (mods & ~1) != 0; // Ctrl / Alt / Hankaku
        if (vk != 0xFF && !otherMods) {
            INPUT seq[4];
            UINT n = 0;
            if (needShift) seq[n++] = makeVkInput(VK_SHIFT, false);
            seq[n++] = makeVkInput(vk, false);
            seq[n++] = makeVkInput(vk, true);
            if (needShift) seq[n++] = makeVkInput(VK_SHIFT, true);
            sendInputs(seq, n);
            return;
        }
    }
    typeUnicodeUnit(ch);
}

// ---------------------------------------------------------------------------
// File loading
// ---------------------------------------------------------------------------

static bool readFile(const char* path, std::string& out) {
    HANDLE h = CreateFileA(path, GENERIC_READ, FILE_SHARE_READ, NULL,
                           OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
    if (h == INVALID_HANDLE_VALUE) return false;

    out.clear();
    char buf[65536];
    DWORD got = 0;
    while (ReadFile(h, buf, sizeof(buf), &got, NULL) && got > 0) {
        out.append(buf, got);
    }
    CloseHandle(h);
    return true;
}

// Decode the file as UTF-8 (stripping a BOM); if it is not valid UTF-8,
// fall back to the system ANSI code page.
static std::wstring decodeText(const std::string& bytes) {
    std::string data = bytes;
    if (data.size() >= 3 && (unsigned char)data[0] == 0xEF &&
        (unsigned char)data[1] == 0xBB && (unsigned char)data[2] == 0xBF) {
        data.erase(0, 3);
    }
    if (data.empty()) return std::wstring();

    UINT codePage = CP_UTF8;
    int len = MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS,
                                  data.data(), (int)data.size(), NULL, 0);
    if (len == 0) {
        codePage = CP_ACP;
        len = MultiByteToWideChar(CP_ACP, 0, data.data(), (int)data.size(), NULL, 0);
    }
    std::wstring text(len, L'\0');
    MultiByteToWideChar(codePage, 0, data.data(), (int)data.size(), &text[0], len);
    return text;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

static bool keyDown(int vk) {
    return (GetAsyncKeyState(vk) & 0x8000) != 0;
}

// True when this process owns its console window, i.e. it was started by
// double-clicking (or drag-and-drop in Explorer) rather than from cmd/PowerShell.
// In that case the window would vanish as soon as we exit.
static bool ownsConsole() {
    DWORD pids[2];
    return GetConsoleProcessList(pids, 2) <= 1;
}

static void waitForEnter() {
    printf("\nPress Enter to close...");
    fflush(stdout);
    int c;
    while ((c = getchar()) != '\n' && c != EOF) {}
}

static void printUsage() {
    printf("autotype - types a file into the active window using real keystrokes\n\n");
    printf("Usage:   autotype.exe <filename>\n");
    printf("Example: autotype.exe cl_base.cpp\n");
    printf("         (or drag a file onto autotype.exe)\n\n");
    printf("After starting, you have %d seconds to click into the target editor.\n",
           COUNTDOWN_SECONDS);
    printf("Tabs are sent as Tab key presses, newlines as Enter.\n");
    printf("Press ESC while typing to abort.\n\n");
}

// Ask for a file path on the console. Paths dragged into the console window
// arrive wrapped in quotes, so strip those and surrounding whitespace.
static std::string promptForPath() {
    printf("File to type (drag it here or type the path), then press Enter:\n> ");
    fflush(stdout);
    char line[MAX_PATH * 2];
    if (!fgets(line, sizeof(line), stdin)) return std::string();
    std::string path = line;
    while (!path.empty() && (path[path.size() - 1] == '\n' || path[path.size() - 1] == '\r' ||
                             path[path.size() - 1] == ' ' || path[path.size() - 1] == '"')) {
        path.erase(path.size() - 1);
    }
    while (!path.empty() && (path[0] == ' ' || path[0] == '"')) path.erase(0, 1);
    return path;
}

static int typeFile(const char* path);

int main(int argc, char* argv[]) {
    bool interactive = ownsConsole();
    int result;

    if (argc >= 2) {
        result = typeFile(argv[1]);
    } else {
        printUsage();
        std::string path;
        if (interactive) path = promptForPath();
        result = path.empty() ? 1 : typeFile(path.c_str());
    }

    if (interactive) waitForEnter();
    return result;
}

static int typeFile(const char* path) {
    std::string bytes;
    if (!readFile(path, bytes)) {
        fprintf(stderr, "Error: cannot open file '%s'\n", path);
        return 1;
    }
    std::wstring text = decodeText(bytes);

    printf("Loaded '%s' (%u characters).\n", path, (unsigned)text.size());
    printf("Click on the target editor window now. Press ESC while typing to abort.\n");
    for (int i = COUNTDOWN_SECONDS; i > 0; --i) {
        printf("Starting in %d...\n", i);
        fflush(stdout);
        Sleep(1000);
    }

    // Don't start while the user is still holding a modifier, otherwise the
    // first keystrokes would turn into shortcuts (Ctrl+S, Alt+F, ...).
    while (keyDown(VK_CONTROL) || keyDown(VK_MENU) || keyDown(VK_SHIFT) ||
           keyDown(VK_LWIN) || keyDown(VK_RWIN)) {
        Sleep(10);
    }

    printf("Typing...\n");
    fflush(stdout);

    raiseTimerResolution();
    GetAsyncKeyState(VK_ESCAPE); // clear the "pressed since last call" bit

    bool aborted = false;
    for (size_t i = 0; i < text.size(); ++i) {
        if (keyDown(VK_ESCAPE)) {
            aborted = true;
            break;
        }

        wchar_t ch = text[i];
        if (ch == L'\r') {
            continue;
        } else if (ch == L'\n') {
            tapVirtualKey(VK_RETURN);
        } else if (ch == L'\t') {
            tapVirtualKey(VK_TAB);
        } else if (ch >= 0xD800 && ch <= 0xDFFF) {
            typeUnicodeUnit(ch); // half of a surrogate pair (emoji etc.)
        } else if (ch < 0x20) {
            continue; // other control characters can't be typed meaningfully
        } else {
            typeChar(ch);
        }
    }

    restoreTimerResolution();

    if (aborted) {
        printf("Aborted.\n");
        return 2;
    }
    printf("Done!\n");
    return 0;
}
