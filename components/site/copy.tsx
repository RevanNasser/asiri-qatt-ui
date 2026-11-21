import * as React from "react"

import type { Lang } from "@/lib/i18n"
import { fill, t, type CopyKey } from "@/lib/site-copy"

/**
 * Renders Heritage copy with its small inline markup:
 * `code` -> <code dir="ltr">, <bdi [dir|lang]>…</bdi> -> <bdi>, [text](url) -> <a>, *term* -> <em> (transliterations).
 * English-language links (URL path /en/ or Arabic note "(بالإنجليزية)" in the copy) get hreflang="en".
 */
const TOKEN = /(`[^`]+`|<bdi(?:\s+(?:dir|lang)="[^"]*")*>.*?<\/bdi>|\[[^\]]+\]\([^)]+\)|\*[A-Za-z][^*]*?[A-Za-z]\*)/g

export function renderCopy(text: string, linkClassName?: string): React.ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null
    if (part.startsWith("`")) {
      return (
        <code key={i} dir="ltr">
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith("<bdi")) {
      const open = part.slice(0, part.indexOf(">") + 1)
      const dir = /dir="([^"]*)"/.exec(open)?.[1] as "ltr" | "rtl" | undefined
      const lang = /lang="([^"]*)"/.exec(open)?.[1]
      return (
        <bdi key={i} dir={dir} lang={lang}>
          {part.slice(open.length, -"</bdi>".length)}
        </bdi>
      )
    }
    if (/^\*[A-Za-z]/.test(part) && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>
    }
    if (part.startsWith("[")) {
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)!
      const [, label = "", href = ""] = m
      const english = /\/en\//.test(href) || /arabnews|aramcoworld/.test(href)
      return (
        <a key={i} href={href} hrefLang={english ? "en" : undefined} className={linkClassName}>
          {label}
        </a>
      )
    }
    return <React.Fragment key={i}>{part}</React.Fragment>
  })
}

export function Copy({
  k,
  vars,
  linkClassName,
  lang,
}: {
  k: CopyKey
  vars?: Record<string, string | number>
  linkClassName?: string
  /** Required, so no page silently falls back to Arabic. */
  lang: Lang
}) {
  return <>{renderCopy(fill(t(k, lang), vars), linkClassName)}</>
}
