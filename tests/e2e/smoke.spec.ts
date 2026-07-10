import { test, expect } from '@playwright/test';

const SECTIONS = ['about', 'work', 'skills', 'journey', 'credentials', 'contact'];

test('landing page renders all sections', async ({ page }) => {
  await page.goto('');

  await expect(page.getByRole('heading', { level: 1, name: 'Vivekanand B' })).toBeVisible();

  for (const id of SECTIONS) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }

  // Secondary work renders below the featured grid.
  await expect(page.locator('#work').getByRole('heading', { name: /more work/i })).toBeAttached();
});

test('resume PDF link resolves under the base path', async ({ page, baseURL }) => {
  await page.goto('');
  const resume = page.getByRole('link', { name: 'Resume', exact: true });
  const href = await resume.getAttribute('href');
  expect(href).toContain('Vivekanandb-Resume.pdf');

  // The PDF must actually be served (real file, not an index.html fallback).
  const res = await page.request.get(new URL(href!, baseURL).toString());
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('pdf');
});

test('og:image is absolute and the file is served', async ({ page, baseURL }) => {
  await page.goto('');
  const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute('content');
  expect(ogImage).toContain('/portfolio/og.png');

  const res = await page.request.get(new URL('og.png', baseURL).toString());
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('image/png');
});

test('mobile menu opens and navigates to a section', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile viewport only');
  await page.goto('');
  await page.getByRole('button', { name: /open menu/i }).click();
  await page.locator('#mobile-menu').getByRole('link', { name: 'Skills' }).click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.locator('#mobile-menu')).toHaveCount(0);
});

test('unknown paths get the custom 404 page', async ({ page }) => {
  const res = await page.goto('this-page-does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/doesn’t exist/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /back to the portfolio/i })).toBeVisible();
});

test.describe('dark mode', () => {
  test.use({ colorScheme: 'dark' });

  test('dark palette applies via prefers-color-scheme', async ({ page }) => {
    await page.goto('');
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe('rgb(19, 19, 22)');
  });
});

test('nav marks Contact active at the bottom of the page', async ({ page }) => {
  await page.goto('');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.locator('nav a[aria-current="location"]')).toHaveText('Contact');
});

test('hero leads with the domain arc and experience stats', async ({ page }) => {
  await page.goto('');
  await expect(page.getByText('Aerospace → Healthcare Robotics → AI-Native')).toBeVisible();
  // exact: the footer prose also contains "years of engineering".
  await expect(page.getByText('years of engineering', { exact: true })).toBeVisible();
  await expect(page.getByText('domains mastered')).toBeVisible();
  await expect(page.getByText('patent granted')).toBeVisible();
  await expect(page.getByText(/open to/i)).toHaveCount(0);
});

test('primary CTA scrolls to work and a featured project is visible', async ({ page }) => {
  await page.goto('');
  await page.getByRole('link', { name: 'View Work' }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole('heading', { name: 'Sanas Consumer Mobile App' })).toBeVisible();
});
