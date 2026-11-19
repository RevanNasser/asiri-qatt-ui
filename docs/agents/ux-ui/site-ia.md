# Site IA & Wireframes — Qatt UI (قَطّ)

Author: UX/UI Agent · 2026-11-19 · Arabic at `/` (RTL), English at `/en` later (D-001).
Wireframes are drawn **as seen in RTL**: inline-start = right edge. Copy keys refer to `site-copy.ar.md`; keys marked **NEW** don't exist yet and are requested from Heritage (§10).

## 1. Sitemap

```
/                          home                     (marketing layout)
/docs                      → /docs/getting-started  (docs layout)
/docs/getting-started      البدء: install by URL, @qatt namespace, components.json rtl
/docs/theme                السمة: palette, token table, copy CSS
/docs/patterns             النقوش: motif gallery (all 15) + slot convention
/docs/patterns/[motif]     motif detail (optional v1.1)
/docs/components           component gallery
/docs/components/[name]    component detail
/docs/blocks               blocks gallery
/docs/blocks/[name]        block detail (full-width preview)
/about                     عن القط العسيري (story)
/r/*.json                  registry (not a page)
/404                       not found
```
Top nav (`nav.*`): brand «قَطّ» · الرئيسية · التوثيق · المكوّنات · الكتل · السمة · عن القط العسيري · [search ⌘K] · [theme toggle] · [GitHub].
Order in RTL: brand at inline-start (right), utility actions at inline-end (left).

## 2. Layouts

### 2.1 Marketing layout (home, about, 404)
```
┌───────────────────────────────────────────────────────────────────┐
│ [GitHub] [◐] [ابحث… ⌘K]          السمة الكتل المكوّنات التوثيق   قَطّ │  sticky header, 56px, bottom border
├───────────────────────────────────────────────────────────────────┤
│                         page sections                              │
├───────────────────────────────────────────────────────────────────┤
│                       qatt-footer (kaff band)                      │
└───────────────────────────────────────────────────────────────────┘
```
Skip link `nav.skip` is the first focusable element. Mobile (< md): brand + [☰ `nav.menu.open`] → Sheet `side="start"` with nav list, search, theme toggle.

### 2.2 Docs layout (Fumadocs, our tokens)
```
┌───────────────────────────────────────────────────────────────────┐
│ header (same as marketing)                                          │
├──────────────┬──────────────────────────────────────┬─────────────┤
│ في هذه الصفحة │  breadcrumb                           │ sidebar nav │
│  (TOC, xl+)  │  H1 + lead                            │  البدء       │
│  - التثبيت    │  content                              │  السمة       │
│  - الاستخدام  │                                       │  النقوش      │
│              │  ── qatt-divider (mathalith) ──       │  المكوّنات ▾ │
│ حرِّر الصفحة  │  [→ السابق]              [التالي ←]   │  الكتل ▾     │
└──────────────┴──────────────────────────────────────┴─────────────┘
  inline-end                  main                      inline-start
```
Sidebar at inline-start (right) uses `--sidebar` tokens; active item `sidebar-primary`. TOC at inline-end from `xl`. Prev/next: `nav.prev`/`nav.next`, chevrons flip. Max prose width 72ch.

## 3. Home `/`

