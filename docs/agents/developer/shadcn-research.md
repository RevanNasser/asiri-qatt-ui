# shadcn Registry Research — Qatt UI (قَطّ)

Date: 2026-11-19 · Author: Developer Agent (وكيل التطوير)

Legend: **[CLI-verified]** = checked by running the CLI locally · **[docs]** = read from current docs (link given) · **[unverified]** = inference, must be confirmed by the install-flow test before we rely on it.

> Environment note: CLI help output was verified locally with `pnpm dlx shadcn@latest` (v4.23.0). A live `shadcn init` + `build` + `add` experiment was started but aborted because the machine's disk filled up (ENOSPC on the volume holding `/private/tmp`). All end-to-end behaviour marked [unverified] was confirmed in Phase 3. See §14 for the results.

## 1. Current versions (npm, 2026-11-19)

| Package | Version | Notes |
|---|---|---|
| `shadcn` (CLI) | 4.23.0 | [CLI-verified] `pnpm dlx shadcn@latest --version` |
| `next` | 16.4.6 | Next 16 is current major (16.4 released 2026-10-06; monthly security releases) — https://nextjs.org/blog |
| `tailwindcss` | 4.3.5 | Tailwind v4 is stable/current; shadcn theming is v4-first (OKLCH + `@theme inline`) |
| `fumadocs-core` / `fumadocs-ui` | 16.19.4 | Tailwind v4 only |
| `vitest` | 5.1.1 | |
| `@playwright/test` | 1.65.1 | |

