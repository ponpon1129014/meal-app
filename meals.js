const meals = [

  // heavy
  { name: "カレー", type: "heavy", category: "rice", image: "images/curry.jpg", id: "curry",
    emoji: "🍛", description: "スパイスが効いた定番の人気メニュー。", 
    difficulty: 3, availability: 4, pairing: ["salad", "soup", "fukujinzuke"],
    tags: ["通年", "がっつり食べたい", "特別な日に"] },

  { name: "ラーメン", type: "heavy", category: "noodle", image: "images/ramen.jpg", id: "ramen",
    emoji: "🍜", description: "濃厚なスープと麺が絡む、日本の国民食。",
    difficulty: 2, availability: 5, pairing: ["gyoza", "karaage", "chahan"],
    tags: ["冬", "通年", "がっつり食べたい", "温まりたい"] },

  { name: "寿司", type: "heavy", category: "rice", image: "images/sushi.jpg", id: "sushi",
    emoji: "🍣", description: "新鮮なネタとシャリの組み合わせが最高。",
    difficulty: 4, availability: 4, pairing: ["soup", "salad"],
    tags: ["通年", "特別な日に", "さっぱりしたい"] },

  { name: "焼肉", type: "heavy", category: "meat", image: "images/yakiniku.jpg", id: "yakiniku",
    emoji: "🥩", description: "自分で焼くのが楽しい、みんな大好きな肉料理。",
    difficulty: 2, availability: 2, pairing: ["salad", "soup", "rice"],
    tags: ["通年", "がっつり食べたい", "特別な日に"] },

  { name: "ハンバーグ", type: "heavy", category: "meat", image: "images/hamburg.jpg", id: "hamburg",
    emoji: "🍖", description: "ジューシーな肉汁があふれる洋食の定番。",
    difficulty: 3, availability: 4, pairing: ["salad", "soup", "friedrice"],
    tags: ["通年", "がっつり食べたい", "特別な日に"] },

  { name: "ステーキ", type: "heavy", category: "meat", image: "images/steak.jpg", id: "steak",
    emoji: "🥩", description: "豪快に焼いた厚切り肉。特別感があってテンションが上がる。",
    difficulty: 3, availability: 3, pairing: ["salad", "soup", "friedrice"],
    tags: ["通年", "がっつり食べたい", "特別な日に"] },

  { name: "チャーハン", type: "heavy", category: "rice", image: "images/friedrice.jpg", id: "friedrice",
    emoji: "🍚", description: "パラパラに炒めたご飯が香ばしい中華の定番。",
    difficulty: 3, availability: 4, pairing: ["gyoza", "soup", "ramen"],
    tags: ["通年", "がっつり食べたい", "手軽に済ませたい"] },

  { name: "唐揚げ", type: "heavy", category: "meat", image: "images/karaage.jpg", id: "karaage",
    emoji: "🍗", description: "外はカリッ、中はジューシー。揚げ物の王様。",
    difficulty: 3, availability: 5, pairing: ["salad", "rice", "soup"],
    tags: ["通年", "がっつり食べたい"] },

  { name: "牛丼", type: "heavy", category: "rice", image: "images/gyudon.jpg", id: "gyudon",
    emoji: "🥣", description: "甘辛い牛肉がご飯に染みる、手軽でうまい丼。",
    difficulty: 2, availability: 5, pairing: ["salad", "soup", "onigiri"],
    tags: ["通年", "がっつり食べたい", "手軽に済ませたい"] },

  { name: "天丼", type: "heavy", category: "rice", image: "images/tendon.jpg", id: "tendon",
    emoji: "🍤", description: "サクサクの天ぷらにタレが絡む、ご飯が進む丼もの。",
    difficulty: 4, availability: 4, pairing: ["salad", "soup", "soba"],
    tags: ["通年", "がっつり食べたい", "特別な日に"] },

  // light
  { name: "うどん", type: "light", category: "noodle", image: "images/udon.jpg", id: "udon",
    emoji: "🍜", description: "もちもちの麺が体に優しい定番麺。",
    difficulty: 1, availability: 5, pairing: ["onigiri", "tendon", "soup"],
    tags: ["通年", "さっぱりしたい", "温まりたい", "手軽に済ませたい"] },

  { name: "そば", type: "light", category: "noodle", image: "images/soba.jpg", id: "soba",
    emoji: "🍜", description: "風味豊かな蕎麦の香りがたまらない。さっぱり食べたい日に。",
    difficulty: 1, availability: 5, pairing: ["tendon", "onigiri", "soup"],
    tags: ["通年", "さっぱりしたい", "手軽に済ませたい"] },

  { name: "サラダ", type: "light", category: "light", image: "images/salad.jpg", id: "salad",
    emoji: "🥗", description: "野菜たっぷりでヘルシー。",
    difficulty: 1, availability: 5, pairing: ["sandwich", "soup", "hamburg"],
    tags: ["春", "夏", "さっぱりしたい", "手軽に済ませたい"] },

  { name: "サンドイッチ", type: "light", category: "light", image: "images/sandwich.jpg", id: "sandwich",
    emoji: "🥪", description: "手軽に食べられるパン料理。",
    difficulty: 1, availability: 5, pairing: ["salad", "soup", "yogurt"],
    tags: ["通年", "さっぱりしたい", "手軽に済ませたい"] },

  { name: "おにぎり", type: "light", category: "rice", image: "images/onigiri.jpg", id: "onigiri",
    emoji: "🍙", description: "シンプルだけど飽きない日本の定番。",
    difficulty: 1, availability: 5, pairing: ["salad", "soup", "udon"],
    tags: ["通年", "手軽に済ませたい", "さっぱりしたい"] },

  { name: "スープ", type: "light", category: "light", image: "images/soup.jpg", id: "soup",
    emoji: "🍲", description: "体の芯から温まる一杯。",
    difficulty: 2, availability: 5, pairing: ["sandwich", "salad", "onigiri"],
    tags: ["冬", "秋", "温まりたい", "さっぱりしたい"] },

  { name: "冷やし中華", type: "light", category: "noodle", image: "images/hiyashi.jpg", id: "hiyashi",
    emoji: "🍜", description: "暑い日に食べたくなる夏の定番麺。",
    difficulty: 2, availability: 4, pairing: ["salad", "gyoza", "soup"],
    tags: ["夏", "さっぱりしたい"] },

  { name: "ヨーグルト", type: "light", category: "light", image: "images/yogurt.jpg", id: "yogurt",
    emoji: "🥛", description: "腸活にもなる手軽な一品。",
    difficulty: 1, availability: 5, pairing: ["fruits", "sandwich", "salad"],
    tags: ["通年", "さっぱりしたい", "手軽に済ませたい"] },

  { name: "フルーツ", type: "light", category: "light", image: "images/fruits.jpg", id: "fruits",
    emoji: "🍎", description: "自然の甘みとビタミンが嬉しい。",
    difficulty: 1, availability: 5, pairing: ["yogurt", "salad", "sandwich"],
    tags: ["春", "夏", "さっぱりしたい", "手軽に済ませたい"] },

  // normal
  { name: "親子丼", type: "normal", category: "rice", image: "images/oyakodon.jpg", id: "oyakodon",
    emoji: "🥚", description: "鶏肉と卵のふわとろコンビが絶品。",
    difficulty: 2, availability: 5, pairing: ["salad", "soup", "onigiri"],
    tags: ["通年", "温まりたい", "手軽に済ませたい"] },

  { name: "オムライス", type: "normal", category: "rice", image: "images/omurice.jpg", id: "omurice",
    emoji: "🍳", description: "ケチャップライスをふわふわ卵で包んだ洋食の定番。",
    difficulty: 3, availability: 4, pairing: ["salad", "soup", "hamburg"],
    tags: ["通年", "特別な日に"] },

  { name: "ナポリタン", type: "normal", category: "noodle", image: "images/napolitan.jpg", id: "napolitan",
    emoji: "🍝", description: "懐かしいケチャップ味のスパゲティ。",
    difficulty: 2, availability: 4, pairing: ["salad", "soup", "hamburg"],
    tags: ["通年", "手軽に済ませたい"] },

  { name: "餃子", type: "normal", category: "snack", image: "images/gyoza.jpg", id: "gyoza",
    emoji: "🥟", description: "パリッと焼けた皮とジューシーな餡が最高。",
    difficulty: 3, availability: 5, pairing: ["ramen", "friedrice", "soup"],
    tags: ["通年", "がっつり食べたい", "特別な日に"] },

  { name: "焼きそば", type: "normal", category: "noodle", image: "images/yakisoba.jpg", id: "yakisoba",
    emoji: "🍜", description: "ソース香る炒め麺。お祭りの屋台を思い出す味。",
    difficulty: 2, availability: 5, pairing: ["gyoza", "soup", "salad"],
    tags: ["夏", "通年", "手軽に済ませたい"] },

  { name: "グラタン", type: "normal", category: "snack", image: "images/gratin.jpg", id: "gratin",
    emoji: "🧀", description: "とろとろのホワイトソースとチーズが絡むオーブン料理。",
    difficulty: 4, availability: 4, pairing: ["salad", "soup", "sandwich"],
    tags: ["冬", "秋", "温まりたい", "特別な日に"] },

  { name: "ドリア", type: "normal", category: "rice", image: "images/doria.jpg", id: "doria",
    emoji: "🍚", description: "クリームソースとチーズをかけてオーブンで焼いた洋食。",
    difficulty: 4, availability: 3, pairing: ["salad", "soup", "gratin"],
    tags: ["冬", "秋", "温まりたい", "特別な日に"] },

  { name: "ピザ", type: "normal", category: "snack", image: "images/pizza.jpg", id: "pizza",
    emoji: "🍕", description: "トッピング次第で無限のアレンジが楽しめる人気料理。",
    difficulty: 3, availability: 5, pairing: ["salad", "soup", "hamburg"],
    tags: ["通年", "特別な日に", "がっつり食べたい"] },

  { name: "たこ焼き", type: "normal", category: "snack", image: "images/takoyaki.jpg", id: "takoyaki",
    emoji: "🐙", description: "外はカリッ、中はトロッとした大阪名物。",
    difficulty: 3, availability: 5, pairing: ["okonomiyaki", "yakisoba", "soup"],
    tags: ["通年", "手軽に済ませたい", "特別な日に"] },

  { name: "お好み焼き", type: "normal", category: "snack", image: "images/okonomiyaki.jpg", id: "okonomiyaki",
    emoji: "🥞", description: "キャベツたっぷりの生地を焼いた粉もんの定番。",
    difficulty: 3, availability: 4, pairing: ["takoyaki", "yakisoba", "soup"],
    tags: ["通年", "がっつり食べたい", "特別な日に"] },

];