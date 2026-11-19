# Design Tokens — Qatt UI (قَطّ)

Author: UX/UI Agent (وكيل تجربة وواجهة المستخدم) · 2026-11-19 · Status: **proposal for Phase 2 gate**
Files: [`tokens.css`](./tokens.css) (drop-in, generated) · [`motifs.json`](./motifs.json) · [`motifs/*.svg`](./motifs/) · [`tools/`](./tools/) (generators + contrast checker)

> Heritage wins on cultural meaning and Arabic. UX/UI wins on usability and a11y.
> Pigment hexes are **approximate, project interpretation** (`motif-catalog.md` §Palette). Dark mode is **my own interpretation ("night majlis")**, not a heritage claim.

---

## 1. Concept

| Mode | Idea | What it means for the UI |
|---|---|---|
| **Light — "the gypsum wall" (الجصّ)** | A white, slightly warm gypsum ground with bold, flat painted accents. | Warm off-white page; near-black charcoal text; Meshiga red as the brand/primary; Nila blue for focus and links-in-context; yellow, green and orange stay decorative. |
| **Dark — "night majlis" (مجلس الليل)** *(UX/UI interpretation)* | The same guest room after dark, lit by a lamp: walls fall into warm soot-brown shadow and the painted bands glow. | Warm soot background (never pure black), lamplit gypsum text, pigments lifted in lightness so they read on the dark wall. The structural "black" lines of the motifs swap to gypsum via the `--qatt-ink` role. |

No desert, dunes or camels. If imagery is ever needed: Asir's mountains, terraces, stone-and-mud tower houses, fog on the escarpment, or the wall itself.

---

## 2. shadcn tokens (OKLCH)

All values are in [`tokens.css`](./tokens.css). Contrast ratios are in §4.

| Token | Light | Dark | Role / rationale |
|---|---|---|---|
| `--background` | `oklch(0.972 0.012 85)` | `oklch(0.185 0.012 55)` | Gypsum wall / night wall. Warm hue 85 (light) and 55 (dark) so it never feels clinical. |
| `--foreground` | `oklch(0.22 0.014 55)` | `oklch(0.93 0.016 85)` | Charcoal (فحم) / lamplit gypsum. |
| `--card` / `--popover` | `0.99 0.006 85` / same | `0.22 0.013 55` / `0.245 0.014 55` | Cards are a fresher coat of gypsum. In dark, popovers sit one step lighter than cards for elevation without shadows. |
| `--primary` | `oklch(0.5 0.163 31)` | `oklch(0.68 0.15 33)` | **Meshiga red** (أحمر المَشقة). The brand. |
| `--primary-foreground` | `oklch(0.985 0.008 85)` | `oklch(0.17 0.012 55)` | Gypsum on red / soot on lifted red. |
| `--secondary` (+fg) | `0.925 0.05 88` / `0.27 0.03 60` | `0.30 0.04 75` / `0.93 0.03 85` | A pale **safra** wash; yellow is used as a *surface*, never as text. |
| `--muted` (+fg) | `0.935 0.014 80` / `0.47 0.022 60` | `0.265 0.012 55` / `0.74 0.02 75` | Captions, helper text, disabled-looking surfaces. Muted-fg passes 4.5:1 on background, card, muted and sidebar. |
| `--accent` (+fg) | `0.93 0.028 250` / `0.33 0.085 255` | `0.30 0.045 250` / `0.91 0.03 250` | Pale **nila** (blue) for hover/selected rows, menu highlights. Gives a cool counterpoint to the red so "hover" never looks like "primary". |
| `--destructive` (+fg) | `0.5 0.19 18` / gypsum | `0.70 0.17 20` / soot | Crimson, shifted toward magenta from the brand red. See §3.1. |
| `--border` | `oklch(0.875 0.02 75)` | `oklch(0.32 0.014 60)` | Decorative hairlines (cards, separators). Not relied on to identify controls. |
| `--input` | `oklch(0.6 0.02 65)` | `oklch(0.53 0.018 65)` | **Darker than shadcn default on purpose**: input, checkbox, radio and select boundaries pass 3:1 (WCAG 1.4.11). |
| `--ring` | `oklch(0.48 0.12 252)` | `oklch(0.72 0.11 245)` | Nila blue focus ring, visible next to the red primary. Use **solid** (see §3.2). |
| `--chart-1..5` | red `0.5 0.163 31`, blue `0.47 0.11 252`, ochre `0.62 0.13 75`, green `0.52 0.11 135`, orange `0.6 0.15 48` | lifted: `0.68 0.15 33`, `0.7 0.1 245`, `0.8 0.13 82`, `0.72 0.12 135`, `0.74 0.14 55` | The pigment set, darkened/lifted so every series passes 3:1 against the card. Chart 3 is a deeper ochre, not the decorative yellow. |
| `--sidebar` | `oklch(0.952 0.015 82)` | `oklch(0.205 0.013 55)` | One step off the page, like a plastered bench (دكّة) along the wall. |
| `--sidebar-foreground` | = foreground | = foreground | |
| `--sidebar-primary` (+fg) | = primary (+fg) | = primary (+fg) | Active docs nav item. |
| `--sidebar-accent` (+fg) | `0.915 0.022 80` / foreground | `0.28 0.016 55` / foreground | Hover row in the docs nav. |
| `--sidebar-border` / `--sidebar-ring` | = border / = ring | = border / = ring | |
| `--radius` | `0.375rem` (6px) | — | Small, hand-cut corners. `sm/md/lg/xl` = ×0.6 / ×0.8 / ×1 / ×1.4 → 3.6 / 4.8 / 6 / 8.4px. |

### 2.1 Qatt pigment tokens (motif slots, decoration)

Light values are the catalog hexes converted exactly to OKLCH. Dark values are pigments "seen by lamplight": lighter, slightly less chroma.

