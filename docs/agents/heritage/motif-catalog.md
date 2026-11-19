# Motif Catalog: Qatt UI

Source of truth for pattern artwork in `qatt-pattern`, `qatt-border`, `qatt-divider`, `qatt-frame` and `qatt-corner`.
Citations `[S#]` refer to the source list in `heritage-brief.md`. **[S14]** is AACIA 2024 (Al-Omari), summarised in `source-aacia-2024.md`. Entries marked **[S14 update]** were revised on 2026-11-19. Geometry marked *proposed* still has to be synced into `ux-ui/motifs.json` by UX/UI.

> **Read first.**
> - **Names** marked `verified` come from the cited sources.
> - **Geometry is always `project interpretation`.** No source publishes canonical proportions. The tiles below are original, minimal reconstructions of the shapes the sources describe ("triangles", "rhombus", "parallel lines" and so on). They are not traced from any mural.
> - **Meanings** are given only where a source states one. Otherwise the entry reads "no verified meaning".

## Conventions

- Units are SVG user units. Each tile's `viewBox` is `0 0 W H`.
- Tiles are designed on a 4-unit grid so they scale cleanly. Recommended render: 1 unit = 1px at default density, or scale via `patternTransform`.
- **Repeat:** `x` means a horizontal band (use `<pattern>` with the tile width and `height` = band height). `xy` means a field.
- **Slots:** `A`, `B` and `C` are colour slots that map to palette CSS variables (below). `ground` is the white gypsum base and normally stays transparent so the surface colour shows.
- **Mirror-safe:** `yes` means the tile is identical under horizontal reflection, so it needs no RTL handling. `no` means it has a direction, and the component must decide explicitly (see the note on each).

## Palette

The hex values are **approximate, project interpretation**: on-screen evocations of natural pigments. They are not measured from any wall. All names and sources are from `heritage-brief.md` §4.

| Token | Arabic | English | Approx. hex | Traditional pigment source | Status |
|---|---|---|---|---|---|
| `--qatt-jiss` | جصّ / أبيض | Gypsum white (ground) | `#F4EFE4` | Gypsum. Glossy "al-Shawit" white = acacia gum + refined gypsum. Chalk + salt + water on ceilings | gypsum verified [S1, S2]. Recipes verified, secondary [S6, S9] |
| `--qatt-red` | أحمر المَشقة | Meshiga red | `#A8322A` | Crushed iron-rich red stone (حجر المشقة) with plant resin. Red clay "al-Hamra" with water | verified, secondary [S6, S9, S10] |
| `--qatt-yellow` | أصفر | Safra yellow | `#D9A42B` | Sulphur powder "safra" from the mountains. Pomegranate peel. Al-hurd (turmeric) | verified, secondary. Plural sources [S6, S10] |
| `--qatt-black` | أسود الفحم | Charcoal black | `#1F1B17` | Charcoal + resin. Soot from a plate over flame. Tar distilled from wild olive (العتم) | verified, secondary [S6, S9, S10] |
| `--qatt-blue` | أزرق النيلة | Nila blue | `#2D5A8C` | **Conflicting**: indigo (النيلة) [S10]. Powdered sedimentary rock [S6]. Only with commercial paint [S9]. White acacia + «زرنيخ أزرق» [S14 p. 297] | conflicting. *Naming note:* «أزرق النيلة» names one disputed source. Prefer the neutral display name «أزرق» in copy (see experience-enhancements §P6). |
| `--qatt-green` | أخضر البرسيم | Alfalfa green | `#4E7D3A` | Pounded alfalfa (البرسيم), sometimes rubbed on by hand. Qat and other plants | verified, secondary [S6, S9, S10] |
| `--qatt-orange` | برتقالي | Orange | `#D2692A` | Imported powder mixed with water and resin | verified, secondary [S6] |
| `--qatt-brown` *(optional)* | بنّي الصمغ | Gum brown | `#9C7448` | Spring sap of the *samgha* (gum) tree. Browns from rocks | verified, secondary [S9], oral testimony |

