import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sampleDataPath = path.join(__dirname, '../src/data/sampleData.js');
const rawContent = fs.readFileSync(sampleDataPath, 'utf8');

const match = rawContent.match(/export const SAMPLE_NODES = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('❌ Could not parse SAMPLE_NODES from sampleData.js');
  process.exit(1);
}

const nodes = JSON.parse(match[1]);
const guestNodes = nodes.filter(n => n.type === 'GUEST');

const counts = {};
guestNodes.forEach(n => {
  (n.hobbies || []).forEach(h => {
    if (h && h.trim()) {
      const key = h.trim();
      counts[key] = (counts[key] || 0) + 1;
    }
  });
});

console.log(`\n📊 DYNAMIC IDF TAG WEIGHTS REPORT (${guestNodes.length} Guests)`);
console.log(`========================================================`);

const sortedTags = Object.entries(counts).sort((a, b) => b[1] - a[1]);

sortedTags.forEach(([tag, count]) => {
  const weight = Math.min(85, Math.max(10, Math.round(80 / Math.pow(count, 0.55))));
  const bar = '█'.repeat(Math.round(weight / 5));
  console.log(`${tag.padEnd(22)} | Count: ${String(count).padEnd(2)} | Weight: ${String(weight).padEnd(2)} pts | ${bar}`);
});

console.log(`========================================================\n`);
