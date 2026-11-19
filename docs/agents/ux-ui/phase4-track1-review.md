# Phase 4 track 1: UX/UI review of commit 51a1919

Reviewer: UX/UI Agent · 2026-11-19 · Scope: `registry/qatt/ui/*` (15 components), `registry/qatt/hooks/use-direction.ts`, `qatt-theme.css`, D-023 to D-025.
Method: code reading only (no install, build, dev server or Playwright, because disk is low). Contrast numbers come from `tools/tokens.py` (OKLCH to sRGB, WCAG 2.x, alpha composited over `--background`).

## Summary

| Component | Verdict | Findings (file:line) |
|---|---|---|
| button | **fix required** | F1 green tone, F2 dark hover contrast, n1 motion |
| badge | approve | `banat` deferred (D-024). Pigment set without green confirmed (D-025). |
| card | approve | `framed`/`ornament` deferred (D-024). |
| tabs | nit | n2 |
| dialog | nit | n3, n4 |
| sheet | approve | Physical `[left:0]`/`[border-right-width]` at `sheet.tsx:66-70` are fine: the side is already resolved by direction. n4 also applies (`sheet.tsx:40`). |
| accordion | nit | n5 |
| input | nit | n6 |
| select | nit | n6, n7 |
| sonner | **fix required** | F3 focus indicator removed |
| tooltip | **fix required** | F4 arrow missing for physical sides |
| breadcrumb | nit | n8 |
| pagination | nit | n8 |
| avatar | approve | The tone subset (red/blue/ink/yellow/orange) is confirmed. Orange: charcoal text 4.72 (light), `text-background` 6.68 (dark). |
| separator | approve | The triple rule (3 × 1px in 8px) matches the spec. Base UI semantics are kept. |

Cross-cutting checks:
- **Logical classes:** the grep for `ml-|mr-|pl-|pr-|left-|right-|text-left|text-right|rounded-l|rounded-r|border-l|border-r|space-x` over `ui/` and `examples/` matches only `sheet.tsx:68,70`, which is intentional. **Pass.**
- **Directional icons:** the breadcrumb chevron (`breadcrumb.tsx:84`) and the pagination prev/next chevrons (`pagination.tsx:68,83`) flip with `rtl:rotate-180`, and in RTL prev points right and next points left. The accordion and select chevrons, the check and the X do not flip. **Pass.**
- **Focus (D-011):** every interactive part uses `outline-2 outline-offset-2 outline-ring`. Tabs use `-outline-offset-2` as the spec asks. The ring is 6.04:1 on the page and 6.36:1 on the card in light, 7.60:1 and 7.07:1 in dark. The one exception is Sonner (F3). **Pass, except F3.**
- **Tokens:** no hex, rgb or oklch values and no palette colours in components. The only exception is the `dark:bg-black/60` scrim (n4).
- **Dark painted surfaces with `text-background` (D-025 (2)): confirmed.** `text-background` on the lifted pigments gives red 4.79, blue 5.15, yellow 9.89, green 6.23 and orange 6.68. Gypsum would give 2.72 and 2.52 on red and blue. The ink tone keeps gypsum on `qatt-black` (7.60).
- **Reduced motion:** dialog, sheet, select, tooltip and accordion all have `motion-reduce:*-none`. The Sonner library CSS has its own `@media (prefers-reduced-motion)`, and the spinner sets `motion-reduce:animate-none`. The tab indicator opacity fade is allowed (design-tokens §9: opacity ≤ 150ms may remain). n1 covers the button.

## Required fixes (Developer)

**F1 — Drop the green `painted` tone (decision).** `button.tsx:36` (`green: ""`) and `button.tsx:69-74` (the compound variant with forced `font-bold`). Also remove green from `content/docs/components/button.mdx:39,41` and from any test or demo that uses it.
- Why: gypsum on `--qatt-green` is **4.25:1** (charcoal is 3.51). The button is `text-sm` (14px), and 14px bold is not WCAG large text, which starts at 18.66px bold or 24px regular. The component cannot enforce a size rule, because consumers will use `size="default"`/`"sm"`. The hover state (`/90`) drops to 3.55.
- Options rejected: (a) *Larger size*: even `lg` is 14px text. (b) *Darker green*: L 0.48 (`#3D6B29`) would give 5.46:1, but `--qatt-green` also colours motifs (banat, etc.), so changing the shared pigment needs Heritage sign-off. A separate UI-only token adds palette surface for one variant.
- This matches D-025 (1), where badge and avatar have no green either. If a green action is needed later, propose a `--qatt-green-deep: oklch(0.48 0.11 137)` UI token to Heritage in track 2. It passes 5.46:1 with gypsum and keeps 4.41:1 on hover only with the color-mix hover from F2.

