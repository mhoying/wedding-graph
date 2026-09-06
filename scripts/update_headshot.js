#!/usr/bin/env node
/**
 * 100% Node.js Headshot Ingestion & Calibration CLI Tool (Zero Python Dependencies)
 * Usage:
 *   node scripts/update_headshot.js --guest <guest_id> --cx <cx_pct> --cy <cy_pct> --face_h <face_h_px> [--src <path>] [--deploy]
 *
 * Example:
 *   node scripts/update_headshot.js --guest tracy_armstrong --cx 0.360 --cy 0.480 --face_h 280 --src raw_sources/tracy_armstrong__orig_media.jpg --deploy
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { createCanvas, loadImage } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const BRAIN_DIR = "/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558";
const RAW_SOURCES_DIR = path.join(ROOT_DIR, "raw_sources");
const PUBLIC_HEADSHOTS_DIR = path.join(ROOT_DIR, "public", "headshots");
const MANIFEST_PATH = path.join(ROOT_DIR, "headshots_manifest.json");
const SAMPLE_DATA_PATH = path.join(ROOT_DIR, "src", "data", "sampleData.js");

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {
    guest: null,
    cx: null,
    cy: null,
    face_h: 200,
    src: null,
    deploy: true
  };

  for (let i = 0; i < args.length; i++) {
    const flag = args[i];
    const val = args[i + 1];
    if (flag === '--guest') { params.guest = val; i++; }
    else if (flag === '--cx') { params.cx = parseFloat(val); i++; }
    else if (flag === '--cy') { params.cy = parseFloat(val); i++; }
    else if (flag === '--face_h') { params.face_h = parseInt(val, 10); i++; }
    else if (flag === '--src' || flag === '--raw') { params.src = val; i++; }
    else if (flag === '--no-deploy') { params.deploy = false; }
    else if (flag === '--deploy') { params.deploy = true; }
  }

  if (!params.guest || params.cx === null || params.cy === null) {
    console.error("❌ Usage: node scripts/update_headshot.js --guest <id> --cx <pct> --cy <pct> [--face_h <px>] [--src <path>] [--deploy]");
    process.exit(1);
  }
  return params;
}

function findLatestBrainImage() {
  let latestFile = null;
  let maxTime = 0;

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'scratch' && entry.name !== '.tempmediaStorage') {
          walk(fullPath);
        }
      } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
        const stat = fs.statSync(fullPath);
        if (stat.mtimeMs > maxTime) {
          maxTime = stat.mtimeMs;
          latestFile = fullPath;
        }
      }
    }
  }

  walk(BRAIN_DIR);
  if (!latestFile) throw new Error("No uploaded image found in session brain directory!");
  return latestFile;
}

async function main() {
  const params = parseArgs();
  console.log(`\n📸 Node.js Headshot Ingestion Tool for: ${params.guest}`);

  // 1. Locate source photo
  let sourcePhoto = params.src;
  if (!sourcePhoto) {
    sourcePhoto = findLatestBrainImage();
  }
  console.log(`🖼️ Source photo: ${sourcePhoto}`);

  // 2. Ensure raw_sources directory exists and save master raw copy
  if (!fs.existsSync(RAW_SOURCES_DIR)) fs.mkdirSync(RAW_SOURCES_DIR, { recursive: true });
  const rawDest = path.join(RAW_SOURCES_DIR, `${params.guest}__orig_media.jpg`);

  if (path.resolve(sourcePhoto) !== path.resolve(rawDest)) {
    fs.copyFileSync(sourcePhoto, rawDest);
    console.log(`💾 Saved master raw copy: ${rawDest}`);
  }

  // 3. Load image & execute crop using Node canvas
  const img = await loadImage(rawDest);
  const w = img.width;
  const h = img.height;

  const cxPx = params.cx * w;
  const cyPx = params.cy * h;

  // Formula: crop_size = int(face_h / 0.59) -> Output rendered face height = 236px (59.0% fill in 400x400)
  const cropSize = Math.floor(params.face_h / 0.59);
  const halfCrop = Math.floor(cropSize / 2);

  const cropL = Math.round(cxPx - halfCrop);
  const cropT = Math.round(cyPx - halfCrop);

  console.log(`📐 Image size: ${w}x${h} | Centroid: (${cxPx.toFixed(1)}, ${cyPx.toFixed(1)}) | Crop box: ${cropSize}px sq`);

  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, 400, 400);

  // Draw cropped and scaled image onto 400x400 canvas
  ctx.drawImage(img, cropL, cropT, cropSize, cropSize, 0, 0, 400, 400);

  if (!fs.existsSync(PUBLIC_HEADSHOTS_DIR)) fs.mkdirSync(PUBLIC_HEADSHOTS_DIR, { recursive: true });
  const outHeadshotPath = path.join(PUBLIC_HEADSHOTS_DIR, `${params.guest}.jpg`);

  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
  fs.writeFileSync(outHeadshotPath, buffer);
  console.log(`✅ Rendered 400x400 headshot JPEG to: ${outHeadshotPath}`);

  // 4. Update headshots_manifest.json
  let manifest = { calibration_defaults: { output_resolution: 400, target_face_scale: 0.65 }, guests: {} };
  if (fs.existsSync(MANIFEST_PATH)) {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  }

  manifest.guests[params.guest] = {
    raw_source: `raw_sources/${params.guest}__orig_media.jpg`,
    cx_pct: params.cx,
    cy_pct: params.cy,
    face_h_px: params.face_h,
    face_h_pct: Number((params.face_h / h).toFixed(4)),
    crop_size_px: cropSize,
    face_selection: "node_canvas_calibrated"
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`📝 Updated headshots_manifest.json for: ${params.guest}`);

  // 5. Update src/data/sampleData.js
  if (fs.existsSync(SAMPLE_DATA_PATH)) {
    let code = fs.readFileSync(SAMPLE_DATA_PATH, 'utf8');
    const newTimestamp = Date.now();
    code = code.replace(/export const BUILD_TIMESTAMP = \d+;/, `export const BUILD_TIMESTAMP = ${newTimestamp};`);
    console.log(`🔄 Bumped BUILD_TIMESTAMP cache-buster to: ${newTimestamp}`);

    const targetIdStr = `"id": "${params.guest}"`;
    const expectedImgLink = `headshots/${params.guest}.jpg`;

    if (code.includes(targetIdStr) && !code.includes(expectedImgLink)) {
      code = code.replace(targetIdStr, `${targetIdStr},\n    "image": "${expectedImgLink}"`);
      console.log(`🔗 Linked image in sampleData.js for: ${params.guest}`);
    }

    fs.writeFileSync(SAMPLE_DATA_PATH, code, 'utf8');
  }

  // 6. Build and deploy if requested
  if (params.deploy) {
    console.log("\n🚀 Triggering Vite build & live deployment via Node.js...");
    execSync('npx vite build', { cwd: ROOT_DIR, stdio: 'inherit' });
    execSync('git add headshots_manifest.json raw_sources public/headshots src/data/sampleData.js scripts/update_headshot.js package.json', { cwd: ROOT_DIR, stdio: 'inherit' });
    execSync(`git commit -m "fix(headshot): update ${params.guest} headshot via Node.js CLI"`, { cwd: ROOT_DIR, stdio: 'inherit' });
    execSync('npx gh-pages -d dist', { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log(`\n🎉 DONE! Live site updated at https://hoyingwink.com without python3 calls!`);
  }
}

main().catch(err => {
  console.error("❌ Error in update_headshot.js:", err);
  process.exit(1);
});
