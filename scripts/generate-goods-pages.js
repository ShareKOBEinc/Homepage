/**
 * Goods 個別ページを生成します。
 * 使い方: node scripts/generate-goods-pages.js
 *
 * goods-data.js を更新したあと実行してください。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'goods');

const ctx = { console };
vm.createContext(ctx);
vm.runInContext(
  fs.readFileSync(path.join(root, 'js/goods-data.js'), 'utf8')
    .replace(/^const /gm, 'var '),
  ctx
);

const portfolio = Array.isArray(ctx.GOODS) ? ctx.GOODS : [];
const SITE_ORIGIN = 'https://www.sharekobe.jp';

const escapeHtml = (str) => String(str)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const absoluteUrl = (value) => {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith('/')) return `${SITE_ORIGIN}${raw}`;
  return `${SITE_ORIGIN}/${raw}`;
};

const ogMeta = (item) => {
  const title = `${item.title} | ShareKOBE`;
  const description = item.desc || item.title || '';
  const url = `${SITE_ORIGIN}/goods/${encodeURIComponent(item.id)}.html`;
  const image = absoluteUrl(item.ogImage || (item.image ? `/assets/${item.image}` : ''));
  const lines = [
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="ShareKOBE">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(url)}">`,
  ];
  if (image) {
    lines.push(`<meta property="og:image" content="${escapeHtml(image)}">`);
    if (item.ogImageWidth) {
      lines.push(`<meta property="og:image:width" content="${escapeHtml(item.ogImageWidth)}">`);
    }
    if (item.ogImageHeight) {
      lines.push(`<meta property="og:image:height" content="${escapeHtml(item.ogImageHeight)}">`);
    }
    lines.push(`<meta name="twitter:card" content="summary_large_image">`);
    lines.push(`<meta name="twitter:image" content="${escapeHtml(image)}">`);
  }
  return lines.join('\n  ');
};

const template = (item) => `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(item.desc || item.title)}">
  <title>${escapeHtml(item.title)} | ShareKOBE</title>
  ${ogMeta(item)}
  <link rel="icon" type="image/png" sizes="48x48" href="../assets/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../assets/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="../assets/apple-touch-icon.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://use.typekit.net/btf8drg.css">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body data-asset-base="../">
  <div class="grain" aria-hidden="true"></div>

  <header class="header scrolled" id="header">
    <a href="../" class="logo" aria-label="ShareKOBE ホームへ">
      <img src="../assets/ShareKOBE_AI.webp" alt="ShareKOBE" class="logo__img" width="399" height="118">
    </a>
    <nav class="nav" aria-label="メインナビゲーション">
      <a href="../news.html">News</a>
      <a href="../about.html">About</a>
      <a href="../works.html">Works</a>
      <a href="../goods.html" class="nav__active">Goods</a>
      <a href="../contact.html">Contact</a>
    </nav>
    <button class="menu-btn" id="menuBtn" aria-label="メニューを開く" aria-expanded="false">
      <span></span>
      <span></span>
    </button>
  </header>

  <div class="mobile-nav" id="mobileNav" aria-hidden="true">
    <nav>
      <a href="../news.html">News</a>
      <a href="../about.html">About</a>
      <a href="../works.html">Works</a>
      <a href="../goods.html">Goods</a>
      <a href="../contact.html">Contact</a>
      <a href="https://x.com/shareKOBE_" class="mobile-nav__social" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
        <img src="../assets/logo-black.png" alt="" width="28" height="28">
      </a>
    </nav>
  </div>

  <main class="subpage" id="workDetail" data-work-id="${escapeHtml(item.id)}">
    <!-- filled by js/works.js -->
  </main>

  <footer class="footer">
    <div class="footer__bottom">
      <p>&copy; 2026 ShareKOBE Inc. All rights reserved.</p>
    </div>
  </footer>

  <script src="../js/works-archive.js"></script>
  <script src="../js/works-data.js"></script>
  <script src="../js/goods-data.js"></script>
  <script src="../js/work-colors.js"></script>
  <script src="../js/works.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
`;

fs.mkdirSync(outDir, { recursive: true });

const existing = new Set(
  fs.readdirSync(outDir).filter((f) => f.endsWith('.html'))
);
const keep = new Set();

for (const item of portfolio) {
  const file = `${item.id}.html`;
  keep.add(file);
  fs.writeFileSync(path.join(outDir, file), template(item), 'utf8');
  console.log('wrote', file);
}

for (const file of existing) {
  if (!keep.has(file)) {
    fs.unlinkSync(path.join(outDir, file));
    console.log('removed stale', file);
  }
}

console.log(`Done: ${portfolio.length} goods pages in goods/`);
