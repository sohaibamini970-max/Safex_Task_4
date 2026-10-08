# Changelog: Heritage Press Design System

All notable changes and engineering milestones for the Week 4 Specialist Advanced Build are documented below.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased] - 2026-10-08

### Day 8: Documentation & Video Script Completion
- Formatted hiring-manager friendly `README.md` with ASCII architecture diagrams, metrics, limitations, and future roadmap.
- Formatted `docs/SCOPE.md` capturing pre-build problem definitions, assumptions, and constraints for Regional Printing Press client.
- Authored comprehensive `docs/TOKENS.md` containing tables for all primitive, semantic, and component tokens.
- Documented Playwright workflow and baseline update commands in `docs/TESTING.md`.
- Wrote validation script analysis in `docs/VALIDATION.md` detailing regex rules and edge cases discovered during development.
- Formatted 5–10 minute video screen recording outline with timestamps in `docs/VIDEO_SCRIPT.md`.
- Recorded 5-line Group Lead check-in message in `docs/GROUP_CHECKIN.md`.

### Day 7: Intentional Break Demo & Color Validation Automation
- Implemented `scripts/check-hardcoded-colors.js` scanning `.ts`, `.tsx`, and `.css` files under `src/` for hard-coded hex, rgb, hsl, and Tailwind color classes.
- Added `npm run check:colors` script to `package.json`.
- Configured intentional visual regression test in `tests/visual/themes.spec.ts` demonstrating automated catch of accidental token drift.
- Verified validator catches issues with exit code 1 when dirty code is supplied, and succeeds with exit code 0 on clean code.

### Day 6: Playwright Visual Regression Test Suite
- Configured `playwright.config.ts` targeting local Vite server on port 3000 with disabled animations and 1280×800 viewport.
- Created `tests/visual/button.spec.ts` covering 4 button variants and 3 sizes across 3 themes.
- Created `tests/visual/card.spec.ts` covering 3 card variants across 3 themes.
- Created `tests/visual/alert.spec.ts` covering 4 alert variants across 3 themes.
- Created `tests/visual/themes.spec.ts` verifying full-page specimen snapshots and html `data-theme` attribute binding.
- Created `tests/visual/failure-states.spec.ts` executing 15 screenshot comparisons across all 5 failure scenarios.
- Integrated GitHub Actions CI workflow in `.github/workflows/visual-tests.yml`.

### Day 5: Layout Primitives & 5 Critical Failure States
- Built responsive layout primitives:
  - `src/layouts/Stack.tsx` (flexible vertical/horizontal flow with token-driven gap scales).
  - `src/layouts/Grid.tsx` (responsive column grid using token-driven gap scales).
  - `src/layouts/Container.tsx` (centered responsive wrapper with token padding).
- Implemented 5 user-facing failure state recovery components:
  - `OfflineState.tsx` (network disconnect warning + spooler retry button).
  - `TimeoutState.tsx` (2400 DPI RIP vector rendering timeout + retry).
  - `ServerErrorState.tsx` (500 internal server exception + trace ID + retry).
  - `InvalidDataState.tsx` (corrupted PDF preflight metadata + schema reload).
  - `ExpiredSessionState.tsx` (idle workstation authentication expiration + sign in).
- Validated that each failure state is styled 100% with design tokens and uses inline SVGs with zero external icon dependencies.

### Day 4: 10 Production UI Components
- Implemented and typed 10 core design system components with JSDoc token references:
  1. `Button.tsx` (variants: primary, secondary, ghost, danger; sizes: sm, md, lg).
  2. `Card.tsx` (variants: default, elevated, outlined; header & footer slots).
  3. `Badge.tsx` (variants: neutral, info, success, warning, danger; sizes: sm, md, lg).
  4. `Alert.tsx` (variants: info, success, warning, error; with action & close slots).
  5. `Input.tsx` (label, hint, error validation, disabled state, prefix & suffix slots).
  6. `Modal.tsx` (overlay dialog with header, scrollable body, footer, ESC & backdrop close).
  7. `Tabs.tsx` (pill and underline accessible tab list + panels).
  8. `Tooltip.tsx` (hover and focus triggered positioning: top, bottom, left, right).
  9. `Skeleton.tsx` (pulsing shimmer placeholder in text, circular, and rectangular variants).
  10. `EmptyState.tsx` (icon, title, description, and recovery action button).

### Day 3: Multi-Theme Engine & Storage Persistence
- Created `src/themes/light.css` (clean daylight paper white, ink typography, press blue accent).
- Created `src/themes/dark.css` (night-shift ink-950 background, subdued borders, luminous cyan accent).
- Created `src/themes/brand.css` (Heritage letterpress warm paper cream, serif headers, vermilion red accent).
- Implemented `ThemeProvider.tsx` and `useTheme.ts` hook injecting `data-theme` attribute onto root `<html>` element.
- Added `localStorage` persistence and `prefers-color-scheme` fallback.

### Day 2: Primitive & Semantic Design Token Layers
- Established Layer 1 primitives in `src/tokens/primitives.css` (ink palette, parchment palette, 4px spacing scale, font scales, border radii, shadows).
- Established Layer 2 semantic tokens in `src/tokens/semantic.css` (surface roles, typography roles, boundary lines, status accents).
- Established Layer 3 component tokens in `src/tokens/components.css` (button, card, input, alert, modal tokens).
- Bound Tailwind CSS theme extension in `tailwind.config.js` to reference CSS custom properties.

### Day 1: Project Scaffolding
- Initialized Vite + React 19 + TypeScript strict mode repository.
- Configured path aliases `@/` pointing to `src/`.
- Configured PostCSS and Tailwind CSS pipelines.
- Configured `index.html` root element with `data-theme="light"` default.
