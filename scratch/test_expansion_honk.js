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

  // Open Directory to Honk Jonathan Bibayan
  const directoryBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.textContent.includes('Directory List'));
  });
  if (directoryBtn) {
    await directoryBtn.click();
    await new Promise(r => setTimeout(r, 800));

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const inspectBtn = btns.find(b => b.textContent.includes('Inspect'));
      if (inspectBtn) inspectBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const honkBtn = btns.find(b => b.textContent.includes('Honk at'));
      if (honkBtn) honkBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
  }

  // Open Leaderboard
  const champBtn = await page.waitForSelector('.gaggle-header-btn');
  if (champBtn) await champBtn.click();

  await new Promise(r => setTimeout(r, 1000));

  // Click row expansion on player with honks
  await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('div')).filter(d => d.textContent.includes('honks') && d.textContent.includes('cohorts'));
    if (rows.length > 0) rows[0].click();
  });

  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/scratch/leaderboard_honked_expanded.png' });
  console.log('Saved screenshot of honked expanded leaderboard!');

  await browser.close();
})();
