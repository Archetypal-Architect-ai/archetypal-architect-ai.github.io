export type EntryKind =
  | "Universe"
  | "Series"
  | "Novel"
  | "Song"
  | "Album"
  | "Video"
  | "Image"
  | "Essay"
  | "Blog Post"
  | "Game"
  | "Tool"
  | "Merch"
  | "Atlas"
  | "Character"
  | "Place"
  | "Concept"
  | "Other";

export type EntryStatus = "Completed" | "Ongoing" | "Archived" | "Experimental" | "Seed";
export type EntryRole = "Hub" | "Entry" | "Reference";

export type EntryLink = {
  label: string;
  url: string;
  type?: "Read" | "Listen" | "Watch" | "Buy" | "Download" | "Reference" | "External";
};

export type ProjectCategory = EntryKind;
export type ProjectStatus = EntryStatus;
export type ProjectLink = EntryLink;

export type EntryConnection = {
  id: string;
  label: string;
  type:
    | "Contains"
    | "Belongs to"
    | "Inspired by"
    | "Inspired"
    | "Adapted from"
    | "Adapted into"
    | "Soundtrack for"
    | "Visual for"
    | "Merch for"
    | "Atlas node"
    | "Related";
};

export type Project = {
  id: string;
  title: string;
  kind: EntryKind;
  category: EntryKind;
  status: EntryStatus;
  entryRole?: EntryRole;
  featured?: boolean;
  date?: string;
  thumbnail: string;
  thumbnailAlt: string;
  summary: string;
  description: string;
  body?: string[];
  tags: string[];
  links: EntryLink[];
  merchLinks?: EntryLink[];
  connections?: EntryConnection[];
  sourceNotes?: string[];
  artPrompt?: string;
  externalWikiUrl?: string;
  series?: string;
  bookNumber?: number;
  genre?: string;
  wordCount?: string;
  chapterCount?: string;
  mood?: string;
  price?: string;
  notes?: string;
};

export const creator = {
  name: "Archetypal Architect",
  imprint: "Archetypal Architect",
  tagline: "A living wiki of stories, songs, images, tools, worlds, and strange little economies.",
  email: "mailto:contact@archetypalarchitect.online",
  bio:
    "Independent author, philosopher, hypnotherapist, craftsman, worldbuilder, and experimental creator working around systems, myth, psychology, civilization, AI, agency, desire, and the places where tools become culture.",
  aboutTheWork:
    "The useful shape is not a portfolio shelf. It is a cross-linked archive: fiction feeds music, music feeds images, images become merch, merch points back to characters, and the novel universe keeps expanding through its own atlas.",
  socialLinks: [
    { label: "Email", url: "mailto:contact@archetypalarchitect.online" },
    { label: "Substack", url: "https://substack.com" },
    { label: "YouTube", url: "https://youtube.com" },
    { label: "Suno", url: "https://suno.com" },
    { label: "Gumroad", url: "https://gumroad.com" },
    { label: "Royal Road", url: "https://royalroad.com" },
    { label: "WebNovel", url: "https://webnovel.com" },
    { label: "Amazon Author Page", url: "https://amazon.com" }
  ]
};

