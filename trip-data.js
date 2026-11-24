const sakanaRestaurant = {
  name: '漁師食堂 大ばんぶる舞 さかな大統漁',
  address: '沖縄県那覇市港町3-1-17',
  website: 'https://f467711.gorp.jp/',
  menu: 'https://r.gnavi.co.jp/1xtzvj8t0000/lunch/'
};
const sakanaMapQuery = `${sakanaRestaurant.name} ${sakanaRestaurant.address}`;

const busTimetables = {
  20: 'https://daiichibus.co.jp/ryukyubus/wp-content/uploads/2026/09/020_wd_01.pdf',
  28: 'https://daiichibus.co.jp/ryukyubus/wp-content/uploads/2026/09/028_wd_01.pdf',
  55: 'https://daiichibus.co.jp/ryukyubus/wp-content/uploads/2025/11/055_wd_00.pdf',
  98: 'https://daiichibus.co.jp/ryukyubus/wp-content/uploads/2025/11/098_wd_00.pdf'
};

const transportStops = {
  'american-village-return': {title: '美國村回那霸', stop: '美浜アメリカンビレッジ入口', direction: '往宜野灣／那霸巴士總站'},
  'outlet-return': {title: 'Outlet 回旭橋', stop: 'アウトレットモールあしびなー前', direction: '往旭橋・那霸巴士總站'}
};

