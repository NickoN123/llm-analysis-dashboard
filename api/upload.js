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
    const owner = 'NickoN123';
    const repo = 'llm-analysis-dashboard';
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

    // You currently force it to overwrite the same file name each time
    // (kept as-is). If you want unique files, reintroduce the suffix.
    const safeFileName = `${baseName}.html`;

    // Save directly to repo root
    const path = `${safeFileName}`;

    // GitHub Contents API URL
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

    // Base64 encode HTML for GitHub API
    const contentBase64 = Buffer.from(html, 'utf8').toString('base64');

    // 1) Look up existing file to get its SHA (required for updates)
    let existingSha = null;
    const lookupUrl = `${githubUrl}?ref=${encodeURIComponent(branch)}`;

    const lookupRes = await fetch(lookupUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json'
      }
    });

    if (lookupRes.status === 200) {
      const existing = await lookupRes.json();
      existingSha = existing && existing.sha ? existing.sha : null;
    } else if (lookupRes.status === 404) {
      // File does not exist yet, that is fine (create without sha)
    } else {
      const text = await lookupRes.text().catch(() => '');
      return res.status(lookupRes.status).json({
        error: 'GitHub lookup failed',
        details: text
      });
    }

    // 2) Create or update (include sha only if updating)
    const body = {
      message: `Add uploaded page ${safeFileName} via Index Hub`,
      content: contentBase64,
      branch
    };

    if (existingSha) {
      body.sha = existingSha;
    }

    // 3) PUT to GitHub
    let ghRes = await fetch(githubUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    // Optional: handle rare race condition (SHA changed between lookup and PUT)
    // If that happens, re-fetch sha once and retry.
    if (ghRes.status === 409 || ghRes.status === 422) {
      const retryLookupRes = await fetch(lookupUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json'
        }
      });

      if (retryLookupRes.status === 200) {
        const existing = await retryLookupRes.json();
        const retrySha = existing && existing.sha ? existing.sha : null;

        if (retrySha) {
          body.sha = retrySha;

          ghRes = await fetch(githubUrl, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
        }
      }
    }

    if (!ghRes.ok) {
      const text = await ghRes.text().catch(() => '');
      return res.status(ghRes.status).json({
        error: 'GitHub upload failed',
        details: text
      });
    }

    // This is the URL your custom domain will serve it from
    const publicUrl = `https://brandrankai-dashboard-index.com/${safeFileName}`;

    return res.status(200).json({ url: publicUrl });
  } catch (err) {
    console.error('Upload handler error', err);
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
}
