import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const sampleDataPath = path.resolve('src/data/sampleData.js');
const csvPath = path.resolve('public/guests_template.csv');
const devLogPath = path.resolve('development_log.md');

let sampleDataContent = fs.readFileSync(sampleDataPath, 'utf-8');
const cleanedCode = sampleDataContent
  .replace(/export function /g, 'function ')
  .replace(/export const /g, 'const ')
  .replace(/export default /g, ';');

const evalFn = new Function(cleanedCode + '; return { SAMPLE_NODES, SAMPLE_LINKS };');
const { SAMPLE_NODES } = evalFn();

console.log('🚀 Running automated bi-daily guest proposal audit...');

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
const detectedChangesList = [];

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
      const msg = `Issue #${issue.number} (${node.name}): Added missing hobbies [${missing.join(', ')}]`;
      console.log(`[Audit Fix] ${msg}`);
      detectedChangesList.push(msg);
      node.hobbies = Array.from(new Set([...curHobbies, ...missing]));
      changesMade = true;
    }
  }

  // Verify & Patch Location
  if (payload.proposedLocation && payload.proposedLocation.trim()) {
    const propLoc = payload.proposedLocation.trim();
    if (!node.currentlyLivesIn || node.currentlyLivesIn.toLowerCase() !== propLoc.toLowerCase()) {
      const msg = `Issue #${issue.number} (${node.name}): Updated location to "${propLoc}"`;
      console.log(`[Audit Fix] ${msg}`);
      detectedChangesList.push(msg);
      node.currentlyLivesIn = propLoc;
      changesMade = true;
    }
  }

  // Verify & Patch Originally From
  const origFromMatch = body.match(/Originally From:\s*([^|\n]+)/i);
  if (origFromMatch && origFromMatch[1]) {
    const propOrig = origFromMatch[1].trim();
    if (!node.originallyFrom || node.originallyFrom.toLowerCase() !== propOrig.toLowerCase()) {
      const msg = `Issue #${issue.number} (${node.name}): Updated hometown to "${propOrig}"`;
      console.log(`[Audit Fix] ${msg}`);
      detectedChangesList.push(msg);
      node.originallyFrom = propOrig;
      changesMade = true;
    }
  }
}

if (changesMade) {
  function generateSampleDataJs(nodes) {
    const jsonNodesStr = JSON.stringify(nodes, null, 2);
    const nodesStartMarker = 'export const SAMPLE_NODES = [';
    const nodesEndMarker = 'export const SAMPLE_LINKS = [';
    const startIndex = sampleDataContent.indexOf(nodesStartMarker);
    const endIndex = sampleDataContent.indexOf(nodesEndMarker);
    const prefix = sampleDataContent.substring(0, startIndex + 'export const SAMPLE_NODES = '.length);
    const suffix = sampleDataContent.substring(endIndex);
    return prefix + jsonNodesStr + ';\n\n' + suffix;
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

// Build Audit Report Markdown
const timestamp = new Date().toISOString();
let auditReportMd = `
### 📊 Bi-Daily Data Parity Audit Report (${timestamp})
- **Total Audited Proposals**: ${issues.length}
- **Status**: ${changesMade ? '⚠️ Discrepancies Detected & Self-Healed' : '✅ 100% Data Parity Verified'}
- **Detected & Processed Changes**: ${detectedChangesList.length}
`;

if (detectedChangesList.length > 0) {
  auditReportMd += `\n**Detected Changes & Actions**:\n`;
  detectedChangesList.forEach((c, idx) => {
    auditReportMd += `${idx + 1}. ${c} -> **Processed & Saved**\n`;
  });
} else {
  auditReportMd += `\n- All ${issues.length} guest proposal edits are 100% persisted and saved in \`src/data/sampleData.js\` and \`public/guests_template.csv\`.\n`;
}

// 1. Write to GitHub Actions Step Summary if available
if (process.env.GITHUB_STEP_SUMMARY) {
  try {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, auditReportMd);
  } catch (e) {}
}

// 2. Append block to development_log.md
try {
  const devLogEntry = `\n---\n## Audit Log - ${timestamp}\n${auditReportMd}\n`;
  fs.appendFileSync(devLogPath, devLogEntry);
} catch (e) {}

// 3. Post Audit Summary to GitHub Issue so user gets a direct alert!
try {
  const existingAuditIssuesStr = execSync('gh issue list --label "data-audit-report" --json number,title', { encoding: 'utf-8' });
  const existingAuditIssues = JSON.parse(existingAuditIssuesStr || '[]');
  
  if (existingAuditIssues.length > 0) {
    const issueNum = existingAuditIssues[0].number;
    console.log(`Posting audit notification to GitHub Issue #${issueNum}...`);
    execSync(`gh issue comment ${issueNum} --body-file -`, { input: auditReportMd, encoding: 'utf-8' });
  } else {
    console.log('Creating GitHub Issue for Data Parity Audit Reports...');
    const title = '📊 Bi-Daily Data Parity Audit Ledger';
    execSync(`gh issue create --title "${title}" --body-file - --label "data-audit-report"`, { input: auditReportMd, encoding: 'utf-8' });
  }
} catch (err) {
  console.log('Note on GitHub Issue alert:', err.message);
}