const days = [
  {
    date:'1/11',
    title: '抵達那霸・漁師食堂・3COINS',
    sub: '週一 · 寄放行李後到港町用餐',
    events: [
      ['09:45','高雄出發｜台灣虎航 IT288','高雄 → 那霸，預計 12:30 抵達'],
      ['12:30','抵達那霸機場','入境、領取行李'],
      ['約 13:00','搭單軌電車往旭橋','車資另計；依實際出關時間調整'],
      ['13:40',"旭橋站前尊享生活旅館・寄放行李","Premier 館：那霸市東町 11-17。15:00 起入住；提前寄放行李須先向飯店確認。","リビングイン旭橋駅前プレミア 那覇市東町11-17"],
      ['寄放行李後',sakanaRestaurant.name,`從旭橋飯店搭計程車到 ${sakanaRestaurant.address}。推薦招牌刺身定食、月見鮪魚丼配鮪魚拉麵、鮪魚排咖哩。店家目前公告週一 10:00–17:00；1/11 是日本成人之日，假日營業請先向店家確認。`,sakanaMapQuery],
      ['接著','3COINS+plus｜那霸 Main Place','用餐後從食堂搭計程車前往那霸 Main Place 1 樓。商場目前公告門市 10:00–22:00。','3COINS+plus 那覇メインプレイス店'],
      ['有空再去','第一牧志公設市場','視抵達時間與店家營業狀況決定是否前往。','第一牧志公設市場','optional'],
      ['傍晚～晚上','國際通散步・自由活動','依體力決定是否前往，晚餐待定。','國際通','optional']
    ]
  },
  {
    date: '1/12',
    title: '北部一日遊・美國村',
    sub: '週二 · 跟團後於美國村自行下車',
    events: [
      ['08:10','Palette 久茂地集合','那霸縣廳前百貨冰淇淋店前；08:20 準時發車','Palette 久茂地'],
      ['約 09:20','萬座毛','暫排停留約 30 分鐘；是否含入場費須核對所訂方案','萬座毛'],
      ['途中','古宇利大橋','車覽，不下車','古宇利大橋'],
      ['上午','古宇利島','停留約 30 分鐘','古宇利島'],
      ['中午～下午','沖繩美麗海水族館','暫排約 3.5 小時（含自理午餐）；是否含門票須核對所訂方案','沖繩美麗海水族館'],
      ['傍晚','美國村下車','自由逛街、晚餐；不搭團車回那霸','美浜アメリカンビレッジ'],
      ['19:10','28 號公車｜提早回程','美國村入口往那霸方向上車，現行平日班表 20:05 抵達那霸巴士總站。','美浜アメリカンビレッジ入口','backup', {group: 'american-village-return', route: 28, arrival: '20:05', label: '提早回程'}],
      ['19:34','20 號公車｜主要班次','美國村入口往那霸方向上車，現行平日班表 20:40 抵達那霸巴士總站（旭橋附近）。','美浜アメリカンビレッジ入口',null, {group: 'american-village-return', route: 20, arrival: '20:40', label: '主要班次'}]
    ]
  },
  {
    date: '1/13',
    title: 'DMM 水族館・Outlet',
    sub: '週三 · 購物日',
    events: [
      ['08:00 前','抵達國際通入口候車','從飯店直接前往國際通入口的沖繩銀行總行前站牌，靠久茂地路口一側。','国際通り入口 沖縄銀行本店前'],
      ['08:15','搭 TK02 巴士','現行平日班表：國際通入口出發，09:02 到 iias 沖繩豐崎。','国際通り入口 沖縄銀行本店前'],
      ['約 09:02','抵達 iias','依現行平日班表估計到站時間，抵達後前往 DMM。','iias 沖縄豊崎'],
      ['09:10–11:00','DMM Kariyushi 水族館','暫排參觀約 1 小時 50 分；09:10 入館須先核對 2027/1/13 營運日曆','DMMかりゆし水族館'],
      ['11:00–12:30','iias 午餐・逛街','自由用餐與購物','iias 沖縄豊崎'],
      ['12:30–13:00','前往 ASHIBINAA Outlet','轉乘方式與時間待確認','沖縄アウトレットモール あしびなー'],
      ['13:00–15:30','ASHIBINAA Outlet','購物 2.5 小時；可從景點頁開啟地圖','沖縄アウトレットモール あしびなー'],
      ['15:17','55 號公車｜提早回程','從 Outlet 前往那霸巴士總站方向的站牌上車，現行平日班表 15:53 到旭橋・那霸巴士總站。','アウトレットモールあしびなー前 バス停','backup', {group: 'outlet-return', route: 55, arrival: '15:53', label: '提早回程'}],
      ['15:47','98 號公車｜主要班次','從 Outlet 前往那霸巴士總站方向的站牌上車，現行平日班表 16:25 到那霸巴士總站。','アウトレットモールあしびなー前 バス停',null, {group: 'outlet-return', route: 98, arrival: '16:25', label: '主要班次'}],
      ['16:13','55 號公車｜錯過 98 號時','在同一方向的 Outlet 前站牌上車，現行平日班表 16:52 到旭橋・那霸巴士總站。','アウトレットモールあしびなー前 バス停','backup', {group: 'outlet-return', route: 55, arrival: '16:52', label: '錯過 98 號時'}],
      ['晚上','國際通晚餐・自由活動','視體力安排','國際通']
    ]
  },
  {
    date: '1/14',
    title: '南部一日遊・瀨長島',
    sub: '週四 · 帶行李參團，瀨長島下車',
    events: [
      ['07:10 前後',"旭橋站前尊享生活旅館退房・攜帶行李","清晨退房方式請提前向飯店確認，再前往縣民廣場集合。","リビングイン旭橋駅前プレミア 那覇市東町11-17"],
      ['07:50','Klook 南部一日遊集合','縣民廣場；08:00 預計發車','沖縄県庁前 県民広場'],
      ['約 08:50–09:30','知念岬公園','海景散步','知念岬公園'],
      ['約 09:50–10:40','新原海灘','沙灘散步','新原ビーチ'],
      ['約 11:00–13:30','沖繩世界・玉泉洞','入場費是否包含請核對訂單','おきなわワールド'],
      ['約 14:00–15:00','糸滿魚市場','自由午餐／海鮮','糸満お魚センター'],
      ['下午','iias 沖繩豐崎','隨團停靠；不重複購買 DMM 門票','iias 沖縄豊崎'],
      ['傍晚','瀨長島下車','攜帶行李及瀨長島提前下車，須取得業者確認；尚未核對訂單','瀬長島'],
      ['傍晚','入住 THE SENAGAJIMA STORYLINE','放好行李後前往海風露台','THE SENAGAJIMA STORYLINE'],
      ['晚上','Umikaji Terrace・晚餐','海景、夕陽；實際時間視團車抵達','瀬長島ウミカジテラス']
    ]
  },
  {
    date: '1/15',
    title: '返程・那霸機場',
    sub: '週五 · 返回高雄',
    events: [
      ['07:30–08:30','飯店早餐','THE SENAGAJIMA STORYLINE'],
      ['08:30–09:00','整理行李・退房','預留交通與報到時間'],
      ['約 09:30','抵達那霸機場','建議搭計程車；費用待確認','那覇空港'],
      ['12:40','捷星航空 GK097 起飛','那霸 → 高雄'],
      ['13:35','抵達高雄','旅程結束']
    ]
  }
];

