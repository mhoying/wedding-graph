import puppeteer from 'puppeteer';

(async () => {
  console.log('📱 Starting Mobile Viewport Responsive E2E Test (iPhone & Android)...');
  
  // Mobile Profiles
  const devices = [
    { name: 'iPhone 14 Pro', width: 393, height: 852, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X)' },
    { name: 'Android Pixel 7', width: 412, height: 915, userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7)' }
  ];

  for (const dev of devices) {
    console.log(`Testing viewport for ${dev.name} (${dev.width}x${dev.height})...`);
    
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: '/usr/bin/chromium',
      environment: { DISPLAY: ':0' },
      args: ['--no-sandbox', `--window-size=${dev.width + 20},${dev.height + 100}`]
    });
    
    const page = await browser.newPage();
    await page.setUserAgent(dev.userAgent);
    await page.setViewport({ width: dev.width, height: dev.height, isMobile: true, hasTouch: true });

    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

    // Unlock gate
    const gateInput = await page.$('input[placeholder*="Passcode"]');
    if (gateInput) {
      await page.type('input[placeholder*="Passcode"]', 'hoyingwink-honk');
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 1200));
    }

    // Open Championship Leaderboard
    const champBtn = await page.waitForSelector('.gaggle-header-btn');
    await champBtn.click();
    await new Promise(r => setTimeout(r, 1200));

    const imgPath = `/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/media__mobile_${dev.name.replace(/\s+/g, '_').toLowerCase()}.png`;
    await page.screenshot({ path: imgPath });
    console.log(`Captured screenshot for ${dev.name}: ${imgPath}`);

    await browser.close();
  }

  console.log('✅ Mobile Responsive E2E Test finished successfully!');
})();
