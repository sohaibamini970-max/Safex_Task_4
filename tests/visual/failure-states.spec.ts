import { test, expect } from '@playwright/test';

const THEMES = ['light', 'dark', 'brand'] as const;
const FAILURE_CASES = [
  { key: 'offline', testId: 'failure-state-offline' },
  { key: 'timeout', testId: 'failure-state-timeout' },
  { key: 'server-error', testId: 'failure-state-server-error' },
  { key: 'invalid-data', testId: 'failure-state-invalid-data' },
  { key: 'expired-session', testId: 'failure-state-expired-session' },
] as const;

test.describe('Failure States Visual Regression Suite', () => {
  for (const theme of THEMES) {
    test.describe(`Theme: ${theme}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.click(`[data-testid="theme-button-${theme}"]`);
        await page.waitForTimeout(200);
      });

      for (const failureCase of FAILURE_CASES) {
        test(`should render ${failureCase.key} failure state in ${theme} theme`, async ({ page }) => {
          // Switch tab to failure case
          await page.click(`[data-testid="failure-tab-${failureCase.key}"]`);
          await page.waitForTimeout(150);

          const failureContainer = page.locator(`[data-testid="${failureCase.testId}"]`);
          await expect(failureContainer).toBeVisible();
          await expect(failureContainer).toHaveScreenshot(`failure-${failureCase.key}-${theme}.png`);
        });
      }
    });
  }
});
