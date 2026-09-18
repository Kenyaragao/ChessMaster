import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Chess, Square } from 'chess.js';
import { Board } from './Board';
import { Button } from './Button';
import { useI18n } from '../i18n/I18nContext';
import { colors } from '../theme/colors';

/**
 * A stakes-free board for the Training screen: any piece, of either color,
 * can be selected out of turn order so a beginner can explore how each
 * piece moves. `chess.js`'s setTurn() flips the side to move without
 * requiring a real alternating game.
 */
export function PracticeBoard() {
  const { t } = useI18n();
  const gameRef = useRef(new Chess());
  const [, setTick] = useState(0);
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Square[]>([]);

  const rerender = () => setTick((n) => n + 1);
  const game = gameRef.current;

  function selectSquare(square: Square, color: 'w' | 'b') {
    game.setTurn(color);
    setSelected(square);
    setLegalTargets(game.moves({ square, verbose: true }).map((m) => m.to as Square));
  }

  function clearSelection() {
    setSelected(null);
    setLegalTargets([]);
  }

  function handleSquarePress(square: Square) {
    const piece = game.get(square);

    if (!selected) {
      if (!piece) return;
      selectSquare(square, piece.color);
      return;
    }

    if (square === selected) {
      clearSelection();
      return;
    }

    if (legalTargets.includes(square)) {
      game.move({ from: selected, to: square, promotion: 'q' });
      clearSelection();
      rerender();
      return;
    }

    if (piece) {
      selectSquare(square, piece.color);
    } else {
      clearSelection();
    }
  }

  function handleReset() {
    gameRef.current = new Chess();
    clearSelection();
    rerender();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.practiceTitle}</Text>
      <Text style={styles.hint}>{t.practiceHint}</Text>
      <Board
        board={game.board()}
        selectedSquare={selected}
        legalTargets={legalTargets}
        onSquarePress={handleSquarePress}
      />
      <Button label={t.resetBoard} variant="secondary" onPress={handleReset} style={styles.resetButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  hint: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  resetButton: {
    marginTop: 12,
  },
});
