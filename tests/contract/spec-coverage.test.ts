import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

/**
 * Spec coverage, derived rather than asserted.
 *
 * "How many surfaces have a spec?" used to be a question someone had to go and
 * count, which is why the answer was sixteen of twenty-six and why the missing
 * one was site identity — the reason a favicon could go missing with every gate
 * green. This computes both sides: the surfaces the site actually has, and the
 * surfaces the specs claim. A new section or route with no spec fails the build.
 *
 * Each spec declares what it owns in two header lines:
 *
 *   **Covers:** Hero · Turning Points        (section names from SPEC section 3)
 *   **Routes:** `/work/` · `/work/<slug>/`   (route families, or "every route")
 */
const ROOT = resolve(__dirname, '../..');
const SPECS = join(ROOT, 'specs');
const APP = join(ROOT, 'src/app');

const specFiles = readdirSync(SPECS).filter((f) => f.endsWith('.md') && f !== 'README.md');
const specs = specFiles.map((file) => ({ file, text: readFileSync(join(SPECS, file), 'utf8') }));

/** A declaration line, split on the middot, with "—" meaning none. */
function declared(text: string, label: 'Covers' | 'Routes'): string[] {
  const line = new RegExp(`^\\*\\*${label}:\\*\\*(.*)$`, 'm').exec(text)?.[1] ?? '';
  return line
    .split('·')
    .map((s) => s.replace(/`/g, '').trim())
    .filter((s) => s && s !== '—');
}

/** Section names from the SPEC section 3 table: the bolded cell in column two. */
function specSections(): string[] {
  const spec = readFileSync(join(ROOT, 'SPEC.md'), 'utf8');
  const table = spec.split('## 3.')[1]?.split('\n## ')[0] ?? '';
  return [...table.matchAll(/^\|[^|]*\|\s*\*\*([^*]+)\*\*/gm)].map((m) => m[1].trim());
}

/** Route families the app actually has, normalised to how a spec writes them. */
function appRoutes(): string[] {
  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
    );
  const routes = new Set<string>();
  for (const file of walk(APP)) {
    const rel = relative(APP, file);
    const dir = rel.includes('/') ? `/${rel.slice(0, rel.lastIndexOf('/'))}/` : '/';
    if (/(^|\/)page\.tsx$/.test(rel)) routes.add(dir);
    else if (/(^|\/)not-found\.tsx$/.test(rel)) routes.add('/404');
    else if (/(^|\/)sitemap\.ts$/.test(rel)) routes.add('/sitemap.xml');
    else if (/(^|\/)opengraph-image\.tsx$/.test(rel)) routes.add(`${dir}opengraph-image`);
    else if (/(^|\/)route\.ts$/.test(rel)) routes.add(dir.replace(/\/$/, ''));
  }
  return [...routes].sort();
}

/** Specs write `<slug>`; the filesystem writes `[slug]`. */
const normalise = (route: string) => route.replace(/<([a-z]+)>/g, '[$1]');

describe('spec coverage', () => {
  it('every section of the site has exactly one spec that owns it', () => {
    const sections = specSections();
    expect(sections.length, 'SPEC section 3 lists sections').toBeGreaterThan(5);

    const owners = new Map<string, string[]>();
    for (const { file, text } of specs) {
      for (const section of declared(text, 'Covers')) {
        owners.set(section, [...(owners.get(section) ?? []), file]);
      }
    }

    const unowned = sections.filter((s) => !owners.has(s));
    expect(unowned, 'sections with no spec').toEqual([]);

    const contested = [...owners.entries()]
      .filter(([, files]) => files.length > 1)
      .map(([s, files]) => `${s} (${files.join(', ')})`);
    expect(contested, 'sections claimed by more than one spec').toEqual([]);

    const phantom = [...owners.keys()].filter((s) => !sections.includes(s));
    expect(phantom, 'specs claiming sections that do not exist').toEqual([]);
  });

  it('every route the app serves is claimed by a spec', () => {
    const routes = appRoutes();
    expect(routes.length, 'the app has routes').toBeGreaterThan(5);

    const claimed = new Set(specs.flatMap(({ text }) => declared(text, 'Routes').map(normalise)));
    // Two specs apply to everything by their nature; they do not list routes.
    const blanket = specs.some(({ text }) => /^\*\*Routes:\*\*.*every route/m.test(text));
    expect(blanket, 'at least one spec applies to every route').toBe(true);

    const unclaimed = routes.filter((r) => !claimed.has(r));
    expect(unclaimed, 'routes with no spec').toEqual([]);
  });

  it('every spec declares both what it covers and where', () => {
    for (const { file, text } of specs) {
      expect(text, `${file} declares **Covers:**`).toMatch(/^\*\*Covers:\*\*/m);
      expect(text, `${file} declares **Routes:**`).toMatch(/^\*\*Routes:\*\*/m);
    }
  });

  it('reports the number, so it never has to be counted by hand again', () => {
    const sections = specSections();
    const routes = appRoutes();
    const surfaces = sections.length + routes.length;
    // Not a threshold — a statement. It fails above, not here.
    console.log(
      `  spec coverage: ${specs.length} specs over ${sections.length} sections ` +
        `and ${routes.length} routes (${surfaces} surfaces)`,
    );
    expect(specs.length).toBeGreaterThan(0);
  });
});