**F2 — Painted hover must not use alpha.** `button.tsx:56` and `button.tsx:61`: `hover:bg-qatt-red/90` and `hover:bg-qatt-blue/90` composite over the dark page. With `dark:text-background` the label drops to **4.09:1 (red)** and **4.39:1 (blue)**, which fails AA. Replace them with a mix toward ink. In light this darkens the fill, and in dark it lifts it, because `--qatt-ink` is gypsum there:
```
red:    hover:bg-[color-mix(in_oklch,var(--qatt-red),var(--qatt-ink)_10%)]
blue:   hover:bg-[color-mix(in_oklch,var(--qatt-blue),var(--qatt-ink)_10%)]
yellow: hover:bg-[color-mix(in_oklch,var(--qatt-yellow),var(--qatt-ink)_10%)]
```
Results: light red 6.46, blue 6.98, yellow 6.25; dark red 5.37, blue 5.79, yellow 10.18. Keep `ink` as `hover:bg-qatt-black/90`, which gives 11.29 light and 8.10 dark. Mixing ink toward ink does nothing in light. The `qatt` and default hovers pass: `primary/90` gives 5.24 and 5.27, and `primary/85` gives 4.77 and 4.82.

**F3 — Sonner focus indicator.** `sonner.tsx:42`: `shadow-[var(--shadow-painted)]!` overrides Sonner's `[data-sonner-toast]:focus-visible` box-shadow (`styles.css:109`), so a focused toast shows **no indicator**. Sonner's own button and close focus rings (`rgba(0,0,0,.2/.4)`) also fail 3:1 and are invisible in dark. Add to `toastOptions.classNames`:
```
toast:        "font-sans shadow-[var(--shadow-painted)]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
actionButton: "focus-visible:shadow-none! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
cancelButton: (same as actionButton)
closeButton:  (same as actionButton)
```

**F4 — Tooltip arrow for physical sides (API parity).** `tooltip.tsx:57` styles the arrow only for `top`, `bottom`, `inline-start` and `inline-end`. Base UI keeps `data-side="left"|"right"` when a physical side is passed (`useAnchorPositioning.mjs:18-27`), so `side="left"|"right"`, which is still valid upstream API, renders a misplaced arrow. Add rules that are direction-resolved and therefore physical on purpose, as in sheet:
```
data-[side=left]:top-1/2! data-[side=left]:-translate-y-1/2 data-[side=left]:[right:-4px]
data-[side=right]:top-1/2! data-[side=right]:-translate-y-1/2 data-[side=right]:[left:-4px]
```
Also add the matching `data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2` on `tooltip.tsx:51` (and `select.tsx:78`, see n7).

## Nits (fix when convenient)

- **n1** `button.tsx:11`: add `motion-reduce:transition-none`. The press translate (1–3px) is user-initiated and allowed, but `transition-all` animates it.
- **n2** `tabs.tsx:65`: `data-active:font-semibold` widens the active label, so neighbouring tabs shift by a few px on change. Add the indicator only and keep the weight, or reserve the width (for example a `grid` with a hidden bold duplicate).
- **n3** `dialog.tsx:74`: the close button is at `end-2 top-2`, but the spec and sheet use `end-3 top-3`. The header `pe-8` (`dialog.tsx:86`) then still clears it.
- **n4** `dialog.tsx:37`, `sheet.tsx:40`: `dark:bg-black/60` is the one hard-coded colour. It is acceptable as a scrim, but prefer a token. I will add `--qatt-scrim` in track 2 tokens. Until then, leave it as is.
- **n5** `accordion.tsx:41-42`: the qatt open state changes the bottom border from 1px to 2px, which causes a 1px layout jump. Use `border-b-2 border-b-transparent` on the base when `variant=qatt`.
- **n6** `input.tsx:23-24`, `select.tsx:41-42`: `dark:bg-input/30` is emitted after `data-[variant=qatt]:bg-card` (custom variants sort later), so in dark the qatt fill is never `bg-card`. Use `dark:data-[variant=qatt]:bg-card` if the card fill is intended. Contrast is unaffected: the 2px rule is `--input`, at 3.52:1 dark and 3.65:1 light.
- **n7** `select.tsx:78`: `data-[side=left|right]` slide-ins are missing (animation only). Arabic typeahead could not be verified without runtime, so keep it in the e2e list.
- **n8** `pagination.tsx:95` and `breadcrumb.tsx:98`: the ellipsis wrapper is `aria-hidden`, so its `sr-only` label is never announced (an inherited upstream bug). Either drop `aria-hidden` and set `role="img"` with an `aria-label`, or drop the dead label. The English defaults "More pages"/"More" stay as tracked `TODO(ar-copy)`.
- **n9** `use-direction.ts:36`: a provider `ltr` cannot override a DOM `rtl`. Base UI's default `ltr` is indistinguishable from an explicit one, so an LTR island inside the Arabic site, like `<DirectionProvider direction="ltr">`, would still resolve `rtl` for Sheet and Toaster. This is low risk today, because the site sets the provider from `[lang]`. Document it, or pass a `ref` from Sheet and Toaster.

## Spec and token changes made (docs/agents/ux-ui only)

- `component-specs.md` §2:
  - **button:** green tone removed, painted text colours per mode stated, and the painted hover rule (color-mix toward ink, never `/90`) added. The a11y note now requires 4.5:1 in rest **and** hover.
  - **badge:** the `pigment` tones are listed (no green).
  - **avatar:** the `tone` set is narrowed to red/blue/ink/yellow/orange.
  - **sonner:** the D-011 focus requirement is spelled out.
  - **tooltip:** physical sides must stay styled.
- `design-tokens.md` §4 (light table, `qatt-white` on `qatt-green`): a note says there are no green UI fills with text.
- For the decision log (orchestrator to record): **D-026 — Green painted button dropped; painted hover via color-mix toward ink** (UX/UI, a11y). This confirms D-025 (1)–(3).
