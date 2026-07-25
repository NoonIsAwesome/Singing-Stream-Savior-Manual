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

歌詞 Overlay 與歌單 Overlay 是兩個獨立 Browser Source。可分別放置、縮放與顯示，歌詞畫面的設定請參考[歌詞章節](lyrics.md)。

[上一頁：歌詞、同步歌詞與日文讀音](lyrics.md) · [下一頁：OBS WebSocket 與直播時間戳](obs-websocket.md)
