"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/qatt/ui/button"
import { useLogicalSide } from "@/registry/qatt/hooks/use-direction"

type PhysicalSide = "top" | "right" | "bottom" | "left"

/**
 * Qatt Sheet: shadcn base-nova Sheet + logical sides `side="start" | "end"` (resolved with useDirection,
 * so "start" opens from the right in RTL). Upstream default `"right"` is kept for API parity; prefer start/end.
 * Flat panel with a 2px border on its inner edge; `closeLabel` defaults to «إغلاق» (ar-glossary "Close").
 * TODO(track-2-motifs): `ornament` inner-edge strip.
 */
function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-foreground/40 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none dark:bg-black/60",
        className,
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  closeLabel = "إغلاق",
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: PhysicalSide | "start" | "end"
  showCloseButton?: boolean
  closeLabel?: string
}) {
  const startSide = useLogicalSide("start")
  const endSide = useLogicalSide("end")
  const physical: PhysicalSide = side === "start" ? startSide : side === "end" ? endSide : side

  // Physical edges are intentional here: `physical` is already direction-resolved.
  const sideClasses: Record<PhysicalSide, string> = {
    top: "inset-x-0 top-0 h-auto border-b-2 data-ending-style:-translate-y-10 data-starting-style:-translate-y-10",
    bottom: "inset-x-0 bottom-0 h-auto border-t-2 data-ending-style:translate-y-10 data-starting-style:translate-y-10",
    left: "inset-y-0 [left:0] h-full w-3/4 [border-right-width:2px] data-ending-style:-translate-x-10 data-starting-style:-translate-x-10 sm:max-w-sm",
    right:
      "inset-y-0 [right:0] h-full w-3/4 [border-left-width:2px] data-ending-style:translate-x-10 data-starting-style:translate-x-10 sm:max-w-sm",
  }

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={physical}
        data-logical-side={side === "start" || side === "end" ? side : undefined}
        className={cn(
          "fixed z-50 flex flex-col gap-4 border-border bg-popover bg-clip-padding text-sm text-popover-foreground transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none",
          sideClasses[physical],
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={<Button variant="ghost" className="absolute end-3 top-3" size="icon-sm" />}
          >
            <XIcon />
            <span className="sr-only">{closeLabel}</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn("flex flex-col gap-0.5 p-4 pe-12", className)} {...props} />
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-heading text-lg font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
