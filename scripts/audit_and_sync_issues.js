import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sampleDataPath = path.join(rootDir, 'src/data/sampleData.js');
const csvPath = path.join(rootDir, 'public/guests_template.csv');
const processedLogPath = path.join(rootDir, 'src/data/processed_issues.json');

console.log('🤖 Running Automated GitHub Issues Audit & Database Sync...\n');

// 1. Read processed issues log (or create if empty)
let processedLog = {};
if (fs.existsSync(processedLogPath)) {
  try {
    processedLog = JSON.parse(fs.readFileSync(processedLogPath, 'utf8'));
  } catch (e) {
    console.warn('⚠️ Could not parse processed_issues.json, initializing fresh log.');
  }
}

// 2. Read sampleData.js
const sampleDataContent = fs.readFileSync(sampleDataPath, 'utf8');
const nodesMatch = sampleDataContent.match(/export const SAMPLE_NODES = (\[[\s\S]*?\]);/);
const linksMatch = sampleDataContent.match(/export const SAMPLE_LINKS = (\[[\s\S]*?\]);/);

if (!nodesMatch) {
  console.error('❌ Could not parse SAMPLE_NODES from sampleData.js');
  process.exit(1);
}

const sampleNodes = JSON.parse(nodesMatch[1]);
const sampleLinks = linksMatch ? JSON.parse(linksMatch[1]) : [];
const nodeMap = new Map(sampleNodes.map(n => [n.id, n]));

// 3. Fetch all GitHub Issues
let issues = [];
try {
  const rawIssues = execSync('gh issue list --state all --limit 100 --json number,title,state,body,createdAt', { encoding: 'utf8' });
  issues = JSON.parse(rawIssues);
} catch (e) {
  console.error('❌ Failed to fetch issues via GitHub CLI (gh):', e.message);
  process.exit(1);
}

console.log(`Fetched ${issues.length} total GitHub issues.`);

// Group ALL proposal issues by Target Guest ID
const proposalsByGuest = new Map();

for (const issue of issues) {
  const jsonMatch = issue.body.match(/```json\s*([\s\S]*?)\s*```/) || issue.body.match(/(\{[\s\S]*?"targetId"[\s\S]*?\})/);
  if (!jsonMatch) {
    processedLog[issue.number] = {
      issueNumber: issue.number,
      title: issue.title,
      processedAt: new Date().toISOString(),
      status: 'SKIPPED_NON_PROPOSAL'
    };
    continue;
  }

  try {
    const proposal = JSON.parse(jsonMatch[1]);
    const targetId = proposal.targetId || proposal.id;
    if (!targetId || targetId.startsWith('fb_test')) {
      processedLog[issue.number] = {
        issueNumber: issue.number,
        title: issue.title,
        processedAt: new Date().toISOString(),
        status: 'SKIPPED_TEST_ISSUE'
      };
      continue;
    }

    if (!proposalsByGuest.has(targetId)) {
      proposalsByGuest.set(targetId, []);
    }
    proposalsByGuest.get(targetId).push({ issue, proposal });
  } catch (err) {
    processedLog[issue.number] = {
      issueNumber: issue.number,
      title: issue.title,
      processedAt: new Date().toISOString(),
      status: 'SKIPPED_PARSE_ERROR'
    };
  }
}

console.log(`Found proposals across ${proposalsByGuest.size} unique guests.\n`);

let modificationsCount = 0;
let newProcessedCount = 0;

