# Phase 4 Heritage review: Arabic in situ, ornaments and blocks

Reviewer: Asiri Heritage Agent · 2026-11-19 · Reviewed tree: `c406193` plus uncommitted Developer work (`lib/copy.ar.generated.ts`, `scripts/copy-gen.ts`).
Scope: all Arabic in `registry/qatt/**`, `content/docs/**`, `lib/**` and `components/docs/motif-gallery.tsx`; motif geometry in `qatt-motifs.ts`; ornament and block composition.

**Verdict: pass with fixes.** The Arabic matches the approved copy. A script compared every Arabic line in `content/docs/**/*.mdx` against `site-copy.ar.md` and the glossary, and the only lines it flagged were escaped JSX defaults, which are correct. Block sample content matches batch 3 word for word. The diacritics are clean, all demo people and companies are labelled fictional, and every block carries `blocks.sampleNote`. `stepped` is labelled wherever it is named. majlis-welcome is respectful, and its claims are all `verified` in `heritage-brief.md` (1.2, 1.5, 3.2). The motif geometry matches `motif-catalog.md` tile for tile (hanash and shabakah-lattice are phase-shifted only, which is equivalent). Nothing is caricatured, and no motif is given an unsourced meaning.

Severity: **H** = must fix before the Phase 4 gate · **M** = should fix · **L** = nit.

---

## A. Copy (Heritage-owned; already corrected in `site-copy.ar.md`, needs regeneration or sync in place)

**A1 (M) «أصيلة» reads as "authentic/traditional", not "original (our own)".** The English copy says "original patterns we draw ourselves". In Arabic, «نقوشٌ أصيلة» suggests the patterns *are* traditional, which is the authenticity claim the brief forbids (brief §5.3). I have corrected `site-copy.ar.md` (rows `home.hero.subtitle`, `home.value.heritage.body`, `about.project.body`, `docs.patterns.intro`, `footer.heritage`, `seo.home.description`, `docs.qatt-pattern.intro`). After `pnpm copy:gen`, the following in-situ copies still need the same text:

| file:line | corrected text |
|---|---|
| `content/docs/patterns.mdx:3` | `description: "نقوشٌ نرسمها بأنفسنا من مفردات القطّ العسيري: الركون والبلسنة والبنات والمحاريب وغيرها. وحيث لا نجد اسمًا تقليديًا موثّقًا نكتفي بوصف الشكل."` |
| `content/docs/components/qatt-pattern.mdx:8` | change «كلّ نقشٍ رسمٌ أصيل من اجتهادنا» to «كلّ نقشٍ رسمٌ من اجتهادنا» |
| `lib/site-copy.ts:24` | `"مكوّناتٌ وكتلٌ جاهزة تُكتب من اليمين إلى اليسار أولًا، ونقوشٌ من رسمنا مستوحاة من فنّ نساء عسير في تزيين جدران المجالس."` |
| `lib/site-copy.ts:43` | `"سجلّ مكوّنات وكتل مفتوح المصدر لـ shadcn/ui، عربيٌّ أولًا ومن اليمين إلى اليسار، بنقوشٍ من تصميمنا مستوحاة من فنّ القطّ العسيري."` |
| `lib/site-copy.ts:46` | same as `patterns.mdx:3` above |
| `lib/copy.ar.generated.ts` | re-run `pnpm copy:gen`; do not hand-edit |

**A2 (L) «القط» without shadda reads as «القِطّ» (cat).** The project rule is that «القطّ» always carries the shadda in our own copy. Third-party source titles stay as their publishers wrote them.

| file:line | corrected text |
|---|---|
| `lib/site-copy.ts:41` | `"قَطّ — مكوّنات عربية لـ shadcn/ui مستوحاة من القطّ العسيري"` |
| `content/docs/components/qatt-pattern.mdx:3` | `description: خلفيةٌ زخرفية متكرّرة من أشرطةٍ ومثلثاتٍ ومعيّنات، مستلهمة من مفردات القطّ العسيري.` |
| `site-copy.ar.md` `nav.about`, `about.title`, `footer.link.about`, `seo.about.*` | «عن القطّ العسيري». *I am leaving these keys unchanged in this batch so the About-page work is not disrupted. I will apply them in batch 5 unless the Orchestrator objects.* |

