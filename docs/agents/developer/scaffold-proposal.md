# Scaffold Proposal — Qatt UI (قَطّ)

Date: 2026-11-19 · Author: Developer Agent (وكيل التطوير) · Status: **implemented in Phase 3 (see D-011…D-013)**
Companion: [`shadcn-research.md`](./shadcn-research.md) (sources, verified flags, gotchas).

**Headline:** one Next.js 16 app hosts both the docs site (Fumadocs, Arabic/RTL at `/`, `/en` later) and the static registry (`shadcn build` → `public/r/*.json`, gitignored). Registry source lives in `registry/qatt/*`. Cross-item dependencies use absolute URLs generated from `REGISTRY_URL`. An install-flow script proves every item installs into a fresh RTL app before each deploy.

## 1. Stack

| Concern | Choice | Version (npm, 2026-11-19) |
|---|---|---|
| Runtime / PM | Node 24.3, pnpm 10.30 | `packageManager: pnpm@10.30.x` |
| Framework | Next.js App Router, Turbopack | `next@16.4.x`, React 19.x |
| Styling | Tailwind CSS v4, OKLCH tokens, `@theme inline` | `tailwindcss@4.3.x`, `@tailwindcss/postcss`, `tw-animate-css` |
| Registry CLI | `shadcn` (dev dep, pinned) | `shadcn@4.23.0` |
| Primitives base | **Base UI** (current shadcn default, `base-nova`). Radix variant is an open question (§10) | — |
| Docs | **Fumadocs** (`fumadocs-core`, `fumadocs-ui`, `fumadocs-mdx`) | `16.19.x` |
| Unit/a11y tests | Vitest + Testing Library + `vitest-axe` (or `jest-axe` matchers), jsdom | `vitest@5.1.x` |
| E2E / visual | Playwright (+ `@axe-core/playwright`) | `@playwright/test@1.65.x` |
| Lint/format | ESLint 9 flat config (`eslint-config-next`), Prettier + `prettier-plugin-tailwindcss` | — |
| Deploy | Vercel | — |

### Docs framework: Fumadocs (reason)
- Official RTL support: `<body dir="rtl">` + `<RootProvider dir="rtl">` (fumadocs.dev/docs/ui/theme).
- i18n with `defineI18n({ languages: ['ar','en'], defaultLanguage: 'ar', hideLocale: 'default-locale' })` → Arabic served at `/`, English at `/en/...` with no route rewrite on our side.
- `fumadocs-ui/css/shadcn.css` preset makes docs chrome use **our** shadcn tokens, so the qatt theme styles the docs site itself (dog-fooding).
- Search, TOC, sidebar, code blocks come free; plain `@next/mdx` would mean rebuilding all that RTL-correctly by hand.
- Risk: some Fumadocs internals may use physical CSS; mitigated by Playwright RTL screenshot spike in week 1. Fallback: `@next/mdx` + content-collections (same content files, MDX is portable).

## 2. Directory layout

```
.
├── app/
│   ├── [lang]/                     # 'ar' hidden (default), 'en' later
│   │   ├── layout.tsx              # <html lang={lang} dir={lang==='ar'?'rtl':'ltr'}>, RootProvider dir
│   │   ├── (home)/page.tsx         # landing
│   │   └── docs/[[...slug]]/page.tsx
│   ├── api/search/route.ts         # Fumadocs search (Orama, ar + en)
│   └── globals.css                 # tailwind + fumadocs shadcn preset + qatt tokens
├── proxy.ts                        # Next 16 name for middleware: createI18nMiddleware(i18n)
├── content/docs/{ar,en}/…mdx       # or *.ar.mdx/*.en.mdx (Fumadocs "dot" parser) — pick one in spike
├── lib/i18n.ts, lib/source.ts
├── components/                     # docs-site-only components (preview, install tabs, open-in-v0)
│   └── ui/                         # site's own copy of shadcn/qatt UI (installed from our registry = dog-food)
├── registry/
│   └── qatt/
│       ├── theme/qatt-theme.json?  # (theme/font items are JSON-only, defined in registry.json)
│       ├── ui/qatt-frame.tsx, button.tsx, …
│       ├── blocks/hero-01/{hero-01.tsx,components/…}
│       ├── lib/qatt-patterns.ts
│       └── hooks/use-direction.ts
├── registry.json                   # GENERATED from scripts/registry.config.ts (see §3) — committed? no, generated
├── scripts/
│   ├── build-registry.ts           # writes registry.json with REGISTRY_URL, then runs `shadcn build`
│   └── install-flow.ts             # §6
├── tests/{unit,e2e,install}/
├── public/r/                       # shadcn build output — .gitignore'd
├── components.json                 # rtl: true, aliases, registries: { "@qatt": … } for dog-fooding
└── docs/agents/…                   # agent notes (this file)
```

