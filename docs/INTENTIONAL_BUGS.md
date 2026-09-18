# Intentional Bugs (black-box testing exercise)

> As part of the practical assignment on software testing using the black
> box method, this version of ChessMaster contains **7 intentionally
> seeded bugs**, of different natures, meant to be found by an external
> testing team **without prior knowledge of this list**. This document
> should be kept confidential until the evaluation/final report stage.

Each bug is described as: identifier, location, type, what happens, and
how to detect it (execution conditions / test steps).

---

## BUG-01 — Inverted alpha-beta bound in the AI

- **Location:** `src/ai/engine.ts`, `minimax` function, maximizing branch.
- **Type:** Logic.
- **Description:** When updating the `alpha` bound after evaluating a
  move, the code uses `Math.min(alpha, best)` instead of
  `Math.max(alpha, best)`. This breaks alpha-beta pruning, so the search
  barely prunes any branch and explores close to the full game tree
  instead. Besides making the AI, especially at "Hard" difficulty (deeper
  search), pick clearly bad moves (blunders) even when obviously better
  alternatives exist, the extra nodes searched also make each computer
  move noticeably slow (multiple seconds measured in testing at "Hard",
  even in a desktop browser) — on a phone through Expo Go this can look
  like the app freezing for several seconds while it's the computer's
  turn, since the search runs synchronously on the main thread.
- **Detection:** Play several matches against the computer at "Hard"
  difficulty and check whether it leaves important pieces (queen, rook)
  undefended in simple positions, or plays worse than at "Medium". Also
  time how long the computer takes to reply after an opening move (e.g.
  1.e4) — a noticeable multi-second delay/freeze is this same bug, not a
  separate one.

## BUG-02 — A draw is counted as both a draw and a win

- **Location:** `src/context/ScoreContext.tsx`, `recordResult` function.
- **Type:** Logic.
- **Description:** The condition that increments `wins` also includes the
  `'draw'` result (`result === 'win' || result === 'draw'`), so every
  drawn match adds 1 to the win counter in addition to 1 to the draw
  counter.
- **Detection:** Play against the computer until you draw (for example, by
  stalemate) and compare the "Wins" and "Draws" counters on the home
  screen before and after the match — both go up.

## BUG-03 — Check highlight always points at the white king

- **Location:** `src/screens/GameScreen.tsx`, `findKingSquare` function.
- **Type:** Logic / Interface.
- **Description:** The function takes a `color` parameter, but the
  internal comparison is hardcoded to `cell.color === 'w'`, ignoring that
  parameter. When **Black** is in check, the red "king in check"
  highlight still marks the white king's square (or an irrelevant one)
  instead of the black king's.
- **Detection:** In "Play a Friend" mode, put Black in check and observe
  which square receives the red highlight — it should be the black king's
  square.

## BUG-04 — Language switcher always highlights "EN"

- **Location:** `src/components/LanguageSwitcher.tsx`.
- **Type:** Interface.
- **Description:** The "active" button/text style compares `'en' ===
  option.code` instead of `language === option.code`. The app's text
  changes language normally, but the highlighted button in the switcher
  never reflects the actually selected language (it stays stuck on "EN").
- **Detection:** Switch the language to PT or RU and visually check which
  button in the switcher appears highlighted.

## BUG-05 — The "Resign" button is never translated

- **Location:** `src/screens/GameScreen.tsx`, the resign button.
- **Type:** Interface / Localization.
- **Description:** The button's label is hardcoded as the English string
  `"Resign"` instead of using `t.resign`, so the text never changes even
  when the interface language is switched.
- **Detection:** Switch the language to Portuguese or Russian, start a
  match, and check the resign button's text — it stays in English while
  the other buttons are translated.

## BUG-06 — Swapped difficulty labels in Russian

- **Location:** `src/i18n/translations.ts`, `ru` dictionary.
- **Type:** Data / Translation.
- **Description:** The `easy` and `hard` text values were swapped in the
  Russian dictionary: the button that should read "Лёгкий" (Easy) shows
  "Сложный" (Hard) and vice versa. The difficulty actually applied to the
  match remains correct (only the displayed text is swapped).
- **Detection:** With the language set to Russian, compare the labels
  shown on the difficulty screen with the AI's actual behavior after
  selecting each option.

## BUG-07 — Missing legal-move hint on the last destination square

- **Location:** `src/components/Board.tsx`.
- **Type:** Logic (indexing) / Interface.
- **Description:** When drawing the dots that indicate where a selected
  piece can move, the list of destinations used to draw the dots is
  sliced with `legalTargets.slice(0, -1)`, dropping the last legal
  destination from the list for display purposes only. The move to that
  square is still accepted normally if the player taps it.
- **Detection:** Select a piece with several possible moves (for example,
  a queen in an open position) and check whether some legitimate
  destination — usually the last one computed — receives no hint dot, yet
  still accepts the tap to move the piece there.

---

## Summary by type

| Type | Count | IDs |
|------|-------|-----|
| Logic | 4 | BUG-01, BUG-02, BUG-03, BUG-07 |
| Interface | 3 | BUG-03, BUG-04, BUG-05 |
| Data / Translation | 1 | BUG-06 |

(BUG-03 has a mixed logic/interface nature and is counted in both
categories.)
