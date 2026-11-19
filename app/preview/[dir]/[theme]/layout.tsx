import type { Metadata } from "next"
import { notFound } from "next/navigation"

import "../../../globals.css"

import { PreviewProviders } from "@/components/docs/preview-providers"
import { fontVariables } from "@/lib/fonts"

/**
 * Root layout for isolated previews rendered inside <iframe>s on docs pages (D-028). Each preview is its
 * own document, so `dir`, `.dark` and Base UI portals (dialog, sheet, select, tooltip, toast) all follow
 * the preview's own direction and theme, not the docs page's.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } }

const PREVIEW_DIRS = ["rtl", "ltr"] as const
const PREVIEW_THEMES = ["light", "dark"] as const

export default async function PreviewLayout({ children, params }: LayoutProps<"/preview/[dir]/[theme]">) {
  const { dir, theme } = await params
  if (!(PREVIEW_DIRS as readonly string[]).includes(dir) || !(PREVIEW_THEMES as readonly string[]).includes(theme))
    notFound()
  const d = dir as "rtl" | "ltr"
  return (
    <html
      lang="ar"
      dir={d}
      className={`${fontVariables} ${theme === "dark" ? "dark" : ""}`}
      style={{ colorScheme: theme }}
      suppressHydrationWarning
    >
      <body className="min-h-0 bg-background font-sans antialiased">
        <PreviewProviders dir={d} theme={theme as "light" | "dark"}>
          {children}
        </PreviewProviders>
      </body>
    </html>
  )
}
