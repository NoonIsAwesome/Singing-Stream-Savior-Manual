# Two website counters, separate GitHub downloads

## 指標與範圍

只使用兩個 Counter：全站瀏覽、官網下載點擊。不拆頁面或語言，不重設既有總瀏覽。
GitHub Release 的完整 ZIP、主程式 EXE、Launcher 和更新資產仍使用 GitHub download_count，
不另建檔案下載 Counter，不把三種指標相加當成人數。

- 全站瀏覽：原本 `_data/analytics.json` 與 `site-analytics.js` 保持不變且持續啟用。
- 官網下載點擊：`_data/download_clicks.json` 指定獨立 Counter；尚未建立／验证前維持 `enabled: false`。
- 點擊統計只包含官網上直接指向本專案 GitHub Release 完整安裝 ZIP 的連結。
  首頁「下載」若只帶到 resources.html，屬導覽，不計下載；在下載頁按下完整 ZIP 連結才計一次。
  教學、主題、Runtime、EXE、LGPL 包、Release 說明頁，以及 GitHub 外部點擊均不計入。

## 建立第二個 Counter

使用現有 workspace `noonisawesome-singing-stream-savior-manual`，不必另建工作區。
建議 Counter Name：`Singing Stream Savior Download Clicks`。
Slug：`noonisawesome-s3s-manual-download-clicks`。
建立完成後確認匿名讀取、CORS 及一次已記錄的測試累加，再啟用 download_clicks.json。
未取得服務資料是 null／未啟用，不能顯示為 0，也不會把點擊送往原有 pageviews Counter。
所有設定只存公開識別名稱，不存私密 API Key、token 或密碼。

## 查看方式

更新本機 Manual 專案後執行 `查看網站統計.cmd`，列出全站瀏覽、官網下載點擊與 GitHub 下載。
`查看網站統計.cmd -AnalyticsOnly` 只讀兩個網站 Counter；`-ConfigurationOnly` 不連線 CounterAPI。
新 Counter 未啟用時可使用 `-Probe` 唯讀探測。所有統計腳本只 GET，不會累加／扣除／重設。
也可單獨執行 `powershell.exe -NoLogo -NoProfile -File scripts/get-download-clicks.ps1 -Probe`。
公開工作區並非私有存取控制；知道 API 端點的人仍能自行查詢。

## 不影響下載、不顯示數字

JavaScript 以事件委派處理滑鼠左鍵、鍵盤啟動、Ctrl/Command 新分頁和中鍵連結啟動。
只計可信任的事件，不計 JavaScript 模擬事件、右鍵、已取消事件，以及同一次雙擊的第二下。
重複初始化不會重複綁定；後續真正再次點擊仍屬另一事件。
不呼叫 preventDefault，不改 href，不等待計數器回應才下載。逾時或失敗不重試。
只使用正式 HTTPS 主機和 Manual 路徑，尊重 DNT/GPC/analytics=off，排除 webdriver。
阻擋器、網路中斷、離開頁面、複製網址或右鍵選單開啟都可能少計，不能視為成功下載人數。
不新增公開數字、統計面板、通知或第三方 JavaScript。維護腳本排除在 Pages 發布之外。

## 驗證

`node --test scripts/test-download-clicks.mjs scripts/test-download-config.mjs`
`node scripts/validate-download-clicks.mjs _site`
`powershell.exe -NoLogo -NoProfile -File scripts/test-download-clicks.ps1`

離線測試不會下載資產或修改真實 Counter。CI 只輸出外部服務狀態，不公開流量總數。
HTTP 200 只代表 API 接受；V2 有緩衝，持久化需稍後以唯讀 GET 確認。
官方端點及緩衝說明：https://docs.counterapi.dev/api/endpoints/v2/