// For each guest, resolve ONLY their highest/latest issue number!
for (const [targetId, guestProposals] of proposalsByGuest.entries()) {
  // Sort guest proposals by issue number ascending
  guestProposals.sort((a, b) => a.issue.number - b.issue.number);

  // Mark all earlier proposals as SUPERSEDED
  for (let i = 0; i < guestProposals.length - 1; i++) {
    const earlierIssueNum = guestProposals[i].issue.number;
    const latestIssueNum = guestProposals[guestProposals.length - 1].issue.number;
    processedLog[earlierIssueNum] = {
      issueNumber: earlierIssueNum,
      targetId,
      processedAt: new Date().toISOString(),
      status: `SUPERSEDED_BY_ISSUE_#${latestIssueNum}`
    };
  }

  // The LATEST proposal for this guest
  const latestEntry = guestProposals[guestProposals.length - 1];
  const { issue, proposal } = latestEntry;

  // Check if this latest issue was already processed
  if (processedLog[issue.number] && processedLog[issue.number].status === 'PROCESSED_SUCCESS') {
    continue; // Already processed latest proposal
  }

  newProcessedCount++;
  const node = nodeMap.get(targetId) || sampleNodes.find(n => n.name.toLowerCase() === (proposal.targetName || '').toLowerCase());
  
  if (!node) {
    console.warn(`⚠️ Guest "${proposal.targetName}" (${targetId}) from Issue #${issue.number} not found in sampleData.js`);
    processedLog[issue.number] = {
      issueNumber: issue.number,
      targetId,
      processedAt: new Date().toISOString(),
      status: 'GUEST_NOT_FOUND'
    };
    continue;
  }

  let nodeChanged = false;
  const changes = [];

  // Proposed Name (Check proposal.proposedName, proposal.targetName, or note string)
  let nameFromNote = null;
  if (proposal.note && proposal.note.includes('Name:')) {
    const match = proposal.note.match(/Name:\s*([^|]+)/i);
    if (match) nameFromNote = match[1].trim();
  }
  const targetProposedName = proposal.proposedName || nameFromNote || (proposal.targetName && proposal.targetName !== node.name ? proposal.targetName : null);
  if (targetProposedName && targetProposedName !== node.name) {
    changes.push(`Name: "${node.name}" -> "${targetProposedName}"`);
    node.name = targetProposedName;
    nodeChanged = true;
  }

  // Proposed Originally From / Hometown (from note string "Originally From: Stockton, Ca")
  if (proposal.note && proposal.note.includes('Originally From:')) {
    const match = proposal.note.match(/Originally From:\s*([^|]+)/i);
    if (match) {
      const hometown = match[1].trim();
      if (hometown && node.originallyFrom !== hometown) {
        changes.push(`Originally From: "${node.originallyFrom || ''}" -> "${hometown}"`);
        node.originallyFrom = hometown;
        node.hometown = hometown;
        nodeChanged = true;
      }
    }
  }

  // Proposed Location
  if (proposal.proposedLocation !== undefined && proposal.proposedLocation !== node.currentlyLivesIn) {
    changes.push(`Location: "${node.currentlyLivesIn || ''}" -> "${proposal.proposedLocation}"`);
    node.currentlyLivesIn = proposal.proposedLocation;
    nodeChanged = true;
  }

  // Proposed Cohort
  if (proposal.proposedCohort !== undefined && proposal.proposedCohort !== node.cohort) {
    changes.push(`Cohort: "${node.cohort || ''}" -> "${proposal.proposedCohort}"`);
    node.cohort = proposal.proposedCohort;
    nodeChanged = true;
  }

  // Proposed Side
  if (proposal.proposedSide !== undefined && proposal.proposedSide !== node.side) {
    changes.push(`Side: "${node.side || ''}" -> "${proposal.proposedSide}"`);
    node.side = proposal.proposedSide;
    nodeChanged = true;
  }

  // Proposed Relationship
  if (proposal.proposedRelationship !== undefined && proposal.proposedRelationship !== node.relationship) {
    changes.push(`Relationship: "${node.relationship || ''}" -> "${proposal.proposedRelationship}"`);
    node.relationship = proposal.proposedRelationship;
    nodeChanged = true;
  }

  // Proposed Hobbies
  if (proposal.proposedHobbies !== undefined) {
    const rawHobbyStr = proposal.proposedHobbies || '';
    const proposedHobbyList = rawHobbyStr
      .split(/[,;\n]/)
      .map(h => h.replace(/^(Add|Proposed|Interest|hobbies|hometown|Name|Lives In|Originally From|Group|Relationship):?/i, '').trim())
      .filter(Boolean);

    const currentHobbyStr = (node.hobbies || []).join(', ');
    const newHobbyStr = proposedHobbyList.join(', ');

    if (currentHobbyStr !== newHobbyStr) {
      changes.push(`Hobbies: [${currentHobbyStr}] -> [${newHobbyStr}]`);
      node.hobbies = Array.from(new Set(proposedHobbyList));
      nodeChanged = true;
    }
  }

  processedLog[issue.number] = {
    issueNumber: issue.number,
    targetId: node.id,
    targetName: node.name,
    processedAt: new Date().toISOString(),
    status: 'PROCESSED_SUCCESS'
  };

  if (nodeChanged) {
    modificationsCount++;
    console.log(`✅ [Latest Issue #${issue.number}] Updated ${node.name} (${node.id}):`);
    changes.forEach(c => console.log(`   • ${c}`));
  } else {
    console.log(`✨ [Latest Issue #${issue.number}] ${node.name} (${node.id}) is 100% up to date.`);
  }
}

