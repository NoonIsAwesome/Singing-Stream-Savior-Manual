---
title: 歌單外觀、歌詞畫面與 OBS
lang: zh-TW
translation_key: obs-and-themes
---

# 歌單外觀、歌詞畫面與 OBS

<section class="chapter-quick-start" aria-labelledby="themes-quick-start">
  <div>
    <p class="chapter-quick-start__eyebrow">從預覽到直播畫面</p>
    <h2 id="themes-quick-start">四步把歌單加入 OBS</h2>
    <p class="chapter-quick-start__intro">先在軟體裡確認主題，再加入 OBS；不需要先設定 WebSocket。</p>
    <ol class="chapter-quick-start__steps">
      <li><div><strong>選擇主題</strong><span>開啟「歌單外觀」，在上方主題列點選想使用的樣式。</span></div></li>
      <li><div><strong>查看各種狀態</strong><span>開啟「自動展示」，確認 Now Singing、Set List 與 Next On／Reserve 的配置。</span></div></li>
      <li><div><strong>調整支援項目</strong><span>依右側主題指南調整顏色、字型、透明度或版面；沒有顯示的選項代表該主題不支援。</span></div></li>
      <li><div><strong>加入 OBS</strong><span>按住「拖曳至 OBS」拖進 OBS；若拖曳失敗，單擊同一個按鈕複製來源路徑，再新增 Browser Source。</span></div></li>
    </ol>
    <p class="chapter-quick-start__done"><strong>完成時：</strong>OBS 會顯示透明歌單畫面；之後切歌、加入待播或完成歌曲時會自動更新。</p>
  </div>
  <figure class="manual-figure">
    <a href="assets/images/theme-workspace.png"><img src="assets/images/theme-workspace.png" alt="歌單外觀頁顯示主題卡片、設定與即時預覽"></a>
    <figcaption>先用中央預覽確認主題，再使用「拖曳至 OBS」。</figcaption>
  </figure>
</section>

## 歌單外觀頁

「歌單外觀」用來選擇 OBS 歌單主題及檢查即時預覽。主題順序會先顯示基本主題，再顯示具完整美術設計的精緻主題。

基本主題包括：

1. Default
2. Transparent Black
3. Transparent White
4. Transparent Black v2
5. Transparent White v2
6. Card
7. CD
8. Signal Line
9. Stage Caption

其他主題可能支援封面、Reserve、Next On、固定版面、動畫或直向設計。右側「主題指南」會說明目前主題的特性及可調整項目。

### 切換與預覽主題

切換主題只會改變顯示方式，不會修改歌曲、待播順序或已唱紀錄。完整模式最適合比較主題，因為主題列、設定、預覽及指南可以同時顯示。

自動展示使用內建假資料，會自行循環，不需要實際播放伴奏或逐一按按鈕。它也不會把展示歌曲寫入目前專案、已唱紀錄、待播清單或 OBS；關閉展示後會立即回到真實狀態。

### 從即時預覽到 OBS 實際畫面

程式內的即時預覽用來確認主題結構與內容；加入 OBS 後，透明主題會直接疊在直播背景上。歌單與歌詞是兩個獨立來源，因此可以分別安排大小及位置。

<div class="figure-grid">
  <figure class="manual-figure">
    <a href="assets/images/demo-theme-preview.png">
      <img src="assets/images/demo-theme-preview.png" alt="在歌單外觀頁選擇 Transparent Black v2 並檢查即時預覽" loading="lazy" decoding="async">
    </a>
    <figcaption>軟體內：自動展示會以長歌單與時間戳，呈現 Now Singing、Set List 與 Next On 的實際配置。</figcaption>
  </figure>
  <figure class="manual-figure">
    <a href="assets/images/demo-obs-result.png">
      <img src="assets/images/demo-obs-result.png" alt="OBS 將 Transparent Black v2 歌單和同步歌詞疊在直播背景上" loading="lazy" decoding="async">
    </a>
    <figcaption>OBS 中：歌單與歌詞可各自縮放、裁切和移動，搭配自己的直播背景。</figcaption>
  </figure>
</div>

## 可以設定的項目

左側「畫面設定」會把「版面配置」放在最左邊，之後才是演唱、已唱與待播。設定會儲存在目前專案中；軟體只會顯示目前主題可以調整的分頁與控制項。

