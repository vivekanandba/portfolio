import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { load } from 'js-yaml';

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
  const scripts = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).scripts as Record<
    string,
    string
  >;

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

  it('keeps the pixel baselines out of the bare-runner e2e job', () => {
    // A bare `playwright test` runs every project, the visual one included, on
    // ubuntu-latest — whose fonts are not the container's. Those baselines can
    // only fail there, and for weeks they did not, because a 1% tolerance was
    // absorbing runner-versus-container drift along with everything else (#74).
    const e2eJob = ci.split('\n  e2e:')[1] ?? '';
    expect(e2eJob, 'an e2e job').toBeTruthy();
    expect(e2eJob).toContain('npm run test:e2e');
    expect(e2eJob).not.toMatch(/run:\s*npx playwright test\s*$/m);
    // And the script it calls must actually select the behavioural projects.
    expect(scripts['test:e2e']).toMatch(/--project=desktop/);
    expect(scripts['test:e2e']).toMatch(/--project=mobile/);
    expect(scripts['test:e2e']).not.toMatch(/--project=visual/);
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

/**
 * Structure, not just text (SPEC-0003 R10). A workflow that is valid YAML can
 * still be one Actions refuses to start: #87 inserted a `run:` step between
 * `actions/checkout` and that step's own `with:` block, so `with:` hung off a
 * run step and every run for a week ended with no jobs and "log not found" —
 * on main, on every branch, on dependabot's. Nothing here parsed the files.
 */
type Step = { uses?: string; run?: string; with?: Record<string, unknown>; name?: string };
type Workflow = { jobs: Record<string, { steps?: Step[] }> };

describe('the workflows are ones Actions will start', () => {
  const parsed = workflows.map(([name, text]) => [name, load(text) as Workflow] as const);

  it.each(parsed.map(([name]) => name))('%s: every step is exactly one of uses or run', (name) => {
    const wf = parsed.find(([n]) => n === name)![1];
    for (const [job, def] of Object.entries(wf.jobs)) {
      for (const [i, step] of (def.steps ?? []).entries()) {
        const kinds = ['uses', 'run'].filter((k) => k in step);
        expect(
          kinds,
          `${name} › ${job} › step ${i + 1} (${step.name ?? step.uses ?? 'run'})`,
        ).toHaveLength(1);
      }
    }
  });

  it.each(parsed.map(([name]) => name))('%s: a with block belongs to a uses step', (name) => {
    const wf = parsed.find(([n]) => n === name)![1];
    for (const [job, def] of Object.entries(wf.jobs)) {
      for (const [i, step] of (def.steps ?? []).entries()) {
        if ('with' in step) {
          expect(
            step.uses,
            `${name} › ${job} › step ${i + 1} has with: but no uses:`,
          ).toBeDefined();
        }
      }
    }
  });

  it('the checks job checks out full history, so the spec-discipline diff has a base', () => {
    const ci = parsed.find(([n]) => n === 'ci.yml')![1];
    const checkout = (ci.jobs.checks.steps ?? []).find((s) =>
      s.uses?.startsWith('actions/checkout@'),
    );
    expect(checkout?.with?.['fetch-depth']).toBe(0);
  });
});
