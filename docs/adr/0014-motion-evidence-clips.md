# ADR-0014 — Motion evidence: short, muted clips with posters

**Status:** Accepted
**Date:** 2026-09-13 **Shipped in:** #44

## Context

The ENTI deck carries fourteen animations that are evidence in a way stills cannot be: seven kinematic
simulations of the BMP-II turret (elevation and traverse drives in manual and motorised modes, the
ammunition-supply mechanism in two positions, and the two drives combined) and seven LS-DYNA
qualification runs of the LCA-Navy position light (altitude, high-temperature storage and operation,
low-temperature operation, thermal shock, a natural-frequency sweep, and a transit-drop impact recorded
in a 3D stress view and a cross-section). The resume and the site already claim "kinetic simulations
of traverse, elevation, gearing and ammunition supply" and "qualification simulated before hardware";
the animations are what make those claims checkable (ADR-0008). A mechanism that moves is also the
most honest form of a CAD render — a still can hide a joint that does not turn.

The constraints are the same ones the media model already lives under (ADR-0005), plus two new ones.
Page weight: the site is a static export with near-zero runtime; a page that pulls tens of megabytes
of video on load betrays that. Motion sensitivity and attention: anything that plays by itself is a
distraction at best and an accessibility failure at worst. And the hygiene gate refuses any file over
2 MiB, which the originals (1.3–6.9 MB; two 3-minute WMV recordings at 127 MB and 63 MB) do not meet.

## Decision

1. `caseStudySchema.clips?: Array<{ file, poster, alt, caption?, credit? }>` — a fourth media slot,
   rendered as an "In motion" block after "From the bench" on the project page. Files live flat under
   `public/media/`, named by source prefix like every other media file, so the third-party credit rule
   (ADR-0006) applies unchanged; `enti-` joins the enforced prefix list.
2. **Every clip is MP4/H.264, ≤ 2 MiB, ≤ 35 s, ≤ 720 p, silent.** Longer recordings ship as an excerpt
   (the transit-drop runs: the first 70 s at 2× speed, 35 s). Originals over the ceiling are re-encoded
   with a documented ffmpeg invocation; the deck README and `scripts/media-web.json` record it.
3. **Never autoplays.** `<video controls muted playsInline preload="none" poster=…>` — nothing downloads
   until the reader presses play, the poster is a real still from the same deck, and the browser's own
   controls do the playing. No custom player, no JavaScript.
4. **Poster, alt and credit are mandatory** (poster ≤ 300 KB like any gallery image; alt ≥ 10 chars;
   credit for third-party prefixes) and the size budget is a content test, not a convention: the test
   reads the file sizes from disk and fails the build on the first clip or poster over budget.
5. Web copies of images and clips are produced by `scripts/media-web.py` from a checked-in manifest
   (`scripts/media-web.json`) that maps `source/decks/*/media` files to `public/media/` names with the
   resize and quality parameters, so the published media set is reproducible from the repository.
   Re-encoded clips are the one exception — they derive from release-asset originals — and the manifest
   records the exact command for each.

## Consequences

- Fourteen clips at ≤ 2 MiB is up to 28 MB more in the repository; the two decks' verbatim clips that
  already fit (six, 1.3–1.9 MB) are copied rather than re-encoded, so the source and web copies are the
  same bytes.
- `preload="none"` means the first press of play waits for the download; on a portfolio page that is the
  right trade — the reader chose to watch. Autoplay, looping and hover-to-play were considered and
  rejected as motion the reader did not ask for.
- Playwright cannot assert playback, so the e2e test checks the contract instead: poster and controls
  present, `preload="none"`, no `autoplay`, and both the MP4 and the poster served with the right
  content type. A unit test renders the block and checks one `<video>` per clip with its accessible name.
- Caption text is where the simulation's _meaning_ goes ("elevation drive, motorised — the gearing the
  resume mentions"), because the video itself cannot carry the claim.
- The BMP-II material is a defence programme (BEL's FICV). Vivek directed publication; the company
  itself presented the deck externally; the renders show a 1980s Soviet-origin vehicle documented in open
  literature. Recorded here so the decision is visible, not assumed.

## Alternatives rejected

- **Animated GIFs.** Ten times the bytes for worse quality; no pause control; no poster.
- **Hosting on YouTube/Vimeo and embedding.** Third-party scripts and cookies on a site whose principle is
  near-zero runtime; the clips would also stop being part of the repository's evidence.
- **Extracting a few stills per clip instead of shipping motion.** The stills already exist as posters;
  the claim under test is that the mechanisms _move_, and a strip of frames does not show that.
- **Autoplaying muted loops "like product pages do."** Distracting, hostile to motion-sensitive readers,
  and it downloads video the reader never asked for.
- **Committing the 3-minute transit-drop recordings in full (6.5 MB / 3.6 MB at 720 p).** Over the
  ceiling, and the drop event is over in the first minute; the excerpt loses nothing the reader needs.
