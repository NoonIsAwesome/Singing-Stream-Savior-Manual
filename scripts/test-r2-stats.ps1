$ErrorActionPreference='Stop'
if($PSVersionTable.PSVersion.Major -ne 5){throw 'Use Windows PowerShell 5.1.'}
$fixture=Join-Path ([IO.Path]::GetTempPath()) ('s3s-r2-stats-'+[Guid]::NewGuid().ToString('N'))
[void][IO.Directory]::CreateDirectory($fixture)
$configuration=Join-Path $fixture 'credentials.clixml'
[IO.File]::WriteAllText($configuration,'fixture')
$state=@{calls=0;mode='ok'}
function Import-Clixml { param($LiteralPath)
    [pscustomobject]@{AccountId='6ba6629e21c97abde0e215d23edb237d';Token=(ConvertTo-SecureString 'FIXTURE_ONLY_CANARY' -AsPlainText -Force)}
}
function Invoke-RestMethod { param($Uri,$Method,$MaximumRedirection,$TimeoutSec,$ContentType,$Headers,$Body)
    $state.calls++
    if($Uri -cne 'https://api.cloudflare.com/client/v4/graphql' -or $Method -cne 'Post' -or $MaximumRedirection -ne 0 -or $TimeoutSec -ne 12){throw 'Invalid analytics endpoint/policy.'}
    $query=$Body|ConvertFrom-Json
    if($query.variables.bucketName -cne 'singing-stream-savior-updates' -or $query.variables.accountTag -cne '6ba6629e21c97abde0e215d23edb237d'){throw 'Wrong analytics scope.'}
    if($state.mode -eq 'offline'){throw 'FAKE_SENSITIVE_ERROR_DO_NOT_RETURN'}
    if($state.mode -eq 'errors'){return @{errors=@(@{message='FAKE_SENSITIVE_ERROR_DO_NOT_RETURN'})}}
    if($state.mode -eq 'missing'){return @{data=@{viewer=@{accounts=@(@{})}}}}
    $ops=@(@{sum=@{requests=9};dimensions=@{actionType='GetObject';actionStatus='success'}},@{sum=@{requests=3};dimensions=@{actionType='GetObject';actionStatus='userError'}},@{sum=@{requests=4};dimensions=@{actionType='HeadObject';actionStatus='success'}})
    $bandwidth=@(@{sum=@{bytesDownload=1048576}},@{sum=@{bytesDownload=524288}})
    if($state.mode -eq 'zero'){$ops=@();$bandwidth=@()}
    if($state.mode -eq 'invalid'){$ops[0].sum.requests=-1}
    return @{data=@{viewer=@{accounts=@([pscustomobject]@{r2OperationsAdaptiveGroups=$ops;r2BandwidthUsageAdaptiveGroups=$bandwidth})}}}
}
function Check([bool]$Ok,[string]$Description){if(-not $Ok){throw $Description};Write-Output ('PASS '+$Description)}
$script=Join-Path $PSScriptRoot 'get-r2-stats.ps1'
$result=& $script -ConfigurationPath $configuration
Check ($result.ReadVerified -and $result.Requests -eq 16 -and $result.SuccessfulGetRequests -eq 9 -and $result.DownloadBytes -eq 1572864) 'origin metrics aggregate separately'
Check ($result.Limitation -match 'CDN' -and $result.Limitation -match '100 KiB') 'metric limits stay visible'
foreach($mode in @('offline','errors','missing','invalid')){
    $state.mode=$mode;$result=& $script -ConfigurationPath $configuration
    Check (-not $result.ReadVerified -and $null -eq $result.Requests -and $null -eq $result.DownloadBytes) ('unavailable is not zero: '+$mode)
    Check (($result|ConvertTo-Json) -notmatch 'SENSITIVE|CANARY') 'sensitive error redacted'
}
$state.mode='zero';$result=& $script -ConfigurationPath $configuration
Check ($result.ReadVerified -and $result.Requests -eq 0 -and $result.DownloadBytes -eq 0) 'confirmed empty dataset reports zero'
$before=$state.calls
$result=& $script -ConfigurationPath $configuration -ConfigurationOnly
Check ($state.calls -eq $before -and -not $result.ReadVerified) 'configuration check makes no request'
$result=& $script -ConfigurationPath (Join-Path $fixture 'missing.clixml')
Check ($state.calls -eq $before -and $result.Status -eq 'not-configured') 'missing credential makes no request'
Write-Output 'R2_STATS_CONTRACT_PASS'
