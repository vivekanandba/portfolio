import { describe, it, expect } from 'vitest';
import { buildVersion, GET } from '@/app/version.json/route';
import { SITE_URL } from '@/lib/seo';

/**
 * The stamp the post-deploy check reads to prove the running site is the commit
 * that was built, rather than an older run that also said "success".
 */
describe('the build version stamp', () => {
  const at = new Date('2026-09-20T10:00:00.000Z');

  it('records the commit and ref that CI is building', () => {
    const v = buildVersion({ GITHUB_SHA: 'abc123', GITHUB_REF_NAME: 'main' }, at);
    expect(v.commit).toBe('abc123');
    expect(v.ref).toBe('main');
    expect(v.builtAt).toBe('2026-09-20T10:00:00.000Z');
    expect(v.site).toBe(SITE_URL);
  });

  it('says "local" rather than inventing a commit off CI', () => {
    // A plausible wrong commit would make the deploy check pass on a stale site.
    const v = buildVersion({}, at);
    expect(v.commit).toBe('local');
    expect(v.ref).toBe('local');
  });

  it('serves parseable JSON with the right content type', async () => {
    const res = GET();
    expect(res.headers.get('Content-Type')).toMatch(/application\/json/);
    const body = JSON.parse(await res.text());
    expect(body).toHaveProperty('commit');
    expect(body).toHaveProperty('builtAt');
    expect(Date.parse(body.builtAt)).not.toBeNaN();
  });
});
