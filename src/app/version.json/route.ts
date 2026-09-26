import { buildVersion } from '@/lib/version';

/**
 * Emitted as out/version.json by the static export, so the post-deploy check
 * can prove the running site is the commit that was just built rather than
 * assume it (CON-VER-003). The stamp itself lives in src/lib/version.ts; the
 * service worker route reads the same one.
 */
export const dynamic = 'force-static';

export { buildVersion };
export type { Version } from '@/lib/version';

export function GET() {
  return new Response(JSON.stringify(buildVersion(), null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
