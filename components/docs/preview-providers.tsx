"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"

import { DirectionProvider } from "@/components/ui/direction"

/** Inside a preview iframe: fixed direction + theme, and report the content height to the parent page. */
export function PreviewProviders({
  dir,
  theme,
  children,
}: {
  dir: "rtl" | "ltr"
  theme: "light" | "dark"
  children: React.ReactNode
}) {
  React.useEffect(() => {
    if (window.parent === window) return
    const send = () =>
      window.parent.postMessage(
        { type: "qatt-preview-height", height: document.body.scrollHeight },
        window.location.origin,
      )
    const ro = new ResizeObserver(send)
    ro.observe(document.body)
    send()
    return () => ro.disconnect()
  }, [])

  return (
    <ThemeProvider attribute="class" forcedTheme={theme} enableSystem={false} disableTransitionOnChange>
      <DirectionProvider direction={dir}>{children}</DirectionProvider>
    </ThemeProvider>
  )
}
