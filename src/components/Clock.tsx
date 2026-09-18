import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

interface ClockProps {
  label: string;
  milliseconds: number;
  active: boolean;
}

function formatClock(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function Clock({ label, milliseconds, active }: ClockProps) {
  const low = milliseconds <= 30000;

  return (
    <View style={[styles.container, active && styles.active]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.time, low && styles.low]}>{formatClock(milliseconds)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  active: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  time: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  low: {
    color: colors.danger,
  },
});
