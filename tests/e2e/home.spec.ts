import { expect, test } from "@playwright/test"

test("home renders Arabic, right-to-left", async ({ page }) => {
  await page.goto("/")
  const html = page.locator("html")
  await expect(html).toHaveAttribute("lang", "ar")
  await expect(html).toHaveAttribute("dir", "rtl")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("واجهاتٌ عربية بروح القطّ العسيري")
  // Arabic text block flows from the right edge.
  expect(await page.getByRole("heading", { name: "واجهاتٌ عربية بروح القطّ العسيري" }).evaluate((el) => getComputedStyle(el).direction)).toBe("rtl")
})

test("component page and registry item are served", async ({ page, request }) => {
  await page.goto("/docs/components/qatt-divider")
  await expect(page.locator('iframe[title="فاصل قَطّ"]')).toBeVisible()
  const res = await request.get("/r/qatt-theme.json")
  expect(res.ok()).toBe(true)
  expect((await res.json()).type).toBe("registry:theme")
})

const COMPONENTS = [
  "qatt-pattern",
  "qatt-divider",
  "qatt-border",
  "qatt-frame",
  "qatt-corner",
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
]

const BLOCKS = [
  "qatt-hero",
  "majlis-welcome",
  "qatt-feature-grid",
  "qatt-stats",
  "qatt-testimonials",
  "qatt-pricing",
  "qatt-cta",
  "qatt-footer",
  "qatt-login",
  "qatt-404",
]

for (const name of BLOCKS) {
  test(`docs page /docs/blocks/${name} renders RTL with a live preview`, async ({ page }) => {
    await page.goto(`/docs/blocks/${name}`)
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
    await expect(page.locator('[data-slot="component-preview"]').first()).toBeVisible()
    expect((await page.request.get(`/r/${name}.json`)).ok()).toBe(true)
  })
}

test("reduced motion: decorative bands render in their final state", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" })
  const page = await context.newPage()
  await page.goto("/docs/components/qatt-divider")
  const band = page.frameLocator('iframe[title="فاصل قَطّ"]').locator('[data-qatt-motion]').first()
  await expect(band).toBeVisible()
  expect(await band.evaluate((el) => getComputedStyle(el).clipPath)).toBe("none")
  await context.close()
})

for (const name of COMPONENTS) {
  test(`docs page /docs/components/${name} renders RTL with a live preview`, async ({ page }) => {
    await page.goto(`/docs/components/${name}`)
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
    await expect(page.locator('[data-slot="component-preview"]').first()).toBeVisible()
    expect((await page.request.get(`/r/${name}.json`)).ok()).toBe(true)
  })
}

test("sheet side=start opens from the right in RTL", async ({ page }) => {
  await page.goto("/docs/components/sheet")
  await page.locator('[data-slot="component-preview"] button').first().click()
  const sheet = page.getByRole("dialog")
  await expect(sheet).toHaveAttribute("data-side", "right")
  const box = (await sheet.boundingBox())!
  expect(box.x + box.width).toBeGreaterThan((page.viewportSize()!.width ?? 0) - 2)
})

test("patterns page lists all 15 motifs with heritage labels", async ({ page }) => {
  await page.goto("/docs/patterns")
  await expect(page.locator("li[data-motif]")).toHaveCount(15)
  await expect(page.locator('li[data-motif="stepped"]')).toContainText("إضافةٌ من المشروع، غير موثّقة في القطّ العسيري")
  await expect(page.locator('li[data-motif="banat"]')).toContainText("يبقى الغصن نباتيًا دائمًا")
})
