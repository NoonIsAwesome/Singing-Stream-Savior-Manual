---
title: Singing Stream Savior 2.1 User Manual
description: English manual for Singing Stream Savior 2.1.0.0
lang: en
translation_key: home
manual_bundle: true
---

# Singing Stream Savior 2.1 User Manual

Singing Stream Savior is a Windows desktop tool for singing streams. It combines your song library, BGM, karaoke tracks, queue, lyrics, vocal processing, audio routing, and OBS output in one workflow. This manual covers version **2.1.0.0**.

<figure class="manual-figure">
  <a href="{{ '/assets/images/en/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/en/lyrics-reading-preview.png' | relative_url }}" alt="Full workspace with lyric settings, OBS lyric preview, players, and queue"></a>
  <figcaption>Full mode shows all settings and the live OBS preview. Select an image to open an enlarged preview.</figcaption>
</figure>

## Recommended first-use flow

1. Set your stream BGM by dragging in a local file or YouTube link, or by using the selection button. The BGM starts looping automatically.
2. Add karaoke tracks to the song library by dragging in local files or YouTube links, or by using the import button.
3. Edit each track’s **Display title**. This is the name shown in Reserve and the OBS set list.
4. Add songs to **Reserve** when you want the overlay to show what is coming next.
5. Open **Playlist Appearance**, choose a theme while watching its automatic preview, then drag **Drag to OBS** into OBS.
6. Return to **Live Controls** and double-click a song in the library or Reserve to start singing. The BGM pauses and resumes automatically.
7. If lyric search opens during playback, choose synchronized lyrics whose duration and artist match the track.
8. Open the **Lyrics** tab to adjust the display or manage lyrics manually, then drag **Drag to OBS** into OBS to show synchronized lyrics.

> You do not need to configure the interface language or project/media folder locations first, and you do not need to create a test Reserve list. Reserve, cover art, lyrics, and OBS WebSocket can all be set up later when your stream needs them.

> Japanese furigana and romaji are generated from an offline dictionary. They are reading aids and may differ from the singer’s pronunciation.

<a id="getting-started"></a>
## 01 · Getting started

Extract the entire ZIP to a normal folder. In the outermost folder, double-click the `Singing Stream Savior.exe` with the app icon shown below. This is the only file you need to open; do not run the app inside the ZIP or look for another EXE inside the data folders.

<div class="launch-target"><img src="{{ '/assets/images/singing-stream-savior.ico' | relative_url }}" alt="Singing Stream Savior app icon"><div><strong>Singing Stream Savior.exe</strong><span>Open this app to start</span></div></div>

Create a project from **File > New project**, add songs, then save the `.bgmsproj` file. A project stores songs, display titles, queue order, lyric links, theme, and display settings. Sung history belongs to the current live session and is not written to a normal project save. If the app is interrupted unexpectedly, a recovery snapshot can restore the live-session progress when you restart. An asterisk in the window title means there are unsaved changes.

### Follow the first-use guide

Starting with version 2.0.2.0, the eight-step first-use guide opens automatically the first time you enter the workspace. It changes to the relevant page and highlights the area being explained without changing your project or starting playback. You can reopen it at any time from **Help > First-use Guide**.

<div class="figure-grid">
  {% include localized-release-screenshot.html name="full-workspace.png" alt="The full 2.1 workspace used by the first-use guide" caption="The first steps introduce BGM setup, drag-and-drop, automatic switching, and the three main workspace columns." %}
  {% include localized-release-screenshot.html name="theme-workspace.png" alt="The 2.1 Playlist Appearance workspace" caption="The theme step opens Playlist Appearance and points out its cards, preview, settings, and OBS workflow." %}
</div>

Full mode is the default preparation workspace: content and settings on the left, previews in the center, and players plus queue on the right.

<a id="library-and-playback"></a>
## 02 · Library and playback

The library contains **All songs**, **Favorites**, **Recently played**, and removable custom playlists. Fixed collections cannot be deleted; use custom playlists to group songs by stream, genre, or event.

<figure class="manual-figure"><a href="{{ '/assets/images/en/song-library.png' | relative_url }}"><img src="{{ '/assets/images/en/song-library.png' | relative_url }}" alt="Complete song library with All songs, Favorites, Recently played, custom playlists, and a populated song table"></a><figcaption>Select a collection on the left; the table and search field work within that selection.</figcaption></figure>

