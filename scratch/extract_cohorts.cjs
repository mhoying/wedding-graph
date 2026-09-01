const fs = require('fs');
const path = require('path');

const sampleDataContent = fs.readFileSync(path.resolve('src/data/sampleData.js'), 'utf8');

const cohortMatches = sampleDataContent.matchAll(/cohort:\s*['"](.*?)['"]/g);
const cohorts = new Map();
for (const m of cohortMatches) {
  const val = m[1];
  cohorts.set(val, (cohorts.get(val) || 0) + 1);
}

console.log('ACTUAL GROUND TRUTH COHORTS IN SAMPLE DATA:');
console.log(JSON.stringify(Object.fromEntries(cohorts), null, 2));