> **Naming note (Heritage, Phase 2 review):** pigment names (Meshiga red, Safra yellow, Nila blue, Alfalfa green…) are *labels* after the traditional materials listed in `motif-catalog.md` §Palette. They do not claim that the hex reproduces that pigment or that every wall used it. The blue in particular has a **conflicting** traditional source (indigo / powdered rock / only with commercial paint), so «النيلة / Nila» is a label, not a sourcing claim. Dark values are project interpretation.

| Token | Arabic | Light | Dark | Carries text? |
|---|---|---|---|---|
| `--qatt-white` (alias `--qatt-jiss`) | جصّ | `oklch(0.953 0.016 86.4)` `#F4EFE4` | `oklch(0.88 0.02 85)` | As text on red/blue/black paint: yes. |
| `--qatt-red` | أحمر المَشقة | `oklch(0.494 0.155 28.1)` `#A8322A` | `oklch(0.62 0.15 31)` | Yes (6.1:1 light, 4.8:1 dark). |
| `--qatt-yellow` | أصفر الصَّفرة | `oklch(0.749 0.142 82.9)` `#D9A42B` | `oklch(0.8 0.13 82)` | **Light: no (2.1:1) → decorative only.** Dark: yes. Charcoal text *on* yellow paint passes (7.6:1). |
| `--qatt-black` | أسود الفحم | `oklch(0.225 0.01 67.3)` `#1F1B17` | `oklch(0.36 0.014 55)` | Light: yes. **Dark: decorative only** (a soot band on the night wall, 1.7:1). |
| `--qatt-blue` | أزرق النيلة | `oklch(0.46 0.096 252.7)` `#2D5A8C` | `oklch(0.62 0.1 250)` | Yes. |
| `--qatt-green` | أخضر البرسيم | `oklch(0.539 0.11 137.2)` `#4E7D3A` | `oklch(0.66 0.11 135)` | **Light: large text only (4.49:1)** → treat as decorative. Dark: yes. |
| `--qatt-orange` | برتقالي | `oklch(0.635 0.152 47.8)` `#D2692A` | `oklch(0.7 0.14 50)` | **Light: large text only (3.35:1)** → decorative. Charcoal on orange paint passes (4.7:1). |
| `--qatt-brown` *(optional)* | بنّي الصمغ | `oklch(0.589 0.078 68)` `#9C7448` | `oklch(0.64 0.07 70)` | Light: large only → decorative. |
| `--qatt-ink` *(role, not a pigment)* | لون الرسم (دور) | `var(--qatt-black)` | `var(--qatt-white)` | The structural line colour of motifs. Swaps in dark so outlines don't vanish into the night wall. |
| `--shadow-painted` | — | `0 3px 0 0 oklch(0.22 0.014 55 / 0.9)` | `0 3px 0 0 oklch(0 0 0 / 0.55)` | See §5. |

Tailwind utilities exposed via `@theme inline`: `bg-qatt-red`, `text-qatt-blue`, `fill-qatt-ink`, `border-qatt-yellow`, `shadow-painted`, etc.

**Rule:** a pigment that fails as text (yellow/green/orange/brown in light; black in dark) may be used for fills, bands, motif slots, icons that are *paired with a text label*, and surfaces under charcoal text. Never for body text, link text, or as the only signal of state.

---

### 2.2 Gypsum surface (D-019)

Al-Qatt is painted on white gypsum. Wherever the site **presents the heritage**, motifs render on a gypsum surface in **both** modes. This covers the About page bands and vocabulary chips, and the "faithful" swatch row on the Theme page. The night-majlis colouring is for components only.

| Token | Value (both modes) | Note |
|---|---|---|
| `--qatt-surface-gypsum` | `oklch(0.953 0.016 86.4)` (= light `--qatt-white`) | panel fill |
| `--qatt-surface-gypsum-foreground` | `oklch(0.22 0.014 55)` | 15.1:1 on the panel |
| `--qatt-surface-gypsum-muted-foreground` | `oklch(0.47 0.022 60)` | 6.0:1 on the panel |

Scope: `data-qatt-surface="gypsum"` (in `tokens.css`) turns the subtree into a **light-theme island**. It re-declares the light shadcn tokens, the light pigments, `--qatt-ink` = charcoal and the default slots. Controls inside therefore keep AA: primary 5.7:1, ring 5.7:1 and input 3.5:1 against the panel, all computed (see §4). Don't put `.dark` and `data-qatt-surface` on the same element. Where a heritage section is deliberately shown in night colours instead, it must carry the `docs.theme.darkNote` label.

## 3. Usability decisions

### 3.1 Red primary vs red destructive
Both are reds, which is a real risk. Mitigations (all required):
1. Destructive hue is crimson (18–20) vs brand brick red (31–33).
2. **Different form:** the default destructive button is the shadcn v4 tinted style (`bg-destructive/10 text-destructive`, 5.2:1 light / 4.8:1 dark), while primary is a solid fill. A solid `destructive` fill appears only inside confirm dialogs, next to a neutral "إلغاء".
3. Destructive actions always have an explicit verb label («احذف المشروع») and, where space allows, a trash/alert icon. Colour is never the only signal (WCAG 1.4.1).

### 3.2 Focus
shadcn's default `ring-ring/50` gives 2.2:1 (light) / 2.8:1 (dark) — **fails** (see table). Qatt focus style for every interactive element:

