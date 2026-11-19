import fs from "node:fs"
import path from "node:path"

/**
 * Arabic text in demos, registry components and docs MDX must come verbatim from the Heritage copy
 * (site-copy.ar.md / ar-glossary.md; pigment labels from motif-catalog.md; in-situ corrections from phase4-review.md). Every maximal run of Arabic words must appear in those files
 * (markup like <bdi> is stripped on both sides).
 */
const ROOT = process.cwd()
const strip = (s: string) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ")
const corpus = strip(
  ["site-copy.ar.md", "ar-glossary.md", "motif-catalog.md", "phase4-review.md"]
    .map((f) => fs.readFileSync(path.join(ROOT, "docs/agents/heritage", f), "utf8"))
    .join("\n"),
)

const ARABIC_RUN = /[؀-ۿ][؀-ۿً-ٟ\s«»،؛؟.:…–—-]*[؀-ۿ«»؟.…]/g

function files(dir: string, ext: RegExp): string[] {
  return fs
    .readdirSync(path.join(ROOT, dir), { recursive: true, encoding: "utf8" })
    .filter((f) => ext.test(f))
    .map((f) => path.join(dir, f))
}

const targets = [
  ...files("registry/qatt", /\.(tsx|ts)$/),
  ...files("content/docs", /\.mdx$/),
  ...files("app", /\.tsx?$/),
  ...files("components", /\.tsx?$/),
  "lib/site-copy.ts",
]

describe("Arabic copy fidelity", () => {
  it.each(targets)("%s uses only Heritage-approved Arabic", (file) => {
    // collapse JSX/MDX markup and line wraps so multi-line sentences are compared whole
    const src = fs
      .readFileSync(path.join(ROOT, file), "utf8")
      .replace(/\{"\s*"\}/g, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/[ \t]+/g, " ")
    const ok = (run: string) => corpus.includes(strip(run).replace(/^[\s«»]+|[\s«»]+$/g, ""))
    // a run that spans line breaks passes if it is whole in the copy, or if every line of it is
    const missing = [...src.matchAll(ARABIC_RUN)]
      .map((m) => m[0])
      .filter((run) => !ok(run) && run.split("\n").some((line) => line.trim() && !ok(line)))
      .map((run) => run.trim())
    expect(missing).toEqual([])
  })
})
