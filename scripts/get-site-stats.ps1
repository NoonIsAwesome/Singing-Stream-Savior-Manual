param(
    [string]$ReleaseTag = "",
    [switch]$Friendly
)

$ErrorActionPreference = "Stop"

$counterUrl = "https://api.counterapi.dev/v1/noonisawesome-singing-stream-savior-manual/pageviews"
$releaseBaseUrl = "https://api.github.com/repos/NoonIsAwesome/Singing-Stream-Savior-Updates/releases"
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

$releases = @()
if ([string]::IsNullOrWhiteSpace($ReleaseTag)) {
    $page = 1
    do {
        $pageResponse = Invoke-RestMethod `
            -Uri "${releaseBaseUrl}?per_page=100&page=$page" `
            -Headers $headers `
            -Method Get
        $pageReleases = @($pageResponse)
        $releases += @($pageReleases | Where-Object {
            -not $_.draft -and -not $_.prerelease
        })
        $page++
    } while ($pageReleases.Count -eq 100)
}
else {
    $releaseUrl = "$releaseBaseUrl/tags/$ReleaseTag"
    $releases = @(Invoke-RestMethod `
        -Uri $releaseUrl `
        -Headers $headers `
        -Method Get)
}

$releases = @($releases | Sort-Object {
    [DateTimeOffset]::Parse($_.published_at)
} -Descending)
if ($releases.Count -eq 0) {
    throw "No published releases were found."
}

$releaseStats = @($releases | ForEach-Object {
    $release = $_
    $assets = @($release.assets)
    $totalDownloads = ($assets |
        Measure-Object -Property download_count -Sum).Sum
    $zipDownloads = ($assets |
        Where-Object { $_.name -match '\.zip$' } |
        Measure-Object -Property download_count -Sum).Sum
    $appDownloads = ($assets |
        Where-Object { $_.name -match 'Singing-Stream-Savior\.exe$' } |
        Measure-Object -Property download_count -Sum).Sum
    $launcherDownloads = ($assets |
        Where-Object { $_.name -match 'Launcher\.exe$' } |
        Measure-Object -Property download_count -Sum).Sum
    if ($null -eq $totalDownloads) { $totalDownloads = 0 }
    if ($null -eq $zipDownloads) { $zipDownloads = 0 }
    if ($null -eq $appDownloads) { $appDownloads = 0 }
    if ($null -eq $launcherDownloads) { $launcherDownloads = 0 }
    $knownDownloads = [int64]$zipDownloads +
        [int64]$appDownloads + [int64]$launcherDownloads

    [PSCustomObject]@{
        ReleaseTag = $release.tag_name
        ZipDownloads = [int64]$zipDownloads
        AppDownloads = [int64]$appDownloads
        LauncherDownloads = [int64]$launcherDownloads
        OtherDownloads = [int64]$totalDownloads - $knownDownloads
        TotalDownloads = [int64]$totalDownloads
        PublishedAt = [DateTimeOffset]::Parse(
            $release.published_at).ToLocalTime()
    }
})

$allReleaseDownloads = ($releaseStats |
    Measure-Object -Property TotalDownloads -Sum).Sum
if ($null -eq $allReleaseDownloads) {
    $allReleaseDownloads = 0
}

if ($Friendly) {
    Write-Host ""
    Write-Host "歌回救星網站統計" -ForegroundColor Cyan
    Write-Host "────────────────────────────────"
    Write-Host ("網站累積瀏覽：   {0:N0} 次" -f [int64]$pageviews)
    Write-Host ("正式版本數：     {0:N0} 個" -f $releaseStats.Count)
    Write-Host ("全版本總下載：   {0:N0} 次" -f [int64]$allReleaseDownloads)

    foreach ($stat in $releaseStats) {
        $latestLabel = ""
        if ([string]::IsNullOrWhiteSpace($ReleaseTag) -and
            $stat.ReleaseTag -eq $releaseStats[0].ReleaseTag) {
            $latestLabel = "（最新）"
        }
        Write-Host ""
        Write-Host ("{0}{1}" -f $stat.ReleaseTag, $latestLabel) `
            -ForegroundColor Yellow
        Write-Host ("  完整軟體 ZIP： {0:N0} 次" -f $stat.ZipDownloads)
        Write-Host ("  主程式 EXE：   {0:N0} 次" -f $stat.AppDownloads)
        Write-Host ("  啟動器：       {0:N0} 次" -f $stat.LauncherDownloads)
        if ($stat.OtherDownloads -gt 0) {
            Write-Host ("  其他資產：     {0:N0} 次" -f $stat.OtherDownloads)
        }
        Write-Host ("  版本合計：     {0:N0} 次" -f $stat.TotalDownloads)
        Write-Host ("  發布時間：     {0}" -f `
            $stat.PublishedAt.ToString("yyyy-MM-dd HH:mm"))
    }
    Write-Host "────────────────────────────────"
    return
}

[PSCustomObject]@{
    WebsitePageViews = $pageviews
    PublishedReleaseCount = $releaseStats.Count
    AllReleaseDownloads = [int64]$allReleaseDownloads
}

$releaseStats |
    Select-Object ReleaseTag, ZipDownloads, AppDownloads,
        LauncherDownloads, OtherDownloads, TotalDownloads, PublishedAt |
    Format-Table -AutoSize
