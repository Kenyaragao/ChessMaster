import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const SCORE_STORAGE_KEY = '@chessmaster/score';

export interface ScoreStats {
  wins: number;
  losses: number;
  draws: number;
  points: number;
}

export type GameResult = 'win' | 'loss' | 'draw';

interface ScoreContextValue {
  stats: ScoreStats;
  recordResult: (result: GameResult, pointsEarned: number) => void;
  resetStats: () => void;
}

const EMPTY_STATS: ScoreStats = { wins: 0, losses: 0, draws: 0, points: 0 };

const ScoreContext = createContext<ScoreContextValue | undefined>(undefined);

export function ScoreProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<ScoreStats>(EMPTY_STATS);

  useEffect(() => {
    AsyncStorage.getItem(SCORE_STORAGE_KEY).then((raw) => {
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as ScoreStats;
        setStats({ ...EMPTY_STATS, ...parsed });
      } catch {
        // ignore corrupted storage, keep defaults
      }
    });
  }, []);

  const persist = (next: ScoreStats) => {
    setStats(next);
    AsyncStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  };

  const recordResult = (result: GameResult, pointsEarned: number) => {
    persist({
      wins: stats.wins + (result === 'win' || result === 'draw' ? 1 : 0),
      losses: stats.losses + (result === 'loss' ? 1 : 0),
      draws: stats.draws + (result === 'draw' ? 1 : 0),
      points: stats.points + pointsEarned,
    });
  };

  const resetStats = () => persist(EMPTY_STATS);

  const value = useMemo<ScoreContextValue>(
    () => ({ stats, recordResult, resetStats }),
    [stats]
  );

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>;
}

export function useScore() {
  const ctx = useContext(ScoreContext);
  if (!ctx) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return ctx;
}