To place songs in a collection, select one or more rows, right-click, open **Add to playlist**, and choose **Favorites** or a custom playlist. This does not duplicate the audio or remove it from All songs, and one song can belong to several playlists.

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/en/add-to-playlist-menu.png' | relative_url }}"><img src="{{ '/assets/images/en/add-to-playlist-menu.png' | relative_url }}" alt="Song context menu with Edit display title, Add to Reserve, Add to playlist, and Delete track"></a><figcaption>The menu keeps display-title editing first and also provides Add to Reserve and playlist organization.</figcaption></figure>

In addition to choosing files from the import dialog, you can drag one or more local audio files directly into the app. Paste or drag in a single YouTube video URL to add one song. You can also drag in a YouTube playlist URL: the app recognizes its videos and imports them into a corresponding custom playlist, so you do not need to add every link individually. Supported local formats include `MP3`, `WAV`, `FLAC`, `M4A`, `MP4`, `AAC`, `OGG`, `OPUS`, and `WMA`. YouTube import requires an internet connection and the bundled `yt-dlp` helper.

The **Display title** is used by Reserve, History, and OBS. If it is blank, the app falls back to the file name or YouTube title. Double-clicking a song row loads and plays it; it never opens text editing. To rename the viewer-facing title, right-click the song and choose the first item, **Edit display song name**. Press `Enter` to apply or `Esc` to cancel. This never renames the source audio file.

The song context menu is arranged for quick live use: **Edit display song name**, **Add to Reserve**, **Add to playlist** (Favorites or a custom playlist), then the delete/remove action appropriate to the selected collection.

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/en/display-title-edit.png' | relative_url }}"><img src="{{ '/assets/images/en/display-title-edit.png' | relative_url }}" alt="Display title cell open for inline editing from the song context menu"></a><figcaption>Choose the first context-menu item to edit only the viewer-facing Display title; the source name remains intact.</figcaption></figure>

<section class="manual-feature-update" aria-labelledby="library-bgm-205-title">
  <header class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.0.5.0</p><h2 id="library-bgm-205-title">A clearer song view and a real BGM playlist</h2><p>Switch the song library between the familiar table and a card view, then prepare reusable background music for different stream moods.</p></header>
  <div class="manual-feature-update__copy"><h3>Song list display</h3><p><strong>The traditional table remains the default.</strong> Choose Card list under Settings → General → Song List Display when you want titles to be easier to scan. Cards keep the source, cover, and lyrics indicators; double-click plays the song, while the pencil icon edits its Display title.</p></div>
  <div class="manual-feature-update__copy"><h3>BGM playlist</h3><p>Keep multiple local or YouTube sources, add a note to each BGM, and drag items into order. The active track is highlighted. YouTube playlists can add either the current video or every item.</p><ul><li><strong>Repeat one (default)</strong>: loop the selected BGM.</li><li><strong>Repeat all</strong>: play in list order and continue from the beginning.</li><li><strong>Shuffle all</strong>: choose each next BGM randomly.</li></ul></div>
  {% include localized-release-screenshot.html name="bgm-playlist.png" alt="Expanded BGM playlist in 2.1" caption="The BGM list keeps notes, sources, and the playing item easy to identify." %}
</section>

Use **+ Unaccompanied Performance** beside the search field for a cappella,
self-accompanied, or other performances without a media file. Enter the public
display title, then choose manual completion or an optional planned duration.
The time controls use 10-second steps and also support the mouse wheel.

Starting the item pauses BGM and updates Now Singing, Reserve, and History just
like a karaoke track; stopping or completing it restores the previous BGM.
These items appear in the Unaccompanied Performance smart collection, can also
belong to custom playlists, and are saved with the project. No silent audio file
is created.

Cover art is optional. It becomes especially useful with the **Card** and **CD** themes. Open **Embed cover** from a local song’s context menu, select an online result or local image, wait for the preview to load, and choose **Embed**.

<figure class="manual-figure manual-figure--medium">
  <a href="{{ '/assets/images/en/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/en/cover-dialog.png' | relative_url }}" alt="Embed cover window with preview and search results"></a>
  <figcaption>Select a search result and wait for the preview on the left; Embed then becomes available.</figcaption>
</figure>

The BGM and karaoke players have separate play, pause, stop, loop, mute, volume, and seek controls. Karaoke playback also provides speed control and semitone key transposition—particularly useful for slowing down a difficult song, matching a comfortable practice tempo, or moving a track whose range is too high or too low without preparing another audio file.

