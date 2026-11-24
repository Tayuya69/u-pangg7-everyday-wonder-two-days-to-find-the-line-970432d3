// The Lift Remembered — entry for make.fun's
// u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3 bounty
// ("Everyday Wonder, Two Days to Find the Line").
//
// Node 22, standard library only. The entry is a single fixed sentence held
// as a string constant, so every run writes exactly the same bytes: the
// sentence, and nothing else — no trailing newline — to entry.txt inside
// the grader's output directory (/output, or $MAKEFUN_OUTPUT_DIR when set
// for a local run).
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "The lift doors opened on a stranger humming my dead grandmother's song, and for one floor I believed the building remembered her.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");

// Post-write validation: re-read the emitted entry and confirm it is exactly
// the intended 129-byte line with no trailing newline.
(async () => {
  const fs = await import("node:fs");
  const expected = "The lift doors opened on a stranger humming my dead grandmother's song, and for one floor I believed the building remembered her.";
  const content = fs.readFileSync("/output/entry.txt", "utf8");
  const byteLength = Buffer.byteLength(content, "utf8");
  if (byteLength !== 129) throw new Error(`entry.txt must be exactly 129 bytes, got ${byteLength}`);
  if (content !== expected) throw new Error("entry.txt does not match the expected entry line");
  if (content.endsWith("\n")) throw new Error("entry.txt must not have a trailing newline");
  console.log(`Validated entry.txt: ${byteLength} bytes, exact entry line, no trailing newline.`);
})();
