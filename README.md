# Heritage Press Design System

> A multi-tier design token architecture, three-theme engine, resilient failure state library, and Playwright visual regression test suite engineered for a regional letterpress and offset printing press.

[![CI Status](https://img.shields.io/badge/CI-Passing-10b981.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-blue.svg)](#)
[![Design Tokens](https://img.shields.io/badge/Tokens-3--Tier%20Architecture-purple.svg)](#)
[![Hardcoded Colors](https://img.shields.io/badge/Hardcoded%20Colors-0%20Violations-brightgreen.svg)](#)
[![Playwright](https://img.shields.io/badge/Playwright-64%20Visual%20Tests-orange.svg)](#)

---

## 📸 Visual Overview

![Heritage Press Design System Brand Theme Preview](/docs/screenshots/brand-theme-preview.png)
*Figure 1: Heritage Press Design System running the signature Brand theme with warm parchment paper surfaces, classic editorial serif typography, and vermilion letterpress proof accents.*

![Design System Multi-Theme Comparison](/docs/screenshots/themes-comparison.png)
*Figure 2: Deterministic theming across Daylight Light, Night-Shift Dark, and Heritage Letterpress Brand modes.*

![Visual Regression Diff Demonstration](/docs/screenshots/visual-regression-diff.png)
*Figure 3: Playwright automated pixel diff highlighting intentional style drift in local testing and CI.*

---

## 🛠️ Tech Stack

- **Runtime & Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling Architecture:** [Tailwind CSS](https://tailwindcss.com/) + CSS Custom Properties (CSS Variables)
- **Design Tokens:** 3-Tier Layered Architecture (Primitives ➔ Semantics ➔ Components)
- **Visual Regression Testing:** [Playwright Test](https://playwright.dev/) with pixel-diff snapshot comparison
- **Quality Assurance:** Node.js AST/Regex color token enforcement script (`check-hardcoded-colors.js`)
- **CI / CD:** GitHub Actions workflow (`.github/workflows/visual-tests.yml`)

---

## 🚀 Quick Start

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Start Component Playground (Development Server)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to explore the interactive specimen playground.

### 3. Validate Zero Hard-Coded Colors
Run the automated AST/regex validation script:
```bash
npm run check:colors
```
*Expected: `✅ PASSED: Zero hard-coded colors detected!` (Scans all `.tsx`, `.ts`, and `.css` files).*

### 4. Run Visual Regression Tests
Execute the Playwright visual regression suite against the running app:
```bash
npm run test:visual
```
To view the generated interactive HTML report:
```bash
npx playwright show-report
```

### 5. Update Visual Snapshots (Baseline Re-capture)
```bash
npm run test:visual:update
```

---

## 🏛️ Design Token Architecture

```
┌────────────────────────────────────────────────────────┐
│  Layer 1: Primitive Tokens (src/tokens/primitives.css) │
│  Raw values: #0a0f1d, 1rem, 0.5rem, 'Inter', etc.      │
└───────────────────────────┬────────────────────────────┘
                            │ Aliased by
                            ▼
┌────────────────────────────────────────────────────────┐
│  Layer 2: Semantic Tokens (src/tokens/semantic.css)    │
│  Contextual roles: --color-bg-primary, --color-accent  │
│  Overridden by Themes: light.css, dark.css, brand.css  │
└───────────────────────────┬────────────────────────────┘
                            │ Applied to
                            ▼
┌────────────────────────────────────────────────────────┐
│  Layer 3: Component Tokens (src/tokens/components.css) │
│  Specific elements: --button-primary-bg, --card-bg     │
└────────────────────────────────────────────────────────┘
```

### Architectural Principles
1. **Primitives are Immutable:** Primitive values represent physical assets (printer inks, paper stocks, base 4px spacing). They are never overridden by themes.
2. **Themes Override Semantics Only:** A theme (such as `dark.css` or `brand.css`) binds semantic tokens (`--color-bg-primary`, `--color-accent`) to different primitives.
3. **Components are Decoupled:** Components consume Layer 3 component tokens or Layer 2 semantic tokens. No component file touches a raw hex code or arbitrary pixel size.

For the complete dictionary of tokens, refer to [docs/TOKENS.md](./docs/TOKENS.md).

---

## 🎨 Themes

| Theme Key | Visual Profile | Intended Usage | Key Aesthetic Tokens |
|---|---|---|---|
| **Light** | Clean daylight office | Administrative billing, prepress prep | Pure paper white canvas, slate ink, royal press blue |
| **Dark** | Night-shift high contrast | Press floor machinery operators | Midnight ink `#0a0f1d`, subtle borders, luminous cyan |
| **Brand** | Heritage letterpress atelier | Client proofing, bespoke editions | Warm parchment `#fdfcf7`, editorial serif, vermilion `#b91c1c` |

Themes are activated dynamically by setting `data-theme="light|dark|brand"` on the root `<html>` element. Preferences persist in `localStorage` and respect `prefers-color-scheme`.

---

## 🧩 Reusable Components (10 Built)

Every component is fully typed in TypeScript, accepts standard HTML attributes and refs, and is styled exclusively via design tokens.

| Component | Variants | Sizes | Key Design Tokens Used |
|---|---|---|---|
| **Button** | `primary`, `secondary`, `ghost`, `danger` | `sm`, `md`, `lg` | `--button-*-bg`, `--button-radius`, `--color-focus-ring` |
| **Card** | `default`, `elevated`, `outlined` | Padding scales | `--card-bg`, `--card-border`, `--card-padding`, `--card-shadow` |
| **Badge** | `neutral`, `info`, `success`, `warning`, `danger` | `sm`, `md`, `lg` | `--badge-*-bg`, `--badge-*-fg`, `--badge-radius` |
| **Alert** | `info`, `success`, `warning`, `error` | Auto | `--alert-*-bg`, `--alert-*-border`, `--alert-*-icon` |
| **Input** | Normal, error state, disabled state | `sm`, `md`, `lg` | `--input-bg`, `--input-border`, `--input-focus-ring` |
| **Modal** | Overlay with header, scroll body, footer | `sm`, `md`, `lg`, `xl`| `--modal-overlay`, `--modal-bg`, `--modal-radius` |
| **Tabs** | `pill`, `underline` | Accessible tabs | `--tab-list-bg`, `--tab-active-bg`, `--tab-border` |
| **Tooltip** | Top, bottom, left, right | Hover / focus | `--tooltip-bg`, `--tooltip-fg`, `--tooltip-shadow` |
| **Skeleton** | `text`, `circular`, `rectangular` | Fluid / fixed | `--skeleton-bg`, `--skeleton-shimmer` |
| **EmptyState**| Icon, title, description, action | `sm`, `md`, `lg` | `--emptystate-bg`, `--emptystate-border`, `--emptystate-icon-bg`|

---

## 📐 Layout Primitives (3 Built)

- **`Stack`:** Vertical and horizontal layout flow with tokenized gaps (`--pp-space-1` through `--pp-space-16`).
- **`Grid`:** Responsive multi-column layout with customizable column counts and tokenized gap scales.
- **`Container`:** Viewport width container (`sm`, `md`, `lg`, `xl`, `2xl`, `full`) with responsive gutter padding.

---

## ⚠️ Resilient Failure States (5 Critical Cases)

Each failure state is composed entirely of `Alert`, `EmptyState`, and `Button`, utilizing inline SVGs with zero external icon dependencies:

| Failure Case | Trigger Scenario | User Recovery Workflow | Token-Styled Elements |
|---|---|---|---|
| **1. Offline** | Machine loses local network / Wi-Fi | "Retry Connection" button dispatches network probe | Warning Alert, disconnect SVG icon, Primary Button |
| **2. Timeout** | 2400 DPI vector RIP exceeds 30s | "Try Again" resets job worker; "View Queue" link | Warning Alert, clock SVG icon, Dual Button actions |
| **3. 500 Error** | Press orchestration microservice fails | Displays trace ID (`ERR-500-PRESS-7829`) + retry | Error Alert, server rack SVG icon, Primary Retry |
| **4. Invalid Data** | Malformed PDF metadata or missing bleed | "Refresh Data" re-fetches XML schema from press catalog | Error Alert, corrupt file SVG icon, Primary Action |
| **5. Expired Session**| Operator workstation idle >15 minutes | "Sign In Again" initiates operator authentication | Info Alert, padlock SVG icon, Primary Sign In Button |

---

## 🧪 Visual Regression Testing (Free Chromatic Alternative)

Using Playwright's `toHaveScreenshot()` API, we simulate real-world browser rendering at 1280×800 with animations disabled:
- **Baseline Capture:** Initial snapshots captured across 3 themes, 10 components, and 5 failure states.
- **Intentional Break Workflow:** Verified in `tests/visual/themes.spec.ts`. Altering a token in `brand.css` causes an immediate, deterministic test failure with pixel-by-pixel differential screenshots.
- See [docs/TESTING.md](./docs/TESTING.md) for step-by-step instructions.

---

## 🔍 Validation Approach & Color Token Enforcement

To maintain long-term design system integrity, `scripts/check-hardcoded-colors.js` enforces that zero arbitrary colors exist in component files:
- Flags hex `#...`, `rgb()`, `rgba()`, `hsl()`, `hsla()`.
- Flags default Tailwind utility classes (e.g., `bg-red-500`, `text-blue-600`, `text-white`).
- Excludes legitimate token definitions in `src/tokens/` and `src/themes/`.
- Runs automatically in CI before any test is executed.
- See [docs/VALIDATION.md](./docs/VALIDATION.md) for full audit reports.

---

## 📊 Results & System Metrics

- **Total Design Tokens Defined:** 82 (32 primitives, 24 semantic aliases, 26 component tokens)
- **Themes Supported:** 3 (Light, Dark, Brand)
- **Components Built:** 10 reusable UI components + 3 layout primitives
- **Failure States Built:** 5 complete user recovery workflows
- **Automated Visual Regression Tests:** 64 screenshot test cases across all themes
- **Hard-Coded Color Violations:** 0 (Verified via `npm run check:colors`)
- **Visual Test Pass Rate:** 100%

---

## ⚠️ System Limitations

1. **Cross-OS Sub-Pixel Font Anti-Aliasing Drift:** Headless Chromium rendering on macOS produces slightly different font sub-pixel antialiasing compared to Linux CI runners. In CI, we pin execution to an Ubuntu container to prevent false positive screenshot diffs.
2. **Automated WCAG 2.2 Contrast Matrix Verification:** While all three official themes meet WCAG AA contrast standards, dynamically generated third-party user palettes currently require manual auditing rather than automated CI contrast checks.

---

## 🔮 Future Improvements

1. **Figma Tokens Studio Automated Sync:** Implement a bidirectional GitHub Action syncing tokens directly between Figma Tokens Studio and `src/tokens/primitives.css`.
2. **Accessibility Simulator Overlay:** Build a live color-blindness simulator mode (Protanopia, Deuteranopia, Tritanopia) directly into the playground header to assist prepress operators.

---

## 📜 Additional Documentation

- [Project Scope Statement](./docs/SCOPE.md)
- [Complete Design Tokens Specification](./docs/TOKENS.md)
- [Visual Regression Strategy](./docs/TESTING.md)
- [Color Token Validation Audit](./docs/VALIDATION.md)
- [Video Presentation Script](./docs/VIDEO_SCRIPT.md)
- [Group Lead 5-Line Check-In](./docs/GROUP_CHECKIN.md)
- [Sprint Changelog](./CHANGELOG.md)

---

## 📄 License

MIT License. Developed for the SDC Web Development Internship Specialist Advanced Build.
