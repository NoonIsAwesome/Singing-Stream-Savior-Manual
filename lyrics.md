---
title: 歌詞、同步歌詞與日文讀音
lang: zh-TW
translation_key: lyrics
---

# 歌詞、同步歌詞與日文讀音

歌詞是選用功能，不設定歌詞也能正常播放伴奏。設定歌詞後有兩種主要用途：

1. 主播可開啟獨立的「歌詞視窗」，移到最容易閱讀的位置。
2. 可將歌詞 Overlay 拖曳到 OBS，讓觀眾看到同步歌詞。

## 支援的歌詞

程式支援同步與非同步歌詞，包括：

- LRC
- SRT
- VTT
- 純文字歌詞
- YouTube CC 或自動產生字幕
- LRCLIB 線上歌詞

有時間標記的歌詞可跟隨伴奏進度，自動捲動並醒目顯示目前句。

## 使用「管理歌詞」

在歌曲的「歌詞」頁按「管理歌詞…」，或直接點選歌曲列表中該歌曲「歌詞」欄的圖示，都可以開啟管理歌詞視窗。你可以在這裡：

- 搜尋 YouTube 字幕與 LRCLIB。
- 匯入本機 LRC 或其他支援格式。
- 取消目前歌曲的歌詞關聯。

線上搜尋最多顯示 50 筆結果，並優先排列同步歌詞；若伴奏長度已知，與伴奏長度較接近的結果會排在前面。

選取搜尋結果後，待預覽載入完成即可直接按「附加歌詞」，不需要先按另一個採用按鈕。

<figure class="manual-figure manual-figure--medium">
  <a href="{{ '/assets/images/lyrics-manager.png' | relative_url }}">
    <img src="{{ '/assets/images/lyrics-manager.png' | relative_url }}" alt="管理歌詞視窗，左側為歌詞預覽，右側為線上搜尋結果">
  </a>
  <figcaption>尚未附加歌詞時，可在右側搜尋同步歌詞並於左側確認內容。</figcaption>
</figure>

### 匯入 LRC 與取消歌詞連結

- **選擇 LRC 檔案：** 從電腦匯入自行準備的 LRC、SRT、VTT 或純文字歌詞。
- **取消歌詞連結：** 移除目前歌曲與歌詞檔的關聯，不會刪除原始音訊。
- **附加歌詞：** 選取並預覽線上結果後，將該份歌詞連結到歌曲。

當歌曲已經附加歌詞時，管理視窗會明確顯示目前狀態，並提供「取消歌詞連結」。因此不需要回到主畫面尋找重複功能。

<figure class="manual-figure manual-figure--medium">
  <a href="{{ '/assets/images/lyrics-manager-linked.png' | relative_url }}">
    <img src="{{ '/assets/images/lyrics-manager-linked.png' | relative_url }}" alt="已有歌詞的管理歌詞視窗，左下角提供選擇 LRC 檔案與取消歌詞連結">
  </a>
  <figcaption>已有歌詞時，左下角可重新匯入檔案或取消目前的歌詞連結。</figcaption>
</figure>

## 自動搜尋

若已啟用自動搜尋，播放沒有歌詞的歌曲時，程式會先檢查 YouTube 字幕，再尋找其他可用來源，最後讓使用者確認是否附加，不會在未確認時直接覆蓋既有歌詞。

## 歌詞預覽與 OBS

歌詞頁的即時預覽使用與 OBS 相同的版面、字型、顏色與日文讀音設定，用來確認 OBS 實際顯示效果。

「歌詞視窗」則是可自由移動的獨立視窗，適合放到主播容易閱讀的位置。它擁有自己的日文讀音選項，不必和 OBS 使用相同設定。

如果只需要自己看歌詞，不必把歌詞 Overlay 加入 OBS；如果只想讓觀眾看，也可以維持歌詞視窗關閉。

## 日文讀音

讀音選項包括：

- **關閉**：只顯示原始歌詞。
- **平假名注音**：以較小的平假名標示漢字讀音。
- **羅馬拼音**：在原始歌詞下方顯示分詞後的羅馬拼音。

「即時預覽 + OBS」共用一組設定；「歌詞視窗」使用另一組設定。

程式會先判斷歌詞是否適合日文讀音處理，避免對一般中文或英文歌詞產生不必要的羅馬拼音。

> **讀音僅供參考：** 自動讀音依離線字典與斷詞結果產生。人名、特殊讀法、歌詞省略、外來語及歌手刻意改變的唱法，可能與原曲不同。

<figure class="manual-figure">
  <a href="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}">
    <img src="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}" alt="最新版完整模式的歌詞設定、歌詞視窗按鈕與 OBS 即時預覽">
  </a>
  <figcaption>歌詞頁可選擇日文讀音、開啟「歌詞視窗」，並以和 OBS 相同的版面顯示即時預覽；選擇羅馬拼音時，讀音會顯示在原文下方。</figcaption>
</figure>

## 時間校正

若歌詞比伴奏提早或延後，可使用歌詞偏移：

- `-100 毫秒`：讓歌詞更早出現。
- `+100 毫秒`：讓歌詞更晚出現。
- 「重設」：回到 0 毫秒。

建議從副歌或節奏清楚的段落測試，再逐步微調。

## 將歌詞加入 OBS

1. 到歌曲的「歌詞」頁。
2. 確認 OBS 版面、字型、大小、顏色與讀音。
3. 用滑鼠按住「拖曳至 OBS」。
4. 將按鈕拖入 OBS 預覽或來源區域。

[上一頁：歌曲庫、歌單與播放器](library-and-playback.md) · [下一頁：歌單外觀、歌詞畫面與 OBS](obs-and-themes.md)
