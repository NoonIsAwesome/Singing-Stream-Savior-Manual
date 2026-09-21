param(
    [string]$ConfigPath = (Join-Path $PSScriptRoot "../_data/analytics.json"),
    [switch]$ConfigurationOnly,
    [switch]$Probe
)

$ErrorActionPreference = "Stop"
$result = [ordered]@{
    Provider = "CounterAPI V2"
    Status = "configuration_error"
    WebsitePageViews = $null
    WebsiteVisits = $null
    ReadVerified = $false
    CollectionVerified = $false
    CollectionEnabled = $false
    HttpStatus = $null
    CheckedAt = $null
    Detail = "設定讀取失敗：請檢查 _data/analytics.json。"
    DashboardUrl = "https://app.counterapi.dev/"
    CounterReadUrl = $null
}
try {
    $config = Get-Content -LiteralPath $ConfigPath -Raw -Encoding UTF8 |
        ConvertFrom-Json -ErrorAction Stop
    if ($null -eq $config -or $config -is [array] -or
        $config.provider -cne "counterapi-v2" -or
        $config.production_host -isnot [string] -or
        $config.production_host -cnotmatch '^[a-z0-9]+(?:[.-][a-z0-9]+)*$' -or
        $config.enabled -isnot [bool]) { throw "Invalid configuration" }
    $allowed = @("provider", "production_host", "enabled", "workspace", "counter")
    foreach ($key in $config.PSObject.Properties.Name) {
        if ($key -notin $allowed) { throw "Unexpected configuration field" }
    }
    foreach ($key in @("workspace", "counter")) {
        $value = $config.$key
        if ($value -isnot [string]) { throw "Invalid slug type" }
        if ($value.Trim() -and $value.Trim() -cnotmatch '^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$') {
            throw "Invalid slug"
        }
    }
    $workspace = $config.workspace.Trim()
    $counter = $config.counter.Trim()
    $result.CollectionEnabled = $config.enabled
    if (-not $workspace -or -not $counter) {
        $result.Status = "not_configured"
        $result.Detail = "尚未設定：請填入實際 V2 workspace 與 counter 名稱，不要填 API Key。"
        return [PSCustomObject]$result
    }
    $result.CounterReadUrl = "https://api.counterapi.dev/v2/$workspace/$counter"
}
catch { return [PSCustomObject]$result }

if (-not $config.enabled -and -not $Probe) {
    $result.Status = "disabled"
    $result.Detail = "計數尚未啟用：請先驗證 V2 公開計數器，再將 enabled 設為 true。"
    return [PSCustomObject]$result
}
if ($ConfigurationOnly) {
    $result.Status = "configured"
    $result.Detail = "設定格式正確，尚未驗證服務或正式網站收集。"
    return [PSCustomObject]$result
}

$result.CheckedAt = [DateTimeOffset]::UtcNow.ToString("o")
try {
    # Read ONLY. Never call /up, /down or /reset when inspecting statistics.
    $payload = Invoke-RestMethod -Uri $result.CounterReadUrl -Method Get `
        -Headers @{ "Accept" = "application/json"; "User-Agent" = "Singing-Stream-Savior-Stats" } `
        -TimeoutSec 8 -MaximumRedirection 0 -ErrorAction Stop
    $result.HttpStatus = 200
}
catch {
    $status = $null
    if ($null -ne $_.Exception.Response) { $status = [int]$_.Exception.Response.StatusCode }
    $result.HttpStatus = $status
    $result.Status = "request_failed"
    $result.Detail = "讀取失敗：網路、逾時或服務暫時不可用；數值未知，不是 0。"
    if ($status -in 401, 403) {
        $result.Status = "authentication_required"
        $result.Detail = "服務要求授權：請確認計數器允許匿名讀取與累加；不可將私密 token 放入網頁。"
    }
    elseif ($status -eq 400) {
        $result.Status = "request_rejected"
        $result.Detail = "CounterAPI 拒絕請求（HTTP 400）：請確認 V2 workspace 已建立且名稱正確。"
    }
    elseif ($status -eq 404) {
        $result.Status = "not_found"
        $result.Detail = "找不到 workspace 或 counter（HTTP 404）：請先在 CounterAPI 後台建立。"
    }
    elseif ($status -eq 429) {
        $result.Status = "rate_limited"
        $result.Detail = "服務暫時限制請求頻率（HTTP 429）；本次未取得數值。"
    }
    elseif ($status -ge 500) {
        $result.Status = "service_error"
        $result.Detail = "CounterAPI 服務錯誤；本次未取得數值。"
    }
    return [PSCustomObject]$result
}

try {
    if ($null -eq $payload -or $payload -is [array] -or
        ([string]$payload.code -cne "200") -or $null -eq $payload.data -or
        $payload.data -is [array]) { throw "Invalid V2 response" }
    foreach ($name in @("up_count", "down_count")) {
        $value = $payload.data.$name
        if ($null -eq $value -or $value -is [bool] -or
            ($value -isnot [int] -and $value -isnot [long] -and
             $value -isnot [double] -and $value -isnot [decimal]) -or
            $value -lt 0 -or $value -gt 9007199254740991 -or
            [double]::IsNaN([double]$value) -or [double]::IsInfinity([double]$value) -or
            [Math]::Floor([double]$value) -ne [double]$value) { throw "Invalid count" }
    }
    if ($payload.data.down_count -gt $payload.data.up_count) { throw "Negative pageviews" }
    $result.WebsitePageViews = [int64]$payload.data.up_count - [int64]$payload.data.down_count
    $result.ReadVerified = $true
    $result.Status = "available"
    $result.Detail = "已讀取 V2 瀏覽計數（不是不重複人數）。V2 緩衝可能延遲；讀取成功不代表正式網站已開始計數。"
    if (-not $config.enabled) { $result.Detail += " 本地設定的計數開關仍為停用。" }
}
catch {
    $result.Status = "invalid_response"
    $result.Detail = "回應不是有效的 V2 計數資料；本次數值未知，不是 0。"
}
[PSCustomObject]$result
