// api/upload.js

export default async function handler(req, res) {
  // CORS handling so your GitHub Pages frontend can call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Preflight request
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, html } = req.body || {};

    if (!fileName || !html) {
      return res.status(400).json({ error: 'fileName and html are required' });
    }

    // === CONFIG: edit these for your repo ===
    const owner  = 'NickoN123';       // Your GitHub username or organization name
    const repo   = 'llm-analysis-dashboard';  // Your GitHub repo name
    const branch = 'main';           // GitHub branch name (use 'main' or 'gh-pages' depending on your setup)

    // GitHub Personal Access Token (PAT) stored as env var in Vercel
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return res.status(500).json({ error: 'GITHUB_TOKEN not configured on server' });
    }

    // Sanitize filename and make it unique
    const baseName = (fileName || 'uploaded')
      .replace(/\.[^/.]+$/, '')           // Remove file extension
      .replace(/[^a-zA-Z0-9-_]+/g, '-')   // Replace special characters
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') || 'uploaded';

    const uniqueSuffix = Date.now().toString(36);
    const safeFileName = `${baseName}-${uniqueSuffix}.html`;
    const path = `${safeFileName}`;  // Files uploaded to the root directory (no subfolders)

    // GitHub API URL to upload the file to the repository
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

    // Base64 encode the HTML content
    const contentBase64 = Buffer.from(html, 'utf8').toString('base64');

    // GitHub request body
    const body = {
      message: `Add uploaded page ${safeFileName} via Index Hub`,  // Commit message
      content: contentBase64,
      branch  // Specify the branch (e.g., 'main')
    };

    // Make the request to GitHub API to upload the file
    const ghRes = await fetch(githubUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!ghRes.ok) {
      const text = await ghRes.text().catch(() => '');
      return res.status(ghRes.status).json({
        error: 'GitHub upload failed',
        details: text
      });
    }

    // This is the public URL GitHub Pages will serve it from:
    const publicUrl = `https://${owner}.github.io/${repo}/${path}`;

    // Return the public URL of the uploaded file
    return res.status(200).json({ url: publicUrl });
  } catch (err) {
    console.error('Upload handler error', err);
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
}
