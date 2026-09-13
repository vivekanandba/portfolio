import { test, expect } from '@playwright/test';

// Relative goto paths on purpose: baseURL ends in /portfolio/ (see case-studies.spec.ts).

test('the Legend archive renders its guarantee and links into a project page', async ({ page }) => {
  await page.goto('archive/legend/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Legend archive/i);
  const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
  expect(ogUrl).toContain('/portfolio/archive/legend/');
  await expect(page.getByRole('heading', { name: /What was left out/i })).toBeAttached();
  await page
    .getByRole('link', { name: /IGCAR Nuclear Slip Ring/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/portfolio\/work\/igcar-slipring\/$/);
});

test('the command palette routes home to a section from the archive page', async ({ page }) => {
  await page.goto('archive/legend/');
  // The ⌘K listener attaches on hydration; a press before that is lost (not a
  // toggle), so press until the dialog appears rather than once and hope.
  await expect(async () => {
    await page.keyboard.press('Control+k');
    await expect(page.getByRole('combobox')).toBeVisible({ timeout: 500 });
  }).toPass({ timeout: 15_000 });
  const input = page.getByRole('combobox');
  await input.fill('turning points');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/portfolio\/#turning-points$/);
});

test('a project page and the work index link into the archive', async ({ page }) => {
  await page.goto('work/legend-technologies/');
  await page
    .getByRole('link', { name: /Legend archive/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/portfolio\/archive\/legend\/$/);
  await page.goto('work/');
  await expect(page.getByRole('link', { name: /Legend archive/i })).toBeAttached();
});
