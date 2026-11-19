import { act, render, screen, within } from "@testing-library/react"
import type { ReactElement } from "react"
import { toast } from "sonner"
import { axe } from "vitest-axe"

import { DirectionProvider } from "@/components/ui/direction"
import { examples } from "@/components/docs/examples"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/qatt/ui/accordion"
import { Avatar, AvatarFallback } from "@/registry/qatt/ui/avatar"
import { Badge } from "@/registry/qatt/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/qatt/ui/breadcrumb"
import { Button } from "@/registry/qatt/ui/button"
import { Card } from "@/registry/qatt/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/registry/qatt/ui/dialog"
import { Input } from "@/registry/qatt/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/qatt/ui/pagination"
import { Separator } from "@/registry/qatt/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/registry/qatt/ui/sheet"
import { Toaster } from "@/registry/qatt/ui/sonner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/qatt/ui/tooltip"

const DIRS = ["rtl", "ltr"] as const
type Dir = (typeof DIRS)[number]

function inDir(dir: Dir, ui: ReactElement) {
  document.documentElement.dir = dir
  document.documentElement.lang = dir === "rtl" ? "ar" : "en"
  return render(
    <DirectionProvider direction={dir}>
      <main dir={dir}>{ui}</main>
    </DirectionProvider>,
  )
}

const FOCUS = ["focus-visible:outline-2", "focus-visible:outline-offset-2", "focus-visible:outline-ring"]

// Every docs demo renders without axe violations in both directions.
const DEMOS = [
  "button",
  "badge",
  "card",
  "tabs",
  "dialog",
  "sheet",
  "accordion",
  "input",
  "select",
  "sonner",
  "tooltip",
  "breadcrumb",
  "pagination",
  "avatar",
  "separator",
] as const