**Core set for the theme:** jiss, red, yellow, black, blue. These are the four colours Saudipedia names [S4, S5], plus the white ground. Green and orange are accents. One custodian describes the oldest triad as black, white and red [S9], which makes a good "minimal / monochrome-plus" theme variant.

**Contrast note (project):** the hex values are tuned so that black and red on jiss pass WCAG AA for text. Yellow and orange on jiss do not, so use them for decoration only.

---

## Motifs

### 1. `kaff`: base band
- **Arabic:** الكَفّ (verified [S4, S5, S7])
- **Description:** a solid horizontal band along the bottom of the wall. Saudipedia: "parallel line at the bottom of walls" [S4].
- **Geometry:** tile `8×32`, repeat `x`.
  - `rect x=0 y=8 w=8 h=24` → slot A
  - `rect x=0 y=2 w=8 h=3` → slot B (thin accent line above the band)
- **Slots:** 2. Typical fill: A = black or red, B = red or yellow.
- **Mirror-safe:** yes.
- **Placement:** the lowest band of a wall. In the UI: footers and the bottom edge of `qatt-frame`.
- **Meaning:** no verified meaning.

### 2. `qatt-lines`: stacked horizontal strokes (القط)
- **Arabic:** القَطّ (verified, as the name for the horizontal strokes beneath the main panel [S8, S11], and for the belt dividing the wall [S5])
- **Description:** several parallel horizontal stripes in alternating colours, layered below the main decorated panel.
- **Geometry:** tile `8×40`, repeat `x`. Five stripes of height 4 at `y = 0, 8, 16, 24, 32` (gaps of 4 show the ground).
  - Stripe colours top to bottom: A, B, C, A, B.
- **Slots:** 3. Typical fill: A = red, B = yellow, C = black (or blue/green as accents).
- **Mirror-safe:** yes.
- **Placement:** the band directly under the main panel, and across the middle of a wall as the dividing belt. In the UI: `qatt-divider` (default variant) and section breaks.
- **Meaning:** no verified meaning. The name derives from "cutting crosswise" [S5].

### 3. `mathalith-makhamis`: triple / quintuple lines
- **Arabic:** المثالث والمخامس (verified [S4, S5, S7])
- **Description:** a group of three (or five) thin parallel lines in one colour. Saudipedia: "three or five parallel lines" [S4]. Aramco World describes the related *motholath* as "the basic straight, simple lines" that even a modest household would paint [S9].
- **Geometry:** repeat `x`.
  - Variant `3`: tile `8×16`. Rects `h=2` at `y = 3, 7, 11`, all slot A.
  - Variant `5`: tile `8×24`. Rects `h=2` at `y = 3, 7, 11, 15, 19`, all slot A.
- **Slots:** 1. Typical fill: black or red.
- **Mirror-safe:** yes.
- **Placement:** the simplest separating band, between richer bands. In the UI: the minimal `qatt-divider` and `separator` decoration.
- **Meaning:** no verified meaning.

### 4. `rukun`: triangle row
- **Arabic:** الرُّكون (verified [S4, S5, S7]). Saudipedia defines it as "triangles" [S4].
- **Description:** a row of upright isosceles triangles standing on a baseline, alternating colours.
- **Geometry:** tile `48×24`, repeat `x`.
  - `polygon 0,24 12,0 24,24` → slot A
  - `polygon 24,24 36,0 48,24` → slot B
  - The inverted triangles between them show the ground.
- **Slots:** 2. Typical fill: A = red, B = black, or A = yellow, B = blue.
- **Mirror-safe:** yes.
- **Placement:** above or below the main panel, and as the upper edge of a band. In the UI: the top edge of `qatt-border`, and the `qatt-hero` band.
- **Meaning:** no verified meaning for *rukun*. One art historian suggests "some of the large triangles represent mountains" [S9]. If used, cite this as an interpretation and never as fact.

