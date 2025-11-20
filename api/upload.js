export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
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

    const owner  = 'NickoN123';
    const repo   = 'llm-analysis-dashboard';
    const branch = 'main';
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return res.status(500).json({ error: 'GITHUB_TOKEN not configured on server' });
    }

    const baseName = (fileName || 'uploaded')
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') || 'uploaded';

    const uniqueSuffix = Date.now().toString(36);
    const safeFileName = `${baseName}-${uniqueSuffix}${fileName.substring(fileName.lastIndexOf('.'))}`;
    const path = `${safeFileName}`;

    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

    let contentBase64;
    if (fileContent.includes('data:')) {
      contentBase64 = fileContent.split(',')[1]; // Extract base64 content (e.g., for mp3, images)
    } else {
      contentBase64 = Buffer.from(fileContent, 'utf8').toString('base64'); // For text-based files
    }

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

    const publicUrl = `https://${owner}.github.io/${repo}/${path}`;
    return res.status(200).json({ url: publicUrl });
  } catch (err) {
    console.error('Upload handler error', err);
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
}
