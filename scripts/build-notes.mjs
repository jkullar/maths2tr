/**
 * Build script: content/maths2/notes/*.md → artifacts/transcript-viewer/src/data/maths2/notes.json
 * Run: node scripts/build-notes.mjs
 * Or:  pnpm build:content
 *
 * Each .md file must have YAML frontmatter with: id, number, title, section
 * Everything after the closing --- is the note content (markdown).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const notesDir = path.join(root, "content/maths2/notes");
const outPath = path.join(root, "artifacts/transcript-viewer/src/data/maths2/notes.json");

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("No frontmatter found");
  const frontmatter = match[1];
  const content = match[2];

  const meta = {};
  for (const line of frontmatter.split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    // Convert numbers
    if (/^\d+$/.test(value)) value = parseInt(value, 10);
    meta[key] = value;
  }
  return { meta, content };
}

const files = fs.readdirSync(notesDir)
  .filter((f) => f.endsWith(".md"))
  .sort();

const notes = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(notesDir, file), "utf8");
  try {
    const { meta, content } = parseFrontmatter(raw);
    notes.push({
      id: String(meta.id),
      number: meta.number,
      title: meta.title,
      section: meta.section,
      content,
    });
    console.log(`✓ ${file}`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
    process.exit(1);
  }
}

// Sort by number to guarantee correct order
notes.sort((a, b) => a.number - b.number);

fs.writeFileSync(outPath, JSON.stringify(notes, null, 2), "utf8");
console.log(`\nBuilt ${notes.length} notes → ${outPath}`);
