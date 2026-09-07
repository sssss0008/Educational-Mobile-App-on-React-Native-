import { useStore } from '../store/useStore';

export const LightColors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  primary: '#4F46E5',
  primaryLight: '#EEF2FF',
  secondary: '#06B6D4',
  text: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  card: '#FFFFFF',
};

export const DarkColors = {
  background: '#090D16',
  surface: '#131C2E',
  primary: '#6366F1',
  primaryLight: '#1E1B4B',
  secondary: '#22D3EE',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  border: '#1E293B',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  card: '#131C2E',
};

export const Colors = LightColors;

export function useThemeColors() {
  const theme = useStore((state) => state.theme);
  return theme === 'dark' ? DarkColors : LightColors;
}
