[CmdletBinding()]
param([string]$ConfigurationPath = (Join-Path $env:LOCALAPPDATA 'S3S/R2Analytics/credentials.clixml'))
$ErrorActionPreference = 'Stop'
$directory = Split-Path -Parent ([IO.Path]::GetFullPath($ConfigurationPath))
if (-not (Test-Path -LiteralPath $directory)) { [void][IO.Directory]::CreateDirectory($directory) }
$identity = [Security.Principal.WindowsIdentity]::GetCurrent().User
$acl = New-Object Security.AccessControl.DirectorySecurity
$acl.SetAccessRuleProtection($true, $false)
foreach ($sid in @($identity, (New-Object Security.Principal.SecurityIdentifier('S-1-5-18')))) {
    $rule = New-Object Security.AccessControl.FileSystemAccessRule($sid,'FullControl','ContainerInherit, ObjectInherit','None','Allow')
    $acl.AddAccessRule($rule)
}
Set-Acl -LiteralPath $directory -AclObject $acl
$token = Read-Host 'Cloudflare Account Analytics Read API Token (hidden)' -AsSecureString
try {
    [pscustomobject]@{AccountId='6ba6629e21c97abde0e215d23edb237d';Token=$token} | Export-Clixml -LiteralPath $ConfigurationPath
    Write-Host 'Analytics token saved with Windows DPAPI. Run scripts/get-r2-stats.ps1 to verify.'
} finally { $token = $null }
