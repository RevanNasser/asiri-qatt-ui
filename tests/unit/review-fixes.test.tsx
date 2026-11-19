import { render } from "@testing-library/react"

import QattPricingDemo from "@/registry/qatt/blocks/qatt-pricing/page"
import { buttonVariants } from "@/registry/qatt/ui/button"
import { Badge } from "@/registry/qatt/ui/badge"

describe("Phase 4 review fixes", () => {
  it("F1: buttonVariants merges classes so variant borders win", () => {
    for (const variant of ["qatt", "qatt-outline"] as const) {
      expect(buttonVariants({ variant }).split(" ")).not.toContain("border-transparent")
    }
  })

  it("F5: pricing billing toggle is a radio group, not tabs without panels", () => {
    const { container } = render(<QattPricingDemo />)
    expect(container.querySelector('[role="tablist"]')).toBeNull()
    const radios = container.querySelectorAll('fieldset input[type="radio"]')
    expect(radios).toHaveLength(2)
    expect(container.querySelector("fieldset legend")).not.toBeNull()
  })

  it("F7: banat badge ornament is a strip of tiles, not a single tile", () => {
    const { container } = render(<Badge variant="banat">x</Badge>)
    expect(container.querySelector('[data-slot="qatt-band"] [data-motif="banat"]')).not.toBeNull()
  })
})
