import type { EntryKind } from "./projects";

export const mediumPages: Record<
  string,
  {
    title: string;
    eyebrow: string;
    description: string;
    categories: EntryKind[];
  }
> = {
  novels: {
    title: "Novels",
    eyebrow: "Longform Fiction",
    description:
      "Series, standalone books, serialized fiction, and the atlas nodes that grow around them.",
    categories: ["Universe", "Series", "Novel", "Atlas"]
  },
  music: {
    title: "Music",
    eyebrow: "Songs & Albums",
    description:
      "Songs, albums, playlists, music videos, lyrics, and the fiction or images they connect to.",
    categories: ["Song", "Album", "Video"]
  },
  videos: {
    title: "Videos",
    eyebrow: "Watch",
    description:
      "Published videos, process pieces, music videos, essays, and screen artifacts connected back into the archive.",
    categories: ["Video", "Image"]
  },
  essays: {
    title: "Essays",
    eyebrow: "Writing",
    description:
      "Blog posts, essays, notes, and external writing that map the thinking behind the work.",
    categories: ["Essay", "Blog Post"]
  },
  merch: {
    title: "Merch",
    eyebrow: "Objects & Editions",
    description:
      "Objects, editions, digital bundles, and product links that can also appear inside related entries.",
    categories: ["Merch", "Image"]
  }
};
