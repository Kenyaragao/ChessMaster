# Game Rules and Software Terms of Use

## 1. Implemented chess rules

ChessMaster follows the official rules of chess, validated by the rules
engine (`chess.js`):

1. **Objective**: checkmate the opponent's king — attack it so that there
   is no legal move that frees it from capture.
2. **Turns**: players alternate, moving one piece at a time; White always
   starts.
3. **Piece movement**: pawn, knight, bishop, rook, queen and king move as
   described on the app's **Training** screen, available in all three
   supported languages.
4. **Special moves** supported: castling (kingside and queenside), en
   passant capture, and pawn promotion (auto-promoted to a queen).
5. **End of game**: checkmate, stalemate, and draws by insufficient
   material, position repetition, or the 50-move rule.
6. **Time control**: an optional per-side clock (3, 5 or 10 minutes, or no
   limit) can be selected before a match; a side whose clock reaches zero
   immediately loses the match.

These rules are the same in both "Play a Friend" and "Play the Computer"
modes.

## 2. Scoring

- Every piece captured by the human player adds points based on its
  material value (pawn = 1, knight/bishop = 3, rook = 5, queen = 9).
- At the end of a match against the computer, a fixed bonus is added based
  on the result: win, draw or loss.
- The score (wins, losses, draws and total points) accumulates and is
  saved locally on the player's device or browser.

## 3. Software terms of use

### 3.1 License

ChessMaster's source code is distributed under the **MIT license** (see
the `LICENSE` file). This means anyone may use, copy, modify and
redistribute the software, including for commercial purposes, as long as
the copyright notice and the original license are kept.

### 3.2 User rights

- Use the app freely, to play or to learn chess.
- Read and reuse the source code, under the terms of the MIT license.
- Report issues or suggest improvements through the project's GitHub
  repository.

### 3.3 User duties

- Do not use the software for unlawful purposes.
- When redistributing the code or parts of it, keep the credits and
  license notice as required by the MIT license.
- When reporting an issue, provide enough information (steps to
  reproduce, expected vs. observed behavior) to make it easy to fix.

### 3.4 Disclaimer

The software is provided "as is", without warranties of any kind, per the
standard terms of the MIT license. The authors are not liable for any
damages arising from the use of the software.

## 4. Note on the software testing exercise

This product was also developed as part of an academic exercise on
software testing using the "black box" method. For that reason, one
version of the software intentionally contains a small number of bugs
(documented in `docs/INTENTIONAL_BUGS.md`), meant to be found and reported
by an external testing team, without prior knowledge of that list.