// 景點陣列依序是圖示、名稱、說明、地圖關鍵字、官網。
const places = [
  ['🛍️','ASHIBINAA Outlet','第三天 13:00–15:30 購物；可從官方網站查最新店鋪。','沖縄アウトレットモール あしびなー','https://www.ashibinaa.com/'],
  ['🐠','DMM Kariyushi 水族館','第三天暫排 09:10–11:00；開館時間待核對。位於 iias 沖繩豐崎。','DMMかりゆし水族館'],
  ['🏬','iias 沖繩豐崎','第三天午餐購物；第四天團遊也可能停靠。','iias 沖縄豊崎'],
  ['🐟',sakanaRestaurant.name,`第一天寄放行李後搭計程車前往。店址：${sakanaRestaurant.address}。1/11 假日營業待確認。`,sakanaMapQuery,sakanaRestaurant.website],
  ['🛍️','3COINS+plus｜那霸 Main Place','第一天在漁師食堂用餐後前往，商場 1 樓門市。','3COINS+plus 那覇メインプレイス店','https://blog-nahamainplace.san-a.co.jp/shoplist/detail/?cd=000043'],
  ['🌊','萬座毛','第二天北部一日遊第一個主要景點。','万座毛'],
  ['🌉','古宇利大橋','第二天車覽，不下車。','古宇利大橋'],
  ['🏝️','古宇利島','第二天停留約 30 分鐘。','古宇利島'],
  ['🐋','沖繩美麗海水族館','第二天停留約 3.5 小時，包含自行午餐。','沖縄美ら海水族館'],
  ['🎡','美國村','第二天團遊結束後自行下車、晚餐。','美浜アメリカンビレッジ'],
  ['🚌','美國村入口公車站','往那霸方向。現行平日班表：20 號 19:34，提早回程可搭 28 號 19:10。','美浜アメリカンビレッジ入口'],
  ['🚌','那霸巴士總站','第二天回程下車處，鄰近旭橋站。','那覇バスターミナル'],
  ['🍱','第一牧志公設市場','第一天備選，逛完 3COINS 後視時間與營業狀況安排行程。','第一牧志公設市場'],
  ['🌺','國際通','第一天與第三天晚間自由活動。','国際通り 那覇'],
  ['🌅','知念岬公園','第四天南部一日遊。','知念岬公園'],
  ['🏖️','新原海灘','第四天南部一日遊。','新原ビーチ'],
  ['🪨','沖繩世界・玉泉洞','第四天南部一日遊。','おきなわワールド'],
  ['🦐','糸滿魚市場','第四天南部一日遊。','糸満お魚センター'],
  ['🌇','瀨長島海風露台','第四天傍晚散步與晚餐。','瀬長島ウミカジテラス'],
  ['🏨','THE SENAGAJIMA STORYLINE','第四晚住宿。','THE SENAGAJIMA STORYLINE']
];

const defaultBudget = [
  ['來回機票',29238],
  ['四晚住宿',10000],
  ['北部一日遊',4956],
  ['南部 Klook 團費',2800],
  ['當地交通（暫估）',4000],
  ['景點門票（暫估）',2500],
  ['餐飲五天（暫估）',15000],
  ['購物（自行填寫）',0]
];

