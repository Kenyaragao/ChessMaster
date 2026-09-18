import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Chess, Square } from 'chess.js';
import { Board } from '../components/Board';
import { Button } from '../components/Button';
import { Difficulty, pickComputerMove } from '../ai/engine';
import { computeGamePoints } from '../chess/scoring';
import { useI18n } from '../i18n/I18nContext';
import { useScore } from '../context/ScoreContext';
import { colors } from '../theme/colors';

export type GameMode = 'pvp' | 'ai';

interface GameScreenProps {
  mode: GameMode;
  difficulty?: Difficulty;
  onBack: () => void;
}

function findKingSquare(game: Chess, color: 'w' | 'b'): Square | null {
  const board = game.board();
  for (const row of board) {
    for (const cell of row) {
      if (cell && cell.type === 'k' && cell.color === 'w') {
        return cell.square;
      }
    }
  }
  return null;
}

export function GameScreen({ mode, difficulty = 'medium', onBack }: GameScreenProps) {
  const { t } = useI18n();
  const { recordResult } = useScore();
  const gameRef = useRef(new Chess());
  const [, setTick] = useState(0);
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Square[]>([]);
  const [capturedByWhite, setCapturedByWhite] = useState<string[]>([]);
  const [capturedByBlack, setCapturedByBlack] = useState<string[]>([]);
  const [resultRecorded, setResultRecorded] = useState(false);

  const rerender = () => setTick((n) => n + 1);

  const game = gameRef.current;
  const isGameOver = game.isGameOver();
  const turn = game.turn();

  useEffect(() => {
    if (mode !== 'ai' || isGameOver || turn !== 'b') return;
    const timeout = setTimeout(() => {
      const move = pickComputerMove(gameRef.current, difficulty);
      if (move) {
        applyMove(move.from as Square, move.to as Square);
      }
    }, 350);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, difficulty, turn, isGameOver]);

  useEffect(() => {
    if (!isGameOver || resultRecorded || mode !== 'ai') return;
    setResultRecorded(true);
    const result = game.isCheckmate() ? (turn === 'b' ? 'win' : 'loss') : 'draw';
    recordResult(result, computeGamePoints(capturedByWhite, result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver, resultRecorded, mode]);

  function applyMove(from: Square, to: Square) {
    const move = gameRef.current.move({ from, to, promotion: 'q' });
    if (!move) return;
    if (move.captured) {
      if (move.color === 'w') {
        setCapturedByWhite((prev) => [...prev, move.captured as string]);
      } else {
        setCapturedByBlack((prev) => [...prev, move.captured as string]);
      }
    }
    setSelected(null);
    setLegalTargets([]);
    rerender();
  }

  function handleSquarePress(square: Square) {
    if (isGameOver) return;
    if (mode === 'ai' && turn === 'b') return;

    if (!selected) {
      const piece = game.get(square);
      if (!piece || piece.color !== turn) return;
      setSelected(square);
      setLegalTargets(game.moves({ square, verbose: true }).map((m) => m.to as Square));
      return;
    }

    if (square === selected) {
      setSelected(null);
      setLegalTargets([]);
      return;
    }

    if (legalTargets.includes(square)) {
      applyMove(selected, square);
      return;
    }

    const piece = game.get(square);
    if (piece && piece.color === turn) {
      setSelected(square);
      setLegalTargets(game.moves({ square, verbose: true }).map((m) => m.to as Square));
    } else {
      setSelected(null);
      setLegalTargets([]);
    }
  }

  function handleNewGame() {
    gameRef.current = new Chess();
    setSelected(null);
    setLegalTargets([]);
    setCapturedByWhite([]);
    setCapturedByBlack([]);
    setResultRecorded(false);
    rerender();
  }

  function handleUndo() {
    gameRef.current.undo();
    if (mode === 'ai') gameRef.current.undo();
    setSelected(null);
    setLegalTargets([]);
    setResultRecorded(false);
    rerender();
  }

  function handleResign() {
    if (mode === 'ai') {
      recordResult('loss', computeGamePoints(capturedByWhite, 'loss'));
    }
    handleNewGame();
  }

  const lastMove = game.history({ verbose: true }).slice(-1)[0];
  const lastMoveSquares = useMemo(
    () => (lastMove ? [lastMove.from as Square, lastMove.to as Square] : []),
    [lastMove]
  );
  const checkSquare = game.isCheck() ? findKingSquare(game, turn) : null;

  const statusText = useMemo(() => {
    if (game.isCheckmate()) {
      const winnerIsWhite = turn === 'b';
      if (mode === 'ai') return winnerIsWhite ? t.youWin : t.youLose;
      return `${t.checkmate} — ${winnerIsWhite ? t.whiteWins : t.blackWins}`;
    }
    if (game.isStalemate()) return t.stalemate;
    if (game.isDraw()) return t.draw;
    if (game.isCheck()) return t.check;
    if (mode === 'ai') return turn === 'w' ? t.yourTurn : t.opponentTurn;
    return turn === 'w' ? t.whiteToMove : t.blackToMove;
  }, [mode, turn, t, game]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button label={t.back} variant="secondary" onPress={onBack} style={styles.smallButton} />
        <Text style={styles.status}>{statusText}</Text>
      </View>

      <View style={styles.boardWrapper}>
        <Board
          board={game.board()}
          selectedSquare={selected}
          legalTargets={legalTargets}
          lastMoveSquares={lastMoveSquares}
          checkSquare={checkSquare}
          onSquarePress={handleSquarePress}
        />
      </View>

      <View style={styles.actions}>
        <Button label={t.newGame} onPress={handleNewGame} style={styles.actionButton} />
        <Button label={t.undo} variant="secondary" onPress={handleUndo} style={styles.actionButton} />
        <Button label="Resign" variant="danger" onPress={handleResign} style={styles.actionButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  header: {
    width: '100%',
    maxWidth: 480,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  smallButton: {
    marginRight: 12,
    marginVertical: 0,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  status: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
  },
  boardWrapper: {
    width: '100%',
    maxWidth: 480,
  },
  actions: {
    width: '100%',
    maxWidth: 480,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    marginVertical: 0,
  },
});
