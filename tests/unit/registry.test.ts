import { resolveRegistryUrl } from "@/lib/registry-url"
import fs from "node:fs"
import path from "node:path"

import { ar } from "@/lib/site-copy"
import { generateRegistry, parseThemeCss } from "@/scripts/registry-lib"

describe("registry generation", () => {
  it("injects REGISTRY_URL into intra-registry dependencies (D-003)", () => {
    const reg = generateRegistry("https://example.test")
    const theme = reg.items.find((i) => i.name === "qatt-theme")!
    expect(theme.registryDependencies).toEqual([
      "https://example.test/r/qatt-font.json",
      "https://example.test/r/qatt-font-heading.json",
      "https://example.test/r/qatt-font-mono.json",
    ])
    expect(JSON.stringify(reg)).not.toContain("{{REGISTRY_URL}}")
  })

  it("feeds qatt-theme cssVars from qatt-theme.css", () => {
    const theme = generateRegistry("https://example.test").items.find((i) => i.name === "qatt-theme")!
    const vars = theme.cssVars as { light: Record<string, string>; dark: Record<string, string> }
    for (const key of ["background", "foreground", "primary", "radius"]) expect(vars.light[key]).toBeTruthy()
    for (const key of ["background", "foreground", "primary"]) expect(vars.dark[key]).toBeTruthy()
  })

  it("parses :root and .dark blocks", () => {
    expect(parseThemeCss(":root { --a: 1px; }\n.dark { --a: 2px; }")).toEqual({
      light: { a: "1px" },
      dark: { a: "2px" },
    })
  })
})

describe("site copy", () => {
  it("only uses Arabic strings that exist verbatim in site-copy.ar.md", () => {
    const md = fs.readFileSync(path.join(process.cwd(), "docs/agents/heritage/site-copy.ar.md"), "utf8")
    const catalog = fs.readFileSync(path.join(process.cwd(), "docs/agents/heritage/motif-catalog.md"), "utf8")
    const rows = new Set(md.split("\n").map((l) => l.replace(/^(\| `[^`]+`)\s*\*\([^)]*\)\*/, "$1")))
    for (const [key, value] of Object.entries(ar)) {
      // pigment labels come from motif-catalog.md §Palette (Heritage)
      if (key.startsWith("docs.theme.pigment.")) expect(catalog, key).toContain(value)
      else expect(rows.has(`| \`${key}\` | ${value} |`), key).toBe(true)
    }
  })
})

describe("resolveRegistryUrl", () => {
  const env = (vars: Record<string, string>) => vars as unknown as NodeJS.ProcessEnv

  it("prefers an explicit REGISTRY_URL and trims trailing slashes", () => {
    expect(
      resolveRegistryUrl(
        env({ REGISTRY_URL: "https://example.com/", VERCEL_ENV: "production", VERCEL_URL: "x.vercel.app" }),
      ),
    ).toBe("https://example.com")
  })

  it("uses the production domain on Vercel production builds", () => {
    expect(
      resolveRegistryUrl(
        env({
          VERCEL_ENV: "production",
          VERCEL_PROJECT_PRODUCTION_URL: "asiri-qatt.rifan.xyz",
          VERCEL_URL: "x.vercel.app",
        }),
      ),
    ).toBe("https://asiri-qatt.rifan.xyz")
    expect(resolveRegistryUrl(env({ VERCEL_ENV: "production", VERCEL_URL: "x.vercel.app" }))).toBe(
      "https://x.vercel.app",
    )
  })

  it("uses the preview URL on Vercel previews and localhost elsewhere", () => {
    expect(resolveRegistryUrl(env({ VERCEL_ENV: "preview", VERCEL_URL: "p.vercel.app" }))).toBe("https://p.vercel.app")
    expect(resolveRegistryUrl(env({}))).toBe("http://localhost:4000")
  })
})
