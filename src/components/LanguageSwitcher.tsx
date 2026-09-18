import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useI18n } from '../i18n/I18nContext';
import { Language } from '../i18n/translations';
import { colors } from '../theme/colors';

const OPTIONS: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'ru', label: 'RU' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => (
        <Pressable
          key={option.code}
          onPress={() => setLanguage(option.code)}
          style={[styles.pill, 'en' === option.code && styles.pillActive]}
        >
          <Text style={[styles.label, 'en' === option.code && styles.labelActive]}>
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pillActive: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  labelActive: {
    color: colors.background,
  },
});
