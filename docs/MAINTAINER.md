# 維護指南

## 架構

- `index.html` 定義首頁與各分頁的 HTML 結構。
- `base.css` 提供共用元件與基礎樣式，`journal.css` 接著套用手帳主題與響應式版面。
- `trip-data.js` 保存行程、景點、預算預設值與圖片及連結資料。`app.js` 負責畫面渲染、分頁切換與本機儲存。HTML 以 `defer` 依序載入兩個傳統 script，可直接用檔案網址開啟。
- `assets/okinawa-journal-cover.webp` 是以 ImageGen 製作的古宇利大橋手繪風封面。首頁日期卡和行程內頁使用的實景照片出處列在「圖片來源」。
- `robots.txt`：阻擋一般搜尋引擎爬取；不提供存取控制。
- `openspec.yaml`：記錄本專案沒有 HTTP API。

## 本機驗證

直接開啟 `index.html`，或在專案根目錄執行：

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

驗收首頁、六個底部導覽分頁、瀏覽器上一頁／下一頁、兩個搜尋框、預算輸入、清單保存、分享及匯出功能。至少檢查 360px 與 768px 寬度，並使用鍵盤走訪互動元件。

## 資料更新

以下資料集中在 `trip-data.js`。

- 行程資料在 `days`。回程交通卡的上車站與方向在 `transportStops`，官方班表在 `busTimetables`。
- 出發前確認項目用 `departureChecks` 分組。勾選狀態依 `checks` 索引保存，新增項目請附在末尾。
- 日期專屬網址採 `#days/YYYY-MM-DD`，舊版 `#days` 仍可打開第一天。
- 景點資料在 `places`。
- 預算預設值在 `defaultBudget`。
- 實用連結在 `resourceData`。
- 外部資料更新時保留「尚未核實」提示，直到已對照官方來源。

## 封面製作

封面以內建 ImageGen 生成，再轉成 1440 × 960 的 WebP。生成提示如下。

> Use case: illustration-story. Asset: landscape cover artwork for a handmade Okinawa travel journal website. Landscape roughly 3:2. Hand-painted warm Japanese travel sketchbook gouache and colored pencil on ivory washi, tactile grain, textured uneven ink marks, confident graphic composition and rich blocks of color. Show a graceful low Kouri Bridge on piers crossing turquoise Okinawa water, a lush distant island, a cream sky with airy clouds, a coral-red hibiscus and dark green leaves in the lower corner. Color palette ocean teal, deep pine, faded sky blue, persimmon coral and warm cream. Keep key landscape landmarks centrally framed so the sides can crop for a phone. Full-bleed artwork suitable for printing as a postcard; no paper props, no borders, no lettering, no numbers, no logo, no watermark.

## 部署

將 `index.html`、`base.css`、`journal.css`、`trip-data.js`、`app.js`、`robots.txt` 與 `assets/` 放在 GitHub Pages 發布分支根目錄。發布後檢查封面、樣式與五張日期卡是否載入，並確認 hash 分頁可直接開啟。
