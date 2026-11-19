import { act, render, screen, within } from "@testing-library/react"
import type { ReactElement } from "react"
import { axe } from "vitest-axe"

import { examples } from "@/components/docs/examples"
import { DirectionProvider } from "@/components/ui/direction"
import { generateRegistry } from "@/scripts/registry-lib"

const DIRS = ["rtl", "ltr"] as const
const BLOCKS = generateRegistry("https://example.test")
  .items.filter((i) => i.type === "registry:block")
  .map((i) => i.name)

function inDir(dir: (typeof DIRS)[number], ui: ReactElement) {
  return render(
    <DirectionProvider direction={dir}>
      <main dir={dir} lang={dir === "rtl" ? "ar" : "en"}>
        {ui}
      </main>
    </DirectionProvider>,
  )
}

function demo(name: string) {
  const Demo = examples[`${name}-demo`]!.component
  return <Demo />
}

describe.each(BLOCKS)("%s block", (name) => {
  it.each(DIRS)("renders its sample page with no axe violations (%s)", async (dir) => {
    const { container } = inDir(dir, demo(name))
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe("qatt-hero", () => {
  it("has one h1 labelling the section, an LTR install command and a flipping CTA arrow", () => {
    const { container } = inDir("rtl", demo("qatt-hero"))
    const h1 = screen.getAllByRole("heading", { level: 1 })
    expect(h1).toHaveLength(1)
    expect(screen.getByRole("region", { name: h1[0]!.textContent! })).toBeInTheDocument()
    expect(container.querySelector('[dir="ltr"] code')).toHaveTextContent("shadcn")
    expect(screen.getByRole("link", { name: "ابدأ مجانًا" }).querySelector("svg")).toHaveClass("rtl:rotate-180")
  })
})

describe("majlis-welcome", () => {
  it("lists the welcome points in a real list with h3 titles", () => {
    inDir("rtl", demo("majlis-welcome"))
    const region = screen.getByRole("region", { name: "أهلًا بكم، البيت بيتكم" })
    const items = within(within(region).getByRole("list")).getAllByRole("listitem")
    expect(items).toHaveLength(3)
    expect(within(items[0]!).getByRole("heading", { level: 3 })).toBeInTheDocument()
  })
})

describe("qatt-feature-grid", () => {
  it("makes linked cards clickable through a single link named by the title", () => {
    inDir("rtl", demo("qatt-feature-grid"))
    const links = screen.getAllByRole("link")
    expect(links.map((l) => l.textContent)).toEqual(["سريعٌ بطبعه"])
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(6)
  })
})

describe("qatt-stats", () => {
  it("shows Western digits by default, isolated in bdi, as a description list", () => {
    const { container } = inDir("rtl", demo("qatt-stats"))
    const values = [...container.querySelectorAll("dd bdi")].map((b) => b.textContent)
    expect(values).toContain("12,000+")
    expect(values.join("")).not.toMatch(/[٠-٩]/)
    expect(container.querySelectorAll("dt")).toHaveLength(4)
  })
})

describe("qatt-testimonials", () => {
  it("uses figure / blockquote / figcaption with a decorative mirrored quote mark", () => {
    const { container } = inDir("rtl", demo("qatt-testimonials"))
    expect(container.querySelectorAll("figure blockquote")).toHaveLength(3)
    expect(container.querySelectorAll("figure figcaption")).toHaveLength(3)
    const mark = container.querySelector("figure > span[aria-hidden='true'] svg.lucide-quote")
    expect(mark).toHaveClass("rtl:-scale-x-100")
  })
})

describe("qatt-pricing", () => {
  it("toggles the billing period, keeps currency after the number and names the plan for each CTA", async () => {
    const { container } = inDir("rtl", demo("qatt-pricing"))
    expect(container.textContent).toContain("99 ر.س")
    act(() => screen.getByRole("tab", { name: /سنويًا/ }).click())
    expect(container.textContent).toContain("990 ر.س")
    const cta = screen.getByRole("link", { name: "اختر هذه الخطة" })
    expect(document.getElementById(cta.getAttribute("aria-describedby")!)).toHaveTextContent("النموّ")
    expect(screen.getByText("الأكثر اختيارًا")).toBeInTheDocument()
  })
})
