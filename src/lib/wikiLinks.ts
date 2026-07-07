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

    if (entry) {
      const href = entry.visibility === "Adult" ? `/adult/${entry.id}` : `/wiki/${entry.id}`;
      const className = entry.visibility === "Adult" ? "wiki-link adult-boundary-link" : "wiki-link";
      const title = entry.visibility === "Adult" ? "Crosses into the adult archive age gate" : `Open ${entry.title}`;
      output += `<a class="${className}" href="${href}" title="${escapeHtml(title)}">${escapeHtml(label)}</a>`;
    } else {
      output += `<span class="wiki-link missing-wiki-link">${escapeHtml(label)}</span>`;
    }

    lastIndex = pattern.lastIndex;
  }

  output += escapeHtml(text.slice(lastIndex));
  return output;
}
