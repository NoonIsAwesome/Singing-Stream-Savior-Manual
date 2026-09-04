---
title: 設定、備份與疑難排解
lang: zh-TW
translation_key: settings-and-troubleshooting
---

# 設定、備份與疑難排解

<section class="chapter-quick-start chapter-quick-start--single" aria-labelledby="settings-quick-links">
  <div>
    <p class="chapter-quick-start__eyebrow">直接前往需要的答案</p>
    <h2 id="settings-quick-links">你現在想處理什麼？</h2>
    <p class="chapter-quick-start__intro">先選最接近的項目；每一段都從可以立即檢查的步驟開始。</p>
    <div class="quick-task-links">
      <a href="#files-and-projects"><strong>修改資料夾或下載格式</strong><span>專案、媒體、YouTube 與 UVR 輸出位置</span></a>
      <a href="#project-backup"><strong>備份或搬移專案</strong><span>一起保存 .bgmsproj、音訊與歌詞</span></a>
      <a href="#startup-error"><strong>程式無法啟動</strong><span>處理 Qt platform plugin 或解壓縮問題</span></a>
      <a href="#youtube-troubleshooting"><strong>YouTube 無法播放</strong><span>檢查網路、連結與必要檔案</span></a>
      <a href="#lyrics-troubleshooting"><strong>歌詞找不到或不同步</strong><span>搜尋、匯入與時間校正</span></a>
      <a href="#obs-troubleshooting"><strong>OBS 畫面沒有更新</strong><span>重新載入預覽與 Browser Source</span></a>
      <a href="#antivirus-false-positive"><strong>防毒軟體顯示警告</strong><span>核對官方來源與 SHA-256</span></a>
      <a href="#safe-update"><strong>更新或啟動器問題</strong><span>安全取消、修復與重新下載</span></a>
    </div>
  </div>
</section>

## 設定分類

### 一般

- 介面語言與一般應用程式偏好。

### 檔案與專案 {#files-and-projects}

- 預設專案資料夾。
- 收集專案媒體的輸出位置。
- YouTube 音訊下載位置。
- YouTube 音訊下載格式（從 2.1.0.0 起由原本的獨立區塊移入此頁）。
- 開啟資料夾或恢復預設路徑。

變更預設路徑不會自動搬移既有檔案。

### YouTube 下載格式（位於「檔案與專案」）

可選擇下載格式：

- 原始相容格式：保留來源品質並減少不必要轉碼。
- MP3：方便一般播放器使用，但會再次有損壓縮。
- WAV：適合後續編輯，但檔案較大，也無法恢復 YouTube 已失去的音質。

### 直播時間戳

包含 OBS WebSocket 功能說明、OBS 端啟用步驟、主機、連接埠、密碼及「連線」按鈕。這項設定主要用於直播時間戳，並非使用歌單或歌詞 Overlay 的必要條件。OBS 密碼屬於本機連線憑證，請勿公開分享包含密碼的設定畫面。

## 專案與媒體備份 {#project-backup}

`.bgmsproj` 保存專案資料，但本機音訊原檔仍可能位於其他資料夾。要搬到另一台電腦前，建議：

1. 儲存專案。
2. 使用收集專案媒體功能，將相關本機檔案集中到指定資料夾。
3. 備份 `.bgmsproj`、收集後的媒體及自行匯入的歌詞。
4. 在新電腦保持相對位置，或重新連結缺少的檔案。

## 程式無法啟動：Qt platform plugin {#startup-error}

若看到「no Qt platform plugin could be initialized」：

<figure class="manual-figure manual-figure--small">
  <a href="assets/images/qt-platform-error.png">
    <img src="assets/images/qt-platform-error.png" alt="Singing Stream Savior 無法初始化 Qt platform plugin 的錯誤視窗">
  </a>
  <figcaption>這通常代表主程式和 Qt 外掛被分開、資料夾不完整，或直接從 ZIP 內啟動。</figcaption>
</figure>

1. 確認 ZIP 已完整解壓縮。
2. 從最外層 `Singing Stream Savior.exe` 啟動。
3. 不需要進入其他資料夾或嘗試開啟裡面的程式。
4. 如果仍然無法啟動，請刪除這份不完整的解壓縮結果，重新下載 ZIP 並再次完整解壓縮。
5. 需要桌面捷徑時，請替最外層的 `Singing Stream Savior.exe` 建立 Windows 捷徑，不要直接移動檔案。

## YouTube 無法解析或播放 {#youtube-troubleshooting}

