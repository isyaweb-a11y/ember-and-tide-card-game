// Ember & Tide — hand-in program (Node 22, standard library only).
//
// The game lives in game/ as plain static files (game/index.html plus its
// styles and scripts, nothing fetched over the network), and its screenshots
// live in screenshots/. This program hands both in: it copies them into the
// output directory and writes dossier.json there, the summary the judge
// reads, using the make.fun library vendored at vendor/makefun-game.ts.
//
// Run it outside the grader with MAKEFUN_OUTPUT_DIR pointing at a scratch
// directory, e.g.:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-game.ts";

// Directory this file sits in: the repository root.
const repoRoot = fileURLToPath(new URL(".", import.meta.url));
// The grader sets /output; a local run overrides it with MAKEFUN_OUTPUT_DIR.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Fail loudly instead of handing in an empty game: the entry point must exist.
if (!existsSync(join(repoRoot, "game", "index.html"))) {
  throw new Error("game/index.html is missing — nothing to hand in");
}

// Copy the playable game first, then its screenshots beside it.
mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, "game"), join(outDir, "game"), { recursive: true });
mkdirSync(join(outDir, "screenshots"), { recursive: true });
if (existsSync(join(repoRoot, "screenshots"))) {
  cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), {
    recursive: true,
  });
}

// The caps mirror the sealed scorer's own limits, so a hand-in this program
// accepts is one the scorer accepts too: at most 4 screenshots and none over
// 256 KiB, at most 993 files totalling 48 MiB under game/, no game path over
// 1,000 bytes, and the dossier text capped at 160 KiB.
const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
writeFileSync(join(outDir, "dossier.json"), dossier);

console.log(
  `handed in Ember & Tide: game/ + screenshots/ + dossier.json (${dossier.length} bytes) -> ${outDir}`,
);
