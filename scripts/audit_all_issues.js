import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const sampleDataPath = path.resolve('src/data/sampleData.js');
const csvPath = path.resolve('public/guests_template.csv');

let sampleDataContent = fs.readFileSync(sampleDataPath, 'utf-8');
const cleanedCode = sampleDataContent
  .replace(/export function /g, 'function ')
  .replace(/export const /g, 'const ')
  .replace(/export default /g, ';');

const evalFn = new Function(cleanedCode + '; return { SAMPLE_NODES, SAMPLE_LINKS };');
const { SAMPLE_NODES } = evalFn();

console.log('Running automated bi-daily guest proposal audit...');

// Fetch closed issues with guest-edit-proposal label
let issues = [];
try {
  const issuesJsonStr = execSync('gh issue list --state closed --label guest-edit-proposal --limit 200 --json number,title,body,closedAt', { encoding: 'utf-8' });
  issues = JSON.parse(issuesJsonStr);
} catch (e) {
  console.log('Could not fetch closed issues via gh CLI:', e.message);
  process.exit(0);
}

console.log(`Auditing ${issues.length} closed proposal issues...`);
issues.sort((a, b) => a.number - b.number);

let changesMade = false;

for (const issue of issues) {
  const body = issue.body || '';
  const jsonMatch = body.match(/```json\s*([\s\S]*?)\s*```/);
  if (!jsonMatch || !jsonMatch[1]) continue;

  let payload;
  try {
    payload = JSON.parse(jsonMatch[1]);
  } catch (e) {
    continue;
  }

  const targetId = payload.targetId || payload.nodeId;
  if (!targetId) continue;

  const node = SAMPLE_NODES.find(n => n.id === targetId);
  if (!node) continue;

  // Verify & Patch Hobbies
  if (payload.proposedHobbies) {
    const propHobbies = payload.proposedHobbies.split(/[,;]/).map(h => h.trim()).filter(Boolean);
    const curHobbies = node.hobbies || [];
    const missing = propHobbies.filter(h => !curHobbies.map(x => x.toLowerCase()).includes(h.toLowerCase()));
    if (missing.length > 0) {
      console.log(`[Audit Fix] Node "${node.name}" missing hobbies: [${missing.join(', ')}] from Issue #${issue.number}`);
      node.hobbies = Array.from(new Set([...curHobbies, ...missing]));
      changesMade = true;
    }
  }

  // Verify & Patch Location
  if (payload.proposedLocation && payload.proposedLocation.trim()) {
    const propLoc = payload.proposedLocation.trim();
    if (!node.currentlyLivesIn || node.currentlyLivesIn.toLowerCase() !== propLoc.toLowerCase()) {
      console.log(`[Audit Fix] Node "${node.name}" location update: "${propLoc}" from Issue #${issue.number}`);
      node.currentlyLivesIn = propLoc;
      changesMade = true;
    }
  }

  // Verify & Patch Originally From
  const origFromMatch = body.match(/Originally From:\s*([^|\n]+)/i);
  if (origFromMatch && origFromMatch[1]) {
    const propOrig = origFromMatch[1].trim();
    if (!node.originallyFrom || node.originallyFrom.toLowerCase() !== propOrig.toLowerCase()) {
      console.log(`[Audit Fix] Node "${node.name}" hometown update: "${propOrig}" from Issue #${issue.number}`);
      node.originallyFrom = propOrig;
      changesMade = true;
    }
  }
}

if (changesMade) {
  function generateSampleDataJs(nodes) {
    const jsonNodesStr = JSON.stringify(nodes, null, 2);
    const nodesStartMarker = 'export const SAMPLE_NODES = [';
    const nodesEndMarker = '];\n\nexport const SAMPLE_LINKS = [';
    const startIndex = sampleDataContent.indexOf(nodesStartMarker);
    const endIndex = sampleDataContent.indexOf(nodesEndMarker);
    const prefix = sampleDataContent.substring(0, startIndex + 'export const SAMPLE_NODES = '.length);
    const suffix = sampleDataContent.substring(endIndex);
    return prefix + jsonNodesStr + suffix;
  }

  function generateGuestsCsv(nodes) {
    const header = "id,name,cohort,side,relationship,originallyFrom,currentlyLivesIn,familyStatus,hobbies";
    const rows = nodes.map(n => {
      const esc = (val) => {
        if (val === undefined || val === null) return '""';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return `"${str}"`;
      };
      const hobbiesStr = Array.isArray(n.hobbies) ? n.hobbies.join(', ') : (n.hobbies || '');
      return [
        n.id,
        esc(n.name),
        esc(n.cohort),
        esc(n.side),
        esc(n.relationship),
        esc(n.originallyFrom || ''),
        esc(n.currentlyLivesIn || ''),
        esc(n.familyStatus || ''),
        esc(hobbiesStr)
      ].join(',');
    });
    return [header, ...rows].join('\n');
  }

  fs.writeFileSync(sampleDataPath, generateSampleDataJs(SAMPLE_NODES), 'utf-8');
  fs.writeFileSync(csvPath, generateGuestsCsv(SAMPLE_NODES), 'utf-8');
  console.log('✅ Audit complete: Discrepancies auto-corrected and written to sampleData.js and guests_template.csv!');
} else {
  console.log('✅ Audit complete: 100% data parity verified across all closed proposal issues!');
}
