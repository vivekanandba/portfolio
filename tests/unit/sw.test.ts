import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import vm from 'node:vm';
import { join, resolve } from 'node:path';
import { GET, dynamic } from '@/app/sw.js/route';
import { buildVersion } from '@/lib/version';

/**
 * The service worker is generated, so its correctness is checkable before it
 * ever runs in a browser: the cache is named after the deployed commit, the
 * shell it precaches consists of routes that exist, and it declines the two
 * things that would make it dangerous — cross-origin requests and video.
 */
const ROOT = resolve(__dirname, '../..');
const js = async () => (await GET()).text();

describe('the service worker script', () => {
  it('is emitted statically as JavaScript', async () => {
    expect(dynamic).toBe('force-static');
    expect((await GET()).headers.get('Content-Type')).toMatch(/javascript/);
  });

  it('names its cache after the build commit, so every deploy is a new cache', async () => {
    const { commit } = buildVersion();
    expect(await js()).toContain(`portfolio-${commit}`);
  });

  it('precaches only routes the app actually has', async () => {
    const shell = JSON.parse(/const SHELL = (\[[^\]]*\]);/.exec(await js())![1]) as string[];
    expect(shell.length).toBeGreaterThan(1);
    for (const path of shell) {
      const rel = path.replace(/^\/portfolio/, '');
      const candidates =
        rel === '/'
          ? ['src/app/page.tsx']
          : rel.endsWith('/')
            ? [`src/app${rel}page.tsx`]
            : [
                `src/app${rel}/route.ts`,
                `src/app${rel.replace(/\.[a-z]+$/, '')}.ts`,
                `public${rel}`,
              ];
      expect(
        candidates.some((c) => existsSync(join(ROOT, c))),
        `${path} is precached but nothing produces it (tried ${candidates.join(', ')})`,
      ).toBe(true);
    }
  });

  it('serves pages network-first and never prefers a stale copy when online', async () => {
    const src = await js();
    const nav = src.slice(src.indexOf("req.mode === 'navigate'"));
    // fetch() appears before caches.match() in the navigation branch.
    expect(nav.indexOf('fetch(req)')).toBeGreaterThan(-1);
    expect(nav.indexOf('fetch(req)')).toBeLessThan(nav.indexOf('caches.match(req)'));
  });

  it('leaves video and cross-origin requests alone', async () => {
    const src = await js();
    expect(src).toContain('url.origin !== self.location.origin) return');
    expect(src).toMatch(/isVideo\(url\)\) return/);
  });

  it('deletes every cache but its own on activate', async () => {
    expect(await js()).toContain('keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))');
  });
});

/**
 * The offline fallback, proven by running the worker.
 *
 * Playwright's offline emulation does not reach a service worker's own fetch(),
 * so a browser test of "go offline, navigate, see the offline page" passes
 * whether or not the fallback works — it saw the real page. Instead the
 * generated script runs here in a sandbox with a fake `self`, a fake `caches`
 * and a fetch that rejects, and the response it produces is inspected (R19).
 */
type Handler = (event: unknown) => void;

async function boot(fetchImpl: (req: { url: string }) => Promise<Response>) {
  const handlers: Record<string, Handler> = {};
  const store = new Map<string, Response>();
  const cache = {
    async addAll(urls: string[]) {
      for (const u of urls) store.set(u, new Response(`precached ${u}`));
    },
    async put(req: { url: string } | string, res: Response) {
      store.set(typeof req === 'string' ? req : new URL(req.url).pathname, res);
    },
    async match(req: { url: string } | string) {
      return store.get(typeof req === 'string' ? req : new URL(req.url).pathname);
    },
  };
  const self = {
    addEventListener: (name: string, fn: Handler) => void (handlers[name] = fn),
    skipWaiting: async () => {},
    clients: { claim: async () => {} },
    location: { origin: 'https://vivekanandba.github.io' },
  };
  const sandbox = {
    self,
    // The worker's fallback uses CacheStorage.match — the global that searches
    // every cache — not Cache.match on one it opened. The double has to offer
    // both, or the offline path stalls on a missing function rather than
    // exercising the logic it exists to exercise.
    caches: {
      open: async () => cache,
      keys: async () => [],
      delete: async () => true,
      match: (req: { url: string } | string) => cache.match(req),
    },
    fetch: fetchImpl,
    Response,
    URL,
    console,
  };
  vm.runInNewContext(await js(), sandbox);
  await new Promise<void>((resolve) =>
    handlers.install({ waitUntil: (p: Promise<unknown>) => p.then(() => resolve()) }),
  );
  return { handlers, store };
}

function navigate(handlers: Record<string, Handler>, url: string): Promise<Response> {
  return new Promise((resolve) => {
    handlers.fetch({
      request: { method: 'GET', url, mode: 'navigate' },
      respondWith: (p: Promise<Response>) => p.then(resolve),
    });
  });
}

describe('the worker, run', () => {
  const ORIGIN = 'https://vivekanandba.github.io';

  it('serves the offline page when a navigation cannot reach the network', async () => {
    const { handlers } = await boot(() => Promise.reject(new TypeError('Failed to fetch')));
    const res = await navigate(handlers, `${ORIGIN}/portfolio/archive/legend/`);
    expect(await res.text()).toMatch(/precached .*\/offline\/$/);
  });

  it('prefers a cached copy of the requested page over the offline page', async () => {
    const { handlers, store } = await boot(() => Promise.reject(new TypeError('Failed to fetch')));
    store.set('/portfolio/writing/', new Response('the writing index, from cache'));
    const res = await navigate(handlers, `${ORIGIN}/portfolio/writing/`);
    expect(await res.text()).toBe('the writing index, from cache');
  });

  it('serves the network response when online and writes it to the cache', async () => {
    const { handlers, store } = await boot(() =>
      Promise.resolve(new Response('fresh from the network')),
    );
    const res = await navigate(handlers, `${ORIGIN}/portfolio/work/`);
    expect(await res.text()).toBe('fresh from the network');
    // The put is fire-and-forget; give the microtask a tick.
    await new Promise((r) => setTimeout(r, 0));
    expect(store.has('/portfolio/work/')).toBe(true);
  });

  it('does not intercept a cross-origin request at all', async () => {
    const { handlers } = await boot(() => Promise.reject(new Error('must not be called')));
    let responded = false;
    handlers.fetch({
      request: { method: 'GET', url: 'https://gc.zgo.at/count.js', mode: 'no-cors' },
      respondWith: () => void (responded = true),
    });
    expect(responded).toBe(false);
  });
});