### 5. `banat`: small triangles with sprigs
- **Arabic:** البَنات, "the girls" (verified [S4, S5, S7, S9])
- **Description:** small triangles, each topped by a little tree-like sprig. Aramco World quotes a practitioner: "The triangles in the paintings with the little trees are called banat" [S9].
- **Geometry:** tile `16×24`, repeat `x`.
  - `polygon 2,24 8,12 14,24` → slot A
  - Sprig in slot B, stroke width 1.25, round caps: `line 8,12 → 8,4`, `line 8,9.5 → 5.5,7`, `line 8,9.5 → 10.5,7`, `line 8,7 → 6,5`, `line 8,7 → 10,5`.
  - *Revised in Phase 4 (phase4-review D1):* two branch pairs, so a single tile reads as a plant and never as a figure with raised arms (D-021). Never render a lone tile with one branch pair.
- **Slots:** 2. Typical fill: A = red or yellow, B = green or black.
- **Mirror-safe:** yes.
- **Placement:** a fine-scale band. In the UI: the `badge` ornament, the `card` top edge, and `majlis-welcome`.
- **Meaning:** one practitioner said each triangle was named for a daughter of the house [S9] (oral testimony, verified, secondary). Researcher Sharon Parker suggests the name "may be a cultural remnant of a long-forgotten past" [S9]. Do not elaborate beyond this.

### 6. `balsanah`: rhombus chain
- **Arabic:** البَلْسَنة (verified [S4, S5, S7]). Saudipedia defines it as "rhombus shapes" [S4].
- **Description:** a horizontal chain of diamonds with a contrasting inner diamond.
- **Geometry:** tile `24×24`, repeat `x` (or `xy` for a field).
  - `polygon 12,0 24,12 12,24 0,12` → slot A
  - `polygon 12,6 18,12 12,18 6,12` → slot B
- **Slots:** 2. Typical fill: A = blue or red, B = yellow or jiss.
- **Mirror-safe:** yes.
- **Placement:** the main panel band. In the UI: `qatt-pattern` (default), `tabs` active-indicator ornament, and the `qatt-stats` background.
- **Meaning:** no verified meaning.

### 7. `amshat`: comb teeth
- **Arabic:** الأمشاط (verified [S4, S5, S7]). Saudipedia defines it as "parallel lines" [S4]. The word literally means "combs".
- **Description:** a band with short parallel teeth hanging from it. *Interpretation:* the "comb" form is inferred from the word itself plus the "parallel lines" definition, and is not confirmed by a source drawing.
- **Geometry:** tile `8×24`, repeat `x`.
  - `rect x=0 y=0 w=8 h=4` → slot A (spine)
  - `rect x=2.5 y=4 w=3 h=16` → slot A (tooth)
- **Slots:** 1 (optional slot B for alternate teeth with a `16×24` tile).
- **Mirror-safe:** yes.
- **Placement:** a fringe hanging under a band. In the UI: the `accordion` item edge and the `pagination` underline.
- **Meaning:** no verified meaning.

### 8. `taadheeq`: triangle with three-point crown
- **Arabic:** التَّعذيق (verified [S4, S5, S7])
- **Description:** Saudipedia: "a triangle that ends with three points resembling corn stalks" [S4].
- **Geometry:** tile `24×32`, repeat `x`.
  - `polygon 2,32 12,12 22,32` → slot A
  - Three strokes in slot B, width 2, round caps: `12,12 → 12,3`, `12,12 → 6,5`, `12,12 → 18,5`
  - Terminal dots in slot B, `r=1.6` at `(12,3)`, `(6,5)` and `(18,5)`
- **Slots:** 2. Typical fill: A = red, B = yellow or green.
- **Mirror-safe:** yes.
- **Placement:** the crest of the main panel. In the UI: the `qatt-cta` and `qatt-pricing` highlighted-plan crest.
- **Meaning:** no verified meaning. The resemblance to corn stalks is a visual description in the source, not a symbolic meaning.

