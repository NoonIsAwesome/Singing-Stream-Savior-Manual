# R2 download traffic by release version

The existing bucket statistics measure R2 origin operations and bandwidth across
all versions. They cannot establish whether a specific release has users.
The new reader uses Cloudflare zone HTTP analytics for the fixed hostname
`updates.noonisawesome.dev`, grouped by `/releases/v<version>/<asset>`.
It includes edge/cache requests and reports HTTP 200 and 206 separately.
It does not collect IP addresses, account identifiers, cookies or user agents.

## Local configuration

The current bucket-only analytics credential cannot discover/read the zone.
Live version statistics remain **not configured**; offline fixtures are not
production data. Leave the existing bucket credential unchanged.

Create a separate Cloudflare API token with **Zone / Analytics / Read**, restricted
to the `noonisawesome.dev` zone. Use the zone ID from that zone's dashboard.
Then run in an interactive Windows PowerShell on the maintainer's computer:

```powershell
.\scripts\configure-r2-version-stats.ps1 -ZoneId '<32-character zone ID>'
.\scripts\get-r2-version-stats.ps1 -Days 1
.\scripts\get-site-stats.ps1 -Friendly -R2VersionDays 1
```

Enter the token only at the secure local prompt. It is saved as a Windows-encrypted
SecureString in `%LOCALAPPDATA%\S3S\R2Analytics\zone-credentials.clixml`, not in
this repository or chat. The scripts do not create tokens or change permissions.
Dataset access and retention depend on the Cloudflare plan; default to one day.
API errors, unsupported datasets, wrong zones, malformed counts and saturated
result sets return unavailable, with no invented zeros or sensitive errors.

## Reading the result

- `Version`: product version parsed from the release directory, independent of
  individual component versions in asset filenames.
- `Get200Requests`: successful full-response requests, including probes/retries.
- `Range206Requests`: partial/range requests, kept separate.
- `EdgeResponseBytes`: aggregate response traffic observed at the edge.

These are adaptive, possibly sampled or delayed HTTP observations. They are not
completed downloads, successful installations or unique users. A version missing
from the returned rows is not proof that nobody downloaded it. Stable manifests
outside the versioned release directory are excluded. No download URL, cache,
Worker route or published asset is changed by these readers.

`scripts/test-r2-version-stats.ps1` passes 22 isolated Windows PowerShell 5.1 checks.
Existing bucket/click readers retain their separate metrics. Live validation is
pending local configuration at the user's request.
