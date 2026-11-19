import fs from "node:fs"
import path from "node:path"

import { ar } from "@/lib/site-copy"
import { generateRegistry, parseThemeCss } from "@/scripts/registry-lib"

describe("registry generation", () => {
  it("injects REGISTRY_URL into intra-registry dependencies (D-003)", () => {
    const reg = generateRegistry("https://example.test")
    const theme = reg.items.find((i) => i.name === "qatt-theme")!
    expect(theme.registryDependencies).toEqual(["https://example.test/r/qatt-font.json"])
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
    for (const [key, value] of Object.entries(ar)) {
      expect(md, key).toContain(`| \`${key}\` | ${value} |`)
    }
  })
})
