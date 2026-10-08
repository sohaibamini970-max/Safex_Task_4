# Design Token Enforcement & Color Validation Report

**Tool:** `scripts/check-hardcoded-colors.js`  
**Command:** `npm run check:colors`  
**Purpose:** Ensure zero hard-coded colors exist in production component files, layout primitives, and views.

---

## 1. Validation Regex Patterns

The validator inspects all `.ts`, `.tsx`, and `.css` files under `src/` (excluding the authorized token layer `src/tokens/` and theme override files `src/themes/`).

### Pattern 1: Hexadecimal Colors
```javascript
/#([0-9a-fA-F]{3,8})\b/g
```
*Detects 3, 4, 6, and 8-digit hexadecimal colors (e.g. `#fff`, `#101828`, `#dc2626ff`).*

### Pattern 2: Functional RGB / RGBA Values
```javascript
/rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+(?:\s*,\s*[\d.]+%?)?\s*\)/gi
```
*Detects hardcoded rgb and rgba function declarations in inline styles or style objects.*

### Pattern 3: Functional HSL / HSLA Values
```javascript
/hsla?\(\s*[\d.]+(?:deg)?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?(?:\s*,\s*[\d.]+%?)?\s*\)/gi
```
*Detects hardcoded hsl and hsla color values.*

### Pattern 4: Hard-coded Tailwind Color Utilities
```javascript
/\b(?:bg|text|border|ring|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)(?:-(?:50|100|200|300|400|500|600|700|800|900|950))?\b/g
```
*Detects default utility color classes (e.g., `bg-blue-600`, `text-red-500`, `border-gray-200`, `text-white`, `bg-black`).*

---

## 2. Sample Output: Clean Run (Current Project State)

```text
========================================================
  Heritage Press Design System — Color Token Validator  
========================================================

Scanning source files under src/ (excluding tokens/ and themes/)...
Scanned 24 source files.

✅ PASSED: Zero hard-coded colors detected!
All components, layouts, failure states, and views strictly adhere to design tokens.
```
*Exit Code: `0`*

---

## 3. Sample Output: Dirty Run (With Deliberate Violations)

When an engineer accidentally adds a raw color or Tailwind color class (e.g., adding `style={{ backgroundColor: '#2563eb' }}` or `className="text-red-500"` to `src/components/Button.tsx`):

```text
========================================================
  Heritage Press Design System — Color Token Validator  
========================================================

Scanning source files under src/ (excluding tokens/ and themes/)...
Scanned 24 source files.

❌ FAILED: Found 2 hard-coded color violation(s) outside token definitions!

[Violation 1] src/components/Button.tsx:88
  Rule: Hex Color (#rgb, #rrggbb, #rrggbbaa)
  Matched: #2563eb
  Code: "backgroundColor: '#2563eb'"

[Violation 2] src/components/Button.tsx:114
  Rule: Hard-coded Tailwind Color Utility (e.g. text-red-500, bg-blue-600)
  Matched: text-red-500
  Code: "<span className="text-red-500">Alert</span>"

All colors MUST be referenced via CSS variable design tokens.
See docs/TOKENS.md for allowed semantic & component token variables.
```
*Exit Code: `1` (fails the CI/CD pipeline).*

---

## 4. Discovered and Documented Fixes During Sprint Development

During the iterative build of the Heritage Press design system, the validator caught the following issues:

1. **Alert Component Hardcoded Stroke Colors in SVG:**
   - *Issue:* Default Alert SVGs initially contained `stroke="#16a34a"` and `stroke="#dc2626"`.
   - *Fix:* Replaced with `stroke="currentColor"` and styled the wrapping icon container using `color: tokens.iconColor` (mapping to `--alert-*-icon` CSS variables).
2. **Text String Containing Number Symbol in Playground:**
   - *Issue:* A preflight order title originally read `title="Job #8921 Passed Preflight"`, which triggered the hex color regex pattern matching `#8921`.
   - *Fix:* Refactored copy to standard letterpress nomenclature: `title="Job No. 8921 Passed Preflight"`.
3. **Modal Dialog Backdrop Tint:**
   - *Issue:* Modal backdrop initially used a hard-coded CSS rgba overlay.
   - *Fix:* Migrated backdrop color to `--modal-overlay: rgba(16, 24, 40, 0.6)` in `src/tokens/components.css`, referenced via `backgroundColor: 'var(--modal-overlay)'`.
4. **Tailwind Class Sanitization:**
   - *Issue:* Initial drafts used `text-white` for primary button text.
   - *Fix:* Replaced with `color: 'var(--button-primary-fg)'` and `text-[var(--button-primary-fg)]`, ensuring high contrast adapts seamlessly between Daylight White and Night Shift Ink themes.
