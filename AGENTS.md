# Singing Stream Savior Manual 維護規則

本檔適用於整個 Manual repository。修改前先檢查 Git 狀態，不覆蓋或提交與任務無關的使用者變更。

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
