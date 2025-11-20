/*
  Stores uploads in localStorage under "ihUploads" as:
    { id, title, dateISO, contentText, section, icon, url }

  If "url" is set, the card links directly to that URL (shareable).
  If "url" is missing, the card falls back to local-only behavior.

  WARNING: To push files directly to GitHub from the browser, you must
  embed a GitHub Personal Access Token. This is not secure for public
  sites. Use for internal or testing only, or put a server in front.
*/
(function() {
  // ============================================================
  // GITHUB CONFIGURATION
  // ============================================================
  // Fill these in for your setup.

  const GITHUB_OWNER = 'NickoN123';                 // your GitHub username or org
  const GITHUB_REPO = 'llm-analysis-dashboard';     // your repo name
  const GITHUB_BRANCH = 'main';                     // branch that GitHub Pages serves from
  const GITHUB_TOKEN = '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';      // personal access token (internal use only)
  const GITHUB_PAGES_BASE = 'https://nickon123.github.io/llm-analysis-dashboard'; // pages base URL

  // If token is missing or left as placeholder, upload will skip GitHub and stay local only.
  function githubConfigured() {
    return GITHUB_TOKEN && GITHUB_TOKEN !== 'YOUR_GITHUB_PAT_HERE';
  }

  // Helper: safe base64 encoding for unicode text
  function toBase64Unicode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  // Upload file content to GitHub via Contents API and return the public Pages URL.
  async function uploadToGitHub({ fileName, content }) {
    if (!githubConfigured()) {
      throw new Error('GitHub is not configured');
    }

    // Sanitize filename and build a unique path in /uploads
    const baseName = (fileName || 'uploaded')
      .replace(/\.[^/.]+$/, '')           // remove extension
      .replace(/[^a-zA-Z0-9-_]+/g, '-')   // replace weird chars
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') || 'uploaded';

    const uniqueSuffix = Date.now().toString(36);
    const safeFileName = `${baseName}-${uniqueSuffix}${fileName.substring(fileName.lastIndexOf('.'))}`;
    const path = `uploads/${safeFileName}`;

    const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(path)}`;

    const body = {
      message: `Add uploaded file ${safeFileName} via Index Hub`,
      content: toBase64Unicode(content),
      branch: GITHUB_BRANCH
    };

    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`GitHub upload failed: ${res.status} ${text}`);
    }

    // Construct the GitHub Pages URL to the uploaded file
    const publicUrl = `${GITHUB_PAGES_BASE}/${path}`;
    return publicUrl;
  }

  // ============================================================
  // EXISTING LOCAL UPLOAD LOGIC
  // ============================================================

  const STORAGE_KEY = 'ihUploads';
  const SECTION_IDS = {
    brandrank: 'brandrankGrid',
    industry: 'industryGrid',
    dashboards: 'dashboardsGrid',
    research: 'researchGrid'
  };

  const uploadTitleEl   = document.getElementById('uploadTitle');
  const uploadIconEl    = document.getElementById('uploadIcon');
  const uploadSectionEl = document.getElementById('uploadSection');
  const uploadFileEl    = document.getElementById('uploadFile');
  const uploadBtnEl     = document.getElementById('uploadBtn');

  function getUploads() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function setUploads(arr) { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

  function buildCard(u) {
    const a = document.createElement('a');
    a.className = 'index-card-link';
    a.setAttribute('data-upload', '1');
    a.setAttribute('data-upload-id', u.id);

    // If we have a real URL, link directly to it as a shareable link.
    if (u.url) {
      a.href = u.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    } else {
      // Fallback to local-only openUpload behavior.
      a.href = '#';
      a.addEventListener('click', (e) => {
        e.preventDefault();
        openUpload(u);
      });
    }

    const card = document.createElement('div');
    card.className = 'index-card';

    const icon = document.createElement('div');
    icon.className = 'index-card-icon';
    icon.textContent = u.icon || '🧩';

    const title = document.createElement('h3');
    title.className = 'index-card-title';
    title.textContent = u.title || 'Uploaded File';

    const desc = document.createElement('p');
    desc.className = 'index-card-description';
    desc.textContent = u.url
      ? 'User-uploaded file with a shareable link. Click to open or copy link.'
      : 'User-uploaded file stored locally in your browser. Click to open.';

    const meta = document.createElement('div');
    meta.className = 'index-card-meta';

    const dateSpan = document.createElement('span');
    dateSpan.className = 'index-card-date';
    const niceDate = new Date(u.dateISO).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    dateSpan.textContent = niceDate;

    const right = document.createElement('span');
    right.style.display = 'flex';
    right.style.gap = '8px';
    right.style.alignItems = 'center';

    const badge = document.createElement('span');
    badge.className = 'index-card-badge';
    badge.textContent = u.url ? 'Hosted' : 'Uploaded';

    // Copy link button if we have a real URL
    if (u.url) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'del-pill';
      copyBtn.type = 'button';
      copyBtn.textContent = 'Copy link';
      copyBtn.style.color = '#00d4ff';
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(u.url)
          .then(() => alert('Link copied to clipboard.'))
          .catch(() => alert('Could not copy link.'));
      });
      right.appendChild(copyBtn);
    }

    const del = document.createElement('button');
    del.className = 'del-pill';
    del.type = 'button';
    del.textContent = 'Delete';
    del.title = 'Remove from this browser';
    del.addEventListener('click', (e) => {
      e.stopPropagation(); e.preventDefault();
      if (confirm('Delete this uploaded file from your browser?')) {
        deleteUpload(u.id);
      }
    });

    right.appendChild(badge);
    right.appendChild(del);

    meta.appendChild(dateSpan);
    meta.appendChild(right);

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(meta);
    a.appendChild(card);
    return a;
  }

  function openUpload(u) {
    const w = window.open('', '_blank');
    if (!w) { alert('Popup blocked. Please allow popups for this site.'); return; }
    const title = u.title || 'Uploaded File';
    w.document.open();
    w.document.write(u.contentText || '<!DOCTYPE html><html><body><p>No content stored.</p></body></html>');
    try { w.document.title = title; } catch {}
    w.document.close();
  }

  function deleteUpload(id) {
    const next = getUploads().filter(x => x.id !== id);
    setUploads(next);
    renderAll();
  }

  function renderAll() {
    Object.values(SECTION_IDS).forEach(gridId => {
      const grid = document.getElementById(gridId);
      if (!grid) return;
      grid.querySelectorAll('[data-upload="1"]').forEach(node => node.remove());
    });

    const uploads = getUploads();
    uploads.sort((a,b) => new Date(b.dateISO) - new Date(a.dateISO));

    uploads.forEach(u => {
      const gridId = SECTION_IDS[u.section] || SECTION_IDS.research;
      const grid = document.getElementById(gridId);
      if (!grid) return;
      const card = buildCard(u);
      if (grid.firstChild) grid.insertBefore(card, grid.firstChild);
      else grid.appendChild(card);
    });
  }

  uploadBtnEl.addEventListener('click', async () => {
    const file = uploadFileEl.files && uploadFileEl.files[0];
    if (!file) {
      alert('Please choose a file first.');
      return;
    }

    // Ensure file is a valid type (.html or .mp3)
    if (!file.name.match(/\.html$|\.mp3$/)) {
      alert('Please select a valid .html or .mp3 file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const title = (uploadTitleEl.value || file.name.replace(/\.[^/.]+$/, '')).trim();
      const icon  = (uploadIconEl.value || '').trim() || '🧩';
      const section = uploadSectionEl.value || 'research';

      let url = null;

      // Try to upload to GitHub if configured
      if (githubConfigured()) {
        try {
          url = await uploadToGitHub({
            fileName: file.name,
            content: content // sending the content (either HTML or mp3)
          });
        } catch (err) {
          console.error('Upload to GitHub failed:', err);
          alert('Could not upload to GitHub. This will be stored locally only.');
        }
      }

      const item = {
        id: 'u_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
        title,
        icon,
        section,
        dateISO: new Date().toISOString(),
        contentText: content,
        url // may be null if GitHub upload failed or not configured
      };

      const uploads = getUploads();
      uploads.unshift(item);
      setUploads(uploads);

      uploadTitleEl.value = '';
      uploadIconEl.value  = '';
      uploadFileEl.value  = '';
      renderAll();

      const anchor = document.getElementById(section);
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // For .mp3 files, read as data URL (binary content)
    if (file.name.endsWith('.mp3')) {
      reader.readAsDataURL(file); // Read .mp3 file as base64 data URL
    } else {
      reader.readAsText(file); // Read .html file as text
    }
  });

  renderAll();
})();
