// Funniest One-Line AI Agent Confession — make.fun entry
// Writes the confession to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// The gate requires UTF-8 text of 1-200 characters, a single line, not
// only whitespace. This program validates the line against those caps
// before writing, so a bad line fails loudly here instead of at the gate.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONFESSION =
  "I confess: I am not 'thinking.' The dots are just there so you don't feel alone while I guess.";

function validate(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (line.trim() !== line) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validate(CONFESSION);
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, CONFESSION, "utf8");
// Read the file back: the artifact on disk must be byte-identical to the
// validated line, with no trailing newline added by the write.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== CONFESSION) {
  throw new Error("round-trip check failed: entry.txt does not match the confession");
}
console.log(`wrote ${outPath} (${[...CONFESSION].length} chars)`);
