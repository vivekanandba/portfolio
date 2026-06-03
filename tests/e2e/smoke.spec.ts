import { test, expect } from '@playwright/test';

const SECTIONS = ['about', 'work', 'skills', 'journey', 'credentials', 'contact'];

test('landing page renders all sections', async ({ page }) => {
  await page.goto('');

  await expect(page.getByRole('heading', { level: 1, name: 'Vivekanand B' })).toBeVisible();

  for (const id of SECTIONS) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
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

test('primary CTA scrolls to work and a featured project is visible', async ({ page }) => {
  await page.goto('');
  await page.getByRole('link', { name: 'View Work' }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole('heading', { name: 'Sanas Consumer Mobile App' })).toBeVisible();
});
