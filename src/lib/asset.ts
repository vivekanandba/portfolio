// Prefix a public asset path with the configured base path so links work both
// at the root (custom domain) and under /portfolio (GitHub Pages project page).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}
