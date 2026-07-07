import creatorData from "../data/creator.json";
import projectData from "../data/projects.json";
import wikiFacetData from "../data/wikiFacets.json";

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

export type Creator = {
  name: string;
  imprint: string;
  tagline: string;
  email: string;
  bio: string;
  aboutTheWork: string;
  socialLinks: EntryLink[];
};

export function displayStatus(status: EntryStatus) {
  if (status === "Seed") return "Under construction";
  if (status === "Ongoing") return "Open";
  if (status === "Archived") return "Archive";
  if (status === "Experimental") return "Experiment";
  return "Complete";
}

export const creator = creatorData as Creator;
export const projects = projectData as Project[];

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

export const wikiFacets = wikiFacetData as { label: string; kinds: EntryKind[] }[];
export const allEntries = publicProjects;
