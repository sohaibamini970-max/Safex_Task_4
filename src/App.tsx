import React from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { Playground } from './playground/Playground';

/**
 * Root Application Component
 * Mounts the ThemeProvider to inject `data-theme` across the DOM hierarchy
 * and presents the complete Heritage Press Design System Playground.
 */
export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Playground />
    </ThemeProvider>
  );
}
