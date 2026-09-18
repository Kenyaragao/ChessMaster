# User Manual — ChessMaster

## 1. What is ChessMaster

ChessMaster is a chess game you can play:

- **In your browser**, through the web version published on GitHub Pages;
- **On your phone**, through the Expo Go app pointing at the project in
  development, or through a native build generated from this repository.

## 2. Installation and running

### 2.1 Play in the browser

Open the published version (see the link in `README.md`, "Development log"
section) or, locally:

```bash
npm install
npm run web
```

### 2.2 Play in Expo Go

```bash
npm install
npm start
```

Open the **Expo Go** app on your phone (Android or iOS) and scan the QR
code shown in the terminal.

## 3. Home screen

When you open the app you'll see:

- The game name and a **language** switcher (EN / PT / RU) at the top.
- A **score** card showing total points, wins, losses and draws
  accumulated so far.
- Three game mode options:
  - **Play a Friend** — a local match, two players take turns on the same
    device.
  - **Play the Computer** — opens the difficulty picker (Easy, Medium,
    Hard) and starts a match against the AI.
  - **Training** — opens the rules and piece-movement guide.

## 4. Choosing a time control

Both "Play a Friend" and "Play the Computer" first open a **time control**
screen, where you pick:

- **3, 5 or 10 minutes** per side (a countdown clock for each player); or
- **No limit** (no clocks shown, play at your own pace).

If a player's clock reaches zero, the match ends immediately as a timeout
for that side.

## 5. Playing a match

- Tap a piece of the color to move to select it; the squares it can
  legally move to are highlighted.
- Tap one of the highlighted squares to move the piece there. Tapping
  another of your own pieces changes the selection; tapping the selected
  piece again deselects it.
- The text above the board shows whose turn it is, whether there is a
  **check**, and the match result once it ends (**checkmate**,
  **stalemate**, **draw**, or **time out**).
- Against the computer, you always play the white pieces; the computer
  replies automatically after your move.
- Buttons available during a match:
  - **New Game** — restarts the board (and the clocks, if timed).
  - **Undo** — undoes the last move (against the computer, it undoes both
    your move and the AI's reply together, returning the turn to you).
  - **Resign** — ends the current match (against the computer, this counts
    as a loss) and returns to a fresh game.
  - **Back** — returns to the home screen.

### 5.1 Scoring

At the end of a match against the computer, points are calculated from the
value of the pieces you captured during the match, plus a bonus based on
the result (win, draw or loss). The accumulated score is saved on the
device/browser and shown on the home screen.

> Matches in "Play a Friend" mode don't affect the accumulated score,
> since both people share the same device.

## 6. Training mode

The training screen presents, in the selected language:

- An introduction to the goal of chess.
- How each piece moves (pawn, knight, bishop, rook, queen and king).
- The basic rules of the game: objective, turn order, check, checkmate,
  castling, en passant capture and pawn promotion.
- A **practice board**: tap any piece, of either color, to see its legal
  destinations highlighted, even out of turn order. This is a
  stakes-free sandbox — use "Reset board" to start over — meant purely to
  demonstrate how pieces move to a beginner.

## 7. Switching language

Tap **EN**, **PT** or **RU** at the top of the home screen at any time.
The preference is saved automatically and kept the next time you open the
app.

## 8. Troubleshooting

| Situation | What to do |
|-----------|------------|
| The score doesn't appear saved after reopening the app | Check that the browser isn't in private/incognito mode, since local storage is cleared when it closes in that mode. |
| The board doesn't render correctly in the browser | Refresh the page; check that JavaScript is enabled. |
| The app won't connect to Expo Go | Confirm the phone and computer are on the same Wi-Fi network. |
