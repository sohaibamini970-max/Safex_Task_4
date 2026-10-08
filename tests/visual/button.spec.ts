import { test, expect } from '@playwright/test';

const THEMES = ['light', 'dark', 'brand'] as const;
const VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;

test.describe('Button Component Visual Regression', () => {
  for (const theme of THEMES) {
    test.describe(`Theme: ${theme}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.click(`[data-testid="theme-button-${theme}"]`);
        await page.waitForTimeout(200);
      });

      for (const variant of VARIANTS) {
        test(`should render ${variant} button correctly in ${theme} theme`, async ({ page }) => {
          const button = page.locator(`[data-testid="btn-${variant}-md"]`);
          await expect(button).toBeVisible();
          await expect(button).toHaveScreenshot(`button-${variant}-${theme}.png`);
        });
      }

      test(`should render all button sizes (sm, md, lg) in ${theme} theme`, async ({ page }) => {
        const btnSm = page.locator('[data-testid="btn-sm"]');
        const btnMd = page.locator('[data-testid="btn-md"]');
        const btnLg = page.locator('[data-testid="btn-lg"]');

        await expect(btnSm).toHaveScreenshot(`button-sm-${theme}.png`);
        await expect(btnMd).toHaveScreenshot(`button-md-${theme}.png`);
        await expect(btnLg).toHaveScreenshot(`button-lg-${theme}.png`);
      });

      test(`should render disabled button state in ${theme} theme`, async ({ page }) => {
        const disabledBtn = page.locator('[data-testid="btn-disabled"]');
        await expect(disabledBtn).toHaveScreenshot(`button-disabled-${theme}.png`);
      });
    });
  }
});