describe.each(DEMOS)("%s demo", (name) => {
  it.each(DIRS)("renders with no axe violations (%s)", async (dir) => {
    const Demo = examples[`${name}-demo`]!.component
    const { container } = inDir(dir, <Demo />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe("button", () => {
  it("keeps the API, uses the solid focus outline (D-011) and the painted tone", () => {
    render(
      <>
        <Button>a</Button>
        <Button variant="painted" tone="yellow">
          b
        </Button>
        <Button variant="destructive">c</Button>
      </>,
    )
    const [a, b, c] = screen.getAllByRole("button")
    for (const cls of FOCUS) expect(a).toHaveClass(cls)
    expect(a!.className).not.toMatch(/ring-ring\/50/)
    expect(b).toHaveClass("bg-qatt-yellow", "text-qatt-black")
    // destructive stays the tinted form, never the solid red fill (design-tokens §3.1)
    expect(c).toHaveClass("bg-destructive/10")
    expect(c).not.toHaveClass("bg-primary")
  })
})

describe("badge / card / input / separator", () => {
  it("apply the qatt variants", () => {
    render(
      <>
        <Badge variant="qatt">x</Badge>
        <Card variant="painted" data-testid="card" />
        <Input variant="qatt" aria-label="x" />
        <Separator variant="qatt" data-testid="sep" />
      </>,
    )
    expect(screen.getByText("x")).toHaveClass("bg-qatt-yellow")
    expect(screen.getByTestId("card")).toHaveAttribute("data-variant", "painted")
    expect(screen.getByRole("textbox")).toHaveAttribute("data-variant", "qatt")
    expect(screen.getByTestId("sep")).toHaveAttribute("data-variant", "qatt")
  })
})

describe("dialog", () => {
  it.each(DIRS)("has an Arabic close label and no axe violations when open (%s)", async (dir) => {
    inDir(
      dir,
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>نافذة حوار</DialogTitle>
          <DialogDescription>نافذةٌ تعلو الصفحة لتأكيد إجراءٍ أو إدخال بيانات.</DialogDescription>
        </DialogContent>
      </Dialog>,
    )
    const dialog = await screen.findByRole("dialog")
    expect(within(dialog).getByRole("button", { name: "إغلاق" })).toHaveClass("end-2")
    expect(await axe(document.body)).toHaveNoViolations()
  })
})

describe("sheet", () => {
  it.each([
    ["rtl", "start", "right"],
    ["rtl", "end", "left"],
    ["ltr", "start", "left"],
    ["ltr", "end", "right"],
  ] as const)("in %s, side=%s opens from the %s", async (dir, side, physical) => {
    inDir(
      dir,
      <Sheet defaultOpen>
        <SheetContent side={side}>
          <SheetTitle>لوحة جانبية</SheetTitle>
          <SheetDescription>لوحةٌ تنزلق من طرف الشاشة وتحترم اتجاه القراءة.</SheetDescription>
        </SheetContent>
      </Sheet>,
    )
    const sheet = await screen.findByRole("dialog")
    expect(sheet).toHaveAttribute("data-side", physical)
    expect(await axe(document.body)).toHaveNoViolations()
  })
})

describe("accordion", () => {
  it("uses a non-flipping ChevronDown and text-start triggers", () => {
    inDir(
      "rtl",
      <Accordion defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionTrigger>العربية أولًا</AccordionTrigger>
          <AccordionContent>…</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    const trigger = screen.getByRole("button", { name: "العربية أولًا" })
    expect(trigger).toHaveClass("text-start")
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(trigger.querySelector("svg")!.getAttribute("class")).not.toMatch(/rtl:/)
  })
})

describe("tooltip", () => {
  it.each(DIRS)("renders open content with no axe violations (%s)", async (dir) => {
    inDir(
      dir,
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger render={<Button />}>نسخ</TooltipTrigger>
          <TooltipContent side="inline-end">انسخ الشيفرة</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )
    expect(await screen.findByText("انسخ الشيفرة")).toBeInTheDocument()
    // `region` is a best-practice rule; a portalled tooltip popup legitimately sits outside landmarks.
    expect(await axe(document.body, { rules: { region: { enabled: false } } })).toHaveNoViolations()
  })
})

describe("sonner", () => {
  it.each([
    ["rtl", "left"],
    ["ltr", "right"],
  ] as const)("in %s defaults to the bottom-%s corner and passes dir", async (dir, x) => {
    inDir(dir, <Toaster />)
    act(() => {
      toast("تم النسخ")
    })
    await screen.findByText("تم النسخ")
    const toaster = document.querySelector("[data-sonner-toaster]")!
    expect(toaster).toHaveAttribute("dir", dir)
    expect(toaster).toHaveAttribute("data-x-position", x)
  })
})

describe("breadcrumb", () => {
  it("labels the nav in Arabic and flips the chevron in RTL", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>التوثيق</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbSeparator separator="khatmah" />
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(screen.getByRole("navigation", { name: "مسار التنقّل" })).toBeInTheDocument()
    const [chevron, khatmah] = container.querySelectorAll('[data-slot="breadcrumb-separator"]')
    expect(chevron!.querySelector("svg")).toHaveClass("rtl:rotate-180")
    expect(khatmah!.querySelector("svg")).toBeNull()
  })
})

describe("pagination", () => {
  it("uses Arabic labels and RTL-flipping chevrons", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    )
    expect(screen.getByRole("navigation", { name: "ترقيم الصفحات" })).toBeInTheDocument()
    const prev = screen.getByRole("link", { name: "السابق" })
    expect(prev).toHaveAttribute("href", "#")
    const next = screen.getByRole("link", { name: "التالي" })
    expect(prev.querySelector("svg")).toHaveClass("rtl:rotate-180")
    expect(next.querySelector("svg")).toHaveClass("rtl:rotate-180")
  })
})

describe("avatar", () => {
  it("applies ring and tone", () => {
    render(
      <Avatar ring data-testid="av">
        <AvatarFallback tone="yellow">ق</AvatarFallback>
      </Avatar>,
    )
    expect(screen.getByTestId("av")).toHaveAttribute("data-ring", "true")
    expect(screen.getByText("ق")).toHaveClass("bg-qatt-yellow", "text-qatt-black")
  })
})
