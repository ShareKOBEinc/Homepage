/**
 * Works データ — イベント / 周遊 / 企業案件 の追加・編集は、このファイルだけ
 *
 * 【キット（Goods）】
 *   js/goods-data.js へ追加してください（Works とは別です）。
 *
 * 【追加方法】
 * WORKS 配列の先頭に 1 件追加してください（上＝新しい）。
 * サイト表示も日付の新しい順で並びますが、ファイル上も新しいものを上に置きます。
 *
 *   {
 *     id: 'my-new-work',           // URL: /works/my-new-work.html
 *     title: '作品タイトル',
 *     categories: ['イベント'],    // 複数可（例: ['周遊', '企業案件']）
 *     // category: 'イベント',     // 旧形式（1つだけ）も使用可
 *     year: 2026,
 *     month: 7,
 *     day: 7,
 *     desc: '一覧用の短い説明',
 *     hue: 45,                     // アクセント色の目安（0–360）
 *     image: 'my-work.jpg',        // assets/ 内のファイル名
 *     hashtag: '#作品タグ',
 *
 *     // --- 個別ページ用（任意）---
 *     place: '会場名',
 *     tagline: 'キャッチコピー',
 *     story: ['段落1', '段落2'],   // 文字列でも可
 *     overview: {
 *       team: '最大4名',
 *       duration: '約90分',
 *       start: '時間指定スタート',
 *       location: '屋内',
 *       format: 'ホール型',
 *       note: '補足',
 *     },
 *     schedule: {
 *       period: '2026.7.7〜2026.7.21',
 *       note: '補足',
 *     },
 *     tickets: [
 *       { label: '一般(1名)', price: '4,000', unit: '円' },
 *     ],
 *     ticketNotes: 'チケット注意事項',
 *     officialUrl: 'https://example.com/',
 *     officialLabel: '特設サイトを見る',
 *   },
 *
 * 【画像】
 *   ファイルは assets/ に置き、image にはファイル名だけ書きます。
 *
 * 【個別ページの生成】
 *   追加・更新後:
 *     node scripts/generate-work-pages.js
 *
 * 【日付の表示】
 *   year / month / day を数字で指定。サイト上は「2026.7.7」形式。
 *   企業案件以外は末尾に「〜」が付きます。
 */

