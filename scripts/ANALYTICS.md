# 官網瀏覽計數：CounterAPI V2

官網保留 CounterAPI，不使用 Cloudflare。唯一設定是 `_data/analytics.json`，
前端與 `查看網站統計.cmd` 共用。這是頁面瀏覽次數，不是不重複訪客或軟體活躍人數。

## 先確認服務，再啟用

目前 `enabled: false`。設定中的 `noonisawesome-singing-stream-savior-manual/pageviews`
沿用舊計數器名稱作為候選，**不代表此 V2 workspace 已註冊或可用**。
V1 namespace 不會因網址改成 V2 就自動變成你的 workspace，也不會自動回填歷史。

1. 登入自己的 CounterAPI 帳號，在後台確認／建立 V2 workspace 與 counter。
   使用後台實際顯示的 slug（不是顯示標題）。可以保留上述名稱，若不可用則填實際名稱。
2. 此 GitHub Pages 整合只支援可匿名讀取與累加的公開 counter；不要在 JSON、HTML、
   JavaScript、Git 或聊天貼上私密 API Key/token。若實際端點回傳 401/403，先檢查公開權限。
   若帳號方案要求所有寫入都授權，需另行設計伺服器代理；不能把私人金鑰放在靜態頁面。
3. 先執行唯讀檢查（即使 enabled 為 false 也可探測，不會改變 counter）：

   ```powershell
   powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\scripts\get-site-analytics.ps1 -Probe
   ```

4. 讀取確認可用後，把 `enabled` 改成 `true`，提交、通過測試並部署到 GitHub Pages。
   共用 layout 已涵蓋各語言的正常頁面，不要再手動貼第二份計數程式。
5. 正式環境以一次一般瀏覽確認 `/up` 的 CORS 回應及 `data-analytics-state="accepted"`，
   稍後用唯讀 GET 核對計數。驗收瀏覽也會算一次，請記錄測試量，不用 reset/down 擅自改數值。
   `accepted` 只代表 API 接受回應；V2 有緩衝，不保證立即讀到 +1 或已永久保存。

官方端點：https://docs.counterapi.dev/api/endpoints/v2/
官方 client／回應結構：https://github.com/counterapi/counter.js
帳號／workspace：https://docs.counterapi.dev/api/authentication/

## 查看網站統計

直接執行 `查看網站統計.cmd`，已啟用時會讀取 V2 的 `data.up_count - data.down_count`。
它不會呼叫 `/up`、`/down`、`/reset`，所以查看報表不會灌入瀏覽量。
原有 GitHub 完整 ZIP／主程式 EXE／Launcher 分類保留，不合併成使用者人數。

```text
查看網站統計.cmd -AnalyticsOnly
查看網站統計.cmd -AnalyticsOnly -Probe
查看網站統計.cmd -AnalyticsOnly -ConfigurationOnly
```

`-AnalyticsOnly` 只跳過 GitHub 查詢，已啟用時仍會讀 CounterAPI。
`-ConfigurationOnly` 不連線 CounterAPI；`-Probe` 可對停用中的設定做唯讀探測。
同時使用兩者仍不連線。沒有任何命令會幫你建立帳號、建立 workspace 或啟用網頁計數。

狀態：`disabled`／`not_configured`／`configuration_error`／`configured`（僅設定檢查），
`available`（唯讀成功）、`request_rejected`（400）、`not_found`（404）、
`authentication_required`（401/403）、`rate_limited`（429）、`service_error`、
`request_failed`、`invalid_response`。無有效資料時 `WebsitePageViews` 為 null，
只有 API 明確回傳有效的 0 才顯示 0。`WebsiteVisits` 永遠為 null，沒有實作訪客去重。
`ReadVerified` 與 `CollectionEnabled` 分開；讀取成功不代表正式網站已部署／送出計數。

## 隱私及限制

只修改官網，沒有桌面軟體遙測、診斷上傳或使用者 ID。自訂計數程式不讀寫 cookie、
localStorage 或指紋，只向固定 CounterAPI V2 網域請求；不載入第三方可執行腳本。
使用 credentials: omit、referrerPolicy: no-referrer；不傳頁面 query、內容或私人金鑰。
**服務仍會接到連線來源 IP 及一般 HTTP 資料**，不能宣稱完全沒有對外資料傳輸。

只在正式 HTTPS 主機及 Manual 路徑運作。排除 webdriver、本機預覽、DNT、GPC、
`?analytics=off`；URL opt-out 不持久儲存，換頁需保留參數或使用瀏覽器 DNT/GPC。
一頁最多一次，不計章節 hash/history 變更，重導向頁不計數。重新整理及換頁仍是新瀏覽。
網路、CORS、逾時可能發生在服務已累加之後，因此不重試、不用 no-cors 或圖片備援。
廣告阻擋／拒絕追蹤會少計；公開可寫 counter 可能被重複請求或操弄，僅供粗略趨勢。
不重建或推估停用期間遺失的歷史，不承諾 V1 資料能自動搬移。

## 測試

```text
node --test scripts/test-built-site.mjs scripts/test-site-analytics.mjs
node scripts/validate-site-analytics.mjs _site
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\scripts\test-site-analytics.ps1
```

離線測試使用 fixture／mock，不碰真實計數器。Actions 額外唯讀探測候選端點，
探測成功與否都會回報真實狀態；離線測試或建置成功不等於計數服務已啟用。