Version 2.1 maps both BGM and karaoke volume through a more perceptual loudness curve. Local files and YouTube playback use the same slider-to-gain mapping. Existing slider numbers are preserved during the update, but the same number may sound different from an earlier version, so recheck the accompaniment-to-voice balance before the first live stream. This is a volume-control curve, not automatic loudness normalization.

The app remembers the adjusted speed and key separately for every song. When you switch away and return, that song’s preferred settings are restored; use the reset controls to return to `100%` speed and `0` semitones. These adjustments affect playback only and never rewrite or reduce the quality of the source file.

The queue is optional: double-click a song in the table to play it immediately. Use **Add to Reserve** when managing viewer requests or songs you plan to sing later. Supported themes show the first reserved song in **Next On**, or several reserved songs in **Reserve**. Completed songs move to **History**. History is cleared after a normal app exit; after an unexpected interruption, the recovery snapshot can restore the queue and History for that live session.

<a id="lyrics"></a>
## 03 · Lyrics

Lyrics are optional. They can be used in a movable host-only **Lyrics window**, as an OBS lyric overlay for viewers, or both. Supported sources include LRC, SRT, VTT, plain text, YouTube captions, and LRCLIB.

Open **Manage lyrics…** from the song’s **Lyrics** page, or click that song’s icon in the **Lyrics** column of the song list. Either route opens the same window, where you can search online, import a local lyric file, attach a result, or unlink the current lyrics. Search combines LRCLIB results and YouTube captions, returns up to 50 candidates, and prioritizes synchronized lyrics, language, duration, and artist information. If YouTube temporarily rate-limits caption downloads, other candidates remain available and the dialog explains that you can retry later.

<figure class="manual-figure manual-figure--medium">
  <a href="{{ '/assets/images/en/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/en/lyrics-manager-linked.png' | relative_url }}" alt="Manage lyrics window showing Import lyrics file and Unlink lyrics controls"></a>
  <figcaption>When lyrics are linked, the lower-left controls let you import another file or unlink the current one.</figcaption>
</figure>

The embedded preview uses the same layout, font, color, highlight, and reading option as OBS. The independent Lyrics window has its own reading option. Available Japanese readings are off, small hiragana above kanji, word-spaced romaji below the original line, or hiragana and romaji together. Korean lyrics can show romanization with readable spaces between words. The main preview, Lyrics window, and OBS share the same preloaded background reading service so results remain consistent.

In the independent Lyrics window, choose any timestamped line to seek the karaoke track to that line. This works with synchronized lyrics such as LRC; plain-text lyrics have no seek positions. Japanese readings are generated locally by the bundled offline analyzer, so lyrics do not need to be uploaded.

{% include localized-release-screenshot.html name="lyrics-reading-preview.png" alt="The 2.1 Lyrics page highlighting the current synchronized line" caption="The embedded preview uses the same lyric layout, font, color, reading, and highlight that will appear in OBS." %}

If the lyrics are out of sync, you do not need to work out positive or negative values. Choose **Lyrics too late → Earlier** when the sung line has already started but the lyric has not appeared, or **Lyrics too early → Later** when the lyric appears before it is sung. The center of the slider is synchronized; drag left for earlier or right for later, and use the reset icon to return to `0 ms`.

The numbers of lines shown before and after the current line can be adjusted separately with a slider or value field. Near the beginning or end of a song, fewer lines may be available than the selected setting. Offset changes are reflected immediately in the preview, independent Lyrics window, and OBS lyric data, even while playback is paused.

{% include localized-release-screenshot.html name="lyrics-viewer.png" alt="The 2.1 Lyrics window with timing controls and synchronized lyrics" caption="Selecting a timestamped line seeks to it; returning to the beginning scrolls the lyric list back to the top." size="medium" %}

<a id="obs-and-themes"></a>
## 04 · Playlist appearance and OBS

Under **Playlist Appearance**, select a theme card and inspect Now Singing, Set List, Next On, and Reserve in the preview. Basic themes appear first: Default, Transparent Black, Transparent White, Transparent Black v2, Transparent White v2, Card, CD, Signal Line, and Stage Caption; illustrated themes follow.