**A3 (L) The `qatt-frame` description still says «مستلهم من «المحاريب»».** After D-006, the component description should not lean on the niche word. The glossary is now corrected.

| file:line | corrected text |
|---|---|
| `content/docs/components/qatt-frame.mdx:3` | `description: إطارٌ على هيئة قوسٍ يحتضن الصور والمحتوى.` |

**A4 (L) The glossary still listed Typography as «الخطوط».** Fixed to «الخطوط الطباعية» per D-022. The phrase «الخطوط العربية» in `home.value.rtl.body`, which appears in the card, tabs and accordion demos, is clear in context and stays.

**A5 (H, tracked) Six `TODO(ar-copy)` prop rows.** These are now written. See `ar-copy-batch4.md` for the keys and targets, and replace the English placeholders at `card.mdx:49`, `dialog.mdx:57`, `sheet.mdx:53`, `tabs.mdx:48`, `sonner.mdx:46` and `separator.mdx:44`.

## B. Arabic in blocks and demos (Developer to apply)

**B1 (M) `registry/qatt/blocks/qatt-hero/page.tsx:21`: the accessible name describes something that is not there.** `aria-label="لقطة شاشة توضيحية للوحة التحكّم"` sits on a balsanah pattern, so screen-reader users are told about a screenshot that does not exist. The copy key was written for a real screenshot. Fix (preferred): drop `role="img"` and `aria-label`, so the placeholder is decorative (QattPattern already hides its layer). If it must stay announced, use:
`aria-label="مكانٌ لصورة منتجكم، تملؤه زخرفة «البلسنة» مؤقتًا"`

**B2 (L) `registry/qatt/blocks/majlis-welcome/page.tsx:39`: «جدارٌ» overstates the image.** It is a stack of pattern bands, not a wall. Corrected:
`aria-label="أشرطةٌ زخرفية من المثلثات والمعيّنات، مستوحاة من القطّ العسيري"`

**B3 (M) `registry/qatt/examples/qatt-frame-demo.tsx:13`: the `stepped` arch is shown with no label (D-020 says always labelled).** The props table labels it, but the preview does not. Add:
`caption="المدرّج: إضافةٌ من المشروع، غير موثّقة في القطّ العسيري"`
(the same wording as `docs.patterns.extensionLabel`. Better still, read it from that key.)

**B4 (L) `registry/qatt/blocks/qatt-login/page.tsx` and `qatt-login.tsx:28`: mixed address.** «ليس لديك حساب؟» and «نسيت كلمة المرور؟» are singular, beside plural «حيّاكم… أدخلوا». These are fixed UI conventions, so they are acceptable. No change.

Checked and fine: pricing «ر.س» after the number; testimonial names tagged «(اسمٌ افتراضي)» and companies «شركة مثال / استوديو نموذج / متجر تجريبي»; footer brand «اسم منتجكم»; the UNESCO 2017 note (brief 3.2, verified); the 404 line «بين المدرّجات», which refers to Asir's agricultural terraces and makes no heritage claim; pagination «صفحاتٌ أخرى» and breadcrumb «المزيد» (batch 2 keys); every `closeLabel` «إغلاق».

## C. Patterns page (`content/docs/patterns.mdx`, `components/docs/motif-gallery.tsx`)

The labels are right. `stepped` gets `extensionLabel`, `sawtooth` gets `descriptiveLabel`, and the 13 sourced names get `traditionalLabel` (banat badge). The `banat` and `amshat` notes are always shown, and `aryash` is correctly absent.

**C1 (H) D-019 is not met.** The patterns page presents heritage, and D-019 requires such pages to show motifs on a gypsum surface in dark mode too, or to label the dark rendering as an interpretation. `motif-gallery.tsx:17-24` renders on `bg-card`, so in dark mode every outline turns gypsum-on-charcoal. Fix: add `data-qatt-surface="gypsum"` (with the gypsum background) to the `Preview` wrapper at `:19` and to the `QattMotifTile` at `:17`.