Registry template (https://github.com/shadcn-ui/registry-template) still pins `next 15.5.9`, `shadcn ^3.0.0` and uses a separate `"registry:build": "shadcn build"` script — it lags behind; use it for structure only, not versions.

## 2. CLI commands & flags [CLI-verified, shadcn 4.23.0]

Top-level commands: `init|create`, `apply [preset]`, `add`, `diff` (DEPRECATED → `add <x> --diff`), `docs`, `view`, `search|list`, `migrate`, `eject`, `info`, `build`, `mcp`, `preset`, `registry`.

- `shadcn init|create [components...]`
  - `-t, --template <next|start|vite|react-router|laravel|astro>`
  - `-b, --base <base|radix|aria>` — component primitive library (Base UI is the default since July 2026 changelog)
  - `-p, --preset [name]`, `-d, --defaults` (= `--template=next --preset=base-nova`)
  - `--rtl` / `--no-rtl` — **RTL flag exists on init**
  - `--css-variables` (default true), `--pointer`, `--monorepo`, `-n, --name`, `-f, --force`, `-y` (default true), `--reinstall`
- `shadcn add [items...]` — `-y`, `-o, --overwrite`, `-a, --all`, `-p, --path`, `--dry-run`, `--diff [path]`, `--view [path]`, `-s`
- `shadcn build [registry]` — arg defaults to `./registry.json`; `-o, --output <path>` default `./public/r`; `-c, --cwd`. No other flags.
- `shadcn registry add [registries...]` — `@ns` (from index) or `@ns=url`
- `shadcn registry validate [registry]` — validates `./registry.json` (default), paths or GitHub sources. **Use in CI.**
- `shadcn search|list [registries...]` — `-q`, `-t, --type ui,block,hook`, `-l`, `-o`, `--json`
- `shadcn view <items...>`
- `shadcn migrate [migration] [path]` — migrations: `cn`, `icons`, `base-color`, `radix`, `rtl`
- `shadcn mcp init --client claude` (docs) — MCP server works with any spec-compliant registry configured in `components.json`.

## 3. `registry.json` schema [docs]
https://ui.shadcn.com/docs/registry/registry-json

Top-level keys: `$schema` (`https://ui.shadcn.com/schema/registry.json`), `name`, `homepage`, `include`, `items`.
- Root must define at least one of `items` / `include`. `name` + `homepage` required only on root.
- `include`: relative paths to explicit `registry.json` files (no folder shorthand). Build **flattens** includes; output `registry.json` has no `include`.
- Item names must be unique across the resolved registry.

## 4. `registry-item.json` schema [docs]
https://ui.shadcn.com/docs/registry/registry-item-json

Fields: `$schema` (`https://ui.shadcn.com/schema/registry-item.json`), `name`, `title`, `description`, `type`, `author`, `dependencies`, `devDependencies`, `registryDependencies`, `files[]` (`path`, `type`, `target?`), `tailwind` (**DEPRECATED** — use `cssVars.theme` on v4), `cssVars` (`theme` / `light` / `dark`), `css` (`@layer base|components`, `@utility`, `@keyframes`, `@plugin`), `envVars`, `font`, `docs`, `categories`, `meta`. Styles/bases additionally use `extends` (`"none"` = don't build on shadcn defaults) and bases a `config` object (examples page).

`type` values: `registry:base`, `registry:block`, `registry:component`, `registry:font`, `registry:lib`, `registry:hook`, `registry:ui`, `registry:page`, `registry:file`, `registry:style`, `registry:theme`, `registry:item`.

`registryDependencies` accepted forms:
1. Bare name `"button"` → **always the built-in shadcn item**, never "our" item.
2. Namespaced `"@acme/input-form"`.
3. GitHub `"owner/repo/item#ref"` (pin a tag/SHA; refs not inherited).
4. Full URL `"https://example.com/r/editor.json"`.
5. Local file path `"./editor.json"`.

`files[].target`: **required** for `registry:page` and `registry:file`; optional otherwise. Placeholders `@ui/`, `@components/`, `@lib/`, `@hooks/`; `~` = project root.

`font` (required for `registry:font`): `family`*, `provider`* (only `google` today), `import`*, `variable`*, `weight`, `subsets`, `selector` (default `html`), `dependency`. Example:
```json
{ "name": "font-inter", "type": "registry:font",
  "font": { "family": "'Inter Variable', sans-serif", "provider": "google", "import": "Inter",
            "variable": "--font-sans", "subsets": ["latin"], "dependency": "@fontsource-variable/inter" } }
```
The variable is injected on `<html>`; with `selector`, the font class is `@apply`-ed on that selector in `@layer base`.

`cssVars` gotchas:
- `light`/`dark` = per-mode tokens; `theme` = Tailwind `@theme` tokens (fonts, spacing, breakpoints, `--animate-*`).
- `@keyframes` in `css` needs a matching `--animate-*` in `cssVars.theme`.
- `@plugin` npm packages must also go in `dependencies`.
- Deep-merge across the dependency graph: files deduped by target (last wins); `cssVars`/`css`/`envVars` deep-merged.

## 5. Build & serve [docs + CLI-verified flags]
https://ui.shadcn.com/docs/registry/getting-started
- `shadcn build` → `public/r/<name>.json` + `public/r/registry.json`. Serve statically (Next `public/`), items at `/r/<name>.json`.
- Alternative: dynamic route handlers via `loadRegistry` / `loadRegistryItem` from `shadcn/registry` (`pnpm add shadcn`). Not needed for us.
- Guidelines: items under `registry/[STYLE]/[NAME]`; **imports inside registry source must use the `@/registry/...` path** (CLI rewrites them to the consumer aliases); list all `registryDependencies` and npm `dependencies`; prefer `components`/`hooks`/`lib` subfolders.
- Test locally: `shadcn list|search|view|add http://localhost:3000/r/...json`, or `shadcn registry add @acme=http://localhost:3000/r/{name}.json` then `add @acme/x`.

## 6. Namespaces [docs]
https://ui.shadcn.com/docs/registry/namespace
```json
{ "registries": { "@qatt": "https://qatt.dev/r/{name}.json" } }
```
- `{name}` required; `{style}` optional (replaced with consumer's `style`, e.g. `base-nova`) — useful if we ever ship per-base variants.
- Object form `{ url, headers, params }` for auth with `${ENV}` expansion — **not needed** (public, no auth).
- Unconfigured namespace on `add` → error `Unknown registry "@x". Make sure it is defined in components.json…` — **unless the namespace is in the official registry index**, in which case the CLI auto-adds it to `components.json` on `add`/`search` (https://ui.shadcn.com/docs/registry/registry-index).
- Dependencies resolve recursively across registries, each with its own auth context.

### Official index submission
https://ui.shadcn.com/docs/registry/registry-index — edit `apps/v4/registry/directory.json` in shadcn-ui/ui, run `pnpm validate:registries`, open PR. Requirements: open source + public; valid schema; **flat** (`/registry.json` and `/<item>.json` at the root — so our `{name}` URL must be `https://<host>/r/{name}.json`, no nested style folders); `files[]` in the published `registry.json` must **not** contain `content` (`shadcn build` output for the catalog omits it — confirm).

## 7. Cross-item dependencies inside our own registry — decision

| Form | Direct-URL install (`add https://…/r/x.json`) | Namespace install (`add @qatt/x`) | Pre-deploy local testing |
|---|---|---|---|
| `"@qatt/qatt-theme"` | Works only if consumer configured `@qatt` **or** `@qatt` is in the official index [unverified for transitive deps] | Works | Needs `registry add @qatt=http://localhost:PORT/r/{name}.json` first |
| `"https://qatt.dev/r/qatt-theme.json"` | Works | Works | **Breaks** (points at prod) unless URL is templated |
| `"./qatt-theme.json"` | Documented as "local file path"; resolution relative to a *remote* parent URL is not documented [unverified] | same | same |
| `"qatt-theme"` (bare) | **Wrong** — resolves to shadcn built-ins | Wrong | — |

**Recommendation:** generate absolute URLs at build time from a single `REGISTRY_URL` env (`https://qatt.dev` in prod, `http://localhost:4000` in tests). This is the only form verified by docs to work for both install modes regardless of consumer config. Once `@qatt` is merged into the official index, we may switch to `@qatt/x` (cleaner, host-independent) after the install-flow test proves transitive resolution.

## 8. Overriding shadcn components (restyled `button`, etc.)
- Docs "Overriding and adding to built-in components" (examples page): a style/block overrides primitives by listing **our** item URL in `registryDependencies` (e.g. `"https://example.com/r/button.json"`). Dedup is by target path, last wins → our `components/ui/button.tsx` replaces shadcn's.
- So: ship `registry:ui` items with file `registry/qatt/ui/button.tsx` (installs to `@ui/button.tsx`), same exports/props as upstream for the consumer's chosen **base** (Base UI `render` prop vs Radix `asChild` — APIs differ!), plus added CVA variants.
- If the file already exists the CLI prompts; scripts must pass `--overwrite` [CLI flag verified; prompt behaviour unverified].

## 9. RTL [docs]
https://ui.shadcn.com/docs/rtl, https://ui.shadcn.com/docs/rtl/next
- `components.json`: `"rtl": true`. Create: `pnpm dlx shadcn@latest create --template next --rtl` (init also has `--rtl`).
- With `rtl: true`, the CLI **transforms classes on `add`**: `left/right-*` → `start/end-*`, directional props, text-align/spacing, `rtl:rotate-180` on supported icons, `slide-in-from-right` → `slide-in-from-end`. **Only for the new styles (`base-nova`, `radix-nova`, …)**; others need `shadcn migrate rtl [path|glob]`.
- Implication: our registry source should already use logical classes (`ms-/me-/ps-/pe-/start-/end-/text-start`) so output is identical with or without the transform; never rely on it.
- `pnpm dlx shadcn@latest add direction` → `@/components/ui/direction`; in layout: `<html lang="ar" dir="rtl">` + `<DirectionProvider direction="rtl">`.
- Manual RTL handling: Calendar, Pagination, Sidebar. Portals (Popover/Tooltip content) need `dir="rtl"` passed explicitly (tw-animate-css issue).
- Fonts: docs recommend Noto (e.g. `Noto_Sans_Arabic` via `next/font/google`, `subsets: ["arabic"]`, `variable: "--font-sans"`).

## 10. Theming (Tailwind v4) [docs]
https://ui.shadcn.com/docs/theming — tokens: `background/foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent` (+ `-foreground`), `destructive`, `border`, `input`, `ring`, `chart-1..5`, `sidebar`, `sidebar-{foreground,primary,primary-foreground,accent,accent-foreground,border,ring}`, `radius`. Values in `oklch()`. `@theme inline { --color-background: var(--background); … --radius-sm: calc(var(--radius) * 0.6); }`, dark via `.dark` + `@custom-variant dark (&:is(.dark *));`.

## 11. Open in v0 [docs]
https://ui.shadcn.com/docs/registry/open-in-v0 — `https://v0.dev/chat/api/open?url=<item-json-url>`; registry must be public. **Does not support `cssVars`, `css`, `envVars`, namespaced registries.** → Our theme-dependent items will open in v0 without Qatt tokens; acceptable as a "nice to have", or ship self-contained demo items.

## 12. MCP [docs]
https://ui.shadcn.com/docs/mcp — `pnpm dlx shadcn@latest mcp init --client claude`; works for any spec-compliant registry configured under `registries`. Mention in our docs as an install path; no extra work required.

## 13. Docs framework evaluation (RTL)
- **Fumadocs 16.19** (https://fumadocs.dev/docs/ui/theme): RTL officially supported — "set the `dir` prop to `rtl` in body and root provider" (`<body dir="rtl">`, `<RootProvider dir="rtl">` from `fumadocs-ui/provider/next`). i18n via `defineI18n({ defaultLanguage, languages, hideLocale })` with `hideLocale: 'default-locale'` → default language served without prefix (Arabic at `/`, English at `/en`), middleware `createI18nMiddleware` (in `proxy.ts` on Next 16). Has a **shadcn CSS preset** (`@import 'fumadocs-ui/css/shadcn.css'`) so docs chrome adopts our tokens. Tailwind v4 only (fine). Per-locale `dir` must be set by us in `app/[lang]/layout.tsx`.
- **Plain MDX (`@next/mdx` / content-collections)**: full control, zero RTL fights, but we'd build sidebar, search, TOC, code tabs, i18n routing ourselves.
- **Verdict:** Fumadocs (risk: some internal components may still use physical CSS — verify with a Playwright RTL screenshot pass in the first spike).

## 14. Verification backlog — RESOLVED 2026-11-19 (Phase 3, shadcn 4.23.0) [CLI-verified]

All six items were run in a scratch dir (fixtures deleted afterwards), then re-proven by `scripts/install-flow.ts`.

1. **`shadcn create -t next -d --rtl --no-monorepo -n app -y`** → Next 16.4.5, React 19.3.1, pnpm, git-initialised. `components.json`: `style: "base-nova"`, `rtl: true`, `iconLibrary: "lucide"`, `tailwind.config: ""`, `css: "app/globals.css"`, `baseColor: "neutral"`, aliases `@/components`, `@/components/ui`, `@/lib`, `@/hooks`, `@/lib/utils`, plus new keys `menuColor`, `menuAccent`, `registries: {}`. Installs `components/ui/button.tsx` + `lib/utils.ts`, where `lib/utils.ts` is now `export { cn } from "cn"` (npm package `cn`, not clsx + tailwind-merge). `globals.css` imports `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`, then `@theme inline` + `:root` / `.dark` OKLCH vars. The generated `layout.tsx` is **not** RTL (`lang="en"`, no `dir`); the RTL docs page must still be followed. A fresh app costs ~0.6–1 GB of node_modules.
2. **`shadcn build`** → `public/r/<name>.json` per item (files get inlined `content`) + `public/r/registry.json`. The catalog is a **verbatim copy of the input** (so it has no `content`, as long as the input has none). `cssVars` / `font` are copied as-is. `shadcn build <path>` accepts a registry file outside the root; `files[].path` resolves relative to **cwd**, not the registry file.
3. **Transitive `@qatt/x` via direct-URL install without a configured namespace → FAILS**: `Unknown registry "@qatt". Make sure it is defined under "registries" in your components.json`. With `@qatt` configured, transitive `@qatt/x` works. **D-003 confirmed.**
4. **Relative `./x.json` dependency from a remote item → FAILS**: `Failed to read local registry file: ./qatt-font.json` (resolved against the consumer's disk).
5. **Overwrite:** without `--overwrite`, `add -y` still prompts `The file button.tsx already exists. Would you like to overwrite? (y/N)`, and with stdin closed it keeps the old file. `add -y --overwrite` replaces it non-interactively.
6. **Font item in Next:** the CLI rewrites `app/layout.tsx` to `import { IBM_Plex_Sans_Arabic } from "next/font/google"` with `subsets`, `weight` and `variable: '--font-sans'` taken from `font`, and swaps the variable class on `<html>`. The `font.dependency` (fontsource) is **not** installed for Next. `import: "IBM_Plex_Sans_Arabic"` (underscore form) is correct. The replaced `Geist` import stays in the file (unused).

Extra findings:
- `cssVars.theme` entries go into **`@theme inline`**, so `radius` placed there lands in the wrong block. Put `radius` in `cssVars.light` (→ `:root`).
- Custom colours in `light`/`dark` (e.g. `qatt-red`) are added to `:root` / `.dark` **and** get `--color-qatt-red: var(--qatt-red)` in `@theme inline`, so `bg-qatt-red` works. Verified.
- Imports `@/registry/qatt/hooks/x` are rewritten to the consumer alias `@/hooks/x`. `@/components/ui/direction` and `@/lib/utils` are kept.
- `shadcn registry validate` accepts a template containing `{{REGISTRY_URL}}` placeholders (strings are not URL-validated).
- Fumadocs 16.19: `fumadocs-ui` is now installed as `npm:@fumadocs/base-ui@16.19.4` (a Base UI build, which matches D-002). `fumadocs-mdx@15` uses `defineDocs` from `fumadocs-mdx/macro` (no `source.config.ts` and no `.source/`). `RootProvider` takes `dir` and `i18n`. `createI18nMiddleware` works as Next 16 `proxy.ts`. `create-fumadocs-app` warns that Node ≥ 24.11 is wanted (we run 24.3; no runtime problem seen).
- Playwright 1.65.1 needs chromium r1255; `playwright install --only-shell chromium` costs ~200 MB.

## 15. Phase 4 findings (track 1)
- Upstream base-nova sources (`shadcn view <name>`) import `cn` from the npm package `cn` and use placeholder classes (`cn-font-heading`, `cn-rtl-flip`, `cn-menu-target`) and `IconPlaceholder`. The CLI rewrites these per style and icon library. Our sources use `@/lib/utils`, plain `font-heading`, `rtl:rotate-180` and direct `lucide-react` imports.
- Upstream base-nova still ships physical classes (`pl-*`, `right-2`, `text-left`) and relies on the CLI RTL transform. Ours are logical-only (registry-check enforces this).
- Base UI `Button` with `nativeButton={false}` sets `role="button"` on `<a>`. Upstream `PaginationLink` therefore exposes links as buttons, so ours renders a plain `<a>`.
- Base UI `DirectionProvider` cannot tell "no provider" from "ltr". `useDirection` therefore trusts provider `rtl`, else the DOM `dir`.

## Sources
- https://ui.shadcn.com/docs/registry/getting-started
- https://ui.shadcn.com/docs/registry/registry-json
- https://ui.shadcn.com/docs/registry/registry-item-json
- https://ui.shadcn.com/docs/registry/examples
- https://ui.shadcn.com/docs/registry/namespace
- https://ui.shadcn.com/docs/registry/registry-index
- https://ui.shadcn.com/docs/registry/github
- https://ui.shadcn.com/docs/registry/faq
- https://ui.shadcn.com/docs/registry/open-in-v0
- https://ui.shadcn.com/docs/rtl · https://ui.shadcn.com/docs/rtl/next
- https://ui.shadcn.com/docs/theming · https://ui.shadcn.com/docs/mcp · https://ui.shadcn.com/docs/changelog
- https://github.com/shadcn-ui/registry-template
- https://fumadocs.dev/docs/ui/theme · https://fumadocs.dev/docs/internationalization · https://fumadocs.dev/docs/headless/internationalization/config
- https://nextjs.org/blog
