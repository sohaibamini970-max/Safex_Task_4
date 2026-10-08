# Design Token Architecture: Heritage Press Design System

This document outlines the three-tier token architecture governing the Heritage Regional Printing Press component system.

---

## 1. Architectural Philosophy: The Three-Tier Token Model

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

### Why Three Tiers?
1. **Decoupling Brand Intent from Raw Hex Codes:** A button never references `#3b82f6` or `bg-blue-600`. It references `--button-primary-bg`, which resolves to `--color-accent`, which resolves to `--pp-color-blue-600` (in light mode) or `--pp-color-red-700` (in brand mode).
2. **Deterministic Theming:** When introducing new themes (e.g., Night Shift Dark or Heritage Brand), engineers override **only** Layer 2 semantic tokens. Primitives remain immutable. Components require zero CSS alterations.

---

## 2. Layer 1: Primitive Tokens Table (`src/tokens/primitives.css`)

### Color Scale (Press Inks, Papers & Statuses)
| Token Name | Value | Purpose / Meaning |
|---|---|---|
| `--pp-color-ink-950` | `#0a0f1d` | Pitch black offset printer ink |
| `--pp-color-ink-900` | `#101828` | Primary text high-contrast ink |
| `--pp-color-ink-800` | `#1e293b` | Dark slate platen metal tone |
| `--pp-color-ink-700` | `#334155` | Secondary text ink |
| `--pp-color-ink-600` | `#475569` | Mid-slate subdued ink |
| `--pp-color-ink-500` | `#64748b` | Muted captions & icon ink |
| `--pp-color-ink-400` | `#94a3b8` | Disabled text ink |
| `--pp-color-ink-300` | `#cbd5e1` | Strong divider borders |
| `--pp-color-ink-200` | `#e2e8f0` | Subtle hairline borders |
| `--pp-color-ink-100` | `#f1f5f9` | Light slate panel fill |
| `--pp-color-ink-50`  | `#f8fafc` | Clean daylight canvas |
| `--pp-color-paper-50` | `#fdfcf7` | Hand-made cotton rag paper |
| `--pp-color-paper-100`| `#fbf8ee` | Warm bookbinding parchment |
| `--pp-color-paper-200`| `#f4eedc` | Letterpress card backing |
| `--pp-color-paper-300`| `#e8ddc0` | Parchment fiber border |
| `--pp-color-paper-400`| `#d6c59d` | Heavy kraft card stock |
| `--pp-color-blue-500` | `#3b82f6` | Process cyan fountain ink |
| `--pp-color-blue-600` | `#2563eb` | Vibrant prepress digital blue |
| `--pp-color-blue-700` | `#1d4ed8` | Deep fountain roller blue |
| `--pp-color-red-600`  | `#dc2626` | Proof correction red |
| `--pp-color-red-700`  | `#b91c1c` | Vermilion letterpress stamp accent |
| `--pp-color-amber-500`| `#f59e0b` | Registration caution amber |
| `--pp-color-green-600`| `#16a34a` | Approved press run green |
| `--pp-color-white`    | `#ffffff` | Absolute paper white |
| `--pp-color-black`    | `#000000` | Absolute black |

### Spacing Scale (Base: 4px)
| Token Name | Value | Rem Equivalent |
|---|---|---|
| `--pp-space-1` | `0.25rem` | 4px |
| `--pp-space-2` | `0.5rem`  | 8px |
| `--pp-space-3` | `0.75rem` | 12px |
| `--pp-space-4` | `1rem`    | 16px |
| `--pp-space-5` | `1.25rem` | 20px |
| `--pp-space-6` | `1.5rem`  | 24px |
| `--pp-space-8` | `2rem`    | 32px |
| `--pp-space-10`| `2.5rem`  | 40px |
| `--pp-space-12`| `3rem`    | 48px |
| `--pp-space-16`| `4rem`    | 64px |

### Typography & Radii
| Token Name | Value | Purpose |
|---|---|---|
| `--pp-font-sans` | `'Inter', sans-serif` | Clean digital interface typography |
| `--pp-font-serif`| `'Newsreader', 'Cinzel', serif` | Traditional letterpress craft typography |
| `--pp-font-mono` | `'Fira Code', monospace` | Press telemetry, DPI, and GSM specs |
| `--pp-font-size-xs` | `0.75rem` (12px) | Footers, status badges |
| `--pp-font-size-sm` | `0.875rem` (14px) | Body copy, secondary captions |
| `--pp-font-size-base`| `1rem` (16px) | Standard UI controls |
| `--pp-font-size-lg` | `1.125rem` (18px) | Section headers, card titles |
| `--pp-font-size-2xl`| `1.5rem` (24px) | Modal headings, major section titles |
| `--pp-radius-sm` | `0.25rem` (4px) | Tooltips, code tags |
| `--pp-radius-md` | `0.5rem` (8px) | Buttons, inputs, interactive controls |
| `--pp-radius-lg` | `0.75rem` (12px) | Cards, modals, dialog containers |
| `--pp-radius-full`| `9999px` | Badges, pill tabs |

---

