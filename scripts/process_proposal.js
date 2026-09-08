import fs from 'fs';
import path from 'path';

const sampleDataPath = path.resolve('src/data/sampleData.js');
const csvPath = path.resolve('public/guests_template.csv');

// Read files
let sampleDataContent = fs.readFileSync(sampleDataPath, 'utf-8');
const cleanedCode = sampleDataContent
  .replace(/export function /g, 'function ')
  .replace(/export const /g, 'const ')
  .replace(/export default /g, ';');

const evalFn = new Function(cleanedCode + '; return { SAMPLE_NODES, SAMPLE_LINKS };');
const { SAMPLE_NODES, SAMPLE_LINKS } = evalFn();

// Read issue body from environment or event file
const issueBody = process.env.ISSUE_BODY || '';
const issueNumber = process.env.ISSUE_NUMBER || '';

console.log(`Processing issue #${issueNumber}...`);

const jsonMatch = issueBody.match(/```json\s*([\s\S]*?)\s*```/);
if (!jsonMatch || !jsonMatch[1]) {
  console.log('No structured JSON payload found in issue body.');
  process.exit(0);
}

let payload;
try {
  payload = JSON.parse(jsonMatch[1]);
} catch (e) {
  console.error('Failed to parse proposal JSON payload:', e.message);
  process.exit(1);
}

const targetId = payload.targetId || payload.nodeId;
if (!targetId) {
  console.error('No targetId found in proposal payload.');
  process.exit(1);
}

// Find existing node or add new
let node = SAMPLE_NODES.find(n => n.id === targetId || n.name.toLowerCase() === (payload.targetName || '').toLowerCase());

if (!node) {
  console.log(`Node ID "${targetId}" not found in database. Skipping.`);
  process.exit(0);
}

console.log(`Updating node "${node.name}" (${node.id})...`);

// Apply proposed changes
if (payload.proposedHobbies) {
  const newHobbies = payload.proposedHobbies.split(/[,;]/).map(h => h.trim()).filter(Boolean);
  // Merge hobbies uniquely preserving existing
  const merged = Array.from(new Set([...(node.hobbies || []), ...newHobbies]));
  node.hobbies = merged;
}

if (payload.proposedLocation && payload.proposedLocation.trim()) {
  node.currentlyLivesIn = payload.proposedLocation.trim();
}

if (payload.proposedCohort && payload.proposedCohort !== 'Other' && payload.proposedCohort.trim()) {
  node.cohort = payload.proposedCohort.trim();
}

if (payload.proposedSide && payload.proposedSide.trim()) {
  node.side = payload.proposedSide.trim();
}

if (payload.proposedRelationship && payload.proposedRelationship.trim()) {
  node.relationship = payload.proposedRelationship.trim();
}

// Check for photo upload category or proposedHeadshot
const manifestPath = path.resolve('headshots_manifest.json');
if (payload.category === 'Profile Picture / Photo Upload' || payload.proposedHeadshot) {
  const relativeHeadshotPath = `headshots/${node.id}.jpg`;
  node.image = relativeHeadshotPath;
  console.log(`Setting image path for ${node.name} to ${relativeHeadshotPath}`);

  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      if (!manifest.guests) manifest.guests = {};
      manifest.guests[node.id] = {
        ...manifest.guests[node.id],
        raw_source: `raw_sources/${node.id}__orig_media.jpg`,
        cropped_headshot: `public/headshots/${node.id}.jpg`,
        face_selection: 'web_upload_auto_processed'
      };
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
      console.log(`Updated headshots_manifest.json for ${node.id}`);
    } catch (err) {
      console.error('Error updating headshots_manifest.json:', err);
    }
  }
}

// Generate updated sampleData.js string
const origFromMatch = issueBody.match(/Originally From:\s*([^|\n]+)/i);
if (origFromMatch && origFromMatch[1]) {
  node.originallyFrom = origFromMatch[1].trim();
}

// Generate updated sampleData.js string
function generateSampleDataJs(nodes) {
  const jsonNodesStr = JSON.stringify(nodes, null, 2);

  const nodesStartMarker = 'export const SAMPLE_NODES = [';
  const nodesEndMarker = 'export const SAMPLE_LINKS = [';

  const startIndex = sampleDataContent.indexOf(nodesStartMarker);
  const endIndex = sampleDataContent.indexOf(nodesEndMarker);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Could not locate SAMPLE_NODES markers in sampleData.js');
  }

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

const updatedJs = generateSampleDataJs(SAMPLE_NODES);
const updatedCsv = generateGuestsCsv(SAMPLE_NODES);

fs.writeFileSync(sampleDataPath, updatedJs, 'utf-8');
fs.writeFileSync(csvPath, updatedCsv, 'utf-8');

console.log(`✅ Successfully auto-processed proposal #${issueNumber} for ${node.name}!`);
