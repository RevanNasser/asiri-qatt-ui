"use client"

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

import { useDirection } from "@/registry/qatt/hooks/use-direction"

/**
 * Qatt Toaster (sonner): shadcn base-nova Toaster, flat toast (1px border, painted shadow),
 * `dir` passed through, and a direction-aware default position: bottom-left in RTL (= bottom inline-end),
 * bottom-right in LTR. Both stay overridable via props. Toast type is conveyed by icon + text.
 * TODO(track-2-motifs): `ornament="hanash"` edge stripe coloured by type.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()
  const dir = useDirection()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      dir={dir}
      position={dir === "rtl" ? "bottom-left" : "bottom-right"}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin motion-reduce:animate-none" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          // D-011: Sonner's own focus rings (rgba black) fail 3:1 and our painted shadow overrides them.
          toast:
            "font-sans shadow-[var(--shadow-painted)]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          actionButton:
            "focus-visible:shadow-none! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          cancelButton:
            "focus-visible:shadow-none! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          closeButton:
            "focus-visible:shadow-none! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
