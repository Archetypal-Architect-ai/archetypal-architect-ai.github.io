# Creative Archive Wiki

This is an Astro creator wiki for a multidisciplinary body of work. It is built for cross-linked entries: novels can inspire songs, songs can inspire images, images can become merch, and universe atlas nodes can connect everything.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Astro prints in the terminal.

## Edit the content

Most updates happen in `src/content/projects.ts`:

- Change the public brand, hero text, contact links, and footer in `creator`.
- Add wiki entries in `projects`.
- Set `featured: true` to highlight an entry on the homepage.
- Use `kind` values like `Universe`, `Series`, `Novel`, `Song`, `Image`, `Video`, `Essay`, `Atlas`, `Tool`, or `Merch`.

Each wiki entry supports:

- `title`
- `kind`
- `status`
- `entryRole` (`Hub`, `Entry`, or `Reference`)
- `featured`
- `date`
- `thumbnail`
- `thumbnailAlt`
- `summary`
- `description`
- `body`
- `tags`
- `links`
- `merchLinks`
- `connections`
- `sourceNotes`
- `artPrompt`
- `externalWikiUrl`

Use `#` as a temporary link until you have the real URL.

## Add connections

Connections make the site behave like a wiki.

```ts
connections: [
  {
    id: "midnight-arcade",
    label: "Inspired song",
    type: "Inspired"
  }
]
```

The target `id` must match another entry. The target page will automatically show this as a backlink.

Useful connection types include:

- `Contains`
- `Belongs to`
- `Inspired by`
- `Inspired`
- `Adapted from`
- `Adapted into`
- `Soundtrack for`
- `Visual for`
- `Merch for`
- `Atlas node`
- `Related`

## Add scattered merch links

Use `merchLinks` inside any entry, not just merch entries:

```ts
merchLinks: [
  { label: "Character print collection", url: "#", type: "Buy" }
]
```

That lets a series, song, image set, or novel surface the relevant product links exactly where they make sense.

## Add images

Put images in `public/images/`, then reference them like this:

```ts
thumbnail: "/images/my-cover.jpg"
```

The current real-work starter assets are copied into `public/images/works/`.
They were copied from private source archives and the originals were left untouched.

Generated public-facing adult-genre art lives in `public/images/generated/`.
The current generated hub images were made from short source-derived setting or character notes, then constrained to:

- adult genre energy
- clothed or tastefully styled
- no nudity
- no explicit sexual pose
- no minors
- no copyrighted or franchise style imitation

Store the final prompt in the entry's `artPrompt` field and the provenance in `sourceNotes`.

Current source buckets used:

- Private manuscript archive
- Private publishing shelf
- Private audio-visual archive
- Google Drive reference folders
- Notion reference pages/databases

## Add a new project

Copy an existing object in `src/content/projects.ts`, change the `id`, and update the fields. Astro automatically creates a detail page at:

```text
/wiki/your-id
```

## Deploy

```bash
npm run build
```

The finished static site appears in `dist/`. You can deploy it to Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any static host.
