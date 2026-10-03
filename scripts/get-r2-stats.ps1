[CmdletBinding()]
param(
    [ValidateRange(1,31)][int]$Days = 7,
    [string]$ConfigurationPath = (Join-Path $env:LOCALAPPDATA 'S3S/R2Analytics/credentials.clixml'),
    [switch]$ConfigurationOnly
)
$ErrorActionPreference = 'Stop'
$end = [DateTimeOffset]::UtcNow
$result = [ordered]@{
    Status = 'not-configured'; ReadVerified = $false
    FromUtc = $end.AddDays(-$Days).ToString('yyyy-MM-ddTHH:mm:ssZ')
    UntilUtc = $end.ToString('yyyy-MM-ddTHH:mm:ssZ')
    Bucket = 'singing-stream-savior-updates'
    Requests = $null; SuccessfulGetRequests = $null; DownloadBytes = $null
    Detail = 'R2 statistics need a local Account Analytics Read API Token.'
    DashboardUrl = 'https://dash.cloudflare.com/6ba6629e21c97abde0e215d23edb237d/r2/default/buckets/singing-stream-savior-updates/metrics'
    Limitation = 'R2 origin requests include probes/retries and exclude CDN cache hits; bandwidth excludes transfers below 100 KiB. Neither is completed downloads, updates or users.'
}
if ($ConfigurationOnly -or -not (Test-Path -LiteralPath $ConfigurationPath -PathType Leaf)) {
    if ($ConfigurationOnly) { $result.Status = 'configuration-only' }
    return [pscustomobject]$result
}
try {
    $configuration = Import-Clixml -LiteralPath $ConfigurationPath
    if ($configuration.AccountId -cne '6ba6629e21c97abde0e215d23edb237d' -or
        $configuration.Token -isnot [Security.SecureString]) { throw 'Invalid local configuration.' }
    $token = (New-Object Management.Automation.PSCredential('analytics', $configuration.Token)).GetNetworkCredential().Password
    $query = @'
query S3SR2($accountTag: string!, $startDate: Time!, $endDate: Time!, $bucketName: string!) {
  viewer { accounts(filter: {accountTag: $accountTag}) {
    r2OperationsAdaptiveGroups(limit: 10000, filter: {datetime_geq: $startDate, datetime_lt: $endDate, bucketName: $bucketName}) {
      sum { requests } dimensions { actionType actionStatus }
    }
    r2BandwidthUsageAdaptiveGroups(limit: 1000, filter: {datetime_geq: $startDate, datetime_lt: $endDate, bucketName: $bucketName}) {
      sum { bytesDownload }
    }
  } }
}
'@
    $body = @{query=$query;variables=@{accountTag=$configuration.AccountId;startDate=$result.FromUtc;endDate=$result.UntilUtc;bucketName=$result.Bucket}} | ConvertTo-Json -Depth 6 -Compress
    $response = Invoke-RestMethod -Uri 'https://api.cloudflare.com/client/v4/graphql' -Method Post -MaximumRedirection 0 -TimeoutSec 12 -ContentType 'application/json' -Headers @{Authorization=('Bearer '+$token)} -Body $body
    if ($response.errors -or @($response.data.viewer.accounts).Count -ne 1) { throw 'Analytics query failed.' }
    $account = @($response.data.viewer.accounts)[0]
    if (-not $account.PSObject.Properties['r2OperationsAdaptiveGroups'] -or
        -not $account.PSObject.Properties['r2BandwidthUsageAdaptiveGroups']) { throw 'Missing analytics dataset.' }
    [long]$requests = 0; [long]$gets = 0; [long]$bytes = 0
    foreach ($row in @($account.r2OperationsAdaptiveGroups)) {
        [long]$count = 0
        if (-not [long]::TryParse([string]$row.sum.requests, [ref]$count) -or $count -lt 0) { throw 'Invalid request count.' }
        $requests += $count
        if ($row.dimensions.actionType -ceq 'GetObject' -and $row.dimensions.actionStatus -ceq 'success') { $gets += $count }
    }
    foreach ($row in @($account.r2BandwidthUsageAdaptiveGroups)) {
        [long]$count = 0
        if (-not [long]::TryParse([string]$row.sum.bytesDownload, [ref]$count) -or $count -lt 0) { throw 'Invalid bandwidth count.' }
        $bytes += $count
    }
    $result.Requests = $requests; $result.SuccessfulGetRequests = $gets; $result.DownloadBytes = $bytes
    $result.Status = 'available'; $result.ReadVerified = $true
    $result.Detail = 'R2 origin analytics read successfully for the displayed UTC period.'
} catch {
    $result.Status = 'unavailable'
    $result.Detail = 'R2 analytics unavailable; check token permissions and connection. Missing values are not zero.'
} finally { $token = $null; $configuration = $null }
[pscustomobject]$result
