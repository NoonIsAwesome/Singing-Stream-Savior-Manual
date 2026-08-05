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

function Test-FullPackageAsset {
    param([string]$AssetName)

    if ([string]::IsNullOrWhiteSpace($AssetName)) {
        return $false
    }

    # 完整安裝包的公開命名格式，例如：
    # Singing.Stream.Savior.2.0.4.0.zip
    # 同時容許空白、連字號或底線分隔，避免未來只因命名樣式微調而漏算。
    return $AssetName -match '(?i)^Singing[ ._-]+Stream[ ._-]+Savior(?:[ ._-]+v?\d+(?:\.\d+){1,3})?\.zip$'
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
})
if ($releases.Count -eq 0) {
    throw "No published releases were found."
}

$releaseStats = @($releases | ForEach-Object {
    $release = $_
    $assets = @($release.assets)
    $allAssetDownloads = ($assets |
        Measure-Object -Property download_count -Sum).Sum
    $fullPackageDownloads = ($assets |
        Where-Object { Test-FullPackageAsset $_.name } |
        Measure-Object -Property download_count -Sum).Sum
    $appDownloads = ($assets |
        Where-Object { $_.name -match 'Singing-Stream-Savior\.exe$' } |
        Measure-Object -Property download_count -Sum).Sum
    $launcherDownloads = ($assets |
        Where-Object { $_.name -match 'Launcher\.exe$' } |
        Measure-Object -Property download_count -Sum).Sum
    if ($null -eq $allAssetDownloads) { $allAssetDownloads = 0 }
    if ($null -eq $fullPackageDownloads) { $fullPackageDownloads = 0 }
    if ($null -eq $appDownloads) { $appDownloads = 0 }
    if ($null -eq $launcherDownloads) { $launcherDownloads = 0 }

    [PSCustomObject]@{
        ReleaseTag = $release.tag_name
        FullPackageDownloads = [int64]$fullPackageDownloads
        AppDownloads = [int64]$appDownloads
        LauncherDownloads = [int64]$launcherDownloads
        UpdateAssetDownloads = [int64]$allAssetDownloads -
            [int64]$fullPackageDownloads
        AllAssetDownloads = [int64]$allAssetDownloads
        PublishedAt = [DateTimeOffset]::Parse(
            $release.published_at).ToLocalTime()
    }
})

$allFullPackageDownloads = ($releaseStats |
    Measure-Object -Property FullPackageDownloads -Sum).Sum
if ($null -eq $allFullPackageDownloads) {
    $allFullPackageDownloads = 0
}
$allUpdateAssetDownloads = ($releaseStats |
    Measure-Object -Property UpdateAssetDownloads -Sum).Sum
if ($null -eq $allUpdateAssetDownloads) {
    $allUpdateAssetDownloads = 0
}

if ($Friendly) {
    Write-Host ""
    Write-Host "歌回救星網站統計" -ForegroundColor Cyan
    Write-Host "────────────────────────────────"

    foreach ($stat in $releaseStats) {
        $latestLabel = ""
        if ([string]::IsNullOrWhiteSpace($ReleaseTag) -and
            $stat.ReleaseTag -eq $releaseStats[-1].ReleaseTag) {
            $latestLabel = "（最新）"
        }
        Write-Host ""
        Write-Host ("{0}{1}" -f $stat.ReleaseTag, $latestLabel) `
            -ForegroundColor Yellow
        Write-Host ("  完整安裝包：   {0:N0} 次" -f `
            $stat.FullPackageDownloads)
        Write-Host ("  主程式 EXE：   {0:N0} 次" -f $stat.AppDownloads)
        Write-Host ("  啟動器：       {0:N0} 次" -f $stat.LauncherDownloads)
        if ($stat.UpdateAssetDownloads -gt 0) {
            Write-Host ("  更新與附加資產：{0:N0} 次（不列入總下載）" -f `
                $stat.UpdateAssetDownloads) -ForegroundColor DarkGray
        }
        Write-Host ("  發布時間：     {0}" -f `
            $stat.PublishedAt.ToString("yyyy-MM-dd HH:mm"))
    }

    Write-Host ""
    Write-Host "────────────────────────────────"
    Write-Host "統計結果" -ForegroundColor Cyan
    Write-Host ("網站累積瀏覽：   {0:N0} 次" -f [int64]$pageviews)
    Write-Host ("正式版本數：     {0:N0} 個" -f $releaseStats.Count)
    Write-Host ("完整安裝包下載： {0:N0} 次" -f `
        [int64]$allFullPackageDownloads)
    Write-Host ("更新資產下載：   {0:N0} 次（不列入總下載）" -f `
        [int64]$allUpdateAssetDownloads) -ForegroundColor DarkGray
    Write-Host "────────────────────────────────"
    return
}

[PSCustomObject]@{
    WebsitePageViews = $pageviews
    PublishedReleaseCount = $releaseStats.Count
    FullPackageDownloads = [int64]$allFullPackageDownloads
    UpdateAssetDownloads = [int64]$allUpdateAssetDownloads
}

$releaseStats |
    Select-Object ReleaseTag, FullPackageDownloads, AppDownloads,
        LauncherDownloads, UpdateAssetDownloads, AllAssetDownloads,
        PublishedAt |
    Format-Table -AutoSize
