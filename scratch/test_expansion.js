import puppeteer from 'puppeteer';

(async () => {
  console.log('🚀 Testing Leaderboard Chevron Expansion & Overflow...');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Passcode gate
  try {
    const gateInput = await page.$('input[placeholder*="Passcode"]');
    if (gateInput) {
      await page.type('input[placeholder*="Passcode"]', 'hoyingwink-honk');
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 1000));
    }
  } catch (e) {}

  // Open Leaderboard directly
  const champBtn = await page.waitForSelector('.gaggle-header-btn');
  if (champBtn) await champBtn.click();

  await new Promise(r => setTimeout(r, 1000));

  // Click the expansion chevron / row for the top player
  await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('div')).filter(d => d.textContent.includes('honks') && d.textContent.includes('cohorts'));
    if (rows.length > 0) rows[0].click();
  });

  await new Promise(r => setTimeout(r, 800));

  // Also toggle Rules
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const rBtn = btns.find(b => b.textContent.includes('Rules'));
    if (rBtn) rBtn.click();
  });

  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/scratch/leaderboard_expanded_test.png' });
  console.log('Saved screenshot of expanded leaderboard!');

  await browser.close();
})();
