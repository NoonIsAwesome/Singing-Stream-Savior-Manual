# 官網瀏覽統計（Cloudflare Web Analytics）

## 狀態與啟用

程式接線不等於服務已啟用。目前 `_data/analytics.json` 的 `cloudflare_token`
刻意留白：沒有 token 時，官網不載入第三方 beacon，也不送出統計。
這份 JSON 是前端與維護腳本共用的唯一統計設定，不需要改 DNS 或搬離 GitHub Pages。

1. 使用你的 Cloudflare 帳號，在 **Web Analytics → Add a site** 新增
   `noonisawesome.github.io`（填主機名稱，不要含 `https://` 或路徑）。
2. 在 **Manage site** 取得網站 JavaScript snippet，將 `data-cf-beacon` 裡
   `token` 的 **32 位十六進位字串**填入 `_data/analytics.json` 的 `cloudflare_token`。
   這是原本就要公開放在網站的 site token，**不是 API token、Global API Key、
   帳號密碼或 dashboard 的授權憑證**。不要將任何私密憑證提交到 repository。
3. 合併／部署後，在 Cloudflare 後台確認有資料，再視為啟用成功。
   不要額外手動貼第二份 beacon；共用 layout 已涵蓋所有語言與一般內容頁。

Cloudflare 官方操作說明：
https://developers.cloudflare.com/web-analytics/get-started/

## 查看方式

在 Cloudflare Web Analytics 選擇網站與日期範圍，查看 **Page views（瀏覽量）**、
**Visits（造訪次數）**及來源／頁面變化。
Visits 的定義是來自外部網站或直接連結的頁面造訪，**不等於去重訪客人數**。
不要把瀏覽量、Visits、完整包下載及更新下載相加，或宣稱為軟體活躍人數。

https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/

`查看網站統計.cmd` 仍整理 GitHub Release 下載，但網站欄位現在會區分：
- `not_configured`：尚未填公開網站 token。
- `invalid_token` / `configuration_error`：設定格式不正確或讀取失敗。
- `configured`：接線設定存在，**尚未驗證部署或 Cloudflare 收集成功**。

此腳本沒有讀取 Cloudflare 後台報表的帳號授權，因此瀏覽／造訪數值為 `$null`，
並提供後台入口，不再把未取得的資料顯示為 0。公開 site token 不提供報表讀取權限。
這不代表 Cloudflare 沒有報表 API；未來需要自動報表時，應另做安全的伺服器端授權，
不能把私密 API token 放到官網。

只看接線狀態、不查 GitHub：

```powershell
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\scripts\get-site-stats.ps1 -AnalyticsOnly -Friendly
```

也可執行 `查看網站統計.cmd -AnalyticsOnly`。

## 隱私與資料限制

這是**官網**的分析，沒有修改桌面軟體，也沒有新增桌面遙測、使用者 ID 或診斷上傳。
自訂 loader 不使用 cookie、localStorage、IP hash 或指紋來辨識個人；
啟用後，瀏覽器會向 Cloudflare 載入官方 beacon 並傳送其網站效能／流量資料，
因此不是「完全沒有對外連線」。收集方式以 Cloudflare 官方文件為準。

https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/
https://developers.cloudflare.com/speed/observatory/rum-beacon/

loader 只允許 HTTPS、設定的正式主機與 Manual 路徑，排除本機預覽、其他專案、
`navigator.webdriver`、DNT／GPC 以及帶有 `?analytics=off` 的頁面。
DNT、GPC、`analytics=off` 是本站 loader 主動遵守的設定，不宣稱是 vendor 預設行為。
`analytics=off` 只作用於當前 URL，不會寫入持久偏好；跳到其他頁面時需再次帶上，
或使用瀏覽器的 DNT／GPC。廣告阻擋器、拒絕追蹤、網路失敗會造成少計。

這是多頁 Jekyll 網站，beacon 設定 `spa: false`，不把章節錨點／history 變動當成新頁。
每頁最多插入一次；載入失敗不影響其他功能，也不改用繞過阻擋器的備援計數。
重導向頁不載入計數，避免進入同一內容先算兩次。

https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/

不會回填／推估停用期間的歷史瀏覽量。填入 token 後，需另外確認 Cloudflare 站點
登記、網頁部署、beacon 請求與後台資料，不以格式驗證通過冒充端到端收集成功。

## 驗證

```text
node --test scripts/test-site-analytics.mjs
node scripts/validate-site-analytics.mjs _site
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File scripts/test-site-analytics.ps1
```

`Website analytics checks` 的 PR workflow 會跑整站 Jekyll build、既有頁面檢查、
新 loader 測試，以及真正 Windows PowerShell 5.1／CMD 的離線測試。
測試不使用真正 token，不下載 Release assets，也不向計數服務送測試流量。
本地只有 JavaScript 執行環境時，必須等 Windows／整站 CI 結果，不能宣稱兩者已通過。