```
┌───────────────────────────────────────────────────────────────────┐
│ ▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼  rukun band (paint reveal)              │
│                [سجلّ مكوّنات مفتوح المصدر لـ shadcn/ui]  home.hero.eyebrow │
│               واجهاتٌ عربية بروح القطّ العسيري           home.hero.title │
│        مكوّناتٌ وكتلٌ جاهزة تُكتب من اليمين…           home.hero.subtitle│
│             [ابدأ الآن ←]  [تصفّح المكوّنات]          home.hero.cta.*    │
│      ثبِّت السمة بأمرٍ واحد                         home.hero.install.label│
│   ┌ ⧉  pnpm dlx shadcn@latest add https://…/r/qatt-theme.json ┐ (ltr)  │
│ ══════════════ qatt-lines divider ══════════════                     │
├───────────────────────────────────────────────────────────────────┤
│ لماذا قَطّ؟                                          home.value.title │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐   qatt-feature-grid (3 cols lg,  │
│ │◆ العربية│ │◆ متوافق │ │◆ زخرفة  │   2 md, 1 sm), shabakah bg 6%    │
│ │ أولًا    │ │ shadcn  │ │ لها جذور│   home.value.{rtl,shadcn,heritage,│
│ └─────────┘ └─────────┘ └─────────┘    a11y,theme,open}.{title,body}  │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                                  │
├───────────────────────────────────────────────────────────────────┤
│ جرّبوها بأنفسكم                                    home.showcase.title │
│ [Tabs: أزرار | بطاقة | حوار | تسجيل الدخول]  live previews, RTL/LTR + ◐│
│ ┌───────────────────────────────────────────────┐                    │
│ │ live preview area                              │                    │
│ └───────────────────────────────────────────────┘                    │
├───────────────────────────────────────────────────────────────────┤
│ ┌ qatt-frame ┐   من جدران المجلس إلى شاشاتكم       home.story.title  │
│ │  (motif    │   في عسير، تجتمع النساء…             home.story.body   │
│ │   wall)    │   [اقرأوا الحكاية ←]                  home.story.link   │
│ └────────────┘   (majlis-welcome block, media at inline-end)         │
├───────────────────────────────────────────────────────────────────┤
│ ████ qatt-cta (ink band, taadheeq crest row) ████                    │
│   حيّاكم في قَطّ · ابدأوا مشروعكم العربي…  [ابدأ الآن]   home.cta.*     │
├───────────────────────────────────────────────────────────────────┤
│ qatt-footer                                           footer.*       │
└───────────────────────────────────────────────────────────────────┘
```
Note: the hero media slot is intentionally a motif wall (our SVGs), never a photo of a real home (heritage ethics §7.4).

## 4. Getting started `/docs/getting-started`

Sections (all code `dir="ltr"`, package-manager tabs remember choice in `localStorage`):
1. Intro — `docs.gettingStarted.intro`, prereq `docs.gettingStarted.prereq`, a callout: **base-nova (Base UI) only in v1** (D-002) — **NEW** `docs.gettingStarted.baseNote`.
2. **Step 1 · ثبِّتوا سمة قَطّ** (`step1`) — install by URL:
   ```
   [pnpm | npm | yarn | bun]
   pnpm dlx shadcn@latest add https://qatt.dev/r/qatt-theme.json
   ```
3. **Step 2 · direction** (`step2`) — `<html lang="ar" dir="rtl">` and `components.json` `"rtl": true`:
   ```json
   { "style": "base-nova", "rtl": true, "tailwind": { "css": "app/globals.css", "cssVariables": true } }
   ```
4. **Step 3 · أول مكوّن** (`step3`) — `shadcn add https://qatt.dev/r/button.json` (+ `--overwrite` warning: replaces your `components/ui/button.tsx`; run with `--diff` first). **NEW** `docs.gettingStarted.overwriteWarning`.
5. **Optional · the @qatt namespace** — **NEW** `docs.gettingStarted.namespace.{title,body}`:
   ```json
   { "registries": { "@qatt": "https://qatt.dev/r/{name}.json" } }
   ```
   then `pnpm dlx shadcn@latest add @qatt/qatt-hero`.
6. Fonts (`qatt-font`), dark mode (`.dark` class / next-themes), digits note (D-008).
7. `docs.gettingStarted.done`.

## 5. Component gallery `/docs/components`
```
┌────────────────────────────────────────────────────────────┐
│ المكوّنات                               docs.components.title │
│ intro                                   docs.components.intro │
│ [الكل] [زخرفة] [أساسية]   [ابحث…]   ◐  RTL|LTR   NEW keys   │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│ │ preview  │ │ preview  │ │ preview  │ │ preview  │  4/3/2/1  │
│ │ (static) │ │          │ │          │ │          │  cols     │
│ │ زر        │ │ شارة     │ │ بطاقة    │ │ إطار القوس│         │
│ │ one-line │ │          │ │          │ │          │          │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└────────────────────────────────────────────────────────────┘
```
Cards: name + one-line description from `ar-glossary.md` (a). Whole card is one link (single inner `<a>` stretched). Filter groups: «زخرفة» (qatt-*), «أساسية» (restyled shadcn). Empty search → `empty.search.*`.

