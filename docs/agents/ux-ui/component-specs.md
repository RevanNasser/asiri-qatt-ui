# Component Specs — Qatt UI (قَطّ)

Author: UX/UI Agent · 2026-11-19 · For: Developer (implementation), Heritage (names/copy review)
Depends on: [`design-tokens.md`](./design-tokens.md), [`tokens.css`](./tokens.css), [`motifs.json`](./motifs.json).
Base: shadcn **base-nova (Base UI)** only (D-002). Arabic display names: `ar-glossary.md`.

## 0. Global rules (apply to every item)

1. **Keep the shadcn API.** Restyled components keep every export, prop, variant and size name of the upstream base-nova file; Qatt only *adds* variants and tokens. Base UI composition uses `render` (not `asChild`).
2. **Logical classes only** (design-tokens §7). Directional icons via `<IconStart/>`/`<IconEnd/>` helpers or `rtl:rotate-180`.
3. **Focus:** `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring` replaces `focus-visible:ring-ring/50 ring-[3px]` (fails 3:1). Invalid state: `aria-invalid:outline-destructive aria-invalid:border-destructive`.
4. **No glossy shadows:** drop `shadow-xs/sm`; use `shadow-painted` only where specified.
5. **Decoration is decoration:** every motif node is `aria-hidden="true"`, `focusable="false"`, `pointer-events-none`, never conveys information, never inside a label. Motif layers never sit under body text at more than `opacity: 0.12` (light) / `0.18` (dark).
6. **Motion:** only `.qatt-paint-reveal` / stroke draw, opt-in with `animate`, disabled by `prefers-reduced-motion` (design-tokens §9). Mark animated nodes `data-qatt-motion`.
7. Each item renders and is tested in `dir="rtl"` and `dir="ltr"`, light and dark.

### Shared types (`registry/qatt/lib/qatt-motifs.ts`, generated from `motifs.json`)

```ts
export type QattPigment = "white" | "jiss" | "red" | "yellow" | "black" | "blue" | "green" | "orange" | "brown" | "ink"
export type QattColor = QattPigment | (string & {})          // pigment name or any CSS colour / var()
export type MotifId =
  | "kaff" | "qatt-lines" | "mathalith-makhamis" | "rukun" | "banat" | "balsanah" | "amshat"
  | "taadheeq" | "mahareeb" | "sankroli" | "shabakah" | "hanash" | "khatmah" | "sawtooth" | "stepped"
export type MotifVariant = "5" | "alternate" | "lattice" | "wave"
export interface MotifDef {
  id: MotifId; arabicName: string; englishName: string; traditionalName: boolean
  width: number; height: number; repeat: "x" | "xy" | "none"
  slots: 1 | 2 | 3; defaultSlots: QattPigment[]
  mirror: boolean; flipInRtl: false
  uses: Array<"band" | "border" | "background" | "corner" | "cap">
  markup: string; variants: { id: MotifVariant; width: number; height: number; slots: number; markup: string }[]
}
export const MOTIFS: Record<MotifId, MotifDef>
/** pigment name -> var(--qatt-x); anything else passes through */
export function resolveColor(c: QattColor): string
/** style object setting --qatt-slot-1..4 from colors (falls back to def.defaultSlots) */
export function slotStyle(id: MotifId, colors?: QattColor[], ground?: QattColor): React.CSSProperties
/** data URI for CSS backgrounds — colours must be RESOLVED values (CSS vars don't work in data URIs) */
export function motifToDataUri(id: MotifId, resolvedColors: string[], variant?: MotifVariant): string
```

`density` / `scale`: `"sm" = 0.5`, `"md" = 1`, `"lg" = 1.5`, `"xl" = 2` (1 SVG unit = 1px × scale). Numbers are accepted too.

---

## 1. Ornament primitives

### 1.1 `qatt-pattern` — نقش قَطّ

Anatomy: `<div class="relative isolate">` → absolutely positioned `<svg aria-hidden>` with one `<pattern patternUnits="userSpaceOnUse">` + full-size `<rect fill="url(#id)">` → optional children on top (`relative z-10`).

