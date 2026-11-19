# Arabic copy — batch 4 (component ornament props): key index

The text lives in `site-copy.ar.md` and `site-copy.en.md` under "Batch 4" («الدفعة الرابعة»), with the same keys in both. Each row replaces a `{/* TODO(ar-copy): … */}` marker. The rows were written from the component source in `registry/qatt/ui/` as it stood at commit `c406193`.

| key | target | source checked |
|---|---|---|
| `docs.props.card.ornament` | `content/docs/components/card.mdx:33` (props row `ornament`; replaces the English placeholder at :49) | `card.tsx:21-24,42-46`: `MotifId \| false`, 12px top strip, framed → `banat` + khatmah caps |
| `docs.props.dialog.ornament` | `content/docs/components/dialog.mdx:35`; replace the English placeholder at :57 | `dialog.tsx:52-58,75-84`: `"mahareeb" \| "rukun" \| false`, 20px frieze, close button moves to `top-8` |
| `docs.props.sheet.ornament` | `content/docs/components/sheet.mdx:31`; replace the English placeholder at :53 | `sheet.tsx:62,78-104`: any `MotifId`, 12px strip on the inner edge, vertical/horizontal by side |
| `docs.props.tabs.indicator` | `content/docs/components/tabs.mdx:33`; replace the English placeholder at :48 | `tabs.tsx:44-46,69,78-80`: `"diamond" \| "strip"`, default `diamond`, `qatt` only, diamond hidden on vertical tabs, 6px balsanah strip |
| `docs.props.sonner.ornament` | `content/docs/components/sonner.mdx:30`; replace the English placeholder at :46 | `sonner.tsx:12,21,52-53`: `"hanash" \| false`, 4px stripe at inline-start, colour by type |
| `docs.props.separator.motif` | `content/docs/components/separator.mdx:28` (replaces the English placeholder at :44) | `separator.tsx:12,20-21,33,38-40`: any `MotifId`, `qatt` only, 12px band |

## Notes for the Developer

- Defaults to show in the `default` column: card `false` (framed: `"banat"`), dialog `false`, sheet none, tabs `"diamond"`, sonner `false`, separator none.
- Card, sheet and separator take any `MotifId`, so each of their rows names `stepped` as a project extension (D-020). The separator row also says that `khatmah` is an end cap, not a band motif. That is the catalog role, and the same applies to card and sheet.
- No `|` characters are used, so `scripts/copy-gen.ts` parses every row. The backticks are literal; render them as `<code dir="ltr">`, as in batch 2.
- In the same pass, I corrected some earlier copy in `site-copy.ar.md`: «أصيلة» became «من رسمنا / من تصميمنا», and «القط» gained its shadda in `seo.home.*`. See `phase4-review.md` §A1. Re-run `pnpm copy:gen` after pulling.
