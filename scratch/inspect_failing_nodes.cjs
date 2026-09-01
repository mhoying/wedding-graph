const fs = require('fs');
const path = require('path');

const sampleDataContent = fs.readFileSync(path.resolve('src/data/sampleData.js'), 'utf8');

console.log('--- ROMANNA ---');
const romannaMatch = sampleDataContent.match(/\{[^}]*Romanna[^}]*\}/g);
console.log(romannaMatch);

console.log('--- NUR-E ---');
const nureMatch = sampleDataContent.match(/\{[^}]*Nur-E[^}]*\}/g);
console.log(nureMatch);

console.log('--- JESS PHAN ---');
const jessMatch = sampleDataContent.match(/\{[^}]*Jess Phan[^}]*\}/g);
console.log(jessMatch);

console.log('--- LESLIE ---');
const leslieMatch = sampleDataContent.match(/\{[^}]*Leslie[^}]*\}/g);
console.log(leslieMatch);

console.log('--- LINKS INVOLVING THESE NODES ---');
const linkMatches = sampleDataContent.matchAll(/\{\s*"source":\s*"([^"]+)",\s*"target":\s*"([^"]+)"/g);
for (const m of linkMatches) {
  if (m[1].includes('romanna') || m[2].includes('romanna') ||
      m[1].includes('nur') || m[2].includes('nur') ||
      m[1].includes('jess') || m[2].includes('jess') ||
      m[1].includes('leslie') || m[2].includes('leslie')) {
    console.log(m[0] + '}');
  }
}
