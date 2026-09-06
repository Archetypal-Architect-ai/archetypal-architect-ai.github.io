# Current State

Updated: 2026-09-06

## Repository And Deployment

- Public repository: `Archetypal-Architect-ai/archetypal-architect-ai.github.io`
- Branch: `main`
- Production domain: <https://archetypalarchitect.online>
- Framework: Astro static site
- Editor path: `/admin` through Pages CMS
- Most recent confirmed commit before this handoff: `13c6c4b` (`Add live Amazon editions to Gentle Shadow`)

## Latest Decisions

- The site is a public-facing, cross-linked wiki and creative archive.
- Navigation should support layered exploration within genres and universes.
- Public pages should describe and tour the mythos, not explain what the page is for.
- Cards and detail headers should remain compact enough for encyclopedic reading.
- Adult erotica stays behind the adult archive and age gate; public work should not be visually dominated by it.
- The My Evolution System material is an expandable atlas, with the older Fandom wiki used as structural reference rather than final canon.
- The current official purchase path for *The Gentle Shadow*, Book 1, is live on Amazon in Kindle and paperback editions.

## Implemented Site State

- Wiki entries are data-driven in `src/data/projects.json`.
- Typed loaders and graph helpers live in `src/content/projects.ts`.
- Music metadata lives in `src/data/music.json`; lyrics live in `src/data/musicLyrics.ts`.
- Local hosted audio lives in `public/audio/music/`.
- Public and generated artwork lives under `public/images/`.
- Wiki entry backgrounds are selected by universe or creative territory.
- Adult archive and adult detail routes have resilient consent handoff using local storage, session storage, cookies, and an `adult=yes` navigation handoff.
- *The Gentle Shadow* Book 1 links to:
  - Kindle: <https://www.amazon.com/dp/B0H7TDDLN5>
  - Paperback: <https://www.amazon.com/dp/B0H7VRNFWM>
- The latest verified build produced 109 pages with 0 errors, 0 warnings, and 0 hints.

## Active Gaps

- Many wiki entries still need richer, source-grounded encyclopedic bodies and stronger cross-links.
- Grayson Reese and the elves need continued expansion from the authoritative continuity material; do not import obsolete Fandom terminology as canon.
- The full Suno catalog is not yet hosted locally. Missing tracks need audio files, lyrics where available, playlist placement, and a deliberate download or purchase path.
- Several merch links remain placeholders and need real destinations before publication.
- The age gate needs fresh-device browser verification after future route or link changes.
- Pages CMS should be tested by a signed-in collaborator before treating hand editing as fully validated.

## Next Recommended Step

Run a public-page content audit in three passes: first remove builder-facing language, then expand the highest-value universe and character entries from approved continuity, then audit every internal and adult-boundary link. After that, add the next batch of verified music assets and playlists.

