import { describe, it, expect } from 'vitest';
import { generateMetadata as postMeta } from '@/app/writing/[slug]/page';
import { generateMetadata as workMeta } from '@/app/work/[slug]/page';
import { generateMetadata as archiveMeta } from '@/app/archive/[era]/page';
import { caseStudies, archiveEras } from '@/content';
import { listPosts } from '@/lib/writing';

/**
 * Every dynamic route builds its own <head> in generateMetadata, and none of
 * them was covered — the three sat at 66–85% functions. Each has the same
 * shape: look the slug up, return real metadata or an empty object. Both sides
 * matter. The empty side is what a stale link gets, and returning half-built
 * metadata there would publish a page titled after the wrong thing.
 */
const params = <T extends object>(value: T) => ({ params: Promise.resolve(value) });

describe('generateMetadata for the writing routes', () => {
  it('titles and describes every published post', async () => {
    for (const post of listPosts()) {
      const meta = await postMeta(params({ slug: post.slug }));
      expect(meta.title, post.slug).toBeTruthy();
      expect(String(meta.title)).toContain(post.title);
      expect(meta.description, post.slug).toBeTruthy();
    }
  });

  it('returns nothing for a slug that does not exist', async () => {
    expect(await postMeta(params({ slug: 'no-such-post' }))).toEqual({});
  });
});

describe('generateMetadata for the project routes', () => {
  it('titles and describes every project page', async () => {
    for (const cs of caseStudies) {
      const meta = await workMeta(params({ slug: cs.slug }));
      expect(meta.title, cs.slug).toBeTruthy();
      expect(meta.description, cs.slug).toBeTruthy();
    }
  });

  it('returns nothing for a slug that does not exist', async () => {
    expect(await workMeta(params({ slug: 'no-such-project' }))).toEqual({});
  });
});

describe('generateMetadata for the archive routes', () => {
  it('titles and describes every era', async () => {
    for (const era of archiveEras) {
      const meta = await archiveMeta(params({ era: era.id }));
      expect(meta.title, era.id).toBeTruthy();
      expect(meta.description, era.id).toBeTruthy();
    }
  });

  it('returns nothing for an era that does not exist', async () => {
    expect(await archiveMeta(params({ era: 'no-such-era' }))).toEqual({});
  });
});
