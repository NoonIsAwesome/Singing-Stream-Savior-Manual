[CmdletBinding()]
param(
    [ValidateRange(1,31)][int]$Days = 1,
    [string]$ConfigurationPath = (Join-Path $env:LOCALAPPDATA 'S3S/R2Analytics/zone-credentials.clixml'),
    [switch]$ConfigurationOnly
)
$ErrorActionPreference = 'Stop'
$end = [DateTimeOffset]::UtcNow
$result = [ordered]@{
    Status='not-configured'; ReadVerified=$false
    FromUtc=$end.AddDays(-$Days).ToString('yyyy-MM-ddTHH:mm:ssZ')
    UntilUtc=$end.ToString('yyyy-MM-ddTHH:mm:ssZ')
    Host='updates.noonisawesome.dev'; Metric='Cloudflare edge GET requests and response bytes by release path'
    Versions=$null
    Detail='Version breakdown needs a local Zone Analytics Read token and Zone ID. Bucket origin metrics cannot identify release versions.'
    Limitation='Adaptive edge aggregates may be sampled/delayed and include cache hits, verification, retries and range requests. HTTP 200/206 and response bytes are not completed downloads, installs or users. Versions with no returned rows are not certified unused.'
}
if ($ConfigurationOnly -or -not (Test-Path -LiteralPath $ConfigurationPath -PathType Leaf)) {
    if ($ConfigurationOnly) { $result.Status='configuration-only' }
    return [pscustomobject]$result
}
$token=$null;$configuration=$null
try {
    $configuration=Import-Clixml -LiteralPath $ConfigurationPath
    if ([string]$configuration.ZoneId -cnotmatch '^[0-9a-f]{32}$' -or
        $configuration.Token -isnot [Security.SecureString]) { throw 'Invalid local zone configuration.' }
    $token=(New-Object Management.Automation.PSCredential('analytics',$configuration.Token)).GetNetworkCredential().Password
    $query=@'
query S3SReleaseDownloads($zoneTag: string!, $startDate: Time!, $endDate: Time!, $hostName: string!) {
  viewer { zones(filter: {zoneTag: $zoneTag}) {
    zoneTag
    httpRequestsAdaptiveGroups(limit: 1000, filter: {
      datetime_geq: $startDate, datetime_lt: $endDate,
      clientRequestHTTPHost: $hostName, clientRequestHTTPMethodName: "GET",
      clientRequestPath_like: "/releases/v%/%", edgeResponseStatus_in: [200,206]
    }) { count sum {edgeResponseBytes} dimensions {clientRequestPath edgeResponseStatus} }
  } }
}
'@
    $body=@{query=$query;variables=@{zoneTag=$configuration.ZoneId;startDate=$result.FromUtc;
        endDate=$result.UntilUtc;hostName=$result.Host}} | ConvertTo-Json -Depth 6 -Compress
    $response=Invoke-RestMethod -Uri 'https://api.cloudflare.com/client/v4/graphql' -Method Post `
        -MaximumRedirection 0 -TimeoutSec 12 -ContentType 'application/json' `
        -Headers @{Authorization=('Bearer '+$token)} -Body $body
    if ($response.errors -or @($response.data.viewer.zones).Count -ne 1) { throw 'Zone analytics query failed.' }
    $zone=@($response.data.viewer.zones)[0]
    if ([string]$zone.zoneTag -cne [string]$configuration.ZoneId -or
        -not $zone.PSObject.Properties['httpRequestsAdaptiveGroups']) { throw 'Wrong zone or missing dataset.' }
    $rows=@($zone.httpRequestsAdaptiveGroups)
    if ($rows.Count -ge 1000) { throw 'Version query reached its row limit.' }
    $versions=@{}
    foreach ($row in $rows) {
        $path=[string]$row.dimensions.clientRequestPath
        if ($path -cnotmatch '^/releases/v(?<version>[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/[^/?#]+$') { throw 'Unexpected release path.' }
        $version=$Matches.version
        [long]$count=0;[long]$bytes=0;[int]$status=0
        if (-not [long]::TryParse([string]$row.count,[ref]$count) -or $count -lt 0 -or
            -not [long]::TryParse([string]$row.sum.edgeResponseBytes,[ref]$bytes) -or $bytes -lt 0 -or
            -not [int]::TryParse([string]$row.dimensions.edgeResponseStatus,[ref]$status) -or
            $status -notin @(200,206)) { throw 'Invalid edge aggregate.' }
        if (-not $versions.ContainsKey($version)) {
            $versions[$version]=[ordered]@{Version=$version;Get200Requests=[long]0;Range206Requests=[long]0;EdgeResponseBytes=[long]0}
        }
        $entry=$versions[$version]
        if ($status -eq 200) { $entry.Get200Requests=[long]($entry.Get200Requests+$count) }
        else { $entry.Range206Requests=[long]($entry.Range206Requests+$count) }
        $entry.EdgeResponseBytes=[long]($entry.EdgeResponseBytes+$bytes)
    }
    $result.Versions=@($versions.Keys | Sort-Object { [version]$_ } -Descending | ForEach-Object { [pscustomobject]$versions[$_] })
    $result.Status='available';$result.ReadVerified=$true
    $result.Detail='Version aggregates read for the displayed UTC period; absence of a version does not prove no downloads.'
} catch {
    $result.Status='unavailable';$result.Versions=$null
    $result.Detail='Version analytics unavailable: check Zone Analytics Read permissions, dataset access and retention. Missing data is not zero.'
} finally { $token=$null;$configuration=$null }
[pscustomobject]$result
