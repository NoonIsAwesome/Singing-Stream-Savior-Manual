# Privacy notice scope and search-flow verification

Updated 2026-09-21. This is a maintenance record, excluded from GitHub Pages.

## Owner-requested scope

- `/privacy.html` and its five-language equivalents cover only the desktop app and launcher.
- Emphasize local processing, no automatic uploads of songs/recordings/projects to the developer, and offline-capable core functions.
- Website counters and theme storage are explained separately at `/website-privacy.html`, not in app copy. Both are discoverable in localized footers.
- Neither analytics config, either counter script, nor the actual search implementation is changed by this documentation work.
- No claim that open-source providers keep no service logs or that every optional network feature sends no data.

## Code verified

Compared relevant code in `NoonIsAwesome/Singing-Stream-Savior` master `edadf66438ec4e7cd87409e1e78951e8bd44c7ca` and the 2.1.5.4 stability snapshot `7e3107456f9d41c3ec7e371bdbe91ed722021b0b`.
The checked cover coordinator, cover dialog, MusicBrainz client and LRCLIB client have matching blob hashes in those snapshots.

- `BGMSavior/lyrics/LrcLibClient.cpp`: trims the actual query; GET `https://lrclib.net/api/search?q=...`, with application User-Agent; parses returned lyrics candidates. The query is not hard-restricted to title-only.
- `BGMSavior/media/OnlineLookupFlowPolicy.h`: builds preferred/original text queries, preserving artist/feature text; do not claim that all extra text is stripped.
- `BGMSavior/media/CoverArtDialog.cpp::prefillSearchFields/onSearch`: local TagLib title/artist; suggested title or basename fallback; editable fields sent to coordinator.
- `BGMSavior/media/CoverArtSearchCoordinator.cpp`: production default is MusicBrainzCoverArtProvider only. Do not present unused TheAudioDb provider code or test injection as the active default.
- `BGMSavior/media/MusicBrainzCoverArtClient.cpp`: GET MusicBrainz recording search with title and optional artist; returned release/release-group IDs used for Cover Art Archive availability and image downloads; local cache.
- `BGMSavior/lyrics/AutomaticLyricsLookupCoordinator.cpp`: optional automatic lookup includes local tracks, and YouTube subtitle paths are distinct from LRCLIB keyword search.

This checks these search paths, not all networking in the application, operating system, third-party plug-ins, or all later branches. The notice's no-developer-upload wording describes the app's direct query flow, not a guarantee about third-party retention or unrelated user-submitted support data.

## Public project references

- LRCLIB server: https://github.com/tranxuanthang/lrclib
- LRCLIB API: https://lrclib.net/docs
- MusicBrainz server: https://github.com/metabrainz/musicbrainz-server
- Cover Art Archive service/API: https://musicbrainz.org/doc/Cover_Art_Archive/API
- TagLib local metadata library: https://github.com/taglib/taglib

Do not claim that MusicBrainz Picard, libcoverart, or an unrelated API wrapper is linked into this app just because it is part of the same ecosystem. CAA is identified as the MusicBrainz/Internet Archive artwork service, with official documentation rather than an unverified repository URL. Open-source code and publicly accessible music data are different concepts; image/lyric rights are not waived.

## Validation

The existing Actions invoke `scripts/validate-privacy.mjs` for source and rendered output. Checks cover separate scopes, five translations for each notice, four negative fixtures, project links, standalone layouts, language navigation and localized footers. Existing JavaScript, full Jekyll, analytics and Windows tests remain in place. Content tests are not legal-compliance certification.

Deployment acceptance must read pages without executing counter writes, using `analytics=off` and network interception in any browser test. Do not download Release assets or increment/reset counters for a documentation-only change.
