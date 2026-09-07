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


## Reader Hub Revision — 2026-09-06

This revision supersedes the earlier recommendation to expand MES immediately. The author is overhauling that series and wants a broader hub for books, music, merchandise, and following the work.

- The homepage now features The Gentle Shadow, direct Amazon purchases, three playable songs, the honey-cake reader bonus, selected ideas, the shop, and verified follow links.
- Primary navigation is Books, Music, Explore, Shop, About, and Reader bonus. The relationship map remains within the wiki.
- MES lore is excluded from main discovery lists and retained at existing URLs with an earlier-continuity notice. No source entries were deleted. MES Publishing remains current. Permanent removal versus a public legacy archive still needs the author's decision.
- Linktree supplied the real YouTube, Substack, Amazon author, Etsy, and Book 2 purchase destinations. The Etsy redirect resolves to MESPublishing; on September 6 it had zero listings and a rebuild notice. Do not invent products or imply checkout inventory exists.
- The music player now uses actual track IDs, handles playback failures, resets previous-track controls, and pauses on playlist switches. Placeholder download buttons are removed.
- Generic platform homepages and placeholder links are filtered from shared entry links. Unknown profile links remain absent until verified.
- Two pre-existing missing legacy thumbnails now use existing relevant images.

### Validation

- Astro check: 0 errors, 0 warnings, 0 hints. Production build: 109 pages.
- The native Windows esbuild binary could not enumerate parent directories despite read permission. Local validation used esbuild-wasm 0.25.12 (matching the bundled native compiler version) through an external development-only loader. No dependency or lockfile changes were made for that workaround. Normal Linux CI remains authoritative for the native build.
- `node scripts/validate-site.mjs`: all 109 pages checked for local routes/assets plus book, social, shop, legacy, and playback markup regressions.
- Browser: homepage layout inspected; music play, switch, and pause verified; adult archive gate visible without consent. No changes to adult consent logic.
- `git diff --check` passes.

### Remaining Work

- Review the proposed redesign before publishing to the existing domain.
- Add actual Etsy products when the shop reopens; product photography, prices, and product links are not yet available.
- Decide the final disposition of MES legacy pages and provide revised public canon before expansion resumes.
- Review the pre-existing dependency audit separately (13 advisories reported during clean install); no broad dependency upgrades were included in this design change.

## Approved storefront redesign — 2026-09-07

The author approved the preview and authorized live publication. This supersedes the first reader-hub layout above. Cream, ink, and red editorial styling now leads with three verified Amazon books and their official cover art. Book filters, preview dialogs, dedicated book pages, a playlist listening room, and reader-bonus signup form the main visitor journey. Wiki discovery remains secondary; earlier MES routes and adult consent boundaries remain intact.

Book catalogue: `src/data/books.json`; cover provenance: `src/data/book-sources.json`; local cover assets: `public/images/books/`. Etsy still has no verified inventory; its page explicitly describes the shop rebuild and concept art.

Validation: production build generated 112 pages with zero errors, warnings, or hints. The built-site route and asset validator passes. Local build used the previously documented external WASM compiler workaround without repository dependency changes. GitHub Pages performs the native Linux build before deploying.
