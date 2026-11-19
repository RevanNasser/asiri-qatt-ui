"use client"

import * as React from "react"

/**
 * Paint-stroke reveal trigger (design-tokens §9): returns `true` once the element first enters the
 * viewport, then stays `true` (runs once per page view). Disabled -> always `true` (no motion).
 * Users with `prefers-reduced-motion: reduce` get `true` immediately, so nothing animates.
 */
export function useReveal<T extends Element>(ref: React.RefObject<T | null>, enabled: boolean): boolean {
  const [shown, setShown] = React.useState(false)

  React.useEffect(() => {
    if (!enabled) return
    const el = ref.current
    const reduce =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!el || reduce || typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setShown(true))
      return () => cancelAnimationFrame(raf)
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setShown(true)
        io.disconnect()
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, enabled])

  return !enabled || shown
}

/** Classes for a decorative node that paints in from inline-start once `shown` (see useReveal). */
export function revealClasses(animate: boolean, shown: boolean): string | undefined {
  if (!animate) return undefined
  return shown
    ? "animate-qatt-paint rtl:animate-qatt-paint-rtl motion-reduce:animate-none"
    : "[clip-path:inset(0_100%_0_0)] rtl:[clip-path:inset(0_0_0_100%)] motion-reduce:[clip-path:none]"
}
