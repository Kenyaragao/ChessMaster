export interface BoardTheme {
  id: string;
  name: string;
  light: string;
  dark: string;
  border: string;
  coordinateText: string;
}

export const BOARD_THEMES: BoardTheme[] = [
  {
    id: 'classic',
    name: 'Classic Wood',
    light: '#F0D9B5',
    dark: '#946F51',
    border: '#3A2A20',
    coordinateText: '#F0D9B5',
  },
  {
    id: 'forest',
    name: 'Forest',
    light: '#EEEED2',
    dark: '#769656',
    border: '#2B3A26',
    coordinateText: '#EEEED2',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    light: '#E8EEF2',
    dark: '#4A7A96',
    border: '#1F3A4A',
    coordinateText: '#E8EEF2',
  },
  {
    id: 'contrast',
    name: 'Contrast',
    light: '#FFFFFF',
    dark: '#4B4B4B',
    border: '#111111',
    coordinateText: '#FFFFFF',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    light: '#4A4A5E',
    dark: '#22222E',
    border: '#0D0D14',
    coordinateText: '#C9A96A',
  },
];

export const DEFAULT_BOARD_THEME = BOARD_THEMES[0];
