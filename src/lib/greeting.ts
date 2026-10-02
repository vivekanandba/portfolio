import { profile } from '@/content';

export const REPO_URL = 'https://github.com/vivekanandba/portfolio';

/**
 * What the site says to whoever opens the developer console (SPEC-0004 R22):
 * two logs in my voice, the repository, the shortcut. Returned as JavaScript
 * source for an inline script; the name comes from `profile`, never a literal.
 */
export function consoleGreeting(): string {
  const heading = `%c${profile.name}`;
  const body =
    'You opened the console on a portfolio — I like you already. This is a static export of a Next.js app, tested like a product; the suites are in the repo. ' +
    `The source is at ${REPO_URL}. Press ⌘K to search.`;
  return `try{console.log(${JSON.stringify(heading)},"font:600 16px Fraunces,Georgia,serif");console.log(${JSON.stringify(body)})}catch(e){}`;
}
