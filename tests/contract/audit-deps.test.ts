import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import { chmodSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

/**
 * The audit asks a remote registry. When the registry fails, `npm audit --json`
 * prints an error object with no `vulnerabilities` key, and this gate used to
 * read that as "0 advisories" — on PR #108 it went red only because the one
 * remaining exemption then looked stale; with none left it would have passed
 * having audited nothing (SPEC-0002 R10, CON-VER-005, CON-VER-009).
 */
const ROOT = resolve(__dirname, '../..');

function runWithFakeNpm(output: string, code: number) {
  const dir = mkdtempSync(join(tmpdir(), 'fake-npm-'));
  const npm = join(dir, 'npm');
  writeFileSync(npm, `#!/bin/sh\ncat <<'JSON'\n${output}\nJSON\nexit ${code}\n`);
  chmodSync(npm, 0o755);
  return spawnSync(process.execPath, ['scripts/audit-deps.mjs'], {
    cwd: ROOT,
    encoding: 'utf8',
    env: { ...process.env, PATH: `${dir}:${process.env.PATH}` },
  });
}

describe('audit-deps when the registry cannot answer', () => {
  it('fails as "could not audit", not as zero advisories', () => {
    const r = runWithFakeNpm(
      JSON.stringify({ error: { code: 'ENOAUDIT', summary: 'audit endpoint returned an error' } }),
      1,
    );
    expect(r.status).toBe(2);
    expect(r.stdout + r.stderr).toMatch(/could not audit/i);
    expect(r.stdout + r.stderr).toMatch(/audit endpoint returned an error/);
    expect(r.stdout).not.toMatch(/0 advisories/);
    expect(r.stdout).not.toMatch(/stale exemptions/);
  });

  it('still reads a real answer with nothing in it as clean', () => {
    const empty = JSON.stringify({
      vulnerabilities: {},
      metadata: { vulnerabilities: { total: 0 }, dependencies: { total: 500 } },
    });
    const r = runWithFakeNpm(empty, 0);
    // A genuine empty answer leaves the postcss exemption unmatched, which is
    // the stale-exemption failure (exit 1), not the could-not-audit one (exit 2).
    expect(r.status).toBe(1);
    expect(r.stdout).toMatch(/0 advisories/);
  });
});