<figure class="manual-figure">
  <a href="{{ '/assets/images/en/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/en/theme-workspace.png' | relative_url }}" alt="Playlist Appearance workspace with theme cards, settings, preview, and guide"></a>
  <figcaption>Full mode keeps theme selection, controls, preview, and the theme guide visible together.</figcaption>
</figure>

<div class="figure-grid">
  <figure class="manual-figure">
    <a href="{{ '/assets/images/demo-obs-result.png' | relative_url }}">
      <img src="{{ '/assets/images/demo-obs-result.png' | relative_url }}" alt="OBS showing the Transparent Black v2 set list and synchronized lyrics over a stream background" loading="lazy" decoding="async">
    </a>
    <figcaption>In OBS: resize, crop, and position the set-list and lyric sources independently over your own background.</figcaption>
  </figure>
</div>

Card places cover art in a vertical card; CD crops it into a disc. Cover art is not required for playback or other themes. Hold and drag **Drag to OBS** to create a local Browser Source directly. If OBS does not accept a drop while streaming, click the same button to copy the source path, add an OBS Browser Source, paste it into the URL field, and set the size to 1920 × 1080. Do not enable **Local file**. Neither method requires OBS WebSocket.

Default uses a white preview background. Transparent and illustrated themes can use the checkerboard preview to make transparency visible. The preview background itself is not sent to OBS.

The theme canvas does not restrict how the Browser Source must be used. In OBS, freely resize, crop, and position it to fit your own stream layout. Default is especially suitable as a flexible base: use the dashed text-area guides in the preview to crop out the Now Singing, Set List, or other blocks you want, then place them over your own background. Transparent and illustrated themes may be kept as a complete composition or cropped to selected parts. OBS cropping changes only that scene source; it does not modify the theme or song data.

**Layout** is the leftmost appearance tab. The app reads each theme's declared capabilities and shows only controls that actually work with that theme.

| Tab | Controls |
| --- | --- |
| **Layout** | Theme color, background opacity, or optional project block positions when supported; restore the theme defaults at any time |
| **Current** | Now Singing font, size, color, bold/italic/underline, alignment, and long-title marquee speed |
| **History** | Set List font, size, color, numbering, bold/italic/underline, alignment, and list scroll speed |
| **Reserve** | Separate Reserve/Next On font, size, color, numbering, style, and alignment |

You can also enable Reserve, choose a 1–10 song display limit, and—when OBS WebSocket is enabled—show timestamps before sung songs in supported Set Lists. Timestamps are not added to Reserve or Next On.

Preview-only tools provide transparent, dark, light, custom-color, or image backgrounds; image fit/fill/stretch; and temporary source sizing/positioning. They never change the transparent OBS output. Unsupported controls are hidden rather than merely disabled. Default exposes the broadest typography and layout controls; legacy Transparent Black/White retain Current and History typography controls; both v2 themes, Signal Line, and Stage Caption expose their supported color/opacity controls.

<a id="obs-websocket"></a>
## 05 · OBS WebSocket

OBS WebSocket is optional and disabled by default. Its primary purpose is to read the live OBS timer, record when a karaoke track starts, and show timestamps before songs in supported Set Lists. Normal set-list and lyric overlays work without it.

In OBS Studio 28 or later, open **Tools > WebSocket Server Settings**, enable the server, keep port `4455` unless you changed it, and copy the password. In Singing Stream Savior, open **Settings > Stream Timestamps**, enable OBS WebSocket, enter `127.0.0.1`, the matching port and password, then choose **Connect**. Treat the OBS password as a local connection credential and do not publish screenshots that reveal it.

The status indicator appears at the lower-right only when enabled: green means connected, yellow means connecting/reconnecting, and red means disconnected. Test timestamps with a private test stream before relying on them live.

<a id="workspace-modes"></a>
## 06 · Workspace modes

Use the top-right mode button or `Ctrl + Shift + M`:

- **Full:** all library fields, lyric/theme previews, and settings. Best for preparation.
- **Compact:** keeps song selection, players, Reserve, and History while hiding wide source columns and large previews.
- **Mini:** best when the songs and stream visuals are already prepared before going live. It hides the library and BGM player, leaving the karaoke controls, Reserve, History, and Lyrics Window button. Choose the next song directly from the prepared Reserve list. The separate Lyrics Window can be moved and its text size adjusted to fit around other streaming tools.

