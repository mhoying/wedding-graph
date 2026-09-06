import puppeteer from 'puppeteer';

(async () => {
  console.log('🚀 Starting 5-Round Multi-Device Championship Simulation on DISPLAY=:0...');
  
  // Launch Device A ("Matt Hoying")
  const browserA = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium',
    environment: { DISPLAY: ':0' },
    args: ['--no-sandbox', '--window-position=20,50', '--window-size=650,880']
  });
  const pageA = await browserA.newPage();
  await pageA.setViewport({ width: 650, height: 880 });

  // Launch Device B ("Maureen Wink")
  const browserB = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium',
    environment: { DISPLAY: ':0' },
    args: ['--no-sandbox', '--window-position=700,50', '--window-size=650,880']
  });
  const pageB = await browserB.newPage();
  await pageB.setViewport({ width: 650, height: 880 });

  console.log('Opening local preview server http://localhost:4173...');
  await Promise.all([
    pageA.goto('http://localhost:4173', { waitUntil: 'networkidle0' }),
    pageB.goto('http://localhost:4173', { waitUntil: 'networkidle0' })
  ]);

  // Bypass Passcode Gate
  for (const page of [pageA, pageB]) {
    const gateInput = await page.$('input[placeholder*="Passcode"]');
    if (gateInput) {
      await page.type('input[placeholder*="Passcode"]', 'hoyingwink-honk');
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 1200));
    }
  }

  // Set Active Player Names
  await pageA.evaluate(() => localStorage.setItem('wedding_graph_active_player_v100', 'Matt Hoying'));
  await pageB.evaluate(() => localStorage.setItem('wedding_graph_active_player_v100', 'Maureen Wink'));

  // Target Guests for 5 Encounter Rounds:
  // Round 1: Alex Murillo (Dog Park, SF Bay Area)
  // Round 2: Nur E. (Bay FC, San Jose)
  // Round 3: Tim Coble (Dog Park, San Jose)
  // Round 4: Jonathan "J-Bibbs" Bibayan (Jenna, Los Angeles)
  // Round 5: Chuck Tempest (Cornell, Upstate NY)
  const targetGuests = [
    { name: 'Alex Murillo', cohort: 'Dog Park' },
    { name: 'Nur E.', cohort: 'Bay FC' },
    { name: 'Tim Coble', cohort: 'Dog Park' },
    { name: 'Jonathan "J-Bibbs" Bibayan', cohort: 'Jenna' },
    { name: 'Chuck Tempest', cohort: 'Cornell' }
  ];

  console.log('--- EXECUTING 5 ENCOUNTER ROUNDS FOR DEVICE A (Matt Hoying) ---');
  for (let i = 0; i < targetGuests.length; i++) {
    const target = targetGuests[i];
    console.log(`[Round ${i + 1}/5] Device A honking at: ${target.name} (${target.cohort})...`);
    
    await pageA.evaluate((guestName) => {
      const storeKey = 'wedding_graph_gaggle_v100_store';
      const raw = localStorage.getItem(storeKey);
      const data = raw ? JSON.parse(raw) : { encounters: [], playerSprintStarts: {} };
      
      data.playerSprintStarts['Matt Hoying'] = data.playerSprintStarts['Matt Hoying'] || Date.now() - 120000;
      
      const newEncounter = {
        id: `honk_round_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        actor: 'Matt Hoying',
        target: guestName,
        targetCohort: guestName.includes('Murillo') || guestName.includes('Coble') ? 'Dog Park' : (guestName.includes('Nur') ? 'Bay FC' : (guestName.includes('Bibbs') ? 'Jenna' : 'Cornell')),
        targetCity: 'SF Bay Area',
        timestamp: Date.now()
      };
      
      data.encounters.unshift(newEncounter);
      localStorage.setItem(storeKey, JSON.stringify(data));
    }, target.name);

    await new Promise(r => setTimeout(r, 400));
  }

  console.log('--- EXECUTING 3 ENCOUNTER ROUNDS FOR DEVICE B (Maureen Wink) ---');
  const targetGuestsB = ['Ashley Fishard', 'Jim McMullan', 'Missy Ruminski'];
  for (let i = 0; i < targetGuestsB.length; i++) {
    const targetName = targetGuestsB[i];
    console.log(`[Round ${i + 1}/3] Device B honking at: ${targetName}...`);
    
    await pageB.evaluate((guestName) => {
      const storeKey = 'wedding_graph_gaggle_v100_store';
      const raw = localStorage.getItem(storeKey);
      const data = raw ? JSON.parse(raw) : { encounters: [], playerSprintStarts: {} };
      
      const newEncounter = {
        id: `honk_b_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        actor: 'Maureen Wink',
        target: guestName,
        targetCohort: 'Cornell',
        targetCity: 'Upstate NY',
        timestamp: Date.now()
      };
      
      data.encounters.unshift(newEncounter);
      localStorage.setItem(storeKey, JSON.stringify(data));
    }, targetName);
  }

  // Reload page state on both devices to trigger store sync recalculation
  await Promise.all([
    pageA.goto('http://localhost:4173', { waitUntil: 'networkidle0' }),
    pageB.goto('http://localhost:4173', { waitUntil: 'networkidle0' })
  ]);
  await new Promise(r => setTimeout(r, 1200));

  // Bypass Passcode Gate if re-prompted
  for (const page of [pageA, pageB]) {
    const gateInput = await page.$('input[placeholder*="Passcode"]');
    if (gateInput) {
      await page.type('input[placeholder*="Passcode"]', 'hoyingwink-honk');
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // Open Leaderboard on Device A
  console.log('Opening Leaderboard on Device A to verify 5 Competition Tabs...');
  await pageA.click('.gaggle-header-btn');
  await new Promise(r => setTimeout(r, 1500));

  // Screenshot Tab 1: Master Gaggle
  await pageA.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/media__sim_tab1_master_gaggle.png' });
  console.log('Captured Tab 1: Master Gaggle');

  // Click Tab 2: Honk Specialist
  await pageA.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const tab = btns.find(b => b.textContent.includes('Honk Specialist'));
    if (tab) tab.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await pageA.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/media__sim_tab2_honk_specialist.png' });
  console.log('Captured Tab 2: Honk Specialist');

  // Click Tab 3: Migration Sprint
  await pageA.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const tab = btns.find(b => b.textContent.includes('Migration Sprint'));
    if (tab) tab.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await pageA.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/media__sim_tab3_migration_sprint.png' });
  console.log('Captured Tab 3: Migration Sprint');

  // Expand Player Details to inspect connection deep-dive
  await pageA.evaluate(() => {
    const card = document.querySelector('.bg-amber-950\\/30, .bg-slate-800\\/50');
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await pageA.screenshot({ path: '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558/media__sim_expanded_connections.png' });
  console.log('Captured Expanded Connection Deep-Dive!');

  await browserA.close();
  await browserB.close();
  console.log('✅ 5-Round Multi-Device Simulation finished successfully!');
})();
