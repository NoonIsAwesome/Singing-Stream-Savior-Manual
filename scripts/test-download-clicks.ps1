$ErrorActionPreference = "Stop"
$downloadTestState = @{ Assertions = 0; Calls = 0; ErrorStatus = 0; Zero = $false }
function Assert-Download {
    param([bool]$Condition, [string]$Message)
    if (-not $Condition) { throw $Message }
    $downloadTestState.Assertions++
}
Assert-Download ($PSVersionTable.PSVersion.Major -eq 5) "Run in Windows PowerShell 5.1."
foreach ($name in @("get-download-clicks.ps1", "get-site-stats.ps1", "test-download-clicks.ps1")) {
    $file = Join-Path $PSScriptRoot $name
    $bytes = [IO.File]::ReadAllBytes($file)
    Assert-Download ($bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191) "$name needs BOM"
    $tokens = $null; $errors = $null
    $null = [System.Management.Automation.Language.Parser]::ParseFile($file, [ref]$tokens, [ref]$errors)
    Assert-Download ($errors.Count -eq 0) "$name has syntax errors"
}
Add-Type -TypeDefinition @'
public class DownloadProbeResponse { public int StatusCode { get; set; } }
public class DownloadProbeException : System.Exception {
    public DownloadProbeResponse Response { get; set; }
    public DownloadProbeException(int status) { Response = new DownloadProbeResponse { StatusCode = status }; }
}
'@
function Invoke-RestMethod {
    param($Uri, $Headers, $Method, $TimeoutSec, $MaximumRedirection, $ErrorAction)
    $downloadTestState.Calls++
    if ($Uri -like 'https://api.github.com/repos/NoonIsAwesome/Singing-Stream-Savior-Updates/releases*') {
        return @([PSCustomObject]@{
            tag_name = "v9.9.9.9"; published_at = "2026-09-21T00:00:00Z"; draft = $false; prerelease = $false
            assets = @(
                [PSCustomObject]@{ name = "Singing.Stream.Savior.9.9.9.9.zip"; download_count = 7 },
                [PSCustomObject]@{ name = "Singing-Stream-Savior.exe"; download_count = 3 },
                [PSCustomObject]@{ name = "Singing-Stream-Savior-9.9.9.9-LGPL-Relink-Kit.zip"; download_count = 99 }
            )
        })
    }
    Assert-Download ($Uri -match '^https://api\.counterapi\.dev/v2/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+$') "Read-only endpoints required"
    Assert-Download ($Method -eq "Get" -and $TimeoutSec -eq 8 -and $MaximumRedirection -eq 0) "Unexpected transport"
    Assert-Download (-not $Headers.ContainsKey("Authorization")) "No private credentials"
    if ($downloadTestState.ErrorStatus) { throw (New-Object DownloadProbeException($downloadTestState.ErrorStatus)) }
    $count = 42
    if ($Uri -match 'download-clicks$') { $count = 11 }
    if ($downloadTestState.Zero) { $count = 0 }
    return [PSCustomObject]@{ code = 200; data = [PSCustomObject]@{ up_count = $count; down_count = 0 } }
}
$root = Split-Path $PSScriptRoot -Parent
$fixture = Join-Path ([IO.Path]::GetTempPath()) ("s3s-clicks-" + [Guid]::NewGuid().ToString("N"))
$null = New-Item -ItemType Directory -Path $fixture
$path = Join-Path $fixture "clicks.json"
$reader = Join-Path $PSScriptRoot "get-download-clicks.ps1"
$valid = '{"provider":"counterapi-v2","production_host":"noonisawesome.github.io","enabled":true,"workspace":"fixture-workspace","counter":"download-clicks"}'
try {
    Set-Content -LiteralPath $path -Value ($valid.Replace('"enabled":true', '"enabled":false')) -Encoding UTF8
    $result = & $reader -ConfigPath $path
    Assert-Download ($result.Status -eq "disabled" -and $null -eq $result.WebsiteDownloadClicks -and $downloadTestState.Calls -eq 0) "Disabled clicks must not request or invent zero"
    $result = & $reader -ConfigPath $path -Probe
    Assert-Download ($result.WebsiteDownloadClicks -eq 11 -and $result.ReadVerified -and -not $result.CollectionEnabled) "Probe must read separate clicks without enabling"
    Assert-Download (-not ($result.PSObject.Properties.Name -contains "WebsitePageViews")) "Clicks must not masquerade as views"
    $before = $downloadTestState.Calls
    $result = & $reader -ConfigPath $path -Probe -ConfigurationOnly
    Assert-Download ($null -eq $result.WebsiteDownloadClicks -and $downloadTestState.Calls -eq $before) "ConfigurationOnly must stay offline"
    Set-Content -LiteralPath $path -Value $valid -Encoding UTF8
    $downloadTestState.Zero = $true
    $result = & $reader -ConfigPath $path
    Assert-Download ($null -ne $result.WebsiteDownloadClicks -and $result.WebsiteDownloadClicks -eq 0) "Valid zero must stay zero"
    $downloadTestState.Zero = $false
    foreach ($status in @(401, 404, 429, 503)) {
        $downloadTestState.ErrorStatus = $status
        $before = $downloadTestState.Calls
        $result = & $reader -ConfigPath $path
        Assert-Download ($null -eq $result.WebsiteDownloadClicks -and -not $result.ReadVerified) "Failure must not become a count"
        Assert-Download ($downloadTestState.Calls -eq $before + 1) "Failure must not retry"
    }
    $downloadTestState.ErrorStatus = 0
    $output = @(& (Join-Path $PSScriptRoot "get-site-stats.ps1") -Probe)
    $summary = @($output | Where-Object { $_.PSObject.Properties.Name -contains "FullPackageDownloads" })
    Assert-Download ($summary.Count -eq 1) "Missing summary"
    Assert-Download ($summary[0].WebsitePageViews -eq 42 -and $summary[0].WebsiteDownloadClicks -eq 11 -and $summary[0].FullPackageDownloads -eq 7) "Three independent metrics must never be mixed"
    $only = & (Join-Path $PSScriptRoot "get-site-stats.ps1") -Probe -AnalyticsOnly
    Assert-Download ($only.WebsitePageViews -eq 42 -and $only.WebsiteDownloadClicks -eq 11) "AnalyticsOnly must expose both counters"
    $friendly = & (Join-Path $PSScriptRoot "get-site-stats.ps1") -Probe -Friendly 6>&1 | Out-String
    Assert-Download ($friendly -match '官網下載點擊： 11 次' -and $friendly -match '網站累計瀏覽： 42 次') "Friendly output must label each metric"
    $downloadTestState.ErrorStatus = 404
    $friendly = & (Join-Path $PSScriptRoot "get-site-stats.ps1") -Probe -Friendly 6>&1 | Out-String
    Assert-Download ($friendly -match '官網下載點擊：未取得' -and $friendly -match '完整安裝包下載') "Counter failure must not hide GitHub results"
    [Console]::OutputEncoding = New-Object Text.UTF8Encoding($false)
    $OutputEncoding = [Console]::OutputEncoding
    Push-Location $root
    try {
        $cmdOutput = & cmd.exe /d /c 'echo. | call ".\查看網站統計.cmd" -AnalyticsOnly -ConfigurationOnly' 2>&1 | Out-String
        Assert-Download ($LASTEXITCODE -eq 0 -and $cmdOutput -match '官網下載點擊：未取得') "CMD must preserve Chinese output and remain offline"
    } finally { Pop-Location }
} finally { Remove-Item -LiteralPath $fixture -Recurse -Force }
Write-Host ("Download-click PowerShell 5.1 assertions passed: {0}" -f $downloadTestState.Assertions)