## 3. Layer 2: Semantic Tokens Table (`src/tokens/semantic.css`)

| Semantic Token | Default Light Mapping | Dark Theme Mapping | Brand Theme Mapping |
|---|---|---|---|
| `--color-bg-primary` | `--pp-color-white` | `--pp-color-ink-950` | `--pp-color-paper-50` |
| `--color-bg-secondary` | `--pp-color-ink-50` | `--pp-color-ink-900` | `--pp-color-paper-100` |
| `--color-bg-elevated` | `--pp-color-white` | `--pp-color-ink-800` | `--pp-color-paper-50` |
| `--color-text-primary` | `--pp-color-ink-900` | `--pp-color-ink-50` | `--pp-color-ink-950` |
| `--color-text-secondary` | `--pp-color-ink-600` | `--pp-color-ink-300` | `--pp-color-ink-800` |
| `--color-text-muted` | `--pp-color-ink-400` | `--pp-color-ink-500` | `--pp-color-ink-500` |
| `--color-border-subtle` | `--pp-color-ink-200` | `--pp-color-ink-800` | `--pp-color-paper-300` |
| `--color-border-strong` | `--pp-color-ink-300` | `--pp-color-ink-700` | `--pp-color-paper-400` |
| `--color-accent` | `--pp-color-blue-600` | `--pp-color-blue-500` | `--pp-color-red-700` (Vermilion) |
| `--color-accent-fg` | `--pp-color-white` | `--pp-color-ink-950` | `--pp-color-paper-50` |
| `--color-danger` | `--pp-color-red-600` | `--pp-color-red-400` | `--pp-color-red-700` |
| `--color-warning` | `--pp-color-amber-600` | `--pp-color-amber-400` | `--pp-color-amber-700` |
| `--color-success` | `--pp-color-green-600` | `--pp-color-green-400` | `--pp-color-green-700` |
| `--color-info` | `--pp-color-blue-600` | `--pp-color-blue-400` | `--pp-color-blue-800` |
| `--font-heading` | `--pp-font-sans` | `--pp-font-sans` | `--pp-font-serif` |

---

## 4. Layer 3: Component Tokens Table (`src/tokens/components.css`)

| Component | Token Name | Maps To | Purpose |
|---|---|---|---|
| **Button** | `--button-primary-bg` | `--color-accent` | Primary call to action background |
| | `--button-primary-fg` | `--color-accent-fg` | Primary call to action text |
| | `--button-secondary-bg` | `--color-bg-secondary` | Secondary neutral action background |
| | `--button-ghost-bg` | `transparent` | Ghost borderless action background |
| | `--button-danger-bg` | `--color-danger` | Destructive action background |
| | `--button-radius` | `--radius-interactive` | Standard interactive border radius |
| **Card** | `--card-bg` | `--color-bg-elevated` | Card panel fill |
| | `--card-border` | `--color-border-subtle` | Card boundary line |
| | `--card-padding` | `--pp-space-6` | Standard card internal gutter |
| | `--card-radius` | `--radius-container` | Card rounded corner radius |
| **Input** | `--input-bg` | `--color-bg-primary` | Text field background |
| | `--input-fg` | `--color-text-primary` | Typed input text color |
| | `--input-border` | `--color-border-strong` | Neutral boundary border |
| | `--input-focus-ring` | `--color-focus-ring` | Accessible focus state glow |
| **Alert** | `--alert-info-bg` | `--color-info-bg` | Information banner fill |
| | `--alert-error-bg` | `--color-danger-bg` | Danger banner fill |
| | `--alert-warning-bg` | `--color-warning-bg` | Warning banner fill |
| | `--alert-success-bg` | `--color-success-bg` | Positive feedback banner fill |
| **Modal** | `--modal-overlay` | `rgba(16, 24, 40, 0.6)` | Backdrop blur tint |
| | `--modal-bg` | `--color-bg-elevated` | Dialog window container |
| **Badge** | `--badge-neutral-bg` | `--color-bg-secondary` | Neutral tag background |
| **Tabs** | `--tab-active-bg` | `--color-bg-primary` | Selected tab button fill |
| **Tooltip** | `--tooltip-bg` | `--pp-color-ink-950` | Popup background |
| **Skeleton** | `--skeleton-bg` | `--color-border-subtle` | Loading shimmer baseline |
| **EmptyState** | `--emptystate-bg` | `--color-bg-secondary` | Empty placeholder container fill |

---

## 5. Theme Overriding Rule
A theme definition file (e.g., `src/themes/brand.css`) MUST NEVER mutate primitive tokens:
```css
/* ❌ FORBIDDEN: Mutating primitive directly */
[data-theme="brand"] {
  --pp-color-blue-500: #b91c1c;
}

/* ✅ CORRECT TOKEN DISCIPLINE: Overriding semantic alias */
[data-theme="brand"] {
  --color-accent: var(--pp-color-red-700);
  --color-bg-primary: var(--pp-color-paper-50);
  --font-heading: var(--pp-font-serif);
}
```
This guarantees system predictability, multi-brand scalability, and zero regression cascade.
