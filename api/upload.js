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
    const { fileName, fileContent } = req.body || {};

    if (!fileName || !fileContent) {
      return res.status(400).json({ error: 'fileName and fileContent are required' });
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

    // Sanitize filename and make it unique
    const baseName = (fileName || 'uploaded')
      .replace(/\.[^/.]+$/, '')           // remove extension
      .replace(/[^a-zA-Z0-9-_]+/g, '-')   // replace weird chars
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') || 'uploaded';

    const uniqueSuffix = Date.now().toString(36);
    const fileExtension = fileName.split('.').pop().toLowerCase();

    // Check for .html or .mp3 extension and handle accordingly
    let safeFileName;
    let contentBase64;

    if (fileExtension === 'html') {
      safeFileName = `${baseName}-${uniqueSuffix}.html`; // If it's HTML file
      contentBase64 = Buffer.from(fileContent, 'utf8').toString('base64');
    } else if (fileExtension === 'mp3') {
      safeFileName = `${baseName}-${uniqueSuffix}.mp3`; // If it's MP3 file
      contentBase64 = Buffer.from(fileContent, 'binary').toString('base64');  // For MP3 files, use binary encoding
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Only .html and .mp3 are allowed.' });
    }

    const path = `uploads/${safeFileName}`;

    // GitHub Contents API URL
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

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

    // This is the URL GitHub Pages will serve it from:
    const publicUrl = `https://nickon123.github.io/llm-analysis-dashboard/${path}`;

    return res.status(200).json({ url: publicUrl });
  } catch (err) {
    console.error('Upload handler error', err);
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
}
