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
