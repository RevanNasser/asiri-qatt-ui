import fs from "node:fs"
import path from "node:path"

import { resolveRegistryUrl } from "../lib/registry-url"

export { resolveRegistryUrl }

export const ROOT = path.resolve(import.meta.dirname, "..")
export const URL_PLACEHOLDER = "{{REGISTRY_URL}}"
export const THEME_CSS = path.join(ROOT, "registry/qatt/theme/qatt-theme.css")
export const OUT_DIR = path.join(ROOT, ".registry")

/** Parse `--name: value;` declarations from the `:root { }` and `.dark { }` blocks. */
export function parseThemeCss(css: string): { light: Record<string, string>; dark: Record<string, string> } {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "")
  const block = (selector: string) => {
    const re = new RegExp(`(^|\\n)\\s*${selector.replace(".", "\\.")}\\s*\\{([^}]*)\\}`)
    const body = stripped.match(re)?.[2]
    if (!body) throw new Error(`qatt-theme.css: missing "${selector}" block`)
    const vars: Record<string, string> = {}
    for (const m of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) vars[m[1]!] = m[2]!.trim()
    return vars
  }
  return { light: block(":root"), dark: block(".dark") }
}

type Item = { name: string; type: string; cssVars?: Record<string, unknown>; [k: string]: unknown }
export type Registry = { name: string; homepage: string; items: Item[]; [k: string]: unknown }

export function generateRegistry(registryUrl = resolveRegistryUrl()): Registry {
  const template = fs.readFileSync(path.join(ROOT, "registry.json"), "utf8")
  const registry = JSON.parse(template.split(URL_PLACEHOLDER).join(registryUrl)) as Registry
  const theme = registry.items.find((i) => i.name === "qatt-theme")
  if (!theme) throw new Error("registry.json: qatt-theme item missing")
  theme.cssVars = { ...theme.cssVars, ...parseThemeCss(fs.readFileSync(THEME_CSS, "utf8")) }
  return registry
}
