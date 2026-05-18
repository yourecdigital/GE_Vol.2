import { test, expect } from "@playwright/test";

import { QTICKETS_URL } from "../src/lib/disco-config";

test.describe("Disco landing", () => {
  test("renders hero, poster and core copy", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("РАМБОВ", { exact: true })).toBeVisible();
    await expect(
      page.getByText(/СУПЕР.*90/).filter({ visible: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: /супер-дискотека 90-х/i })
    ).toBeVisible();
  });

  test("primary CTA links to Qtickets (visible & stable)", async ({ page }) => {
    await page.goto("/");

    const cta = page.getByRole("link", { name: /купить билет/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", QTICKETS_URL);
    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", /noopener/);

    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect(cta).toBeInViewport();
  });

  test("headliner and giveaway copy present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/DJ POTOTSKIY/i)).toBeVisible();
    await expect(page.getByText(/Розыгрыш среди пришедших/i)).toBeVisible();
    await expect(page.getByText(/ТРК Рамбова/i)).toBeVisible();
    await expect(page.getByText(/Ораниенбаум/i)).toBeVisible();
    await expect(page.getByText(/по-доброму и по-настоящему/i)).toBeVisible();
  });

  test("telegram repost strip links to @xxibro", async ({ page }) => {
    await page.goto("/");
    const tg = page.locator('a[href="https://t.me/xxibro"]');
    await expect(tg.first()).toBeVisible();
  });

  test("keyboard glitch does not throw", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("a");
    await page.keyboard.press("Enter");
    await expect(page.getByText("РАМБОВ", { exact: true })).toBeVisible();
  });
});
