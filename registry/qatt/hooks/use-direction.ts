"use client"

import * as React from "react"

import { useDirection as useProviderDirection } from "@/components/ui/direction"

export type Direction = "rtl" | "ltr"

function readDir(el: Element | null | undefined): Direction | null {
  const dir = el?.closest("[dir]")?.getAttribute("dir")?.toLowerCase()
  return dir === "rtl" || dir === "ltr" ? dir : null
}

/**
 * Text direction for the current subtree.
 *
 * 1. `rtl` from the nearest `<DirectionProvider>` (shadcn `direction`, Base UI) wins;
 * 2. otherwise the closest `[dir]` of `ref` (if given), then `<html dir>`;
 * 3. otherwise the provider value (Base UI defaults to `ltr`).
 *
 * Never reads `document` during render (SSR-safe: the first render returns the provider value),
 * and follows live changes of `dir` on `<html>` (e.g. the docs RTL/LTR toggle).
 */
export function useDirection(ref?: React.RefObject<HTMLElement | null>): Direction {
  const fromProvider: Direction = useProviderDirection() === "rtl" ? "rtl" : "ltr"
  const [fromDom, setFromDom] = React.useState<Direction | null>(null)

  React.useEffect(() => {
    const read = () => setFromDom(readDir(ref?.current) ?? readDir(document.documentElement))
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] })
    return () => observer.disconnect()
  }, [ref])

  if (fromProvider === "rtl") return "rtl"
  return fromDom ?? fromProvider
}

/** Maps a logical side to the physical side for the current direction (Sheet, Toaster positions). */
export function useLogicalSide(side: "start" | "end"): "left" | "right" {
  const dir = useDirection()
  if (side === "start") return dir === "rtl" ? "right" : "left"
  return dir === "rtl" ? "left" : "right"
}
