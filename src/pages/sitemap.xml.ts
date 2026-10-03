import type { APIRoute } from "astro";
import books from "../data/books.json";
import { publicProjects } from "../content/projects";

// Public discovery pages only. Age-restricted routes (/adult-archive, /adult/*),
// the editor console, and legacy continuity pages are intentionally left out.
// GitHub Pages serves directory URLs, so every path carries a trailing slash.
const staticPaths = [
  "/",
  "/novels",
  "/music",
  "/wiki",
  "/merch",
  "/free",
  "/rowans-honey-cakes",
  "/about",
  "/contact",
  "/videos",
  "/essays",
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://archetypalarchitect.online");
  const paths = [
    ...staticPaths,
    ...books.map((book) => `/books/${book.id}`),
    ...publicProjects.map((entry) => `/wiki/${entry.id}`),
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths
      .map((p) => (p.endsWith("/") ? p : `${p}/`))
      .map((p) => `  <url><loc>${new URL(p, base).href}</loc></url>`)
      .join("\n") +
    `\n</urlset>\n`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