```ts
interface QattPatternProps extends React.ComponentProps<"div"> {
  motif?: MotifId                    // default "balsanah"
  variant?: MotifVariant
  colors?: QattColor[]               // per slot; default MOTIFS[motif].defaultSlots
  ground?: QattColor                 // slot-4; default "transparent"
  scale?: "sm" | "md" | "lg" | "xl" | number   // default "md"
  opacity?: number                   // 0..1; default 1 standalone, clamped to 0.12/0.18 when children present
  fade?: "none" | "block-end" | "block-start" | "radial"  // mask so content edge stays clean; default "none"
  as?: "div" | "section" | "span"
  surface?: "inherit" | "gypsum"     // default "inherit". "gypsum" (D-019) wraps the pattern in
                                     // data-qatt-surface="gypsum": a gypsum panel + light pigments/ink in BOTH
                                     // modes. Required on heritage-presenting pages (About, Theme "faithful" row).
}
```
- **Variants (presets):** `preset?: "full"` renders the catalog's wall recipe (kaff → gap → qatt-lines → rukun → panel → mathalith → hanash) bottom-to-top as a stack; label in docs as *project interpretation*.
- **States:** static. `useId()` for pattern id (SSR-safe, unique when repeated).
- **RTL:** ignores `dir`; `patternTransform` never mirrors. `sawtooth` renders identical in both.
- **Heritage rules:** `surface="gypsum"` on heritage-presenting pages, or label the dark rendering with `docs.theme.darkNote` (D-019). When `motif="stepped"`, docs/previews must show `docs.patterns.extensionLabel` (D-020); `preset="full"` never includes `stepped`. `banat` sprigs stay plant-like (D-021, design-tokens §8). The same `surface` prop exists on `qatt-border`, `qatt-divider` and `qatt-frame`.
- **A11y:** wrapper has no role; SVG `aria-hidden`. If children are text, enforce opacity clamp; docs warn: never put body text over a pattern without a solid card.

### 1.2 `qatt-border` — إطار مُزخرف

Anatomy: wrapper `relative` with padding equal to thickness on chosen sides → one motif strip per side (inline SVG pattern) → optional `khatmah` caps at the strip ends → children.

```ts
interface QattBorderProps extends React.ComponentProps<"div"> {
  side?: "top" | "bottom" | "block" | "inline" | "all"   // default "block"; top/bottom = block-start/end
  motif?: MotifId                    // default "rukun"
  variant?: MotifVariant
  colors?: QattColor[]
  thickness?: "sm" | "md" | "lg" | number  // band height in px: sm 12, md 24 (default), lg 40; motif scaled to fit
  caps?: boolean                     // khatmah at strip ends (inline-start & inline-end). default false
  inset?: boolean                    // strip drawn inside the box (padding) vs outside (negative margin). default true
  animate?: boolean                  // paint reveal from inline-start. default false
}
```
- `top` strip uses the motif upright; `bottom` strip is rotated 180° (triangles point down into the content, like a frieze above a door). Inline sides (`inline`/`all`) rotate the tile 90° and use `inset-inline-start/end`.
- **RTL:** caps use `start-0`/`end-0`; reveal origin flips; artwork never mirrors.
- **A11y:** purely decorative; ensure content padding ≥ thickness + 8px so focus outlines of children aren't overlapped.

### 1.3 `qatt-divider` — فاصل قَطّ

A horizontal (or vertical) band between sections; semantic separator.

```ts
interface QattDividerProps extends React.ComponentProps<"div"> {
  motif?: "qatt-lines" | "mathalith-makhamis" | "hanash" | "rukun" | "banat" | "kaff" | MotifId  // default "qatt-lines"
  variant?: MotifVariant
  colors?: QattColor[]
  thickness?: "sm" | "md" | "lg" | number    // default "sm" (12px)
  orientation?: "horizontal" | "vertical"     // default "horizontal"
  decorative?: boolean                        // default true → role="none"; false → role="separator" + aria-orientation
  label?: React.ReactNode                     // optional centred label: band | label | band
  animate?: boolean
}
```
- Label variant: `grid grid-cols-[1fr_auto_1fr] gap-3 items-center`; label `text-sm text-muted-foreground`.
- **RTL:** symmetric. Reveal from inline-start.

### 1.4 `qatt-frame` — إطار القوس (D-006)

An arch (niche-like) frame around images or focal content: pointed arch top, straight sides, base band.

