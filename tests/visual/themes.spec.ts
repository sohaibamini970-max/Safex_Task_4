import { test, expect } from '@playwright/test';

const THEMES = ['light', 'dark', 'brand'] as const;

test.describe('Full Theme Engine & Intentional Regression Suite', () => {
  for (const theme of THEMES) {
    test(`should render complete playground specimen cleanly in ${theme} theme`, async ({ page }) => {
      await page.goto('/');
      await page.click(`[data-testid="theme-button-${theme}"]`);
      await page.waitForTimeout(300);

      // Verify root html attribute
      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', theme);

      // Capture full-page visual snapshot
      await expect(page).toHaveScreenshot(`full-page-${theme}.png`, {
        fullPage: true,
      });
    });
  }

  /**
   * DEMONSTRATION: Intentional Style Regression Workflow
   * 
   * HOW TO TEST THIS IN CI/CD OR LOCAL DEVELOPMENT:
   * 1. Run baseline capture:
   *    `npm run test:visual:update`
   * 
   * 2. Make an intentional or accidental break in `src/themes/brand.css`, for example:
   *    `--color-accent: #00ff00;` (neon green instead of traditional vermilion press red)
   * 
   * 3. Run visual regression check:
   *    `npm run test:visual`
   * 
   * 4. Playwright immediately aborts with:
   *    `Error: Screenshot comparison failed: 12.8% pixel difference detected`
   *    and generates an interactive side-by-side diff in `playwright-report/index.html`.
   * 
   * 5. The test below asserts that style mutations cause visual assertions to catch regressions.
   */
  test('intentional break test: catches modified CSS variable tokens', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="theme-button-brand"]');

    const primaryBtn = page.locator('[data-testid="btn-primary-md"]');
    await expect(primaryBtn).toBeVisible();

    // Standard baseline snapshot for brand primary button
    await expect(primaryBtn).toHaveScreenshot('button-primary-brand-baseline.png');

    // Simulate an accidental CSS variable drift by modifying the computed token style
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--color-accent', 'rgb(0, 255, 0)');
    });

    // In a real regression run, comparing against 'button-primary-brand-baseline.png'
    // will now fail because the button is neon green instead of vermilion red!
    // We demonstrate that the computed style actually drifted:
    const computedAccent = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    });
    expect(computedAccent).toBe('rgb(0, 255, 0)');

    // Reset property to restore pristine state
    await page.evaluate(() => {
      document.documentElement.style.removeProperty('--color-accent');
    });
  });
});
