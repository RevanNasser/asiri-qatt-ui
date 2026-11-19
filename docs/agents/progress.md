# Qatt UI (قَطّ) — Orchestrator Progress Log

## Plan

| Phase | Lead | Gate | Status |
|---|---|---|---|
| 1. Discovery | A (Heritage) | `heritage-brief.md` + `motif-catalog.md`, every claim marked verified/unverified | 🟡 in progress |
| 1b. Scaffold proposal | C (Developer) | Read current shadcn docs (registry, namespaces, RTL, theming); write `scaffold-proposal.md` — no UI code | 🟡 in progress |
| 2. Design foundation | B (UX/UI), A reviews | Tokens pass WCAG 2.2 AA; SVG motifs approved by A | ⏳ |
| 3. Scaffold | C | Next.js + shadcn RTL + `shadcn build` → `public/r/`; `qatt-theme` installs into a fresh app | ⏳ |
| 4. Build | C (B reviews items, A reviews Arabic) | All §5 items built, documented, tested | ⏳ |
| 5. Site | C + B | All IA pages live, Arabic, RTL, light/dark | ⏳ |
| 6. QA | Orchestrator | Tests green, Lighthouse ≥ 90, fresh-app install flow passes | ⏳ |
| 7. Release | C | README/CHANGELOG/LICENSE/CONTRIBUTING, v1.0.0 tag (deploy needs owner credentials) | ⏳ |

Agent outputs live in `docs/agents/heritage/`, `docs/agents/ux-ui/`, `docs/agents/developer/`.
Decisions and conflict resolutions: `docs/agents/decisions.md`.

## Log

### 2026-11-19 — Phase 1 kickoff
- Repo initialized (git, `main`). Toolchain: Node 24.3, pnpm 10.30.
- Started Agent A (Heritage) on discovery and Agent C (Developer) on shadcn docs review + scaffold proposal, in parallel.

### 2026-11-19 — Developer research done
- `docs/agents/developer/shadcn-research.md` and `scaffold-proposal.md` written. Verified versions: shadcn CLI 4.23.0, Next 16.4.6, Tailwind 4.3.5, Fumadocs 16.19.4.
- Decisions D-001…D-005 recorded.
- **BLOCKED:** disk volume has ~138 MB free. No `init`/`build`/`add` experiments could run; Phase 3 scaffold (node_modules) cannot proceed until space is freed. Asked owner.
- Heritage agent still running.

### 2026-11-19 — Phase 1 gate PASSED
- Heritage outputs: `heritage-brief.md`, `motif-catalog.md`, `ar-glossary.md`, `site-copy.ar.md`, `site-copy.en.md`. Every claim tagged (verified / verified-secondary / conflicting / unverified / project interpretation).
- UNESCO: inscribed 2017, Representative List of the ICH of Humanity (12.COM 11.B.27).
- Open heritage questions (blue pigment source, al-Aryash meaning, Banat vs Rukun, band order) stay flagged; the about page must not state them as fact.
- Owner freed disk space (~3.7 GB). Decisions D-006…D-010.
- Started Phase 2 (UX/UI) and Phase 3 scaffold (Developer) in parallel per D-009.

### 2026-11-19 — Phase 2 deliverables in, awaiting Heritage review
- UX/UI: `design-tokens.md`, `tokens.css`, `component-specs.md`, `site-ia.md`, `motifs.json`, 20 SVG tiles (15 motifs + 5 variants). All pairs pass WCAG 2.2 AA (computed table in design-tokens §4); motifs render seamlessly in light/dark/mirrored.
- Fonts (OFL): IBM Plex Sans Arabic (body), Readex Pro (display), IBM Plex Mono (code).
- Decisions D-011…D-014. Heritage review of motifs + new copy keys started (gate condition).

### 2026-11-19 — Phase 3 gate PASSED
- Commit `b0f22a4`. Next 16.4.6 + Fumadocs 16.19 (Base UI build) + shadcn 4.23 base-nova, rtl. Arabic at `/`.
- Registry: `qatt-font`, `qatt-theme`, `qatt-utils`, `use-direction`, `qatt-divider`. Pipeline: `registry.json` template with `{{REGISTRY_URL}}` → `.registry/` → `shadcn build` → `public/r`.
- Gate evidence: `pnpm test:install` — fresh `shadcn create -t next --rtl` app, all 5 items installed via `@qatt` namespace AND direct URL, no physical classes, `tsc` + `next build` pass. Orchestrator re-ran typecheck + unit tests (8/8 green).
- Backlog experiments confirmed D-003 (direct-URL installs fail with `@qatt/x` or relative deps).
- Disk now 1.8 GB free; install-flow fixture costs ~1 GB while running. Watching.
- Phase 4 track 1 started (tokens swap + restyled shadcn components) while Heritage finishes motif review; motif ornaments follow on approval.

### 2026-11-19 — Phase 2 gate PASSED
- Heritage approved all 20 motif tiles (rendered in light/dark bands): faithful, original, no caricature. Review: `docs/agents/heritage/phase2-review.md`.
- Copy fixed (Base UI), 29 new copy keys added (ar + en). Pigment names marked as labels; blue's source flagged as disputed.
- D-019…D-022 (renumbered: Developer had already used D-015…D-017). UX/UI applied non-blocking follow-ups (kaff dark default, banat rule, gypsum-surface rule, typography label).
- UX/UI follow-ups done: kaff dark defaults (red band + ink line), banat rule, `--qatt-surface-gypsum` + `data-qatt-surface="gypsum"` scope (AA inside), «الخطوط الطباعية», `stepped` flagged `projectExtension`.
