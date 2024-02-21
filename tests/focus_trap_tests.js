import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("tests")
})

test("makes outside elements inert", async ({ page }) => {
  await page.locator("#open-dialog").click()
  await expect(page.locator("a")).toHaveAttribute("inert")
  await expect(page.locator("#open-dialog")).toHaveAttribute("inert")
});

test("restricts tab navigation", async ({ page }) => {
  await page.locator("#open-dialog").click()

  await page.keyboard.press("Tab")
  await page.keyboard.press("Tab")
  await expect(page.locator("#close-dialog")).toBeFocused()

  await page.keyboard.press("Tab")
  await expect(page.locator("#destroy-me")).toBeFocused()

  await page.keyboard.press("Shift+Tab")
  await expect(page.locator("#close-dialog")).toBeFocused()
})

test("preserves focus", async ({ page }) => {
  await page.locator("#open-dialog").click()
  await page.locator("#destroy-me").focus()
  await page.locator("#destroy-me").click()
  await expect(page.locator("#dialog")).toBeFocused()
})

test("makes dinamically added outside elements inert", async ({ page }) => {
  await page.locator("#open-dialog").click()
  await page.evaluate(() => {
    const div = document.createElement("div")
    div.id = "new-div"
    document.body.appendChild(div)
  })
  await expect(page.locator("#new-div")).toHaveAttribute("inert")
})

test("does not touch inert elements", async ({ page }) => {
  await page.locator("#open-dialog").click()
  await page.locator("#close-dialog").click()
  await expect(page.locator("#inert-button")).toHaveAttribute("inert")
})

test("releases focus if element is disconnected", async ({ page }) => {
  await page.locator("#open-dialog").click()
  await page.evaluate(() => document.getElementById("dialog").remove())
  await expect(page.locator("a")).not.toHaveAttribute("inert")
})
