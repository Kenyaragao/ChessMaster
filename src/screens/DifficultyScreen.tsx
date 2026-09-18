import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Difficulty } from '../ai/engine';
import { useI18n } from '../i18n/I18nContext';
import { colors } from '../theme/colors';

interface DifficultyScreenProps {
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

export function DifficultyScreen({ onSelect, onBack }: DifficultyScreenProps) {
  const { t } = useI18n();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.chooseDifficulty}</Text>
      <View style={styles.menu}>
        <Button label={t.easy} onPress={() => onSelect('easy')} />
        <Button label={t.medium} onPress={() => onSelect('medium')} />
        <Button label={t.hard} onPress={() => onSelect('hard')} />
        <Button label={t.back} variant="secondary" onPress={onBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 24,
  },
  menu: {
    width: '100%',
    maxWidth: 320,
  },
});
