"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { QattBand } from "@/registry/qatt/ui/qatt-pattern"

/**
 * Qatt Tabs: shadcn base-nova Tabs + `TabsList variant="qatt"`: the active tab carries a small painted
 * diamond under its label, or a 6px balsanah strip with `indicator="strip"` (inactive tabs are muted).
 * Arrow keys follow the DirectionProvider (Base UI).
 */
function Tabs({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex gap-2 data-horizontal:flex-col", className)}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-md p-[3px] text-muted-foreground group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none data-[variant=qatt]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
        qatt: "gap-2 bg-transparent group-data-horizontal/tabs:h-11 group-data-horizontal/tabs:pb-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function TabsList({
  className,
  variant = "default",
  indicator = "diamond",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants> & { indicator?: "diamond" | "strip" }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-indicator={indicator}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, children, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-sm border border-transparent px-2 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/70 transition-all outline-none group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pe-1 has-data-[icon=inline-start]:ps-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 motion-reduce:transition-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:text-foreground group-data-[variant=default]/tabs-list:data-active:bg-background dark:group-data-[variant=default]/tabs-list:data-active:border-input dark:group-data-[variant=default]/tabs-list:data-active:bg-input/30",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-end-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        // qatt: painted diamond indicator, centred under the active label (symmetric, no RTL handling needed)
        "group-data-[variant=qatt]/tabs-list:text-muted-foreground group-data-[variant=qatt]/tabs-list:data-active:text-foreground",
        "before:pointer-events-none before:absolute before:start-1/2 before:size-2 before:rotate-45 before:bg-primary before:opacity-0 before:transition-opacity group-data-horizontal/tabs:before:-bottom-2 group-data-horizontal/tabs:before:-ms-1 group-data-vertical/tabs:before:hidden group-data-[variant=qatt]/tabs-list:group-data-[indicator=diamond]/tabs-list:data-active:before:opacity-100",
        "group/tabs-trigger",
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1 -bottom-2 hidden h-1.5 group-data-[variant=qatt]/tabs-list:group-data-[indicator=strip]/tabs-list:group-data-active/tabs-trigger:block"
      >
        <QattBand motif="balsanah" thickness={6} />
      </span>
    </TabsPrimitive.Tab>
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
