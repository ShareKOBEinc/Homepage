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
 *     officialUrl: 'https://example.com/',
 *     officialLabel: '特設サイトを見る',
 *     hashtag: '#作品タグ',     // X検索用（個別ページ・トップマーキー）
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
 *   企業案件以外は末尾に「〜」が付きます（例: 2026.7.7〜）。
 */

const WORKS_NEW = [
  {
    id: 'nazonosedentetsu',
    title: 'なぞ乗せ電鉄',
    categories: ['周遊', '企業案件'],
    year: 2026,
    month: 9,
    day: 26,
    desc: '山の中に謎が巣喰う',
    hue: 145,
    image: 'なぞ乗せ電鉄.jpeg',
    place: '能勢電鉄沿線',
    tagline: '山の中に謎が巣喰う',
    story: [
      'この物語の主人公は男子高校生の瀬野 光（せの ひかり）。スマホの案内に導かれるまま、妹のときわと電車に揺られて降り立ったのは見知らぬ駅。',
      '妹は「ここ、ヘンな気配がする…」と怯える横で、ふと気づけば手元には見覚えのない「封」がされた物を持っていた。',
      'いつのまにか手にしていたその「封」を、無意識のうちに開けてしまった光。するとその中からあふれ出した妖力が能勢の地を満たしていく。',
      '「お客様、その『封』を解いてしまったのですね。」背後から現れた駅員から告げられたのは、穏やかに暮らしていた妖怪たちが暴走を始めたという事実。',
      '駅員の案内をもとに、暴走した妖怪たちを浄化し、真実を解き明かそう！のどかな能勢の山々を巡る、すこし不可思議な謎解きの旅が幕を開ける。',
    ],
    overview: {
      team: '1人〜',
      duration: '約6時間（休憩除く）',
      start: '自由スタート（山下駅助役室でキット引換）',
      location: '屋外（能勢電鉄沿線）',
      format: '周遊型',
      note: '制作：ShareKOBE / 主催：能勢電鉄（特設サイト：謎解きゼペッツ）',
    },
    schedule: {
      period: '2026.9.26〜2027.6.27',
      note: '開催日は原則木〜日および祝日。休催日：月・火・水（祝日除く）、年末年始（12/28〜1/6）、2027/5/6。1日乗車券は購入から3か月以内の任意1日。複数日に渡ってのプレイも可能（デジタル乗車券は利用開始当日のみ有効）。',
    },
    tickets: [
      {
        label: '謎解きキット引換券付きデジタル1日乗車券',
        price: '2,800',
        unit: '円',
      },
    ],
    ticketNotes: 'スルッとQRtto Webページで購入（会員登録・クレジットカード決済）。税込・大人のみ。立ち寄る有料施設の入館料を含む。能勢電鉄以外の駅から参加の場合は、川西能勢口駅でデジタル1日乗車券をご利用ください。',
    officialUrl: 'https://nazotoki-zepets.com/nazonosedentetsu-2026/',
    officialLabel: '特設サイトを見る',
  },
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
      format: 'ルーム型'
    },
    schedule: {
      period: '2024.2.23〜'
    }
  },
  {
    id: 'GO',
    title: '株式会社GO様　合宿イベント',
    category: '企業案件',
    year: 2026,
    month: 6,
    day: 12,
    desc: 'チームで挑む、合宿の一夜。',
    hue: 55,
    image: 'GO.jpg',
    place: '企業合宿',
    tagline: 'チームで挑む、合宿の一夜。',
    story: '企業合宿のプログラムとして、謎解き・体験型のコンテンツを提供。\nチームビルディングと遊び心を両立した、現場向けのカスタム企画です。',
    overview: {
      team: '複数チーム',
      duration: '合宿プログラム内',
      start: '主催スケジュールに準拠',
      location: '屋内',
      format: '企業向けカスタム',
      note: 'クライアントの目的に合わせて内容・進行を設計しています。'
    },
    schedule: {
      period: '2026.6.12〜'
    }
  },
  {
    id: 'sodenashi',
    title: 'タンクトップバトラー!! 袖無',
    hashtag: '#ソデナシ',
    category: 'イベント',
    year: 2026,
    month: 2,
    day: 21,
    desc: '袖無と３人の刺客',
    hue: 55,
    image: 'そでなしKV.jpg',
    tagline: '袖無と３人の刺客',
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
      format: 'ホール型'
    },
    schedule: {
      period: '2026.2.21〜'
    }
  },
];

const WORKS = [...WORKS_ARCHIVE, ...WORKS_NEW];

const WORK_CATEGORIES = ['すべて', 'イベント', '周遊', '企業案件'];

// トップページ Selected Works に表示する件数（日付の新しい順）
const HOME_WORKS_COUNT = 3;
