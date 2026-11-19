import { act, render } from "@testing-library/react"
import type { ReactElement } from "react"
import { axe } from "vitest-axe"

import { examples } from "@/components/docs/examples"
import { DirectionProvider } from "@/components/ui/direction"
import { QattBorder } from "@/registry/qatt/ui/qatt-border"
import { QattCorner } from "@/registry/qatt/ui/qatt-corner"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"
import { QattFrame } from "@/registry/qatt/ui/qatt-frame"
import { QattMotif, QattPattern } from "@/registry/qatt/ui/qatt-pattern"

const DIRS = ["rtl", "ltr"] as const

function inDir(dir: (typeof DIRS)[number], ui: ReactElement) {
  return render(
    <DirectionProvider direction={dir}>
      <main dir={dir} lang={dir === "rtl" ? "ar" : "en"}>
        {ui}
      </main>
    </DirectionProvider>,
  )
}

describe.each(["qatt-pattern", "qatt-border", "qatt-divider", "qatt-frame", "qatt-corner"])("%s demo", (name) => {
  it.each(DIRS)("has no axe violations (%s)", async (dir) => {
    const Demo = examples[`${name}-demo`]!.component
    const { container } = inDir(dir, <Demo />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe("QattMotif", () => {
  it("is decorative and paints through slot variables", () => {
    const { container } = render(<QattMotif motif="kaff" colors={["blue", "ink"]} />)
    const svg = container.querySelector("svg")!
    expect(svg).toHaveAttribute("aria-hidden", "true")
    expect(svg).toHaveAttribute("focusable", "false")
    expect(svg.getAttribute("style")).toContain("--qatt-slot-1: var(--qatt-blue)")
    expect(container.querySelector("pattern g")!.innerHTML).toContain("var(--qatt-slot-1")
  })

  it("renders sawtooth identically in RTL and LTR (D-007)", () => {
    const html = (dir: "rtl" | "ltr") =>
      inDir(dir, <QattMotif motif="sawtooth" />)
        .container.querySelector("pattern")!
        .outerHTML.replace(/id="[^"]+"/, "")
    expect(html("rtl")).toBe(html("ltr"))
  })
})

describe("QattPattern", () => {
  it("clamps opacity behind content and supports the gypsum surface", () => {
    const { container } = render(
      <QattPattern opacity={0.8} surface="gypsum">
        <p>المكوّنات</p>
      </QattPattern>,
    )
    const root = container.querySelector('[data-slot="qatt-pattern"]')!
    expect(root).toHaveAttribute("data-qatt-surface", "gypsum")
    const layer = root.querySelector('[aria-hidden="true"]') as HTMLElement
    expect(layer.style.opacity).toContain("var(--qatt-pattern-max)")
  })

  it("renders the full wall preset as stacked bands", () => {
    const { container } = render(<QattPattern preset="full" />)
    expect(container.querySelectorAll('[data-slot="qatt-motif"]').length).toBeGreaterThan(4)
    expect(container.querySelector('[data-motif="stepped"]')).toBeNull() // D-020
  })
})

describe("QattBorder", () => {
  it("draws strips on logical sides with caps and padding", () => {
    const { container } = render(
      <QattBorder side="block" caps thickness="sm">
        x
      </QattBorder>,
    )
    const root = container.querySelector('[data-slot="qatt-border"]') as HTMLElement
    expect([...root.querySelectorAll("[data-side]")].map((e) => e.getAttribute("data-side"))).toEqual([
      "block-start",
      "block-end",
    ])
    expect(root.style.paddingBlockStart).toBe("20px")
    expect(root.querySelectorAll('[data-slot="qatt-motif-tile"]')).toHaveLength(4)
  })
})

describe("QattFrame", () => {
  it.each(DIRS)("is a figure with caption and a hidden drawing (%s)", async (dir) => {
    const { container, getByRole } = inDir(
      dir,
      <QattFrame caption="إطار القوس">
        <div>x</div>
      </QattFrame>,
    )
    expect(getByRole("figure").querySelector("figcaption")).toHaveTextContent("إطار القوس")
    expect(container.querySelector("clipPath")).not.toBeNull()
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe("QattCorner", () => {
  it("uses logical insets", () => {
    const { container } = render(<QattCorner position="start-end" size="lg" offset={4} />)
    const el = container.querySelector('[data-slot="qatt-corner"]') as HTMLElement
    expect(el.style.insetBlockStart).toBe("-4px")
    expect(el.style.insetInlineEnd).toBe("-4px")
    expect(el.style.inlineSize).toBe("32px")
    expect(el).toHaveAttribute("aria-hidden", "true")
  })
})

describe("paint reveal", () => {
  it("starts hidden then animates once in view; reduced motion shows immediately", async () => {
    const observers: IntersectionObserverCallback[] = []
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(cb: IntersectionObserverCallback) {
          observers.push(cb)
        }
        observe() {}
        disconnect() {}
      },
    )
    const { container } = render(<QattDivider animate />)
    const band = container.querySelector('[data-slot="qatt-band"]')!
    expect(band.className).toContain("[clip-path:inset(0_100%_0_0)]")
    expect(band.className).toContain("motion-reduce:[clip-path:none]")
    act(() => observers[0]!([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver))
    expect(band.className).toContain("animate-qatt-paint")
    expect(band.className).toContain("rtl:animate-qatt-paint-rtl")
    vi.unstubAllGlobals()
  })
})
