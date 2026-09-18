import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { PieceSymbol } from 'chess.js';
import { Button } from '../components/Button';
import { PIECE_GLYPHS } from '../chess/glyphs';
import { useI18n } from '../i18n/I18nContext';
import { colors } from '../theme/colors';

interface TrainingScreenProps {
  onBack: () => void;
}

export function TrainingScreen({ onBack }: TrainingScreenProps) {
  const { t } = useI18n();

  const pieces: { symbol: PieceSymbol; name: string; description: string }[] = [
    { symbol: 'p', name: t.piece_pawn, description: t.piece_pawn_move },
    { symbol: 'n', name: t.piece_knight, description: t.piece_knight_move },
    { symbol: 'b', name: t.piece_bishop, description: t.piece_bishop_move },
    { symbol: 'r', name: t.piece_rook, description: t.piece_rook_move },
    { symbol: 'q', name: t.piece_queen, description: t.piece_queen_move },
    { symbol: 'k', name: t.piece_king, description: t.piece_king_move },
  ];

  const rules = [t.rule_goal, t.rule_turns, t.rule_check, t.rule_checkmate, t.rule_castling, t.rule_enPassant, t.rule_promotion];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Button label={t.back} variant="secondary" onPress={onBack} style={styles.backButton} />
      <Text style={styles.title}>{t.trainingTitle}</Text>
      <Text style={styles.intro}>{t.trainingIntro}</Text>

      <Text style={styles.sectionTitle}>{t.howPiecesMove}</Text>
      {pieces.map((piece) => (
        <View key={piece.symbol} style={styles.pieceRow}>
          <Text style={styles.pieceGlyph}>{PIECE_GLYPHS.w[piece.symbol]}</Text>
          <View style={styles.pieceText}>
            <Text style={styles.pieceName}>{piece.name}</Text>
            <Text style={styles.pieceDescription}>{piece.description}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>{t.basicRules}</Text>
      {rules.map((rule, index) => (
        <View key={index} style={styles.ruleRow}>
          <Text style={styles.ruleBullet}>{index + 1}.</Text>
          <Text style={styles.ruleText}>{rule}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 24,
    paddingBottom: 48,
    maxWidth: 640,
    width: '100%',
    alignSelf: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  intro: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
    marginBottom: 12,
  },
  pieceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  pieceGlyph: {
    fontSize: 34,
    color: colors.textPrimary,
    width: 48,
    textAlign: 'center',
  },
  pieceText: {
    flex: 1,
    marginLeft: 12,
  },
  pieceName: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 15,
  },
  pieceDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  ruleRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ruleBullet: {
    color: colors.primary,
    fontWeight: '700',
    marginRight: 8,
    width: 20,
  },
  ruleText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
