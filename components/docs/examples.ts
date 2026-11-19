import type { ComponentType } from "react"

import QattDividerDemo from "@/registry/qatt/examples/qatt-divider-demo"

/** Live examples rendered by <ComponentPreview name="..." />. `file` (relative to registry/) is shown in the code tab. */
export const examples: Record<string, { component: ComponentType; file: string }> = {
  "qatt-divider-demo": { component: QattDividerDemo, file: "qatt/examples/qatt-divider-demo.tsx" },
}
