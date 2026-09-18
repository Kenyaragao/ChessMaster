import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Square as ChessSquare, PieceSymbol, Color } from 'chess.js';
import { colors } from '../theme/colors';
import { BoardTheme, DEFAULT_BOARD_THEME } from '../theme/boardThemes';
import { PIECE_GLYPHS } from '../chess/glyphs';

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const LABEL_FLEX = 0.6;

export interface BoardSquareInfo {
  type: PieceSymbol;
  color: Color;
}

interface BoardProps {
  board: (BoardSquareInfo | null)[][];
  orientation?: Color;
  theme?: BoardTheme;
  selectedSquare?: ChessSquare | null;
  legalTargets?: ChessSquare[];
  lastMoveSquares?: ChessSquare[];
  checkSquare?: ChessSquare | null;
  onSquarePress: (square: ChessSquare) => void;
}

export function Board({
  board,
  orientation = 'w',
  theme = DEFAULT_BOARD_THEME,
  selectedSquare,
  legalTargets = [],
  lastMoveSquares = [],
  checkSquare,
  onSquarePress,
}: BoardProps) {
  const ranks = orientation === 'w' ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];
  const files = orientation === 'w' ? FILES : [...FILES].reverse();
  const visibleLegalTargets = legalTargets.slice(0, -1);

  const fileLabels = (
    <View style={styles.fileLabelRow}>
      <View style={styles.corner} />
      {files.map((file) => (
        <Text key={file} style={[styles.fileLabelText, { color: theme.coordinateText }]}>
          {file}
        </Text>
      ))}
      <View style={styles.corner} />
    </View>
  );

  return (
    <View style={[styles.frame, { backgroundColor: theme.border }]}>
      {fileLabels}
      {ranks.map((rank, rowIndex) => (
        <View key={rank} style={styles.boardRow}>
          <Text style={[styles.coordText, { color: theme.coordinateText }]}>{rank}</Text>
          <View style={styles.row}>
            {files.map((file, colIndex) => {
              const square = `${file}${rank}` as ChessSquare;
              const boardRow = 8 - rank;
              const boardCol = FILES.indexOf(file);
              const piece = board[boardRow]?.[boardCol] ?? null;
              const isLight = (rowIndex + colIndex) % 2 === 0;
              const isSelected = selectedSquare === square;
              const isLegalTarget = visibleLegalTargets.includes(square);
              const isLastMove = lastMoveSquares.includes(square);
              const isCheck = checkSquare === square;

              return (
                <Pressable
                  key={square}
                  onPress={() => onSquarePress(square)}
                  style={[
                    styles.square,
                    { backgroundColor: isLight ? theme.light : theme.dark },
                    isLastMove && styles.lastMove,
                    isSelected && styles.selected,
                    isCheck && styles.check,
                  ]}
                >
                  {piece && (
                    <Text style={[styles.piece, { color: piece.color === 'w' ? '#fff' : '#111' }]}>
                      {PIECE_GLYPHS[piece.color][piece.type]}
                    </Text>
                  )}
                  {isLegalTarget && <View style={[styles.dot, piece && styles.captureRing]} />}
                </Pressable>
              );
            })}
          </View>
          <Text style={[styles.coordText, { color: theme.coordinateText }]}>{rank}</Text>
        </View>
      ))}
      {fileLabels}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    aspectRatio: 1,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 2,
  },
  fileLabelRow: {
    flex: LABEL_FLEX,
    flexDirection: 'row',
  },
  boardRow: {
    flex: 1,
    flexDirection: 'row',
  },
  corner: {
    flex: LABEL_FLEX,
  },
  coordText: {
    flex: LABEL_FLEX,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    fontWeight: '700',
  },
  fileLabelText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    fontWeight: '700',
  },
  row: {
    flex: 8,
    flexDirection: 'row',
  },
  square: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: colors.highlight,
  },
  lastMove: {
    backgroundColor: '#F7EC7455',
  },
  check: {
    backgroundColor: colors.check,
  },
  piece: {
    fontSize: 30,
  },
  dot: {
    position: 'absolute',
    width: '30%',
    height: '30%',
    borderRadius: 999,
    backgroundColor: colors.moveHint,
  },
  captureRing: {
    width: '90%',
    height: '90%',
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: colors.moveHint,
  },
});
