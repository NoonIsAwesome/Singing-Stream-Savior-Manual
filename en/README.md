---
title: Singing Stream Savior 2.0 User Manual
description: English manual for Singing Stream Savior 2.0.0.0
lang: en
translation_key: home
---

# Singing Stream Savior 2.0 User Manual

Singing Stream Savior is a Windows desktop tool for singing streams. It combines your song library, BGM, karaoke tracks, queue, lyrics, and OBS overlays in one workflow. This manual covers version **2.0.0.0**.

<figure class="manual-figure">
  <a href="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}" alt="Full workspace with lyric settings, OBS lyric preview, players, and queue"></a>
  <figcaption>Full mode shows all settings and the live OBS preview. Select an image to view it at full size.</figcaption>
</figure>

## Recommended setup

1. Create or open a `.bgmsproj` project.
2. Add local tracks or YouTube songs to the library.
3. Enter the title you want viewers to see. Cover art and lyrics are optional.
4. Add planned songs to the queue and arrange their order.
5. Choose a theme under **Set-list appearance**, then drag **Drag to OBS** into OBS.
6. Play one test song before going live.
7. Use Compact or Mini mode during the stream if you need less screen space.

> Japanese furigana and romaji are generated from an offline dictionary. They are reading aids and may differ from the singer’s pronunciation.

<a id="getting-started"></a>
## 01 · Getting started

Extract the entire ZIP to a normal folder, then launch the outer `Singing Stream Savior.exe`. Do not run the app inside the ZIP or move individual EXE/DLL files—the Qt plug-ins, WebEngine, FFmpeg, themes, and reading dictionary rely on their original relative locations.

Create a project from **File > New project**, add songs, then save the `.bgmsproj` file. A project stores songs, display titles, queue order, history, lyric links, theme, and display settings. An asterisk in the window title means there are unsaved changes.

Full mode is the default preparation workspace: content and settings on the left, previews in the center, and players plus queue on the right.

<a id="library-and-playback"></a>
## 02 · Library and playback

The library contains **All songs**, **Favorites**, **Recently played**, and removable custom playlists. You can import supported local audio files, a YouTube video, or a YouTube playlist. YouTube import requires an internet connection and the bundled `yt-dlp` helper.

The **Display title** is used by the queue and OBS. If it is blank, the app falls back to the file name or YouTube title.

Cover art is optional. It becomes especially useful with the **Card** and **CD** themes. Open **Embed cover** from a local song’s context menu, select an online result or local image, wait for the preview to load, and choose **Embed**.

<figure class="manual-figure manual-figure--medium">
  <a href="{{ '/assets/images/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/cover-dialog.png' | relative_url }}" alt="Embed cover window with preview and search results"></a>
  <figcaption>The Embed button becomes available after the selected cover preview has loaded.</figcaption>
</figure>

The BGM and karaoke players have separate play, pause, stop, loop, mute, volume, and seek controls. Karaoke playback also supports speed and semitone pitch adjustment without modifying the source file. Drag songs into **Queue**; completed songs move to **Sung**.

<a id="lyrics"></a>
## 03 · Lyrics

Lyrics are optional. They can be used in a movable host-only **Lyrics window**, as an OBS lyric overlay for viewers, or both. Supported sources include LRC, SRT, VTT, plain text, YouTube captions, and LRCLIB.

Open **Manage lyrics…** to search online, import a local lyric file, attach a result, or unlink the current lyrics. Search returns up to 50 results, prioritizing synchronized lyrics and versions closest to the karaoke track’s duration.

<figure class="manual-figure manual-figure--medium">
  <a href="{{ '/assets/images/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/lyrics-manager-linked.png' | relative_url }}" alt="Manage lyrics window showing Import LRC and Unlink lyrics controls"></a>
  <figcaption>When lyrics are linked, the lower-left controls let you import another file or unlink the current one.</figcaption>
</figure>

The embedded preview uses the same layout, font, color, highlight, and Japanese-reading option as OBS. The independent Lyrics window has its own reading option. Available Japanese readings are off, small hiragana above kanji, or word-spaced romaji below the original line.

