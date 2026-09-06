import puppeteer from 'puppeteer';

(async () => {
  console.log('🚀 Running Desktop 1440x900 Standard Resolution UI Test...');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

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

  // 1. Full Main Desktop Interface (1440x900)
  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/scratch/desktop_1440_main_app.png' });
  console.log('Saved 1440x900 Main Interface screenshot!');

  // 2. Open Live Leaderboard Modal
  const champBtn = await page.waitForSelector('.gaggle-header-btn');
  if (champBtn) await champBtn.click();
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/scratch/desktop_1440_leaderboard.png' });
  console.log('Saved 1440x900 Leaderboard screenshot!');

  // Close Leaderboard
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const closeBtn = btns.find(b => b.textContent.includes('✕'));
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 3. Open Directory & Inspect Profile Drawer
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const dirBtn = btns.find(b => b.textContent.includes('Directory List'));
    if (dirBtn) dirBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const inspectBtn = btns.find(b => b.textContent.includes('Inspect'));
    if (inspectBtn) inspectBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/scratch/desktop_1440_profile_drawer.png' });
  console.log('Saved 1440x900 Profile Drawer screenshot!');

  // 4. Open Cocktail Matchmaker
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const matchBtn = btns.find(b => b.textContent.includes('Matchmaker') || b.textContent.includes('🍸'));
    if (matchBtn) matchBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/scratch/desktop_1440_matchmaker.png' });
  console.log('Saved 1440x900 Cocktail Matchmaker screenshot!');

  await browser.close();
  console.log('✅ 1440x900 Desktop UI Test Complete!');
})();
