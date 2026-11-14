import { describe, it, expect } from 'vitest';
import { getFileInfo } from 'prettier';
import { resolve } from 'node:path';

/**
 * resumefit's publisher (scripts/publish-resume.py in that repo) opens a PR here
 * carrying resume/master.md — generated Markdown, the diffable twin of the PDF
 * and DOCX beside it. Resume PR #34 sat failing for three months because this
 * repo's formatter rejected the producer's output (CON-COV-003: the boundary
 * between the two is the likeliest defect). Generated files are not formatted
 * here, the way *.pdf and *.docx already are not (SPEC-0012 R11).
 */
const ROOT = resolve(__dirname, '../..');

describe('files another repo generates into this one', () => {
  it.each(['resume/master.md'])('prettier ignores %s', async (file) => {
    const info = await getFileInfo(resolve(ROOT, file), {
      ignorePath: resolve(ROOT, '.prettierignore'),
    });
    expect(info.ignored).toBe(true);
  });

  it('still formats the authored Markdown next to it', async () => {
    const info = await getFileInfo(resolve(ROOT, 'specs/README.md'), {
      ignorePath: resolve(ROOT, '.prettierignore'),
    });
    expect(info.ignored).toBe(false);
  });
});
