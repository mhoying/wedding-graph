const fs = require('fs');
const path = require('path');

const sampleDataContent = fs.readFileSync(path.resolve('src/data/sampleData.js'), 'utf8');

const cohortCounts = {};
const matches = sampleDataContent.matchAll(/"cohort":\s*"([^"]+)"/g);
let total = 0;
for (const m of matches) {
  total++;
  const c = m[1];
  cohortCounts[c] = (cohortCounts[c] || 0) + 1;
}

console.log(`TOTAL NODES IN SAMPLE DATA: ${total}`);
console.log('\nEXACT GROUND TRUTH COHORTS (Values & Frequencies):');
console.log(JSON.stringify(cohortCounts, null, 2));
