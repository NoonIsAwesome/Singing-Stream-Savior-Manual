---
title: Singing Stream Savior 2.0 User Manual
description: English manual for Singing Stream Savior 2.0.0.0
lang: en
translation_key: home
manual_bundle: true
---

# Singing Stream Savior 2.0 User Manual

Singing Stream Savior is a Windows desktop tool for singing streams. It combines your song library, BGM, karaoke tracks, queue, lyrics, and OBS overlays in one workflow. This manual covers version **2.0.0.0**.

<figure class="manual-figure">
  <a href="{{ '/assets/images/en/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/en/lyrics-reading-preview.png' | relative_url }}" alt="Full workspace with lyric settings, OBS lyric preview, players, and queue"></a>
  <figcaption>Full mode shows all settings and the live OBS preview. Select an image to view it at full size.</figcaption>
</figure>

## Recommended setup

1. Select the BGM you want to use during the stream and adjust it to a suitable volume.
2. Add the karaoke tracks needed for the stream to the library or a playlist.
3. Edit each track’s **Display title**. This is the name shown in Reserve and the OBS set list.
4. Open **Playlist Appearance**, drag the **Drag to OBS** button into OBS, then choose the theme you want to use.
5. Play one karaoke track as a test. Stop it and confirm that the BGM resumes automatically.
6. Practice selecting, playing, and stopping a song once so the live workflow feels familiar.
7. Save the project to complete the initial setup.

> You do not need to configure the interface language or project/media folder locations first, and you do not need to create a test Reserve list. Reserve, cover art, lyrics, and OBS WebSocket can all be set up later when your stream needs them.

> Japanese furigana and romaji are generated from an offline dictionary. They are reading aids and may differ from the singer’s pronunciation.

<a id="getting-started"></a>
## 01 · Getting started

Extract the entire ZIP to a normal folder. In the outermost folder, double-click the `Singing Stream Savior.exe` with the app icon shown below. This is the only file you need to open; do not run the app inside the ZIP or look for another EXE inside the data folders.

<div class="launch-target"><img src="{{ '/assets/images/singing-stream-savior.ico' | relative_url }}" alt="Singing Stream Savior app icon"><div><strong>Singing Stream Savior.exe</strong><span>Open this app to start</span></div></div>

Create a project from **File > New project**, add songs, then save the `.bgmsproj` file. A project stores songs, display titles, queue order, history, lyric links, theme, and display settings. An asterisk in the window title means there are unsaved changes.

Full mode is the default preparation workspace: content and settings on the left, previews in the center, and players plus queue on the right.

<a id="library-and-playback"></a>
## 02 · Library and playback

The library contains **All songs**, **Favorites**, **Recently played**, and removable custom playlists. Fixed collections cannot be deleted; use custom playlists to group songs by stream, genre, or event.

<figure class="manual-figure"><a href="{{ '/assets/images/en/song-library.png' | relative_url }}"><img src="{{ '/assets/images/en/song-library.png' | relative_url }}" alt="Complete song library with All songs, Favorites, Recently played, custom playlists, and a populated song table"></a><figcaption>Select a collection on the left; the table and search field work within that selection.</figcaption></figure>

To place songs in a collection, select one or more rows, right-click, open **Add to playlist**, and choose **Favorites** or a custom playlist. This does not duplicate the audio or remove it from All songs, and one song can belong to several playlists.

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/en/add-to-playlist-menu.png' | relative_url }}"><img src="{{ '/assets/images/en/add-to-playlist-menu.png' | relative_url }}" alt="Song context menu with Add to playlist expanded to Favorites"></a><figcaption>The same context menu also provides Add to Reserve for planned songs.</figcaption></figure>

You can import a YouTube video, a YouTube playlist, or local songs/karaoke tracks in `MP3`, `WAV`, `FLAC`, `M4A`, `MP4`, `AAC`, `OGG`, `OPUS`, and `WMA`. YouTube import requires an internet connection and the bundled `yt-dlp` helper.

The **Display title** is used by Reserve, History, and OBS. If it is blank, the app falls back to the file name or YouTube title. Double-click the Display title cell, or right-click the song and choose **Edit display song name**. Press `Enter` to apply or `Esc` to cancel. This never renames the source audio file.

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/en/display-title-edit.png' | relative_url }}"><img src="{{ '/assets/images/en/display-title-edit.png' | relative_url }}" alt="Display title cell open for inline editing"></a><figcaption>Only the viewer-facing Display title changes; the source name remains intact.</figcaption></figure>

Cover art is optional. It becomes especially useful with the **Card** and **CD** themes. Open **Embed cover** from a local song’s context menu, select an online result or local image, wait for the preview to load, and choose **Embed**.

<figure class="manual-figure manual-figure--medium">
  <a href="{{ '/assets/images/en/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/en/cover-dialog.png' | relative_url }}" alt="Embed cover window with preview and search results"></a>
  <figcaption>A real online result is selected. Embed becomes available after its cover preview has loaded.</figcaption>
</figure>

The BGM and karaoke players have separate play, pause, stop, loop, mute, volume, and seek controls. Karaoke playback also supports speed and semitone pitch adjustment without modifying the source file.

The queue is optional: double-click a song in the table to play it immediately. Use **Add to Reserve** when managing viewer requests or songs you plan to sing later. Supported themes show the first reserved song in **Next On**, or several reserved songs in **Reserve**. Completed songs move to **History**.