| 分頁 | 影響的 OBS 區域 | 可以調整 |
| --- | --- | --- |
| **版面配置** | 主題整體外觀或各文字區域 | 依主題支援項目顯示主題顏色、背景透明度或自訂區塊位置；「恢復主題預設值／版面」可回到原始設計 |
| **演唱** | Now Singing／目前歌曲 | 字型、字體大小、文字顏色、粗體、斜體、底線、靠左／置中／靠右，以及長歌名的跑馬燈速度 |
| **已唱** | Set List／History | 字型、字體大小、文字顏色、是否顯示編號、粗體、斜體、底線、文字對齊，以及清單捲動速度 |
| **待播** | Reserve／Next On | 可與已唱清單分開設定字型、大小、顏色、編號、粗體、斜體、底線與文字對齊 |

### 主題可能限制部分選項

- 標示為**可調整**的主題只會顯示它宣告支援的控制項。
- 標示為**固定設計**的主題會隱藏不適用的字型、顏色、對齊與版面設定，避免使用者誤以為按鈕故障。
- Default 支援最多文字與區塊設定；舊版 Transparent Black／White 支援演唱與已唱的字型、大小、顏色、樣式及對齊。
- Transparent Black／White v2 支援主題顏色與背景透明度；Signal Line 與 Stage Caption 也支援主題顏色、背景透明度與指定區域的字型選擇。
- 不支援 Reserve 的主題不會顯示待播內容。
- 部分美術主題的 Next On／Reserve 是版面必要元素，待播顯示可能固定開啟。
- 調整前可先查看右側「主題指南」，確認該主題支援哪些功能。

### 待播與時間戳選項

- **在 OBS 顯示待播清單：** 讓支援的主題顯示 Reserve 或 Next On。
- **顯示數量：** 可選「只顯示下一首」或顯示 2、3、5、10 首；若主題本身只提供 Next On，無論選擇多少都只會顯示下一首。
- **在歌單中顯示時間：** 僅在啟用 OBS WebSocket 後出現。開啟後，支援的 Set List 會在已唱歌曲前顯示直播時間戳；時間不會加在 Reserve 或 Next On 前面。

<figure class="manual-figure manual-figure--compact">
  <a href="assets/images/reserve-display-setting.png">
    <img src="assets/images/reserve-display-setting.png" alt="歌單外觀頁的在 OBS 顯示待播清單開關與只顯示下一首選項" loading="lazy" decoding="async">
  </a>
  <figcaption>先開啟「在 OBS 顯示待播清單」，再從右側選單決定只顯示下一首，或最多顯示 2、3、5、10 首。</figcaption>
</figure>

### 即時預覽工具

- **背景：** 可切換透明格、深色、淺色、自訂顏色或自訂圖片。
- **圖片模式：** 使用自訂圖片時，可選擇符合、填滿或拉伸。
- **調整預覽：** 可拖曳預覽來源及角落控制點，暫時改變程式中的檢查大小與位置。
- **重設：** 將預覽來源恢復到 100% 與預設位置。

預覽背景、圖片及「調整預覽」都只用於程式內檢查，不會改變 OBS 的透明輸出，也不會改寫主題的實際版面。預覽右上角的 `OBS · 1920 × 1080 · 16:9` 表示主題的 OBS 設計畫布；百分比則是目前程式內的預覽縮放。

## Card 與 CD：封面效果

封面不是必填資料。Card 與 CD 是兩個會特別利用歌曲封面的基本主題：

- **Card：** 把封面放入直向卡片，並在卡片下方顯示歌曲名稱。
- **CD：** 將封面裁成唱片視覺，歌曲名稱顯示在下方標籤。

未設定封面時仍可播放歌曲及使用其他主題；只有想使用這兩種歌曲專屬效果時，才需要另外整理封面。

<div class="figure-grid">
  <figure class="manual-figure">
    <a href="assets/images/card-theme-cover.png">
      <img src="assets/images/card-theme-cover.png" alt="Card 主題在透明背景上顯示直向歌曲封面卡片與歌名">
    </a>
    <figcaption>Card：以歌曲封面製作直向卡片。</figcaption>
  </figure>
  <figure class="manual-figure">
    <a href="assets/images/cd-theme-cover.png">
      <img src="assets/images/cd-theme-cover.png" alt="CD 主題在透明背景上顯示圓形唱片與下方歌名">
    </a>
    <figcaption>CD：將歌曲封面轉為圓形唱片視覺。</figcaption>
  </figure>
</div>

## 預覽背景