`.gitignore`: `public/r/`, `registry.json` (generated), `.install-flow/`.

## 3. `registry.json`

Source of truth is `scripts/registry.config.ts` (typed with `registryItemSchema` from `shadcn/schema`) so that cross-item URLs can be templated; it emits `registry.json`. If the team prefers hand-written JSON, use a literal `https://qatt.dev` and let the install-flow test rewrite the host (sed) — worse, but simpler.

```jsonc
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "qatt",
  "homepage": "https://qatt.dev",          // TBD domain
  "items": [ /* … below … */ ]
}
```

`R = ${REGISTRY_URL}/r` (prod `https://qatt.dev/r`, tests `http://localhost:4000/r`). Flat `/r/{name}.json` layout (required for the official index). Consumer config: `"@qatt": "https://qatt.dev/r/{name}.json"`.

### 3.1 `registry:font` — qatt-font (required by theme; `font` only allowed on `registry:font`)
```json
{
  "name": "qatt-font",
  "type": "registry:font",
  "title": "Qatt Arabic Font",
  "description": "IBM Plex Sans Arabic as --font-sans (Arabic + Latin).",
  "font": {
    "family": "'IBM Plex Sans Arabic', sans-serif",
    "provider": "google",
    "import": "IBM_Plex_Sans_Arabic",
    "variable": "--font-sans",
    "weight": ["400", "500", "700"],
    "subsets": ["arabic", "latin"],
    "dependency": "@fontsource/ibm-plex-sans-arabic"
  }
}
```
(Font choice is the Designer agent's call; `import` value format for multi-word Google fonts must be verified — see §10.)

### 3.2 `registry:theme` — qatt-theme
```json
{
  "name": "qatt-theme",
  "type": "registry:theme",
  "title": "Qatt Theme",
  "description": "Al-Qatt Al-Asiri palette: light/dark OKLCH tokens + Arabic font.",
  "registryDependencies": ["${R}/qatt-font.json"],
  "cssVars": {
    "theme": { "font-heading": "var(--font-sans)", "radius": "0.5rem" },
    "light": {
      "background": "oklch(0.985 0.01 85)", "foreground": "oklch(0.2 0.02 40)",
      "primary": "oklch(0.55 0.18 30)", "primary-foreground": "oklch(0.98 0.01 85)",
      "qatt-ochre": "oklch(0.78 0.14 80)", "qatt-indigo": "oklch(0.38 0.12 265)",
      "qatt-green": "oklch(0.6 0.13 150)"
    },
    "dark": {
      "background": "oklch(0.18 0.02 40)", "foreground": "oklch(0.96 0.01 85)",
      "primary": "oklch(0.68 0.17 30)", "primary-foreground": "oklch(0.18 0.02 40)",
      "qatt-ochre": "oklch(0.72 0.13 80)", "qatt-indigo": "oklch(0.62 0.12 265)",
      "qatt-green": "oklch(0.7 0.12 150)"
    }
  },
  "css": {
    "@utility qatt-zigzag": { "background-image": "var(--qatt-zigzag)" }
  }
}
```
Values are placeholders for the Designer. Note: custom colours in `light`/`dark` get exposed as `bg-qatt-ochre` etc. by the CLI's `@theme inline` merge [verify]. Optionally later a `registry:style` (`qatt`) bundling theme + all ui items.

### 3.3 `registry:ui` — qatt-frame
```json
{
  "name": "qatt-frame",
  "type": "registry:ui",
  "title": "Qatt Frame",
  "description": "Decorative frame with Al-Qatt geometric borders.",
  "registryDependencies": ["${R}/qatt-theme.json", "${R}/qatt-patterns.json"],
  "dependencies": [],
  "files": [{ "path": "registry/qatt/ui/qatt-frame.tsx", "type": "registry:ui" }]
}
```
Source imports `@/registry/qatt/lib/qatt-patterns` and `@/lib/utils` (CLI rewrites to consumer aliases).

### 3.4 Restyled shadcn component — button (override)
```json
{
  "name": "button",
  "type": "registry:ui",
  "title": "Button (Qatt)",
  "description": "shadcn Button, same API, plus `qatt` and `qatt-outline` variants.",
  "registryDependencies": ["${R}/qatt-theme.json"],
  "dependencies": ["class-variance-authority", "@base-ui/react"],
  "files": [{ "path": "registry/qatt/ui/button.tsx", "type": "registry:ui" }]
}
```
- Installs to `components/ui/button.tsx` (`@ui/button.tsx`), replacing upstream; this is the documented override pattern (examples page: "override primitives by listing remote URLs in registryDependencies"; dedup by target, last wins). Our blocks depend on `${R}/button.json`, **not** bare `"button"` (bare = shadcn built-in).
- Rules: start from the current upstream file for the chosen base, keep every export, prop and variant name; only add variants/tokens; use logical classes only. A unit test diff-checks exported names against upstream (`shadcn view button --json`).
- Install requires `--overwrite` when the file exists.

### 3.5 `registry:block` — hero-01
```json
{
  "name": "hero-01",
  "type": "registry:block",
  "title": "Hero 01",
  "description": "Arabic RTL hero with Qatt frame.",
  "categories": ["hero", "marketing"],
  "registryDependencies": ["${R}/button.json", "${R}/qatt-frame.json", "${R}/use-direction.json"],
  "files": [
    { "path": "registry/qatt/blocks/hero-01/hero-01.tsx", "type": "registry:component" },
    { "path": "registry/qatt/blocks/hero-01/page.tsx", "type": "registry:page", "target": "app/hero-01/page.tsx" }
  ]
}
```

### 3.6 `registry:lib` — qatt-patterns
```json
{
  "name": "qatt-patterns",
  "type": "registry:lib",
  "title": "Qatt Patterns",
  "description": "SVG pattern generators (triangles, zigzags, diamonds) as data URIs.",
  "files": [{ "path": "registry/qatt/lib/qatt-patterns.ts", "type": "registry:lib" }]
}
```

### 3.7 `registry:hook` — use-direction
```json
{
  "name": "use-direction",
  "type": "registry:hook",
  "title": "useDirection",
  "description": "Reads the nearest DirectionProvider / document dir.",
  "registryDependencies": ["direction"],
  "files": [{ "path": "registry/qatt/hooks/use-direction.ts", "type": "registry:hook" }]
}
```
(`"direction"` bare = shadcn's built-in DirectionProvider — intentional.)

### 3.8 Dependency form decision
- **Use absolute `${REGISTRY_URL}/r/<name>.json`** for intra-registry deps: documented to work for direct-URL and namespace installs, no consumer config needed.
- Bare names only for genuine shadcn built-ins (`direction`, `card`, …).
- Revisit `@qatt/<name>` after (a) official-index listing and (b) install-flow proves transitive `@qatt/...` resolution without a configured namespace.

## 4. Build pipeline

```jsonc
"scripts": {
  "registry:gen":   "tsx scripts/build-registry.ts",          // registry.config.ts -> registry.json (REGISTRY_URL)
  "registry:build": "pnpm registry:gen && shadcn build",       // -> public/r/*.json
  "registry:validate": "shadcn registry validate ./registry.json",
  "build":          "pnpm registry:build && next build",
  "dev":            "pnpm registry:build && next dev",
  "test":           "vitest run",
  "test:e2e":       "playwright test",
  "test:install":   "tsx scripts/install-flow.ts"
}
```
Output: `public/r/registry.json` + `public/r/<name>.json`, served at `https://qatt.dev/r/...`. Add `next.config` headers for `/r/:path*`: `Access-Control-Allow-Origin: *`, `Content-Type: application/json`, short cache (`max-age=300, s-maxage=3600`).

## 5. Test strategy

1. **Schema/lint** — `shadcn registry validate`; custom Vitest checks: every intra-registry dep resolves to an existing item; no bare name that collides with an own item except intended overrides; no physical direction classes (`ml-|mr-|pl-|pr-|left-|right-|text-left|text-right|rounded-l|border-l…`) in `registry/**` (regex lint); built `registry.json` has no `content`.
2. **Unit + a11y** — Vitest (jsdom) + Testing Library + axe on each ui/block rendered under `<DirectionProvider direction="rtl">` and `dir="ltr"`; override components: exported API parity with upstream.
3. **E2E / visual** — Playwright on the docs site: Arabic `/` has `dir=rtl lang=ar`; each component preview page; `@axe-core/playwright`; screenshot snapshots in light/dark × rtl (ltr once `/en` exists).
4. **Install flow** (`scripts/install-flow.ts`, the key gate):
   1. `REGISTRY_URL=http://localhost:4000 pnpm registry:build`
   2. Serve `public/` statically on :4000 (`npx serve public -l 4000` or a tiny `node:http` server) so `/r/*.json` exist pre-deploy.
   3. In `.install-flow/app` (temp): `pnpm dlx shadcn@4.23.0 create -t next --rtl -n app -y` (pinned CLI).
   4. `shadcn registry add @qatt=http://localhost:4000/r/{name}.json`.
   5. Matrix A (namespace): `shadcn add @qatt/<each item> -y --overwrite`.
      Matrix B (direct URL, fresh app without `registries`): `shadcn add http://localhost:4000/r/<item>.json -y --overwrite`.
   6. Write a page importing every installed ui/block; `pnpm next build` (+ `tsc --noEmit`). Fail on any error, any prompt (stdin closed), or any physical-direction class in installed files.
   Runs in CI and locally; also answers the open dependency-form questions empirically.

## 6. CI (GitHub Actions)

- `ci.yml` on PR/push: `pnpm/action-setup` + `setup-node@v4 (node 24, cache pnpm)` → `pnpm i --frozen-lockfile` → lint + typecheck → `registry:build` + `registry:validate` → `vitest run` → `next build` → Playwright (`npx playwright install --with-deps chromium`) against `next start`.
- `install-flow` job (needs build artefact `public/r`): matrix `{namespace, url}` (later `{base-nova, radix-nova}`); caches pnpm store.
- `nightly.yml`: install-flow with `shadcn@latest` (instead of pinned) to catch CLI drift early; opens an issue on failure.
- Upload Playwright report + install-flow logs as artefacts.

## 7. Deploy (Vercel)

- Framework preset Next.js; build command `pnpm build` (runs `shadcn build` first, so `public/r` is generated at deploy — never committed). Env `REGISTRY_URL=https://qatt.dev` for production; preview deploys use `https://$VERCEL_URL` (so preview registries are self-consistent and testable with `add https://<preview>/r/x.json`).
- Disable Vercel deployment protection on previews if we want external install tests against them.
- After the domain is stable: PR to shadcn-ui/ui `apps/v4/registry/directory.json` adding `@qatt` → `https://qatt.dev/r/{name}.json` (requires flat layout, public, schema-valid).
- "Open in v0" buttons: only on items without `cssVars`/`css` dependencies, or accept unstyled result (v0 ignores cssVars/css/namespaces).

## 8. Milestones (after approval)
1. Spike (1 day): scaffold app, Fumadocs ar/RTL + `/en` stub, one theme + one ui item, install-flow green. Resolves §10 items 1–5.
2. Theme + tokens with Designer; overrides of core shadcn components.
3. Blocks, docs content, visual tests, index submission.

## 9. Components.json for the site itself (dog-food)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rtl": true,
  "tsx": true,
  "rsc": true,
  "tailwind": { "css": "app/globals.css", "baseColor": "neutral", "cssVariables": true },
  "aliases": { "components": "@/components", "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks", "utils": "@/lib/utils" },
  "registries": { "@qatt": "http://localhost:3000/r/{name}.json" }
}
```
(Exact keys emitted by `create` in 4.23 to be confirmed in the spike.)

## 10. Open questions / risks
1. **Disk full on dev machine** — live CLI experiments (init/build/add) couldn't run (141 MB free). Must free space before the spike.
2. **Transitive `@qatt/x` deps** without consumer `registries` config — undocumented; absolute URLs chosen meanwhile.
3. **Base UI vs Radix**: shadcn default is now Base UI (`base-nova`); `Button` APIs differ (`render` vs `asChild`). Overrides must match the consumer's base. Options: (a) support only base-nova in v1 and document; (b) ship both via `{style}` URL template — but the official index requires a flat layout, which conflicts with `/r/{style}/{name}.json`. Recommend (a) for v1.
4. **CLI RTL transform** only applies to new styles; our sources must be logical-class-only regardless (enforced by lint).
5. **Font item**: exact `import` naming for multi-word Google fonts and how the CLI wires it into Next (`next/font` vs fontsource) unverified; Arabic font licensing (OFL is fine).
6. **Fumadocs RTL edge cases** (sidebar chevrons, TOC, search dialog); fallback is plain MDX.
7. **Override collisions**: consumers who customised `components/ui/button.tsx` lose changes on `--overwrite`; docs must warn and suggest `add --diff` first.
8. **Domain/homepage** not decided (`qatt.dev` placeholder); affects all generated URLs and index submission.
9. **CLI churn**: shadcn ships monthly; pin in package.json, nightly job on `@latest`.
10. **Open in v0** ignores cssVars/css → Qatt look lost there.

> **Status update (Phase 3, 2026-11-19):** implemented. Deviations are logged in `decisions.md` D-011…D-013 and the verification results are in `shadcn-research.md` §14.
