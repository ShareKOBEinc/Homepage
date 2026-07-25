/**
 * 作品データ — 新規作品はこのファイルだけ編集してください
 *
 * 【追加方法】
 * WORKS_NEW の末尾に1件追加するだけです。
 *
 *   {
 *     id: 'my-new-work',
 *     title: '作品タイトル',
 *     categories: ['キット', 'イベント'],  // 複数可（1つなら ['キット'] でも可）
 *     // category: 'キット',             // 旧形式（1つだけ）も引き続き使用可
 *     year: 2026,               // 西暦（数字）
 *     month: 7,                 // 月
 *     day: 7,                   // 日
 *     desc: '作品の説明文',
 *     hue: 45,
 *     featured: false,          // 予約（現在は未使用）
 *     image: 'my-work.png',     // assets フォルダ内のファイル名
 *   },
 *
 * 【日付】
 *   year / month / day をすべて数字で指定してください。
 *   サイト上は「2026.7.7」のように表示されます。
 */

const WORKS_NEW = [
  {
    id: 'its-a-piece-of-cake',
    title: "IT'S A PIECE OF CAKE",
    category: 'イベント',
    year: 2024,
    month: 2,
    day: 23,
    desc: 'IT\'S A PIECE OF CAKEの謎解きキット。',
    hue: 25,
    image: "IT'S A PIECE OF CAKE.JPG",
  },
  {
    id: 'karaage-nazo',
    title: 'からあげ謎',
    category: 'キット',
    year: 2025,
    month: 11,
    day: 8,
    desc: 'からあげ謎の謎解きキット。',
    hue: 35,
    image: 'からあげ謎.JPG',
  },
  {
    id: 'na-ha-tai-o-arawasu',
    title: '名は体を表す',
    category: 'キット',
    year: 2025,
    month: 11,
    day: 8,
    desc: '名は体を表すの謎解きキット。',
    hue: 55,
    image: '名は体を表す.JPG',
  },
  {
    id: 'GO',
    title: '株式会社GO様　合宿イベント',
    category: '企業案件',
    year: 2026,
    month: 6,
    day: 12,
    desc: '株式会社GO様の合宿イベント',
    hue: 55,
    image: 'GO.jpg',
  },
  {
    id: 'sodenashi',
    title: 'タンクトップバトラー!! 袖無',
    category: 'イベント',
    year: 2026,
    month: 2,
    day: 21,
    desc: 'タンクトップバトラー!! 袖無',
    hue: 55,
    image: 'そでなしKV.png',
  },
];

const WORKS = [...WORKS_ARCHIVE, ...WORKS_NEW];

const WORK_CATEGORIES = ['すべて', 'イベント', '周遊', '企業案件'];

// トップページ Selected Works に表示する件数（日付の新しい順）
const HOME_WORKS_COUNT = 3;

// トップページ Goods に表示する件数（日付の新しい順）
const HOME_GOODS_COUNT = 3;

// Goods に掲載するカテゴリ（Works からは除外）
const GOODS_CATEGORY = 'キット';