Anatomy:
```
   ╱╲            ← arch outline (stroke = slot-1), optional inner arch (slot-2) = sankroli-like
  ╱  ╲
 │    │          ← side borders (mathalith-makhamis rotated or solid 2px)
 │ 🖼 │          ← content: clip-path follows the inner arch
 │    │
 ▀▀▀▀▀▀          ← base band (kaff) + khatmah caps
```
```ts
interface QattFrameProps extends React.ComponentProps<"figure"> {
  shape?: "pointed" | "stepped" | "round"   // default "pointed" (mahareeb geometry); "stepped" = project extension (D-020), label it in docs
  outline?: 1 | 2 | 3                        // number of nested arch outlines (3 ≈ sankroli). default 2
  colors?: QattColor[]                       // [outer, inner, base]
  base?: MotifId | false                     // default "kaff"
  caps?: boolean                             // khatmah at base corners. default true
  ratio?: number                             // aspect ratio of content box, default 3/4
  caption?: React.ReactNode                  // rendered in <figcaption>
  animate?: boolean                          // stroke-dashoffset draw of the arch
}
```
- Content is clipped with an SVG `clipPath` (`clipPathUnits="objectBoundingBox"`) matching the inner arch; children usually `<img>`/`<Image>` with `alt` required by docs examples.
- **RTL:** symmetric; nothing flips.
- **A11y:** `<figure>`/`<figcaption>`; the arch drawing is `aria-hidden`. Name must not be «محراب» in UI copy (D-006).

### 1.5 `qatt-corner` — زاوية الختمة

```ts
interface QattCornerProps extends React.ComponentProps<"span"> {
  position?: "start-start" | "start-end" | "end-start" | "end-end"  // block-inline, logical. default "start-start"
  motif?: "khatmah" | "taadheeq" | "mahareeb"   // default "khatmah"
  colors?: QattColor[]
  size?: "sm" | "md" | "lg" | number            // 16 / 24 / 32 px. default "md"
  offset?: number                               // px outward (negative = inward). default 0
}
```
Absolutely positioned inside a `relative` parent using `top/bottom-*` + `start-*/end-*`. Decorative. In RTL `start-start` = top-right.

---

## 2. Restyled shadcn components

Every item: same API as upstream base-nova + listed additions. "Painted" look = 2px border, flat fill, `shadow-painted`, press = `translate-y-[3px] shadow-none`.

