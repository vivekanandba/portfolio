import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-2 font-display text-h2 font-semibold text-ink">This page doesn’t exist.</h1>
      <p className="mt-4 max-w-content text-muted">
        The link may be outdated, or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper no-underline transition-opacity hover:opacity-90"
      >
        Back to the portfolio
      </Link>
    </main>
  );
}