**C2 (L) The «تركيبة الجدار» section shows three patterns, not the recipe.** `patterns.mdx:14` previews `qatt-pattern-demo`, which shows balsanah, a blue lattice and the full preset, under a paragraph that describes only the full recipe. Show only `<QattPattern preset="full" surface="gypsum" …/>` there, or add a caption naming which tile is the recipe.

**C3 (L) The default-colour list prints English pigment names** (`red, ink`) at `motif-gallery.tsx:68-70`. This is acceptable as code identifiers inside `dir="ltr"`. Optional: show swatches as well.

## D. Ornaments and motif artwork (cultural review)

**D1 (M) `banat` can read as a stick figure when it stands alone.** The tile (`qatt-motifs.ts:164`, from `motifs.json`) is a triangle with one stem and two raised side branches, and the stem continues above them. Repeated in a band, it reads as a row of small trees. As a single tile (`badge.tsx:66`, 8×12px, beside the word), triangle + stem + two raised arms is the classic "figure in a dress" silhouette, and this motif is literally named "the girls". That is exactly what D-021 guards against. The catalog geometry is mine, so I am revising it:
- **Catalog change (done in `motif-catalog.md` §5; UX/UI to sync into `motifs.json`):** give the sprig two branch pairs so it reads as a plant at any size: `line 8,12 → 8,4` · `line 8,9.5 → 5.5,7` · `line 8,9.5 → 10.5,7` · `line 8,7 → 6,5` · `line 8,7 → 10,5`, with stroke 1.25 and round caps.
- **Badge:** render at least two tiles (`h-3 w-4` with `QattBand`-style tiling) instead of one.
- Until the change lands, the Heritage note (D-021) already on the docs stays as written.

**D2 (L) The full wall recipe has its gap in the wrong place.** In `qatt-pattern.tsx:182`, the container is `flex-col-reverse`, so `marginBlockStart` on `qatt-lines` puts the 8-unit ground gap *above* `qatt-lines`, between it and `rukun`. The catalog puts it between `kaff` and `qatt-lines`. Fix: use `marginBlockEnd`. The recipe also has no `khatmah` end caps ("each band ends … with a khatmah cap"). That is optional, but it would make the composition more faithful.

**D3 (L) Sheet strip direction under RTL.** `QattBand` rotates vertical strips by +90° for both sides (`sheet.tsx:102`). The apexes of `rukun`/`banat`/`mahareeb` therefore point into the page on an LTR `start` sheet but into the panel on an RTL `start` sheet. Per D-007, artwork does not mirror, so this is not a defect. Still, the demo (`sheet-demo.tsx:23`) uses `kaff`, a base band, standing on its side. For side edges, prefer a symmetric line motif: `ornament="mathalith-makhamis"` or `"qatt-lines"`. That also matches the catalog's frame recipe ("run mathalith-makhamis + rukun along the frame").

**D4 (info) `kaff` default slot B is `ink`.** The catalog's typical B is red or yellow. Black is in the verified palette, so this is not wrong. No change needed.

Checked and fine: card `framed` (banat strip + khatmah caps, the catalog's band-end rule); tabs balsanah strip (catalog placement); dialog `mahareeb`/`rukun` frieze; sonner `hanash` stripe (colour plus icon and text); separator triple rules = «المثالث» (verified name); qatt-frame `pointed`/`round` arches and `outline=3` ≈ sankroli; footer `kaff` at the bottom (the catalog placement); CTA/pricing `taadheeq` crest; login sankroli panel; 404 `mahareeb` row; testimonials sankroli behind the quote mark; feature-grid shabakah at 6% opacity. No motif is animated in a way that suggests a figure, since the reveal is a paint wipe or stroke draw. No artwork mirrors in RTL (D-007), and `sawtooth` is described as descriptive.

## Hand-offs

- **Developer:** A1 and A2 in-situ lines, A3, A5 (wire batch 4), B1–B3, C1, C2, D2, plus D1's badge change once `motifs.json` is updated.
- **UX/UI:** D1 geometry into `motifs.json` and then `pnpm motifs:gen`. D3 demo motif choice.
- **Heritage (me):** D1 catalog edit is done. A2 About keys in batch 5.
