import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { QattMotifTile } from "@/registry/qatt/ui/qatt-pattern"

/**
 * Qatt Badge: shadcn base-nova Badge + `qatt` (yellow paint, charcoal text) and `pigment` (+ `tone`) variants.
 * `banat`: an outline badge with a tiny banat ornament (8px) at inline-start; the ornament is aria-hidden.
 */
const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/85",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 text-destructive dark:bg-destructive/20 [a]:hover:bg-destructive/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        qatt: "border-qatt-ink bg-qatt-yellow text-qatt-black dark:text-background",
        pigment: "",
        banat: "border-border ps-1.5 text-foreground",
      },
      tone: {
        red: "",
        blue: "",
        ink: "",
        yellow: "",
      },
    },
    compoundVariants: [
      // No green tone: green paint fails 4.5:1 for small text in light mode (design-tokens §4).
      { variant: "pigment", tone: "red", class: "bg-qatt-red text-qatt-white dark:text-background" },
      { variant: "pigment", tone: "blue", class: "bg-qatt-blue text-qatt-white dark:text-background" },
      { variant: "pigment", tone: "ink", class: "bg-qatt-black text-qatt-white" },
      { variant: "pigment", tone: "yellow", class: "bg-qatt-yellow text-qatt-black dark:text-background" },
    ],
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant = "default",
  tone,
  render,
  children,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, tone: variant === "pigment" ? (tone ?? "red") : undefined }), className),
      },
      {
        ...props,
        children:
          variant === "banat" ? (
            <>
              <QattMotifTile motif="banat" className="h-3 w-2 shrink-0" />
              {children}
            </>
          ) : (
            children
          ),
      },
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