## 6. Component detail `/docs/components/[name]`
```
┌────────────────────────────────────────────────────────────┐
│ المكوّنات › زر                                  breadcrumb   │
│ زر  (H1)     [Badge: Base UI]                               │
│ زرٌّ بأحجامٍ وأنماطٍ متعدّدة…  (lead, glossary)               │
│ ┌ [معاينة] [الشيفرة] ───────────── RTL|LTR  ◐  ⧉ ┐  docs.tab.* │
│ │                                                  │          │
│ │            live preview (own dir + theme scope)  │          │
│ │                                                  │          │
│ └──────────────────────────────────────────────────┘          │
│ التثبيت                               docs.section.installation│
│ [سطر الأوامر] [يدويًا]                 docs.install.cli/manual │
│   [pnpm][npm][yarn][bun]                                       │
│   ┌ pnpm dlx shadcn@latest add https://qatt.dev/r/button.json ⧉┐│
│ الاستخدام  (import + minimal example, ltr)  docs.section.usage │
│ أمثلة: variants grid (qatt, painted, qatt-outline…)  examples  │
│ الخصائص                                       docs.section.props│
│ ┌ الخاصية │ النوع (ltr) │ الافتراضي (ltr) │ الوصف ┐ docs.props.* │
│ سهولة الوصول (keyboard table)                 docs.section.a11y │
│ ملاحظات الاتجاه (what flips, what doesn't)    docs.section.rtl  │
│ [→ السابق: شارة]                     [التالي: بطاقة ←]          │
└────────────────────────────────────────────────────────────┘
```
Behaviour:
- **RTL/LTR toggle** (segmented, **NEW** `docs.preview.dir.{rtl,ltr,label}`) sets `dir` on the preview container + a `DirectionProvider`, not the page. Default = page direction.
- **Light/dark toggle** (**NEW** `docs.preview.theme.label`, reuse `nav.theme.light/dark`) toggles `.dark` on the preview container only.
- Copy buttons: `docs.copy` → `docs.copied` (announced in a polite live region); failure → `error.copy`.
- Install tabs: pnpm `pnpm dlx shadcn@latest add …`, npm `npx shadcn@latest add …`, yarn `yarn dlx shadcn@latest add …`, bun `bunx --bun shadcn@latest add …`. Remember choice site-wide. Overwrite warning on restyled shadcn items.
- "Open in v0" only with the structure-only caveat (D-005) — **NEW** `docs.v0.caveat`.

## 7. Blocks gallery `/docs/blocks` and detail
```
┌────────────────────────────────────────────────────────────┐
│ الكتل · docs.blocks.intro                                    │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ [معاينة][الشيفرة]   📱 💻 🖥 (viewport)  RTL|LTR ◐ ⧉      │   │
│ │  iframe preview (resizable, full block)              │   │
│ └──────────────────────────────────────────────────────┘   │
│  الواجهة الرئيسية — one-liner · [pnpm dlx shadcn add …] ⧉    │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ next block…                                           │   │
└────────────────────────────────────────────────────────────┘
```
Blocks render in an `<iframe>` (true viewport breakpoints; `title` attribute = block name). Viewport buttons need `aria-label` (**NEW** `docs.preview.viewport.{mobile,tablet,desktop}`).

## 8. Theme page `/docs/theme`
```
┌────────────────────────────────────────────────────────────┐
│ السمة · docs.theme.intro · note: docs.theme.note             │
│ [الوضع الفاتح | الوضع الداكن]                                  │
│ الأصباغ (pigments) — gypsum panel in both modes (D-019)        │
│ ┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐                     │
│ │جصّ ││مشقة││صفرة││فحم ││نيلة││برسيم││برتقالي│  swatch + name +  │
│ └────┘└────┘└────┘└────┘└────┘└────┘└────┘  "decorative only"   │
│ رموز الألوان (token table)                                    │
│ ┌ الرمز (ltr) │ فاتح ▢ oklch │ داكن ▢ oklch │ التباين │ الاستخدام ┐│
│ النقوش والخانات: slot-1..4 demo with live colour pickers      │
│ الخطوط الطباعية: Plex Sans Arabic / Readex Pro / Plex Mono      │
│ ┌ tokens.css (ltr, collapsible) ─────────────────── [⧉ نسخ] ┐  │
│ └──────────────────────────────────────────────────────────┘  │
│ [ثبِّت السمة] install command                                   │
└────────────────────────────────────────────────────────────┘
```
The "faithful" pigment row and its motif samples sit in a `data-qatt-surface="gypsum"` panel in both modes. The token table below it follows the active mode and carries `docs.theme.darkNote` in dark. The typography section heading is «الخطوط الطباعية» (`docs.theme.fonts.title`, D-022), never «الخطوط», which in this project means the painted lines. Swatches show contrast verdict as text («للنص» / «للزخرفة فقط»), not just colour. **NEW** keys: `docs.theme.pigments.title`, `docs.theme.tokens.title`, `docs.theme.decorativeOnly`, `docs.theme.textSafe`, `docs.theme.fonts.title`, `docs.theme.slots.title`, `docs.theme.copyCss`, `docs.theme.contrast`.

