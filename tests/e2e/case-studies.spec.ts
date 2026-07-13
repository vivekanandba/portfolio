import { test, expect } from '@playwright/test';

// Relative paths on purpose: baseURL ends in /portfolio/, and a leading slash
// would escape the base path (greens locally, 404s on Pages).
const STUDIES = [
  { slug: 'playground', h1: /430k requests a day/i },
  { slug: 'sanas-for-sales', h1: /Enterprise GA in three months/i },
  { slug: 'sanas-consumer-app', h1: /production B2C app/i },
];

for (const { slug, h1 } of STUDIES) {
  test(`case study ${slug} renders end-to-end`, async ({ page }) => {
    await page.goto(`work/${slug}/`);
    await expect(page).toHaveTitle(new RegExp('Vivekanand B'));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(h1);
    // The annotated systems diagram is present and accessible.
    await expect(page.getByRole('img')).toBeVisible();
    // Section structure (scrolled below the fold — assert attached, reveals are JS-gated).
    for (const heading of ['The problem', 'Constraints', 'Decisions & tradeoffs']) {
      await expect(page.getByRole('heading', { name: heading })).toBeAttached();
    }
    // og:url carries the base path and the route.
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toContain(`/portfolio/work/${slug}/`);
    // The back link returns to the work section.
    await page.getByRole('link', { name: /back to all work/i }).click();
    await expect(page).toHaveURL(/\/portfolio\/#work$/);
  });
}

test('a flagship card click-through reaches its case study', async ({ page }) => {
  await page.goto('');
  await page
    .getByRole('link', { name: /read the case study/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/portfolio\/work\/[a-z0-9-]+\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('unknown case-study slugs get the custom 404', async ({ page }) => {
  const res = await page.goto('work/not-a-real-project/');
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/doesn’t exist/i)).toBeVisible();
});
