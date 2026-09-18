import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { I18nProvider } from './src/i18n/I18nContext';
import { ScoreProvider } from './src/context/ScoreContext';
import { BoardThemeProvider } from './src/context/ThemeContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { TimeControlScreen } from './src/screens/TimeControlScreen';
import { DifficultyScreen } from './src/screens/DifficultyScreen';
import { GameScreen, GameMode } from './src/screens/GameScreen';
import { TrainingScreen } from './src/screens/TrainingScreen';
import { Difficulty } from './src/ai/engine';
import { colors } from './src/theme/colors';

type Route =
  | { name: 'home' }
  | { name: 'timeControl'; mode: GameMode }
  | { name: 'difficulty'; mode: GameMode; timeControlSeconds: number | null }
  | { name: 'game'; mode: GameMode; difficulty?: Difficulty; timeControlSeconds: number | null }
  | { name: 'training' };

function Navigator() {
  const [route, setRoute] = useState<Route>({ name: 'home' });

  switch (route.name) {
    case 'timeControl':
      return (
        <TimeControlScreen
          onSelect={(timeControlSeconds) =>
            route.mode === 'ai'
              ? setRoute({ name: 'difficulty', mode: 'ai', timeControlSeconds })
              : setRoute({ name: 'game', mode: 'pvp', timeControlSeconds })
          }
          onBack={() => setRoute({ name: 'home' })}
        />
      );
    case 'difficulty':
      return (
        <DifficultyScreen
          onSelect={(difficulty) =>
            setRoute({ name: 'game', mode: 'ai', difficulty, timeControlSeconds: route.timeControlSeconds })
          }
          onBack={() => setRoute({ name: 'timeControl', mode: 'ai' })}
        />
      );
    case 'game':
      return (
        <GameScreen
          mode={route.mode}
          difficulty={route.difficulty}
          timeControlSeconds={route.timeControlSeconds}
          onBack={() => setRoute({ name: 'home' })}
        />
      );
    case 'training':
      return <TrainingScreen onBack={() => setRoute({ name: 'home' })} />;
    case 'home':
    default:
      return (
        <HomeScreen
          onPlayFriend={() => setRoute({ name: 'timeControl', mode: 'pvp' })}
          onPlayComputer={() => setRoute({ name: 'timeControl', mode: 'ai' })}
          onTraining={() => setRoute({ name: 'training' })}
        />
      );
  }
}

export default function App() {
  return (
    <I18nProvider>
      <ScoreProvider>
        <BoardThemeProvider>
          <SafeAreaView style={styles.safeArea}>
            <Navigator />
            <StatusBar style="light" />
          </SafeAreaView>
        </BoardThemeProvider>
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
