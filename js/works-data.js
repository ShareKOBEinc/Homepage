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
 *     desc: '一覧用の短い説明（STORY未設定時は詳細ページでも使用）',
 *     hue: 45,
 *     featured: false,          // 予約（現在は未使用）
 *     image: 'my-work.png',     // assets フォルダ内のファイル名
 *
 *     // --- 個別ページ用（任意 / Tumbleweed風構成）---
 *     place: '会場名',
 *     tagline: 'キャッチコピー',
 *     point: 'ポイント本文（改行で段落分け可）',
 *     storyLead: 'ストーリーのリード文',
 *     story: 'ストーリー本文（未設定時は desc を使用）',
 *     overview: {
 *       team: '最大4名',        // チーム人数
 *       duration: '約90分',     // 所要時間
 *       start: '時間指定スタート', // スタート形式
 *       location: '屋内',       // 開催場所
 *       format: 'ホール型',     // 開催形式
 *       note: '補足説明',       // 任意
 *     },
 *     schedule: {
 *       period: '2026.7.7〜2026.7.21',
 *       slots: [{ label: '平日', value: '19:30' }],
 *       note: '補足',
 *     },
 *     tickets: [
 *       { label: '一般(1名)', price: '4,000', unit: '円' },
 *     ],
 *     ticketNotes: 'チケットに関する注意',
 *     access: {
 *       address: '住所',
 *       station: '最寄駅',
 *       note: '補足',
 *     },
 *     notes: ['注意事項1', '注意事項2'],
 *     officialUrl: 'https://example.com/', // 特設サイト等（任意）
 *     officialLabel: '特設サイトを見る',   // リンク文言（任意）
 *   },
 *
 *     colors: {                  // 任意（未指定時はビジュアルから自動抽出）
 *       main: '#3a6b5a',
 *       sub: '#eef3f0',
 *     },
 *
 * 【個別ページ】
 *   Works（キット以外）は追加後に次を実行すると個別ページが生成されます。
 *     node scripts/generate-work-pages.js
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
    desc: "IT'S A PIECE OF CAKE",
    hue: 25,
    image: "IT'S A PIECE OF CAKE.JPG",
    tagline: "IT'S A PIECE OF CAKE",
    point: '（公開チケット文面の詳細は後ほど追記予定）',
    story: [
      '詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。',
    ],
    overview: {
      team: '—',
      duration: '—',
      start: '—',
      location: '—',
      format: 'イベント',
    },
    schedule: {
      period: '2024.2.23',
    },
    notes: [
      '公開チケットページ等からの詳細文面が未取得のため、後ほど編集予定です。',
    ],
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
    place: '企業合宿',
    tagline: 'チームで挑む、合宿の一夜。',
    point: '株式会社GO様の合宿向けに制作した体験型イベントです。\n参加者同士のコミュニケーションとひらめきを促す構成で実施しました。',
    storyLead: '合宿の場に、おもろい仕掛けを。',
    story: '企業合宿のプログラムとして、謎解き・体験型のコンテンツを提供。\nチームビルディングと遊び心を両立した、現場向けのカスタム企画です。',
    overview: {
      team: '複数チーム',
      duration: '合宿プログラム内',
      start: '主催スケジュールに準拠',
      location: '屋内',
      format: '企業向けカスタム',
      note: 'クライアントの目的に合わせて内容・進行を設計しています。',
    },
    schedule: {
      period: '2026.6.12',
    },
    notes: [
      '本ページは制作実績の紹介です。一般向けのチケット販売はありません。',
      '類似の企業向けイベント制作のご相談は Contact よりお問い合わせください。',
    ],
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
    tagline: '袖なしで、勝負せよ。',
    point: 'タンクトップバトラー!! 袖無として実施した謎解きイベントです。\n（公開チケット文面の詳細は後ほど追記予定）',
    storyLead: '熱量高めのバトラーたちが集う。',
    story: [
      'タンクトップバトラー!! 袖無の世界観で楽しむ謎解きイベント。',
      '詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。',
    ],
    overview: {
      team: '—',
      duration: '—',
      start: '—',
      location: '会場開催',
      format: 'イベント',
    },
    schedule: {
      period: '2026.2.21',
    },
    notes: [
      '公開チケットページ等からの詳細文面が未取得のため、後ほど編集予定です。',
    ],
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
