# Two website counters, separate GitHub downloads

全站瀏覽保留 `_data/analytics.json`，不重設、不拆頁面或語言。
下載點擊使用 `_data/download_clicks.json`，正式 counter 為網站擁有者提供的
`singing-stream-savior-download-clicks`，同屬 workspace `noonisawesome-singing-stream-savior-manual`。
GitHub 檔案下載另依 Release 的 download_count 統計，不將三項合計成人數。

## 計數範圍

只計官網中直接指向本專案 GitHub Release 完整安裝 ZIP 的可信任連結啟動。
進入 resources.html 是頁面瀏覽，不算下載點擊；主題、Runtime、EXE、LGPL 包、
Release 說明頁及其他來源不計入。點擊不是成功下載、安裝或活躍人數。
下載不等待統計回應，不改 href、不攔截預設行為。支援左鍵、鍵盤、Ctrl／Command 與中鍵，
不計模擬事件、已取消事件、右鍵或同次雙擊第二下；失敗不重試，避免重複計數。
同一頁重複初始化不重複綁定，後續真正再次啟動仍是另一事件。
尊重 DNT/GPC、analytics=off，排除 webdriver、本機與錯誤來源，不存訪客 ID。
阻擋器、右鍵選單、複製連結與離頁可能造成少計。

## 查看與啟用

`查看網站統計.cmd` 分別顯示全站瀏覽、官網下載點擊和 GitHub 下載。
`-AnalyticsOnly` 只查兩個網站 Counter；`-ConfigurationOnly` 不連線 CounterAPI；
`-Probe` 可唯讀探測停用設定。未取得數值是 null，不是 0；有效的 0 會保留。
不得將私人金鑰放入設定、網頁、Git 或聊天。公開 Counter 並非私人存取控制。
目前分支的 enabled=true 是待驗收設定；以合併／部署與實際測試紀錄確認啟用狀態。
測試不得下載安裝資產，不得 /down 或 /reset；確有需要時最多一次記錄清楚的測試累加。
HTTP 200 接受不等於已保存，需待緩衝後唯讀確認。

## 隱私與測試

官網只有說明頁及頁尾隱私連結，不顯示流量數字。
隱私說明見五語 privacy.html；維護腳本和內部驗收文件不隨 Pages 發布。

```
node --test scripts/test-download-clicks.mjs scripts/test-download-config.mjs
node scripts/validate-download-clicks.mjs _site
node scripts/validate-privacy.mjs _site
powershell.exe -NoLogo -NoProfile -File scripts/test-download-clicks.ps1
```

離線測試使用模擬資料；CI 只印外部服務可用性，不印真實流量總數。
官方端點：https://docs.counterapi.dev/api/endpoints/v2/