const checks = ['護照有效期限確認','機票與行李額度確認','旭橋站前尊享生活旅館 Premier 館房型與訂單確認','第四晚 STORYLINE 訂房確認','Klook 北部／南部團訂單確認','2027 年巴士班表再核實','DMM 門票與預約確認','手機網路／eSIM','日幣現金、信用卡、交通卡','旅遊保險及緊急聯絡資訊'];

// 保留原有清單索引，讓這台裝置先前勾選的項目繼續有效。
checks.push('1/11 漁師食堂成人之日營業時間', '1/13 DMM 09:10 能否入館', '1/14 南部團可帶行李並在瀨長島下車');
const departureChecks = [
  {index: 10, link: sakanaRestaurant.website, label: '店家資訊'},
  {index: 5, link: 'https://www.busnavi-okinawa.com/top/', label: '巴士查詢'},
  {index: 11, link: 'https://kariyushi-aquarium.com/opening-hours/', label: 'DMM 營運日曆'},
  {index: 12}
];

const itineraryPhotos=[["國際通", "Naha Kokusai Street 2.jpg", "國際通街景", "Zairon", "by/4.0", "2023"], ["古宇利大橋", "Kouri Bridge and the beach 20191109a.jpg", "古宇利大橋與海灘", "Solomon203", "by-sa/4.0", "2019"], ["瀨長島下車", "Senagajima Island from Toyosaki Seaside Park.JPG", "從豐崎海濱公園遠眺瀨長島", "そらみみ", "by-sa/4.0", "2015"], ["抵達那霸機場", "Naha-Airport-building.jpg", "那霸機場建築（歷史照片）", "Hykw-a4", "by-sa/3.0", "2005"]];

itineraryPhotos.push(...[["萬座毛", "Cape Manzamo.JPG", "萬座毛海岸", "そらみみ", "by-sa/4.0", "2015"], ["玉泉洞", "Gyokusendo 20221228-1.jpg", "玉泉洞鐘乳石景觀", "Suicasmo", "by-sa/4.0", "2022"], ["DMM Kariyushi", "DMM Kariyushi Aquarium 202006.jpg", "DMM Kariyushi 水族館", "Kugel~commonswiki", "by-sa/4.0", "2020"]]);

itineraryPhotos.push(...[["古宇利島", "Kouri Island.JPG", "古宇利島", "Kugel~commonswiki", "PD", "2009"], ["美麗海水族館", "Churaumi Aquarium main tank 'Kuroshio Sea'.jpg", "美麗海水族館黑潮之海（原作者修飾人物剪影）", "Megapixie", "PD", "2008"], ["美國村", "American Village in Okinawa.jpg", "美國村", "Lee Geonju", "by-sa/4.0", "2017"], ["第一牧志公設市場", "Naha City First Makishi Public Market new building.JPG", "第一牧志公設市場新館", "Abasaa", "PD", "2023"], ["知念岬", "Chinen-Misaki-Park.jpg", "知念岬公園", "MaedaAkihiko", "CC0", "2024"]]);

itineraryPhotos.push(...[["iias", "Iias Okinawa Toyosaki 202006.jpg", "iias 沖繩豐崎", "Kugel~commonswiki", "by-sa/4.0", "2020"], ["ASHIBINAA", "JP 日本 Japan 沖繩 OKINAWA Outlet Mall Ashibinaa January 2025 R12S 107.jpg", "ASHIBINAA Outlet", "Naha Mama Pavilionz", "CC0", "2025"], ["糸滿魚市場", "Osakana Center, Itoman.JPG", "糸滿魚市場", "Kugel", "by-sa/3.0", "2010"], ["Umikaji Terrace", "Umikaji Terrace Senagajima.jpg", "瀨長島海風露台", "Kugel~commonswiki", "by-sa/4.0", "2017"]]);

