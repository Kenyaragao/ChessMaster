import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useBoardTheme } from '../context/ThemeContext';

export function ThemeSwitcher() {
  const { theme, themes, setThemeId } = useBoardTheme();

  return (
    <View style={styles.container}>
      {themes.map((candidate) => (
        <Pressable
          key={candidate.id}
          onPress={() => setThemeId(candidate.id)}
          style={[
            styles.swatch,
            { backgroundColor: candidate.light, borderColor: candidate.border },
            theme.id === candidate.id && styles.active,
          ]}
        >
          <View style={[styles.half, { backgroundColor: candidate.dark }]} />
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
  swatch: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 2,
    overflow: 'hidden',
  },
  half: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '50%',
  },
  active: {
    borderColor: '#fff',
  },
});
