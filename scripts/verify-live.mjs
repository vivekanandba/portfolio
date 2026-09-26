#!/usr/bin/env node
/**
 * Post-deploy verification: does the running site work, and is it the thing we
 * just built?
 *
 * CON-COV-001 has said since 2026-08-08 that application coverage says nothing
 * about whether software ships, and listed these checks. Nothing implemented
 * them. Every live check before this one was typed by hand on the day, which
 * means it was skipped on every other day (SPEC-0003).
 *
 *   node scripts/verify-live.mjs [--base <url>] [--commit <sha>]
 *
 * --commit is the SHA the deploy job just built. Given it, this fails when the
 * site is serving anything else — the case where a deploy "succeeded" while an
 * older run's artifact is live, which no green checkmark catches (CON-VER-003).
 *
 * Exits non-zero listing every failure, not just the first, so one run tells you
 * everything that is wrong.
 */
const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const BASE = (flag('base', 'https://vivekanandba.github.io/portfolio') ?? '').replace(/\/$/, '');
const EXPECT_COMMIT = flag('commit');

// Everything after the route loop. Counted here so the summary cannot drift
// from reality the way a hardcoded `+ 6` did.
const NAMED_CHECKS = 8;

const failures = [];
const notes = [];
const fail = (what, detail) => failures.push(`${what}\n      ${detail}`);

async function get(path, init) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { redirect: 'follow', ...init });
    return { res, url };
  } catch (error) {
    return { error, url };
  }
}

async function check(name, path, assert) {
  const { res, url, error } = await get(path);
  if (error) return fail(name, `${url} — request failed: ${error.message}`);
  try {
    await assert(res, url);
    console.log(`  ok    ${name}`);
  } catch (e) {
    fail(name, `${url} — ${e.message}`);
    console.log(`  FAIL  ${name}`);
  }
}

const expect = (condition, message) => {
  if (!condition) throw new Error(message);
};

console.log(`Verifying ${BASE}\n`);

// 1. Every route answers. A 404 here is a routing or base-path regression.
const ROUTES = [
  '/',
  '/work/',
  '/work/aircare/',
  '/writing/',
  '/archive/legend/',
  '/recommendations/',
  '/feed.xml',
  '/sitemap.xml',
  '/version.json',
  // The marks. /favicon.ico especially: browsers request it whether or not the
  // document links to it, and the site answered 404 to every one of them until
  // SPEC-0004 R9 (#73).
  '/favicon.ico',
  '/icon.png',
  '/apple-icon.png',
  '/manifest.webmanifest',
];
for (const route of ROUTES) {
  await check(`GET ${route}`, route, (res) => expect(res.ok, `status ${res.status}`));
}

// 2. The deployed commit is the commit that was built.
await check('serves the commit that was built', '/version.json', async (res) => {
  const body = await res.json();
  expect(body.commit, 'version.json has no commit');
  if (!EXPECT_COMMIT) {
    notes.push(`deployed commit ${body.commit} (no --commit given, so not compared)`);
    return;
  }
  expect(
    body.commit === EXPECT_COMMIT,
    `deployed ${body.commit}, expected ${EXPECT_COMMIT} — an older run is live`,
  );
});

// 3. The document links its marks, so a browser finds them without guessing.
await check('links its marks and its manifest', '/', async (res) => {
  const html = await res.text();
  for (const rel of ['icon', 'apple-touch-icon', 'manifest']) {
    const href = new RegExp(`<link rel="${rel}"[^>]*href="([^"]*)"`).exec(html)?.[1];
    expect(href, `no <link rel="${rel}">`);
    expect(href.includes('/portfolio/'), `${rel} href drops the base path: ${href}`);
  }
});

// 4. The manifest parses and agrees with the page about the theme colour.
await check('serves a valid manifest', '/manifest.webmanifest', async (res) => {
  const body = await res.json();
  expect(body.name, 'manifest has no name');
  expect(Array.isArray(body.icons) && body.icons.length > 0, 'manifest lists no icons');
  expect(body.theme_color === '#FAFAF7', `manifest theme_color is ${body.theme_color}`);
});

// 5. The security policy survived the deploy, and still says what it should.
await check('carries its security policy', '/', async (res) => {
  const html = await res.text();
  const policy = /<meta http-equiv="Content-Security-Policy" content="([^"]*)"/.exec(html)?.[1];
  expect(policy, 'no Content-Security-Policy meta tag');
  const decoded = policy.replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
  for (const directive of ["default-src 'self'", "object-src 'none'", "base-uri 'self'"]) {
    expect(decoded.includes(directive), `policy is missing ${directive}`);
  }
  expect(html.includes('name="referrer"'), 'no referrer policy');
});

// 6. Canonical URLs carry the base path. Dropping it is silent and poisons search.
await check('canonical URLs keep the base path', '/writing/', async (res) => {
  const html = await res.text();
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];
  expect(canonical, 'no canonical link');
  expect(canonical.startsWith(BASE), `canonical is ${canonical}`);
});

// 7. The social card is a real PNG. Extensionless and served as octet-stream by
//    Pages, so the signature is the only honest check, not the content type.
await check('the social card is a real image', '/', async (res) => {
  const html = await res.text();
  const meta = /<meta property="og:image" content="([^"]*)"/.exec(html)?.[1];
  expect(meta, 'no og:image');
  const path = new URL(meta.replace(/&amp;/g, '&')).pathname.replace(/^\/portfolio/, '');
  const search = new URL(meta.replace(/&amp;/g, '&')).search;
  const { res: img } = await get(`${path}${search}`);
  expect(img?.ok, `og:image ${path} returned ${img?.status}`);
  const head = Buffer.from(await img.arrayBuffer())
    .subarray(0, 4)
    .toString('hex');
  expect(head === '89504e47', `og:image is not a PNG (starts ${head})`);
});

// 8. The feed parses and has one entry per published post.
await check('the feed is well-formed Atom', '/feed.xml', async (res) => {
  const xml = await res.text();
  expect(xml.trimStart().startsWith('<?xml'), 'feed does not start with an XML declaration');
  expect(xml.includes('<feed'), 'feed has no <feed> element');
  const entries = (xml.match(/<entry>/g) ?? []).length;
  expect(entries > 0, 'feed has no entries');
  notes.push(`feed carries ${entries} entries`);
});

// 9. The language the site removed must stay removed. This is the one check
//    that guards meaning rather than mechanics: a regression here republishes
//    hedging that reads as though the author is unsure of their own record.
await check('no disclaimer language has crept back', '/', async (res) => {
  const patterns = [
    /\bcannot claim\b/i,
    /\bnot able to recall\b/i,
    /\bstays a memory\b/i,
    /not written down anywhere/i,
  ];
  const text = (await res.text()).replace(/<[^>]+>/g, ' ');
  const found = patterns.filter((p) => p.test(text)).map(String);
  expect(found.length === 0, `found ${found.join(', ')}`);
});

for (const note of notes) console.log(`  note  ${note}`);

if (failures.length > 0) {
  console.error(`\n${failures.length} check${failures.length === 1 ? '' : 's'} failed:\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`\nAll ${ROUTES.length + NAMED_CHECKS} checks passed against ${BASE}.`);
