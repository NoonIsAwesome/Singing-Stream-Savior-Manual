param(
    [string]$ConfigPath = (Join-Path $PSScriptRoot "../_data/analytics.json")
)

$ErrorActionPreference = "Stop"
# Configured is deliberately not called active/verified. Only the owner's
# dashboard can confirm collection; the public beacon token cannot read reports.
$result = [ordered]@{
    Provider = "Cloudflare Web Analytics"
    Status = "configuration_error"
    WebsitePageViews = $null
    WebsiteVisits = $null
    CollectionVerified = $false
    Detail = "設定讀取失敗：請檢查 _data/analytics.json。"
    DashboardUrl = "https://dash.cloudflare.com/?to=/:account/web-analytics"
}
try {
    $config = Get-Content -LiteralPath $ConfigPath -Raw -Encoding UTF8 |
        ConvertFrom-Json -ErrorAction Stop
    if ($null -eq $config -or $config -is [array] -or
        $config.provider -cne "cloudflare" -or
        $config.production_host -isnot [string] -or
        $config.production_host -cnotmatch '^[a-z0-9]+(?:[.-][a-z0-9]+)*$' -or
        $config.cloudflare_token -isnot [string]) {
        throw "Invalid analytics configuration"
    }
    $token = $config.cloudflare_token.Trim()
    if ([string]::IsNullOrWhiteSpace($token)) {
        $result.Status = "not_configured"
        $result.Detail = "尚未啟用：請填入 _data/analytics.json 的公開 cloudflare_token。"
    }
    elseif ($token -match '^[a-fA-F0-9]{32}$') {
        $result.Status = "configured"
        $result.Detail = "已設定（未驗證收集）：請至 Cloudflare 後台確認。"
    }
    else {
        $result.Status = "invalid_token"
        $result.Detail = "Token 格式不正確：只填網站 snippet 的公開 token，不要填 API Key。"
    }
}
catch {
    # Unknown/unavailable is null, never zero. Do not print the token or file body.
    $result.Status = "configuration_error"
}
[PSCustomObject]$result
