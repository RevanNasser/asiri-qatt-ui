"use client"

import { useDirection as useBaseDirection } from "@/components/ui/direction"

export type TextDirection = "ltr" | "rtl"

/**
 * Reads the text direction from the nearest `<DirectionProvider>`
 * (shadcn `direction` item, Base UI under the hood).
 */
export function useDirection(): { dir: TextDirection; isRtl: boolean } {
  const dir: TextDirection = useBaseDirection() === "rtl" ? "rtl" : "ltr"
  return { dir, isRtl: dir === "rtl" }
}
