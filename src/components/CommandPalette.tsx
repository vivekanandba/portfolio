'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { caseStudies, certifications, projects } from '@/content';
import { PALETTE_EVENT, type PaletteEntry as Entry } from '@/lib/palette';

/**
 * Build-time index over content (ADR-0012): projects, sections and
 * certifications. Plain data, no search library — the corpus is small enough
 * that substring matching over a keyword haystack is instant and predictable.
 */
export function buildIndex(extra: Entry[] = []): Entry[] {
  const entries: Entry[] = [];
  const sections: [string, string][] = [
    ['Turning points', '#turning-points'],
    ['The Arc', '#about'],
    ['Selected work', '#work'],
    ['How I direct AI agents', '#agents'],
    ['Skills', '#skills'],
    ['Testimonials', '#recommendations'],
    ['Career timeline', '#journey'],
    ['Now — current pulse', '#now'],
    ['Credentials', '#credentials'],
    ['Contact', '#contact'],
  ];
  for (const [label, href] of sections) {
    entries.push({ label, detail: 'Section', href, keywords: label.toLowerCase() });
  }
  const csById = new Map(caseStudies.map((cs) => [cs.projectId, cs]));
  for (const p of projects) {
    const cs = csById.get(p.id);
    entries.push({
      label: p.title,
      detail: `Project · ${p.org}`,
      href: `/work/${p.id}/`,
      keywords:
        `${p.title} ${p.org} ${p.tags.join(' ')} ${p.summary} ${cs?.seoDescription ?? ''}`.toLowerCase(),
    });
  }
  for (const c of certifications) {
    entries.push({
      label: c.name,
      detail: `Certification · ${c.authority}`,
      href: '#credentials',
      keywords: `${c.name} ${c.authority} ${c.category}`.toLowerCase(),
    });
  }
  // Server-provided rows (archive entries, later posts) — ADR-0016.
  entries.push(...extra);
  return entries;
}

const INDEX = buildIndex();
const MAX_RESULTS = 8;
// Offered when nothing matches. Each must match something in the index —
// tests/unit/interaction-layer.test.tsx asserts it (SPEC-0011 R15).
const SUGGESTIONS = ['DICOM', 'RAG'];

/**
 * ⌘K / ctrl-K palette (ADR-0012). Client-only progressive enhancement: without
 * JavaScript this renders nothing and the site is unchanged. Keyboard-complete:
 * open on ⌘K, filter as you type, arrows to move, enter to go, escape to close.
 */
export function CommandPalette({ extra = [] }: { extra?: Entry[] } = {}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const index = useMemo(() => (extra.length ? [...INDEX, ...extra] : INDEX), [extra]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, MAX_RESULTS);
    return index.filter((e) => e.keywords.includes(q)).slice(0, MAX_RESULTS);
  }, [query, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery('');
        setCursor(0);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    // Anything on the site may open the palette, prepared, through one event
    // (SPEC-0011 R10): the nav's search button, the menu, the skill pills.
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ query?: string }>).detail;
      setQuery(detail?.query ?? '');
      setCursor(0);
      setOpen(true);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      // aria-modal is a claim; these two effects make it true. Remember where
      // focus was, hold it inside the dialog, and give it back on close.
      restoreRef.current = document.activeElement as HTMLElement | null;
      inputRef.current?.focus();
    } else {
      restoreRef.current?.focus?.();
      restoreRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const trap = (e: KeyboardEvent) => {
      // The input is the only tabbable control; options are driven by arrows.
      if (e.key === 'Tab') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', trap);
    return () => window.removeEventListener('keydown', trap);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith('#')) {
      // Anchors live on the landing page. Decide by the document, not the
      // pathname (ADR-0016): if the section is here, scroll to it; otherwise
      // route home — the router handles basePath in both cases.
      const el = document.getElementById(href.slice(1));
      if (el) {
        window.location.hash = href;
        el.scrollIntoView?.({ behavior: 'smooth' });
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the site"
      className="palette-backdrop fixed inset-0 z-[60] flex items-start justify-center bg-ink/40 px-4 pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="palette-panel w-full max-w-xl overflow-hidden rounded-xl border border-hairline bg-paper shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-results"
          aria-label="Search projects, sections and credentials"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCursor(0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setCursor((c) => Math.min(c + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setCursor((c) => Math.max(c - 1, 0));
            } else if (e.key === 'Enter' && results[cursor]) {
              go(results[cursor].href);
            }
          }}
          placeholder="Search projects, sections, credentials…"
          className="w-full border-b border-hairline bg-transparent px-5 py-4 text-base text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/40"
        />
        <ul
          id="palette-results"
          role="listbox"
          aria-label="Results"
          className="max-h-80 overflow-y-auto py-2"
        >
          {results.length === 0 && (
            <li className="flex flex-wrap items-center gap-2 px-5 py-3 text-sm text-muted">
              Nothing matches. Try
              {SUGGESTIONS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setQuery(tag);
                    setCursor(0);
                  }}
                  className="rounded-full border border-hairline px-2.5 py-0.5 text-xs font-medium text-ink transition-colors hover:border-accent/40"
                >
                  {tag}
                </button>
              ))}
            </li>
          )}
          {results.map((r, i) => (
            <li key={r.href + r.label} role="option" aria-selected={i === cursor}>
              <button
                type="button"
                onClick={() => go(r.href)}
                onMouseEnter={() => setCursor(i)}
                className={`flex w-full items-baseline justify-between gap-4 px-5 py-2.5 text-left transition-colors duration-150 ${
                  i === cursor ? 'bg-card' : ''
                }`}
              >
                <span className="text-sm font-medium text-ink">{r.label}</span>
                <span className="shrink-0 text-xs text-muted">{r.detail}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="border-t border-hairline px-5 py-2 text-[11px] text-muted">
          ↑↓ navigate · enter go · esc close
        </p>
      </div>
    </div>
  );
}
