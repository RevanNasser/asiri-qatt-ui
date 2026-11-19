/**
 * registry.json (committed template) -> .registry/registry.json (build input for `shadcn build`).
 * - replaces {{REGISTRY_URL}} with REGISTRY_URL (decision D-003: absolute cross-item deps)
 * - injects qatt-theme cssVars from registry/qatt/theme/qatt-theme.css (single token source)
 */
import fs from "node:fs"
import path from "node:path"

import { generateRegistry, OUT_DIR, resolveRegistryUrl } from "./registry-lib"

const url = resolveRegistryUrl()
const registry = generateRegistry(url)
fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(path.join(OUT_DIR, "registry.json"), JSON.stringify(registry, null, 2) + "\n")
console.log(`registry-gen: ${registry.items.length} items, REGISTRY_URL=${url} -> .registry/registry.json`)
