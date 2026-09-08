import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const BRAIN_DIR = '/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558';

const targets = ['romana_rajput', 'poukhan_philavanh_anthony', 'nishat_shaikh', 'steve_nares'];

async function inspectProblemGuests() {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'headshots_manifest.json'), 'utf8'));

  for (const id of targets) {
    const entry = manifest.guests[id] || {};
    const rawPath = path.join(ROOT_DIR, entry.raw_source || '');

    if (fs.existsSync(rawPath)) {
      const img = await loadImage(rawPath);
      const w = img.width;
      const h = img.height;

      // Copy current public headshot
      const currentHeadshot = path.join(ROOT_DIR, 'public', 'headshots', `${id}.jpg`);
      if (fs.existsSync(currentHeadshot)) {
        fs.copyFileSync(currentHeadshot, path.join(BRAIN_DIR, `current_${id}.jpg`));
      }

      console.log(`📌 Guest: ${id}`);
      console.log(`   Raw Source: ${entry.raw_source} (${w}x${h})`);
      console.log(`   Current Centroid: cx=${entry.cx_pct}, cy=${entry.cy_pct}`);
    } else {
      console.log(`⚠️ Raw path not found for ${id}: ${rawPath}`);
    }
  }
}

inspectProblemGuests().catch(console.error);
