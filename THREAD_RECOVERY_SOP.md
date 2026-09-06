# Thread Recovery SOP

Use this procedure when Egg, Codex, or another collaborator resumes work on the site.

## 1. Re-anchor

- Confirm the repository root and remote before making claims.
- Read `START_HERE_FOR_NEW_THREAD.md`, `CURRENT_STATE.md`, and `README.md`.
- Run `git status --short` and inspect existing changes before touching files.
- Treat `src/data/projects.json` as the main public content authority unless a newer project note explicitly says otherwise.

## 2. Preserve The Public Boundary

- Keep public pages written for visitors, not as instructions to the site builder.
- Keep adult entries in the adult data lane and route them through the age gate.
- Do not place explicit, nude, minor-coded, bestial, or non-consensual imagery in public assets.
- Do not commit private manuscript paths, local usernames, credentials, or unpublished source text.
- Preserve existing user changes in data files; inspect diffs before staging.

## 3. Extend The Wiki Carefully

Every new entry should declare its `id`, `title`, `kind`, `category`, `status`, `entryRole`, `maturity`, `visibility`, `summary`, `description`, `body`, `tags`, and meaningful `connections`. Add `sourceNotes` only when provenance helps future maintenance without exposing private paths.

Use these relationship rules:

- Hubs explain a body of work and point to its strongest doors.
- Entries explain a specific work, person, place, system, or idea.
- References hold supporting context, glossaries, catalogs, and indexes.
- Link major plot points, characters, philosophies, settings, and artifacts.
- Prefer a few strong links over a cloud of incidental noun links.
- When a public entry needs to point into adult material, use the adult route so the age boundary remains explicit.

## 4. Media And Music

- Put public images under `public/images/` and hosted audio under `public/audio/music/`.
- Add or update the corresponding JSON entry rather than hard-coding a card in a page component.
- Verify filenames, alt text, audio paths, lyrics attribution, and playlist grouping.
- Do not assume an online Suno track is locally hosted. Record missing tracks as an unresolved content task until the audio is available and rights are clear.

## 5. Verify And Ship

Run:

```text
npm run build
git diff --check
```

Review the rendered routes most affected by the change, especially `/wiki`, the relevant detail page, `/adult-archive`, and `/music`. Confirm that links point to real destinations, images load, and the age gate still works in a fresh browser session.

Commit a focused change with a descriptive message and push `main` only after the build passes. GitHub Pages deploys from the repository workflow; allow the deployment to finish before calling the change live.

## 6. Update Continuity

After meaningful work, update `CURRENT_STATE.md` with the decision, files changed, verification result, unresolved questions, and the next recommended step. Keep this SOP focused on reusable process improvements; put project-specific facts in current state.

