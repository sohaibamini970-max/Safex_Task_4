import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from '../providers/ThemeProvider';

/**
 * Custom hook to access and toggle the current design system theme.
 * Must be used within a ThemeProvider hierarchy.
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return context;
};
