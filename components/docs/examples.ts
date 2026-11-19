import type { ComponentType } from "react"

import QattPatternDemo from "@/registry/qatt/examples/qatt-pattern-demo"
import QattDividerDemo from "@/registry/qatt/examples/qatt-divider-demo"
import QattBorderDemo from "@/registry/qatt/examples/qatt-border-demo"
import QattFrameDemo from "@/registry/qatt/examples/qatt-frame-demo"
import QattCornerDemo from "@/registry/qatt/examples/qatt-corner-demo"
import ButtonDemo from "@/registry/qatt/examples/button-demo"
import BadgeDemo from "@/registry/qatt/examples/badge-demo"
import CardDemo from "@/registry/qatt/examples/card-demo"
import TabsDemo from "@/registry/qatt/examples/tabs-demo"
import DialogDemo from "@/registry/qatt/examples/dialog-demo"
import SheetDemo from "@/registry/qatt/examples/sheet-demo"
import AccordionDemo from "@/registry/qatt/examples/accordion-demo"
import InputDemo from "@/registry/qatt/examples/input-demo"
import SelectDemo from "@/registry/qatt/examples/select-demo"
import SonnerDemo from "@/registry/qatt/examples/sonner-demo"
import TooltipDemo from "@/registry/qatt/examples/tooltip-demo"
import BreadcrumbDemo from "@/registry/qatt/examples/breadcrumb-demo"
import PaginationDemo from "@/registry/qatt/examples/pagination-demo"
import AvatarDemo from "@/registry/qatt/examples/avatar-demo"
import SeparatorDemo from "@/registry/qatt/examples/separator-demo"

/** Live examples rendered by <ComponentPreview name="..." />. `file` (relative to registry/) is shown in the code tab. */
export const examples: Record<string, { component: ComponentType; file: string }> = {
  "qatt-pattern-demo": { component: QattPatternDemo, file: "qatt/examples/qatt-pattern-demo.tsx" },
  "qatt-divider-demo": { component: QattDividerDemo, file: "qatt/examples/qatt-divider-demo.tsx" },
  "qatt-border-demo": { component: QattBorderDemo, file: "qatt/examples/qatt-border-demo.tsx" },
  "qatt-frame-demo": { component: QattFrameDemo, file: "qatt/examples/qatt-frame-demo.tsx" },
  "qatt-corner-demo": { component: QattCornerDemo, file: "qatt/examples/qatt-corner-demo.tsx" },
  "button-demo": { component: ButtonDemo, file: "qatt/examples/button-demo.tsx" },
  "badge-demo": { component: BadgeDemo, file: "qatt/examples/badge-demo.tsx" },
  "card-demo": { component: CardDemo, file: "qatt/examples/card-demo.tsx" },
  "tabs-demo": { component: TabsDemo, file: "qatt/examples/tabs-demo.tsx" },
  "dialog-demo": { component: DialogDemo, file: "qatt/examples/dialog-demo.tsx" },
  "sheet-demo": { component: SheetDemo, file: "qatt/examples/sheet-demo.tsx" },
  "accordion-demo": { component: AccordionDemo, file: "qatt/examples/accordion-demo.tsx" },
  "input-demo": { component: InputDemo, file: "qatt/examples/input-demo.tsx" },
  "select-demo": { component: SelectDemo, file: "qatt/examples/select-demo.tsx" },
  "sonner-demo": { component: SonnerDemo, file: "qatt/examples/sonner-demo.tsx" },
  "tooltip-demo": { component: TooltipDemo, file: "qatt/examples/tooltip-demo.tsx" },
  "breadcrumb-demo": { component: BreadcrumbDemo, file: "qatt/examples/breadcrumb-demo.tsx" },
  "pagination-demo": { component: PaginationDemo, file: "qatt/examples/pagination-demo.tsx" },
  "avatar-demo": { component: AvatarDemo, file: "qatt/examples/avatar-demo.tsx" },
  "separator-demo": { component: SeparatorDemo, file: "qatt/examples/separator-demo.tsx" },
}
