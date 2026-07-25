---
title: 設定、備份與疑難排解
---

# 設定、備份與疑難排解

## 設定分類

### 一般

- 介面語言與一般應用程式偏好。

### 檔案與專案

- 預設專案資料夾。
- 收集專案媒體的輸出位置。
- YouTube 音訊下載位置。
- 開啟資料夾或恢復預設路徑。

變更預設路徑不會自動搬移既有檔案。

### YouTube

可選擇下載格式：

- 原始相容格式：保留來源品質並減少不必要轉碼。
- MP3：方便一般播放器使用，但會再次有損壓縮。
- WAV：適合後續編輯，但檔案較大，也無法恢復 YouTube 已失去的音質。

### 進階設定

包含測試中的 OBS WebSocket 功能說明、OBS 端啟用步驟、主機、連接埠、密碼及「連線」按鈕。這項設定主要用於直播時間戳，並非使用歌單或歌詞 Overlay 的必要條件。

## 專案與媒體備份

`.bgmsproj` 保存專案資料，但本機音訊原檔仍可能位於其他資料夾。要搬到另一台電腦前，建議：

1. 儲存專案。
2. 使用收集專案媒體功能，將相關本機檔案集中到指定資料夾。
3. 備份 `.bgmsproj`、收集後的媒體及自行匯入的歌詞。
4. 在新電腦保持相對位置，或重新連結缺少的檔案。

## 程式無法啟動：Qt platform plugin

若看到「no Qt platform plugin could be initialized」：

<figure class="manual-figure manual-figure--small">
  <a href="{{ '/assets/images/qt-platform-error.png' | relative_url }}">
    <img src="{{ '/assets/images/qt-platform-error.png' | relative_url }}" alt="Singing Stream Savior 無法初始化 Qt platform plugin 的錯誤視窗">
  </a>
  <figcaption>這通常代表主程式和 Qt 外掛被分開、資料夾不完整，或直接從 ZIP 內啟動。</figcaption>
</figure>

1. 確認 ZIP 已完整解壓縮。
2. 從最外層 `Singing Stream Savior.exe` 啟動。
3. 確認內層資料夾仍名為 `Singing Stream Savior`。
4. 確認內層存在 `platforms/qwindows.dll`。
5. 不要只複製主程式 EXE 到桌面；需要捷徑時，請建立外層啟動器的 Windows 捷徑。

## YouTube 無法解析或播放

- 確認網路連線。
- 確認連結是有效的 YouTube 影片或播放清單。
- 稍候後重試；YouTube 端變更可能暫時影響解析。
- 確認 `yt-dlp/ytdlp_helper.exe` 仍在程式資料夾中。

## 找不到歌詞

- 確認歌曲顯示歌名與歌手拼寫。
- 搜尋時可改用較短的關鍵字。
- 優先選擇標示為同步歌詞、且長度接近伴奏的結果。
- 若線上沒有合適版本，可匯入本機 LRC、SRT、VTT 或純文字。

## 歌詞時間不準

- 使用歌詞偏移進行 ±100 毫秒微調。
- 確認選到的歌詞版本長度接近伴奏。
- 現場版、剪輯版、升降 Key 版或前奏長度不同時，可能需要另外校正。

## 日文讀音不符合原曲

自動讀音無法完全理解所有人名、熟字訓、特殊語氣及歌手唱法。這不是歌詞時間錯誤，可關閉讀音或將它視為閱讀提示。

## OBS 畫面沒有更新

1. 在程式確認目前歌曲、待播或歌詞已更新。
2. 按「重新載入」更新程式內預覽。
3. 在 OBS 對 Browser Source 執行重新整理。
4. 確認 Browser Source 指向目前版本程式資料夾產生的本機頁面。
5. 若只是 WebSocket 紅燈，歌單 Overlay 仍可運作；WebSocket 主要影響直播時間戳。

## 安全更新

安裝新版本時，建議：

1. 關閉舊版程式。
2. 將新版解壓縮到新的版本資料夾。
3. 不要直接混合覆蓋舊版 DLL。
4. 使用新版開啟原 `.bgmsproj`。
5. 確認歌曲、歌詞與 OBS 畫面後，再移除舊版程式資料夾。

[上一頁：完整、精簡與迷你模式](workspace-modes.md) · [回到說明書首頁](README.md)
