import { createRequire } from "module";
import path from "path";
import fs from "fs";
const require = createRequire(import.meta.url);
const playwrightPath = path.resolve("../optical store/node_modules/playwright-core");
const { chromium } = require(playwrightPath);

const outDir = "./verification-screens";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function runVerification() {
  console.log("Starting visual and interactive verification...");
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  
  // Track errors
  const consoleErrors = [];
  const pageErrors = [];

  // 1. Desktop Test (1440x900)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("console", (m) => {
    if (m.type() === "error") {
      consoleErrors.push(m.text());
    }
  });
  page.on("pageerror", (e) => pageErrors.push(e.message));

  console.log("Navigating to http://localhost:3010 ...");
  await page.goto("http://localhost:3010", { waitUntil: "networkidle", timeout: 30000 });

  // 1. Hero Screenshot
  await page.screenshot({ path: path.join(outDir, "01-hero-desktop.png") });
  console.log("Captured: 01-hero-desktop.png");

  // 2. Services Section
  const servicesEl = page.locator("#services");
  await servicesEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, "02-services-desktop.png") });
  console.log("Captured: 02-services-desktop.png");

  // Test opening a Service Modal
  const learnMoreBtn = page.locator("button:has-text('Learn More')").first();
  await learnMoreBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, "03-service-modal.png") });
  console.log("Captured: 03-service-modal.png");
  // Close service modal
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  // 3. Dentists Section
  const dentistsEl = page.locator("#dentists");
  await dentistsEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, "04-dentists-desktop.png") });
  console.log("Captured: 04-dentists-desktop.png");

  // Test opening Dentist Profile Modal
  const profileBtn = page.locator("button:has-text('View Profile')").first();
  await profileBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, "05-dentist-modal.png") });
  console.log("Captured: 05-dentist-modal.png");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  // 4. Booking Section & Form Submission
  const bookingEl = page.locator("#booking");
  await bookingEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, "06-booking-form.png") });
  console.log("Captured: 06-booking-form.png");

  // Fill booking form
  await page.fill("#patientName", "Alexander Wright");
  await page.fill("#patientEmail", "alexander.w@example.com");
  await page.fill("#patientPhone", "(415) 555-8930");
  
  // Pick an open time slot button
  const openSlotBtn = page.locator("button:has-text('Open')").first();
  if (await openSlotBtn.count() > 0) {
    await openSlotBtn.click();
  }

  // Submit appointment
  const submitBookingBtn = page.locator("button:has-text('Confirm Demo Appointment')");
  await submitBookingBtn.click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, "07-booking-voucher-confirmed.png") });
  console.log("Captured: 07-booking-voucher-confirmed.png");

  // 5. Before & After Gallery & Interactive Slider
  const sliderBtn = page.locator("button:has-text('Interactive Slider View')").first();
  if (await sliderBtn.count() > 0) {
    const parentCase = sliderBtn.locator("..");
    await parentCase.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    // Click view detail or slider
    await sliderBtn.click({ force: true });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, "08-before-after-slider.png") });
    console.log("Captured: 08-before-after-slider.png");
    const closeBtn = page.locator("button:has-text('Close Preview')");
    if (await closeBtn.count() > 0) {
      await closeBtn.click();
    } else {
      await page.keyboard.press("Escape");
    }
    await page.waitForTimeout(500);
  }

  // 6. Testimonials & Reviews
  const reviewsEl = page.locator("#reviews");
  await reviewsEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, "09-testimonials.png") });
  console.log("Captured: 09-testimonials.png");

  // 7. FAQs Section
  const faqsEl = page.locator("#faqs");
  await faqsEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, "10-faqs.png") });
  console.log("Captured: 10-faqs.png");

  // 8. Contact & Footer
  const contactEl = page.locator("#contact");
  await contactEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, "11-contact-footer.png") });
  console.log("Captured: 11-contact-footer.png");

  // Mobile Viewport Test (375x812)
  console.log("Testing mobile responsiveness (375px)...");
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobilePage.goto("http://localhost:3010", { waitUntil: "networkidle" });
  await mobilePage.screenshot({ path: path.join(outDir, "12-mobile-hero.png") });
  console.log("Captured: 12-mobile-hero.png");

  // Mobile menu test
  const menuBtn = mobilePage.locator("button[aria-label='Open menu']");
  if (await menuBtn.count() > 0) {
    await menuBtn.click();
    await mobilePage.waitForTimeout(300);
    await mobilePage.screenshot({ path: path.join(outDir, "13-mobile-nav-drawer.png") });
    console.log("Captured: 13-mobile-nav-drawer.png");
  }

  await browser.close();

  console.log("\n--- VERIFICATION REPORT ---");
  console.log("Console Errors:", consoleErrors.length, consoleErrors);
  console.log("Page Errors:", pageErrors.length, pageErrors);
  console.log("All screenshots saved to:", outDir);
}

runVerification().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
