import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const roots = ["app", "components", "content", "lib", "public"].map((dir) => join(root, dir));
const skip = new Set(["node_modules", ".next", ".git", "scripts"]);
const patterns = [
  { name: "employer token cvs", re: /cvs/i },
  { name: "woonsocket", re: /woonsocket/i },
  { name: "emerj podcast host", re: /podcast\.emerj\.com/i },
  { name: "free diagnostic", re: /free diagnostic/i },
  { name: "HR data fields", re: /hr data fields/i },
  { name: "columns from your HR", re: /columns from your hr/i },
  { name: "7 standard columns", re: /7 standard columns/i },
  { name: "seven standard HR", re: /seven standard hr/i },
  { name: "free 7-day", re: /free 7-day/i },
  { name: "get your free", re: /get your free/i },
  { name: "book your free", re: /book your free/i },
  { name: "first numbers, free", re: /first numbers, free/i },
  { name: "guarantee", re: /guarantee/i },
];

const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      walk(path);
      continue;
    }
    if (!/\.(tsx?|jsx?|json|txt|css)$/.test(name)) continue;
    const text = readFileSync(path, "utf8");
    for (const pattern of patterns) {
      if (pattern.re.test(text)) hits.push(`${pattern.name}: ${path}`);
    }
  }
}

for (const dir of roots) walk(dir);
if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log("Language check passed.");