// Write updated processed log to disk
fs.writeFileSync(processedLogPath, JSON.stringify(processedLog, null, 2), 'utf8');
console.log(`\n📋 Updated processed issues ledger at ${processedLogPath}`);

if (modificationsCount > 0) {
  console.log(`Writing ${modificationsCount} updated guest profiles back to disk...`);

  const cleanNodes = sampleNodes.map(({ x, y, vx, vy, fx, fy, index, __indexColor, ...rest }) => rest);
  const updatedJsContent = `export const COHORT_COLORS = {\n  "The Couple": "#38bdf8",\n  "Cornell": "#b31b1b",\n  "Google": "#4285f4",\n  "Stanford": "#8c1515",\n  "Lehigh": "#653819",\n  "Dog Park": "#10b981",\n  "OWFL Blog": "#ec4899",\n  "Bay FC": "#f59e0b",\n  "Other": "#64748b",\n  "Default": "#64748b"\n};\n\nexport const SIDE_COLORS = {\n  "Maureen": "#ec4899",\n  "Matt": "#3b82f6",\n  "Joint": "#10b981"\n};\n\nexport const STATE_COLORS = {\n  "SF Bay Area": "#38bdf8",\n  "NJ": "#ec4899",\n  "Chicago": "#10b981",\n  "NYC": "#f59e0b",\n  "DC": "#8b5cf6",\n  "Madison, WI": "#06b6d4",\n  "Bermuda": "#f97316",\n  "Upstate NY": "#ef4444",\n  "Baltimore": "#14b8a6",\n  "Western PA": "#eab308",\n  "Boston, MA": "#6366f1",\n  "Minnesota": "#84cc16",\n  "Northern CA": "#d946ef",\n  "Maryland": "#0284c7",\n  "Puerto Rico": "#b45309",\n  "Eastern PA": "#4f46e5",\n  "NY": "#db2777",\n  "Colorado": "#0891b2",\n  "Houston": "#ca8a04",\n  "Florida": "#65a30d",\n  "Zurich": "#7c3aed",\n  "USA": "#38bdf8",\n  "Default": "#64748b"\n};\n\nexport const DYNAMIC_CLUSTER_COLORS = [\n  "#38bdf8", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6",\n  "#06b6d4", "#ef4444", "#a855f7", "#eab308", "#14b8a6",\n  "#f97316", "#6366f1", "#84cc16", "#d946ef", "#0284c7",\n  "#059669", "#b45309", "#4f46e5", "#db2777", "#0891b2",\n  "#ca8a04", "#65a30d", "#7c3aed", "#c026d3", "#2563eb",\n  "#16a34a", "#dc2626", "#9333ea", "#ea580c", "#0d9488",\n  "#475569", "#e11d48"\n];\n\nexport const SAMPLE_NODES = ${JSON.stringify(cleanNodes, null, 2)};\n\nexport const SAMPLE_LINKS = ${JSON.stringify(sampleLinks, null, 2)};\n\nexport function getInitials(name) {\n  if (!name) return '??';\n  const parts = name.trim().split(' ');\n  if (parts.length >= 2) {\n    return \`\${parts[0][0]}\${parts[parts.length - 1][0]}\`.toUpperCase();\n  }\n  return name.slice(0, 2).toUpperCase();\n}\n`;

  fs.writeFileSync(sampleDataPath, updatedJsContent, 'utf8');
  console.log(`💾 Saved updated dataset to ${sampleDataPath}`);

  const csvLines = ['id,name,cohort,side,relationship,originallyFrom,currentlyLivesIn,familyStatus,hobbies'];
  cleanNodes.forEach(n => {
    const line = [
      n.id,
      `"${n.name || ''}"`,
      `"${n.cohort || ''}"`,
      `"${n.side || ''}"`,
      `"${n.relationship || ''}"`,
      `"${n.originallyFrom || n.hometown || ''}"`,
      `"${n.currentlyLivesIn || n.state || ''}"`,
      `"${n.familyStatus || ''}"`,
      `"${(n.hobbies || []).join('; ')}"`
    ].join(',');
    csvLines.push(line);
  });

  fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf8');
  console.log(`📄 Saved updated CSV to ${csvPath}`);
  console.log('\n🎉 Audit & Sync completed successfully!');
} else {
  console.log(`\n🎉 Audit completed! Processed ${newProcessedCount} new proposals. No dataset modifications were needed.`);
}
