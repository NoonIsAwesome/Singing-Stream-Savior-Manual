---
title: 安裝、啟動與建立專案
lang: zh-TW
translation_key: getting-started
---

# 安裝、啟動與建立專案

## 解壓縮與啟動

1. 將下載的 ZIP 完整解壓縮到一般資料夾。
2. 開啟最外層的 `Singing Stream Savior.exe`。
3. 外層啟動器會自動尋找內層同名資料夾中的主程式。

請勿只把內層主程式或 DLL 個別移到其他位置。Qt 外掛、WebEngine、FFmpeg、主題及日文讀音字典都必須維持原本的相對位置。

```text
Singing Stream Savior 2.0.0.0/
├─ Singing Stream Savior.exe        ← 平常開啟這個
└─ Singing Stream Savior/
   ├─ Singing Stream Savior.exe     ← 實際主程式
   ├─ DLL 與 Qt 外掛
   ├─ Themes/
   ├─ JapaneseReading/
   └─ yt-dlp/
```

> 不要直接在 ZIP 壓縮檔預覽視窗中執行程式。請先完整解壓縮。

## 建立新專案

1. 開啟「檔案」選單。
2. 選擇「新增專案」。
3. 將歌曲加入歌曲庫或目前專案。
4. 使用「儲存」或「另存新檔」，建立 `.bgmsproj` 檔案。

專案會保存目前歌曲、顯示歌名、待播順序、已唱紀錄、歌詞關聯、主題及相關顯示設定。

## 開啟既有專案

可使用「檔案 > 開啟專案」，或從最近使用的專案清單開啟。若上次執行意外中止，程式可能提示是否復原自動儲存內容。

## 第一次啟動建議

1. 到「設定 > 一般」選擇介面語言。
2. 到「設定 > 檔案與專案」確認專案與媒體資料夾位置。
3. 匯入一首本機音訊，測試伴奏播放器。
4. 建立一個測試待播清單。
5. 到「歌單外觀」確認 Default 主題預覽。
6. 若使用 OBS，再依後續章節加入歌單與歌詞畫面。

## 認識完整模式

完整模式是預設的準備工作區，會依目前分頁顯示完整設定：

- 左側：歌曲資料、歌詞或畫面設定。
- 中央：歌曲表格、歌詞預覽或歌單主題預覽。
- 右側：背景音樂、歌唱伴奏、待播與已唱清單。
- 右上角：完整、精簡與迷你模式切換。

<figure class="manual-figure">
  <a href="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}">
    <img src="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}" alt="完整模式的歌詞分頁，畫面同時顯示歌詞設定、OBS 預覽、播放器及待播清單">
  </a>
  <figcaption>完整模式的歌詞分頁：中央即時預覽與 OBS 輸出相同，右側播放控制與待播清單仍可同時操作。</figcaption>
</figure>

準備直播時建議先使用完整模式；完成歌曲、主題與歌詞設定後，再視需要切換成精簡或迷你模式。

## 儲存與關閉

視窗標題出現 `*` 代表專案有尚未儲存的變更。切換模式、播放音訊或打開獨立歌詞視窗不會清除目前專案狀態。

[上一頁：說明書首頁](README.md) · [下一頁：歌曲庫、歌單與播放器](library-and-playback.md)
