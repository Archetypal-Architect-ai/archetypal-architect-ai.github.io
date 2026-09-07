import fs from "node:fs";
import assert from "node:assert/strict";
import path from "node:path";
const root = "dist";
const files = fs
  .readdirSync(root, { recursive: true })
  .filter((f) => f.endsWith(".html"));
const missing = [];
for (const file of files) {
  const html = fs
    .readFileSync(path.join(root, file), "utf8")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const dest = path.join(root, decodeURI(m[1]));
    if (!fs.existsSync(dest) && !fs.existsSync(path.join(dest, "index.html")))
      missing.push([file, m[1]]);
  }
}
assert.deepEqual(missing, [], "Every internal page and asset must resolve");
const read = (p) => fs.readFileSync(path.join(root, p, "index.html"), "utf8");
assert(!read("").includes("Explicit links"));
assert(!read("novels").includes("MES Characters and Species"));
assert(read("novels").includes("https://www.amazon.com/dp/B0GX3FKFYQ"));
assert(read("wiki/my-evolution-system").includes("Earlier MES continuity"));
assert(read("wiki/mes-publishing").includes("MES Publishing"));
assert(!read("wiki/mes-publishing").includes("Earlier MES continuity"));
assert(!read("music").includes('data-play="{track.id}"'));
assert(!read("music").includes('href="#"'));
assert(read("contact").includes("youtube.com/@archetypal.architect.whispers"));
assert(read("merch").includes("etsy.com/shop/MESPublishing"));
assert(!read("contact").includes('href="https://gumroad.com"'));
console.log(
  `Checked ${files.length} pages: internal routes/assets resolve; book, shop, social, legacy and playback markup assertions pass.`,
);
