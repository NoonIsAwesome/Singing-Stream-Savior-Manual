param(
    [string]$ConfigPath = (Join-Path $PSScriptRoot "../_data/download_clicks.json"),
    [switch]$ConfigurationOnly,
    [switch]$Probe
)

# Reuse the validated, read-only V2 transport without changing the page-view reader.
# Its legacy count field is mapped here; callers never receive clicks as page views.
$result = & (Join-Path $PSScriptRoot "get-site-analytics.ps1") `
    -ConfigPath $ConfigPath -ConfigurationOnly:$ConfigurationOnly -Probe:$Probe
[PSCustomObject]@{
    Provider = $result.Provider
    Metric = "DownloadClicks"
    WebsiteDownloadClicks = $result.WebsitePageViews
    Status = $result.Status
    Detail = $result.Detail.Replace("_data/analytics.json", "_data/download_clicks.json").Replace("瀏覽", "下載點擊")
    ReadVerified = $result.ReadVerified
    CollectionVerified = $result.CollectionVerified
    CollectionEnabled = $result.CollectionEnabled
    HttpStatus = $result.HttpStatus
    CheckedAt = $result.CheckedAt
    CounterReadUrl = $result.CounterReadUrl
    DashboardUrl = $result.DashboardUrl
}
