param(
    [string]$ReleaseTag = "v2.0.1.1"
)

$ErrorActionPreference = "Stop"

$counterUrl = "https://api.counterapi.dev/v1/noonisawesome-singing-stream-savior-manual/pageviews"
$releaseUrl = "https://api.github.com/repos/NoonIsAwesome/Singing-Stream-Savior-Updates/releases/tags/$ReleaseTag"
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

[PSCustomObject]@{
    WebsitePageViews = $pageviews
    ReleaseTag = $release.tag_name
    ReleaseDownloads = [int64]$totalDownloads
    PublishedAt = $release.published_at
}

$assets |
    Select-Object name, download_count, size, browser_download_url |
    Format-Table -AutoSize
