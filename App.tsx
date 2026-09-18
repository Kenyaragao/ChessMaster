import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { I18nProvider } from './src/i18n/I18nContext';
import { ScoreProvider } from './src/context/ScoreContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { DifficultyScreen } from './src/screens/DifficultyScreen';
import { GameScreen, GameMode } from './src/screens/GameScreen';
import { TrainingScreen } from './src/screens/TrainingScreen';
import { Difficulty } from './src/ai/engine';
import { colors } from './src/theme/colors';

type Route =
  | { name: 'home' }
  | { name: 'difficulty' }
  | { name: 'game'; mode: GameMode; difficulty?: Difficulty }
  | { name: 'training' };

function Navigator() {
  const [route, setRoute] = useState<Route>({ name: 'home' });

  switch (route.name) {
    case 'difficulty':
      return (
        <DifficultyScreen
          onSelect={(difficulty) => setRoute({ name: 'game', mode: 'ai', difficulty })}
          onBack={() => setRoute({ name: 'home' })}
        />
      );
    case 'game':
      return (
        <GameScreen
          mode={route.mode}
          difficulty={route.difficulty}
          onBack={() => setRoute({ name: 'home' })}
        />
      );
    case 'training':
      return <TrainingScreen onBack={() => setRoute({ name: 'home' })} />;
    case 'home':
    default:
      return (
        <HomeScreen
          onPlayFriend={() => setRoute({ name: 'game', mode: 'pvp' })}
          onPlayComputer={() => setRoute({ name: 'difficulty' })}
          onTraining={() => setRoute({ name: 'training' })}
        />
      );
  }
}

export default function App() {
  return (
    <I18nProvider>
      <ScoreProvider>
        <SafeAreaView style={styles.safeArea}>
          <Navigator />
          <StatusBar style="light" />
        </SafeAreaView>
      </ScoreProvider>
    </I18nProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
