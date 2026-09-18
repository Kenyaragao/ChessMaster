# ChessMaster

A cross-platform chess game built with Expo (React Native + React Native
Web): the same codebase runs as an app on **Expo Go** and as a **website**
published on GitHub Pages.

## 🎮 Play now

**[kenyaragao.github.io/ChessMaster](https://kenyaragao.github.io/ChessMaster/)**
— no install required, playable directly in the browser.

## Features

- ♟️ Full chess rules (castling, en passant, promotion, check, checkmate,
  stalemate and draws), validated by `chess.js`.
- 👥 **Play a Friend** mode (two players on the same device).
- 🤖 **Play the Computer** mode, with three difficulty levels: Easy,
  Medium and Hard (minimax AI with alpha-beta pruning).
- ⏱️ **Chess clocks**: pick 3, 5 or 10 minutes per side (or no limit) before
  a game, just like tournament time controls — running out of time ends
  the game.
- 🎓 **Training** mode, explaining the goal of the game, how each piece
  moves, the basic rules, and an interactive **practice board** where a
  beginner can tap any piece, of either color, out of turn, to see its
  legal moves demonstrated.
- 🌐 UI available in **three languages**: English, Portuguese and Russian,
  with the language choice persisted between sessions.
- 🏆 **Scoring system** per game (material captured + result bonus),
  accumulated and saved locally.
- 🎨 **Board themes**: a bordered board with algebraic coordinates (a-h,
  1-8) around the edges, and five selectable color themes (Classic Wood,
  Forest, Ocean, Contrast, Midnight), persisted between sessions.

## Running the project

```bash
npm install

# App (Expo Go / emulator)
npm start

# Web (browser)
npm run web
```

## Building and publishing the website

```bash
npm run build:web
```

This generates static files in `dist/`. Deployment to GitHub Pages is
automated by the [`.github/workflows/deploy-web.yml`](.github/workflows/deploy-web.yml)
workflow on every push to `main`, publishing to
**https://kenyaragao.github.io/ChessMaster/**.

## Product documentation

All technical and user documentation for the project lives in [`docs/`](docs):

| Document | Content |
|----------|---------|
| [Technical Specification](docs/TECHNICAL_SPECIFICATION.md) | Introduction, functional/interface/reliability/compatibility requirements, acceptance criteria, development stages and timeline. |
| [User Manual](docs/USER_MANUAL.md) | How to install, play, and use every feature of the app. |
| [System Architecture](docs/ARCHITECTURE.md) | Component and sequence diagrams, code module responsibilities, web deployment. |
| [Rules and Terms](docs/RULES_AND_TERMS.md) | Implemented chess rules, scoring, license, and user rights/duties. |
| [Intentional Bugs](docs/INTENTIONAL_BUGS.md) | The bugs deliberately seeded for the black-box testing exercise. |

## Development log

Development happens in stages, each recorded as its own commit on the
[`claude/chessmaster-game-bdo84t`](https://github.com/Kenyaragao/ChessMaster/tree/claude/chessmaster-game-bdo84t)
branch (see [pull request #1](https://github.com/Kenyaragao/ChessMaster/pull/1)
for the full diff and commit history), so the product's evolution stays
easy to follow:

1. **Project scaffold** — Expo + TypeScript project with React Native Web
   enabled, GitHub Pages deploy workflow, base path configured for the
   `ChessMaster` project site.
2. **Core gameplay** — full chess rules via `chess.js`, an interactive
   board, local two-player mode, a computer opponent (minimax with
   alpha-beta pruning) at three difficulties, English/Portuguese/Russian
   UI translations, a training screen, and a persisted scoring system.
3. **Product documentation** — technical specification, user manual,
   architecture guide with diagrams, and the rules/terms document.
4. **Intentional bugs** — 7 bugs of different types (logic, interface,
   translation) deliberately seeded for the black-box testing exercise,
   fully documented in `docs/INTENTIONAL_BUGS.md`.
5. **Chess clocks and practice board** — selectable time controls (3/5/10
   minutes or no limit) with a live countdown per side, and an
   interactive practice board in Training mode where a beginner can try
   any piece's moves without turn order or stakes.
6. **English-language documentation** — every document and commit under
   version control is written in English, so the project's history and
   docs are readable by anyone browsing the repository; the in-app UI
   keeps its three supported languages (EN/PT/RU) as a game feature.
7. **Board themes** — a bordered board with algebraic coordinates around
   the edges, and five selectable color themes (Classic Wood, Forest,
   Ocean, Contrast, Midnight), persisted between sessions.

Each stage above corresponds to one or more commits with a descriptive
message — check the repository's commit history for the exact diffs.
