# R2 request statistics

The existing website counter counts approved GitHub/R2 **download clicks**. R2 origin requests and bytes are separate metrics, never added to GitHub downloads as users or completed updates.

1. In Cloudflare **My Profile → API Tokens → Create Custom Token**, add **Account → Account Analytics → Read** and limit account resources to the account hosting `singing-stream-savior-updates`. This is a Cloudflare API token, not an R2 S3 Access Key. Do not grant write/admin permissions.
2. Run `powershell.exe -NoProfile -File scripts/configure-r2-analytics.ps1`. Enter the token only at the hidden local prompt. DPAPI and directory ACL restrict the saved credential to this Windows account and SYSTEM. Never put it in Git or screenshots.
3. Run `powershell.exe -NoProfile -File scripts/get-site-stats.ps1 -Friendly`. Optional `-R2Days 7` accepts 1–31 days. The existing `.cmd` wrapper passes this parameter through.

No Worker or client telemetry is added. Missing credentials, API errors and permission failures display unavailable values, not zero. ConfigurationOnly makes no R2 request. GraphQL response errors are redacted.

These are R2 **origin** statistics: CDN cache hits are excluded; probes, retries, Range requests and publisher verification can be included. Bandwidth excludes transfers smaller than 100 KiB. Successful GetObject is not proof of a completed download or installation. Cloudflare may adaptively sample analytics. The displayed UTC period is a moving window, not an all-time total.

For all public edge requests, use Cloudflare domain Analytics filtered to `updates.noonisawesome.dev`; that is a different dataset from the bucket's Metrics tab. Update-success events would require a separately designed service and are not enabled.

[Official R2 metrics and GraphQL examples](https://developers.cloudflare.com/r2/platform/metrics-analytics/)
