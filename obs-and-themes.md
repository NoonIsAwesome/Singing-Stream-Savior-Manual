---
title: 歌單外觀、歌詞畫面與 OBS
lang: zh-TW
translation_key: obs-and-themes
---

# 歌單外觀、歌詞畫面與 OBS

<figure class="manual-figure">
  <a href="{{ '/assets/images/theme-workspace.png' | relative_url }}">
    <img src="{{ '/assets/images/theme-workspace.png' | relative_url }}" alt="歌單外觀頁，頂部為主題選擇，中央為 Summer Chime 主題即時預覽">
  </a>
  <figcaption>歌單外觀頁會同時顯示主題卡片、畫面設定、即時預覽與主題指南。</figcaption>
</figure>

## 歌單外觀頁

「歌單外觀」用來選擇 OBS 歌單主題及檢查即時預覽。主題順序會先顯示基本主題，再顯示具完整美術設計的精緻主題。

基本主題包括：

1. Default
2. Transparent Black
3. Transparent White
4. Card
5. CD

其他主題可能支援封面、Reserve、Next On、固定版面、動畫或直向設計。右側「主題指南」會說明目前主題的特性及可調整項目。

### 切換與預覽主題

1. 在上方主題列點選主題卡片。
2. 查看中央預覽中的 Now Singing、Set List 與 Next On／Reserve。
3. 依主題指南調整字型、大小、顏色、待播數量或版面位置。
4. 切換「演唱／已唱／待播／版面配置」檢查不同狀態。
5. 確認後再將「拖曳至 OBS」拖入 OBS。

切換主題只會改變顯示方式，不會修改歌曲、待播順序或已唱紀錄。完整模式最適合比較主題，因為主題列、設定、預覽及指南可以同時顯示。

## 可以設定的項目

左側「畫面設定」分為四個分頁。設定會儲存在目前專案中；實際可調整範圍仍以所選主題右側的「主題指南」為準。

| 分頁 | 影響的 OBS 區域 | 可以調整 |
| --- | --- | --- |
| **演唱** | Now Singing／目前歌曲 | 字型、字體大小、文字顏色、粗體、斜體、底線、靠左／置中／靠右，以及長歌名的跑馬燈速度 |
| **已唱** | Set List／History | 字型、字體大小、文字顏色、是否顯示編號、粗體、斜體、底線、文字對齊，以及清單捲動速度 |
| **待播** | Reserve／Next On | 可與已唱清單分開設定字型、大小、顏色、編號、粗體、斜體、底線與文字對齊 |
| **版面配置** | Now Singing、Set List、Reserve 的標題與內容區 | 啟用專案自訂版面後，可選擇區塊並調整 X、Y、寬度與高度；「恢復主題版面」可回到主題預設值 |

### 主題可能限制部分選項

- 標示為**可調整**的主題會套用程式中的文字與版面設定。
- 標示為**固定設計**的主題會優先保留美術排版，部分字型、顏色、對齊或版面位置可能無法修改。
- 不支援 Reserve 的主題不會顯示待播內容。
- 部分美術主題的 Next On／Reserve 是版面必要元素，待播顯示可能固定開啟。
- 調整前可先查看右側「主題指南」，確認該主題支援哪些功能。

### 待播與時間戳選項

- **在 OBS 顯示待播清單：** 讓支援的主題顯示 Reserve 或 Next On。
- **顯示數量：** 設定 OBS 最多顯示 1–10 首待播歌曲；若主題只提供 Next On，畫面只會顯示下一首。
- **在歌單中顯示時間：** 僅在啟用 OBS WebSocket 後出現。開啟後，支援的 Set List 會在已唱歌曲前顯示直播時間戳；時間不會加在 Reserve 或 Next On 前面。

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
    <a href="{{ '/assets/images/card-theme-cover.png' | relative_url }}">
      <img src="{{ '/assets/images/card-theme-cover.png' | relative_url }}" alt="Card 主題在透明背景上顯示直向歌曲封面卡片與歌名">
    </a>
    <figcaption>Card：以歌曲封面製作直向卡片。</figcaption>
  </figure>
  <figure class="manual-figure">
    <a href="{{ '/assets/images/cd-theme-cover.png' | relative_url }}">
      <img src="{{ '/assets/images/cd-theme-cover.png' | relative_url }}" alt="CD 主題在透明背景上顯示圓形唱片與下方歌名">
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
3. 用滑鼠按住右上方的「拖曳至 OBS」。
4. 將按鈕拖入 OBS 預覽畫面或來源區域。
5. OBS 會建立指向本機 Overlay 的 Browser Source。

「重新載入」可重新掃描主題並更新預覽。

> 「拖曳至 OBS」不需要啟用 OBS WebSocket。WebSocket 是額外的時間戳與連線狀態功能。

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

開啟「在 OBS 顯示待播清單」後，可設定最多顯示幾首歌曲。不同主題的呈現方式不同：

- Reserve：顯示多首待播。
- Next On：只顯示下一首。
- 不支援待播的主題：維持 Now Singing 或 Set List 版面。

待播清單不是播放歌曲的必要條件。它主要用於觀眾點歌或預排接下來要唱的歌曲；若沒有建立待播，仍可在歌曲表格雙擊歌曲直接播放。

## 歌詞畫面

歌詞 Overlay 是選用畫面，與歌單 Overlay 屬於兩個獨立 Browser Source，可分別放置、縮放與顯示。主播也能只使用獨立歌詞視窗而不輸出給觀眾；詳細設定請參考[歌詞章節](lyrics.md)。

[上一頁：歌詞、同步歌詞與日文讀音](lyrics.md) · [下一頁：OBS WebSocket 與直播時間戳](obs-websocket.md)