### 9. `mahareeb`: niche arches
- **Arabic:** المَحاريب (verified [S4, S5, S7]). Saudipedia defines it as "prayer niche" [S4].
- **Description:** a row of pointed niche shapes.
- **Geometry:** tile `24×32`, repeat `x`.
  - Outer: `path M2 32 V14 L12 2 L22 14 V32 Z` → slot A
  - Inner: `path M6 32 V16 L12 8.5 L18 16 V32 Z` → slot B (or ground)
- **Slots:** 2. Typical fill: A = black or blue, B = yellow or ground.
- **Mirror-safe:** yes.
- **Placement:** framing openings and the main panel. In the UI: the `qatt-frame` arch variant, `dialog` header ornament, and `qatt-404` illustration.
- **Meaning:** no verified meaning beyond the name's reference to the mihrab shape.

### 10. `sankroli`: nested niches
- **Arabic:** سَنكرولي (verified [S4, S5, S7]). Saudipedia defines it as "parallel prayer niches" [S4]. The etymology is unknown.
- **Description:** concentric (parallel) niche outlines.
- **Geometry:** tile `24×32`, repeat `x`. Three nested outlines, stroke width 2, no fill:
  - `M2 32 V14 L12 2 L22 14 V32` → slot A
  - `M6 32 V16 L12 8 L18 16 V32` → slot B
  - `M10 32 V18 L12 15 L14 18 V32` → slot C
- **Slots:** 3. Typical fill: red / black / yellow.
- **Mirror-safe:** yes.
- **Placement:** like mahareeb, but richer. In the UI: the `qatt-login` side panel and `qatt-testimonials` quote marks area.
- **Meaning:** no verified meaning.

### 11. `shabakah`: single-colour grid
- **Arabic:** الشَّبَكة (verified [S4, S5, S7, S8, S11])
- **Description:** Saudipedia: "geometric squares of a uniform color" [S4]. Al-Almaai: "single-colored, interlaced lines that create the structural foundation of the design" [S11].
- **Geometry:** repeat `xy`.
  - Variant `squares`: tile `16×16`. `rect 0,0,8,8` and `rect 8,8,8,8` → slot A (a checker of one colour on the ground).
  - Variant `lattice`: tile `16×16`. `path M0 8 L8 0 L16 8 L8 16 Z`, stroke slot A, width 1.5, no fill (a diagonal lattice of interlaced lines).
- **Slots:** 1. Typical fill: black or red.
- **Mirror-safe:** yes.
- **Placement:** the structural underlay of a panel. In the UI: subtle backgrounds (`qatt-feature-grid`, `card` hover) at low opacity.
- **Meaning:** no verified meaning.

### 12. `hanash`: serpentine zigzag
- **Arabic:** الحَنَش / الحِناش (verified [S8, S11]). The name refers to the snake (*hanash*).
- **Description:** winding lines inspired by the snake, running rhythmically along the wall [S11]. Rendered here as a zigzag.
- **Geometry:** repeat `x`.
  - Variant `zigzag`: tile `12×12`. `polyline 0,10 6,2 12,10`, stroke slot A, width 2.5, `stroke-linejoin=miter`, no fill.
  - Variant `wave`: tile `24×12`. `path M0 6 Q6 0 12 6 T24 6`, stroke slot A, width 2.5.
- **Slots:** 1 (a double zigzag offset by 4 units adds slot B).
- **Mirror-safe:** yes (the period is symmetric about x = 6 / x = 12).
- **Placement:** a running band between panels. In the UI: `qatt-divider` variant `hanash` and `sonner` toast edge.
- **Meaning:** the name points to the snake [S8, S11]. Sharon Parker suggests "zigzag lines stand for water and also for lightning" [S9]. That is one scholar's interpretation, so attribute it if used.

