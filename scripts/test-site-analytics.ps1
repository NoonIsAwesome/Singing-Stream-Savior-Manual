$ErrorActionPreference = "Stop"
$script:assertions = 0
function Assert-True {
    param([bool]$Condition, [string]$Message)
    if (-not $Condition) { throw $Message }
    $script:assertions++
}
Assert-True ($PSVersionTable.PSVersion.Major -eq 5) "Run with Windows PowerShell 5.1, not pwsh."
$root = Split-Path $PSScriptRoot -Parent
foreach ($name in @("get-site-analytics.ps1", "get-site-stats.ps1", "test-site-analytics.ps1")) {
    $path = Join-Path $PSScriptRoot $name
    $bytes = [IO.File]::ReadAllBytes($path)
    Assert-True ($bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191) "$name needs UTF-8 BOM"
    $tokens = $null
    $parseErrors = $null
    $null = [System.Management.Automation.Language.Parser]::ParseFile($path, [ref]$tokens, [ref]$parseErrors)
    Assert-True ($parseErrors.Count -eq 0) "$name has PowerShell parse errors"
}
$fixture = Join-Path ([IO.Path]::GetTempPath()) ("s3s-analytics-" + [Guid]::NewGuid().ToString("N"))
$null = New-Item -ItemType Directory -Path $fixture
$path = Join-Path $fixture "analytics.json"
$token = "0123456789abcdef0123456789abcdef"
try {
    $cases = @(
        @{ Json = '{"provider":"cloudflare","production_host":"noonisawesome.github.io","cloudflare_token":""}'; Expected = "not_configured" },
        @{ Json = '{"provider":"cloudflare","production_host":"noonisawesome.github.io","cloudflare_token":"   "}'; Expected = "not_configured" },
        @{ Json = ('{"provider":"cloudflare","production_host":"noonisawesome.github.io","cloudflare_token":"' + $token + '"}'); Expected = "configured" },
        @{ Json = '{"provider":"cloudflare","production_host":"noonisawesome.github.io","cloudflare_token":"INVALID"}'; Expected = "invalid_token" },
        @{ Json = '{"provider":"cloudflare","production_host":"https://example.com/x","cloudflare_token":""}'; Expected = "configuration_error" },
        @{ Json = '{"provider":"other","production_host":"noonisawesome.github.io","cloudflare_token":""}'; Expected = "configuration_error" },
        @{ Json = '{"provider":"cloudflare","production_host":"noonisawesome.github.io","cloudflare_token":123}'; Expected = "configuration_error" },
        @{ Json = '{}'; Expected = "configuration_error" },
        @{ Json = '[]'; Expected = "configuration_error" },
        @{ Json = '{broken'; Expected = "configuration_error" }
    )
    foreach ($case in $cases) {
        Set-Content -LiteralPath $path -Value $case.Json -Encoding UTF8
        $result = & (Join-Path $PSScriptRoot "get-site-analytics.ps1") -ConfigPath $path
        Assert-True ($result.Status -eq $case.Expected) ("Unexpected status: " + $case.Expected)
        Assert-True ($null -eq $result.WebsitePageViews -and $null -eq $result.WebsiteVisits) "Unavailable metrics must remain null"
        Assert-True (-not $result.CollectionVerified) "Configuration does not verify ingestion"
        Assert-True (($result | ConvertTo-Json) -notmatch $token) "Never print the site token"
    }
    Remove-Item -LiteralPath $path
    $missing = & (Join-Path $PSScriptRoot "get-site-analytics.ps1") -ConfigPath $path
    Assert-True ($missing.Status -eq "configuration_error" -and $null -eq $missing.WebsitePageViews) "Missing config must not become zero views"

    # Full stats integration without network calls or release-asset downloads.
    function Invoke-RestMethod {
        param($Uri, $Headers, $Method)
        if ($Uri -notlike 'https://api.github.com/repos/NoonIsAwesome/Singing-Stream-Savior-Updates/releases*') {
            throw "Unexpected network endpoint"
        }
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
    $output = @(& (Join-Path $PSScriptRoot "get-site-stats.ps1"))
    $summary = @($output | Where-Object { $_.PSObject.Properties.Name -contains "WebsiteAnalyticsStatus" })
    Assert-True ($summary.Count -eq 1) "Stats summary missing"
    Assert-True ($null -eq $summary[0].WebsitePageViews) "Stats summary must not invent zero"
    Assert-True ($summary[0].FullPackageDownloads -eq 7) "LGPL ZIP or update downloads counted as full packages"
    $friendly = & (Join-Path $PSScriptRoot "get-site-stats.ps1") -Friendly 6>&1 | Out-String
    Assert-True ($friendly -match "Cloudflare Web Analytics") "Friendly output missing analytics provider"
    Assert-True ($friendly -match "不是 0 人或 0 次") "Friendly output missing unknown-data explanation"
    $only = & (Join-Path $PSScriptRoot "get-site-stats.ps1") -AnalyticsOnly
    Assert-True ($null -eq $only.WebsitePageViews -and -not $only.CollectionVerified) "AnalyticsOnly invented a measurement"

    # Exercise the real wrapper and a child Windows PowerShell 5.1 process offline.
    # The wrapper's forwarded -AnalyticsOnly skips GitHub and the vendor entirely.
    [Console]::OutputEncoding = New-Object Text.UTF8Encoding($false)
    $OutputEncoding = [Console]::OutputEncoding
    Push-Location $root
    try {
        $cmdOutput = & cmd.exe /d /c 'echo. | call ".\查看網站統計.cmd" -AnalyticsOnly' 2>&1 | Out-String
        Assert-True ($LASTEXITCODE -eq 0) "CMD wrapper failed"
        Assert-True ($cmdOutput -match "Cloudflare Web Analytics") "CMD did not run the analytics status script"
        Assert-True ($cmdOutput -match "不是 0 人或 0 次") "CMD did not preserve Chinese output"
    }
    finally { Pop-Location }
}
finally { Remove-Item -LiteralPath $fixture -Recurse -Force }
Write-Host ("Analytics PowerShell 5.1 assertions passed: {0}" -f $script:assertions)
