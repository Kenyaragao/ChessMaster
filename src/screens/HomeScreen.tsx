import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useI18n } from '../i18n/I18nContext';
import { useScore } from '../context/ScoreContext';
import { colors } from '../theme/colors';

interface HomeScreenProps {
  onPlayFriend: () => void;
  onPlayComputer: () => void;
  onTraining: () => void;
}

export function HomeScreen({ onPlayFriend, onPlayComputer, onTraining }: HomeScreenProps) {
  const { t } = useI18n();
  const { stats } = useScore();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <LanguageSwitcher />
      </View>

      <Text style={styles.title}>{t.appName}</Text>
      <Text style={styles.tagline}>{t.tagline}</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>{t.score}</Text>
        <Text style={styles.scoreValue}>{stats.points}</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>{t.wins}: {stats.wins}</Text>
          <Text style={styles.statText}>{t.losses}: {stats.losses}</Text>
          <Text style={styles.statText}>{t.draws}: {stats.draws}</Text>
        </View>
      </View>

      <View style={styles.themeSection}>
        <Text style={styles.themeLabel}>{t.theme}</Text>
        <ThemeSwitcher />
      </View>

      <View style={styles.menu}>
        <Text style={styles.menuHint}>{t.selectMode}</Text>
        <Button label={t.playFriend} onPress={onPlayFriend} />
        <Button label={t.playComputer} onPress={onPlayComputer} />
        <Button label={t.training} variant="secondary" onPress={onTraining} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  topBar: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 28,
  },
  scoreCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreValue: {
    color: colors.textPrimary,
    fontSize: 36,
    fontWeight: '800',
    marginVertical: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  statText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  themeSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  themeLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  menu: {
    width: '100%',
    maxWidth: 360,
  },
  menuHint: {
    color: colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
});
