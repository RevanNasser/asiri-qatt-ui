"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { QattBand } from "@/registry/qatt/ui/qatt-pattern"

/**
 * Qatt Accordion: shadcn base-nova Accordion + `variant="qatt"` on `Accordion`
 * (2px ink rule under each open trigger, with an amshat comb fringe hanging from it). Trigger is `text-start`, chevron at inline-end.
 * The chevron is ChevronDown and rotates when open; it is NOT mirrored in RTL.
 */
function Accordion({
  className,
  variant = "default",
  ...props
}: AccordionPrimitive.Root.Props & { variant?: "default" | "qatt" }) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-variant={variant}
      className={cn("group/accordion flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className={cn("not-last:border-b", className)} {...props} />
  )
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between gap-4 rounded-md border border-transparent py-3 text-start text-sm font-medium transition-all outline-none hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-disabled:pointer-events-none aria-disabled:opacity-50",
          "group-data-[variant=qatt]/accordion:rounded-b-none group-data-[variant=qatt]/accordion:border-b-2 group-data-[variant=qatt]/accordion:border-b-transparent group-data-[variant=qatt]/accordion:aria-expanded:border-b-qatt-ink",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-2.5 hidden h-2 group-data-[variant=qatt]/accordion:group-aria-expanded/accordion-trigger:block"
        >
          <QattBand motif="amshat" thickness={8} />
        </span>
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          aria-hidden="true"
          className="pointer-events-none size-4 shrink-0 text-muted-foreground transition-transform duration-150 group-aria-expanded/accordion-trigger:rotate-180 motion-reduce:transition-none"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm motion-reduce:animate-none data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-2 pb-3 group-data-[variant=qatt]/accordion:pt-4 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