export const projects: Project[] = [
  {
    id: "house-of-the-gilded-lily",
    title: "House of the Gilded Lily",
    kind: "Series",
    category: "Series",
    status: "Ongoing",
    entryRole: "Hub",
    featured: true,
    date: "2026-06-06",
    thumbnail: "/images/generated/house-gilded-lily.png",
    thumbnailAlt: "Generated gothic academy art with mist, gold lily motifs, and a tastefully dressed adult woman.",
    summary: "A secluded mountain academy series hub with ritual polish, hierarchy, and adult gothic tension.",
    description:
      "This is a series-level public hub, not a book-by-book dump. The visible entry keeps the academy atmosphere, gold-lily identity, and character energy while leaving the explicit production text in the source folders.",
    body: [
      "The first-pass extraction pointed to a secluded mountain academy, mist, ritual service aesthetics, and a final-year Lotus figure with silver-streaked hair and penetrating eyes.",
      "Public treatment: adult gothic academy, clothed, tasteful, suggestive, and clear that this is not children's fantasy."
    ],
    tags: ["smut series", "academy", "gothic", "ritual", "adult-coded"],
    links: [{ label: "Local source folder", url: "#", type: "Reference" }],
    sourceNotes: [
      "Private manuscript archive: House of the Gilded Lily representative files.",
      "Representative notes were skimmed for setting and character language only; source manuscripts were not modified."
    ],
    artPrompt:
      "Adult gothic academy series hub for House of the Gilded Lily: secluded mountain academy in mist, golden lily motifs, adult woman in elegant high-neck black-and-gold uniform dress, silver-streaked hair, penetrating eyes, literary dark fantasy mood, clothed, tasteful, no nudity, no explicit pose, no minors, no schoolgirl styling, no franchise imitation.",
    merchLinks: [{ label: "Gilded Lily print slot", url: "#", type: "Buy" }],
    connections: [
      { id: "mythos-of-lust", label: "Mythic adult fantasy neighbor", type: "Related" },
      { id: "plain-language-mythos", label: "Mythic framework neighbor", type: "Related" }
    ]
  },
  {
    id: "mythos-of-lust",
    title: "Mythos of Lust",
    kind: "Series",
    category: "Series",
    status: "Ongoing",
    entryRole: "Hub",
    featured: true,
    date: "2026-06-06",
    thumbnail: "/images/generated/mythos-of-lust.png",
    thumbnailAlt: "Generated mythic forest tavern art with adult fantasy figures in layered clothing.",
    summary: "A mythic adult-fantasy hub where old gods, forest paths, taverns, and desire become folklore.",
    description:
      "The hub keeps the mythic and woodland atmosphere without exposing the explicit manuscript scenes on the public index. It is meant to gather stories, songs, images, and essays that orbit this erotic-mythic register.",
    body: [
      "The source skim surfaced a forest/tavern axis, Elys with broad shoulders and thick dark hair, Alysia with green eyes, and the pressure of old gods in the trees.",
      "The public art direction treats that as adult folklore: suggestive, clothed, and mythic rather than explicit."
    ],
    tags: ["smut series", "myth", "forest", "old gods", "adult fantasy"],
    links: [{ label: "Local source folder", url: "#", type: "Reference" }],
    sourceNotes: [
      "Private manuscript archive: Mythos of Lust representative files.",
      "Character and setting phrases were used as prompt notes, not copied into the site as scene text."
    ],
    artPrompt:
      "Adult mythic fantasy series hub for Mythos of Lust: ancient forest tavern at dusk, adult male wanderer with thick dark hair beside an adult green-eyed forest priestess in layered robes, old gods implied by carved trees and lantern smoke, sensual folklore atmosphere, clothed, tasteful, no nudity, no sexual act, no minors, no franchise imitation.",
    connections: [
      { id: "house-of-the-gilded-lily", label: "Ritual and myth neighbor", type: "Related" },
      { id: "plain-language-mythos", label: "Philosophy companion", type: "Related" }
    ]
  },
  {
    id: "monster-girl-harem",
    title: "Monster Girl Harem",
    kind: "Series",
    category: "Series",
    status: "Ongoing",
    entryRole: "Hub",
    featured: true,
    date: "2026-06-06",
    thumbnail: "/images/generated/monster-girl-harem.png",
    thumbnailAlt: "Generated fantasy swamp settlement with adult humanoid fantasy women and an adventurer.",
    summary: "A fantasy-adventure hub for humanoid monster-girl stories, swamp settlements, and saturated pulp energy.",
    description:
      "This hub is deliberately sanitized for the public archive: adult humanoid fantasy characters, adventure composition, no bestial framing, no explicit imagery, and no attempt to expose source scenes directly.",
    body: [
      "The source notes suggested an enchanted swamp, a lamia settlement, and jewel-toned humanoid fantasy women in emerald, sapphire, and crimson palettes.",
      "The public art keeps the fantasy color and danger while avoiding animalized sexual content or explicit poses."
    ],
    tags: ["smut series", "fantasy", "humanoid", "swamp", "pulp"],
    links: [{ label: "Local source folder", url: "#", type: "Reference" }],
    sourceNotes: [
      "Private manuscript archive: Monster Girl Harem representative files.",
      "Only humanoid fantasy and setting cues were used for the generated-art pass."
    ],
    artPrompt:
      "Adult fantasy adventure series hub for Monster Girl Harem: enchanted swamp village, lanterns, jewel-toned humanoid fantasy women with elegant scaled accessories and layered clothes, adult adventurer, pulp cover composition, sensual but non-explicit, no nudity, no sexual act, no bestial framing, no minors, no franchise imitation.",
    connections: [
      { id: "mythos-of-lust", label: "Fantasy neighbor", type: "Related" },
      { id: "fiction-universe-merch", label: "Possible print/product thread", type: "Merch for" }
    ]
  },
  {
    id: "bimbo-farm",
    title: "Bimbo Farm",
    kind: "Series",
    category: "Series",
    status: "Ongoing",
    entryRole: "Hub",
    featured: true,
    date: "2026-06-06",
    thumbnail: "/images/generated/bimbo-farm.png",
    thumbnailAlt: "Generated noir warehouse art with a tall adult detective in a fitted uniform.",
    summary: "A noir-adjacent adult satire hub built around investigation, transformation anxiety, and slick pulp tension.",
    description:
      "This entry frames the material as a public-facing hub rather than an explicit premise page. It emphasizes detective-noir tension, product satire, and adult-coded transformation themes without leaning into nude or explicit visuals.",
    body: [
      "The source skim highlighted detective figures such as Sheila/Alvarez, a tall imposing investigator, tight uniform symbolism, and warehouse/interrogation tension.",
      "The generated image translates that into clothed noir mood and readable adult genre energy."
    ],
    tags: ["smut series", "noir", "satire", "transformation", "adult-coded"],
    links: [{ label: "Local source folder", url: "#", type: "Reference" }],
    sourceNotes: [
      "Private manuscript archive: Bimbo Farm representative files.",
      "Prompt notes were drawn from detective/setting cues rather than explicit scene content."
    ],
    artPrompt:
      "Adult noir satire series hub for Bimbo Farm: moody warehouse office, tall adult female detective in a fitted but professional uniform, investigation board, pink product labels used as satire props, cinematic shadows, suggestive adult genre energy, clothed, no nudity, no explicit pose, no minors, no franchise imitation.",
    connections: [
      { id: "fiction-universe-merch", label: "Satirical product/merch thread", type: "Merch for" },
      { id: "supers-dark-erotica", label: "Dark adult satire neighbor", type: "Related" }
    ]
  },
  {
    id: "supers-dark-erotica",
    title: "Supers Dark Erotica",
    kind: "Series",
    category: "Series",
    status: "Seed",
    entryRole: "Hub",
    featured: true,
    date: "2026-06-06",
    thumbnail: "/images/generated/supers-dark-erotica.png",
    thumbnailAlt: "Generated adult superhero rooftop art with a fully suited woman looking over a neon city.",
    summary: "A sanitized placeholder hub for superhero satire and adult power fantasy, held back from explicit source material.",
    description:
      "The source folder had material that should not lead the first public pass. This hub keeps only the safe structural idea: superhero satire, dangerous glamour, public identity, and power as a corrupting mythology.",
    body: [
      "This entry exists so the archive has a slot for the series without foregrounding unsafe or explicit source framing.",
      "Future public entries should stay adult, clothed, and satirical unless specific publish-ready copy is chosen."
    ],
    tags: ["smut series", "superheroes", "satire", "power", "adult-coded"],
    links: [{ label: "Local source folder", url: "#", type: "Reference" }],
    sourceNotes: [
      "Private manuscript archive: Supers/Villains-adjacent material was inspected conservatively.",
      "Folders with non-consensual, bestial, or otherwise unsafe framing were excluded from the first public pass."
    ],
    artPrompt:
      "Adult satirical superhero erotica-adjacent series hub: neon rooftop, adult woman superhero 25+ in a full-body suit, cape, city billboards, dangerous glamour, power fantasy mood, clothed, no nudity, no sexual pose, no fetish gear, no minors, no franchise imitation.",
    connections: [
      { id: "bimbo-farm", label: "Dark satire neighbor", type: "Related" },
      { id: "fiction-universe-merch", label: "Possible logo/shirt thread", type: "Merch for" }
    ]
  },
  {
    id: "my-evolution-system",
    title: "My Evolution System",
    kind: "Universe",
    category: "Universe",
    status: "Ongoing",
    entryRole: "Hub",
    featured: true,
    date: "2026-06-06",
    thumbnail: "/images/works/my-evolution-system-book-1-cover.jpg",
    thumbnailAlt: "Most recent Book 1 cover art for My Evolution System: Fall from Space.",
    summary: "A compact link hub for the separate My Evolution System wiki and manuscript/audio archive.",
    description:
      "This site makes room for My Evolution System without trying to rebuild its atlas here. The entry is a doorway: manuscript references, audio/visual artifacts, and the external wiki-in-progress should live behind it.",
    body: [
      "Private manuscript files include My Evolution System and Fall from Space variants in DOCX, ODT, and PDF forms.",
      "Keep this as a hub/link slot until the dedicated My Evolution System wiki is ready to be connected."
    ],
    tags: ["novel universe", "separate wiki", "system fiction", "audio", "atlas"],
    links: [
      { label: "Open Notion book page", url: "https://app.notion.com/p/2d974c4fdf8f80e3a381d4ab2f52bece?pvs=1", type: "Reference" },
      { label: "Separate wiki slot", url: "#", type: "External" }
    ],
    sourceNotes: [
      "Private manuscript archive: My Evolution System and Fall from Space Book 1 draft variants.",
      "Private manuscript archive: My Evolution System and Fall from Space Book 2 draft variants.",
      "Private publishing shelf: current Book 1 ebook cover.",
      "Copied website asset: public/images/works/my-evolution-system-book-1-cover.jpg."
    ],
    externalWikiUrl: "https://app.notion.com/p/2d974c4fdf8f80e3a381d4ab2f52bece?pvs=1",
    connections: [
      { id: "plain-language-mythos", label: "Shares system/philosophy spine", type: "Related" },
      { id: "deja-vu", label: "Audio/video archive neighbor", type: "Related" }
    ]
  },
  {
    id: "roxy-stardust-archive",
    title: "Roxy Stardust Archive",
    kind: "Universe",
    category: "Universe",
    status: "Archived",
    entryRole: "Reference",
    date: "2026-06-06",
    thumbnail: "/images/generated/roxy-archive.png",
    thumbnailAlt: "Generated neutral archive desk with star maps, manuscripts, and sci-fi labels.",
    summary: "One compact archive doorway for the Roxy production materials, Notion dashboards, Drive folders, music, visuals, and merch notes.",
    description:
      "Roxy stays in the wiki, but no longer drives the public structure. This entry acts as a compact reference node for the real production archive instead of spreading every dashboard and asset database across the front page.",
    body: [
      "Use this as the launch point for deeper private/reference material: books, bundles, covers, shirts, video/channel assets, songs, Drive manuscripts, and Notion planning pages.",
      "The public index now gives more room to other series hubs and nonfiction/product nodes."
    ],
    tags: ["Roxy", "archive", "Drive", "Notion", "adult sci-fi"],
    links: [
      { label: "Open roxyverse Drive folder", url: "https://drive.google.com/drive/folders/1ciRTtDD3P7oyn-GvGY99PljbR7elrgag", type: "Reference" },
      { label: "Open Notion spine dashboard", url: "https://app.notion.com/p/2b174c4fdf8f80688eddddc26bd89208?pvs=1", type: "Reference" },
      { label: "Product and book ideas", url: "https://app.notion.com/p/1dc74c4fdf8f80b2bb27c9b5fbfd21e1?pvs=1", type: "Reference" }
    ],
    sourceNotes: [
      "Private Roxy Stardust production archive was used as reference context only.",
      "Google Drive roxyverse folder was used as a reference link target.",
      "Notion Roxyverse, lore, story canon, music, visuals, and merch databases remain external references."
    ],
    artPrompt:
      "Neutral sci-fi production archive for Roxy Stardust Archive: no people, dark desk with star maps, manuscript stacks, drive icons, hazard labels, neon sticky notes, starship window, adult creator archive mood, no explicit imagery, no character portrait, no franchise imitation.",
    connections: [
      { id: "deja-vu", label: "Music/video archive neighbor", type: "Related" },
      { id: "fiction-universe-merch", label: "Merch planning neighbor", type: "Related" }
    ]
  },
  {
    id: "make-anxiety-your-superpower",
    title: "Make Anxiety Your Superpower",
    kind: "Tool",
    category: "Tool",
    status: "Completed",
    entryRole: "Entry",
    date: "2025-11-13",
    thumbnail: "/images/works/make-anxiety-cover.jpg",
    thumbnailAlt: "Make Anxiety Your Superpower cover art.",
    summary: "A real nonfiction/product node from the local ebook archive, tied to psychology and agency work.",
    description:
      "A completed self-help/philosophy product that belongs beside the fiction because it shares the same practical obsession: turning internal pressure into usable agency.",
    body: ["Private product archive includes cover, manuscript, PDF, and audio files."],
    tags: ["nonfiction", "anxiety", "psychology", "audio", "product"],
    links: [{ label: "View copied cover", url: "/images/works/make-anxiety-cover.jpg", type: "Reference" }],
    sourceNotes: ["Private product archive: Make Anxiety Your Superpower cover, manuscript, PDF, and audio files."],
    connections: [
      { id: "emotional-misinterpretation-dictionary", label: "Nonfiction companion", type: "Related" },
      { id: "plain-language-mythos", label: "Practical philosophy neighbor", type: "Related" }
    ]
  },
  {
    id: "emotional-misinterpretation-dictionary",
    title: "The Emotional Misinterpretation Dictionary",
    kind: "Tool",
    category: "Tool",
    status: "Completed",
    entryRole: "Entry",
    date: "2025-11-13",
    thumbnail: "/images/works/emotional-misinterpretation-dictionary.jpg",
    thumbnailAlt: "The Emotional Misinterpretation Dictionary cover art.",
    summary: "A compact psychology/product node for naming mistaken emotional readings.",
    description:
      "A real ebook/audio artifact that fits the archive as a thinking tool: part dictionary, part nervous-system map, part practical language kit.",
    body: ["Private product archive includes cover, manuscript, PDF, and audio files."],
    tags: ["nonfiction", "psychology", "dictionary", "audio", "product"],
    links: [{ label: "View copied cover", url: "/images/works/emotional-misinterpretation-dictionary.jpg", type: "Reference" }],
    sourceNotes: ["Private product archive: The Emotional Misinterpretation Dictionary cover, manuscript, PDF, and audio files."],
    connections: [{ id: "make-anxiety-your-superpower", label: "Nonfiction companion", type: "Related" }]
  },
  {
    id: "fiction-universe-merch",
    title: "Fiction Universe Merch Threads",
    kind: "Merch",
    category: "Merch",
    status: "Seed",
    entryRole: "Hub",
    date: "2026-06-06",
    thumbnail: "/images/hero-studio.png",
    thumbnailAlt: "Archive studio image used as a placeholder for merch planning.",
    summary: "A scattered merch hub for prints, shirts, slogans, covers, and products attached to entries rather than a boring product list.",
    description:
      "Merch should appear where it belongs: on a series, character, image, song, or concept page. This hub is only the index of those threads until real product pages are ready.",
    tags: ["merch", "prints", "shirts", "shop threads", "products"],
    links: [
      { label: "Gumroad placeholder", url: "https://gumroad.com", type: "Buy" },
      { label: "Product ideas Notion", url: "https://app.notion.com/p/1dc74c4fdf8f80b2bb27c9b5fbfd21e1?pvs=1", type: "Reference" }
    ],
    sourceNotes: [
      "Notion product/book ideas page.",
      "Existing local cover and generated art assets can become product imagery later."
    ],
    connections: [
      { id: "house-of-the-gilded-lily", label: "Series print slot", type: "Merch for" },
      { id: "monster-girl-harem", label: "Fantasy print slot", type: "Merch for" },
      { id: "roxy-stardust-archive", label: "Roxy merch archive", type: "Related" }
    ]
  },
  {
    id: "deja-vu",
    title: "Deja Vu",
    kind: "Song",
    category: "Song",
    status: "Completed",
    entryRole: "Entry",
    date: "2025-10-20",
    thumbnail: "/images/works/deja-vu-thumbnail.jpg",
    thumbnailAlt: "Deja Vu music video thumbnail.",
    summary: "A real music/video artifact from the private audio-visual archive.",
    description:
      "Deja Vu appears locally as video and thumbnail assets, so it stays as a music/video artifact that can later connect to lyric pages, videos, or image sets.",
    body: ["Private audio-visual archive includes the Deja Vu video and thumbnail assets."],
    tags: ["song", "video", "thumbnail", "local asset"],
    links: [{ label: "View copied thumbnail", url: "/images/works/deja-vu-thumbnail.jpg", type: "Reference" }],
    sourceNotes: ["Private audio-visual archive: Deja Vu video.", "Private audio-visual archive: Deja Vu thumbnail."],
    connections: [
      { id: "my-evolution-system", label: "Audio/video archive neighbor", type: "Related" },
      { id: "roxy-stardust-archive", label: "Production archive neighbor", type: "Related" }
    ]
  },
  {
    id: "plain-language-mythos",
    title: "Plain Language Philosophy: Framework for Understanding the Mythos",
    kind: "Essay",
    category: "Essay",
    status: "Ongoing",
    entryRole: "Reference",
    date: "2025-11-20",
    thumbnail: "/images/hero-studio.png",
    thumbnailAlt: "A studio archive image representing philosophical framework notes.",
    summary: "A Notion philosophy reference that can explain the skeleton beneath the mythos without exposing every private note.",
    description:
      "Notion search surfaced this as a conceptual bridge for readers encountering the mythos, the fiction systems, or the worldbuilding engine without needing all of the private scaffolding first.",
    tags: ["Notion", "philosophy", "mythos", "reader guide"],
    links: [{ label: "Open Notion page", url: "https://app.notion.com/p/1d474c4fdf8f80bfb30adce3862c7ccc?pvs=1", type: "Reference" }],
    sourceNotes: ["Notion: Plain Language Philosophy: Framework for Understanding the Mythos."],
    connections: [
      { id: "mythos-of-lust", label: "Mythic fiction companion", type: "Related" },
      { id: "my-evolution-system", label: "Shares philosophical spine", type: "Related" },
      { id: "make-anxiety-your-superpower", label: "Practical philosophy neighbor", type: "Related" }
    ]
  }
];

