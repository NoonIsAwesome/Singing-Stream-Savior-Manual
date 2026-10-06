$ErrorActionPreference='Stop'
if ($PSVersionTable.PSVersion.Major -ne 5) { throw 'Use Windows PowerShell 5.1.' }
$fixture=Join-Path ([IO.Path]::GetTempPath()) ('s3s-version-stats-'+[guid]::NewGuid().ToString('N'))
[void][IO.Directory]::CreateDirectory($fixture)
$configuration=Join-Path $fixture 'credentials.clixml';[IO.File]::WriteAllText($configuration,'fixture')
$state=@{calls=0;mode='ok'};$count=0
function Import-Clixml { param($LiteralPath)
    [pscustomobject]@{ZoneId='1234567890abcdef1234567890abcdef';Token=(ConvertTo-SecureString 'FIXTURE_ONLY_CANARY' -AsPlainText -Force)}
}
function Invoke-RestMethod { param($Uri,$Method,$MaximumRedirection,$TimeoutSec,$ContentType,$Headers,$Body)
    $state.calls++
    if ($Uri -cne 'https://api.cloudflare.com/client/v4/graphql' -or $Method -cne 'Post' -or
        $MaximumRedirection -ne 0 -or $TimeoutSec -ne 12) { throw 'Invalid endpoint or transport policy.' }
    $query=$Body|ConvertFrom-Json
    if ($query.variables.zoneTag -cne '1234567890abcdef1234567890abcdef' -or
        $query.variables.hostName -cne 'updates.noonisawesome.dev' -or
        $query.query -notmatch 'clientRequestHTTPMethodName: "GET"' -or
        $query.query -notmatch 'edgeResponseStatus_in: \[200,206\]' -or
        $query.query -match 'clientIP|userAgent|referer|cookie') { throw 'Wrong analytics or privacy scope.' }
    if ($state.mode -eq 'offline') { throw 'FAKE_SENSITIVE_ERROR_DO_NOT_RETURN' }
    if ($state.mode -eq 'errors') { return @{errors=@(@{message='FAKE_SENSITIVE_ERROR_DO_NOT_RETURN'})} }
    $rows=@(
        @{count=4;sum=@{edgeResponseBytes=1000};dimensions=@{clientRequestPath='/releases/v2.1.8.0/Singing.Stream.Savior.2.1.8.0.zip';edgeResponseStatus=200}},
        @{count=3;sum=@{edgeResponseBytes=150};dimensions=@{clientRequestPath='/releases/v2.1.8.0/Patch-runtime.s3spack';edgeResponseStatus=206}},
        @{count=2;sum=@{edgeResponseBytes=400};dimensions=@{clientRequestPath='/releases/v2.1.7.4/Singing.Stream.Savior.2.1.7.4.zip';edgeResponseStatus=200}})
    if ($state.mode -eq 'zero') { $rows=@() }
    if ($state.mode -eq 'invalid') { $rows[0].count=-1 }
    if ($state.mode -eq 'wrong-path') { $rows[0].dimensions.clientRequestPath='/updates/stable.json' }
    if ($state.mode -eq 'wrong-status') { $rows[0].dimensions.edgeResponseStatus=404 }
    if ($state.mode -eq 'saturated') { $rows=@(1..1000 | ForEach-Object { $rows[0] }) }
    $zone=[pscustomobject]@{zoneTag='1234567890abcdef1234567890abcdef';httpRequestsAdaptiveGroups=$rows}
    if ($state.mode -eq 'wrong-zone') { $zone.zoneTag='00000000000000000000000000000000' }
    if ($state.mode -eq 'missing') { $zone=[pscustomobject]@{zoneTag='1234567890abcdef1234567890abcdef'} }
    return @{data=@{viewer=@{zones=@($zone)}}}
}
function Check([bool]$Ok,[string]$Label) { if (-not $Ok) { throw ('FAIL '+$Label) };$script:count++;Write-Output ('PASS '+$Label) }
$scriptPath=Join-Path $PSScriptRoot 'get-r2-version-stats.ps1'
$result=& $scriptPath -ConfigurationPath $configuration
Check ($result.ReadVerified -and $result.Versions.Count -eq 2) 'two release versions remain separate'
Check ($result.Versions[0].Version -ceq '2.1.8.0' -and $result.Versions[0].Get200Requests -eq 4 -and
    $result.Versions[0].Range206Requests -eq 3 -and $result.Versions[0].EdgeResponseBytes -eq 1150) 'ranges and edge bytes are not counted as completed downloads'
Check ($result.Limitation -match 'sampled' -and $result.Limitation -match 'cache hits' -and
    $result.Limitation -match 'not certified unused') 'uncertainty and cached requests remain explicit'
foreach ($mode in @('offline','errors','missing','invalid','wrong-path','wrong-status','wrong-zone','saturated')) {
    $state.mode=$mode;$result=& $scriptPath -ConfigurationPath $configuration
    Check (-not $result.ReadVerified -and $null -eq $result.Versions -and $result.Status -ceq 'unavailable') ('missing or invalid data is not zero: '+$mode)
    Check (($result|ConvertTo-Json -Depth 5) -notmatch 'CANARY|SENSITIVE') 'credential and raw errors never returned'
}
$state.mode='zero';$result=& $scriptPath -ConfigurationPath $configuration
Check ($result.ReadVerified -and @($result.Versions).Count -eq 0) 'confirmed empty dataset remains an empty observation'
$before=$state.calls
$result=& $scriptPath -ConfigurationPath $configuration -ConfigurationOnly
Check ($state.calls -eq $before -and $result.Status -ceq 'configuration-only') 'configuration-only makes no request'
$result=& $scriptPath -ConfigurationPath (Join-Path $fixture 'missing.clixml')
Check ($state.calls -eq $before -and $result.Status -ceq 'not-configured' -and $null -eq $result.Versions) 'missing credential makes no request and reports no fabricated zeros'
Write-Output "R2_VERSION_STATS_CONTRACT_PASS checks=$count"