<div class="figure-grid">
  <figure class="manual-figure"><a href="{{ '/assets/images/en/full-workspace.png' | relative_url }}"><img src="{{ '/assets/images/en/full-workspace.png' | relative_url }}" alt="Full workspace"></a><figcaption>Full mode keeps the complete library, players, and queue for preparation.</figcaption></figure>
  <figure class="manual-figure"><a href="{{ '/assets/images/en/compact-workspace.png' | relative_url }}"><img src="{{ '/assets/images/en/compact-workspace.png' | relative_url }}" alt="Compact workspace"></a><figcaption>Compact mode keeps song selection and live controls.</figcaption></figure>
  <figure class="manual-figure manual-figure--portrait"><a href="{{ '/assets/images/en/mini-workspace.png' | relative_url }}"><img src="{{ '/assets/images/en/mini-workspace.png' | relative_url }}" alt="Mini workspace"></a><figcaption>Mini mode leaves more vertical space for the queue.</figcaption></figure>
</div>

Switching modes only changes which controls are visible. A song already playing continues, and the existing queue order and OBS scene are not reset. Each mode remembers its window size and layout.

When the main window is not needed, its close button can minimize Singing Stream Savior to the Windows notification area instead of exiting. Playback continues in the background, while the tray menu and global shortcuts keep playback, Key, speed, Profile, microphone, Lyrics Window, and Meter controls available. Use **Exit Application** in the tray menu to close the app and its helpers completely.

{% include localized-release-screenshot.html name="notification-area-menu.png" alt="Singing Stream Savior Windows notification-area menu while idle" caption="The idle menu stays compact. Playback and Advanced Streaming Mode add the relevant playback, Key, speed, Profile, microphone, and Meter actions." size="medium" %}

<a id="settings-and-troubleshooting"></a>
## 07 · Settings and troubleshooting

Back up both the `.bgmsproj` file and local media/lyrics before moving to another computer.

The outer `Singing Stream Savior.exe` uses Launcher 1.2 to check for releases. If no newer version is available, it automatically opens the verified installed app without leaving you on an empty update screen. Offline startup and a check that is not yet due also continue with the installed version.

When an update is available, the card-style prompt shows the current and target versions plus localized release notes. **Later** or closing the prompt starts the installed version without changing files; **Update now** begins the download.

<figure class="manual-figure"><a href="{{ '/assets/images/en/launcher-update-prompt.png' | relative_url }}"><img src="{{ '/assets/images/en/launcher-update-prompt.png' | relative_url }}" alt="Launcher 1.2 card-style update prompt with versions and release-note cards"></a><figcaption>The scrollable cards contain the update notes. Later keeps the installed version; Update now starts the verified update.</figcaption></figure>

During a cancellable download, **Cancel** or closing the window requests a safe cancellation. The launcher preserves the exact installed files and `current.json`, removes temporary residue, then starts that version. Closing is temporarily ignored during the short non-cancellable commit stage. If the process or PC is forcibly stopped mid-update, the next launch uses the durable transaction journal to roll back or finish consistently before starting the app.

<figure class="manual-figure"><a href="{{ '/assets/images/en/launcher-update-progress.png' | relative_url }}"><img src="{{ '/assets/images/en/launcher-update-progress.png' | relative_url }}" alt="Launcher 1.2 download, verification, and installation progress"></a><figcaption>The package is checked for HTTPS origin, expected size, and SHA-256 before an atomic, recoverable version switch.</figcaption></figure>

Keep the outer launcher, `current.json`, and the internal folders together. Launcher 1.2 retains one previous verified package for automatic repair and transaction recovery, but it does not provide a one-click downgrade: an older app may not understand a project saved by a newer version. If you must test an older release, extract its official complete ZIP to a **separate folder** and work on a copy of the `.bgmsproj` and media. If updating still fails, download a fresh complete ZIP instead of mixing DLLs from different versions.

If the app reports that no Qt platform plug-in could be initialized, extract a fresh copy of the complete ZIP and launch only the outer `Singing Stream Savior.exe`. You do not need to inspect or open anything in the data folders. For desktop access, create a Windows shortcut to that outer EXE instead of moving it.

If lyrics cannot be found, shorten the search terms, check title/artist spelling, prefer synchronized results close to the track duration, or import LRC/SRT/VTT/plain text. If an OBS overlay does not update, reload the app preview and refresh the Browser Source in OBS.

The Recent Projects list automatically removes entries whose `.bgmsproj` file has been moved or deleted.
