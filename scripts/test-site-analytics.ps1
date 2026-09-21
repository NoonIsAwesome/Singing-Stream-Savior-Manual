$ErrorActionPreference = "Stop"
# A shared mutable fixture avoids $script: resolving to the reader's script scope.
$counterV2TestState = @{ Assertions = 0; Calls = 0; Status = 0; ResponseJson = '{"code":"200","data":{"up_count":12,"down_count":2}}' }
function Assert-True {
    param([bool]$Condition, [string]$Message)
    if (-not $Condition) { throw $Message }
    $counterV2TestState.Assertions++
}
Assert-True ($PSVersionTable.PSVersion.Major -eq 5) "Run with Windows PowerShell 5.1."
$root = Split-Path $PSScriptRoot -Parent
foreach ($name in @("get-site-analytics.ps1", "get-site-stats.ps1", "test-site-analytics.ps1")) {
    $file = Join-Path $PSScriptRoot $name
    $bytes = [IO.File]::ReadAllBytes($file)
    Assert-True ($bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191) "$name needs UTF-8 BOM"
    $tokens = $null; $errors = $null
    $null = [System.Management.Automation.Language.Parser]::ParseFile($file, [ref]$tokens, [ref]$errors)
    Assert-True ($errors.Count -eq 0) "$name has parse errors"
}
Add-Type -TypeDefinition @'
public class CounterTestResponse { public int StatusCode { get; set; } }
public class CounterTestException : System.Exception {
    public CounterTestResponse Response { get; set; }
    public CounterTestException(int status) { Response = new CounterTestResponse { StatusCode = status }; }
}
'@
function Invoke-RestMethod {
    param($Uri, $Headers, $Method, $TimeoutSec, $MaximumRedirection, $ErrorAction)
    if ($Uri -like 'https://api.github.com/repos/NoonIsAwesome/Singing-Stream-Savior-Updates/releases*') {
        return @([PSCustomObject]@{
            tag_name = "v9.9.9.9"; published_at = "2026-09-21T00:00:00Z"; draft = $false; prerelease = $false
            assets = @(
                [PSCustomObject]@{ name = "Singing.Stream.Savior.9.9.9.9.zip"; download_count = 7 },
                [PSCustomObject]@{ name = "Singing-Stream-Savior.exe"; download_count = 3 },
                [PSCustomObject]@{ name = "Singing-Stream-Savior-Launcher.exe"; download_count = 2 },
                [PSCustomObject]@{ name = "Singing-Stream-Savior-9.9.9.9-LGPL-Relink-Kit.zip"; download_count = 99 }
            )
        })
    }
    Assert-True ($Uri -match '^https://api\.counterapi\.dev/v2/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+$') "Unexpected endpoint or mutation"
    Assert-True ($Method -eq "Get" -and $TimeoutSec -eq 8 -and $MaximumRedirection -eq 0) "Unsafe request options"
    Assert-True (-not $Headers.ContainsKey("Authorization")) "No credentials in public stats requests"
    $counterV2TestState.Calls++
    if ($counterV2TestState.Status -gt 0) { throw (New-Object CounterTestException($counterV2TestState.Status)) }
    if ($counterV2TestState.Status -lt 0) { throw "Simulated timeout" }
    return ($counterV2TestState.ResponseJson | ConvertFrom-Json)
}
$fixture = Join-Path ([IO.Path]::GetTempPath()) ("s3s-counter-v2-" + [Guid]::NewGuid().ToString("N"))
$null = New-Item -ItemType Directory -Path $fixture
$path = Join-Path $fixture "analytics.json"
$reader = Join-Path $PSScriptRoot "get-site-analytics.ps1"
$valid = '{"provider":"counterapi-v2","production_host":"noonisawesome.github.io","enabled":true,"workspace":"fixture-workspace","counter":"pageviews"}'
try {
    foreach ($case in @(
        @{ Json = $valid.Replace('"enabled":true', '"enabled":false'); Expected = "disabled" },
        @{ Json = $valid.Replace('"fixture-workspace"', '""'); Expected = "not_configured" },
        @{ Json = $valid.Replace('"enabled":true', '"enabled":"true"'); Expected = "configuration_error" },
        @{ Json = $valid.Replace('"fixture-workspace"', '"../other"'); Expected = "configuration_error" },
        @{ Json = $valid.Replace('"counterapi-v2"', '"cloudflare"'); Expected = "configuration_error" },
        @{ Json = $valid.Replace('"pageviews"', 'null'); Expected = "configuration_error" },
        @{ Json = $valid.Replace('"counter":', '"api_key":"DO_NOT_PUBLISH","counter":'); Expected = "configuration_error" },
        @{ Json = '{}'; Expected = "configuration_error" },
        @{ Json = '[]'; Expected = "configuration_error" },
        @{ Json = '{broken'; Expected = "configuration_error" }
    )) {
        Set-Content -LiteralPath $path -Value $case.Json -Encoding UTF8
        $before = $counterV2TestState.Calls
        $result = & $reader -ConfigPath $path
        Assert-True ($result.Status -eq $case.Expected) ("Wrong config status: " + $case.Expected)
        Assert-True ($null -eq $result.WebsitePageViews -and $null -eq $result.WebsiteVisits) "Unavailable metrics must be null"
        Assert-True ($counterV2TestState.Calls -eq $before -and -not $result.ReadVerified) "Invalid/disabled config must not call API"
    }
    Set-Content -LiteralPath $path -Value $valid -Encoding UTF8
    $before = $counterV2TestState.Calls
    $result = & $reader -ConfigPath $path -ConfigurationOnly
    Assert-True ($result.Status -eq "configured" -and $counterV2TestState.Calls -eq $before) "ConfigurationOnly must be offline"
    $result = & $reader -ConfigPath $path
    Assert-True ($result.Status -eq "available" -and $result.WebsitePageViews -eq 10) ("V2 net count not read correctly: " + ($result | ConvertTo-Json -Compress))
    Assert-True ($result.ReadVerified -and -not $result.CollectionVerified -and $null -eq $result.WebsiteVisits) "Read must not imply collection or unique visitors"
    $counterV2TestState.ResponseJson = '{"code":200,"data":{"up_count":0,"down_count":0}}'
    $result = & $reader -ConfigPath $path
    Assert-True ($null -ne $result.WebsitePageViews -and $result.WebsitePageViews -eq 0 -and $result.ReadVerified) "Real zero must stay zero"
    foreach ($json in @('{}', '{"count":10}', '{"code":"200","data":{}}',
        '{"code":"200","data":{"up_count":null,"down_count":0}}',
        '{"code":"200","data":{"up_count":"4","down_count":0}}',
        '{"code":"200","data":{"up_count":true,"down_count":0}}',
        '{"code":"200","data":{"up_count":1.5,"down_count":0}}',
        '{"code":"200","data":{"up_count":0,"down_count":1}}',
        '{"code":"200","data":{"up_count":9007199254740992,"down_count":0}}',
        '{"code":"404","data":{"up_count":1,"down_count":0}}')) {
        $counterV2TestState.ResponseJson = $json
        $result = & $reader -ConfigPath $path
        Assert-True ($result.Status -eq "invalid_response" -and $null -eq $result.WebsitePageViews) "Malformed response became a count"
    }
    foreach ($case in @(@(400, "request_rejected"), @(401, "authentication_required"), @(403, "authentication_required"),
        @(404, "not_found"), @(429, "rate_limited"), @(503, "service_error"), @(-1, "request_failed"))) {
        $counterV2TestState.Status = $case[0]
        $before = $counterV2TestState.Calls
        $result = & $reader -ConfigPath $path
        Assert-True ($result.Status -eq $case[1] -and $null -eq $result.WebsitePageViews) ("Wrong error status " + $case[0])
        Assert-True ($counterV2TestState.Calls -eq $before + 1 -and -not $result.ReadVerified) "Error must not retry or invent success"
    }
    $counterV2TestState.Status = 0
    $counterV2TestState.ResponseJson = '{"code":"200","data":{"up_count":12,"down_count":2}}'
    Set-Content -LiteralPath $path -Value ($valid.Replace('"enabled":true', '"enabled":false')) -Encoding UTF8
    $result = & $reader -ConfigPath $path -Probe
    Assert-True ($result.ReadVerified -and -not $result.CollectionEnabled -and $result.WebsitePageViews -eq 10) "Probe must read without enabling collection"
    Remove-Item -LiteralPath $path
    $result = & $reader -ConfigPath $path
    Assert-True ($result.Status -eq "configuration_error" -and $null -eq $result.WebsitePageViews) "Missing file must not become zero"

    $output = @(& (Join-Path $PSScriptRoot "get-site-stats.ps1") -Probe)
    $summary = @($output | Where-Object { $_.PSObject.Properties.Name -contains "WebsiteAnalyticsStatus" })
    Assert-True ($summary.Count -eq 1 -and $summary[0].WebsitePageViews -eq 10) "Stats integration lost V2 value"
    Assert-True ($summary[0].FullPackageDownloads -eq 7) "Updates or LGPL ZIP counted as full packages"
    $friendly = & (Join-Path $PSScriptRoot "get-site-stats.ps1") -Probe -Friendly 6>&1 | Out-String
    Assert-True ($friendly -match "CounterAPI V2" -and $friendly -match "10 次") "Friendly output lost counter value"
    $counterV2TestState.Status = 404
    $friendly = & (Join-Path $PSScriptRoot "get-site-stats.ps1") -Probe -Friendly 6>&1 | Out-String
    Assert-True ($friendly -match "不是 0 人或 0 次" -and $friendly -match "完整安裝包下載") "Counter error must not block download stats"

    [Console]::OutputEncoding = New-Object Text.UTF8Encoding($false)
    $OutputEncoding = [Console]::OutputEncoding
    Push-Location $root
    try {
        $cmdOutput = & cmd.exe /d /c 'echo. | call ".\查看網站統計.cmd" -AnalyticsOnly -ConfigurationOnly' 2>&1 | Out-String
        Assert-True ($LASTEXITCODE -eq 0) "CMD wrapper failed"
        Assert-True ($cmdOutput -match "CounterAPI V2") "CMD did not run V2 stats"
        Assert-True ($cmdOutput -match "不是 0 人或 0 次") "CMD did not preserve Chinese output"
    } finally { Pop-Location }
}
finally { Remove-Item -LiteralPath $fixture -Recurse -Force }
Write-Host ("CounterAPI V2 PowerShell 5.1 assertions passed: {0}" -f $counterV2TestState.Assertions)