const externalItineraryPhotos = [
  ["新原海灘", "https://nanjomegurun.okinawa/img/main_miibaru_img_002.jpg", "新原海灘", "南城市觀光入口網站", "https://nanjomegurun.okinawa/play/shop/miibaru.html"],
  ["THE SENAGAJIMA STORYLINE", "https://prcdn.freetls.fastly.net/release_image/5113/3127/5113-3127-cf943530b10fd4ae507e475a1467b0be-2000x1333.jpg?width=960", "STORYLINE 瀨長島飯店外觀", "東急ホテルズ＆リゾーツ／PR TIMES", "https://prtimes.jp/main/html/rd/p/000003127.000005113.html"]
];

const bookingRules=[["DMM Kariyushi", [["官方購票", "https://book.kariyushi-aquarium.com/"], ["營運日曆", "https://kariyushi-aquarium.com/opening-hours/"]]], ["美麗海水族館", [["Klook 門票（先核對團費是否含票）", "https://www.klook.com/ja/activity/1421-churaumi-aquarium-okinawa/"]]], ["玉泉洞", [["官方購票（先核對團費是否含票）", "https://okinawaworld-pmp.book.ntmg.com/top?lng=ja-JP"]]], ["THE SENAGAJIMA STORYLINE", [["飯店官方訂房", "https://www.tokyuhotels.co.jp/senagajima-storyline/index.html"]]]];

bookingRules.push(["旭橋站前尊享生活旅館", [["官網／訂房入口", "https://www.livinginn-asahibashiekimae.okinawa/hotel_premier.php"]]]);
bookingRules.push([sakanaRestaurant.name, [['店家資訊', sakanaRestaurant.website], ['午餐菜單', sakanaRestaurant.menu]]]);

