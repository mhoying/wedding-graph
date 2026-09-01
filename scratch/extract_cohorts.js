const fs = require('fs');
const path = require('path');

const sampleDataContent = fs.readFileSync(path.resolve('src/data/sampleData.js'), 'utf8');

// Parse nodes from sampleData.js
const match = sampleDataContent.match(/export const sampleData = ({[\s\S]*?});/);
if (!match) {
  console.error('Could not find sampleData export');
  process.exit(1);
}

// Extract all cohort values using regex
const cohortMatches = sampleDataContent.matchAll(/cohort:\s*['"](.*?)['"]/g);
const cohorts = new Set();
for (const m of cohortMatches) {
  cohorts.add(m[1]);
}

console.log('ACTUAL GROUND TRUTH COHORTS IN SAMPLE DATA:');
console.log(Array.from(cohorts).sort());
