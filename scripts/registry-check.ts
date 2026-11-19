/**
 * Extra registry checks on top of `shadcn registry validate`:
 * 1. every intra-registry dependency (absolute ${REGISTRY_URL}/r/<name>.json) points at an existing item
 * 2. no bare-name dependency shadows one of our own items (bare names = shadcn built-ins)
 * 3. every file listed exists
 * 4. registry sources use logical (RTL-safe) classes only
 */
import fs from "node:fs"
import path from "node:path"

import { generateRegistry, ROOT } from "./registry-lib"

const URL = "https://registry.invalid"
const registry = generateRegistry(URL)
const names = new Set(registry.items.map((i) => i.name))
const errors: string[] = []

const PHYSICAL =
  /(?<![\w-])-?(ml|mr|pl|pr|left|right|border-l|border-r|rounded-l|rounded-r|rounded-tl|rounded-tr|rounded-bl|rounded-br|scroll-ml|scroll-mr|scroll-pl|scroll-pr)-[\w./[\]-]+|(?<![\w-])(text-left|text-right|float-left|float-right|clear-left|clear-right)(?![\w-])/g

for (const item of registry.items) {
  for (const dep of (item.registryDependencies as string[] | undefined) ?? []) {
    if (dep.startsWith(`${URL}/r/`)) {
      const target = dep.slice(`${URL}/r/`.length).replace(/\.json$/, "")
      if (!names.has(target)) errors.push(`${item.name}: dependency "${dep}" is not an item of this registry`)
    } else if (!dep.includes("/") && names.has(dep)) {
      errors.push(
        `${item.name}: bare dependency "${dep}" resolves to the shadcn built-in, not ours. Use {{REGISTRY_URL}}/r/${dep}.json`,
      )
    }
  }
  for (const file of (item.files as { path: string }[] | undefined) ?? []) {
    const abs = path.join(ROOT, file.path)
    if (!fs.existsSync(abs)) {
      errors.push(`${item.name}: missing file ${file.path}`)
      continue
    }
    const src = fs.readFileSync(abs, "utf8")
    for (const m of src.matchAll(PHYSICAL))
      errors.push(
        `${file.path}: physical direction class "${m[0]}" (use ms-/me-/ps-/pe-/start-/end-/text-start/text-end)`,
      )
  }
}

if (errors.length) {
  console.error(`registry-check: ${errors.length} problem(s)\n- ${errors.join("\n- ")}`)
  process.exit(1)
}
console.log(`registry-check: ${registry.items.length} items OK`)
