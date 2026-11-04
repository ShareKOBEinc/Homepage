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
 *     price: '2,000',           // 個別ページの価格（円）
 *     detail: '商品詳細本文',   // 文字列 or 配列
 *     requirements: [           // 必要物
 *       '筆記用具',
 *       'スマートフォン',
 *     ],
 *     hashtag: '#作品タグ',     // 文字列 or 配列
 *   },
 *
 * 【日付】
 *   year / month / day をすべて数字で指定してください。
 *   サイト上は「2026.7.7」のように表示されます。
 *
 * 【個別ページ】
 *   追加・更新後に node scripts/generate-goods-pages.js を実行してください。
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
    price: '1,500',
    detail: [
      '土産謎第1弾。神戸銘菓ゴーフルをモチーフにした、缶パッケージの持ち帰り謎です。',
      'TIME : 30min〜 / LEVEL : EASY',
      '解答はLINEへ入力。正解するたびに神戸にまつわる豆知識が届きます。',
    ],
    requirements: [
      '筆記用具',
      'スマートフォン（LINE）',
    ],
    hashtag: '#DAUSLE',
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
    price: '800円',
    detail: [
      'ShareKOBEの持ち帰り謎「からあげ謎」。',
      'からあげをモチーフにした、気軽に遊べる謎解きキットです。',
    ],
    requirements: [
      '筆記用具',
      'スマートフォン',
    ],
    hashtag: '#からあげ謎',
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
    price: '',
    detail: [
      '関西謎解き３年生による、３種もちかえり謎の詰め合わせセット。',
      '「心」ナゾトキ番長 / 「技」CrossXOne / 「体」ShareKOBE。',
      '関西にゆかりのある制作団体が集まって作った謎解きキットです。',
    ],
    requirements: [
      '筆記用具',
      'スマートフォン',
    ],
    hashtag: '#心技体',
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
    price: '1,500',
    detail: [
      'ShareKOBEの持ち帰り謎「名は体を表す」。',
    ],
    requirements: [
      '筆記用具',
      'スマートフォン',
    ],
    hashtag: '#名は体を表す',
  },
  {
    id: 'oshiriddle',
    title: 'オシリドル',
    category: 'キット',
    year: 2026,
    month: 11,
    day: 7,
    desc: 'おしりの小謎の問題集！',
    hue: 55,
    image: 'oshiriddle.jpeg',
    price: '1,000',
    detail: [
      'おしりの小謎がい〜っぱい。',
      'B5サイズ・書籍タイプの小謎問題集です。',
    ],
    requirements: [
      '筆記用具',
    ],
    hashtag: '#オシリドル',
  },
  {
    id: 'rifine',
    title: 'refine',
    category: 'キット',
    year: 2026,
    month: 11,
    day: 7,
    desc: '答えを出すだけでは、終われない。',
    hue: 55,
    image: 'refine.jpeg',
    price: '2,000',
    detail: [
      '答えを出すだけでは、終われない。',
      'ShareKOBE 新作持ち帰り謎。',
    ],
    requirements: [
      '筆記用具',
      'スマートフォン',
    ],
    hashtag: '#シャレコウベリファイン',
  },
  {
    id: 'tenshin',
    title: '点心爛漫!?みならいパンダのおっちょこちょい飯店',
    category: 'キット',
    year: 2026,
    month: 11,
    day: 7,
    desc: '土産謎第2弾、今回のテーマは神戸の南京町🧧 みならいパンダから提供される謎をご賞味あれ📷',
    hue: 55,
    image: 'tenshin.jpeg',
    price: '2,000',
    detail: [
      'みならいパンダ、開店準備中。',
      '土産謎第2弾。今回のテーマは神戸の南京町。みならいパンダから提供される謎をご賞味あれ。',
      '1箱 2,000円。ナゾトキマーケットにて発売。',
    ],
    requirements: [
      '筆記用具',
      'スマートフォン',
    ],
    hashtag: '#シャレコウベパンダ',
  },
];

// トップページ Goods に表示する件数（日付の新しい順）
const HOME_GOODS_COUNT = 3;
