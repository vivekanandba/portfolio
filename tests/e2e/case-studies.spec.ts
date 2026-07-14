import { test, expect } from '@playwright/test';
// Relative import on purpose: the collection only pulls type imports, so this
// stays runtime-dependency-free under Playwright's esbuild loader.
import { caseStudies } from '../../src/content/caseStudies';

// Relative goto paths on purpose: baseURL ends in /portfolio/, and a leading
// slash would escape the base path (greens locally, 404s on Pages).

for (const cs of caseStudies) {
  test(`case study ${cs.slug} renders end-to-end`, async ({ page }) => {
    await page.goto(`work/${cs.slug}/`);
    await expect(page).toHaveTitle(new RegExp('Vivekanand B'));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(cs.title);
    // The annotated systems diagram is present and accessible.
    await expect(page.getByRole('img')).toBeVisible();
    // og:url carries the base path and the route.
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toContain(`/portfolio/work/${cs.slug}/`);
  });
}

test('a case-study page has the full article structure and way back (deep check)', async ({
  page,
}) => {
  await page.goto('work/playground/');
  for (const heading of ['The problem', 'Constraints', 'Decisions & tradeoffs']) {
    await expect(page.getByRole('heading', { name: heading })).toBeAttached();
  }
  await page.getByRole('link', { name: /back to all work/i }).click();
  await expect(page).toHaveURL(/\/portfolio\/#work$/);
});

test('the /work/ index lists every case study and navigates', async ({ page }) => {
  await page.goto('work/');
  await expect(page.getByRole('heading', { level: 1, name: 'Case studies' })).toBeVisible();
  for (const cs of caseStudies) {
    await expect(page.getByRole('link', { name: cs.title })).toBeAttached();
  }
  await page.getByRole('link', { name: caseStudies[0].title }).click();
  await expect(page).toHaveURL(new RegExp(`/portfolio/work/${caseStudies[0].slug}/$`));
});

test('a flagship card click-through reaches its case study', async ({ page }) => {
  await page.goto('');
  await page
    .getByRole('link', { name: /read the case study/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/portfolio\/work\/[a-z0-9-]+\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('a More-work title links to its case study', async ({ page }) => {
  await page.goto('');
  const moreWorkLink = page
    .locator('#work')
    .getByRole('link', { name: 'Admin Portal — Releases & Timezones' });
  await expect(moreWorkLink).toBeAttached();
  expect(await moreWorkLink.getAttribute('href')).toContain('/work/sanas-portal/');
});

test('unknown case-study slugs get the custom 404', async ({ page }) => {
  const res = await page.goto('work/not-a-real-project/');
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/doesn’t exist/i)).toBeVisible();
});
