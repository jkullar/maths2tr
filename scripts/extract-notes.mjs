/**
 * One-time script: extract notes.json → individual .md files in content/maths2/notes/
 * Run: node scripts/extract-notes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const notesJson = JSON.parse(
  fs.readFileSync(path.join(root, "artifacts/transcript-viewer/src/data/maths2/notes.json"), "utf8")
);
const outDir = path.join(root, "content/maths2/notes");
fs.mkdirSync(outDir, { recursive: true });

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

for (const note of notesJson) {
  const filename = `${String(note.number).padStart(2, "0")}-${slugify(note.title)}.md`;
  const frontmatter = [
    "---",
    `id: "${note.id}"`,
    `number: ${note.number}`,
    `title: "${note.title.replace(/"/g, '\\"')}"`,
    `section: "${note.section.replace(/"/g, '\\"')}"`,
    "---",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(outDir, filename), frontmatter + note.content, "utf8");
  console.log(`✓ ${filename}`);
}

console.log(`\nExtracted ${notesJson.length} notes to ${outDir}`);
