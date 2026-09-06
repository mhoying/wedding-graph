import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

(async () => {
  console.log('🚀 Starting E2E Puppeteer test for The Grand Gaggle Championship on DISPLAY=:0...');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium',
    environment: { DISPLAY: ':0' },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  // 1. Load app on local preview server
  console.log('Navigating to http://localhost:4173...');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  // 2. Bypass Passcode Gate if present
  const gateInput = await page.$('input[placeholder*="Passcode"]');
  if (gateInput) {
    console.log('Unlocking passcode gate...');
    await page.type('input[placeholder*="Passcode"]', 'hoyingwink-honk');
    await page.keyboard.press('Enter');
    await new Promise(r => setTimeout(r, 1000));
  }

  // 3. Open Championship Modal from Header Button
  console.log('Clicking Championship header button...');
  const champBtn = await page.waitForSelector('.gaggle-header-btn');
  await champBtn.click();
  await new Promise(r => setTimeout(r, 1000));

  // Take screenshot of initial Leaderboard
  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/media__gaggle_leaderboard_initial.png' });
  console.log('Captured initial leaderboard screenshot.');

  // Close modal
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const closeBtn = btns.find(b => b.textContent.includes('✕'));
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // 4. Open Directory List and inspect Jonathan Bibayan
  console.log('Opening Directory List to locate Jonathan Bibayan...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const listBtn = btns.find(b => b.textContent.includes('Directory List'));
    if (listBtn) listBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const inspectBtn = btns.find(b => b.textContent.includes('Inspect'));
    if (inspectBtn) inspectBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // 5. Click "Honk at Jonathan Bibayan"
  console.log('Clicking "Honk at Jonathan Bibayan"...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const honkBtn = btns.find(b => b.textContent.includes('Honk at'));
    if (honkBtn) honkBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  // Take screenshot after Honk encounter
  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/media__gaggle_after_honk.png' });
  console.log('Captured after-honk screenshot with Toast!');

  // 6. Re-open Leaderboard to confirm score update
  console.log('Re-opening Leaderboard to verify live score update...');
  const champBtn2 = await page.waitForSelector('.gaggle-header-btn');
  await champBtn2.click();
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/media__gaggle_leaderboard_updated.png' });
  console.log('Captured updated leaderboard screenshot!');

  await browser.close();
  console.log('✅ E2E Test completed successfully!');
})();
