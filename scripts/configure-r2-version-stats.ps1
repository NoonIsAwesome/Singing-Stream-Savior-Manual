[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][ValidatePattern('^[0-9a-f]{32}$')][string]$ZoneId,
    [string]$ConfigurationPath=(Join-Path $env:LOCALAPPDATA 'S3S/R2Analytics/zone-credentials.clixml')
)
$ErrorActionPreference='Stop'
# Run locally in an interactive PowerShell. Never paste a token into chat,
# arguments, source code, logs or public configuration files.
$token=Read-Host 'Cloudflare API token with Zone Analytics Read for noonisawesome.dev' -AsSecureString
try {
    if ($token.Length -eq 0) { throw 'Token is empty.' }
    $directory=Split-Path -Parent ([IO.Path]::GetFullPath($ConfigurationPath))
    [void][IO.Directory]::CreateDirectory($directory)
    [pscustomobject]@{ZoneId=$ZoneId;Token=$token} | Export-Clixml -LiteralPath $ConfigurationPath
    Write-Output 'Local Windows-encrypted zone analytics configuration saved. No Cloudflare permissions were changed.'
} finally { $token=$null }
