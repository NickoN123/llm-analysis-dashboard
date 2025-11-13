// api/upload.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { fileName, html } = req.body || {};

    if (!fileName || !html) {
      res.status(400).json({ error: 'Missing fileName or html in body' });
      return;
    }

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH || 'main';
    const baseUrl = process.env.GITHUB_PAGES_BASE;
    const token = process.env.GITHUB_TOKEN;

    if (!owner || !repo || !token || !baseUrl) {
      res.status(500).json({ error: 'GitHub env vars not configured' });
      return;
    }

    // Helper: base64 encode unicode
    const toBase64Unicode = (str) =>
      Buffer.from(str, 'utf8').toString('base64');

    // Build safe file path inside /uploads
    const baseName = (fileName || 'uploaded')
      .replace(/\.[^/.]+$/, '')          // strip extension
      .replace(/[^a-zA-Z0-9-_]+/g, '-')  // only letters/numbers/-/_
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') || 'uploaded';

    const uniqueSuffix = Date.now().toString(36);
    const safeFileName = `${baseName}-${uniqueSuffix}.html`;
    const path = `uploads/${safeFileName}`;

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

    const body = {
      message: `Add uploaded page ${safeFileName} via Index Hub`,
      content: toBase64Unicode(html),
      branch
    };

    const ghRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!ghRes.ok) {
      const text = await ghRes.text();
      console.error('GitHub error:', ghRes.status, text);
      res.status(ghRes.status).json({ error: 'GitHub upload failed', details: text });
      return;
    }

    const fileUrl = `${baseUrl}/${path}`;
    res.status(200).json({ url: fileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unexpected error', details: String(err) });
  }
}