// 連結陣列依序是圖示、分類、標題、說明、網址、按鈕文字。
const resourceData = [
  ["🚌", "公車時刻查詢", "沖繩路線公車", "沖繩公車導航｜查站牌、路線與當日班次", "https://www.busnavi-okinawa.com/top/", "時刻表"],
  ["🚌", "公車時刻查詢", "20 號｜美國村 → 那霸", "1/12 主要班次。現行平日班表 19:34 出發，20:40 抵達。", busTimetables[20], "20 號平日班表"],
  ["🚌", "公車時刻查詢", "28 號｜美國村 → 那霸", "1/12 提早回程。現行平日班表 19:10 出發，20:05 抵達。", busTimetables[28], "28 號平日班表"],
  ["🚌", "公車時刻查詢", "98 號｜Outlet → 旭橋", "1/13 主要班次。現行平日班表 15:47 出發，16:25 抵達。", busTimetables[98], "98 號平日班表"],
  ["🚌", "公車時刻查詢", "55 號｜Outlet → 旭橋", "1/13 備選。現行平日班表 15:17 → 15:53；若錯過 98 號，可搭 16:13 → 16:52。", busTimetables[55], "55 號平日班表"],
  ["🚌", "公車時刻查詢", "TK02 海風號", "1/13 依現行平日班表，08:15 從國際通入口出發，09:02 抵達 iias 沖繩豐崎。", "https://www.tokyobus.jp/okinawa/one-city-bus01/", "東京巴士班表與站牌"],
  ["🎫", "門票與預訂", "DMM Kariyushi 水族館", "1/13 入館；官方線上購票", "https://book.kariyushi-aquarium.com/", "購買門票"],
  ["🐠", "官網與導覽", "DMM 交通與站牌", "TK02／55／56／98 相關交通指引", "https://kariyushi-aquarium.com/access/", "交通資訊"],
  ["🐋", "官網與導覽", "美麗海水族館", "1/12 北部團參觀；查看營業時間與入場資訊", "https://www.oki-churaumi.jp/guide/hour/", "官方資訊"],
  ["🛍️", "官網與導覽", "ASHIBINAA Outlet", "1/13 購物；店鋪與館內地圖請由官網進入", "https://www.ashibinaa.com/", "商店／樓層圖"],
  ["🛍️", "官網與導覽", "iias 沖繩豐崎", "1/13 午餐與逛街；館內商店資訊", "https://toyosaki.iias.jp/", "官方網站"],
  ["🌴", "官網與導覽", "瀨長島海風露台", "1/14 傍晚晚餐與散步", "https://www.umikajiterrace.com/", "官方網站"],
  ["🏨", "住宿", "THE SENAGAJIMA STORYLINE", "1/14 入住；住宿資訊", "https://www.tokyuhotels.co.jp/senagajima-storyline/index.html", "飯店官網"],
  ["🎫", "門票與預訂", "Klook 南部一日遊", "原規劃南部團連結；短網址未能核實，方案、集合點與下車安排待核對", "https://s.klook.com/c/nX9qDrOq32", "查看行程"],
  ["🌺", "官網與導覽", "沖繩世界・玉泉洞", "1/14 南部團景點；門票是否含團費請核對訂單", "https://www.gyokusendo.co.jp/okinawaworld/", "官方網站"],
  ["🚝", "公車時刻查詢", "沖繩都市單軌 Yui Rail", "1/11 機場前往旭橋；查票價、路線", "https://www.yui-rail.co.jp/", "官方網站"],
  ['🐟','官網與導覽',sakanaRestaurant.name,'1/11 午餐。店家菜單列有招牌定食 ¥1,080、月見鮪魚丼配鮪魚拉麵 ¥1,180、鮪魚排咖哩 ¥960。以到店菜單為準。',sakanaRestaurant.menu,'午餐菜單'],
  ["🛍️", "官網與導覽", "3COINS+plus｜那霸 Main Place", "1/11 漁師食堂午餐後前往 1 樓門市。", "https://blog-nahamainplace.san-a.co.jp/shoplist/detail/?cd=000043", "門市資訊"],
  ["🎫", "門票與預訂", "美麗海水族館｜Klook 門票（先核對團費是否含票）", "預約入口不代表已訂位、已購票或當日仍有空位；請確認日期、分店與取消條款。", "https://www.klook.com/ja/activity/1421-churaumi-aquarium-okinawa/", "Klook 門票（先核對團費是否含票）"],
  ["🎫", "門票與預訂", "玉泉洞｜官方購票（先核對團費是否含票）", "預約入口不代表已訂位、已購票或當日仍有空位；請確認日期、分店與取消條款。", "https://okinawaworld-pmp.book.ntmg.com/top?lng=ja-JP", "官方購票（先核對團費是否含票）"],
  ["🎫", "門票與預訂", "THE SENAGAJIMA STORYLINE｜飯店官方訂房", "預約入口不代表已訂位、已購票或當日仍有空位；請確認日期、分店與取消條款。", "https://www.tokyuhotels.co.jp/senagajima-storyline/index.html", "飯店官方訂房"],
  ["🏨", "住宿", "旭橋站前尊享生活旅館", "1/11 入住、1/14 退房，共 3 晚。Premier 館：那霸市東町 11-17。", "https://www.livinginn-asahibashiekimae.okinawa/hotel_premier.php", "官網／訂房入口"]
];

const dayPhotos = [
  ["Naha Kokusai Street 2.jpg", "國際通街景", "Zairon", "by/4.0", "2023"],
  ["Kouri Bridge and the beach 20191109a.jpg", "古宇利大橋與海灘", "Solomon203", "by-sa/4.0", "2019"],
  ["DMM Kariyushi Aquarium 202006.jpg", "DMM Kariyushi 水族館", "Kugel~commonswiki", "by-sa/4.0", "2020"],
  ["Senagajima Island from Toyosaki Seaside Park.JPG", "瀨長島遠景", "そらみみ", "by-sa/4.0", "2015"],
  ["Naha-Airport-building.jpg", "那霸機場（歷史照片）", "Hykw-a4", "by-sa/3.0", "2005"]
];

const dayViews = [
  ['那霸初見','港町漁師食堂・3COINS','85% 65%'],
  ['往北，追著海走','美麗海水族館・古宇利島','45% 35%'],
  ['水族館與購物日','DMM・ASHIBINAA Outlet','20% 70%'],
  ['南部風景慢慢看','玉泉洞・瀨長島夕陽','95% 80%'],
  ['帶著回憶回家','飯店早餐・那霸機場','55% 30%']
];
