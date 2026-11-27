import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

/**
 * Qatt Input: shadcn base-nova Input + `variant="qatt"` (a ruled line: 2px bottom border on a gypsum card fill).
 * Border uses `--input` (3:1, WCAG 1.4.11). Solid focus outline (D-011). Direction is inherited;
 * set `dir="ltr"` yourself for email, URL and password fields.
 */
function Input({
  className,
  type,
  variant = "default",
  ...props
}: React.ComponentProps<"input"> & { variant?: "default" | "qatt" }) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:outline-destructive md:text-sm dark:bg-input/30 dark:disabled:bg-input/80",
        "data-[variant=qatt]:rounded-b-none data-[variant=qatt]:border-0 data-[variant=qatt]:border-b-2 data-[variant=qatt]:bg-card data-[variant=qatt]:focus-visible:[box-shadow:0_2px_0_var(--qatt-ink),0_4px_0_var(--qatt-red),0_6px_0_var(--qatt-yellow)] dark:data-[variant=qatt]:bg-card",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
