import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { useI18n } from '../i18n/I18nContext';
import { colors } from '../theme/colors';

interface TimeControlScreenProps {
  onSelect: (seconds: number | null) => void;
  onBack: () => void;
}

const PRESETS: { seconds: number; label: string }[] = [
  { seconds: 180, label: '3 min' },
  { seconds: 300, label: '5 min' },
  { seconds: 600, label: '10 min' },
];

export function TimeControlScreen({ onSelect, onBack }: TimeControlScreenProps) {
  const { t } = useI18n();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.chooseTimeControl}</Text>
      <View style={styles.menu}>
        {PRESETS.map((preset) => (
          <Button key={preset.seconds} label={preset.label} onPress={() => onSelect(preset.seconds)} />
        ))}
        <Button label={t.noTimeLimit} variant="secondary" onPress={() => onSelect(null)} />
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
