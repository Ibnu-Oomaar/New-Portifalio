#!/usr/bin/env node
/**
 * Lists everything that still needs real information before the portfolio is published:
 *   - placeholder entries in src/content (flagged `placeholder: true`)
 *   - missing environment values (email, GitHub, LinkedIn)
 *   - the missing CV file
 *
 * Usage: npm run content:check
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const contentDir = join(root, "src/content");
let open = 0;

console.log("\nPortfolio content check\n");

// 1. Placeholder entries
for (const file of readdirSync(contentDir).filter((name) => name.endsWith(".ts"))) {
  // Strip comments first so documentation that mentions `placeholder: true` is not counted.
  const text = readFileSync(join(contentDir, file), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
  const count = (text.match(/^\s*placeholder:\s*true,?\s*$/gm) ?? []).length;
  if (count > 0) {
    open += count;
    console.log(`  [ ] src/content/${file}: ${count} placeholder ${count === 1 ? "entry" : "entries"} to replace`);
  }
}

// 2. Environment values
function readEnv() {
  const values = {};
  for (const name of [".env.local", ".env"]) {
    const path = join(root, name);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (match && values[match[1]] === undefined) values[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
  return values;
}
const env = readEnv();
for (const key of ["NEXT_PUBLIC_CONTACT_EMAIL", "NEXT_PUBLIC_GITHUB_URL", "NEXT_PUBLIC_LINKEDIN_URL"]) {
  const value = process.env[key] ?? env[key] ?? "";
  if (!value) {
    open += 1;
    console.log(`  [ ] ${key} is empty (set it in .env.local)`);
  }
}
if (!(process.env.NEXT_PUBLIC_SITE_URL ?? env.NEXT_PUBLIC_SITE_URL)) {
  open += 1;
  console.log("  [ ] NEXT_PUBLIC_SITE_URL is empty (set your production URL for metadata and the sitemap)");
}

// 3. CV file
if (!existsSync(join(root, "public/cv/abdirizak-moktar-cv.pdf"))) {
  open += 1;
  console.log("  [ ] public/cv/abdirizak-moktar-cv.pdf is missing (add your CV, then rebuild)");
}

console.log(open === 0 ? "  Everything is filled in. Ready to publish.\n" : `\n  ${open} item${open === 1 ? "" : "s"} still to complete.\n`);
process.exit(0);