### 13. `khatmah`: closing square
- **Arabic:** الخَتْمة / الأختام (verified [S8, S11]). Aramco World: "each square is called a khatma" [S9].
- **Description:** a square unit that closes the end of a design. It is also where the painter expressed individuality [S9].
- **Geometry:** a single tile `24×24` (not repeated; placed at the end of a band or in a corner).
  - `rect 0,0,24,24` → slot A
  - `rect 3,3,18,18` → ground
  - `polygon 12,5 19,12 12,19 5,12` → slot B
  - `rect 10,10,4,4` → slot C
- **Slots:** 3. Typical fill: black / red / yellow.
- **Mirror-safe:** yes.
- **Placement:** band terminals and corners. In the UI: `qatt-corner` (default) and the end caps of `qatt-border`.
- **Meaning:** a functional role (closure) is verified. No symbolic meaning is verified.

### 14. `sawtooth`: right-triangle row. *Descriptive name: not a traditional term.*
- **Arabic:** المنشار (descriptive name, not a traditional term)
- **Description:** right-angled triangles in a row. This is a common geometric band and fits the documented "triangles" vocabulary, but we have no source naming it.
- **Geometry:** tile `24×24`, repeat `x`. `polygon 0,24 24,0 24,24` → slot A.
- **Slots:** 1 (a `48×24` tile alternating A/B).
- **Mirror-safe: no.** The slope has a direction. **Recommendation:** do **not** flip it with `dir`. Wall art has no reading direction, so keep the same artwork in LTR and RTL. If a component wants "points toward the reading direction" semantics, mirror it explicitly with `rtl:-scale-x-100`.
- **Placement:** a project-only accent. Use sparingly.
- **Meaning:** none (not a traditional motif).

### 15. `stepped`: stepped pyramid. *Descriptive name: not a traditional term.*
- **Arabic:** المدرّج (descriptive name, not a traditional term)
- **Description:** a symmetric stepped triangle. **Our sources do not document stepped forms in Al-Qatt.** We include it only as a project extension that echoes Asir's terraced mountainsides. Label it as such, or omit it.
- **Geometry:** tile `24×24`, repeat `x`. `polygon 0,24 0,20 4,20 4,16 8,16 8,12 10,12 10,8 14,8 14,12 16,12 16,16 20,16 20,20 24,20 24,24` → slot A.
- **Slots:** 1.
- **Mirror-safe:** yes.
- **Meaning:** none (project extension).

### Not rendered: `aryash` (الأرياش)
The name is verified [S4, S5, S7], but its form is **conflicting**. Saudipedia English says "plants" in the text and "Feathers" in the info box [S4], and the word means feathers. We publish **no artwork** under this name until a reliable visual source is found.

---

## Suggested wall recipe: `qatt-pattern` "full" variant (project interpretation)

The sources support a white ground, horizontal bands, a main panel above stacked *qatt* strokes, a base band (*kaff*) and closing squares (*khatmah*) [S5, S8, S9, S11]. **No source specifies an order**, so the stack below is our own composition. Read it bottom to top:

1. `kaff`: 32 units
2. ground gap: 8 units
3. `qatt-lines`: 40 units
4. `rukun`: 24 units, triangles pointing up
5. main panel (*al-kitba*) = `balsanah`, or a `shabakah` field with `banat` along its top edge: 48 to 96 units
6. `mathalith-makhamis` variant 3: 16 units
7. `hanash` zigzag: 12 units

Each band ends at the component edge with a `khatmah` cap. Around doors, windows and niches (UI frames), run `mathalith-makhamis` + `rukun` along the frame and put `khatmah` at the corners. Sources mention painted door frames and coloured trim around windows [S6, S9], but not the specific motifs used there.

**RTL:** every motif except `sawtooth` is mirror-safe. Pattern components can therefore ignore `dir`, apart from the logical placement of end caps (`inset-inline-start/end`).