- 確認網路連線。
- 確認連結是有效的 YouTube 影片或播放清單。
- 稍候後重試；YouTube 端變更可能暫時影響解析。
- 確認 `yt-dlp/ytdlp_helper.exe` 仍在程式資料夾中。

## 找不到歌詞 {#lyrics-troubleshooting}

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

## OBS 畫面沒有更新 {#obs-troubleshooting}

1. 在程式確認目前歌曲、待播或歌詞已更新。
2. 按「重新載入」更新程式內預覽。
3. 在 OBS 對 Browser Source 執行重新整理。
4. 確認 Browser Source 指向目前版本程式資料夾產生的本機頁面。
5. 若只是 WebSocket 紅燈，歌單 Overlay 仍可運作；WebSocket 主要影響直播時間戳。

## 防毒軟體警告與疑似誤判 {#antivirus-false-positive}

歌回救星目前由個人獨立開發，Windows 執行檔尚未提供可信任的程式碼簽章。部分防毒軟體可能因此依照啟發式特徵顯示警告；這不代表每一個警告都是惡意程式，但也不能反過來假設所有警告都是誤報。

啟發式警告的名稱本身不能證明檔案安全或不安全。看到警告時，請先核對下載來源、版本、檔名與 SHA-256；不要為了開啟程式而直接關閉防毒。

<div class="security-report-grid">
  <figure class="manual-figure">
    <a href="assets/images/security/kaspersky-app-heuristic-redacted.png">
      <img src="assets/images/security/kaspersky-app-heuristic-redacted.png" alt="Kaspersky 對 Singing Stream Savior 顯示啟發式警告">
    </a>
    <figcaption>防毒軟體可能使用通用的啟發式名稱顯示警告；請依下方步驟確認檔案來源與完整性。</figcaption>
  </figure>
</div>

看到警告時，建議依序確認：

1. 不要關閉防毒，也不要直接把整個程式資料夾加入白名單。
2. 確認 ZIP 只來自本說明網站或官方 GitHub Release。
3. 比對下載頁公布的版本、檔名與 ZIP SHA-256。
4. 若來源或雜湊不同，請停止執行並刪除檔案。
5. 若來源與雜湊相符，仍可先保留警告畫面、偵測名稱與 SHA-256，回報給開發者確認；如果仍有疑慮，請先不要下載或執行，等待未來提供可信任簽章的版本。

## 安全更新 {#safe-update}

平常從最外層的 `Singing Stream Savior.exe` 啟動時，Launcher 1.2 會先檢查更新。**沒有新版本時不會停在提示頁**，檢查完成便自動開啟目前安裝的主程式；離線或尚未到下一次檢查時間時，也會使用已驗證的目前版本，不必等待網路。

有新版本時，卡片式畫面會列出目前版本、目標版本與本次更新內容。按「稍後」或關閉這個詢問畫面，會直接開啟目前版本，不會改動檔案；按「立即更新」才會下載。

<figure class="manual-figure"><a href="assets/images/launcher-update-prompt.png"><img src="assets/images/launcher-update-prompt.png" alt="Launcher 1.2 卡片式更新提示，顯示版本與更新內容"></a><figcaption>更新內容在可捲動的卡片區顯示；「稍後」保留目前版本，「立即更新」才開始下載。</figcaption></figure>

下載期間可以按「取消」或關閉視窗，繼續使用目前版本。進入最後的安裝階段後，關閉操作會暫時停用，完成後再啟動新版；如果更新途中意外中斷，下次啟動時會先自動修復或完成更新。

<figure class="manual-figure"><a href="assets/images/launcher-update-progress.png"><img src="assets/images/launcher-update-progress.png" alt="Launcher 1.2 下載、驗證與安裝更新的進度畫面"></a><figcaption>啟動器會先確認下載完整，再安全切換到新版本。</figcaption></figure>

請保留最外層的 `Singing Stream Savior.exe` 與程式資料夾內其他檔案的原有位置，不要只移動其中一部分。若必須退回舊版，請把官方舊版完整 ZIP 解壓到**另一個資料夾**，先備份 `.bgmsproj` 與媒體再測試；不要用舊版直接覆蓋新版資料夾。

若啟動器提示需要較新的啟動器，或自動更新仍無法完成，請改從本說明網站下載最新版完整 ZIP，解壓縮到新的資料夾，再用新版開啟原本的 `.bgmsproj`。不要混合覆蓋不同版本的程式檔案。

[上一頁：完整、精簡與迷你模式](workspace-modes.md) · [回到說明書首頁](README.md)
