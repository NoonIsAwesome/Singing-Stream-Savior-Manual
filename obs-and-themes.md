---
title: 歌單外觀、歌詞畫面與 OBS
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

## OBS Browser Source 建議

- 建議畫布：1920 × 1080。
- 不要在 Browser Source 內另外裁掉主題需要的區域。
- 若主題顯示比例不正確，先確認 OBS 畫布尺寸及來源 Transform。
- 主題背景透明是正常現象；請在 OBS 中疊到實際直播背景上檢查。

## Set List 與長歌名

各官方主題會依版面使用跑馬燈、換行、分頁或縮排處理長歌名。切換主題不會修改歌曲資料、已唱紀錄或待播順序。

## Reserve 與 Next On

開啟「在 OBS 顯示待播清單」後，可設定最多顯示幾首歌曲。不同主題的呈現方式不同：

- Reserve：顯示多首待播。
- Next On：只顯示下一首。
- 不支援待播的主題：維持 Now Singing 或 Set List 版面。

## 歌詞畫面

歌詞 Overlay 是選用畫面，與歌單 Overlay 屬於兩個獨立 Browser Source，可分別放置、縮放與顯示。主播也能只使用獨立歌詞視窗而不輸出給觀眾；詳細設定請參考[歌詞章節](lyrics.md)。

[上一頁：歌詞、同步歌詞與日文讀音](lyrics.md) · [下一頁：OBS WebSocket 與直播時間戳](obs-websocket.md)
