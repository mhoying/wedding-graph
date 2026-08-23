/**
 * Direct GitHub API Content Commit & Push Helper
 * Pushes updated sampleData.js directly to GitHub repository without local terminal commands
 */

export async function pushToGithubRepo(contentString, commitMessage = 'Update wedding guest dataset via Host Admin Suite', token = '') {
  const repoOwner = 'mhoying';
  const repoName = 'wedding-graph';
  const filePath = 'src/data/sampleData.js';

  let githubToken = token || localStorage.getItem('wedding_graph_gh_token');

  if (!githubToken) {
    githubToken = prompt('Enter your GitHub Personal Access Token (PAT) with repo write scope:');
    if (!githubToken) return { success: false, message: 'GitHub token required to push directly to repo!' };
    localStorage.setItem('wedding_graph_gh_token', githubToken.trim());
  }

  try {
    // 1. Get current file SHA from GitHub API
    const getFileUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    const getRes = await fetch(getFileUrl, {
      headers: {
        'Authorization': `Bearer ${githubToken.trim()}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    let sha = null;
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    // 2. Base64 encode content
    const encoder = new TextEncoder();
    const data = encoder.encode(contentString);
    let binary = '';
    const bytes = new Uint8Array(data);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Content = btoa(binary);

    // 3. Commit & Push PUT request to GitHub Contents API
    const putRes = await fetch(getFileUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken.trim()}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: commitMessage,
        content: base64Content,
        sha: sha || undefined,
        branch: 'main'
      })
    });

    if (!putRes.ok) {
      const errJson = await putRes.json();
      if (putRes.status === 401 || putRes.status === 403) {
        localStorage.removeItem('wedding_graph_gh_token');
      }
      return { success: false, message: `GitHub API Error (${putRes.status}): ${errJson.message || 'Push failed'}` };
    }

    return { success: true, message: 'Successfully committed and pushed dataset directly to GitHub repo!' };
  } catch (err) {
    console.error('Error pushing to GitHub API:', err);
    return { success: false, message: `Push Failed: ${err.message}` };
  }
}

export function generateSampleDataJsContent(nodes, links) {
  return `// Real Wedding Guest List Data - Auto-updated via Host Admin Suite
export const COHORT_COLORS = {
  "The Couple": "#38bdf8",
  "Cornell": "#b31b1b",
  "Google": "#4285f4",
  "Stanford": "#8c1515",
  "Lehigh": "#653819",
  "Dog Park": "#10b981",
  "OWFL Blog": "#ec4899",
  "Bay FC": "#f59e0b",
  "Friends": "#64748b",
  "Default": "#64748b"
};

export const SIDE_COLORS = {
  "Maureen": "#ec4899",
  "Matt": "#3b82f6",
  "Joint": "#10b981"
};

export const STATE_COLORS = {
  "USA": "#38bdf8",
  "Default": "#64748b"
};

export const DYNAMIC_CLUSTER_COLORS = [
  "#f472b6",
  "#38bdf8",
  "#34d399",
  "#a78bfa",
  "#fbbf24",
  "#f87171",
  "#818cf8",
  "#4ade80",
  "#fb923c",
  "#e879f9"
];

export const SAMPLE_NODES = ${JSON.stringify(nodes, null, 2)};

export const SAMPLE_LINKS = ${JSON.stringify(links, null, 2)};

export function getInitials(name) {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return \`\${parts[0][0]}\${parts[parts.length - 1][0]}\`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
`;
}
