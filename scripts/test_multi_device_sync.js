import puppeteer from 'puppeteer';

(async () => {
  console.log('🚀 Starting Multi-Device Cross-Sync E2E Test on DISPLAY=:0...');
  
  // Launch Browser Instance 1 (Device A: "Matt Hoying")
  const browserA = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium',
    environment: { DISPLAY: ':0' },
    args: ['--no-sandbox', '--window-position=50,100', '--window-size=650,850']
  });
  const pageA = await browserA.newPage();
  await pageA.setViewport({ width: 650, height: 850 });

  // Launch Browser Instance 2 (Device B: "Maureen Wink")
  const browserB = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium',
    environment: { DISPLAY: ':0' },
    args: ['--no-sandbox', '--window-position=750,100', '--window-size=650,850']
  });
  const pageB = await browserB.newPage();
  await pageB.setViewport({ width: 650, height: 850 });

  console.log('Device A & Device B opening http://localhost:4173...');
  await Promise.all([
    pageA.goto('http://localhost:4173', { waitUntil: 'networkidle0' }),
    pageB.goto('http://localhost:4173', { waitUntil: 'networkidle0' })
  ]);

  // Unlock Passcode Gate on both devices
  for (const page of [pageA, pageB]) {
    const gateInput = await page.$('input[placeholder*="Passcode"]');
    if (gateInput) {
      await page.type('input[placeholder*="Passcode"]', 'hoyingwink-honk');
      await page.keyboard.press('Enter');
    }
  }
  await new Promise(r => setTimeout(r, 1200));

  // Set Device A player name to "Matt Hoying"
  await pageA.evaluate(() => {
    localStorage.setItem('wedding_graph_active_player_v100', 'Matt Hoying');
  });

  // Set Device B player name to "Maureen Wink"
  await pageB.evaluate(() => {
    localStorage.setItem('wedding_graph_active_player_v100', 'Maureen Wink');
  });

  // Device A honks at "Alex Murillo"
  console.log('Device A ("Matt Hoying") honking at Alex Murillo...');
  await pageA.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const listBtn = btns.find(b => b.textContent.includes('Directory List'));
    if (listBtn) listBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await pageA.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const inspectBtn = btns.find(b => b.textContent.includes('Inspect'));
    if (inspectBtn) inspectBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await pageA.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const honkBtn = btns.find(b => b.textContent.includes('Honk at'));
    if (honkBtn) honkBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  // Device B opens Championship Leaderboard
  console.log('Device B ("Maureen Wink") opening Leaderboard to inspect live cross-device sync...');
  const champBtnB = await pageB.waitForSelector('.gaggle-header-btn');
  await champBtnB.click();
  await new Promise(r => setTimeout(r, 1200));

  // Capture side-by-side screenshots
  await pageA.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/media__device_a_honked.png' });
  await pageB.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/media__device_b_leaderboard_synced.png' });

  console.log('Captured Device A and Device B screenshots!');

  await browserA.close();
  await browserB.close();
  console.log('✅ Multi-device simulation test completed!');
})();
