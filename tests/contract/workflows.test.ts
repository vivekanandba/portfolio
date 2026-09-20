import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * The delivery path is code too, and none of it is covered by the application
 * suites (CON-COV-001). These assert the security properties of the workflows
 * themselves, because a moving tag or a deleted scanning step is exactly the
 * kind of change that looks like tidying in a diff.
 */
const ROOT = resolve(__dirname, '../..');
const DIR = join(ROOT, '.github/workflows');
const workflows = readdirSync(DIR)
  .filter((f) => f.endsWith('.yml'))
  .map((f) => [f, readFileSync(join(DIR, f), 'utf8')] as const);

describe('the workflows', () => {
  it('there are some, and they are read', () => {
    expect(workflows.length).toBeGreaterThan(0);
  });

  it.each(workflows.map(([name]) => name))(
    '%s pins every action to a commit SHA, not a moving tag',
    (name) => {
      const text = workflows.find(([f]) => f === name)![1];
      const uses = [...text.matchAll(/uses:\s*(\S+)/g)].map((m) => m[1]);
      const unpinned = uses.filter((ref) => !/@[0-9a-f]{40}$/.test(ref));
      // A tag can be moved to point at different code after review. A SHA cannot.
      expect(unpinned, `${name} uses actions by tag`).toEqual([]);
    },
  );

  it.each(workflows.map(([name]) => name))(
    '%s keeps a readable version comment beside each pinned SHA',
    (name) => {
      const text = workflows.find(([f]) => f === name)![1];
      const pins = [...text.matchAll(/uses:\s*\S+@[0-9a-f]{40}(.*)$/gm)].map((m) => m[1]);
      // Forty hex characters tell a reader nothing about what version they are on.
      for (const trailing of pins) expect(trailing.trim(), name).toMatch(/^#\s*v?\d/);
    },
  );

  const ci = workflows.find(([f]) => f === 'ci.yml')![1];

  it('runs each test suite as its own named step, so a red check names the suite', () => {
    for (const suite of [
      'contract',
      'unit',
      'accessibility',
      'security',
      'secrets',
      'visual',
      'e2e',
    ]) {
      expect(ci, `no step for the ${suite} suite`).toMatch(new RegExp(`Suite — ${suite}`, 'i'));
    }
  });

  it('scans the full history for secrets, not just the working tree', () => {
    // `fetch-depth: 0` is the whole point: the 2026-07-23 export leak was in
    // history, where a shallow clone would never have seen it.
    expect(ci).toContain('gitleaks detect');
    const secretsJob = ci.split('\n  secrets:')[1]?.split('\n  e2e:')[0] ?? '';
    expect(secretsJob, 'the secrets job must clone full history').toContain('fetch-depth: 0');
  });

  it('audits dependencies and enforces the coverage floors', () => {
    expect(ci).toContain('npm run test:security');
    expect(ci).toContain('npm run test:coverage');
    expect(ci).toContain('npm run check:size');
  });

  it('runs the pixel baselines in the container they were made in', () => {
    // Text renders differently between machines. Baselines generated in the
    // Playwright container and compared on a bare runner fail for font reasons
    // that have nothing to do with the change (SPEC-0003).
    const visualJob = ci.split('\n  visual:')[1]?.split('\n  e2e:')[0] ?? '';
    expect(visualJob, 'a visual job').toBeTruthy();
    expect(visualJob).toContain('mcr.microsoft.com/playwright:');
    expect(visualJob).toContain('npm run test:visual');
    // And the diff image is uploaded, because a percentage explains nothing.
    expect(visualJob).toContain('upload-artifact');
  });

  const deploy = workflows.find(([f]) => f === 'deploy.yml')![1];

  it('verifies the deployed site is the commit that was just built', () => {
    // A green deploy means the artifact was published, not that this artifact
    // is live or that the site works (CON-VER-003, CON-COV-001).
    expect(deploy).toContain('scripts/verify-live.mjs');
    expect(deploy).toContain('--commit');
    expect(deploy).toContain('github.sha');
  });
});
