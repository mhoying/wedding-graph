import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sampleDataPath = path.join(rootDir, 'src/data/sampleData.js');
const csvPath = path.join(rootDir, 'public/guests_template.csv');

console.log('🤖 Running Automated GitHub Issues Audit & Database Sync...\n');

// 1. Read sampleData.js
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

// 2. Fetch all GitHub Issues
let issues = [];
try {
  const rawIssues = execSync('gh issue list --state all --limit 100 --json number,title,state,body,createdAt', { encoding: 'utf8' });
  issues = JSON.parse(rawIssues);
} catch (e) {
  console.error('❌ Failed to fetch issues via GitHub CLI (gh):', e.message);
  process.exit(1);
}

console.log(`Fetched ${issues.length} total GitHub issues.`);

// 3. Group proposals by Target Guest ID and keep ONLY THE LATEST ISSUE per guest
const latestProposalsByGuest = new Map();

// Sort issues by issue number ascending so later issues override earlier ones
issues.sort((a, b) => a.number - b.number);

for (const issue of issues) {
  const jsonMatch = issue.body.match(/```json\s*([\s\S]*?)\s*```/) || issue.body.match(/(\{[\s\S]*?"targetId"[\s\S]*?\})/);
  if (!jsonMatch) continue;

  try {
    const proposal = JSON.parse(jsonMatch[1]);
    const targetId = proposal.targetId || proposal.id;
    if (!targetId || targetId.startsWith('fb_test')) continue; // Skip test issues

    // Store/Overwrite with the LATEST issue proposal for this guest
    latestProposalsByGuest.set(targetId, {
      issueNumber: issue.number,
      title: issue.title,
      createdAt: issue.createdAt,
      proposal
    });
  } catch (err) {
    // Ignore non-json issue bodies
  }
}

console.log(`Identified latest proposal issues for ${latestProposalsByGuest.size} unique guests.\n`);

// 4. Audit and apply changes to sampleNodes
let modificationsCount = 0;

for (const [targetId, { issueNumber, proposal }] of latestProposalsByGuest.entries()) {
  const node = nodeMap.get(targetId) || sampleNodes.find(n => n.name.toLowerCase() === (proposal.targetName || '').toLowerCase());
  
  if (!node) {
    console.warn(`⚠️ Guest "${proposal.targetName}" (${targetId}) from Issue #${issueNumber} not found in sampleData.js`);
    continue;
  }

  let nodeChanged = false;
  const changes = [];

  // Proposed Name
  if (proposal.proposedName && proposal.proposedName !== node.name) {
    changes.push(`Name: "${node.name}" -> "${proposal.proposedName}"`);
    node.name = proposal.proposedName;
    nodeChanged = true;
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

  // Proposed Hobbies (Handles additions AND removals from the latest issue)
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

  if (nodeChanged) {
    modificationsCount++;
    console.log(`✅ [Issue #${issueNumber}] Updated ${node.name} (${node.id}):`);
    changes.forEach(c => console.log(`   • ${c}`));
  } else {
    console.log(`✨ [Issue #${issueNumber}] ${node.name} (${node.id}) is 100% up to date.`);
  }
}

if (modificationsCount > 0) {
  console.log(`\nWriting ${modificationsCount} updated guest profiles back to disk...`);

  // Clean simulation properties before writing
  const cleanNodes = sampleNodes.map(({ x, y, vx, vy, fx, fy, index, __indexColor, ...rest }) => rest);
  const updatedJsContent = `export const COHORT_COLORS = {\n  "The Couple": "#38bdf8",\n  "Cornell": "#b31b1b",\n  "Google": "#4285f4",\n  "Stanford": "#8c1515",\n  "Lehigh": "#653819",\n  "Dog Park": "#10b981",\n  "OWFL Blog": "#ec4899",\n  "Bay FC": "#f59e0b",\n  "Friends": "#64748b",\n  "Default": "#64748b"\n};\n\nexport const SIDE_COLORS = {\n  "Maureen": "#ec4899",\n  "Matt": "#3b82f6",\n  "Joint": "#10b981"\n};\n\nexport const STATE_COLORS = {\n  "USA": "#38bdf8",\n  "Default": "#64748b"\n};\n\nexport const DYNAMIC_CLUSTER_COLORS = [\n  "#38bdf8", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6",\n  "#06b6d4", "#a855f7", "#eab308", "#ef4444", "#14b8a6"\n];\n\nexport const SAMPLE_NODES = ${JSON.stringify(cleanNodes, null, 2)};\n\nexport const SAMPLE_LINKS = ${JSON.stringify(sampleLinks, null, 2)};\n`;

  fs.writeFileSync(sampleDataPath, updatedJsContent, 'utf8');
  console.log(`💾 Saved updated dataset to ${sampleDataPath}`);

  // Re-generate CSV
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
  console.log('\n🎉 Audit completed! All sampleData.js profiles match their latest GitHub Issue proposals 100%.');
}
