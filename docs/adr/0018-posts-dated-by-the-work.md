# ADR-0018 — A post is dated by the work it describes, and says when it was written

**Status:** Accepted
**Date:** 2026-09-14 **Shipped in:** pending

## Context

Writing shipped in ADR-0017 with one post, dated the day it was published. Vivek then dictated a
second and asked for a third, and set the rule he actually wants:

> "I want this writings to reflect things back then itself … I want it dated back then itself,
> primarily because I want to have similar kind of writings about different projects that I've done
> over the years."

He is not building a blog. He is building a **written record of a career**, filled in project by
project from memory and from the documents that survive. The 2014 turret study, the 2015 slip ring
and the 2016 opto-electronics work will be written in 2026, and dating them all "2026" would sort a
decade of engineering into one meaningless day and bury the chronology that is the whole point.

The obvious implementation — just put the old date in `date:` — creates a different problem. A page
headed "December 2015" with no other signal tells a reader that Vivek was keeping a technical blog in 2015. He was not. On a site whose entire discipline is that a claim states what backs it (ADR-0008),
quietly antedating an essay is exactly the kind of small dishonesty the rest of the repository exists
to prevent.

## Decision

1. **`date` is the work, not the writing.** A post is dated to the end of the period it describes —
   the month the project concluded, on the last day of that month, the day being nominal where only
   the month is known. `/writing/` and the sitemap order by it, so the section reads as a career in
   sequence.
2. **`written` records when it was actually written**, and is rendered wherever the date is rendered:
   "Field note · December 2015 · written September 2026". Never one without the other. A post with no
   `written` field was written when it was dated, which is the ADR-0017 case.
3. **`written` must not precede `date`** (you cannot write it up before doing it) and, like `date`,
   must not be in the future. Both are validated, and a violation fails the build naming the field.
4. **The index says so in its own sentence**, so the convention is visible to a reader who never
   opens a single post: these are written now, about work done then.
5. **The Atom feed publishes by work date and updates by written date**, so a reader who subscribes
   still sees a newly written post arrive, even when the work it describes is a decade old.

## Consequences

- The two posts already published are re-dated to their work: the bid-to-handover field note to
  January 2018 (the end of the Legend years) and the Chennai turret note to March 2015 (the month the
  study was delivered). Both gain `written: 2026-09-14`. Their URLs do not change.
- Newly written posts about old work do not appear at the top of `/writing/`. That is the intended
  cost of a chronological record; the feed's `updated` field is where recency lives.
- Every future post carries two dates, and the second one is a standing admission that the writing is
  retrospective. That is the honest form of what Vivek asked for, and it is cheaper to render than to
  explain later.
- Reading a date off the page now requires knowing the convention. The index sentence and the
  per-post line carry it; nothing else has to.

## Alternatives rejected

- **Date posts by the writing, and mention the period in prose.** What shipped in ADR-0017, and what
  Vivek explicitly rejected: it makes a career record look like a burst of blogging in one week.
- **Backdate silently, with no `written` field.** Gives him the chronology and costs the site its
  credibility the first time someone notices the site did not exist in 2015.
- **A separate `period` field, keeping `date` as the publication date.** Two dates again, but sorted
  by the wrong one — the index would still be a 2026 pile.
- **Sort by `written`, display `date`.** The ordering a reader sees would contradict the dates they
  read, which is worse than either consistent choice.
