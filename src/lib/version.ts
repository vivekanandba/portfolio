import { SITE_URL } from './seo';

/**
 * What is actually deployed, in one place (SPEC-0003 R1).
 *
 * `GITHUB_SHA` is set by every Actions run; a local build says so instead of
 * inventing a commit, because a plausible wrong answer is worse than an honest
 * "unknown" (CON-DATA-001). Both /version.json and /sw.js read this, so the
 * commit the post-deploy check compares against is the same one that names the
 * service worker's cache.
 */
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
