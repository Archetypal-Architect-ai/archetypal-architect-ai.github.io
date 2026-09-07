const platforms = new Set([
  "amazon.com",
  "gumroad.com",
  "youtube.com",
  "suno.com",
  "substack.com",
  "royalroad.com",
  "webnovel.com",
]);
export function isUsableDestination(value: string) {
  if (!value || value === "#") return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  if (value.startsWith("mailto:")) return true;
  try {
    const u = new URL(value);
    return (
      u.protocol === "https:" &&
      !(platforms.has(u.hostname.replace(/^www\./, "")) && u.pathname === "/")
    );
  } catch {
    return false;
  }
}
