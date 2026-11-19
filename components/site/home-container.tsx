"use client"

import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/**
 * Replaces Fumadocs' HomeLayout container (a <main> that also wraps the header), so the header, the page
 * <main> and the footer are sibling landmarks.
 */
export function HomeContainer({ className, ...props }: ComponentProps<"main">) {
  return (
    <div
      id="nd-home-layout"
      {...(props as ComponentProps<"div">)}
      className={cn("flex flex-1 flex-col [--fd-layout-width:1400px]", className)}
    />
  )
}
