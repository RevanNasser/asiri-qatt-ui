import { expect, test } from "@playwright/test"

test("home renders Arabic, right-to-left", async ({ page }) => {
  await page.goto("/")
  const html = page.locator("html")
  await expect(html).toHaveAttribute("lang", "ar")
  await expect(html).toHaveAttribute("dir", "rtl")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("واجهاتٌ عربية بروح القطّ العسيري")
  // Arabic text block flows from the right edge.
  expect(await page.locator("h1").evaluate((el) => getComputedStyle(el).direction)).toBe("rtl")
})

test("component page and registry item are served", async ({ page, request }) => {
  await page.goto("/docs/components/qatt-divider")
  await expect(page.locator('[data-slot="qatt-divider"]').first()).toBeVisible()
  const res = await request.get("/r/qatt-theme.json")
  expect(res.ok()).toBe(true)
  expect((await res.json()).type).toBe("registry:theme")
})

const COMPONENTS = [
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
