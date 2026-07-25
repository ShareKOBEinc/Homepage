/**
 * Goods（キット）データ — キットの追加・編集はこのファイルだけ
 *
 * 【追加方法】
 * GOODS の末尾に1件追加するだけです。
 *
 *   {
 *     id: 'my-kit',
 *     title: 'キットタイトル',
 *     category: 'キット',       // Goods は基本これ固定
 *     year: 2026,
 *     month: 7,
 *     day: 7,
 *     desc: '一覧用の短い説明',
 *     hue: 45,
 *     featured: false,          // 予約（現在は未使用）
 *     image: 'my-kit.png',      // assets フォルダ内のファイル名
 *   },
 *
 * 【日付】
 *   year / month / day をすべて数字で指定してください。
 *   サイト上は「2026.7.7」のように表示されます。
 *
 * 【注意】
 *   Works（イベント・周遊・企業案件）は js/works-data.js / js/works-archive.js へ。
 */

const GOODS = [
  {
    id: 'dausle',
    title: 'DAUSLE?!',
    category: 'キット',
    year: 2025,
    month: 11,
    day: 8,
    desc: '土産謎第1弾　神戸銘菓ゴーフルをモチーフに作成',
    hue: 0,
    featured: true,
    image: 'DAUSLE?!.jpeg',
  },
  {
    id: 'shingitai',
    title: '心技体',
    category: 'キット',
    year: 2025,
    month: 11,
    day: 8,
    desc: '関西にゆかりのある制作団体が集まって作った謎解きキット',
    hue: 30,
    featured: true,
    image: '心技体.jpeg',
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
];

// トップページ Goods に表示する件数（日付の新しい順）
const HOME_GOODS_COUNT = 3;