Use the lyric offset controls if timing is early or late: negative values show lyrics sooner; positive values show them later.

<a id="obs-and-themes"></a>
## 04 · Set-list themes and OBS

Under **Set-list appearance**, select a theme card and inspect Now Singing, Set List, Next On, and Reserve in the preview. Basic themes appear first: Default, Transparent Black, Transparent White, Card, and CD; illustrated themes follow.

<figure class="manual-figure">
  <a href="{{ '/assets/images/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/theme-workspace.png' | relative_url }}" alt="Set-list appearance workspace with theme cards, settings, preview, and guide"></a>
  <figcaption>Full mode keeps theme selection, controls, preview, and the theme guide visible together.</figcaption>
</figure>

Card places cover art in a vertical card; CD crops it into a disc. Cover art is not required for playback or other themes. Use **Drag to OBS** to create a local Browser Source. This does not require OBS WebSocket.

Default uses a white preview background. Transparent and illustrated themes can use the checkerboard preview to make transparency visible. The preview background itself is not sent to OBS.

<a id="obs-websocket"></a>
## 05 · OBS WebSocket (experimental)

OBS WebSocket is optional, disabled by default, and currently experimental. Its primary purpose is to read the live OBS timer, record when a karaoke track starts, and show timestamps before songs in supported Set Lists. Normal set-list and lyric overlays work without it.

In OBS Studio 28 or later, open **Tools > WebSocket Server Settings**, enable the server, keep port `4455` unless you changed it, and copy the password. In Singing Stream Savior, open **Settings > Advanced**, enable OBS WebSocket, enter `127.0.0.1`, the matching port and password, then choose **Connect**.

<figure class="manual-figure">
  <a href="{{ '/assets/images/obs-websocket-settings.png' | relative_url }}"><img src="{{ '/assets/images/obs-websocket-settings.png' | relative_url }}" alt="Advanced settings showing OBS WebSocket instructions and connection fields"></a>
  <figcaption>Connection controls remain disabled until OBS WebSocket is enabled.</figcaption>
</figure>

The status indicator appears at the lower-right only when enabled: green means connected, yellow means connecting/reconnecting, and red means disconnected. Test timestamps with a private test stream before relying on them live.

<a id="workspace-modes"></a>
## 06 · Workspace modes

Use the top-right mode button or `Ctrl + Shift + M`:

- **Full:** all library fields, lyric/theme previews, and settings. Best for preparation.
- **Compact:** keeps song selection, players, queue, and history while hiding wide source columns and large previews.
- **Mini:** hides the library and BGM player; keeps karaoke controls, Lyrics window button, queue, and history.

<div class="figure-grid">
  <figure class="manual-figure"><a href="{{ '/assets/images/compact-workspace.png' | relative_url }}"><img src="{{ '/assets/images/compact-workspace.png' | relative_url }}" alt="Compact workspace"></a><figcaption>Compact mode keeps song selection and live controls.</figcaption></figure>
  <figure class="manual-figure manual-figure--portrait"><a href="{{ '/assets/images/mini-workspace.png' | relative_url }}"><img src="{{ '/assets/images/mini-workspace.png' | relative_url }}" alt="Mini workspace"></a><figcaption>Mini mode leaves more vertical space for the queue.</figcaption></figure>
</div>

Switching modes does not stop playback, change the queue, or affect OBS output. Each mode remembers its window size and layout.

<a id="settings-and-troubleshooting"></a>
## 07 · Settings and troubleshooting

Settings cover interface language, project/media folders, YouTube download format, and experimental OBS WebSocket controls. Back up both the `.bgmsproj` file and local media/lyrics before moving to another computer.

If the app reports that no Qt platform plug-in could be initialized, fully extract the ZIP, launch the outer EXE, and confirm the inner `Singing Stream Savior/platforms/qwindows.dll` still exists. Do not copy only the main EXE to the desktop; create a Windows shortcut to the outer launcher instead.

If lyrics cannot be found, shorten the search terms, check title/artist spelling, prefer synchronized results close to the track duration, or import LRC/SRT/VTT/plain text. If an OBS overlay does not update, reload the app preview and refresh the Browser Source in OBS.

