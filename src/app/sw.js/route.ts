import { buildVersion } from '@/lib/version';
import { asset } from '@/lib/asset';

/**
 * The service worker, emitted as out/sw.js by the static export — a route
 * rather than a file in public/ so the build commit can be baked in (SPEC-0004).
 *
 * The cache is named after the commit. A new deploy is a new cache name, the
 * old one is deleted on activate, and nothing from a previous build can outlive
 * it. That is the whole update strategy, and it is deliberately dull.
 *
 * What is cached, and how:
 *   - pages (navigations): network first, cache as fallback. A visitor who is
 *     online always sees the current build; the cache exists for when they are
 *     not. This is what makes it safe to have a service worker at all — the
 *     failure mode of a stale cache is the one thing a static site must never
 *     have, and network-first cannot produce it.
 *   - hashed build assets under _next/static: cache first. The hash is the
 *     version; a changed file is a different URL.
 *   - images, fonts, PDFs: cache first, because they do not change under a
 *     stable URL here.
 *   - video: never cached. The clips are up to 2 MiB each and preload="none";
 *     filling a cache with them on a phone would be the opposite of a favour.
 *   - anything off-origin (analytics): not intercepted.
 *
 * Kill switch: a service worker that goes wrong can only be fixed by shipping
 * one that unregisters itself, which every returning visitor must first fetch.
 * If that day comes, replace the body of this file with the two lines in the
 * comment at the bottom and deploy.
 */
export const dynamic = 'force-static';

const BASE = asset('/').replace(/\/$/, '');

/** Precached at install: enough to render the shell and the offline page. */
const SHELL = ['/', '/offline/', '/manifest.webmanifest', '/icon-192.png'].map(asset);

export function GET() {
  const { commit } = buildVersion();
  const js = `/* portfolio service worker — build ${commit} */
const CACHE = 'portfolio-${commit}';
const BASE = ${JSON.stringify(BASE)};
const SHELL = ${JSON.stringify(SHELL)};
const OFFLINE = BASE + '/offline/';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const isStatic = (url) => url.pathname.startsWith(BASE + '/_next/static/');
const isMedia = (url) => /\\.(png|jpe?g|webp|avif|gif|svg|ico|woff2?|pdf)$/i.test(url.pathname);
const isVideo = (url) => /\\.(mp4|webm)$/i.test(url.pathname);

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (isVideo(url)) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match(OFFLINE))),
    );
    return;
  }

  if (isStatic(url) || isMedia(url)) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
            return res;
          }),
      ),
    );
  }
});

/* Kill switch — replace everything above with:
   self.addEventListener('install', () => self.skipWaiting());
   self.addEventListener('activate', (e) => e.waitUntil(
     self.registration.unregister().then(() => caches.keys()).then((ks) => Promise.all(ks.map((k) => caches.delete(k))))));
*/
`;
  // Headers here document intent; a static export writes only the body and
  // GitHub Pages sets its own. That is fine for a worker script: browsers
  // bypass the HTTP cache for the top-level worker file on every update check
  // (`updateViaCache` defaults to 'imports'), so a deploy is picked up on the
  // next navigation regardless of what Pages' 10-minute max-age says.
  return new Response(js, {
    headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
  });
}
