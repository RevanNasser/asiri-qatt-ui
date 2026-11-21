"use client"

import type { ReactNode } from "react"
import { useParams } from "next/navigation"

/**
 * Shows the tree for the current URL language. For routes that cannot read `params` on the
 * server (not-found.tsx): render each language's tree there and let the URL pick one.
 */
export function ByLang({ ar, en }: { ar: ReactNode; en: ReactNode }) {
  const { lang } = useParams<{ lang?: string }>()
  return <>{lang === "en" ? en : ar}</>
}
