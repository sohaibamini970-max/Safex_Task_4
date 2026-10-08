import { test, expect } from '@playwright/test';

const THEMES = ['light', 'dark', 'brand'] as const;
const VARIANTS = ['default', 'elevated', 'outlined'] as const;

test.describe('Card Component Visual Regression', () => {
  for (const theme of THEMES) {
    test.describe(`Theme: ${theme}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.click(`[data-testid="theme-button-${theme}"]`);
        await page.waitForTimeout(200);
      });

      for (const variant of VARIANTS) {
        test(`should render card ${variant} variant in ${theme} theme`, async ({ page }) => {
          const card = page.locator(`[data-testid="card-variant-${variant}"]`);
          await expect(card).toBeVisible();
          await expect(card).toHaveScreenshot(`card-${variant}-${theme}.png`);
        });
      }
    });
  }
});