<a id="lyrics"></a>
## 03 · Lyrics

Lyrics are optional. They can be used in a movable host-only **Lyrics window**, as an OBS lyric overlay for viewers, or both. Supported sources include LRC, SRT, VTT, plain text, YouTube captions, and LRCLIB.

Open **Manage lyrics…** from the song’s **Lyrics** page, or click that song’s icon in the **Lyrics** column of the song list. Either route opens the same window, where you can search online, import a local lyric file, attach a result, or unlink the current lyrics. Search returns up to 50 results, prioritizing synchronized lyrics and versions closest to the karaoke track’s duration.

<figure class="manual-figure manual-figure--medium">
  <a href="{{ '/assets/images/en/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/en/lyrics-manager-linked.png' | relative_url }}" alt="Manage lyrics window showing Import lyrics file and Unlink lyrics controls"></a>
  <figcaption>When lyrics are linked, the lower-left controls let you import another file or unlink the current one.</figcaption>
</figure>

The embedded preview uses the same layout, font, color, highlight, and Japanese-reading option as OBS. The independent Lyrics window has its own reading option. Available Japanese readings are off, small hiragana above kanji, or word-spaced romaji below the original line.

Use the lyric offset controls if timing is early or late: negative values show lyrics sooner; positive values show them later.

<a id="obs-and-themes"></a>
## 04 · Playlist appearance and OBS

Under **Playlist Appearance**, select a theme card and inspect Now Singing, Set List, Next On, and Reserve in the preview. Basic themes appear first: Default, Transparent Black, Transparent White, Card, and CD; illustrated themes follow.

<figure class="manual-figure">
  <a href="{{ '/assets/images/en/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/en/theme-workspace.png' | relative_url }}" alt="Playlist Appearance workspace with theme cards, settings, preview, and guide"></a>
  <figcaption>Full mode keeps theme selection, controls, preview, and the theme guide visible together.</figcaption>
</figure>

Card places cover art in a vertical card; CD crops it into a disc. Cover art is not required for playback or other themes. Use **Drag to OBS** to create a local Browser Source. This does not require OBS WebSocket.

Default uses a white preview background. Transparent and illustrated themes can use the checkerboard preview to make transparency visible. The preview background itself is not sent to OBS.

The theme canvas does not restrict how the Browser Source must be used. In OBS, freely resize, crop, and position it to fit your own stream layout. Default is especially suitable as a flexible base: use the dashed text-area guides in the preview to crop out the Now Singing, Set List, or other blocks you want, then place them over your own background. Transparent and illustrated themes may be kept as a complete composition or cropped to selected parts. OBS cropping changes only that scene source; it does not modify the theme or song data.

Available appearance controls:

| Tab | Controls |
| --- | --- |
| **Current** | Now Singing font, size, color, bold/italic/underline, alignment, and long-title marquee speed |
| **History** | Set List font, size, color, numbering, bold/italic/underline, alignment, and list scroll speed |
| **Reserve** | Separate Reserve/Next On font, size, color, numbering, style, and alignment |
| **Layout** | Optional project layout for the Now Singing, History, and Reserve labels/lists; adjust X, Y, width, and height or restore the theme layout |

You can also enable Reserve, choose a 1–10 song display limit, and—when OBS WebSocket is enabled—show timestamps before sung songs in supported Set Lists. Timestamps are not added to Reserve or Next On.

Preview-only tools provide transparent, dark, light, custom-color, or image backgrounds; image fit/fill/stretch; and temporary source sizing/positioning. They never change the transparent OBS output. Fixed-design themes may lock typography or layout controls, so check the Theme Guide for the selected theme.

<a id="obs-websocket"></a>
## 05 · OBS WebSocket (experimental)

OBS WebSocket is optional, disabled by default, and currently experimental. Its primary purpose is to read the live OBS timer, record when a karaoke track starts, and show timestamps before songs in supported Set Lists. Normal set-list and lyric overlays work without it.

In OBS Studio 28 or later, open **Tools > WebSocket Server Settings**, enable the server, keep port `4455` unless you changed it, and copy the password. In Singing Stream Savior, open **Settings > Advanced**, enable OBS WebSocket, enter `127.0.0.1`, the matching port and password, then choose **Connect**.

<figure class="manual-figure">
  <a href="{{ '/assets/images/en/obs-websocket-settings.png' | relative_url }}"><img src="{{ '/assets/images/en/obs-websocket-settings.png' | relative_url }}" alt="Advanced settings showing OBS WebSocket instructions and connection fields"></a>
  <figcaption>Connection controls remain disabled until OBS WebSocket is enabled.</figcaption>
</figure>

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

<a id="settings-and-troubleshooting"></a>
## 07 · Settings and troubleshooting

Settings cover interface language, project/media folders, YouTube download format, and experimental OBS WebSocket controls. Back up both the `.bgmsproj` file and local media/lyrics before moving to another computer.

If the app reports that no Qt platform plug-in could be initialized, extract a fresh copy of the complete ZIP and launch only the outer `Singing Stream Savior.exe`. You do not need to inspect or open anything in the data folders. For desktop access, create a Windows shortcut to that outer EXE instead of moving it.

If lyrics cannot be found, shorten the search terms, check title/artist spelling, prefer synchronized results close to the track duration, or import LRC/SRT/VTT/plain text. If an OBS overlay does not update, reload the app preview and refresh the Browser Source in OBS.
