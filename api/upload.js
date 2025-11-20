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
    const { fileName, contentBase64 } = req.body || {};

    if (!fileName || !contentBase64) {
      return res.status(400).json({ error: 'fileName and contentBase64 are required' });
    }

    // === CONFIG: edit these for your repo ===
    const owner  = 'NickoN123';
    const repo   = 'llm-analysis-dashboard';
    const branch = 'main'; // or 'master' if that is your default

    // GitHub PAT stored as env var in Vercel
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return res.status(500).json({ error: 'GITHUB_TOKEN not configured on server' });
    }

    // Sanitize base name, keep original extension
    const extMatch = fileName.match(/\.[^./]+$/);
    const ext = extMatch ? extMatch[0].toLowerCase() : '';

    const baseNameRaw = fileName.replace(/\.[^/.]+$/, '');
    const baseNameSanitized = baseNameRaw
      .replace(/[^a-zA-Z0-9-_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') || 'uploaded';

    // Ensure uniqueness so you don't overwrite previous uploads
    const uniqueSuffix = Date.now().toString(36);
    const safeFileName = `${baseNameSanitized}-${uniqueSuffix}${ext}`;

    // Optional: put everything under an "uploads" folder in the repo
    const folder = 'uploads'; // change to '' to put them in repo root
    const path = folder ? `${folder}/${safeFileName}` : safeFileName;

    // GitHub Contents API URL
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

    // contentBase64 is already base64 from the browser Data URL
    const body = {
      message: `Add uploaded file ${safeFileName} via Index Hub`,
      content: contentBase64,
      branch
    };

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

    // Public GitHub Pages URL for this file:
    // NOTE: adjust the base URL if your custom domain is different
    const publicBase = 'https://brandrankai-dashboard-index.com';
    const publicUrl = folder
      ? `${publicBase}/${folder}/${safeFileName}`
      : `${publicBase}/${safeFileName}`;

    return res.status(200).json({ url: publicUrl });
  } catch (err) {
    console.error('Upload handler error', err);
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
}
