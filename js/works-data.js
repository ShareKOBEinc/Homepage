/**
 * Works データ — Works の追加・編集はこのファイル（と works-archive.js）
 *
 * 【役割分担】
 *   js/works-archive.js … 既存の Works（イベント・周遊・企業案件）
 *   js/works-data.js     … 新しい Works の追加（このファイルの WORKS_NEW）
 *   js/goods-data.js     … Goods（キット）← キットはこちらへ
 *
 * 【追加方法】
 * WORKS_NEW の末尾に1件追加するだけです。
 *
 *   {
 *     id: 'my-new-work',
 *     title: '作品タイトル',
 *     categories: ['イベント'],  // 複数可（例: ['周遊', '企業案件']）
 *     // category: 'イベント',  // 旧形式（1つだけ）も引き続き使用可
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
 *     storyLead: 'ストーリーのリード文',
 *     story: 'ストーリー本文（未設定時は desc を使用）',
 *     overview: {
 *       team: '最大4名',
 *       duration: '約90分',
 *       start: '時間指定スタート',
 *       location: '屋内',
 *       format: 'ホール型',
 *       note: '補足説明',
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
 *     officialUrl: 'https://example.com/',
 *     officialLabel: '特設サイトを見る',
 *     colors: {
 *       main: '#3a6b5a',
 *       sub: '#eef3f0',
 *     },
 *   },
 *
 * 【個別ページ】
 *   追加後に次を実行すると個別ページが生成されます。
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
    story: [
      '詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。',
    ],
    overview: {
      team: '1人〜',
      duration: '—',
      start: '—',
      location: '屋内',
      format: 'ルーム型',
    },
    schedule: {
      period: '2024.2.23',
    },
    notes: [
      '公開チケットページ等からの詳細文面が未取得のため、後ほど編集予定です。',
    ],
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
    storyLead: '熱量高めのバトラーたちが集う。',
    story: [
      '無敵のタンクトップバトラー　袖無(ソデナシ)。',
      'この街の秩序は彼によって保たれていた。',
      'そう、ついこの間までは。タンクトップバトルを攻略し、袖無に勝利をもたらせ！',
    ],
    overview: {
      team: '最大4人',
      duration: '約120分',
      start: '一斉スタート',
      location: '屋内',
      format: 'ホール型',
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