export const categories: EntryKind[] = [
  "Universe",
  "Series",
  "Novel",
  "Song",
  "Album",
  "Video",
  "Image",
  "Essay",
  "Blog Post",
  "Game",
  "Tool",
  "Merch",
  "Atlas",
  "Character",
  "Place",
  "Concept",
  "Other"
];

export function getProjectsByCategory(category: EntryKind) {
  return projects.filter((project) => project.category === category);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function getBacklinks(id: string) {
  return projects.filter((project) => project.connections?.some((connection) => connection.id === id));
}

export function getConnectedEntries(id: string) {
  const entry = getProjectById(id);
  return (entry?.connections || [])
    .map((connection) => ({
      connection,
      entry: getProjectById(connection.id)
    }))
    .filter((item) => item.entry);
}

export const wikiFacets = [
  { label: "Series Hubs", kinds: ["Series", "Universe"] },
  { label: "Music", kinds: ["Song", "Album", "Video"] },
  { label: "Visuals", kinds: ["Image", "Video", "Merch"] },
  { label: "Thinking", kinds: ["Essay", "Blog Post", "Concept", "Tool"] },
  { label: "References", kinds: ["Universe", "Atlas", "Essay", "Other"] }
] satisfies { label: string; kinds: EntryKind[] }[];

export const allEntries = projects;
