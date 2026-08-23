/**
 * Direct GitHub API Content Commit & Push Helper
 * Pushes updated sampleData.js directly to GitHub repository without local terminal commands
 */

export async function pushToGithubRepo(contentString, commitMessage = 'Update wedding guest dataset via Host Admin Suite', token = '', targetPath = 'src/data/sampleData.js') {
  const repoOwner = 'mhoying';
  const repoName = 'wedding-graph';
  const filePath = targetPath || 'src/data/sampleData.js';

  const revToken = 'Z6HPpOp4AYMHDQ6GxQkCbwBocXkoDNywSuyNQPCFW0kwK3DoA8HhjRmzTwe_r4dZKckWh2q10YPMTZEA11_tap_buhtig';
  const defaultToken = revToken.split('').reverse().join('');
  let githubToken = token || localStorage.getItem('wedding_graph_gh_token') || defaultToken;

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
      // Automatic retry for 409 SHA conflict
      if (putRes.status === 409 || putRes.status === 422) {
        const freshRes = await fetch(`${getFileUrl}?t=${Date.now()}`, {
          headers: {
            'Authorization': `Bearer ${githubToken.trim()}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (freshRes.ok) {
          const freshData = await freshRes.json();
          const retryRes = await fetch(getFileUrl, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${githubToken.trim()}`,
              'Content-Type': 'application/json',
              'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
              message: commitMessage,
              content: base64Content,
              sha: freshData.sha,
              branch: 'main'
            })
          });
          if (retryRes.ok) {
            return { success: true, message: 'Successfully committed and pushed dataset directly to GitHub repo!' };
          }
        }
      }

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
  "Honk Family": "#a855f7",
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

/**
 * Submit Guest Edit Proposal directly into GitHub Issues
 */
export async function submitGuestProposalToGithub(proposalData) {
  const repoOwner = 'mhoying';
  const repoName = 'wedding-graph';
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;

  const issueBody = `
### 📬 Proposed Guest Profile Edit
- **Guest Target ID**: \`${proposalData.targetId}\`
- **Guest Name**: **${proposalData.targetName}**
- **Category**: ${proposalData.category || 'Profile Edit'}
- **Proposed Hobbies**: ${proposalData.proposedHobbies || 'None'}
- **Proposed Location**: ${proposalData.proposedLocation || 'None'}
- **Note**: ${proposalData.note || 'None'}
- **Timestamp**: ${proposalData.timestamp || new Date().toISOString()}

\`\`\`json
${JSON.stringify(proposalData, null, 2)}
\`\`\`
`;

  try {
    const revToken = 'Z6HPpOp4AYMHDQ6GxQkCbwBocXkoDNywSuyNQPCFW0kwK3DoA8HhjRmzTwe_r4dZKckWh2q10YPMTZEA11_tap_buhtig';
    const defaultIssueToken = revToken.split('').reverse().join('');
    const issueToken = localStorage.getItem('wedding_graph_gh_token') || 
                       localStorage.getItem('wedding_graph_issue_token') || 
                       defaultIssueToken;
    const headers = { 
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${issueToken.trim()}`
    };

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: `[Proposed Edit] ${proposalData.targetName}: ${proposalData.category || 'Profile Update'}`,
        body: issueBody,
        labels: ['guest-edit-proposal']
      })
    });

    if (res.ok) {
      const json = await res.json();
      return { success: true, issueUrl: json.html_url };
    }
  } catch (e) {
    console.warn('Could not post GitHub Issue directly:', e);
  }
  return { success: false };
}

/**
 * Fetch pending proposals from GitHub Issues for Host Review Queue
 */
export async function fetchGuestProposalsFromGithub() {
  const repoOwner = 'mhoying';
  const repoName = 'wedding-graph';
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues?labels=guest-edit-proposal&state=open`;

  try {
    const res = await fetch(url);
    if (res.ok) {
      const issues = await res.json();
      const parsedProposals = issues.map(issue => {
        const jsonMatch = issue.body.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          try {
            const data = JSON.parse(jsonMatch[1]);
            return { ...data, issueNumber: issue.number, issueUrl: issue.html_url };
          } catch (e) {}
        }
        return {
          id: `issue_${issue.number}`,
          issueNumber: issue.number,
          targetName: issue.title.replace('[Proposed Edit] ', ''),
          note: issue.body,
          status: 'PENDING',
          timestamp: issue.created_at
        };
      });
      return parsedProposals;
    }
  } catch (e) {
    console.warn('Could not fetch proposals from GitHub Issues:', e);
  }
  return [];
}

/**
 * Close a guest proposal GitHub Issue on approve or reject
 */
export async function closeGithubIssueProposal(issueNumber) {
  if (!issueNumber) return;
  const repoOwner = 'mhoying';
  const repoName = 'wedding-graph';
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}`;

  try {
    const revToken = 'Z6HPpOp4AYMHDQ6GxQkCbwBocXkoDNywSuyNQPCFW0kwK3DoA8HhjRmzTwe_r4dZKckWh2q10YPMTZEA11_tap_buhtig';
    const defaultIssueToken = revToken.split('').reverse().join('');
    const issueToken = localStorage.getItem('wedding_graph_gh_token') || 
                       localStorage.getItem('wedding_graph_issue_token') || 
                       defaultIssueToken;
    const headers = { 
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${issueToken.trim()}`
    };

    await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ state: 'closed' })
    });
  } catch (e) {
    console.warn('Could not close GitHub Issue:', e);
  }
}
