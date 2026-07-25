/**
 * Works 個別ページを生成します。
 * 使い方: node scripts/generate-work-pages.js
 *
 * works-data.js / works-archive.js を更新したあと実行してください。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'works');

const ctx = { console };
vm.createContext(ctx);
vm.runInContext(
  fs.readFileSync(path.join(root, 'js/works-archive.js'), 'utf8')
    .replace(/^const /gm, 'var '),
  ctx
);
vm.runInContext(
  fs.readFileSync(path.join(root, 'js/works-data.js'), 'utf8')
    .replace(/^const /gm, 'var '),
  ctx
);

const goodsCategory = ctx.GOODS_CATEGORY || 'キット';
const getCategories = (work) => {
  if (Array.isArray(work.categories) && work.categories.length) return work.categories;
  if (work.category) return [work.category];
  return [];
};

const portfolio = ctx.WORKS.filter((work) => !getCategories(work).includes(goodsCategory));

const escapeHtml = (str) => String(str)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const template = (work) => `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(work.desc || work.title)}">
  <title>${escapeHtml(work.title)} | ShareKOBE</title>
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
    <a href="../index.html" class="logo" aria-label="ShareKOBE ホームへ">
      <img src="../assets/ShareKOBE_AI.webp" alt="ShareKOBE" class="logo__img" width="399" height="118">
    </a>
    <nav class="nav" aria-label="メインナビゲーション">
      <a href="../news.html">News</a>
      <a href="../about.html">About</a>
      <a href="../works.html" class="nav__active">Works</a>
      <a href="../goods.html">Goods</a>
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
    </nav>
  </div>

  <main class="subpage" id="workDetail" data-work-id="${escapeHtml(work.id)}">
    <!-- filled by js/works.js -->
  </main>

  <footer class="footer">
    <div class="footer__bottom">
      <p>&copy; 2026 ShareKOBE Inc. All rights reserved.</p>
      <div class="footer__social">
        <a href="https://x.com/shareKOBE_" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
          <img src="../assets/logo-black.png" alt="" class="footer__social-icon" width="28" height="28">
        </a>
      </div>
    </div>
  </footer>

  <script src="../js/works-archive.js"></script>
  <script src="../js/works-data.js"></script>
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

for (const work of portfolio) {
  const file = `${work.id}.html`;
  keep.add(file);
  fs.writeFileSync(path.join(outDir, file), template(work), 'utf8');
  console.log('wrote', file);
}

for (const file of existing) {
  if (!keep.has(file)) {
    fs.unlinkSync(path.join(outDir, file));
    console.log('removed stale', file);
  }
}

console.log(`Done: ${portfolio.length} work pages in works/`);
