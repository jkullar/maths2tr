import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, resolve } from "path";

const NOTES_DIR = resolve("notes");
const OUT = resolve("artifacts/transcript-viewer/src/data/notes.json");

const SECTIONS = [
  { label: "Refresher Week", ids: [0] },
  { label: "Weeks 1–4 · Linear Algebra Foundations", ids: [1, 2, 3, 4, 5, 6, 7] },
  { label: "Weeks 5–8 · Linear Algebra Advanced", ids: [8, 9, 10, 11, 12] },
  { label: "Weeks 9–11 · Multivariable Calculus", ids: [13, 14, 15, 16] },
  { label: "Special Week", ids: [17] },
];

const files = readdirSync(NOTES_DIR)
  .filter((f) => /^\d+\s-\s/.test(f) && f.endsWith(".md"))
  .sort((a, b) => {
    const na = parseInt(a.split(" ")[0], 10);
    const nb = parseInt(b.split(" ")[0], 10);
    return na - nb;
  });

const notes = files.map((filename) => {
  const num = parseInt(filename.split(" ")[0], 10);
  const title = filename.replace(/^\d+\s-\s/, "").replace(/\.md$/, "");
  const content = readFileSync(join(NOTES_DIR, filename), "utf-8");

  const section = SECTIONS.find((s) => s.ids.includes(num))?.label ?? "Other";

  return { id: String(num), number: num, title, section, content };
});

writeFileSync(OUT, JSON.stringify(notes, null, 2));
console.log(`Bundled ${notes.length} notes → ${OUT}`);
notes.forEach((n) => console.log(`  ${n.number}. ${n.title}`));