## 9. About «عن القط العسيري» `/about`
```
┌────────────────────────────────────────────────────────────┐
│ ▲▼▲▼ rukun band                                              │
│ عن القط العسيري (H1)                 about.title             │
│ فنٌّ تتوارثه نساء عسير…              about.lead              │
│ ═══ qatt-lines ═══                                           │
│ ما هو؟        about.what.heading/body/name                   │
│ أين؟          about.where.heading/body   (no map photo; a   │
│               terrace-landscape illustration may use stepped│
│               — not as a wall band, no "motif" caption, D-020)│
│ من يمارسه؟    about.who.*                                     │
│ كيف يُصنع؟    about.how.body/vocab/note                       │
│   vocab chips: each name → its motif tile on a gypsum panel │
│   (D-019). Only motifs with aboutVocabulary=true; sawtooth  │
│   and stepped are excluded (D-020)                           │
│ اعترافٌ عالمي  about.unesco.body/official  (official name in│
│               <bdi lang="en">)                               │
│ ┌ framed callout ─────────────────────────────┐              │
│ │ علاقة «قَطّ» بهذا الفن about.project.*        │              │
│ └─────────────────────────────────────────────┘              │
│ الفضل لأهله   about.credit.*                                  │
│ المصادر       about.sources.intro + s1…s9 (ordered list;     │
│               links open in the same tab; English sources   │
│               carry hreflang="en")                          │
│ ████ kaff ████                                               │
└────────────────────────────────────────────────────────────┘
```
Reading width 65ch, body `text-lg`. **Every motif band on About renders with `surface="gypsum"` in both modes (D-019)**, as gypsum panels inset in the page. Banat sprigs stay plant-like (D-021). No photos of people or homes. Vocabulary chips: decorative tile + name; tile is `aria-hidden`, name is the text.

## 10. 404
```
┌──────────────────────────────┐
│        ╱╲  qatt-frame         │
│       │ 404 │  error.404.code │
│        ‾‾‾  mahareeb base     │
│  الصفحة غير موجودة (H1)        │ error.404.title
│  يبدو أنّ الطريق أخذكم…        │ error.404.body
│  [العودة إلى الرئيسية] [ابحث]  │ error.404.cta + nav.search.placeholder
└──────────────────────────────┘
```
`seo.404.*` for metadata. Returns HTTP 404.

## 11. Copy keys: coverage and requests

Covered by `site-copy.ar.md`: `nav.*`, `home.*`, `about.*`, `docs.*` (tabs, sections, props, copy, install), `empty.*`, `error.*`, `footer.*`, `seo.*`.

**NEW keys requested from Heritage (Agent A):**
| key | purpose |
|---|---|
| `docs.gettingStarted.baseNote` | "v1 supports base-nova (Base UI) only" |
| `docs.gettingStarted.overwriteWarning` | warn that restyled components replace `components/ui/*` |
| `docs.gettingStarted.namespace.title` / `.body` | optional `@qatt` registry setup |
| `docs.install.pm.label` | "package manager" tab list label |
| `docs.preview.dir.label` / `.rtl` / `.ltr` | preview direction toggle |
| `docs.preview.theme.label` | preview light/dark toggle |
| `docs.preview.viewport.mobile` / `.tablet` / `.desktop` | block preview widths |
| `docs.v0.caveat` | "structure-only preview in v0" (D-005) |
| `docs.gallery.filter.all` / `.ornament` / `.core` | gallery filters |
| `docs.theme.pigments.title`, `.tokens.title`, `.fonts.title`, `.slots.title`, `.decorativeOnly`, `.textSafe`, `.contrast`, `.copyCss` | theme page |
| `docs.patterns.descriptiveLabel` | label for non-traditional names (sawtooth, stepped) |
| `docs.patterns.extensionLabel` | "project extension" label for `stepped` |
