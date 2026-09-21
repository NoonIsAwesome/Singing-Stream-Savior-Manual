# App privacy scope and search-flow verification

Updated 2026-09-21. Maintenance record only; scripts/ is excluded from GitHub Pages.

## Latest owner instruction

Keep the public notice focused on the desktop app and launcher. Remove the separately added website-privacy pages, their footer entry, and displayed website statistics/vendor references. Keep the app's actual LRCLIB and cover-search explanations and project links in all five languages.

This is a presentation/scope change, NOT a claim that the website sends no requests or that third-party providers retain no data. Both website counters, their enabled configurations, JavaScript, privacy opt-out behavior and the owner's read-only statistics scripts remain unchanged. The public app notice is explicitly limited to desktop app/launcher. This work is not a legal-compliance determination.

## Code verified

Compared the relevant files in Singing-Stream-Savior master `edadf66438ec4e7cd87409e1e78951e8bd44c7ca` and the 2.1.5.4 stability snapshot `7e3107456f9d41c3ec7e371bdbe91ed722021b0b`. The checked cover coordinator, cover dialog, MusicBrainz client and LRCLIB client have matching blob hashes.

- `BGMSavior/lyrics/LrcLibClient.cpp`: trims actual query; GET `https://lrclib.net/api/search?q=...`, with application User-Agent; parses returned candidates. The query is not hard-restricted to title-only.
- `BGMSavior/media/OnlineLookupFlowPolicy.h`: preferred/original text queries preserve artist/feature text; do not claim all extra text is stripped.
- `BGMSavior/media/CoverArtDialog.cpp::prefillSearchFields/onSearch`: local TagLib title/artist, suggested title or basename fallback, editable fields to coordinator.
- `BGMSavior/media/CoverArtSearchCoordinator.cpp`: production default is MusicBrainzCoverArtProvider only. Do not list unused TheAudioDb provider/test injection as the active default.
- `BGMSavior/media/MusicBrainzCoverArtClient.cpp`: MusicBrainz recording search with title and optional artist; release/release-group IDs for Cover Art Archive availability and images; local cache.
- `BGMSavior/lyrics/AutomaticLyricsLookupCoordinator.cpp`: optional automatic lookup includes local tracks; YouTube subtitle paths are distinct from LRCLIB keyword search.

This verifies these lookup paths, not every network request in the OS, all app versions, or third-party plug-ins. No-developer-upload wording describes direct query flow, not a third-party retention guarantee or unrelated user-submitted support data.

## Project references retained

- LRCLIB: https://github.com/tranxuanthang/lrclib ; API: https://lrclib.net/docs
- MusicBrainz server: https://github.com/metabrainz/musicbrainz-server
- Cover Art Archive: https://musicbrainz.org/doc/Cover_Art_Archive/API
- TagLib (local metadata library): https://github.com/taglib/taglib

Do not imply Picard, libcoverart or unrelated API wrappers are linked into the app. Open-source code, public database access and image/lyric usage rights are different concepts.

## Validation

Existing JavaScript, full Jekyll, analytics configuration and real Windows PowerShell/CMD checks remain in place. `validate-privacy.mjs` checks five app notices, no published website-privacy pages or stale footer/sitemap links, exact project links, localization, app-only layout and six negative cases. It checks displayed text separately from operational counter code, which intentionally remains present.

Deployment verification is read-only: use analytics=off and block all counter requests in browser checks. No Release asset downloads or counter increment/reset/decrement is needed for this documentation-only change.
