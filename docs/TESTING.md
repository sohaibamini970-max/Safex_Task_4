# Visual Regression Testing Strategy: Heritage Press Design System

This guide documents the automated visual regression infrastructure configured via Playwright, providing a reliable, open-source alternative to commercial platforms like Chromatic or Percy.

---

## 1. Why Visual Regression Testing Matters in Design Systems

Unit tests and component integration tests (such as Jest or React Testing Library) verify that DOM elements render and callbacks trigger. However, they are completely blind to visual regressions:
- Did changing `--color-accent` turn the brand button unreadable on dark backgrounds?
- Did an extra 2px padding cause layout overflow in high-density press telemetry cards?
- Did an altered border radius clip a badge icon?

Visual regression testing captures pixel snapshots of components in isolation and automatically flags pixel differences between the Pull Request and the golden baseline.

---

## 2. How Playwright `toHaveScreenshot()` Works

Playwright renders components inside a real headless Chromium engine at a fixed viewport (1280×800) with animations disabled.

```typescript
await expect(locator).toHaveScreenshot('button-primary-brand.png', {
  maxDiffPixelRatio: 0.01, // Tolerates up to 1% sub-pixel rendering variation
  threshold: 0.2,          // Pixel color difference threshold
  animations: 'disabled',  // Prevents timer/animation flakiness
});
```

When run:
1. Playwright isolates the target locator or page.
2. It captures the rendered frame as a PNG.
3. It performs a perceptual byte-and-color comparison against the baseline file stored in `tests/visual/__snapshots__/`.
4. If the difference exceeds `maxDiffPixelRatio`, the test fails and generates an interactive diff.

---

## 3. Capturing and Updating Golden Baselines

### Capturing Baselines for the First Time
```bash
npm run test:visual:update
```
This generates reference PNGs in `tests/visual/__snapshots__/` for all 3 themes, 10 components, and 5 failure states.

### Running Regression Suite Locally
```bash
npm run test:visual
```
All snapshots are compared against existing golden references. If identical, the test passes with green checkmarks.

### Updating Baselines After Approved Design Updates
When an intentional design change is approved (for example, redesigning button padding):
```bash
npm run test:visual:update
```
Commit the updated PNG snapshots along with your code changes.

---

## 4. The "Intentional Break" Workflow (Step-by-Step)

To demonstrate how the system catches unintended visual drift, follow this verification exercise:

### Step 1: Ensure Clean Baseline
Run:
```bash
npm run test:visual
```
*Result: 64/64 tests pass.*

### Step 2: Introduce an Intentional Break
Edit `src/themes/brand.css`:
```css
/* Change the vermilion red to a jarring neon lime */
[data-theme="brand"] {
  --color-accent: #00ff00; /* Deliberate violation */
}
```

### Step 3: Run the Regression Suite
```bash
npm run test:visual
```

### Step 4: Inspect Failure Output
Playwright immediately halts:
```text
Error: Screenshot comparison failed:
  12.8% pixel ratio difference detected for 'button-primary-brand.png'
  Expected: tests/visual/__snapshots__/button-primary-brand.png
  Actual:   test-results/button-primary-brand-actual.png
  Diff:     test-results/button-primary-brand-diff.png
```

### Step 5: Open the Interactive HTML Report
```bash
npx playwright show-report
```
Playwright presents a side-by-side view with a slider showing:
1. **Actual:** The neon green button produced by the commit.
2. **Expected:** The approved vermilion red button.
3. **Diff:** Red pixel overlay highlighting the exact altered region.

### Step 6: Revert and Restore
Revert the change in `src/themes/brand.css` to restore `--color-accent: var(--pp-color-red-700);`. Rerun `npm run test:visual`. All tests pass immediately.

---

## 5. How to Read a Visual Diff
- **Unchanged Pixels:** Dimmed grayscale background.
- **Removed Pixels:** Magenta overlay (elements that shifted or disappeared).
- **Added Pixels:** Cyan / Yellow overlay (new elements or color drift).
- **Pixel Count / Ratio:** Playwright reports exact percentage drift. If it's `0.001%`, it may be OS font anti-aliasing; if it's `>1%`, it represents an actual visual regression.

---

## 6. Continuous Integration (CI) Workflow

The GitHub Actions workflow (`.github/workflows/visual-tests.yml`) executes on every Pull Request:
1. Spins up Ubuntu runner.
2. Installs headless Chromium dependencies.
3. Executes `npm run check:colors` (zero hardcoded colors check).
4. Executes `npm run lint` (TypeScript strict check).
5. Executes `npm run test:visual`.
6. On failure, automatically uploads the `playwright-report/` zip artifact for instant team inspection.