Default 主題預設使用白色預覽背景；透明主題與精緻主題可使用透明格，方便判斷半透明與留白效果。

預覽背景只影響程式內檢查，不會輸出到 OBS。

## 將歌單加入 OBS

1. 在「歌單外觀」選擇主題。
2. 確認預覽中的 Now Singing、Set List、Reserve 或 Next On。
3. 選擇其中一種方式：按住右上方的「拖曳至 OBS」並拖入 OBS；或單擊按鈕複製瀏覽器來源路徑。
4. 若使用拖曳，OBS 會直接建立指向本機 Overlay 的 Browser Source。
5. 若使用複製路徑，請在 OBS 新增瀏覽器來源，將路徑貼到網址欄並設定為 1920 × 1080；不必勾選「本機檔案」。

「重新載入」可重新掃描主題並更新預覽。

> 拖曳與複製路徑都不需要啟用 OBS WebSocket。WebSocket 是額外的時間戳與連線狀態功能。若 OBS 在串流中不接受拖入來源，請改用單擊複製路徑的方式。

## 在 OBS 中自由擺放與裁切

主題的設計畫布不會限制 OBS 中的使用方式。加入 Browser Source 後，可以依自己的直播版面自由縮放、裁切及定位，只保留想顯示的區域，再和自製背景、聊天室或其他來源搭配。

- **Default：** 適合當作可自由組合的基礎版面。可以參考預覽中的虛線文字區域，在 OBS 沿虛線裁切 Now Singing、Set List 等需要的區塊，再放到自製背景的合適位置。
- **透明與精緻主題：** 可保留完整構圖，也可以依直播畫面裁切其中一部分；是否保留裝飾、Reserve 或 Next On，由使用者自行決定。
- **尺寸與位置：** 如果比例或位置不理想，直接使用 OBS 的 Transform、縮放與裁切調整即可，不必符合固定的 Browser Source 尺寸。
- **透明背景：** 主題背景透明是正常現象，請在 OBS 中疊到實際直播背景上確認最終效果。

裁切只會改變 OBS 場景中這個來源的顯示範圍，不會修改歌回救星內的主題或歌曲資料。

## Set List 與長歌名

各官方主題會依版面使用跑馬燈、換行、分頁或縮排處理長歌名。切換主題不會修改歌曲資料、已唱紀錄或待播順序。

## Reserve 與 Next On

開啟「在 OBS 顯示待播清單」後，可設定最多顯示幾首歌曲。這只改變 OBS Overlay 的呈現數量，不會刪除、複製或改變軟體內的待播順序。不同主題的呈現方式如下：

- **Next On：** 選擇「只顯示下一首」時，只取待播清單第一首；標題會顯示 Next On。
- **Reserve：** 選擇 2、3、5 或 10 首時，最多顯示對應數量；待播較少時只顯示實際存在的歌曲。
- 不支援待播的主題：維持 Now Singing 或 Set List 版面。

待播清單不是播放歌曲的必要條件。它主要用於觀眾點歌或預排接下來要唱的歌曲；若沒有建立待播，仍可在歌曲表格雙擊歌曲直接播放。

<div class="feature-shot-grid">
  <figure class="manual-figure">
    <a href="assets/images/reserve-overlay-next.png">
      <img src="assets/images/reserve-overlay-next.png" alt="OBS 歌單 Overlay 以 Next On 顯示第一首待播歌曲" loading="lazy" decoding="async">
    </a>
    <figcaption>只顯示下一首：OBS 使用 Next On，只呈現待播清單第一首。</figcaption>
  </figure>
  <figure class="manual-figure">
    <a href="assets/images/reserve-overlay-multiple.png">
      <img src="assets/images/reserve-overlay-multiple.png" alt="OBS 歌單 Overlay 以 Reserve 顯示多首待播歌曲" loading="lazy" decoding="async">
    </a>
    <figcaption>顯示多首：OBS 使用 Reserve，依設定上限列出待播歌曲。</figcaption>
  </figure>
</div>

## 歌詞畫面

歌詞 Overlay 是選用畫面，與歌單 Overlay 屬於兩個獨立 Browser Source，可分別放置、縮放與顯示。主播也能只使用獨立歌詞視窗而不輸出給觀眾；詳細設定請參考[歌詞章節](lyrics.md)。

[上一頁：歌詞、同步歌詞與日韓讀音](lyrics.md) · [下一頁：直播時間戳擷取](obs-websocket.md)
