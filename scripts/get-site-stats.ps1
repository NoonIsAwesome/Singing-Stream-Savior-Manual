param(
    [string]$ReleaseTag = "",
    [switch]$Friendly
)

$ErrorActionPreference = "Stop"

$counterUrl = "https://api.counterapi.dev/v1/noonisawesome-singing-stream-savior-manual/pageviews"
$releaseBaseUrl = "https://api.github.com/repos/NoonIsAwesome/Singing-Stream-Savior-Updates/releases"
$releaseUrl = if ([string]::IsNullOrWhiteSpace($ReleaseTag)) {
    "$releaseBaseUrl/latest"
}
else {
    "$releaseBaseUrl/tags/$ReleaseTag"
}
$headers = @{
    "Accept" = "application/vnd.github+json"
    "User-Agent" = "Singing-Stream-Savior-Stats"
    "X-GitHub-Api-Version" = "2022-11-28"
}

$pageviews = 0
try {
    $counter = Invoke-RestMethod -Uri $counterUrl -Method Get
    $pageviews = [int64]$counter.count
}
catch {
    $statusCode = [int]$_.Exception.Response.StatusCode
    if ($statusCode -notin 400, 404) {
        throw
    }
}

$release = Invoke-RestMethod -Uri $releaseUrl -Headers $headers -Method Get
$assets = @($release.assets)
$totalDownloads = ($assets | Measure-Object -Property download_count -Sum).Sum
if ($null -eq $totalDownloads) {
    $totalDownloads = 0
}

if ($Friendly) {
    $zipDownloads = ($assets |
        Where-Object { $_.name -match '\.zip$' } |
        Measure-Object -Property download_count -Sum).Sum
    $appDownloads = ($assets |
        Where-Object { $_.name -match 'Singing-Stream-Savior\.exe$' } |
        Measure-Object -Property download_count -Sum).Sum
    $launcherDownloads = ($assets |
        Where-Object { $_.name -match 'Launcher\.exe$' } |
        Measure-Object -Property download_count -Sum).Sum
    if ($null -eq $zipDownloads) { $zipDownloads = 0 }
    if ($null -eq $appDownloads) { $appDownloads = 0 }
    if ($null -eq $launcherDownloads) { $launcherDownloads = 0 }
    $publishedAt = [DateTimeOffset]::Parse($release.published_at).ToLocalTime()

    Write-Host ""
    Write-Host "歌回救星網站統計" -ForegroundColor Cyan
    Write-Host "────────────────────────────"
    Write-Host ("網站瀏覽數：     {0:N0} 次" -f [int64]$pageviews)
    Write-Host ("最新版本：       {0}" -f $release.tag_name)
    Write-Host ("Release 總下載： {0:N0} 次" -f [int64]$totalDownloads)
    Write-Host ""
    Write-Host ("完整軟體 ZIP：   {0:N0} 次" -f [int64]$zipDownloads)
    Write-Host ("主程式 EXE：     {0:N0} 次" -f [int64]$appDownloads)
    Write-Host ("啟動器：         {0:N0} 次" -f [int64]$launcherDownloads)
    Write-Host ""
    Write-Host ("發布時間：       {0}" -f $publishedAt.ToString("yyyy-MM-dd HH:mm"))
    Write-Host "────────────────────────────"
    return
}

[PSCustomObject]@{
    WebsitePageViews = $pageviews
    ReleaseTag = $release.tag_name
    ReleaseDownloads = [int64]$totalDownloads
    PublishedAt = $release.published_at
}

$assets |
    Select-Object name, download_count, size, browser_download_url |
    Format-Table -AutoSize
