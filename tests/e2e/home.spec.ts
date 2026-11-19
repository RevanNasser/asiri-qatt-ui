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
