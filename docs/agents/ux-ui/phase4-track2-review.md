# Phase 4 track 2 review (UX/UI)

Scope: `7bd1f76..d60d86d`, which covers the motif registry, 5 ornaments, the deferred ornament variants, 10 blocks and the docs pages (blocks, components, patterns).
Method: I read all the code. I rendered every block demo plus `/docs/patterns` at 1280px and 375px, in light and dark, with reduced motion on (Playwright, against the running dev server). I checked contrast with OKLCH→sRGB maths on the `qatt-theme.css` values. Heritage's `phase4-review.md` was folded in (D1 banat, D-019 gallery).

**Verdict: 7 fixes required (F7 spec side already done), then approve.** RTL is clean: no physical classes, arrows flip, artwork never flips, and sawtooth stays as drawn. The decorative SVGs are all `aria-hidden` and the heading structure is sound. The blocks look like Asir, not a dashboard with a pattern pasted on. The best of them are the rukun, banat and taadheeq friezes, the arch frame on the 404 page and the kaff-based footer.

## Fixes required

| # | Item | Finding | Exact fix |
|---|---|---|---|
| F1 | **button / every block CTA rendered as `<a>`** | `buttonVariants()` is a raw `cva` and does not run tailwind-merge. The base `border border-transparent` (`button.tsx:11`) therefore beats `border-qatt-ink` from the `qatt` / `qatt-outline` variants. On screen, the hero's «شاهد العرض» and the 404 page's «ابحث في الموقع» have **no border**: the computed value is `2px rgba(0,0,0,0)`. Affected: `qatt-hero.tsx:105,114`, `majlis-welcome.tsx:57`, `qatt-404.tsx:37`, `qatt-404/page.tsx:12`. Pricing and CTA only look right because they wrap the call in `cn()`. | Fix it at the source, in `button.tsx`: `const base = cva(…)` then `const buttonVariants = (p?: VariantProps<typeof base>) => cn(base(p))`, and keep the export name. Add a unit test that asserts `buttonVariants({variant:"qatt-outline"})` does not contain `border-transparent`. |
| F2 | **qatt-hero, mobile overflow** | At 375px the block is 261px wide but `scrollWidth` is 435. The install command's `<code>` is a flex item with `min-width:auto`, so it widens the grid column. The h1, the subtitle and the command are clipped on the inline-end side (see screenshot). | `qatt-hero.tsx:43`: add `min-w-0` to `<code>`. `qatt-hero.tsx:94`: add `min-w-0` to the text column. Add an e2e test at 320px: `scrollWidth <= clientWidth` for every block. |
| F3 | **qatt-stats, reduced motion** | `useReveal` returns `true` right away under `prefers-reduced-motion`, and then the count-up effect (`qatt-stats.tsx:35-46`) runs anyway. Reduced-motion users still see the numbers animate. | In `StatValue`, read `matchMedia("(prefers-reduced-motion: reduce)")` inside the effect. If it matches, call `setShown(stat.value)` and return. Add the matching e2e test (with `reducedMotion:"reduce"`, the visible text equals the final value on the first frame). |
| F4 | **qatt-cta, focus visibility on paint bands** | The focus ring is `--ring`, which is blue. Against the band it measures **1.02:1 on red** (light), **2.61:1 on ink** (light) and 1.59:1 on dark red, so focus on the buttons is invisible (WCAG 2.4.7 / 1.4.11). | `qatt-cta.tsx:22-26`: `ink: "… [--ring:var(--qatt-white)]"` (14.9:1 light, 7.6:1 dark). `red: "… [--ring:var(--qatt-white)] dark:[--ring:var(--background)]"` (5.8:1 / 4.8:1). Spec updated (§3.7). |
| F5 | **qatt-pricing, billing toggle semantics** | `Tabs`/`TabsTrigger` are used with **no `TabsPanel`** (`qatt-pricing.tsx:71-81`). Screen readers announce a tab list whose tabs control nothing. | Replace it with a segmented radio group: `<fieldset><legend className="sr-only">{period.label}</legend>`, then two `<label>`s, each wrapping an `<input type="radio" name={id+"-billing"} className="peer sr-only">` and a span styled like the qatt tab (`peer-checked:` for the active state, `peer-focus-visible:outline-2 outline-ring` for focus). Arrow keys come free from the native radios. Spec §3.6 updated. |
| F6 | **Patterns page, D-019 (Heritage must-fix)** | `components/docs/motif-gallery.tsx:19-24`: the motif previews sit on the dark card in dark mode (confirmed in render). This is a heritage-presenting page. | Add `data-qatt-surface="gypsum"` to the preview wrapper `div` (line 19) and to the `QattMotifTile` branch (line 17, wrap it in a `<div data-qatt-surface="gypsum" className="rounded-sm p-2">`). The `[data-qatt-surface]` scope already restores day-wall slots and AA text. Also remove the dead `h-16` class on line 20 (it is overridden by the inline height). |
| F7 | **banat geometry (Heritage D1), DONE in spec** | A lone tile with one branch pair reads as a figure. I updated `docs/agents/ux-ui/tools/motifs.py`, `motifs.json` and `motifs/banat.svg` to the revised catalog: stroke 1.25, `M8 12V4 M8 9.5 5.5 7 M8 9.5 10.5 7 M8 7 6 5 M8 7 10 5`. Re-rendered: it reads as a sprig at 8, 16 and 64px, light and dark, and band seams are clean (all strokes stay within x 5.5–10.5 of 16). | **Developer:** run `pnpm motifs:gen` and commit the regenerated `registry/qatt/lib/qatt-motifs.ts`. Then `badge.tsx:66`: replace the single tile with two tiles, `<QattBand motif="banat" thickness={12} className="w-4 shrink-0" />` (a 16×12 strip). Spec §2 badge updated. |

