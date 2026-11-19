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
    expect(divider).toHaveAttribute("role", "none")
    expect(divider).toHaveAttribute("aria-hidden", "true")
    expect(divider.querySelector("svg")).toHaveAttribute("data-motif", "qatt-lines")
    expect(await axe(container)).toHaveNoViolations()
  })

  it("exposes a separator when not decorative, with the chosen motif and thickness", async () => {
    const { getByRole, container } = render(<QattDivider decorative={false} motif="hanash" thickness="md" />)
    const sep = getByRole("separator")
    expect(sep).toHaveAttribute("aria-orientation", "horizontal")
    expect(sep.querySelector('[data-slot="qatt-band"]')).toHaveStyle({ blockSize: "24px" })
    expect(sep.querySelector("svg")).toHaveAttribute("data-motif", "hanash")
    expect(await axe(container)).toHaveNoViolations()
  })

  it("keeps a visible label readable (not aria-hidden) and renders two bands", () => {
    const { container, getByText } = render(<QattDivider label="المكوّنات" />)
    expect(getByText("المكوّنات").closest('[aria-hidden="true"]')).toBeNull()
    expect(container.querySelectorAll('[data-slot="qatt-band"]')).toHaveLength(2)
  })

  it("gives each pattern a unique, valid id", () => {
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
