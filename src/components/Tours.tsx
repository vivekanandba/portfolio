'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { projects, tours } from '@/content';

type TourState = { id: string; step: number };
const KEY = 'portfolio-tour';
const EVENT = 'tourchange';

const projectById = new Map(projects.map((p) => [p.id, p]));

function readState(): TourState | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as TourState) : null;
  } catch {
    return null;
  }
}

function writeState(state: TourState | null) {
  try {
    if (state) sessionStorage.setItem(KEY, JSON.stringify(state));
    else sessionStorage.removeItem(KEY);
  } catch {
    /* storage unavailable — tours simply don't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

function useNavigate() {
  const router = useRouter();
  return useCallback(
    (target: string) => {
      if (target.startsWith('#')) {
        // Decide by the document, not the pathname (ADR-0016): scroll if the
        // section is on this page, otherwise route home with the hash.
        const el = document.getElementById(target.slice(1));
        if (el) {
          window.location.hash = target;
          el.scrollIntoView?.({ behavior: 'smooth' });
        } else router.push(`/${target}`);
      } else {
        router.push(`/work/${target}/`);
      }
    },
    [router],
  );
}

/**
 * Audience-path starters (ADR-0012), rendered in the hero. Pure progressive
 * enhancement: three buttons that begin a curated tour; without JavaScript
 * they render but do nothing, and the site is unchanged.
 */
export function TourButtons() {
  const navigate = useNavigate();
  const start = (id: string) => {
    const tour = tours.find((t) => t.id === id)!;
    writeState({ id, step: 0 });
    navigate(tour.stops[0].target);
  };
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-muted text-xs font-medium tracking-[0.14em] uppercase">
        Guided paths
      </span>
      {tours.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => start(t.id)}
          className="border-hairline bg-card/60 text-muted hover:border-accent/40 hover:text-ink rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/**
 * The tour bar: fixed at the bottom while a tour is active, surviving page
 * navigation via sessionStorage. Shows where you are, why this stop matters
 * for your intent, and next/prev/exit.
 */
export function TourBar() {
  const navigate = useNavigate();
  const [state, setState] = useState<TourState | null>(null);

  useEffect(() => {
    const sync = () => setState(readState());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  // Reserve room for the fixed bar so it never covers the footer or the very
  // content a stop is pointing at.
  useEffect(() => {
    if (state) {
      document.body.style.paddingBottom = '4.5rem';
      return () => {
        document.body.style.paddingBottom = '';
      };
    }
  }, [state]);

  if (!state) return null;
  const tour = tours.find((t) => t.id === state.id);
  if (!tour) return null;
  const stop = tour.stops[state.step];
  if (!stop) return null;

  const stopLabel = stop.target.startsWith('#') ? undefined : projectById.get(stop.target)?.title;

  const goTo = (step: number) => {
    writeState({ id: state.id, step });
    navigate(tour.stops[step].target);
  };

  return (
    <div
      role="region"
      aria-label="Guided tour"
      data-print-hide
      className="border-hairline bg-paper/95 fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur-sm"
    >
      <div className="max-w-shell mx-auto flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3">
        {/* aria-live: the bar appears/changes without focus moving to it, so
            announce each stop politely for screen-reader users. */}
        <p aria-live="polite" className="text-muted min-w-0 flex-1 text-sm">
          <span className="text-ink font-semibold">{tour.label}</span>
          {stopLabel && <span className="text-ink"> · {stopLabel}</span>} — {stop.note}
        </p>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {tour.stops.map((s, i) => (
            <span
              key={s.target}
              className={`h-1.5 w-1.5 rounded-full ${i === state.step ? 'bg-accent' : 'bg-hairline'}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(state.step - 1)}
            disabled={state.step === 0}
            className="border-hairline text-muted hover:text-ink rounded-full border px-3 py-1 text-sm transition-colors disabled:opacity-40"
          >
            ← Prev
          </button>
          {state.step < tour.stops.length - 1 ? (
            <button
              type="button"
              onClick={() => goTo(state.step + 1)}
              className="bg-accent text-accent-contrast rounded-full px-4 py-1 text-sm font-medium transition-opacity hover:opacity-90"
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => writeState(null)}
              className="bg-accent text-accent-contrast rounded-full px-4 py-1 text-sm font-medium transition-opacity hover:opacity-90"
            >
              Done
            </button>
          )}
          <button
            type="button"
            onClick={() => writeState(null)}
            aria-label="Exit the tour"
            className="border-hairline text-muted hover:text-ink rounded-full border px-3 py-1 text-sm transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
