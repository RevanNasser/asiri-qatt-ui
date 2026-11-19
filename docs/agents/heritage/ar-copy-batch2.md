# Arabic copy — batch 2 (key → file:line)

Text lives in `site-copy.ar.md` / `site-copy.en.md` under the same keys (section "docs (Batch 2)").
Prop rows: replace the English `<span lang="en" dir="ltr">…</span>` at the listed line with the Arabic text; wrap Latin identifiers (shown in backticks) in `<code>` or `<bdi dir="ltr">`.
`rtl` / `a11y` notes: add sections under the existing headings `docs.section.rtl` («ملاحظات الاتجاه») and `docs.section.a11y` («سهولة الوصول»), replacing the TODO comment at line 6.

| key | file:line | prop / slot |
|---|---|---|
| `docs.props.button.variant` | `content/docs/components/button.mdx:35` | variant |
| `docs.props.button.tone` | `content/docs/components/button.mdx:41` | tone |
| `docs.props.button.size` | `content/docs/components/button.mdx:47` | size |
| `docs.props.button.render` | `content/docs/components/button.mdx:52` | render |
| `docs.button.rtl` | `content/docs/components/button.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.button.a11y` | `content/docs/components/button.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.badge.variant` | `content/docs/components/badge.mdx:34` | variant |
| `docs.props.badge.tone` | `content/docs/components/badge.mdx:40` | tone |
| `docs.props.badge.render` | `content/docs/components/badge.mdx:45` | render |
| `docs.badge.rtl` | `content/docs/components/badge.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.badge.a11y` | `content/docs/components/badge.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.card.variant` | `content/docs/components/card.mdx:39` | variant |
| `docs.props.card.size` | `content/docs/components/card.mdx:45` | size |
| `docs.card.rtl` | `content/docs/components/card.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.card.a11y` | `content/docs/components/card.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.tabs.listVariant` | `content/docs/components/tabs.mdx:39` | TabsList variant |
| `docs.props.tabs.value` | `content/docs/components/tabs.mdx:44` | defaultValue / value |
| `docs.tabs.rtl` | `content/docs/components/tabs.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.tabs.a11y` | `content/docs/components/tabs.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.dialog.contentVariant` | `content/docs/components/dialog.mdx:41` | DialogContent variant |
| `docs.props.dialog.showCloseButton` | `content/docs/components/dialog.mdx:47` | showCloseButton |
| `docs.props.dialog.closeLabel` | `content/docs/components/dialog.mdx:53` | closeLabel |
| `docs.dialog.rtl` | `content/docs/components/dialog.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.dialog.a11y` | `content/docs/components/dialog.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.sheet.side` | `content/docs/components/sheet.mdx:37` | SheetContent side |
| `docs.props.sheet.showCloseButton` | `content/docs/components/sheet.mdx:43` | showCloseButton |
| `docs.props.sheet.closeLabel` | `content/docs/components/sheet.mdx:49` | closeLabel |
| `docs.sheet.rtl` | `content/docs/components/sheet.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.sheet.a11y` | `content/docs/components/sheet.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.accordion.variant` | `content/docs/components/accordion.mdx:39` | variant |
| `docs.props.accordion.value` | `content/docs/components/accordion.mdx:44` | defaultValue / value |
| `docs.accordion.rtl` | `content/docs/components/accordion.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.accordion.a11y` | `content/docs/components/accordion.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.input.variant` | `content/docs/components/input.mdx:35` | variant |
| `docs.props.input.dir` | `content/docs/components/input.mdx:40` | dir |
| `docs.input.rtl` | `content/docs/components/input.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.input.a11y` | `content/docs/components/input.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.select.triggerVariant` | `content/docs/components/select.mdx:39` | SelectTrigger variant |
| `docs.props.select.triggerSize` | `content/docs/components/select.mdx:45` | SelectTrigger size |
| `docs.select.rtl` | `content/docs/components/select.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.select.a11y` | `content/docs/components/select.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.sonner.position` | `content/docs/components/sonner.mdx:36` | position |
| `docs.props.sonner.dir` | `content/docs/components/sonner.mdx:42` | dir |
| `docs.sonner.rtl` | `content/docs/components/sonner.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.sonner.a11y` | `content/docs/components/sonner.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.tooltip.side` | `content/docs/components/tooltip.mdx:39` | TooltipContent side |
| `docs.props.tooltip.delay` | `content/docs/components/tooltip.mdx:45` | TooltipProvider delay |
| `docs.tooltip.rtl` | `content/docs/components/tooltip.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.tooltip.a11y` | `content/docs/components/tooltip.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.breadcrumb.separator` | `content/docs/components/breadcrumb.mdx:44` | BreadcrumbSeparator separator |
| `docs.props.breadcrumb.ariaLabel` | `content/docs/components/breadcrumb.mdx:50` | aria-label |
| `docs.breadcrumb.rtl` | `content/docs/components/breadcrumb.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.breadcrumb.a11y` | `content/docs/components/breadcrumb.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.pagination.variant` | `content/docs/components/pagination.mdx:40` | variant |
| `docs.props.pagination.navText` | `content/docs/components/pagination.mdx:46` | PaginationPrevious / PaginationNext text |
| `docs.props.pagination.isActive` | `content/docs/components/pagination.mdx:52` | PaginationLink isActive |
| `docs.pagination.rtl` | `content/docs/components/pagination.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.pagination.a11y` | `content/docs/components/pagination.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.avatar.ring` | `content/docs/components/avatar.mdx:37` | Avatar ring |
| `docs.props.avatar.size` | `content/docs/components/avatar.mdx:43` | Avatar size |
| `docs.props.avatar.fallbackTone` | `content/docs/components/avatar.mdx:48` | AvatarFallback tone |
| `docs.avatar.rtl` | `content/docs/components/avatar.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.avatar.a11y` | `content/docs/components/avatar.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.separator.variant` | `content/docs/components/separator.mdx:34` | variant |
| `docs.props.separator.orientation` | `content/docs/components/separator.mdx:40` | orientation |
| `docs.separator.rtl` | `content/docs/components/separator.mdx:6 (new section; heading key docs.section.rtl)` | rtl |
| `docs.separator.a11y` | `content/docs/components/separator.mdx:6 (new section; heading key docs.section.a11y)` | a11y |
| `docs.props.qatt-divider.decorative` | `content/docs/components/qatt-divider.mdx:33` | decorative |
| `docs.props.qatt-divider.className` | `content/docs/components/qatt-divider.mdx:38` | className |
| `docs.breadcrumb.more` | `registry/qatt/ui/breadcrumb.tsx:92 (label default; TODO at :104)` | sr-only |
| `docs.pagination.more` | `registry/qatt/ui/pagination.tsx:90 (label default; TODO at :101)` | sr-only |

## Notes for the Developer

- **Screen-reader labels are currently unreachable.** `BreadcrumbEllipsis` (breadcrumb.tsx) and `PaginationEllipsis` (pagination.tsx) put the `sr-only` label inside a span with `aria-hidden`, so assistive technology never reads «المزيد» / «صفحاتٌ أخرى». Drop `aria-hidden` from the wrapper and set it on the icon instead.
- Rows whose text is identical across components (`showCloseButton`, `closeLabel` in dialog and sheet) have separate keys on purpose.
