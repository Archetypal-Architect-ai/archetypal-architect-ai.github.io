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
assert(read("merch").includes("etsy.com/shop/archetypalarchitect"));
assert(read("merch").includes("etsy.com/listing/4586779156"));
assert(!read("").includes("kit.com/\""), "Homepage signup goes to /free");
assert(read("free").includes("kit.com/rowans-table"));
assert(read("free").includes('rel="canonical" href="https://archetypalarchitect.online/free/"'));
assert(read("free").includes('og:image" content="https://archetypalarchitect.online/images/books/the-gentle-shadow.jpg"'));
// Brand wall: no public page links into, or names, the age-restricted wing.
const publicLeaks = [];
for (const file of files) {
  if (file.startsWith("adult")) continue;
  const html = fs.readFileSync(path.join(root, file), "utf8");
  if (/href="\/adult|Dirty-minded|Adult archive|JRRFuckKin|smashwords\.com\/profile\/view\/(?!MES_Publishing)/i.test(html))
    publicLeaks.push(file);
}
assert.deepEqual(publicLeaks, [], "Public pages must not link to or name adult work");
for (const file of files.filter((f) => f.startsWith("adult"))) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  assert(html.includes('name="robots" content="noindex,nofollow"'), `${file} must be noindex`);
}
assert(fs.readFileSync(path.join(root, "robots.txt"), "utf8").includes("Disallow: /adult/"));
assert(!fs.readFileSync(path.join(root, "sitemap.xml"), "utf8").includes("/adult"));
assert(!files.some((f) => !f.startsWith("adult") && fs.readFileSync(path.join(root, f), "utf8").includes("app.notion.com")));
assert(!files.some((f) => /deja[ -]?vu/i.test(fs.readFileSync(path.join(root, f), "utf8"))), "Deja Vu is retired");
assert(read("music").includes("gumroad.com/l/more-dice-more-loot"));
assert(read("novels").includes("The Thousandfold Gate"));
for (const p of ["books/the-thousandfold-gate", "books/fall-from-space"]) {
  const other = p.endsWith("gate") ? "fall-from-space" : "the-thousandfold-gate";
  assert(!read(p).includes(`/books/${other}`), "Thousandfold Gate and MES never cross-link");
}
assert(!/dragonsloft|hades/i.test(read("books/the-thousandfold-gate")));
assert(!read("contact").includes('href="https://gumroad.com"'));
console.log(
  `Checked ${files.length} pages: internal routes/assets resolve; book, shop, social, legacy and playback markup assertions pass.`,
);
