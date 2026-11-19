import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Qatt Button: shadcn base-nova Button (same exports, props, variants and sizes) plus
 * `qatt`, `qatt-outline` and `painted` (+ `tone`) variants. Solid 2px Nila-blue focus outline (D-011).
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:outline-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        // design-tokens §3.1: destructive stays the tinted form so it never looks like the solid red primary.
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:outline-destructive dark:bg-destructive/20 dark:hover:bg-destructive/30",
        link: "text-primary decoration-1 underline-offset-4 hover:underline",
        qatt: "border-2 border-qatt-ink bg-primary text-primary-foreground shadow-[var(--shadow-painted)] hover:bg-primary/90 active:not-aria-[haspopup]:translate-y-[3px] active:not-aria-[haspopup]:shadow-none",
        "qatt-outline": "border-2 border-qatt-ink bg-transparent text-foreground hover:bg-secondary",
        painted:
          "border-2 border-qatt-ink shadow-[var(--shadow-painted)] active:not-aria-[haspopup]:translate-y-[3px] active:not-aria-[haspopup]:shadow-none",
      },
      tone: {
        red: "",
        blue: "",
        ink: "",
        yellow: "",
        green: "",
      },
      size: {
        default: "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
      },
    },
    compoundVariants: [
      // Text colours per design-tokens §4: gypsum on red/blue/ink/green, charcoal on yellow (light);
      // in dark the pigments are lifted, so labels switch to the dark page colour (4.8:1+).
      {
        variant: "painted",
        tone: "red",
        class: "bg-qatt-red text-qatt-white hover:bg-qatt-red/90 dark:text-background",
      },
      {
        variant: "painted",
        tone: "blue",
        class: "bg-qatt-blue text-qatt-white hover:bg-qatt-blue/90 dark:text-background",
      },
      { variant: "painted", tone: "ink", class: "bg-qatt-black text-qatt-white hover:bg-qatt-black/90" },
      {
        variant: "painted",
        tone: "yellow",
        class: "bg-qatt-yellow text-qatt-black hover:bg-qatt-yellow/90 dark:text-background",
      },
      // Green passes only as large/bold text (4.25:1): force bold.
      {
        variant: "painted",
        tone: "green",
        class: "bg-qatt-green font-bold text-qatt-white hover:bg-qatt-green/90 dark:text-background",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  tone,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      className={cn(
        buttonVariants({ variant, size, tone: variant === "painted" ? (tone ?? "red") : undefined, className }),
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
