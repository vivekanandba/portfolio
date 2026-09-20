import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

/**
 * Suites are directories, so a test file's home is its suite name and there is
 * no registry to fall out of date. This guards that: a new test file that lands
 * anywhere else belongs to no suite, and a red build could not say what kind of
 * thing broke — which is the whole point of the split (SPEC-0001).
 */
const ROOT = resolve(__dirname, '../..');
const TESTS = join(ROOT, 'tests');

/** Suite → the question a failure answers, and the command that runs it alone. */
const SUITES = {
  unit: { question: 'does the code do what it says', script: 'test:unit', ext: '.test.' },
  contract: {
    question: 'are the data and the published record still true',
    script: 'test:contract',
    ext: '.test.',
  },
  a11y: { question: 'can everyone use it', script: 'test:a11y', ext: '.test.' },
  e2e: { question: 'can a person complete the task', script: 'test:e2e', ext: '.spec.' },
} as const;

/** Not suites: shared setup and the fixtures the writing engine is tested against. */
const NOT_SUITES = ['setup.ts', 'fixtures'];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const scripts = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).scripts as Record<
  string,
  string
>;

describe('the test suites', () => {
  it('has a directory and a standalone command for each', () => {
    const dirs = readdirSync(TESTS).filter((e) => statSync(join(TESTS, e)).isDirectory());
    expect(dirs.filter((d) => !NOT_SUITES.includes(d)).sort()).toEqual(Object.keys(SUITES).sort());

    for (const [name, suite] of Object.entries(SUITES)) {
      expect(scripts[suite.script], `npm run ${suite.script}`).toBeTruthy();
      expect(walk(join(TESTS, name)).length, `${name} has tests`).toBeGreaterThan(0);
    }
  });

  it('keeps every test file inside a suite', () => {
    const orphans = walk(TESTS)
      .map((f) => relative(TESTS, f))
      .filter((f) => /\.(test|spec)\.[tj]sx?$/.test(f))
      .filter((f) => !Object.keys(SUITES).some((s) => f.startsWith(`${s}/`)));

    expect(orphans, 'test files belonging to no suite').toEqual([]);
  });

  it('uses .spec for the browser suite and .test for the rest, so the runners never overlap', () => {
    // Vitest owns tests/**/*.test.*; Playwright owns tests/e2e/**/*.spec.*.
    // A file with the wrong extension is either run twice or not at all.
    for (const [name, suite] of Object.entries(SUITES)) {
      for (const file of walk(join(TESTS, name))) {
        expect(relative(TESTS, file), `${name} file naming`).toContain(suite.ext);
      }
    }
  });

  it('keeps every accessibility assertion in the a11y suite', () => {
    // Scattered axe assertions are invisible as a number and were the slowest
    // thing in the unit lane — eighty seconds for the archive page alone.
    // Assembled rather than written out, so this file does not match itself.
    const MATCHER = ['toHaveNo', 'Violations'].join('');
    const strays = walk(TESTS)
      .filter((f) => !relative(TESTS, f).startsWith('a11y/'))
      .filter((f) => /\.(test|spec)\.[tj]sx?$/.test(f))
      .filter((f) => readFileSync(f, 'utf8').includes(MATCHER))
      .map((f) => relative(TESTS, f));

    expect(strays, 'axe assertions outside tests/a11y').toEqual([]);
  });

  it('runs the whole of vitest under one coverage pass, with the per-file floor after it', () => {
    // Three suites, one coverage number: splitting coverage per suite would let
    // a file covered only by another suite read as uncovered.
    expect(scripts['test:coverage']).toContain('vitest run --coverage');
    expect(scripts['test:coverage']).toContain('scripts/coverage-floor.mjs');
  });
});