| Component | Added variants / props (API preserved) | Visual changes | RTL | A11y notes |
|---|---|---|---|---|
| **button** | `variant`: + `"qatt"` (red fill, 2px ink border, `shadow-painted`, press sinks), `"painted"` (pigment fill chosen by `tone`), `"qatt-outline"` (2px ink border, transparent, hover `bg-secondary`). New optional `tone?: "red" \| "blue" \| "ink" \| "yellow" \| "green"` for `painted` only (text colour auto: gypsum on red/blue/ink/green(large text only → use `size="lg"` or bold), charcoal on yellow). Sizes unchanged (`default h-9`, `sm h-8`, `lg h-10`, `icon size-9`, `icon-sm`, `icon-lg`). | `rounded-md`, no shadow except qatt; `font-medium`, no letter-spacing. `destructive` stays shadcn-v4 tinted (design-tokens §3.1). | Icon slot via `data-icon="inline-start" \| "inline-end"`; arrow icons flip. | Solid focus outline; `aria-busy` + spinner for loading; min target 24px. Green `painted` restricted to ≥ 14px bold (4.25:1 → large-text rule) — docs say so. |
| **badge** | `variant`: + `"qatt"` (yellow fill, charcoal text, 1px ink border), `"pigment"` with `tone`, `"banat"` (tiny banat ornament at inline-start, 8px; sprig stays plant-like, never a figure: D-021). | `rounded-sm`, `text-xs font-medium`, `px-2 py-0.5`. | Ornament at `inline-start`. | Ornament `aria-hidden`; never colour-only status (include text). |
| **card** | `variant?: "default" \| "painted" \| "framed"` (new prop, default "default"). `ornament?: MotifId \| false` (top edge strip, default false; `framed` defaults `"banat"`). | painted: 2px ink border + `shadow-painted`; framed: `qatt-border side="top"` strip + `khatmah` caps. No shadow on default. | Strip symmetric; caps logical. | Card stays a plain `div`; interactive cards use a single inner link with `after:absolute after:inset-0` (not a wrapping `<a>`). |
| **tabs** | `TabsList variant`: upstream `"default" \| "line"` + `"qatt"`: active tab gets a 6px `balsanah` strip under it (or diamond indicator), inactive `text-muted-foreground`. | Indicator animates with Base UI `Tabs.Indicator` (150ms, off on reduced motion). | Base UI handles arrow keys with `dir`; indicator uses `inset-inline-start` / `--active-tab-left` variable — verify RTL. | Roving tabindex from Base UI; focus outline inside list (`outline-offset--2` to avoid clipping). |
| **dialog** | `DialogContent` + `ornament?: "mahareeb" \| "rukun" \| false` (header frieze, default false). | `rounded-xl`, 2px border in qatt mode, backdrop `bg-foreground/40`, no blur. Close button at `end-3 top-3`. | Close at inline-end. Footer keeps shadcn DOM order (cancel, then confirm) with `justify-end`, so the confirm action lands at inline-end (left in RTL), the end of the reading path. | Title required (`DialogTitle`); initial focus on first field or the *safe* action for destructive confirms. |
| **sheet** | `side`: upstream `"top" \| "right" \| "bottom" \| "left"` + logical `"start" \| "end"` (new). Upstream default `"right"` kept for API parity; docs and blocks always use `"start"`/`"end"`, resolved with `useDirection()`. `ornament?: MotifId` (inner edge strip, e.g. `"kaff"` rotated). | flat, 2px border on the inner edge. | Slide animation follows the resolved physical side. | Same as dialog. |
| **accordion** | `variant?: "default" \| "qatt"` on `Accordion`. qatt: `amshat` fringe (8px) under each open trigger. | Trigger `text-start`, chevron at inline-end. | Chevron is `ChevronDown` → rotates 180° when open; **not** RTL-flipped. | Base UI headings; trigger keeps `aria-expanded`. |
| **input** | `variant?: "default" \| "qatt"` — qatt: 2px bottom border only (`border-b-2 border-input`, gypsum fill `bg-card`), like a ruled line. | `h-9 rounded-md`, border `--input` (3:1). | `dir` inherited; docs show `dir="ltr"` for email/URL/password; placeholder alignment logical. | Label always visible (no placeholder-as-label); `aria-invalid` styling + error text with `aria-describedby`. |
| **select** | `SelectTrigger variant?: "default" \| "qatt"` (same as input). | Popup `rounded-md`, item highlight `bg-accent text-accent-foreground`, check at inline-start. | Popup aligns to trigger's inline-start. | Base UI keyboard typeahead works with Arabic letters — verify. |
| **sonner** | `<Toaster />` + `ornament?: "hanash" \| false` (4px zigzag at the toast's inline-start edge, coloured by type: success green, error destructive, info blue, warning orange). Default position: `"bottom-left"` when `dir=rtl`, `"bottom-right"` when ltr (computed via `useDirection`), overridable. | Flat card toast, 1px border, no shadow blur → `shadow-painted` subtle. | Pass `dir` to Sonner's `<Toaster dir>`. Swipe-to-dismiss toward inline-end. | Live region from Sonner; type is also conveyed by icon + text, not just the stripe. |
| **tooltip** | No new variants. `variant?: "default" \| "ink"` (ink = charcoal bg, gypsum text — the default look anyway). | `text-xs`/`text-sm`, `rounded-sm`, arrow coloured to match. | `side="inline-start" \| "inline-end"` mapped through Base UI `side` + direction. | Only for supplementary info; triggers must be focusable; delay 300ms; never put essential info in a tooltip. |
| **breadcrumb** | `BreadcrumbSeparator` default icon = `ChevronLeft` in RTL / `ChevronRight` in LTR (via `<ChevronEnd/>`). New `separator?: "chevron" \| "slash" \| "khatmah"` (tiny 6px diamond). | `text-sm text-muted-foreground`, current page `text-foreground font-medium`. | Chevron flips. Slash never flips and reads oddly in RTL, so docs recommend `chevron` or `khatmah` for Arabic. | `nav aria-label="مسار التنقّل"`, current `aria-current="page"`. |
| **pagination** | `PaginationPrevious/Next` use `<ChevronStart/>`/`<ChevronEnd/>`; default labels «السابق»/«التالي» (`nav.prev`/`nav.next`). `variant?: "default" \| "qatt"` — active page: red fill + `amshat` underline. | `tabular-nums`, Western digits. | Prev at inline-start (right in RTL) with chevron pointing right. | `nav aria-label="ترقيم الصفحات"`; active `aria-current="page"`; icon-only first/last have `aria-label`. |
| **avatar** | `AvatarFallback` + `tone?: QattPigment` (fallback bg) and `Avatar` + `ring?: boolean` (2px pigment ring with 2px gap). | Fallback initials: first letters of two Arabic words, `font-heading`. | Avatar groups overlap with `-space-x-2` → use `-ms-2` on siblings (logical). | `AvatarImage alt`; fallback text has contrast checked per tone (yellow/orange → charcoal text). |
| **separator** | `variant?: "default" \| "qatt"` — qatt renders `mathalith-makhamis` (3 thin lines, 8px tall) or `hanash` via `motif` prop. | Default 1px `bg-border`. | Symmetric. | Keeps Base UI `Separator` semantics (`decorative` → `role="none"`). |

---

## 3. Blocks

All blocks: `section` with `aria-labelledby` pointing to their heading; copy defaults come from `site-copy.ar.md` keys (listed) and are passed as props so consumers can replace them. Container `mx-auto max-w-6xl px-4 sm:px-6`.

```ts
// shared
type Cta = { label: string; href: string; variant?: "qatt" | "default" | "outline" | "qatt-outline" }
```

### 3.1 `qatt-hero` — الواجهة الرئيسية
```
┌──────────────────────────────────────────────────────────┐
│ ▲▼▲▼▲▼▲▼▲▼▲▼ rukun band (animate paint)                    │
│                         [eyebrow badge]                   │
│              واجهاتٌ عربية بروح القطّ العسيري  (h1)        │
│                 subtitle (max 60ch)                       │
│        [ابدأ الآن ←]   [تصفّح المكوّنات]                   │
│        ┌ $ pnpm dlx shadcn add …/qatt-theme.json ⧉ ┐ (ltr) │
│ ═══ qatt-lines ═══                                        │
└──────────────────────────────────────────────────────────┘
```
```ts
interface QattHeroProps { eyebrow?: string; title: string; subtitle?: string
  primaryCta?: Cta; secondaryCta?: Cta; install?: { label?: string; command: string }
  motif?: MotifId /* top band, default "rukun" */; align?: "center" | "start"; media?: React.ReactNode /* shown in qatt-frame at inline-end on lg */
  animate?: boolean }
```
Keys: `home.hero.*`. `align="start"`+`media` gives a two-column hero (text inline-start, framed media inline-end).

### 3.2 `majlis-welcome` — ترحيب المجلس
Warm welcome section: banat frieze on top (plant-like sprigs only, D-021), short heading + body, optional 3 small "welcome points", optional `qatt-frame` media.
```ts
interface MajlisWelcomeProps { title: string; body: string; points?: { title: string; body: string; icon?: React.ReactNode }[]
  media?: React.ReactNode; cta?: Cta }
```
Keys: `home.story.title/body/link` (site), `home.cta.title` («حيّاكم في قَطّ»).

### 3.3 `qatt-feature-grid` — شبكة المزايا
```ts
interface QattFeatureGridProps { title: string; subtitle?: string
  features: { title: string; body: string; icon?: React.ReactNode; href?: string }[]
  columns?: 2 | 3 | 4; background?: MotifId | false /* default "shabakah" at 0.06 */ }
```
Cards `variant="painted"`; icons in 40px khatmah-like squares with pigment fill + gypsum icon. Keys: `home.value.*`.

### 3.4 `qatt-stats` — الأرقام والإحصاءات
```ts
interface QattStatsProps { title?: string
  stats: { value: number; label: string; suffix?: string; prefix?: string }[]
  numerals?: "latn" | "arab"   // default "latn" (D-008); formatted via qatt-utils formatNumber
  background?: MotifId | false /* default "balsanah" low opacity */ }
```
Values `font-heading text-5xl tabular-nums`; each wrapped in `<bdi>`. No count-up animation by default (`animate` opt-in; respects reduced motion; final value in DOM from the start for screen readers).

### 3.5 `qatt-testimonials` — آراء العملاء
```ts
interface QattTestimonialsProps { title: string
  items: { quote: string; name: string; role?: string; avatar?: string }[]
  layout?: "grid" | "single" }
```
Quotes use Arabic guillemets «…» in the text itself; a large decorative quote glyph sits at inline-start (`aria-hidden`). Decorative `sankroli` behind the mark. `<figure><blockquote><figcaption>`.

### 3.6 `qatt-pricing` — جدول الأسعار
```ts
interface QattPricingProps { title: string; subtitle?: string; currency?: string /* "ر.س" */
  period?: { monthly: string; yearly: string }   // shows a Tabs/segmented toggle when provided
  plans: { name: string; price: number | string; description?: string; features: string[]
           cta: Cta; highlighted?: boolean; badge?: string }[] }
```
Highlighted plan: `card variant="framed"` + `taadheeq` crest centred on its top edge + `badge variant="qatt"`. Price `tabular-nums`, currency after the number in Arabic (`99 ر.س`), wrapped in `<bdi>`. Feature list check icons (no flip).

### 3.7 `qatt-cta` — دعوة إلى العمل
```ts
interface QattCtaProps { title: string; body?: string; primary: Cta; secondary?: Cta
  tone?: "red" | "ink" | "gypsum"  /* band colour, default "ink" */; motif?: MotifId /* default "taadheeq" crest row */ }
```
On `red`/`ink` bands text is gypsum (passes 5.8:1 / 14.9:1); buttons switch to `painted tone="yellow"` for the primary. Keys: `home.cta.*`.

### 3.8 `qatt-footer` — تذييل الصفحة
```
┌─────────────────────────────────────────────────────┐
│ قَطّ  tagline                │ التوثيق │ المشروع │ المجتمع │
│ heritage note (small)        │ links…  │ links…  │ links…  │
│ ─ mathalith ─                                         │
│ © 2026 قَطّ · built with …        [theme] [GitHub]     │
│ ████████████ kaff band (ink + red line) ████████████ │
└─────────────────────────────────────────────────────┘
```
```ts
interface QattFooterProps { brand: React.ReactNode; tagline?: string; heritageNote?: string
  columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[]
  bottom?: React.ReactNode; kaff?: boolean /* default true */ }
```
Keys: `footer.*`. `<footer>` landmark; column titles are `h2.sr-only`-safe real headings (`text-sm font-semibold`).

### 3.9 `qatt-login` — تسجيل الدخول
Two columns ≥ md: form at inline-start, decorative panel at inline-end (`sankroli` field + `qatt-frame`); single column on mobile (panel hidden, a `rukun` strip above the form instead).
```ts
interface QattLoginProps { title?: string /* "تسجيل الدخول" */; description?: string
  onSubmit?: (data: { email: string; password: string }) => void | Promise<void>
  providers?: { id: string; label: string; icon?: React.ReactNode }[]
  forgotHref?: string; signUpHref?: string; errors?: { email?: string; password?: string; form?: string } }
```
Email/password inputs `dir="ltr"` with logical alignment; visible labels; errors use `error.form.*` keys with `aria-describedby`; submit shows loading state; password visibility toggle button with `aria-pressed` + label.

### 3.10 `qatt-404` — صفحة غير موجودة
Centered `qatt-frame` (pointed arch) containing the code «404» (`font-heading text-6xl`, `<bdi>`), title, body, CTA home + search link. Keys: `error.404.*`. `h1` = title (not the number). Decorative `mahareeb` row along the base.
```ts
interface Qatt404Props { code?: string; title: string; body?: string; homeHref?: string; homeLabel?: string; extra?: React.ReactNode }
```

---

## 4. Lib and hook

### 4.1 `qatt-utils` — أدوات قَطّ (`registry:lib`)
```ts
export function cn(...inputs: ClassValue[]): string                     // re-export clsx + tailwind-merge
export type Numerals = "latn" | "arab"
export function formatNumber(n: number, opts?: Intl.NumberFormatOptions & { numerals?: Numerals; locale?: string }): string
  // default locale "ar-SA", ALWAYS pins -u-nu-latn / -u-nu-arab (ar-glossary §ج)
export function formatDate(d: Date | number | string, opts?: Intl.DateTimeFormatOptions & { numerals?: Numerals; calendar?: "gregory" | "islamic-umalqura" }): string
  // default calendar "gregory" (pinned via -u-ca-), numerals latn
export function formatCurrency(n: number, currency?: string /* "SAR" */, opts?: { numerals?: Numerals }): string
export function isRtlLang(lang: string): boolean                        // ar, fa, he, ur, …
export function bidiIsolate(s: string): string                          // wraps with U+2068 … U+2069 for plain-text contexts (titles, toasts)
```

### 4.2 `use-direction` — خطّاف الاتجاه (`registry:hook`, depends on shadcn `direction`)
```ts
export type Direction = "rtl" | "ltr"
export function useDirection(): Direction
  // 1) nearest DirectionProvider (shadcn/Base UI) → 2) closest [dir] of a ref (if given) → 3) document.documentElement.dir → "ltr"
export function useDirection(ref: React.RefObject<HTMLElement | null>): Direction
export function useLogicalSide(side: "start" | "end"): "left" | "right"   // for Sheet / Toaster positions
```
SSR: returns the provider value or `"rtl"` when `<html dir="rtl">` is rendered on the server (pass `defaultDirection` to the provider); never reads `document` during render. Observes `dir` attribute changes (MutationObserver on `<html>`) so the docs RTL/LTR toggle updates live.
