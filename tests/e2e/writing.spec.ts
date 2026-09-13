import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '@playwright/test';

// CommonJS under Playwright: read the posts' frontmatter with a regex rather
// than importing the ESM pipeline (ADR-0017).
const DIR = 'src/content/writing';
const posts = readdirSync(DIR)
  .filter((f) => f.endsWith('.md') && f !== 'README.md')
  .map((f) => {
    const src = readFileSync(join(DIR, f), 'utf8');
    const title = src.match(/^title:\s*'?"?(.+?)'?"?\s*$/m)![1];
    const draft = /^draft:\s*true/m.test(src);
    return { slug: f.replace(/\.md$/, ''), title, draft };
  })
  .filter((p) => !p.draft);

test('the writing index lists every published post', async ({ page }) => {
  await page.goto('writing/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  for (const p of posts) await expect(page.getByRole('link', { name: p.title })).toBeAttached();
});

test('a post renders with its h1 and base-path-aware og:url and og:image', async ({ page }) => {
  const p = posts[0];
  await page.goto(`writing/${p.slug}/`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.title);
  const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
  expect(ogUrl).toContain(`/portfolio/writing/${p.slug}/`);
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(ogImage).toContain(`/portfolio/writing/${p.slug}/opengraph-image`);
  const img = await page.request.get(ogImage!);
  expect(img.status()).toBe(200);
  expect(img.headers()['content-type']).toContain('image/png');
});

test('the Atom feed and the sitemap are served as XML', async ({ page, baseURL }) => {
  const feed = await page.request.get(new URL('feed.xml', baseURL).toString());
  expect(feed.status()).toBe(200);
  const xml = await feed.text();
  expect(xml).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
  expect((xml.match(/<entry>/g) ?? []).length).toBe(posts.length);
  const map = await page.request.get(new URL('sitemap.xml', baseURL).toString());
  expect(map.status()).toBe(200);
  expect(await map.text()).toContain('/portfolio/writing/');
});

test('a cited project page shows the notes; an uncited one does not; unknown slugs 404', async ({
  page,
  baseURL,
}) => {
  await page.goto('work/legend-technologies/');
  await expect(page.getByRole('heading', { name: /notes from this project/i })).toBeAttached();
  await page.goto('work/playground/');
  await expect(page.getByRole('heading', { name: /notes from this project/i })).toHaveCount(0);
  const missing = await page.request.get(new URL('writing/no-such-post/', baseURL).toString());
  expect(missing.status()).toBe(404);
});

test('the landing page has the Writing section and the nav reaches it', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('#writing')).toBeAttached();
  await expect(page.locator('#writing').getByRole('link', { name: /all writing/i })).toBeAttached();
});
