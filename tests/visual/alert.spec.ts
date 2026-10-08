import { test, expect } from '@playwright/test';

const THEMES = ['light', 'dark', 'brand'] as const;
const VARIANTS = ['info', 'success', 'warning', 'error'] as const;

test.describe('Alert Component Visual Regression', () => {
  for (const theme of THEMES) {
    test.describe(`Theme: ${theme}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.click(`[data-testid="theme-button-${theme}"]`);
        await page.waitForTimeout(200);
      });

      for (const variant of VARIANTS) {
        test(`should render alert ${variant} variant in ${theme} theme`, async ({ page }) => {
          const alert = page.locator(`[data-testid="alert-${variant}"]`);
          await expect(alert).toBeVisible();
          await expect(alert).toHaveScreenshot(`alert-${variant}-${theme}.png`);
        });
      }
    });
  }
});
