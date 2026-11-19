# Phase 2 Gate Review — Heritage (وكيل التراث العسيري)

Date: 2026-11-19 · Reviewed: `docs/agents/ux-ui/` (design-tokens.md, tokens.css, motifs/*.svg, motifs.json, component-specs.md, site-ia.md) against `motif-catalog.md`, plus decisions D-001…D-014.

**Gate verdict: APPROVED.** There are no blocking issues. The non-blocking recommendations for UX/UI are in §4.

Method: I rendered all 20 tiles from `motifs.json` as repeated bands at 3× scale, using their `defaultSlots`, in light (catalog hexes) and dark (lifted pigments, ink = gypsum). I used headless Chrome and checked each tile against the catalog geometry.

---

## 1. Motif review

Every tile is a minimal geometric construction on a 4-unit grid. None of them traces a specific mural, artist or house. None has figurative, ethnic or "exotic" decoration, so I found no caricature. Slot convention, `aria-hidden="true" focusable="false"`, hex fallbacks and the ground `rect` are present in every file.

| Motif | Verdict | Notes |
|---|---|---|
| `kaff` | Approve | Matches the catalog (A band 24u, B accent line). See §4-R1 on dark-mode visual weight (non-blocking). |
| `qatt-lines` | Approve | Five stripes A,B,C,A,B as specified. It reads clearly as the stacked *qatt* strokes. |
| `mathalith-makhamis` (+`-5`) | Approve | Exactly 3 and 5 thin lines. Faithful to "three or five parallel lines" [S4]. |
| `rukun` | Approve | Upright triangles alternating A/B, with ground-coloured inverted triangles between them. Faithful. |
| `banat` | Approve (with usage note) | Faithful to "triangles with the little trees" [S9]. **Usage note:** the sprig must stay plant-like. Keep slot B green (default) or yellow. Never add a dot or "head" above the sprig, and never describe or animate it as a figure. Because the name means "the girls", a figurative reading would become a caricature. Add this to the component docs. |
| `balsanah` | Approve | A rhombus chain with an inner rhombus, faithful to "rhombus shapes" [S4]. The default blue/yellow is a good choice. |
| `amshat` (+`-alternate`) | Approve | Matches the catalog. The comb form is an inference, and `motifs.json` already says so in its note. Keep that note visible on the docs page. |
| `taadheeq` | Approve | A triangle with three stalks and terminal dots, faithful to "three points resembling corn stalks" [S4]. |
| `mahareeb` | Approve | A pointed niche with an inner niche. Geometric, with no religious ornament added. The `qatt-frame` Arabic name stays «إطار القوس» (D-006). |
| `sankroli` | Approve | Three nested niche outlines, faithful to "parallel prayer niches" [S4]. |
| `shabakah` (+`-lattice`) | Approve | The checker is faithful to "squares of a uniform colour" [S4]. The lattice is drawn as an X rather than the catalog's diamond. It produces the **same** diagonal lattice, only phase-shifted, and fixes seams. I accept this. The catalog geometry line remains valid as a description. |
| `hanash` (+`-wave`) | Approve | The zigzag and wave match the catalog. The half-period overdraw is only a seam fix. Water/lightning readings must stay attributed to Parker [S9] if they are ever quoted. |
| `khatmah` | Approve | Square frame, diamond and centre square, as specified. |
| `sawtooth` (+`-alternate`) | Approve | Labelled descriptive (`traditionalName: false`). Never flipped (D-007). |
| `stepped` | Approve — ship as a labelled extension | See answer (c). |
| `aryash` | Correctly not drawn | Its form is conflicting, so no artwork until a reliable source exists. |

**No SVG edits were needed.** `motifs.json` is unchanged.

---

## 2. Answers to UX/UI questions

**(a) Base UI, not Radix (D-013).** Done in both languages:
- `home.value.a11y.body`: «مبنيٌّ على <bdi>Base UI</bdi>، يدعم لوحة المفاتيح…» / "Built on Base UI, with keyboard…"
- `footer.builtWith`: «مبنيٌّ على shadcn/ui و Base UI و Tailwind CSS» (each name in `<bdi>`) / "Built on shadcn/ui, Base UI and Tailwind CSS."

No other copy key mentions Radix, except the new `baseNote`, which mentions it correctly as possible future support.

**(b) `--qatt-ink` and dark pigments.** I confirm both, which resolves the pending item in D-012.
- `--qatt-ink` is a **role, not a pigment**: charcoal in light and gypsum in dark. This is respectful. On real walls the black outlines a form against white gypsum, and in the dark mode the line still contrasts with its ground. It is the same function in a different value. I added the Arabic label «لون الرسم (دور)» to the token table so the role is never mistaken for a pigment name.
- Dark pigment values (red 0.62, yellow 0.80, blue 0.62, green 0.66 and so on) keep the hues and only lift lightness, which is fine. Keep them **flat and earthy**. Do not raise chroma towards neon in later tuning.
- **Condition:** the art itself is painted on white gypsum. Wherever the site *presents the heritage* (About page bands, the vocabulary chips, the "faithful" swatch row on the Theme page), render the motifs on a jiss surface in both modes, or clearly label the dark rendering. I added the copy key `docs.theme.darkNote` for that label. Component dark mode is free to use the night-majlis interpretation.

**(c) Ship `stepped`?** Yes, under three conditions:
1. Every UI surface shows `docs.patterns.extensionLabel` («إضافةٌ من المشروع، غير موثّقة في القطّ العسيري»).
2. It never appears in the About page vocabulary chips, which list traditional names only. site-ia already says this.
3. On the About "where" section it may appear as a **landscape (terrace) illustration**. It must not be styled as a wall band next to the traditional bands, and no caption may call it a motif of Al-Qatt.

The Arabic name «المدرّج» stays descriptive.

**(d) New copy keys.** All 27 keys from site-ia §11 are appended to `site-copy.ar.md` and `site-copy.en.md` under "Phase 2 additions". I added two Heritage keys:
- `docs.theme.darkNote`: dark mode is our interpretation, and Al-Qatt is painted on gypsum.
- `docs.theme.pigments.blueNote`: the source of the blue is contested, and the name is a label.

Language note: `docs.theme.fonts.title` is «الخطوط الطباعية», not «الخطوط». In this project «الخطوط» means the painted lines of the *qatt*. The Theme page wireframe label should change to match.

**(e) ExternalLink icon not flipping (D-014).** Acknowledged and agreed. The ↗ glyph means "leaves the site" and carries no cultural meaning. Heritage has no objection, and the "Heritage may revisit" caveat in design-tokens §7 can be considered closed.

---

## 3. Palette wording check (design-tokens.md)

design-tokens already flags hexes as approximate and dark mode as interpretation. That is good. I found one risk of overclaiming. Names like "Nila blue", "Meshiga red" and «أصفر الصَّفرة» read as sourcing facts, and the blue's source is **conflicting** in our sources (indigo [S10] / powdered rock [S6] / commercial paint only [S9]). I added a **Naming note** under §2.1 that says:
- the names are labels after the materials in the catalog;
- they make no claim that a hex reproduces a pigment or that every wall used it;
- Nila is explicitly a label.

Nothing else overclaims. "No desert, dunes or camels" and the Asir imagery list (mountains, terraces, tower houses, fog) are appropriate.

---

## 4. Non-blocking recommendations for UX/UI

- **R1 — `kaff` in dark mode.** With `defaultSlots: ["ink","red"]`, the 24-unit base band becomes a large gypsum slab, the brightest thing on the night page, and it inverts the band's grounding weight. Both colourings are catalog-valid. Consider `["red","ink"]`, or overriding `slot-1` to `red`/`black` in dark for `kaff`. This is a UX/UI decision; Heritage accepts either.
- **R2 — `banat` usage note.** Add the "sprig stays plant-like" rule from §1 to the `badge`/`card` ornament docs.
- **R3 — Theme page label.** Change «الخطوط» to «الخطوط الطباعية» in the site-ia §8 wireframe.
- **R4 — Faithful renderings.** Use the jiss-surface rule from answer (b) for heritage-presenting sections in dark mode.

---

## 5. Edits made by Heritage in this review

1. `heritage/site-copy.ar.md`: fixed `home.value.a11y.body` and `footer.builtWith` (Radix → Base UI), and appended 27 requested keys plus 2 Heritage keys and a terminology note.
2. `heritage/site-copy.en.md`: made the same two fixes and appended the same 29 keys.
3. `ux-ui/design-tokens.md` §2.1: added a "Naming note" paragraph (pigment names are labels, and the blue is conflicting), and gave `--qatt-ink` the label "role, not a pigment" with the Arabic «لون الرسم (دور)».
4. SVGs and `motifs.json`: no changes.
