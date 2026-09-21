# Privacy notice implementation review — 2026-09-21

Owner requested a notice explaining local desktop processing, with separate website counters.
This is an implementation-aligned notice, not a claim of a full network/security or jurisdictional legal audit.

Reference structure reviewed: https://suila.app/privacy (available via https://suila.app/privacy.html).
Do not copy its product-specific claims about Apple frameworks, no third-party services, or uninstall deleting all data.
Our website has CounterAPI and GitHub hosting; the app has online searches and updates.

Evidence inspected:
- App source snapshot edadf66438ec4e7cd87409e1e78951e8bd44c7ca:
  BGMSavior/lyrics/LrcLibClient.cpp sends q to LRCLIB;
  BGMSavior/lyrics/AutomaticLyricsLookupCoordinator.cpp calls LRCLIB for non-YouTube sources.
- Manual assets/js/site-controls.js stores theme choice in localStorage.
- Existing site-analytics.js and new download-clicks.js send only fixed counter requests;
  no visitor identifiers, no localStorage/cookies in counting, no-referrer and omit credentials.
- Existing support-page.html has informational diagnostics guidance and a contact channel, not an upload form.
- Owner states desktop content is not automatically sent to the developer; avoid a broader claim that no local data is stored or that no third-party network request ever occurs.

Public references:
https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
https://docs.counterapi.dev/api/endpoints/v2/
https://counterapi.dev/privacy-policy/
https://policies.google.com/privacy

Key boundaries in all five translations:
local data vs developer collection; preparation and offline operation vs no network attempts;
automatic searches/launcher updates; CounterAPI IP/HTTP visibility vs aggregate metrics;
website theme storage; voluntary diagnostics; system backups; VST3/OBS/third parties;
no invented retention deadline or claim that publicly queryable counters are private.

Future cloud requests/accounts/uploads must be reviewed before launch. No desktop code was changed here.
