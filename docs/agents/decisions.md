# Decisions Log

Format: **D-NNN — title** · date · who decided · decision · reason.

**D-001 — Docs framework: Fumadocs** · 2026-11-19 · Orchestrator (on Developer proposal) · Fumadocs 16 inside a single Next 16 app. Reason: official RTL support (`dir` on body + RootProvider), i18n with Arabic at `/` and English at `/en` via `hideLocale: 'default-locale'`, shadcn CSS preset lets the docs dogfood the Qatt theme.

**D-002 — Base: base-nova only in v1** · 2026-11-19 · Orchestrator · Restyled components target shadcn's current default (Base UI, `base-nova`). Reason: Base UI and Radix variants have different props; supporting both doubles surface area. Radix variants can come in a later minor release. Documented on getting-started.

**D-003 — Cross-item deps as absolute URLs** · 2026-11-19 · Orchestrator (Developer wins on feasibility) · Our items reference each other in `registryDependencies` as `${REGISTRY_URL}/r/<name>.json`, generated at build time. Reason: bare names resolve to built-in shadcn items, and `@qatt/x` is undocumented for consumers who did not configure the namespace. Absolute URLs work for both install paths and allow local testing. Revisit after the install-flow test proves namespace refs.

**D-004 — Theme font via separate `registry:font` item** · 2026-11-19 · Developer · `font` is only valid on `registry:font` items, so `qatt-theme` depends on a `qatt-font` item. Final font choice belongs to UX/UI.

**D-005 — "Open in v0" shown with caveat** · 2026-11-19 · Orchestrator · v0 ignores `cssVars`/`css`/namespaces, so items open there without the Qatt look. Button kept but labelled as structure-only preview.

**D-006 — `qatt-frame` Arabic name: «إطار القوس»** · 2026-11-19 · Orchestrator (Heritage offered both) · Neutral shape-based name avoids a possible religious reading of «المحراب» in a generic UI component. Glossary updated.

**D-007 — `sawtooth` motif never mirrors in RTL** · 2026-11-19 · Heritage + UX/UI · It is the only non-symmetric motif; it renders identically in both directions. All other motifs are mirror-safe.

**D-008 — Digits: Western 0–9 by default** · 2026-11-19 · Heritage recommendation · Consistent with code/install commands and common Saudi digital usage (noted as observation, not cited). Arabic-Indic offered as an opt-in utility class.

**D-009 — Phase 2 and Phase 3 scaffold run in parallel** · 2026-11-19 · Orchestrator · Developer builds infrastructure (app, Fumadocs, registry pipeline, test harness) with placeholder tokens while UX/UI finalizes tokens; the Phase 3 gate (qatt-theme installs into a fresh app) is still checked after tokens land. Reason: no design dependency in the plumbing; saves a full phase of wall time.

**D-010 — Lean disk usage** · 2026-11-19 · Orchestrator · Owner's disk has ~3.7 GB free. Single pnpm workspace store, Playwright Chromium only, install-flow fixtures reuse the pnpm store and are deleted after each run.

**D-011 — Accessible focus ring** · 2026-11-19 · UX/UI (a11y wins) · shadcn default `ring-ring/50` measures 2.2:1 → replaced with solid 2px Nila-blue outline, 2px offset, in all restyled components.

**D-012 — `--qatt-ink` token** · 2026-11-19 · UX/UI, pending Heritage confirmation · Charcoal in light / gypsum in dark so motif outlines survive dark mode.

**D-013 — Copy must say Base UI, not Radix** · 2026-11-19 · Orchestrator (follows D-002) · `home.value.a11y.body` and `footer.builtWith` corrected by Heritage.

**D-014 — External-link icon does not flip** · 2026-11-19 · Orchestrator (UX/UI usability call) · The ↗ glyph signals "leaves the site", not reading direction; common RTL practice keeps it unflipped.

**D-011 — Registry source = committed template + generator** · 2026-11-19 · Developer · Root `registry.json` is committed with `{{REGISTRY_URL}}` placeholders. `scripts/registry-gen.ts` substitutes `REGISTRY_URL` (default `http://localhost:4000`; Vercel previews use `https://$VERCEL_URL`), injects `qatt-theme` `cssVars` and writes `.registry/registry.json` (gitignored), which `shadcn build` turns into `public/r/`. This replaces the proposal's `registry.config.ts` → generated root `registry.json`. Reason: `shadcn registry validate` and contributors work on a real JSON file. Live experiments confirmed that `@qatt/x` (unconfigured) and `./x.json` deps both fail on direct-URL install, so D-003 stands.

**D-012 — Single token source: `registry/qatt/theme/qatt-theme.css`** · 2026-11-19 · Developer · The docs site `@import`s this file, and the generator parses its `:root` / `.dark` blocks into `qatt-theme.cssVars.light/dark`. UX/UI tokens (`docs/agents/ux-ui/tokens.css`) replace its contents and nothing else changes. `--radius` lives in `:root` (light), because `cssVars.theme` entries land in `@theme inline` (verified).

**D-013 — Fumadocs Base UI build; Arabic-only `languages` for now** · 2026-11-19 · Developer · `fumadocs-ui` is aliased to `@fumadocs/base-ui` (the current default, which matches D-002). i18n is `defineI18n({ languages: ["ar"], defaultLanguage: "ar", hideLocale: "default-locale", parser: "dot" })` under `app/[lang]`. Adding English means adding `"en"` and `*.en.mdx` files; no restructuring.

