import type { Project } from "../content/projects";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[_\s]+/g, "-");
}

function resolveEntry(target: string, entries: Project[]) {
  const key = normalize(target);
  return entries.find((entry) => entry.id === key || normalize(entry.title) === key);
}

export function renderWikiText(text: string, entries: Project[]) {
  const pattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  let output = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    output += escapeHtml(text.slice(lastIndex, match.index));

    const target = match[1].trim();
    const label = (match[2] || target).trim();
    const entry = resolveEntry(target, entries);

    if (entry && entry.visibility !== "Adult" && entry.maturity !== "Adult") {
      output += `<a class="wiki-link" href="/wiki/${entry.id}" title="${escapeHtml(`Open ${entry.title}`)}">${escapeHtml(label)}</a>`;
    } else {
      // Unknown targets and age-restricted entries render as plain text: the
      // public wiki never links into the adult archive.
      output += `<span class="wiki-link missing-wiki-link">${escapeHtml(label)}</span>`;
    }

    lastIndex = pattern.lastIndex;
  }

  output += escapeHtml(text.slice(lastIndex));
  return output;
}
