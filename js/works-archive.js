/**
 * Works アーカイブ（イベント・周遊・企業案件）
 *
 * キットは js/goods-data.js へ。
 * 新しい Works は js/works-data.js の WORKS_NEW へ追加してください。
 */
const WORKS_ARCHIVE = [
  {
    id: 'himeji-nazotoki-crossroad',
    title: '姫路なぞ解きクロスロード',
    categories: ['周遊', '企業案件'],
    year: 2026,
    month: 3,
    day: 20,
    desc: '神姫バス×山陽電車で巡る、「観光じゃ出会えない姫路」リアル謎解き。',
    hue: 20,
    image: '姫路なぞ解きクロスロード.jpg',
    place: '姫路・山陽電車沿線',
    tagline: '観光じゃ出会えない姫路',
    storyLead: '主人公「ヨウデン」「シンバ」と一緒に、ふしぎな地図の謎を解き明かそう！',
    story: [
      '神姫バス株式会社と山陽電気鉄道株式会社がタッグを組んだ、バスと電車で姫路を巡るリアル謎解きゲームです。',
      '謎解きキットの情報を頼りに、神姫バスと山陽電車を使って沿線を巡りながら、姫路の街に隠された謎を解いていきます。',
      '気候のいい時期に姫路をご堪能ください。6時間の想定ですが、寄り道するとより楽しい周遊型の謎解きです。',
    ],
    overview: {
      team: '1人〜',
      duration: '約6時間（休憩除く）',
      start: '自由スタート',
      location: '屋外（姫路・山陽電車沿線）',
      format: '周遊型',
      note: '制作：ShareKOBE / 主催：神姫バス・山陽電車（特設サイト：謎解きゼペッツ）'
    },
    schedule: {
      period: '2026.3.20〜2026.11.30',
      note: '複数日に渡ってのプレイも可能（デジタル乗車券は利用開始当日のみ有効）。'
    },
    tickets: [
      { label: '姫路市内版', price: '2,600', unit: '円' },
      { label: '山陽全線版', price: '3,300', unit: '円' },
    ],
    ticketNotes: 'スルッとQRtto Webページで購入（会員登録・クレジットカード決済）。子ども料金の設定なし。キット内容は両プラン共通。',
    officialUrl: 'https://nazotoki-zepets.com/himeji_nazo2026/',
    officialLabel: '特設サイトを見る'
  },
  {
    id: 'docchi',
    title: 'AnswerはどっちでSHOW!?',
    hashtag: '#どっち謎',
    category: 'イベント',
    year: 2022,
    month: 1,
    day: 14,
    desc: 'あの有名な番組に出演し、華麗に謎を解き『価値なし』を回避せよ！',
    hue: 15,
    image: 'どっち謎KV（2026広島）.jpg',
    tagline: 'あの有名な番組に出演し、華麗に謎を解き『価値なし』を回避せよ！',
    storyLead: 'あなたはどっち？',
    story: [
      '『一流のナゾクラ』を決める裏番組があるらしい…。',
      '普段から謎解きに精通しているあなた達はそんな噂を聞きつけた。',
      '「謎解きがあるのに、参加を逃すわけにはいかない。」',
      'と、あなたたちは興味本位で参加することを決意。',
      '参加してみると例の番組のような、『部屋を選ぶ』謎解きだった。',
      '選択を間違えれば「ランク」が落とされてしまう。',
      'しかも、『価値なし』となった人間たちは行方不明になるという噂も…。',
      '既に、参加を後悔する気持ちも湧いてきたが、迫りくる様々な困難を乗り越えて、この番組を無事にのりこえろ！',
    ],
    overview: {
      team: '1〜4人',
      duration: '約55分',
      start: '一斉スタート',
      location: '屋内',
      format: 'ルーム型',
      note: '初演時はホール型（1公演2チームまで）としても実施。'
    },
    tickets: [
      { label: '初演（All Clear!大パーティー）', price: '2,000', unit: '円' },
    ]
  },
  {
    id: 'aimai',
    title: 'あいまいセツエーション',
    hashtag: '#あいせつ謎',
    category: '周遊',
    year: 2025,
    month: 7,
    day: 19,
    desc: 'あいまいな状況が連鎖する謎解き周遊イベント。',
    hue: 60,
    featured: true,
    image: 'あいまいセツエーション.jpg',
    tagline: 'あいまいな状況が、連鎖する。',
    storyLead: 'あいまいな状況が連鎖する謎解き周遊イベント。',
    story: [
      'あいまいな状況が連鎖する謎解き周遊イベントとして実施。',
      '詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。',
    ],
    overview: {
      team: '1人〜',
      duration: '—',
      start: '随時スタート',
      location: '屋内',
      format: '周遊型'
    },
    schedule: {
      period: '2025.7.19'
    }
  },
  {
    id: 'docchi-r',
    title: 'AnswerはどっちでSHOW!? リターンズ',
    hashtag: '#どっち謎R',
    category: 'イベント',
    year: 2025,
    month: 2,
    day: 22,
    desc: '「AnswerはどっちでSHOW」の続編がMysteria宝塚で開催！ ShareKOBEによるMysteriaオリジナル謎解き。',
    hue: 45,
    image: 'どっち謎R.jpeg',
    place: 'Mysteria宝塚',
    tagline: '今度の舞台は一軒家',
    storyLead: '今度の舞台は一軒家',
    story: [
      '「AnswerはどっちでSHOW」の続編がMysteria宝塚で開催！',
      '一軒家にある複数の部屋。',
      '時間内に謎を解き、コタエの部屋で正解発表の時を迎えましょう。',
      'あなたは最後まで「一流」の座を死守できるのか！？',
      '（前作とは内容も全て異なります）',
    ],
    overview: {
      team: '2〜4人',
      duration: '約100分',
      start: '一斉スタート',
      location: '屋内（Mysteria宝塚）',
      format: 'ルーム型',
      note: '3枚ご購入の方は2チームに分かれていただきます。'
    },
    schedule: {
      period: '2025.11.23〜2025.11.24'
    },
    tickets: [
      { label: '一般', price: '3,500', unit: '円' },
    ]
  },
  {
    id: 'nazokaruta-ex',
    title: 'ナゾカルタEX',
    hashtag: '#ナゾカルタEX',
    category: 'イベント',
    year: 2025,
    month: 5,
    day: 31,
    desc: 'とってもたのしいナゾめくカルタ。EXPERT EDITION。',
    hue: 90,
    image: 'ナゾカルタEXKV（大阪.jpg',
    tagline: 'とってもたのしいナゾめくカルタ。',
    storyLead: 'とってもたのしいナゾめくカルタ。',
    story: [
      'とってもたのしいナゾめくカルタ。',
      'EXPERT EDITIONとして登場。',
      '最速タイムを目指して次から次へと札を取れ！',
      '※「ノーマルモード」と「パニックモード」はゲーム開始時に選択可能',
      '※前作のナゾカルタ Standard Editionとは公演内容は異なります。',
    ],
    overview: {
      team: '1〜2人',
      duration: '約40分',
      start: '一斉スタート',
      location: '屋内',
      format: 'カフェ型'
    }
  },
  {
    id: 'tokishirazu',
    title: 'トキシラズ',
    hashtag: '#トキシラズ謎',
    category: 'イベント',
    year: 2025,
    month: 7,
    day: 19,
    desc: 'トキシラズの謎解きイベント。',
    hue: 120,
    image: 'トキシラズKV.jpg',
    tagline: 'トキシラズ',
    story: [
      '詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。',
    ],
    overview: {
      team: '最大4人',
      duration: '—',
      start: '一斉スタート',
      location: '屋内',
      format: 'ルーム型'
    },
    schedule: {
      period: '2025.7.19'
    }
  },
  {
    id: 'leftover',
    title: 'Leftover',
    hashtag: '#Leftover謎',
    category: 'イベント',
    year: 2025,
    month: 7,
    day: 19,
    desc: 'Leftoverの謎解き。',
    hue: 270,
    image: 'Leftover.jpeg',
    tagline: 'Leftover',
    story: [
      '詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。',
    ],
    overview: {
      team: '1人〜',
      duration: '—',
      start: '随時スタート',
      location: '屋内',
      format: 'ルーム型'
    },
    schedule: {
      period: '2025.7.19'
    }
  },
  {
    id: 'kungfuuuu',
    title: 'KungFuuuu',
    hashtag: '#カンフー謎',
    category: 'イベント',
    year: 2024,
    month: 9,
    day: 24,
    desc: 'KungFuuuuの謎解きイベント。',
    hue: 150,
    image: 'KungFuuuu\u3000KV.jpg',
    tagline: 'KungFuuuu',
    story: [
      '詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。',
    ],
    overview: {
      team: '最大4人',
      duration: '—',
      start: '一斉スタート',
      location: '屋内',
      format: 'ホール型'
    },
    schedule: {
      period: '2024.9.24'
    }
  },
  {
    id: 'wondertale',
    title: 'wondertale',
    hashtag: '#2月騎士',
    category: 'イベント',
    year: 2024,
    month: 2,
    day: 23,
    desc: 'Wondertale ~ホワイトドラゴンと2月の騎士~',
    hue: 240,
    image: 'wondertale.jpeg',
    tagline: 'Wondertale ~ホワイトドラゴンと2月の騎士~',
    storyLead: '伝説の悪しき龍「ホワイトドラゴン」の復活まで残り僅か。',
    story: [
      'SharekOBEがお届けする、ちょっと不思議な物語 Wonderaleシリーズの第一弾！',
      '伝説の悪しき龍「ホワイトドラゴン」の復活まで残り僅か。',
      '頼りない村長に任せていては村だけでなく、世界が滅びてしまう。',
      '世界の命運は、「特別な力」が使えるあなたたちに託された。',
      '謎を解き、力を駆使して世界を救え！',
    ],
    overview: {
      team: '最大4人',
      duration: '約100分',
      start: '一斉スタート',
      location: '屋内',
      format: 'ホール型'
    }
  },
  {
    id: 'mechamore',
    title: 'がけっぷち撮影会 めちゃ盛れ！',
    hashtag: '#めちゃもれ',
    category: 'イベント',
    year: 2024,
    month: 7,
    day: 6,
    desc: 'がけっぷち撮影会 めちゃ盛れ！',
    hue: 330,
    image: 'A4_MV_MM_240802.jpg',
    tagline: 'めちゃ盛れ！',
    story: [
      '詳細なストーリー・概要は、後ほどチケットサイト等の文面をもとに編集予定です。',
    ],
    overview: {
      team: '最大4人',
      duration: '—',
      start: '一斉スタート',
      location: '屋内',
      format: 'ルーム型'
    },
    schedule: {
      period: '2024.7.6'
    }
  },
  {
    id: 'nazokaruta',
    title: 'ナゾカルタ',
    hashtag: '#ナゾカルタ',
    category: 'イベント',
    year: 2024,
    month: 6,
    day: 2,
    desc: 'とってもたのしいナゾめくカルタ。Standard Edition。',
    hue: 345,
    image: 'KV.jpg',
    tagline: 'とってもたのしいナゾめくカルタ。',
    storyLead: 'とってもたのしいナゾめくカルタ。',
    story: [
      'とってもたのしいナゾめくカルタ。',
      '謎解きに慣れていない方、初めて謎解きをする方でも楽しめる公演として制作された Standard Edition。',
      '最速タイムを目指して札を取る、カルタ形式の謎解きです。',
    ],
    overview: {
      team: '最大2人',
      duration: '約40分',
      start: '一斉スタート',
      location: '屋内',
      format: 'ブース型'
    }
  },
  {
    id: 'acchisocchitacchi',
    title: 'あっちそっちたっち',
    hashtag: '#あっちそっちたっち',
    category: 'イベント',
    year: 2023,
    month: 11,
    day: 11,
    desc: '部屋に入ると75枚のパネル。謎を解き、あっちもそっちもたっち！',
    hue: 180,
    image: 'あっちそっちたっち.jpg',
    place: '東京タワー（謎解きフェスタ）',
    tagline: 'あっちもそっちもたっち！',
    storyLead: 'パネルを駆使して全ての謎を解け！',
    story: [
      'あなたが入った部屋には75枚のパネル。',
      '謎を解き、あっちもそっちもたっちして、答えを入力しよう。',
      '何分で最後の答えを入力できるか!?ライバルは他の回!?',
      '※本イベントにはストーリーはございません',
      '※動きやすい服装でお越しください。',
    ],
    overview: {
      team: '最大4人',
      duration: '約45分',
      start: '一斉スタート',
      location: '屋内',
      format: 'ルーム型'
    },
    schedule: {
      period: '2023.12.9〜2023.12.10（謎解きフェスタ in 東京タワー）'
    },
    tickets: [
      { label: '一般（1名）', price: '2,500', unit: '円' },
    ]
  },
  {
    id: 'overmap',
    title: 'OverMap',
    hashtag: '#Overmap謎',
    category: '周遊',
    year: 2023,
    month: 10,
    day: 7,
    desc: '場所の特定自体が謎になっている、最宴祭の周遊謎。',
    hue: 210,
    image: 'overmap mainviosual.jpg',
    place: '浪速区民センター周辺（大阪最宴祭）',
    tagline: '地図を重ねて、場所を探せ。',
    storyLead: '地図を重ねて、場所を特定せよ。',
    story: [
      '大阪最宴祭で実施した周遊型の謎解き。',
      '地図を重ねることで場所の特定そのものが謎になる、メタ寄りの周遊体験です。',
      '遠方の方も含め、区民センターの開館時間外でも楽しめるよう設計された作品です。',
    ],
    overview: {
      team: '1人〜',
      duration: '約1時間',
      start: '随時スタート',
      location: '屋外',
      format: '周遊型',
      note: '最宴祭主催の依頼条件：浪速区民センター閉館後も可能／目安1時間程度。'
    },
    tickets: [
      { label: '参加費（当時）', price: '500', unit: '円' },
    ]
  },
  {
    id: 'hometatae',
    title: 'いこいの場 ホメタタエ',
    hashtag: '#ホメタタエ',
    category: 'イベント',
    year: 2023,
    month: 10,
    day: 7,
    desc: '最近誰かから褒められていますか？ いこいの場ホメタタエへお立ち寄りください。',
    hue: 300,
    image: 'A4_hometatae_MV.png',
    tagline: '最近誰かから褒められていますか？',
    storyLead: '最近誰かから褒められていますか？',
    story: [
      '何かをすればSNSで叩かれる昨今。',
      '他人に褒められるような幸せな場所、それがここ「いこいの場ホメタタエ」です。',
      'どなたであってもご参加可能ですので、ぜひ１度お立ち寄りください！',
      'こんな私でも幸せになれるかなと不安になる必要はありません。',
      '疲れた時、心を癒したい時、いつどんな時でも「いこいの場所ホメタタエ」はあなたをお待ちしております。',
    ],
    overview: {
      team: '最大4人',
      duration: '約90分',
      start: '一斉スタート',
      location: '屋内',
      format: 'ホール型'
    }
  },
];
