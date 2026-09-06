import puppeteer from 'puppeteer';

(async () => {
  console.log('📱 Running Mobile (iPhone 14 Pro 393x852) UI Interactive Test...');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });

  await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Bypass Passcode Gate
  try {
    const gateInput = await page.$('input[placeholder*="Passcode"]');
    if (gateInput) {
      await page.type('input[placeholder*="Passcode"]', 'hoyingwink-honk');
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 1000));
    }
  } catch (e) {}

  // 1. Mobile Main Interface with Quick Dock
  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/scratch/mobile_393_main_app.png' });

  // 2. Open Mobile Quick Dock Mingling Leaderboard
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const mingBtn = btns.find(b => b.textContent.includes('Mingling'));
    if (mingBtn) mingBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/scratch/mobile_393_leaderboard.png' });

  // Close Leaderboard
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const closeBtn = btns.find(b => b.textContent.includes('✕'));
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 3. Open Directory & Guest Drawer
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const dirBtn = btns.find(b => b.textContent.includes('Directory'));
    if (dirBtn) dirBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const inspectBtn = btns.find(b => b.textContent.includes('Inspect'));
    if (inspectBtn) inspectBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/scratch/mobile_393_profile_drawer.png' });

  // 4. Open Mobile Controls Sheet
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const ctrlBtn = btns.find(b => b.textContent.includes('Controls'));
    if (ctrlBtn) ctrlBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/scratch/mobile_393_controls_sheet.png' });

  await browser.close();
  console.log('✅ Mobile Interactive Test Complete!');
})();
