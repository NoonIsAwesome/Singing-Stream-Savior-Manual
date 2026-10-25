# Singing Stream Savior Manual 維護規則

本檔適用於整個 Manual repository。修改前先檢查 Git 狀態，不覆蓋或提交與任務無關的使用者變更。

## Codex 主機的已知工具限制

- 此 Windows Codex 環境目前**沒有安裝 GitHub CLI (`gh`)**。不要先執行
  `gh run list` 或 `gh release` 再改用替代方案。GitHub Pages／Actions 狀態直接
  使用 GitHub REST API（PowerShell `Invoke-RestMethod`／`Invoke-WebRequest`）查詢；
  repository 寫入沿用 Git push 或既有已驗證流程。
- shell 指令預設使用無 profile／`login:false`，避免已知的 PowerShell profile
  啟動等待。一般 PATH 不保證有 Ruby、Bundler、Jekyll、Node.js 或 Python 額外
  套件；使用前先唯讀確認，不因缺少工具重複嘗試或臨時安裝。
- Manual 的 Jekyll 最終驗證以 GitHub Pages Actions 成功，加上正式網址使用
  cache-busting query 與 `Cache-Control: no-cache` 讀取為準。
- 已知環境限制應先查本檔；不要把工具缺少、沙箱或編碼錯誤誤判為網站內容問題。

## Windows PowerShell 與批次檔編碼

- 面向 Windows 使用者、由 `.cmd`、捷徑或檔案總管啟動的 `.ps1`，預設相容目標是 Windows PowerShell 5.1；除非流程明確只使用 `pwsh`，不可加入 `??`、`?:`、`&&` 等 PowerShell 7 才支援的語法。
- `.ps1` 只要含有中文、日文或其他非 ASCII 字元，就必須儲存為 **UTF-8 with BOM**。Windows PowerShell 5.1 會把沒有 BOM 的 UTF-8 腳本當成本機 ANSI code page，可能造成亂碼甚至 ParserError。
- 使用 `apply_patch` 修改含非 ASCII 的 `.ps1` 後，必須重新確認前三個位元組為 `EF BB BF`；若 BOM 遺失，以 `System.Text.UTF8Encoding($true)` 重新寫入同一內容。
- `.cmd`／`.bat` 儘量保持純 ASCII 並使用 CRLF；中文標題、提示與格式化輸出放進有 BOM 的 `.ps1`。`chcp 65001` 只改主控台 code page，不能保證批次檔本身會被正確解析，不可把它當成檔案編碼修復。
- 修改統計或其他維護腳本後，必須用真正的 Windows PowerShell 5.1 驗證：

```powershell
& 'C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe' `
  -NoLogo -NoProfile -ExecutionPolicy Bypass -File '.\scripts\get-site-stats.ps1'
```

- 有 `.cmd` 包裝時，再以 `cmd.exe /d /c` 實際執行一次，確認參數、相對路徑、中文輸出與視窗停留行為。

## 正式發布的日誌入口核對

新增 `_data/release-<版本>.yml` 並更新 resources 後，須一併更新 `_includes/changelog-page.html` 的 current_release、保留前一版的 include，並調整 release_count；新增資料檔不會自動加入目前的手動日誌清單。同時將前一版 release YAML 的 `latest` 設為 `false`；推送前執行 `node --test scripts/test-built-site.mjs`，它會先核對所有 release YAML 僅有當版為 latest。核對 resources 的 updated_at 為本次發布日期，publishedAt 使用正式 GitHub Release API 的真實 UTC 時間。

不得只以 metadata 同步成功當成網站已完成。保留既有 rendered-site assertions，必須等指定提交的 Pages build／deployment 成功，再核對五語正式日誌的唯一 latest、第一個版本及版本範圍。
