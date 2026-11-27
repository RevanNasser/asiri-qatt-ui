"use client"

import { InfoIcon, Loader2Icon, TriangleAlertIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

import { cn } from "@/lib/utils"
import { useDirection } from "@/registry/qatt/hooks/use-direction"
import { QattMotifTile } from "@/registry/qatt/ui/qatt-pattern"

/**
 * Qatt Toaster (sonner): shadcn base-nova Toaster, flat toast (1px border, painted shadow),
 * `dir` passed through, and a direction-aware default position: bottom-left in RTL (= bottom inline-end),
 * bottom-right in LTR. Both stay overridable via props. Toast type is conveyed by icon + text.
 * `ornament="hanash"` adds a 4px zigzag stripe on the toast's inline-start edge, coloured by type
 * (success green, error destructive, info blue, warning orange); the type is still given by icon + text.
 */
const Toaster = ({ ornament = false, ...props }: ToasterProps & { ornament?: "hanash" | false }) => {
  const { theme = "system" } = useTheme()
  const dir = useDirection()
  // Kept for API compatibility; the quieter status bar is now always used.
  void ornament

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      dir={dir}
      position={dir === "rtl" ? "bottom-left" : "bottom-right"}
      className="toaster group"
      icons={{
        success: <QattMotifTile motif="khatmah" className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <QattMotifTile motif="khatmah" colors={["ink", "red", "yellow"]} className="size-4" />,
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
          toast: cn(
            "font-sans shadow-[var(--shadow-painted)]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            "before:pointer-events-none before:absolute before:inset-y-2 before:start-0 before:w-1 before:bg-qatt-blue before:content-[''] data-[type=error]:before:bg-qatt-red data-[type=success]:before:bg-qatt-green data-[type=warning]:before:bg-qatt-yellow",
          ),
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
