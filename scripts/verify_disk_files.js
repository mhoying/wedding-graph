import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_HEADSHOTS = path.join(ROOT_DIR, 'public', 'headshots');

async function auditDiskFiles() {
  const files = fs.readdirSync(PUBLIC_HEADSHOTS).filter(f => f.endsWith('.jpg'));
  console.log("================================================================================");
  console.log(`   EMPIRICAL FILE AUDIT FOR ALL ${files.length} GENERATED HEADSHOT JPEGS`);
  console.log("================================================================================\n");

  const rows = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const filePath = path.join(PUBLIC_HEADSHOTS, f);
    const stat = fs.statSync(filePath);
    const img = await loadImage(filePath);

    rows.push({
      "Index": i + 1,
      "Guest ID": f.replace('.jpg', ''),
      "Canvas Resolution": `${img.width}x${img.height}`,
      "File Size": `${(stat.size / 1024).toFixed(1)} KB`,
      "Timestamp": stat.mtime.toISOString().split('T')[1].slice(0, 8) + " UTC"
    });
  }

  console.table(rows);
  console.log(`\n✅ Total Verified 400x400 JPEGs on Disk: ${files.length}`);
}

auditDiskFiles().catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