```
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
```
Solid 2px Nila-blue outline with a 2px gap of page colour, so it reads against the red primary (the ring's contrast is measured against the offset gap = background: 6.0:1 / 7.6:1). This meets WCAG 2.2 SC 2.4.11 (not obscured) and the stricter 2.4.13 focus appearance. `tokens.css` sets `outline-ring` as the base outline colour.

### 3.3 Control boundaries
`--input` passes 3:1 on background and card. `--border` (1.35:1) is only for decoration: cards and separators must remain understandable without it (spacing, headings).

### 3.4 Hit targets
Minimum 24×24px (WCAG 2.5.8); Qatt default button `h-9` (36px), icon buttons `size-9`; on touch layouts `h-10`/`size-10`.

---

## 4. Contrast table (computed)

Computed by [`tools/tokens.py`](./tools/tokens.py): OKLCH → OKLab → linear sRGB (gamut-clipped) → WCAG 2.x relative luminance. Alpha tints (`destructive/10`, `ring/50`) are composited over the background in sRGB as browsers do. Thresholds: text 4.5:1, large text / UI boundaries / focus 3:1. All values are inside the sRGB gamut (no clipping occurred).

**Result: every text/background pair and every UI boundary passes. The only failures are (a) pigments flagged decorative above, and (b) shadcn's default `ring/50`, which Qatt does not use.**

#### light

| foreground | background | ratio | need | result | note |
|---|---|---:|---|---|---|
| `foreground` | `background` | 16.00 | 4.5:1 | PASS AA | body text |
| `foreground` | `card` | 16.86 | 4.5:1 | PASS AA | card text |
| `card-foreground` | `card` | 16.86 | 4.5:1 | PASS AA |  |
| `popover-foreground` | `popover` | 16.86 | 4.5:1 | PASS AA |  |
| `primary-foreground` | `primary` | 6.23 | 4.5:1 | PASS AA | filled button label |
| `primary` | `background` | 6.00 | 4.5:1 | PASS AA | link / outline text |
| `primary` | `card` | 6.32 | 4.5:1 | PASS AA | link on card |
| `secondary-foreground` | `secondary` | 12.15 | 4.5:1 | PASS AA |  |
| `muted-foreground` | `muted` | 5.67 | 4.5:1 | PASS AA |  |
| `muted-foreground` | `background` | 6.33 | 4.5:1 | PASS AA | captions |
| `muted-foreground` | `card` | 6.67 | 4.5:1 | PASS AA |  |
| `muted-foreground` | `sidebar` | 5.96 | 4.5:1 | PASS AA |  |
| `accent-foreground` | `accent` | 10.00 | 4.5:1 | PASS AA | hover/selected item |
| `foreground` | `accent` | 14.15 | 4.5:1 | PASS AA | fg on hover item |
| `destructive-foreground` | `destructive` | 6.37 | 4.5:1 | PASS AA | filled destructive |
| `destructive` | `background` | 6.13 | 4.5:1 | PASS AA | error text |
| `destructive` | `card` | 6.46 | 4.5:1 | PASS AA |  |
| `destructive` | `destructive/10 over background` | 5.18 | 4.5:1 | PASS AA | shadcn v4 tinted destructive button |
| `foreground` | `secondary` | 13.91 | 4.5:1 | PASS AA |  |
| `sidebar-foreground` | `sidebar` | 15.08 | 4.5:1 | PASS AA |  |
| `sidebar-primary-foreground` | `sidebar-primary` | 6.23 | 4.5:1 | PASS AA |  |
| `sidebar-accent-foreground` | `sidebar-accent` | 13.48 | 4.5:1 | PASS AA |  |
| `ring` | `background` | 6.04 | 3:1 | PASS (3:1) | focus ring (1.4.11 / 2.4.13) |
| `ring` | `card` | 6.36 | 3:1 | PASS (3:1) |  |
| `ring` | `ring/50 over background` | 2.72 | - | decorative | info |
| `ring/50 over background` | `background` | 2.22 | 3:1 | FAIL | WHY: shadcn default ring-ring/50 is too faint; Qatt uses solid ring + 2px offset |
| `sidebar-ring` | `sidebar` | 5.69 | 3:1 | PASS (3:1) |  |
| `input` | `background` | 3.65 | 3:1 | PASS (3:1) | input/checkbox boundary |
| `input` | `card` | 3.85 | 3:1 | PASS (3:1) |  |
| `primary` | `background` | 6.00 | 3:1 | PASS (3:1) | filled button shape vs page |
| `chart-1` | `card` | 6.32 | 3:1 | PASS (3:1) | chart mark |
| `chart-2` | `card` | 6.64 | 3:1 | PASS (3:1) |  |
| `chart-3` | `card` | 3.62 | 3:1 | PASS (3:1) |  |
| `chart-4` | `card` | 5.14 | 3:1 | PASS (3:1) |  |
| `chart-5` | `card` | 4.06 | 3:1 | PASS (3:1) |  |
| `border` | `background` | 1.35 | - | decorative | decorative only (not relied on) |
| `qatt-red` | `background` | 6.14 | 4.5:1 | PASS AA |  |
| `qatt-black` | `background` | 15.79 | 4.5:1 | PASS AA |  |
| `qatt-blue` | `background` | 6.57 | 4.5:1 | PASS AA |  |
| `qatt-green` | `background` | 4.49 | 4.5:1 | large only |  |
| `qatt-brown` | `background` | 3.87 | 4.5:1 | large only |  |
| `qatt-yellow` | `background` | 2.08 | 4.5:1 | FAIL |  |
| `qatt-orange` | `background` | 3.35 | 4.5:1 | large only |  |
| `qatt-white` | `qatt-red` | 5.81 | 4.5:1 | PASS AA | label on red paint |
| `qatt-white` | `qatt-blue` | 6.21 | 4.5:1 | PASS AA | label on blue paint |
| `qatt-white` | `qatt-green` | 4.25 | 4.5:1 | large only | label on green paint → no green UI fills with text (button/badge/avatar; review 2026-11-19) |
| `qatt-black` | `qatt-yellow` | 7.58 | 4.5:1 | PASS AA | label on yellow paint |
| `qatt-black` | `qatt-orange` | 4.72 | 4.5:1 | PASS AA | label on orange paint |
| `qatt-white` | `qatt-black` | 14.93 | 4.5:1 | PASS AA |  |
| `qatt-ink` | `background` | 15.79 | 4.5:1 | PASS AA | ink = qatt-black in light |
| `foreground` | `qatt-white` | 15.13 | 4.5:1 | PASS AA | gypsum surface (D-019), both modes |
| `muted-foreground` | `qatt-white` | 5.98 | 4.5:1 | PASS AA | gypsum surface caption |
| `primary` | `qatt-white` | 5.67 | 4.5:1 | PASS AA | gypsum surface link |
| `ring` | `qatt-white` | 5.71 | 3:1 | PASS (3:1) | gypsum surface focus |
| `input` | `qatt-white` | 3.46 | 3:1 | PASS (3:1) | gypsum surface control boundary |

#### dark

| foreground | background | ratio | need | result | note |
|---|---|---:|---|---|---|
| `foreground` | `background` | 15.19 | 4.5:1 | PASS AA | body text |
| `foreground` | `card` | 14.12 | 4.5:1 | PASS AA | card text |
| `card-foreground` | `card` | 14.12 | 4.5:1 | PASS AA |  |
| `popover-foreground` | `popover` | 13.24 | 4.5:1 | PASS AA |  |
| `primary-foreground` | `primary` | 6.24 | 4.5:1 | PASS AA | filled button label |
| `primary` | `background` | 6.08 | 4.5:1 | PASS AA | link / outline text |
| `primary` | `card` | 5.65 | 4.5:1 | PASS AA | link on card |
| `secondary-foreground` | `secondary` | 11.15 | 4.5:1 | PASS AA |  |
| `muted-foreground` | `muted` | 6.64 | 4.5:1 | PASS AA |  |
| `muted-foreground` | `background` | 8.08 | 4.5:1 | PASS AA | captions |
| `muted-foreground` | `card` | 7.51 | 4.5:1 | PASS AA |  |
| `muted-foreground` | `sidebar` | 7.77 | 4.5:1 | PASS AA |  |
| `accent-foreground` | `accent` | 10.44 | 4.5:1 | PASS AA | hover/selected item |
| `foreground` | `accent` | 11.07 | 4.5:1 | PASS AA | fg on hover item |
| `destructive-foreground` | `destructive` | 6.63 | 4.5:1 | PASS AA | filled destructive |
| `destructive` | `background` | 6.46 | 4.5:1 | PASS AA | error text |
| `destructive` | `card` | 6.01 | 4.5:1 | PASS AA |  |
| `destructive` | `destructive/10 over background` | 4.82 | 4.5:1 | PASS AA | shadcn v4 tinted destructive button |
| `foreground` | `secondary` | 11.15 | 4.5:1 | PASS AA |  |
| `sidebar-foreground` | `sidebar` | 14.60 | 4.5:1 | PASS AA |  |
| `sidebar-primary-foreground` | `sidebar-primary` | 6.24 | 4.5:1 | PASS AA |  |
| `sidebar-accent-foreground` | `sidebar-accent` | 11.92 | 4.5:1 | PASS AA |  |
| `ring` | `background` | 7.60 | 3:1 | PASS (3:1) | focus ring (1.4.11 / 2.4.13) |
| `ring` | `card` | 7.07 | 3:1 | PASS (3:1) |  |
| `ring` | `ring/50 over background` | 2.76 | - | decorative | info |
| `ring/50 over background` | `background` | 2.76 | 3:1 | FAIL | WHY: shadcn default ring-ring/50 is too faint; Qatt uses solid ring + 2px offset |
| `sidebar-ring` | `sidebar` | 7.31 | 3:1 | PASS (3:1) |  |
| `input` | `background` | 3.52 | 3:1 | PASS (3:1) | input/checkbox boundary |
| `input` | `card` | 3.27 | 3:1 | PASS (3:1) |  |
| `primary` | `background` | 6.08 | 3:1 | PASS (3:1) | filled button shape vs page |
| `chart-1` | `card` | 5.65 | 3:1 | PASS (3:1) | chart mark |
| `chart-2` | `card` | 6.56 | 3:1 | PASS (3:1) |  |
| `chart-3` | `card` | 9.19 | 3:1 | PASS (3:1) |  |
| `chart-4` | `card` | 7.27 | 3:1 | PASS (3:1) |  |
| `chart-5` | `card` | 7.23 | 3:1 | PASS (3:1) |  |
| `border` | `background` | 1.47 | - | decorative | decorative only (not relied on) |
| `qatt-red` | `background` | 4.79 | 4.5:1 | PASS AA |  |
| `qatt-yellow` | `background` | 9.89 | 4.5:1 | PASS AA |  |
| `qatt-blue` | `background` | 5.15 | 4.5:1 | PASS AA |  |
| `qatt-green` | `background` | 6.23 | 4.5:1 | PASS AA |  |
| `qatt-orange` | `background` | 6.68 | 4.5:1 | PASS AA |  |
| `qatt-white` | `background` | 13.00 | 4.5:1 | PASS AA |  |
| `qatt-black` | `background` | 1.71 | - | decorative | decorative: soot band on night wall |
| `qatt-ink` | `background` | 13.00 | 3:1 | PASS (3:1) | ink = qatt-white in dark |
| `background` | `qatt-yellow` | 9.89 | 4.5:1 | PASS AA | dark label on yellow paint |
| `background` | `qatt-red` | 4.79 | 4.5:1 | PASS AA | dark label on red paint |
| `background` | `qatt-white` | 13.00 | 4.5:1 | PASS AA |  |

#### sRGB hex reference (computed; for design tools only — CSS uses OKLCH)

| token | light | light hex | dark | dark hex |
|---|---|---|---|---|
| `--background` | `oklch(0.972 0.012 85)` | `#F9F5ED` | `oklch(0.185 0.012 55)` | `#17110E` |
| `--foreground` | `oklch(0.22 0.014 55)` | `#201914` | `oklch(0.93 0.016 85)` | `#EDE7DC` |
| `--card` | `oklch(0.99 0.006 85)` | `#FEFCF7` | `oklch(0.22 0.013 55)` | `#201915` |
| `--card-foreground` | `oklch(0.22 0.014 55)` | `#201914` | `oklch(0.93 0.016 85)` | `#EDE7DC` |
| `--popover` | `oklch(0.99 0.006 85)` | `#FEFCF7` | `oklch(0.245 0.014 55)` | `#261F1A` |
| `--popover-foreground` | `oklch(0.22 0.014 55)` | `#201914` | `oklch(0.93 0.016 85)` | `#EDE7DC` |
| `--primary` | `oklch(0.5 0.163 31)` | `#AD3120` | `oklch(0.68 0.15 33)` | `#E57159` |
| `--primary-foreground` | `oklch(0.985 0.008 85)` | `#FDFAF4` | `oklch(0.17 0.012 55)` | `#140E0A` |
| `--secondary` | `oklch(0.925 0.05 88)` | `#F4E5C1` | `oklch(0.3 0.04 75)` | `#3A2B16` |
| `--secondary-foreground` | `oklch(0.27 0.03 60)` | `#312317` | `oklch(0.93 0.03 85)` | `#F1E7D2` |
| `--muted` | `oklch(0.935 0.014 80)` | `#EEE9DF` | `oklch(0.265 0.012 55)` | `#2A2420` |
| `--muted-foreground` | `oklch(0.47 0.022 60)` | `#64584F` | `oklch(0.74 0.02 75)` | `#B2A99D` |
| `--accent` | `oklch(0.93 0.028 250)` | `#DAEAFA` | `oklch(0.3 0.045 250)` | `#1C2F44` |
| `--accent-foreground` | `oklch(0.33 0.085 255)` | `#123560` | `oklch(0.91 0.03 250)` | `#D3E3F5` |
| `--destructive` | `oklch(0.5 0.19 18)` | `#B61537` | `oklch(0.7 0.17 20)` | `#F66B71` |
| `--destructive-foreground` | `oklch(0.985 0.008 85)` | `#FDFAF4` | `oklch(0.17 0.012 55)` | `#140E0A` |
| `--border` | `oklch(0.875 0.02 75)` | `#DED4C8` | `oklch(0.32 0.014 60)` | `#38312C` |
| `--input` | `oklch(0.6 0.02 65)` | `#897E74` | `oklch(0.53 0.018 65)` | `#736A61` |
| `--ring` | `oklch(0.48 0.12 252)` | `#205F9F` | `oklch(0.72 0.11 245)` | `#66ABE5` |
| `--chart-1` | `oklch(0.5 0.163 31)` | `#AD3120` | `oklch(0.68 0.15 33)` | `#E57159` |
| `--chart-2` | `oklch(0.47 0.11 252)` | `#255D96` | `oklch(0.7 0.1 245)` | `#67A5D9` |
| `--chart-3` | `oklch(0.62 0.13 75)` | `#B37903` | `oklch(0.8 0.13 82)` | `#E7B551` |
| `--chart-4` | `oklch(0.52 0.11 135)` | `#4C7731` | `oklch(0.72 0.12 135)` | `#83B567` |
| `--chart-5` | `oklch(0.6 0.15 48)` | `#C55F1D` | `oklch(0.74 0.14 55)` | `#ED914C` |
| `--sidebar` | `oklch(0.952 0.015 82)` | `#F4EEE4` | `oklch(0.205 0.013 55)` | `#1C1612` |
| `--sidebar-foreground` | `oklch(0.22 0.014 55)` | `#201914` | `oklch(0.93 0.016 85)` | `#EDE7DC` |
| `--sidebar-primary` | `oklch(0.5 0.163 31)` | `#AD3120` | `oklch(0.68 0.15 33)` | `#E57159` |
| `--sidebar-primary-foreground` | `oklch(0.985 0.008 85)` | `#FDFAF4` | `oklch(0.17 0.012 55)` | `#140E0A` |
| `--sidebar-accent` | `oklch(0.915 0.022 80)` | `#EBE2D3` | `oklch(0.28 0.016 55)` | `#2F2721` |
| `--sidebar-accent-foreground` | `oklch(0.22 0.014 55)` | `#201914` | `oklch(0.93 0.016 85)` | `#EDE7DC` |
| `--sidebar-border` | `oklch(0.875 0.02 75)` | `#DED4C8` | `oklch(0.32 0.014 60)` | `#38312C` |
| `--sidebar-ring` | `oklch(0.48 0.12 252)` | `#205F9F` | `oklch(0.72 0.11 245)` | `#66ABE5` |
| `--qatt-white` | `oklch(0.953 0.016 86.4)` | `#F4EFE4` | `oklch(0.88 0.02 85)` | `#DDD7C9` |
| `--qatt-red` | `oklch(0.494 0.155 28.1)` | `#A8322A` | `oklch(0.62 0.15 31)` | `#D15D4B` |
| `--qatt-yellow` | `oklch(0.749 0.142 82.9)` | `#D9A42B` | `oklch(0.8 0.13 82)` | `#E7B551` |
| `--qatt-black` | `oklch(0.225 0.01 67.3)` | `#1F1B17` | `oklch(0.36 0.014 55)` | `#433B36` |
| `--qatt-blue` | `oklch(0.46 0.096 252.7)` | `#2D5A8C` | `oklch(0.62 0.1 250)` | `#558AC0` |
| `--qatt-green` | `oklch(0.539 0.11 137.2)` | `#4E7D3A` | `oklch(0.66 0.11 135)` | `#74A15B` |
| `--qatt-orange` | `oklch(0.635 0.152 47.8)` | `#D2692A` | `oklch(0.7 0.14 50)` | `#E28247` |
| `--qatt-brown` | `oklch(0.589 0.078 68)` | `#9C7448` | `oklch(0.64 0.07 70)` | `#A8855D` |

---

## 5. Shape, borders, elevation — "painted, not glossy"

| Property | Value | Notes |
|---|---|---|
| Radius | `--radius: 0.375rem` | Buttons/inputs `rounded-md` (4.8px), cards `rounded-lg` (6px), dialogs `rounded-xl` (8.4px). Badges `rounded-sm`. Avatars stay `rounded-full`. |
| Border width | 1px default; **2px** for `qatt`/`painted` variants | A thicker line reads as a brush stroke. |
| Shadows | **No blurred or glossy shadows.** Replace shadcn `shadow-xs/sm/md` with `shadow-none`, except `--shadow-painted`. | |
| `--shadow-painted` | `0 3px 0 0 <charcoal>` | A flat, offset "second coat" under painted buttons/cards. Offset is **vertical only**, so it is direction-neutral (no RTL handling). On `:active` remove it and `translate-y-[3px]` → a pressed paint chip. |
| Overlays | `bg-foreground/40` (light) / `bg-black/60` (dark), no backdrop blur by default | Blur is optional; it costs performance and looks glossy. |
| Gradients | None, except motif fills | Pigments are flat. |

---

## 6. Typography

### 6.1 Families (all SIL Open Font License 1.1 — free for commercial use, embedding and modification)

| Role | Family | Why | Scripts | Weights | Source / licence evidence |
|---|---|---|---|---|---|
| **Body / UI** `--font-sans` | **IBM Plex Sans Arabic** | Very legible at small UI sizes, open counters, clear dots; its Latin is IBM Plex Sans, so mixed Arabic/Latin lines (shadcn, Tailwind, npm) match. | Arabic + Latin | 400, 500, 600, 700 | Google Fonts; `google/fonts` repo path `ofl/ibmplexsansarabic` (OFL). `next/font/google`: `IBM_Plex_Sans_Arabic` |
| **Display / headings** `--font-heading` | **Readex Pro** | Geometric, Kufi-flavoured Arabic: its straight strokes and even rhythm echo the ruled bands of al-qatt without being a pastiche. Latin is Lexend-derived and matches it. Variable weight axis. | Arabic + Latin | variable 160–700 (use 500–700) | Google Fonts; `ofl/readexpro` (OFL). `next/font/google`: `Readex_Pro` |
| **Code** `--font-mono` | **IBM Plex Mono** | Same family as the body; clear `0/O`, `1/l`. Code is always LTR. | Latin | 400, 500 | Google Fonts; `ofl/ibmplexmono` (OFL). `next/font/google`: `IBM_Plex_Mono` |

Rejected: Noto Kufi Arabic for display (fine and OFL, but its Latin pairing with Plex is weaker and it is heavier at the same weight); any "Arabian Nights" or calligraphic display face (cliché, poor UI legibility).

> Licence status: OFL for all three per the Google Fonts catalogue (`ofl/` directory). Developer: include the `OFL.txt` attribution in `LICENSE-THIRD-PARTY` when self-hosting via fontsource; `next/font` self-hosts at build time, which OFL permits.

### 6.2 Loading (Next 16)

```ts
// app/fonts.ts
import { IBM_Plex_Sans_Arabic, Readex_Pro, IBM_Plex_Mono } from "next/font/google"

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic", display: "swap",
})
export const readex = Readex_Pro({
  subsets: ["arabic", "latin"], weight: "variable",
  variable: "--font-readex", display: "swap",
})
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"], weight: ["400", "500"],
  variable: "--font-plex-mono", display: "swap",
})
// <html lang="ar" dir="rtl" className={`${plexArabic.variable} ${readex.variable} ${plexMono.variable}`}>
```

`tokens.css` maps them in `@theme inline` (`--font-sans`, `--font-heading`, `--font-mono`) with name fallbacks, so it also works when fonts come from fontsource.
**Registry (D-004):** recommend three `registry:font` items: `qatt-font` (Plex Sans Arabic → `--font-sans`), `qatt-font-heading` (Readex Pro → `--font-heading`), `qatt-font-mono` (optional). If the CLI writes the font straight to `--font-sans`, delete the matching `--font-sans:` line from `@theme inline` to avoid a self-reference.

### 6.3 Arabic typesetting rules

| Rule | Value |
|---|---|
| Body line-height | **1.75** (range 1.7–1.8). Arabic needs room for dots, hamza and diacritics above and below. Latin-only blocks (`:lang(en)`) 1.6. |
| Headings line-height | 1.35 (h1–h2), 1.4 (h3–h4) |
| Letter-spacing | **0 for Arabic, always.** Tracking breaks the joined script. Never use `tracking-*` on Arabic; Tailwind's `tracking-tight` on headings must be removed from restyled components. Small Latin caps labels may use `tracking-wide` only inside `lang="en"`. |
| Italics | None for Arabic (no true italic). Emphasise with weight 600/700 or colour. |
| Uppercase | Never `uppercase` on mixed content; shadcn components that use it (e.g. some labels) drop it. |
| Minimum size | 12px absolute minimum (badges, footnotes); prefer ≥ 14px for UI labels, 16px body. |
| Underlines | `underline-offset-4 decoration-1` so the line clears dots below letters (ب، ي، ج). |
| Wrapping | `text-wrap: balance` on headings, `pretty` on paragraphs; no `hyphens` (no Arabic hyphenation). |
| Kashida/justify | Do not justify Arabic body text in UI (`text-start`). |
| Digits | Western 0–9 by default (D-008). Arabic-Indic via `formatNumber(n, { numerals: "arab" })` in `qatt-utils`, never via CSS. Use `tabular-nums` in tables and stats. |
| Mixed direction | Wrap Latin/brand names and code inside Arabic sentences in `<bdi>` or `dir="ltr"` (see §7). |

### 6.4 Type scale (rem / px / line-height)

| Token | Size | LH | Font | Use |
|---|---|---|---|---|
| `text-xs` | 0.75 / 12 | 1.6 | sans 500 | badge, kbd, footnote |
| `text-sm` | 0.875 / 14 | 1.7 | sans 400/500 | UI labels, buttons, table |
| `text-base` | 1 / 16 | 1.75 | sans 400 | body |
| `text-lg` | 1.125 / 18 | 1.7 | sans 400 | docs prose lead, card titles |
| `text-xl` | 1.25 / 20 | 1.6 | heading 600 | h4 |
| `text-2xl` | 1.5 / 24 | 1.45 | heading 600 | h3 |
| `text-3xl` | 1.875 / 30 | 1.4 | heading 700 | h2 |
| `text-4xl` | 2.25 / 36 | 1.35 | heading 700 | h1 (docs) |
| `text-5xl` – `text-6xl` | 3 – 3.75 / 48 – 60 | 1.2 | heading 700 | hero, 404 code, stats |

---

## 7. RTL rules (binding for every registry item and site page)

1. **Document:** `<html lang="ar" dir="rtl">` (Fumadocs: also `<RootProvider dir="rtl">`). English pages: `lang="en" dir="ltr"`. Components never hard-code `dir` except on code (rule 5).
2. **Logical properties only** — the Developer's lint already bans physical classes:

   | Don't | Do |
   |---|---|
   | `ml-* mr-*`, `pl-* pr-*` | `ms-* me-*`, `ps-* pe-*` |
   | `left-* right-*` | `start-* end-*` (`inset-inline-*`) |
   | `text-left text-right` | `text-start text-end` |
   | `border-l border-r`, `rounded-l-* rounded-r-*` | `border-s border-e`, `rounded-s-* rounded-e-*` |
   | `float-left`, `origin-left` | `float-start`, `origin-[inline-start]` / per-dir variants |
   | `space-x-*` (fine in v4 — uses margin-inline) | prefer `gap-*` |
   | `translate-x-*` for slide-ins | `rtl:` counterpart (e.g. `translate-x-full rtl:-translate-x-full`) or Base UI's direction-aware positioning |

3. **Directional icons flip** with `rtl:rotate-180` (or `rtl:-scale-x-100` for asymmetric glyphs):
   - **Flip:** `ChevronLeft/Right` (breadcrumb separator, pagination prev/next, carousel, "next/previous page" links in docs, submenu indicators, sidebar collapse), `ArrowLeft/Right` (CTA "ابدأ الآن ←", back links, "read the story"), `ChevronsLeft/Right` (first/last page), `PanelLeft/PanelRight` (sidebar toggle), `CornerDownLeft`, `Undo/Redo` (the curve direction), `LogIn/LogOut`, `Reply/Forward`, list-indent icons, quote marks in testimonials.
   - **Never flip:** `ChevronDown/Up` (accordion, select), `Check`, `X`, `Search`, `Plus/Minus`, media `Play` (play is universally right-pointing; keep it), clocks/refresh (circular), logos/brand marks (GitHub), `Copy`, `Sun/Moon`, `ExternalLink` arrow (keep — it signals "out", not reading direction; Heritage may revisit), and **all motifs except per rule 6**.
   - Use semantic naming in code: `<ChevronStart/>` / `<ChevronEnd/>` wrappers so authors don't have to think.
4. **Prev/next semantics:** "السابق" sits at inline-start (right in RTL) with a chevron pointing to inline-start (→ in RTL). "التالي" at inline-end with ←. Keyboard arrows in tabs/menus/sliders follow the visual direction (Base UI handles this when given `dir`; verify with `DirectionProvider`).
5. **Code is always LTR:** every `<pre>`, inline code containing paths/commands, install command tabs, props tables' "type"/"default" cells, URLs, version numbers and file names get `dir="ltr"` (inline: `<bdi dir="ltr">` or `.qatt-ltr`). Copy buttons sit at inline-end of the *page* (i.e. left edge in RTL), consistent across code blocks.
6. **Motifs:** all motifs are mirror-safe (identical under reflection, at most a phase shift for alternating colours) **except `sawtooth`, which never mirrors (D-007)**: the same artwork in LTR and RTL. Pattern components ignore `dir`, except that end-caps (`khatmah`) and paint-reveal origins use logical positions. If a consumer wants sawtooth to "point" in the reading direction, they opt in with `rtl:-scale-x-100` themselves.
7. **Overlays:** `Sheet side="start" | "end"` (logical, mapped to Base UI). Default docs mobile nav opens from `start` (right in RTL). Toasts (sonner) default to `bottom-left` in RTL = `bottom-end` logically; tooltips/popovers use `side="inline-start/inline-end"` where offered, otherwise `top/bottom`.
8. **Numbers & mixed text:** `<bdi>` around user names, brand names, numbers with units ("16px") and anything that could start with a Latin character inside an Arabic sentence. Phone numbers, emails, URLs, passwords inputs: `dir="ltr"` on the input with `text-end` placeholder alignment kept readable (`placeholder:text-start` in RTL context).
9. **Inputs:** text inputs inherit `dir="rtl"`; add `dir="auto"` for user-generated free text (comments, search) so Latin text aligns naturally.
10. **Testing:** every component story/preview renders in both `dir="rtl"` and `dir="ltr"` (the docs RTL/LTR toggle). Playwright snapshots both.

---

## 8. Motif slot convention

Each motif SVG paints with exactly these four CSS variables (with literal fallbacks so the file renders standalone):

| Slot | Catalog role | Fallback | Global default (`tokens.css`) |
|---|---|---|---|
| `--qatt-slot-1` | **A** — main fill | `#A8322A` (red) | `var(--qatt-red)` |
| `--qatt-slot-2` | **B** — second fill / accent strokes | `#1F1B17` (charcoal) | `var(--qatt-ink)` (charcoal in light, gypsum in dark) |
| `--qatt-slot-3` | **C** — third colour | `#D9A42B` (yellow) | `var(--qatt-yellow)` |
| `--qatt-slot-4` | **ground** — tile background rect | `transparent` | `transparent` (the surface shows through) |

- Every SVG starts with `<rect … fill="var(--qatt-slot-4, transparent)"/>`, then the shapes. `aria-hidden="true" focusable="false"`, `viewBox` = tile, no `<style>`, no ids (safe to inline many times).
- Each motif in `motifs.json` has `defaultSlots` (pigment names such as `["red","ink"]`) — the recommended colouring from the catalog. Components resolve a name `n` to `var(--qatt-n)` and set `--qatt-slot-k` inline.
- **CSS variables only work when the SVG is in the DOM** (inline `<svg><pattern>`). For `background-image: url("data:…")` the Developer must substitute resolved colours at build/run time (`motifToDataUri(id, colors)` in the lib). Prefer inline `<pattern>` so themes and dark mode just work.
- `motifs.json` fields: `id, arabicName, englishName, traditionalName (bool), width, height, repeat ("x"|"xy"|"none"), slots (colour slots excl. ground), defaultSlots, mirror (true = mirror-safe), flipInRtl (always false), uses (band|border|background|corner|cap), markup (inner SVG string), variants[], file, note, projectExtension (true only for `stepped`), aboutVocabulary (true = may appear in the About page vocabulary chips; false for `sawtooth` and `stepped`)`.

| id | Arabic | tile | repeat | slots | mirror-safe | default slots | uses |
|---|---|---|---|---|---|---|---|
| `kaff` | الكَفّ | 8×32 | x | 2 | yes | red, ink *(Phase 2 R1: red band + ink line, so the band never becomes a bright gypsum slab on dark pages)* | band, border |
| `qatt-lines` | القَطّ | 8×40 | x | 3 | yes | red, yellow, ink | band, border |
| `mathalith-makhamis` (+`-5`) | المثالث والمخامس | 8×16 (8×24) | x | 1 | yes | ink | band, border |
| `rukun` | الرُّكون | 48×24 | x | 2 | yes | red, ink | band, border |
| `banat` | البَنات | 16×24 | x | 2 | yes | red, green | band, border |
| `balsanah` | البَلْسَنة | 24×24 | xy | 2 | yes | blue, yellow | band, background |
| `amshat` (+`-alternate`) | الأمشاط | 8×24 (16×24) | x | 1 (2) | yes | ink | band, border |
| `taadheeq` | التَّعذيق | 24×32 | x | 2 | yes | red, yellow | band, corner |
| `mahareeb` | المَحاريب | 24×32 | x | 2 | yes | ink, yellow | band, border, corner |
| `sankroli` | سَنكرولي | 24×32 | x | 3 | yes | red, ink, yellow | band, background |
| `shabakah` (+`-lattice`) | الشَّبَكة | 16×16 | xy | 1 | yes | ink | background |
| `hanash` (+`-wave`) | الحَنَش | 12×12 (24×12) | x | 1 | yes | red | band, border |
| `khatmah` | الخَتْمة | 24×24 | none | 3 | yes | ink, red, yellow | corner, cap |
| `sawtooth` (+`-alternate`) | المنشار *(descriptive)* | 24×24 (48×24) | x | 1 (2) | **no — never flipped** | ink | band |
| `stepped` | المدرّج *(descriptive, project extension, D-020)* | 24×24 | x | 1 | yes | red | band |

`aryash` is **not drawn** (form conflicting, per catalog).

**Heritage usage rules (Phase 2 review):**
- **`banat` stays plant-like (D-021).** The sprig in slot-2 is green (default) or yellow. Never add a dot or "head" above it, and never describe, stylise or animate it as a figure. The name means "the girls", so a figurative reading would become a caricature. This applies to every use: `badge variant="banat"`, `card variant="framed"`, `majlis-welcome`, and the docs.
- **`stepped` is always labelled a project extension (D-020).** Every surface that shows it also shows `docs.patterns.extensionLabel`. It never appears in the About page vocabulary chips (`aboutVocabulary: false`). It is never placed as a wall band beside traditional bands. It may appear on About only as a terrace-landscape illustration, with no caption calling it a motif of Al-Qatt.
- **`sawtooth`** is also descriptive, excluded from vocabulary chips, and never flipped (D-007).

**Seam fixes vs catalog geometry** (shapes unchanged, only how strokes meet the tile edge): `shabakah-lattice` is drawn as an X whose diagonals run past the tile corners (the catalog's diamond with vertices on the edges leaves tiny wedge gaps where clipped miter joins meet); `hanash` and `hanash-wave` extend one half-period beyond each edge so joins are drawn whole in both neighbouring tiles. All 20 tiles were rendered in headless Chrome as repeated bands (light, dark, and horizontally mirrored) and checked for seams.

---

## 9. Motion

One idea only: **the paint stroke.** Things are "painted on", never bounced, zoomed or glowed.

| Token / utility | Value | Used by |
|---|---|---|
| `--animate-qatt-paint` / `.qatt-paint-reveal` | 600ms `cubic-bezier(0.3, 0.7, 0.4, 1)`; `clip-path: inset()` grows from **inline-start** (left in LTR, right in RTL) | `qatt-border`, `qatt-divider`, hero band — once, on first entering the viewport |
| Stroke draw | `stroke-dasharray`/`stroke-dashoffset` from path length → 0, 700ms same easing | `qatt-frame` arch outline, `sankroli`/`hanash` strokes |
| UI transitions | 150ms ease-out colour/opacity; overlays use shadcn/Base UI fade + 4px slide (logical) | buttons, dialogs, sheets, tooltips |
| Stagger | ≤ 60ms between sibling bands, max 4 bands | hero, `qatt-footer` |

Rules:
- **`prefers-reduced-motion: reduce` → no reveal, no draw, no slide.** Elements render in their final state immediately (`tokens.css` handles `.qatt-paint-reveal` and anything with `[data-qatt-motion]`). Opacity fades ≤ 150ms may remain.
- Motion runs once per page view (IntersectionObserver, `once: true`), never loops, never on scroll-linked parallax.
- Nothing content-bearing is hidden waiting for an animation; the reveal applies only to decoration (`aria-hidden`), so a failed/blocked animation never hides text.
- Components expose `animate?: boolean` (default `false` for library items, `true` in marketing blocks).
