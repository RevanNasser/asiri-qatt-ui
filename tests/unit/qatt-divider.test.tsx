import { render } from "@testing-library/react"
import { axe } from "vitest-axe"

import { DirectionProvider } from "@/components/ui/direction"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"

describe("QattDivider", () => {
  it.each(["rtl", "ltr"] as const)("is decorative by default and has no axe violations (%s)", async (dir) => {
    const { container } = render(
      <div dir={dir} lang={dir === "rtl" ? "ar" : "en"}>
        <DirectionProvider direction={dir}>
          <p>a</p>
          <QattDivider />
          <p>b</p>
        </DirectionProvider>
      </div>,
    )
    const divider = container.querySelector('[data-slot="qatt-divider"]')!
    expect(divider).toHaveAttribute("aria-hidden", "true")
    expect(divider.querySelector("polyline")).toHaveAttribute("stroke", "currentColor")
    expect(await axe(container)).toHaveNoViolations()
  })

  it("exposes a separator when not decorative", async () => {
    const { getByRole, container } = render(<QattDivider decorative={false} className="text-foreground" />)
    const sep = getByRole("separator")
    expect(sep).toHaveAttribute("aria-orientation", "horizontal")
    expect(sep).toHaveClass("text-foreground")
    expect(await axe(container)).toHaveNoViolations()
  })

  it("gives each instance a unique, valid pattern id", () => {
    const { container } = render(
      <>
        <QattDivider />
        <QattDivider />
      </>,
    )
    const ids = [...container.querySelectorAll("pattern")].map((p) => p.id)
    expect(new Set(ids).size).toBe(2)
    for (const id of ids) expect(id).toMatch(/^[A-Za-z0-9_-]+$/)
  })
})