const WORKS = [
  {
    id: "minamiwheel2026",
    title: "MINAMI WHEEL NAZOTOKI TOUR",
    categories: [
      "周遊",
      "企業案件"
    ],
    year: 2026,
    month: 10,
    day: 10,
    desc: "ライブハウスを巡りながら謎解き",
    hue: 145,
    image: "minamiwheel2026_t.png",
    place: "MINAMI WHEEL 2026の各会場",
    tagline: "ライブハウスを巡りながら謎解き",
    story: [
      "MINAMI WHEEL 2026の各会場に謎解きを設置！",
      "各会場で音楽を楽しみつつ、合間で「謎解きチャレンジ」",
      "LASTまでたどり着いた方にはプレゼントも！",
    overview: {
      team: "1人〜",
      duration: "約1時間〜",
      start: "自由スタート",
      location: "屋外（MINAMI WHEEL 2026の各会場）",
      format: "周遊型",
      note: "制作：ShareKOBE"
    },
    schedule: {
      period: "2026.10.10〜2026.10.12",
    },
    tickets: [
      {
        price: "無料"
        note: "参加にはスマートフォン等のサイトにアクセスできる端末が必要です"
      }
    ],
    officialUrl: "https://minamiwheel.jp/",
    officialLabel: "公式サイトを見る"
  },
  {
    id: "nazonosedentetsu",
    title: "なぞ乗せ電鉄",
    categories: [
      "周遊",
      "企業案件"
    ],
    year: 2026,
    month: 9,
    day: 26,
    desc: "山の中に謎が巣喰う",
    hue: 145,
    image: "なぞ乗せ電鉄.jpeg",
    place: "能勢電鉄沿線",
    tagline: "山の中に謎が巣喰う",
    story: [
      "この物語の主人公は男子高校生の瀬野 光（せの ひかり）。スマホの案内に導かれるまま、妹のときわと電車に揺られて降り立ったのは見知らぬ駅。",
      "妹は「ここ、ヘンな気配がする…」と怯える横で、ふと気づけば手元には見覚えのない「封」がされた物を持っていた。",
      "いつのまにか手にしていたその「封」を、無意識のうちに開けてしまった光。するとその中からあふれ出した妖力が能勢の地を満たしていく。",
      "「お客様、その『封』を解いてしまったのですね。」背後から現れた駅員から告げられたのは、穏やかに暮らしていた妖怪たちが暴走を始めたという事実。",
      "駅員の案内をもとに、暴走した妖怪たちを浄化し、真実を解き明かそう！のどかな能勢の山々を巡る、すこし不可思議な謎解きの旅が幕を開ける。"
    ],
    overview: {
      team: "1人〜",
      duration: "約6時間（休憩除く）",
      start: "自由スタート（山下駅助役室でキット引換）",
      location: "屋外（能勢電鉄沿線）",
      format: "周遊型",
      note: "制作：ShareKOBE / 主催：能勢電鉄（特設サイト：謎解きゼペッツ）"
    },
    schedule: {
      period: "2026.9.26〜2027.6.27",
      note: "開催日は原則木〜日および祝日。休催日：月・火・水（祝日除く）、年末年始（12/28〜1/6）、2027/5/6。1日乗車券は購入から3か月以内の任意1日。複数日に渡ってのプレイも可能（デジタル乗車券は利用開始当日のみ有効）。"
    },
    tickets: [
      {
        label: "謎解きキット引換券付きデジタル1日乗車券",
        price: "2,800",
        unit: "円"
      }
    ],
    ticketNotes: "スルッとQRtto Webページで購入（会員登録・クレジットカード決済）。税込・大人のみ。立ち寄る有料施設の入館料を含む。能勢電鉄以外の駅から参加の場合は、川西能勢口駅でデジタル1日乗車券をご利用ください。",
    officialUrl: "https://nazotoki-zepets.com/nazonosedentetsu-2026/",
    officialLabel: "特設サイトを見る"
  },
  {
    id: "GO",
    title: "株式会社GO様　合宿イベント",
    category: "企業案件",
    year: 2026,
    month: 6,
    day: 12,
    desc: "チームで挑む、合宿の一夜。",
    hue: 55,
    image: "GO.jpg",
    place: "企業合宿",
    tagline: "チームで挑む、合宿の一夜。",
    story: "企業合宿のプログラムとして、謎解き・体験型のコンテンツを提供。\nチームビルディングと遊び心を両立した、現場向けのカスタム企画です。",
    overview: {
      team: "複数チーム",
      duration: "合宿プログラム内",
      start: "主催スケジュールに準拠",
      location: "屋内",
      format: "企業向けカスタム",
      note: "クライアントの目的に合わせて内容・進行を設計しています。"
    },
    schedule: {
      period: "2026.6.12〜"
    }
  },
  {
    id: "himeji-nazotoki-crossroad",
    title: "姫路なぞ解きクロスロード",
    categories: [
      "周遊",
      "企業案件"
    ],
    year: 2026,
    month: 3,
    day: 20,
    desc: "あなたの知らない姫路を巡る旅へ",
    hue: 20,
    image: "姫路なぞ解きクロスロード.jpg",
    place: "姫路・山陽電車沿線",
    tagline: "あなたの知らない姫路を巡る旅へ",
    story: [
      "神姫バス株式会社と山陽電気鉄道株式会社がタッグを組んだ、バスと電車で姫路を巡るリアル謎解きゲームです。",
      "謎解きキットの情報を頼りに、神姫バスと山陽電車を使って沿線を巡りながら、姫路の街に隠された謎を解いていきます。",
      "気候のいい時期に姫路をご堪能ください。6時間の想定ですが、寄り道するとより楽しい周遊型の謎解きです。"
    ],
    overview: {
      team: "1人〜",
      duration: "約6時間（休憩除く）",
      start: "自由スタート",
      location: "屋外（姫路・山陽電車沿線）",
      format: "周遊型",
      note: "制作：ShareKOBE / 主催：神姫バス・山陽電車（特設サイト：謎解きゼペッツ）"
    },
    schedule: {
      period: "2026.3.20〜2026.11.30",
      note: "複数日に渡ってのプレイも可能（デジタル乗車券は利用開始当日のみ有効）。"
    },
    tickets: [
      {
        label: "姫路市内版",
        price: "2,600",
        unit: "円"
      },
      {
        label: "山陽全線版",
        price: "3,300",
        unit: "円"
      }
    ],
    ticketNotes: "スルッとQRtto Webページで購入（会員登録・クレジットカード決済）。子ども料金の設定なし。キット内容は両プラン共通。",
    officialUrl: "https://nazotoki-zepets.com/himeji_nazo2026/",
    officialLabel: "特設サイトを見る"
  },
  {
    id: "sodenashi",
    title: "タンクトップバトラー!! 袖無",
    hashtag: "#ソデナシ",
    category: "イベント",
    year: 2026,
    month: 2,
    day: 21,
    desc: "袖無と３人の刺客",
    hue: 55,
    image: "そでなしKV.jpg",
    tagline: "袖無と３人の刺客",
    story: [
      "無敵のタンクトップバトラー　袖無(ソデナシ)。",
      "この街の秩序は彼によって保たれていた。",
      "そう、ついこの間までは。タンクトップバトルを攻略し、袖無に勝利をもたらせ！"
    ],
    overview: {
      team: "最大4人",
      duration: "約120分",
      start: "一斉スタート",
      location: "屋内",
      format: "ホール型"
    },
    schedule: {
      period: "2026.2.21〜"
    }
  },
  {
    id: "aimai",
    title: "あいまいセツエーション",
    hashtag: "#あいせつ謎",
    category: "周遊",
    year: 2025,
    month: 7,
    day: 19,
    desc: "あいまいな状況が、連鎖する。",
    hue: 60,
    featured: true,
    image: "あいまいセツエーション.jpg",
    tagline: "あいまいな状況が、連鎖する。",
    story: [
      "あいまいな状況が連鎖する謎解き周遊イベントとして実施。",
      "詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。"
    ],
    overview: {
      team: "1人〜",
      duration: "—",
      start: "随時スタート",
      location: "屋内",
      format: "周遊型"
    },
    schedule: {
      period: "2025.7.19〜"
    }
  },
  {
    id: "leftover",
    title: "Leftover",
    hashtag: "#Leftover謎",
    category: "イベント",
    year: 2025,
    month: 7,
    day: 19,
    desc: "Leftover",
    hue: 270,
    image: "Leftover.jpeg",
    tagline: "Leftover",
    story: [
      "詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。"
    ],
    overview: {
      team: "1人〜",
      duration: "—",
      start: "随時スタート",
      location: "屋内",
      format: "ルーム型"
    },
    schedule: {
      period: "2025.7.19〜"
    }
  },
  {
    id: "tokishirazu",
    title: "トキシラズ",
    hashtag: "#トキシラズ謎",
    category: "イベント",
    year: 2025,
    month: 7,
    day: 19,
    desc: "サケけられないたたかいがここにある。",
    hue: 120,
    image: "トキシラズKV.jpg",
    tagline: "サケけられないたたかいがここにある。",
    story: [
      "「ようやくここまで帰ってきた。」",
      "最後の気力を振り絞り、目的地にたどり着け。"
    ],
    overview: {
      team: "最大4人",
      duration: "—",
      start: "一斉スタート",
      location: "屋内",
      format: "ルーム型"
    },
    schedule: {
      period: "2025.7.19〜"
    }
  },
  {
    id: "nazokaruta-ex",
    title: "ナゾカルタ EXPERT EDITION",
    hashtag: "#ナゾカルタEX",
    category: "イベント",
    year: 2025,
    month: 5,
    day: 31,
    desc: "とってもたのしいナゾめくカルタ。",
    hue: 90,
    image: "ナゾカルタEXKV（大阪.jpg",
    tagline: "とってもたのしいナゾめくカルタ。",
    story: [
      "とってもたのしいナゾめくカルタ。",
      "EXPERT EDITIONにて新作解禁。",
      "最速タイムを目指して札を取れ！",
      "※前作のナゾカルタ Standard Editionとは公演内容は異なります。"
    ],
    overview: {
      team: "1〜2人",
      duration: "約40分",
      start: "一斉スタート",
      location: "屋内",
      format: "カフェ型"
    }
  },
  {
    id: "docchi-r",
    title: "AnswerはどっちでSHOW!? リターンズ",
    hashtag: "#どっち謎R",
    category: "イベント",
    year: 2025,
    month: 2,
    day: 22,
    desc: "今度の舞台は一軒家。",
    hue: 45,
    image: "どっち謎R.jpeg",
    place: "Mysteria宝塚",
    tagline: "今度の舞台は一軒家。",
    story: [
      "「AnswerはどっちでSHOW」の続編がMysteria宝塚で開催！",
      "一軒家にある複数の部屋。",
      "時間内に謎を解き、コタエの部屋で正解発表の時を迎えましょう。",
      "あなたは最後まで「一流」の座を死守できるのか！？",
      "（前作とは内容も全て異なります）"
    ],
    overview: {
      team: "2〜4人",
      duration: "約100分",
      start: "一斉スタート",
      location: "屋内（Mysteria宝塚）",
      format: "ルーム型",
      note: "3枚ご購入の方は2チームに分かれていただきます。"
    },
    schedule: {
      period: "2025.11.23〜2025.11.24"
    },
    tickets: [
      {
        label: "一般",
        price: "3,500",
        unit: "円"
      }
    ]
  },
  {
    id: "kungfuuuu",
    title: "KungFuuuu",
    hashtag: "#カンフー謎",
    category: "イベント",
    year: 2024,
    month: 9,
    day: 24,
    desc: "只今撮影中！",
    hue: 150,
    image: "KungFuuuu　KV.jpg",
    tagline: "只今撮影中！",
    story: [
      "カンフー映画撮影会の手伝いにやってきたあなた。",
      "早速、撮影をはじめようとしたが……",
      "この監督、適当すぎる！！？！",
      "無理難題をひらめきで解決し、クランクアップを目指そう！"
    ],
    overview: {
      team: "最大4人",
      duration: "—",
      start: "一斉スタート",
      location: "屋内",
      format: "ホール型"
    },
    schedule: {
      period: "2024.9.24〜"
    }
  },
  {
    id: "mechamore",
    title: "がけっぷち撮影会 めちゃもれ！",
    hashtag: "#めちゃもれ",
    category: "イベント",
    year: 2024,
    month: 7,
    day: 6,
    desc: "盛れなきゃ、写真全削除!?",
    hue: 330,
    image: "A4_MV_MM_240802.jpg",
    tagline: "盛れなきゃ、写真全削除!?",
    story: [
      "とある撮影会に来たあなたたち",
      "しかし、ただの撮影会ではなかった！",
      "大切な写真を無事に持ち帰れるのか!?",
      "※本イベントは『謎解きイベント』です"
    ],
    overview: {
      team: "最大4人",
      duration: "—",
      start: "一斉スタート",
      location: "屋内",
      format: "ルーム型"
    },
    schedule: {
      period: "2024.7.6〜"
    }
  },
  {
    id: "nazokaruta",
    title: "ナゾカルタ",
    hashtag: "#ナゾカルタ",
    category: "イベント",
    year: 2024,
    month: 6,
    day: 2,
    desc: "とってもたのしいナゾめくカルタ。",
    hue: 345,
    image: "KV.jpg",
    tagline: "とってもたのしいナゾめくカルタ。",
    story: [
      "とってもたのしいナゾめくカルタ。",
      "謎解きに慣れていない方、初めて謎解きをする方でも楽しめる公演として制作された Standard Edition。",
      "最速タイムを目指して札を取る、カルタ形式の謎解きです。"
    ],
    overview: {
      team: "最大2人",
      duration: "約40分",
      start: "一斉スタート",
      location: "屋内",
      format: "ブース型"
    }
  },
  {
    id: "wondertale",
    title: "wondertale",
    hashtag: "#2月騎士",
    category: "イベント",
    year: 2024,
    month: 2,
    day: 23,
    desc: "エホウマキを手に世界を救え",
    hue: 240,
    image: "wondertale.jpeg",
    tagline: "エホウマキを手に世界を救え",
    story: [
      "SharekOBEがお届けする、ちょっと不思議な物語 Wonderaleシリーズの第一弾！",
      "伝説の悪しき龍「ホワイトドラゴン」の復活まで残り僅か。",
      "頼りない村長に任せていては村だけでなく、世界が滅びてしまう。",
      "世界の命運は、「特別な力」が使えるあなたたちに託された。",
      "謎を解き、力を駆使して世界を救え！"
    ],
    overview: {
      team: "最大4人",
      duration: "約100分",
      start: "一斉スタート",
      location: "屋内",
      format: "ホール型"
    }
  },
  {
    id: "its-a-piece-of-cake",
    title: "IT'S A PIECE OF CAKE",
    category: "イベント",
    year: 2024,
    month: 2,
    day: 23,
    desc: "IT'S A PIECE OF CAKE",
    hue: 25,
    image: "IT'S A PIECE OF CAKE.JPG",
    tagline: "IT'S A PIECE OF CAKE",
    story: [
      "詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。"
    ],
    overview: {
      team: "1人〜",
      duration: "—",
      start: "—",
      location: "屋内",
      format: "ルーム型"
    },
    schedule: {
      period: "2024.2.23〜"
    }
  },
  {
    id: "acchisocchitacchi",
    title: "あっちそっちたっち",
    hashtag: "#あっちそっちたっち",
    category: "イベント",
    year: 2023,
    month: 11,
    day: 11,
    desc: "パネルを駆使して全ての謎を解け！",
    hue: 180,
    image: "あっちそっちたっち.jpg",
    place: "東京タワー（謎解きフェスタ）",
    tagline: "パネルを駆使して全ての謎を解け！",
    story: [
      "あなたが入った部屋には75枚のパネル。",
      "謎を解き、あっちもそっちもたっちして、答えを入力しよう。",
      "何分で最後の答えを入力できるか!?ライバルは他の回!?",
      "※本イベントにはストーリーはございません",
      "※動きやすい服装でお越しください。"
    ],
    overview: {
      team: "最大4人",
      duration: "約45分",
      start: "一斉スタート",
      location: "屋内",
      format: "ルーム型"
    },
    schedule: {
      period: "2023.12.9〜2023.12.10（謎解きフェスタ in 東京タワー）"
    },
    tickets: [
      {
        label: "一般（1名）",
        price: "2,500",
        unit: "円"
      }
    ]
  },
  {
    id: "hometatae",
    title: "いこいの場 ホメタタエ",
    hashtag: "#ホメタタエ",
    category: "イベント",
    year: 2023,
    month: 10,
    day: 7,
    desc: "最近誰かから褒められていますか？",
    hue: 300,
    image: "A4_hometatae_MV.png",
    tagline: "最近誰かから褒められていますか？",
    story: [
      "何かをすればSNSで叩かれる昨今。",
      "他人に褒められるような幸せな場所、それがここ「いこいの場ホメタタエ」です。",
      "どなたであってもご参加可能ですので、ぜひ１度お立ち寄りください！",
      "こんな私でも幸せになれるかなと不安になる必要はありません。",
      "疲れた時、心を癒したい時、いつどんな時でも「いこいの場所ホメタタエ」はあなたをお待ちしております。"
    ],
    overview: {
      team: "最大4人",
      duration: "約90分",
      start: "一斉スタート",
      location: "屋内",
      format: "ホール型"
    }
  },
  {
    id: "overmap",
    title: "OverMap",
    hashtag: "#Overmap謎",
    category: "周遊",
    year: 2023,
    month: 10,
    day: 7,
    desc: "重なった地図の周遊謎",
    hue: 210,
    image: "overmap mainviosual.jpg",
    place: "浪速区民センター周辺（大阪最宴祭）",
    tagline: "重なった地図の周遊謎",
    story: [
      "詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。"
    ],
    overview: {
      team: "1人〜",
      duration: "約1時間",
      start: "随時スタート",
      location: "屋外",
      format: "周遊型",
      note: "最宴祭主催の依頼条件：浪速区民センター閉館後も可能／目安1時間程度。"
    },
    tickets: [
      {
        label: "参加費（当時）",
        price: "500",
        unit: "円"
      }
    ]
  },
  {
    id: "docchi",
    title: "AnswerはどっちでSHOW!?",
    hashtag: "#どっち謎",
    category: "イベント",
    year: 2022,
    month: 1,
    day: 14,
    desc: "あの有名な番組に出演し、華麗に謎を解き『価値なし』を回避せよ！",
    hue: 15,
    image: "どっち謎KV（2026広島）.jpg",
    tagline: "あの有名な番組に出演し、華麗に謎を解き『価値なし』を回避せよ！",
    story: [
      "『一流のナゾクラ』を決める裏番組があるらしい…。",
      "普段から謎解きに精通しているあなた達はそんな噂を聞きつけた。",
      "「謎解きがあるのに、参加を逃すわけにはいかない。」",
      "と、あなたたちは興味本位で参加することを決意。",
      "参加してみると例の番組のような、『部屋を選ぶ』謎解きだった。",
      "選択を間違えれば「ランク」が落とされてしまう。",
      "しかも、『価値なし』となった人間たちは行方不明になるという噂も…。",
      "既に、参加を後悔する気持ちも湧いてきたが、迫りくる様々な困難を乗り越えて、この番組を無事にのりこえろ！"
    ],
    overview: {
      team: "1〜4人",
      duration: "約55分",
      start: "一斉スタート",
      location: "屋内",
      format: "ルーム型",
      note: "初演時はホール型（1公演2チームまで）としても実施。"
    },
    tickets: [
      {
        label: "初演（All Clear!大パーティー）",
        price: "2,000",
        unit: "円"
      }
    ]
  }
];

const WORK_CATEGORIES = [
  "すべて",
  "イベント",
  "周遊",
  "企業案件"
];

/** トップページ Selected Works に出す件数（日付の新しい順） */
const HOME_WORKS_COUNT = 3;