## Item verdicts

| Item | Verdict | Notes / nits (file:line → fix) |
|---|---|---|
| Motif registry (`qatt-motifs.ts`, `qatt-utils`) | approve | Generated, `flipInRtl:false` for all motifs, sawtooth `mirror:false`. After F7, rerun the generator. |
| `qatt-pattern` | approve + nit | Children clamp the opacity to 0.12/0.18, which is good. Nit (Heritage D2): `qatt-pattern.tsx:182` should use `marginBlockEnd` (inside `flex-col-reverse`) so the gap sits between kaff and qatt-lines. |
| `qatt-border` | approve + nit | Logical sides. Nit: `qatt-border.tsx:80` puts `rotate-180` on the block-end strip, which also reverses the paint-reveal direction (it grows from inline-end). Accept, or rotate the inner `QattMotif` (`rotate={180}`) instead of the band wrapper. |
| `qatt-divider` | approve | `role="none"` + `aria-hidden` when decorative. A label stays readable («أو» in login). |
| `qatt-frame` | approve | `figure`/`figcaption`, clipPath, symmetric. The draw animation is `motion-safe` only. |
| `qatt-corner` | approve | Logical insets; `start-start` = top-right in RTL. |
| Deferred variants (badge, card, tabs strip, dialog, sheet, accordion, pagination, sonner, separator) | approve (badge → F7) | All ornaments are `aria-hidden`. Sonner type is shown by colour + icon + text. Nit (Heritage D3): sheet demo should use `mathalith-makhamis` on its side edge, not `kaff`. |
| qatt-hero | fix (F1, F2) | Nit: `qatt-hero.tsx:50`: reset `copied` after 2s so a second copy is announced again. |
| majlis-welcome | fix (F1) | Banat frieze reads plant-like; warm and faithful. |
| qatt-feature-grid | approve + nit | Stretched link is correct; focus outline stays on the title only. Nit: add `has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-ring` on the Card so the whole tile shows focus. Nit (visual): in dark mode `shabakah` (ink = gypsum) at 6% reads like a transparency checkerboard. Use `variant="lattice"`, or `opacity={0.04}` in dark. |
| qatt-stats | fix (F3) | Text over the balsanah field stays ≥4.5:1 (muted ≈4.9:1 over the 8% field). |
| qatt-testimonials | approve + nit | `key={item.name}` (`:97`) → `key={i}`, or the name plus the index. |
| qatt-pricing | fix (F5) | Taadheeq crest is centred correctly in RTL. `99 ر.س` order is correct. CTA `aria-describedby` follows D-027. |
| qatt-cta | fix (F4) + nit | `qatt-cta.tsx:72`: use `border-current` instead of `border-qatt-white`, so the border matches the dark-red text. |
| qatt-footer | approve | Real `h2`s, external links have sr suffix and a non-flipping icon, kaff base. No overflow at 375. |
| qatt-login | approve + nit | Labels, `dir="ltr"`, `aria-pressed` toggle, alert region and focus to the first error are all good. Nit: caps-lock text (`:193`) should be `role="status"`. |
| qatt-404 | fix (F1) | h1 is the sentence; code in `bdi`; mahareeb base. Good in both modes. |
| Docs: patterns.mdx | fix (F6) | Labels follow D-020/D-021. Nit: default colours print raw ids (`red, ink`). Map them through `docs.pigments.*` copy for Arabic. |
| Mobile (375) | fix (F2) | Every other page has `scrollWidth == clientWidth`. Code blocks scroll inside their own box. |

## Spec edits made (docs/agents/ux-ui only)
- `tools/motifs.py`, `motifs.json`, `motifs/banat.svg`: banat revision (F7).
- `component-specs.md`: badge banat = at least two tiles at 16×12; pricing toggle = radio fieldset (no Tabs); CTA ring override on paint bands.
