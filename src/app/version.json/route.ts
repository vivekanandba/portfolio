import { SITE_URL } from '@/lib/seo';

/**
 * What is actually deployed, so the post-deploy check can prove the running site
 * is the commit that was just built rather than assume it (CON-VER-003).
 *
 * Emitted as out/version.json by the static export. `GITHUB_SHA` is set by every
 * Actions run; a local build says so instead of inventing a commit, because a
 * plausible wrong answer is worse than an honest "unknown" (CON-DATA-001).
 */
export const dynamic = 'force-static';

export type Version = {
  commit: string;
  ref: string;
  builtAt: string;
  site: string;
};

export function buildVersion(env: NodeJS.ProcessEnv = process.env, now = new Date()): Version {
  return {
    commit: env.GITHUB_SHA ?? 'local',
    ref: env.GITHUB_REF_NAME ?? 'local',
    builtAt: now.toISOString(),
    site: SITE_URL,
  };
}

export function GET() {
  return new Response(JSON.stringify(buildVersion(), null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
