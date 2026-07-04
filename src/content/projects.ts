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
  | "Imprint"
  | "Pen Name"
  | "Other";

export type EntryStatus = "Completed" | "Ongoing" | "Archived" | "Experimental" | "Seed";
export type EntryRole = "Hub" | "Entry" | "Reference";
export type EntryMaturity = "General" | "Adult";
export type EntryVisibility = "Public" | "Adult";

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
  maturity?: EntryMaturity;
  visibility?: EntryVisibility;
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
  audioSrc?: string;
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
  tagline: "Stories, songs, systems, and strange machines for minds that like friction.",
  email: "mailto:contact@archetypalarchitect.online",
  bio:
    "Archetypal Architect builds fiction, songs, essays, tools, and symbolic systems around agency, myth, psychology, civilization, AI, and the places where tools become culture.",
  aboutTheWork:
    "This archive tells stories about how stories get made. A novel may become a song. A song may become an image. An image may become a symbol, a product, or an argument. The mythos grows through those crossings.",
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
    id: "backmatter-link-index",
    title: "Backmatter Link Index",
    kind: "Concept",
    category: "Concept",
    status: "Ongoing",
    entryRole: "Hub",
    maturity: "General",
    visibility: "Public",
    featured: true,
    date: "2026-07-04",
    thumbnail: "/images/hero-studio.png",
    thumbnailAlt: "Archive studio image representing a central link index for books and author pages.",
    summary: "The canonical link layer for book backmatter, imprints, pen names, reader pages, and store profiles.",
    description:
      "The Backmatter Link Index gives every recurring name in the publishing ecosystem one stable home. A book can mention an imprint, a pen name, a reader list, a music catalog, or a universe wiki and send readers here instead of trapping them in stale store links.",
    body: [
      "Each backmatter page answers the reader's immediate questions: what this name means, what kind of work lives under it, where to read more, and which stores or platforms matter.",
      "As the catalog grows, this index can point to Amazon author pages, Smashwords profiles, Royal Road pages, Suno catalogs, Kit reader links, universe wikis, and shop pages.",
      "The goal is simple: every name in the backmatter becomes a doorway into the mythos rather than a loose end."
    ],
    tags: ["backmatter", "publishing", "imprints", "pen names", "reader links", "stores"],
    links: [
      { label: "Reader List", url: "/free", type: "Reference" },
      { label: "MES Publishing", url: "/wiki/mes-publishing", type: "Reference" },
      { label: "Dirty-minded Bastard Publishing", url: "/adult/dirty-minded-bastard-publishing", type: "Reference" },
      { label: "Pen Name Directory", url: "/wiki/pen-name-directory", type: "Reference" },
      { label: "MES Publishing on Smashwords", url: "https://www.smashwords.com/profile/view/MES_Publishing", type: "Read" },
      { label: "Dirty-minded Bastard on Smashwords", url: "https://www.smashwords.com/profile/view/Dirty_MInded_Bastard", type: "Read" }
    ],
    connections: [
      { id: "mes-publishing", label: "General fiction imprint", type: "Contains" },
      { id: "dirty-minded-bastard-publishing", label: "Adult fiction imprint", type: "Contains" },
      { id: "pen-name-directory", label: "Author identity directory", type: "Contains" },
      { id: "suno-music-catalog", label: "Songs referenced from books", type: "Related" },
      { id: "fiction-universe-merch", label: "Objects and shop links", type: "Related" }
    ]
  },
  {
    id: "mes-publishing",
    title: "MES Publishing",
    kind: "Imprint",
    category: "Imprint",
    status: "Ongoing",
    entryRole: "Hub",
    maturity: "General",
    visibility: "Public",
    date: "2026-07-04",
    thumbnail: "/images/works/my-evolution-system-book-1-cover.jpg",
    thumbnailAlt: "My Evolution System Book 1 cover used as the current MES Publishing visual anchor.",
    summary: "The imprint lane for My Evolution System, system fiction, universe atlas work, and related reader material.",
    description:
      "MES Publishing names the branch of the archive that points toward system fiction, evolutionary pressure, biotech, survival, and the expanding My Evolution System universe.",
    body: [
      "A reader reaching this page from book backmatter finds the clean path forward: the current universe entry, the dedicated atlas, the reader list, and any active store profiles once they are connected.",
      "The imprint belongs to the public-facing side of the mythos. It carries the work about adaptation, civilization, and the question of what agency means when a world starts rewriting the rules."
    ],
    tags: ["imprint", "MES", "system fiction", "My Evolution System", "backmatter"],
    links: [
      { label: "Reader List", url: "/free", type: "Reference" },
      { label: "My Evolution System", url: "/wiki/my-evolution-system", type: "Reference" },
      { label: "Smashwords Profile", url: "https://www.smashwords.com/profile/view/MES_Publishing", type: "Read" }
    ],
    connections: [
      { id: "backmatter-link-index", label: "Appears in backmatter", type: "Belongs to" },
      { id: "my-evolution-system", label: "Primary universe", type: "Contains" },
      { id: "archetypal-mythos", label: "Shares the mythos engine", type: "Related" }
    ]
  },
  {
    id: "dirty-minded-bastard-publishing",
    title: "Dirty-minded Bastard Publishing",
    kind: "Imprint",
    category: "Imprint",
    status: "Ongoing",
    entryRole: "Hub",
    maturity: "Adult",
    visibility: "Adult",
    date: "2026-07-04",
    thumbnail: "/images/generated/roxy-archive.png",
    thumbnailAlt: "Generated archive image representing the adult publishing wing.",
    summary: "The adult imprint lane for erotic genre work, spicy satire, taboo-adjacent mythmaking, and mature reader paths.",
    description:
      "Dirty-minded Bastard Publishing collects the adult side of the archive under one name. The imprint gives erotica and adult satire a clear shelf without mixing that material into the main public wiki.",
    body: [
      "Readers who arrive from adult-book backmatter can use this page to find the relevant series hubs, store profiles, reader links, and related adult works.",
      "The imprint still belongs to the larger mythos. It just speaks through desire, transformation, glamour, power, bodies, and the genre logic of adult fiction."
    ],
    tags: ["adult imprint", "erotica", "adult fiction", "backmatter", "publisher"],
    links: [
      { label: "Reader List", url: "/free", type: "Reference" },
      { label: "Smashwords Profile", url: "https://www.smashwords.com/profile/view/Dirty_MInded_Bastard", type: "Read" }
    ],
    connections: [
      { id: "backmatter-link-index", label: "Appears in backmatter", type: "Belongs to" },
      { id: "house-of-the-gilded-lily", label: "Adult series lane", type: "Contains" },
      { id: "mythos-of-lust", label: "Adult series lane", type: "Contains" },
      { id: "monster-girl-harem", label: "Adult series lane", type: "Contains" },
      { id: "bimbo-farm", label: "Adult satire lane", type: "Contains" },
      { id: "roxy-stardust-archive", label: "Adult sci-fi archive", type: "Contains" }
    ]
  },
  {
    id: "pen-name-directory",
    title: "Pen Name Directory",
    kind: "Pen Name",
    category: "Pen Name",
    status: "Seed",
    entryRole: "Hub",
    maturity: "General",
    visibility: "Public",
    date: "2026-07-04",
    thumbnail: "/images/hero-studio.png",
    thumbnailAlt: "Archive studio image representing author identities and store profiles.",
    summary: "A future directory for pen names, author profiles, storefronts, and platform-specific reading paths.",
    description:
      "The Pen Name Directory will keep author identities organized for readers who arrive from Amazon, Smashwords, Royal Road, WebNovel, Substack, or other platforms.",
    body: [
      "Each pen name can receive its own entry with the genre lane it serves, the books attached to it, and direct links to its active store profiles.",
      "This keeps backmatter simple: books can point to one stable wiki page, and the wiki can send readers onward to the right platform."
    ],
    tags: ["pen names", "Amazon", "Smashwords", "author profiles", "backmatter"],
    links: [
      { label: "Charles Adams on Smashwords", url: "https://www.smashwords.com/profile/view/Charles_Adams", type: "Read" },
      { label: "JRRFuckKin on Smashwords", url: "https://www.smashwords.com/profile/view/JRRFuckKin", type: "Read" },
      { label: "Rockshatter on Smashwords", url: "https://www.smashwords.com/profile/view/Rockshatter", type: "Read" },
      { label: "TheArchitect953 on Smashwords", url: "https://www.smashwords.com/profile/view/TheArchitect953", type: "Read" },
      { label: "Dirty-minded Bastard on Smashwords", url: "https://www.smashwords.com/profile/view/Dirty_MInded_Bastard", type: "Read" },
      { label: "MES Publishing on Smashwords", url: "https://www.smashwords.com/profile/view/MES_Publishing", type: "Read" }
    ],
    connections: [
      { id: "backmatter-link-index", label: "Organized through the backmatter index", type: "Belongs to" },
      { id: "mes-publishing", label: "General imprint lane", type: "Related" },
      { id: "dirty-minded-bastard-publishing", label: "Adult imprint lane", type: "Related" }
    ]
  },
  {
    id: "house-of-the-gilded-lily",
    title: "House of the Gilded Lily",
    kind: "Series",
    category: "Series",
    status: "Ongoing",
    entryRole: "Hub",
    maturity: "Adult",
    visibility: "Adult",
    featured: false,
    date: "2026-06-06",
    thumbnail: "/images/generated/house-gilded-lily.png",
    thumbnailAlt: "Generated gothic academy art with mist, gold lily motifs, and a tastefully dressed adult woman.",
    summary: "A gothic academy series about ritual, hierarchy, desire, and the cost of belonging.",
    description:
      "House of the Gilded Lily treats the academy as a machine for shaping identity. Its rituals polish people into roles, then ask what remains underneath the costume.",
    body: [
      "The setting leans into mist, uniforms, service rites, old money, and the dangerous intimacy of institutions that call control tradition.",
      "Inside the larger mythos, the series speaks to the way systems recruit longing. People enter looking for initiation and discover that every title carries a debt."
    ],
    tags: ["adult fiction", "academy", "gothic", "ritual", "belonging"],
    links: [],
    merchLinks: [],
    connections: [
      { id: "dirty-minded-bastard-publishing", label: "Published through the adult imprint lane", type: "Belongs to" },
      { id: "mythos-of-lust", label: "Mythic adult fantasy neighbor", type: "Related" },
      { id: "archetypal-mythos", label: "Uses the general mythic grammar", type: "Related" }
    ]
  },
  {
    id: "mythos-of-lust",
    title: "Mythos of Lust",
    kind: "Series",
    category: "Series",
    status: "Ongoing",
    entryRole: "Hub",
    maturity: "Adult",
    visibility: "Adult",
    featured: false,
    date: "2026-06-06",
    thumbnail: "/images/generated/mythos-of-lust.png",
    thumbnailAlt: "Generated mythic forest tavern art with adult fantasy figures in layered clothing.",
    summary: "An adult fantasy cycle where old gods, forest paths, taverns, and desire become folklore.",
    description:
      "Mythos of Lust belongs to the adult shelf, but its mythic engine matters to the larger archive: hunger becomes omen, encounter becomes initiation, and the forest keeps older laws than the town.",
    body: [
      "The series moves through taverns, roads, green-eyed priestesses, wanderers, and gods that hide in carved trees and smoke.",
      "Its place in the mythos is blunt: desire is not decoration. Desire exposes the bargains a world has trained its people to accept."
    ],
    tags: ["adult fiction", "myth", "forest", "old gods", "folklore"],
    links: [],
    connections: [
      { id: "dirty-minded-bastard-publishing", label: "Published through the adult imprint lane", type: "Belongs to" },
      { id: "house-of-the-gilded-lily", label: "Ritual and myth neighbor", type: "Related" },
      { id: "archetypal-mythos", label: "Uses the general mythic grammar", type: "Related" }
    ]
  },
  {
    id: "monster-girl-harem",
    title: "Monster Girl Harem",
    kind: "Series",
    category: "Series",
    status: "Ongoing",
    entryRole: "Hub",
    maturity: "Adult",
    visibility: "Adult",
    featured: false,
    date: "2026-06-06",
    thumbnail: "/images/generated/monster-girl-harem.png",
    thumbnailAlt: "Generated fantasy swamp settlement with adult humanoid fantasy women and an adventurer.",
    summary: "A fantasy-adventure series about dangerous attraction, otherness, and saturated pulp worlds.",
    description:
      "Monster Girl Harem uses pulp fantasy to explore contact with the beautiful, the strange, and the socially forbidden. Its creatures matter less as novelty than as pressure tests for what a hero thinks humanity means.",
    body: [
      "Swamp settlements, jewel-toned courts, serpentine motifs, and adventuring danger give the series its surface texture.",
      "In the larger mythos, the series asks how easily attraction becomes conquest and how fantasy worlds turn difference into either threat or invitation."
    ],
    tags: ["adult fiction", "fantasy", "humanoid", "swamp", "pulp"],
    links: [],
    connections: [
      { id: "dirty-minded-bastard-publishing", label: "Published through the adult imprint lane", type: "Belongs to" },
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
    maturity: "Adult",
    visibility: "Adult",
    featured: false,
    date: "2026-06-06",
    thumbnail: "/images/generated/bimbo-farm.png",
    thumbnailAlt: "Generated noir warehouse art with a tall adult detective in a fitted uniform.",
    summary: "A noir-adjacent adult satire about investigation, transformation anxiety, and manufactured identity.",
    description:
      "Bimbo Farm turns transformation into a crime scene. The detective frame gives the series a way to examine bodies, branding, compliance, and the fear that a market can rewrite a person faster than memory can defend them.",
    body: [
      "The noir mood matters: offices, warehouses, uniforms, interrogation rooms, product labels, and the exhausted suspicion that every explanation hides another machine.",
      "Its mythic question is modern and ugly: who owns a self after desire, commerce, and shame have all taken their cut?"
    ],
    tags: ["adult fiction", "noir", "satire", "transformation", "identity"],
    links: [],
    connections: [
      { id: "dirty-minded-bastard-publishing", label: "Published through the adult imprint lane", type: "Belongs to" },
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
    maturity: "Adult",
    visibility: "Adult",
    featured: false,
    date: "2026-06-06",
    thumbnail: "/images/generated/supers-dark-erotica.png",
    thumbnailAlt: "Generated adult superhero rooftop art with a fully suited woman looking over a neon city.",
    summary: "A dark superhero satire about power, performance, glamour, and corruption.",
    description:
      "Supers Dark Erotica treats superhero identity as theater with consequences. Masks, costumes, fame, and power all become eroticized symbols of control.",
    body: [
      "The city rooftop, the glowing billboard, and the public persona all point toward the same mythic problem: power wants an audience.",
      "Within the archive, this series belongs near the work about systems and agency. It asks what happens when the costume stops being a disguise and starts giving orders."
    ],
    tags: ["adult fiction", "superheroes", "satire", "power", "performance"],
    links: [],
    connections: [
      { id: "dirty-minded-bastard-publishing", label: "Published through the adult imprint lane", type: "Belongs to" },
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
    maturity: "General",
    visibility: "Public",
    featured: true,
    date: "2026-06-06",
    thumbnail: "/images/works/my-evolution-system-book-1-cover.jpg",
    thumbnailAlt: "Most recent Book 1 cover art for My Evolution System: Fall from Space.",
    summary: "A system-fiction universe about survival, biotech, agency, and civilization after the old world breaks.",
    description:
      "My Evolution System follows the pressure point where personal evolution stops being metaphor. The series turns adaptation into plot, technology into inheritance, and survival into a philosophical demand.",
    body: [
      "The dedicated universe atlas will carry the deep continuity: species, factions, places, powers, and the long causal chain of the setting.",
      "Across the archive, the series functions as one of the central mythos engines. It asks what a person becomes when evolution, ecology, and invention all start speaking at once."
    ],
    tags: ["novel universe", "separate wiki", "system fiction", "audio", "atlas"],
    links: [
      { label: "Open universe wiki", url: "https://app.notion.com/p/2d974c4fdf8f80e3a381d4ab2f52bece?pvs=1", type: "Reference" }
    ],
    externalWikiUrl: "https://app.notion.com/p/2d974c4fdf8f80e3a381d4ab2f52bece?pvs=1",
    connections: [
      { id: "mes-publishing", label: "Published through MES Publishing", type: "Belongs to" },
      { id: "archetypal-mythos", label: "Shares system/philosophy spine", type: "Related" },
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
    maturity: "Adult",
    visibility: "Adult",
    date: "2026-06-06",
    thumbnail: "/images/generated/roxy-archive.png",
    thumbnailAlt: "Generated neutral archive desk with star maps, manuscripts, and sci-fi labels.",
    summary: "A sci-fi adult archive about performance, spectacle, fame, and identity in orbit.",
    description:
      "Roxy Stardust gathers the space-glamour side of the adult archive: celebrity mythology, sci-fi spectacle, bodies as brands, and the strange loneliness of being turned into an image.",
    body: [
      "The archive connects books, covers, songs, videos, and product ideas around one bright, unstable persona.",
      "Its role in the mythos is theatrical: identity performs itself until the performance starts making claims on the soul."
    ],
    tags: ["Roxy", "archive", "Drive", "Notion", "adult sci-fi"],
    links: [],
    connections: [
      { id: "dirty-minded-bastard-publishing", label: "Published through the adult imprint lane", type: "Belongs to" },
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
    maturity: "General",
    visibility: "Public",
    featured: true,
    date: "2025-11-13",
    thumbnail: "/images/works/make-anxiety-cover.jpg",
    thumbnailAlt: "Make Anxiety Your Superpower cover art.",
    summary: "A practical psychology work about converting anxiety into attention, motion, and agency.",
    description:
      "Make Anxiety Your Superpower belongs beside the fiction because it handles the same problem in practical language: a person under pressure still needs a way to act.",
    body: [
      "The book treats anxiety as information with bad manners. It asks the reader to stop treating every internal alarm as prophecy and start asking what the signal can do.",
      "In the larger mythos, this is one of the nonfiction keys: agency begins when fear becomes legible."
    ],
    tags: ["nonfiction", "anxiety", "psychology", "audio", "product"],
    links: [{ label: "View copied cover", url: "/images/works/make-anxiety-cover.jpg", type: "Reference" }],
    connections: [
      { id: "emotional-misinterpretation-dictionary", label: "Nonfiction companion", type: "Related" },
      { id: "archetypal-mythos", label: "Practical philosophy neighbor", type: "Related" }
    ]
  },
  {
    id: "emotional-misinterpretation-dictionary",
    title: "The Emotional Misinterpretation Dictionary",
    kind: "Tool",
    category: "Tool",
    status: "Completed",
    entryRole: "Entry",
    maturity: "General",
    visibility: "Public",
    featured: true,
    date: "2025-11-13",
    thumbnail: "/images/works/emotional-misinterpretation-dictionary.jpg",
    thumbnailAlt: "The Emotional Misinterpretation Dictionary cover art.",
    summary: "A psychology dictionary for the moments when emotion mistranslates reality.",
    description:
      "The Emotional Misinterpretation Dictionary gives names to the little mistranslations that turn sensation into false certainty.",
    body: [
      "The project belongs in the archive as a language tool. It helps readers notice when fear, shame, desire, or anger has put a costume on the world.",
      "Inside the mythos, naming is not cosmetic. A thing that can be named can be negotiated with."
    ],
    tags: ["nonfiction", "psychology", "dictionary", "audio", "product"],
    links: [{ label: "View copied cover", url: "/images/works/emotional-misinterpretation-dictionary.jpg", type: "Reference" }],
    connections: [{ id: "make-anxiety-your-superpower", label: "Nonfiction companion", type: "Related" }]
  },
  {
    id: "fiction-universe-merch",
    title: "Fiction Universe Merch Threads",
    kind: "Merch",
    category: "Merch",
    status: "Seed",
    entryRole: "Hub",
    maturity: "General",
    visibility: "Public",
    date: "2026-06-06",
    thumbnail: "/images/hero-studio.png",
    thumbnailAlt: "Archive studio image representing symbols, phrases, and objects from the work.",
    summary: "A growing object shelf for symbols, shirts, prints, phrases, covers, and artifacts from the mythos.",
    description:
      "The shop thread treats merchandise as another kind of storytelling. A phrase, sigil, cover, or diagram can leave the page and become a portable fragment of the mythos.",
    tags: ["merch", "prints", "shirts", "shop threads", "products"],
    links: [
      { label: "Shop", url: "https://gumroad.com", type: "Buy" }
    ],
    connections: [
      { id: "my-evolution-system", label: "System fiction product thread", type: "Merch for" },
      { id: "archetypal-mythos", label: "Symbol and phrase product thread", type: "Merch for" }
    ]
  },
  {
    id: "deja-vu",
    title: "Deja Vu",
    kind: "Song",
    category: "Song",
    status: "Completed",
    entryRole: "Entry",
    maturity: "General",
    visibility: "Public",
    date: "2025-10-20",
    thumbnail: "/images/works/deja-vu-thumbnail.jpg",
    thumbnailAlt: "Deja Vu music video thumbnail.",
    summary: "A song and video artifact about repetition, recognition, and the feeling of returning to a scene before it happens.",
    description:
      "Deja Vu belongs to the music side of the archive, where songs work like emotional footnotes to the fiction and systems work.",
    body: [
      "The song sits near the recurring mythos of loops, memory, agency, and the suspicion that a person can arrive late to a decision their deeper self already made.",
      "As the music catalog grows, this page can connect lyrics, video imagery, and the story-world ideas that echo through the track."
    ],
    tags: ["song", "video", "memory", "loop", "recognition"],
    links: [{ label: "View copied thumbnail", url: "/images/works/deja-vu-thumbnail.jpg", type: "Reference" }],
    connections: [
      { id: "my-evolution-system", label: "Audio/video archive neighbor", type: "Related" },
      { id: "suno-music-catalog", label: "Belongs in the music catalog", type: "Belongs to" }
    ]
  },
  {
    id: "suno-music-catalog",
    title: "Published Suno Songs Library",
    kind: "Album",
    category: "Album",
    status: "Ongoing",
    entryRole: "Hub",
    maturity: "General",
    visibility: "Public",
    featured: true,
    date: "2026-07-04",
    thumbnail: "/images/hero-studio.png",
    thumbnailAlt: "Archive studio image representing a growing hosted music library.",
    summary: "A library for songs, lyric pages, videos, cover art, and musical fragments from across the mythos.",
    description:
      "The songs translate the archive into another nervous system. Some tracks grow out of novels, some out of characters, some out of images, and some out of stray concepts that needed rhythm before they needed prose.",
    body: [
      "As the catalog grows, each song can carry lyrics, audio, cover art, video links, mood notes, and connections back to the story or concept that produced it.",
      "The music section makes the mythos audible. It lets a character, world, or philosophical tension speak in a different register."
    ],
    tags: ["music", "Suno", "songs", "lyrics", "hosted audio", "catalog"],
    links: [
      { label: "Open Suno", url: "https://suno.com", type: "Listen" }
    ],
    connections: [
      { id: "deja-vu", label: "Existing local song artifact", type: "Contains" },
      { id: "archetypal-mythos", label: "Songs can express mythic concepts", type: "Adapted from" },
      { id: "my-evolution-system", label: "Novel universe can generate songs", type: "Inspired by" }
    ]
  },
  {
    id: "archetypal-mythos",
    title: "The Archetypal Mythos",
    kind: "Concept",
    category: "Concept",
    status: "Ongoing",
    entryRole: "Hub",
    maturity: "General",
    visibility: "Public",
    featured: true,
    date: "2026-07-04",
    thumbnail: "/images/hero-studio.png",
    thumbnailAlt: "A studio archive image representing the public mythos framework.",
    summary: "The recurring symbolic grammar behind the fiction, songs, tools, essays, and worlds.",
    description:
      "The Archetypal Mythos names the pattern beneath the work: systems become characters, tools become culture, desire becomes civilization, and agency gets tested against machines, institutions, gods, markets, and stories.",
    body: [
      "Readers who want more than a list of projects can start here. The mythos explains how the stories talk to each other and why songs, tools, essays, novels, and visual artifacts keep circling the same questions.",
      "Core tensions include agency versus automation, myth versus mechanism, language as a tool for self-command, civilization as an operating system, and the strange moment when an invented tool starts teaching its maker how to think.",
      "Every story in the archive can be read as one argument inside that larger conversation. Some ask what power does to identity. Some ask how fear becomes language. Some ask whether evolution liberates a person or drafts them into a larger design."
    ],
    tags: ["mythos", "philosophy", "reader guide", "agency", "systems", "worldbuilding"],
    links: [{ label: "Open Notion page", url: "https://app.notion.com/p/1d474c4fdf8f80bfb30adce3862c7ccc?pvs=1", type: "Reference" }],
    connections: [
      { id: "my-evolution-system", label: "Shares philosophical spine", type: "Related" },
      { id: "make-anxiety-your-superpower", label: "Practical philosophy neighbor", type: "Related" },
      { id: "suno-music-catalog", label: "Music can become mythic artifact", type: "Adapted into" },
      { id: "fiction-universe-merch", label: "Symbols can become products", type: "Merch for" }
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
  "Imprint",
  "Pen Name",
  "Other"
];

export function isAdultEntry(project: Project) {
  return project.visibility === "Adult" || project.maturity === "Adult";
}

export const publicProjects = projects.filter((project) => !isAdultEntry(project));
export const adultProjects = projects.filter(isAdultEntry);

export function getProjectsByCategory(category: EntryKind) {
  return publicProjects.filter((project) => project.category === category);
}

export function getFeaturedProjects() {
  return publicProjects.filter((project) => project.featured);
}

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function getBacklinks(id: string, entries: Project[] = publicProjects) {
  return entries.filter((project) => project.connections?.some((connection) => connection.id === id));
}

export function getConnectedEntries(id: string, entries: Project[] = publicProjects) {
  const entry = getProjectById(id);
  return (entry?.connections || [])
    .map((connection) => ({
      connection,
      entry: entries.find((project) => project.id === connection.id)
    }))
    .filter((item) => item.entry);
}

export const wikiFacets = [
  { label: "Backmatter", kinds: ["Imprint", "Pen Name", "Concept"] },
  { label: "Series Hubs", kinds: ["Series", "Universe"] },
  { label: "Music", kinds: ["Song", "Album", "Video"] },
  { label: "Visuals", kinds: ["Image", "Video", "Merch"] },
  { label: "Thinking", kinds: ["Essay", "Blog Post", "Concept", "Tool"] },
  { label: "References", kinds: ["Universe", "Atlas", "Essay", "Other"] }
] satisfies { label: string; kinds: EntryKind[] }[];

export const allEntries = publicProjects;
