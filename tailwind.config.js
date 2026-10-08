/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          elevated: 'var(--color-bg-elevated)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
          strong: 'var(--color-border-strong)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          fg: 'var(--color-accent-fg)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          fg: 'var(--color-danger-fg)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          fg: 'var(--color-warning-fg)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          fg: 'var(--color-success-fg)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          fg: 'var(--color-info-fg)',
        },
      },
      spacing: {
        1: 'var(--pp-space-1)',
        2: 'var(--pp-space-2)',
        3: 'var(--pp-space-3)',
        4: 'var(--pp-space-4)',
        5: 'var(--pp-space-5)',
        6: 'var(--pp-space-6)',
        8: 'var(--pp-space-8)',
        10: 'var(--pp-space-10)',
        12: 'var(--pp-space-12)',
        16: 'var(--pp-space-16)',
      },
      borderRadius: {
        sm: 'var(--pp-radius-sm)',
        md: 'var(--pp-radius-md)',
        lg: 'var(--pp-radius-lg)',
        full: 'var(--pp-radius-full)',
      },
      fontFamily: {
        sans: ['var(--pp-font-sans)', 'sans-serif'],
        serif: ['var(--pp-font-serif)', 'serif'],
        mono: ['var(--pp-font-mono)', 'monospace'],
      },
      fontSize: {
        xs: 'var(--pp-font-size-xs)',
        sm: 'var(--pp-font-size-sm)',
        base: 'var(--pp-font-size-base)',
        lg: 'var(--pp-font-size-lg)',
        xl: 'var(--pp-font-size-xl)',
        '2xl': 'var(--pp-font-size-2xl)',
        '3xl': 'var(--pp-font-size-3xl)',
        '4xl': 'var(--pp-font-size-4xl)',
      },
    },
  },
  plugins: [],
};
