---
title: Complete 2.1.0.0 guide to Advanced Streaming, Profiles, and audio routing
description: Learn the 2.1.0.0 live controls, vocal Profiles, built-in effects, routing, Meter, recording, direct OBS output, and system-tray workflow
lang: en
translation_key: advanced-streaming
published: true
---

# Advanced Streaming Mode

Starting with **2.1.0.0**, Advanced Streaming Mode mixes BGM, accompaniment, and the processed microphone inside Singing Stream Savior, then sends the complete Stream Mix to OBS, Discord, or another app.

{% include advanced-quick-start.html %}

## Detailed reference and appendices

If the short test recording above is correct, basic setup is complete and you can stop here. Use the remaining material only when changing devices, manually tuning the Buffer, configuring effects, monitoring or recording in depth, or troubleshooting a problem.

<aside class="version-preview" role="note">
  <span class="version-preview__badge">2.1.0.0 NEW</span>
  <div><strong>Read this chapter together with the normal playback guide.</strong><p>Audio Routing defines inputs, monitoring, recording, and stream delivery; voice Profiles define vocal tone.</p></div>
</aside>

## Settings moved in 2.1.0.0

- **YouTube downloads** moved to **Settings → Files &amp; Projects**, together with project and media-folder controls.
- **Advanced Settings** was renamed **Stream Timestamps**. OBS WebSocket, stream-time detection, and Set List timestamps are configured there.
- The new **Audio Routing** tab manages normal playback, advanced mixing, the audio driver, outputs, monitoring, and recording.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2>Choose normal playback or Advanced Streaming Mode</h2><p>Begin in <strong>Settings → Audio Routing</strong>. Normal Playback outputs the app's BGM and accompaniment only. Advanced Streaming Mode adds the microphone, Profile effect chains, complete mix, and virtual output.</p></div>
  {% include localized-release-screenshot.html name="audio-routing.png" alt="Upper portion of the 2.1.0.0 Audio Routing page" caption="The upper part shows the OBS plug-in and virtual-output entries, route mode, Windows Audio, App Buffer, health check, source, Profile, Mix, and Stream Output. Scroll down for Monitor, recording, and the rest of the route." %}
  {% include localized-release-screenshot.html name="audio-routing-bottom.png" alt="Lower portion of the 2.1.0.0 Audio Routing page" caption="The lower part shows Monitor, recording, route lines, and latency. Monitor latency does not change accompaniment-to-vocal alignment in OBS or Stream Output." %}
</div>

### Default Profiles and BGM Ducking

- **Chat Voice Profile** is selected automatically during BGM playback or livestream chat.
- **Singing Voice Profile** is the default while accompaniment is playing; a song's Profile tag can override it. The microphone button's right-click menu can hold a temporary manual Profile. Choose **Automatically switch Profile** to resume chat/singing and song-tag automation.
- **BGM Ducking · Automatic** lowers only BGM while microphone voice is detected, by no more than 9 dB, and never boosts the microphone. It is bypassed automatically during singing accompaniment so the track does not pump with every phrase; the Mix Bus Compressor handles overall glue there. Choose **Off** to disable automatic BGM reduction.

### App-buffer health check and yellow status

The **App safety buffer** selector and **Check buffer stability…** button stay together in one visible row. With ASIO input, the row appears directly below the ASIO sample-rate/hardware-buffer panel; it remains available while the advanced **Windows playback compatibility** section is collapsed. **Quick check** tests 512 and 1024 frames in about 25 seconds. **Full check** tests 128, 256, 512, and 1024 frames in about five minutes. It diagnoses the app buffer without changing the audio interface's separate ASIO hardware buffer, and its recommendation can be applied directly. A low value such as 128 or 256 is treated as verified only after both independent strict observations in Full check pass for the current devices, Profile, effects, and route.

The health check does not play a synthetic test tone or accompaniment. If software monitoring is enabled, you may still hear the live microphone, and each route restart can cause a brief interruption. After you confirm, Singing Stream Savior automatically stops BGM and accompaniment playing inside the app. It cannot stop OBS streaming, Discord calls, or external recording, so stop those yourself first. The audio interface's **Direct Monitor** is unaffected.

{% include localized-release-screenshot.html name="audio-health-check.png" alt="Completed Full App Buffer health-check results" caption="Completed Full-check example: green checks passed, the darker green row is this computer's recommendation, and yellow means the test finished without enough safety headroom. Recommendations and latency vary by computer." %}

> **Is “Not verified” normal for 128 or 256?** Yes. A low Buffer must pass repeated stability checks before it is recommended; “Not verified” does not mean an audible dropout has already occurred. Use the recommended 512 unless you specifically need lower software-monitor latency. App Buffer and the interface's ASIO hardware buffer are separate settings.

The yellow messages have two meanings. **Check dropouts** means the microphone, monitoring, stream output, or a recovering device may be unstable. **Check audio timing** means processing time or synchronization has remained abnormal. A brief spike does not always mean an audible dropout occurred; hover over Stability for details.

### Recommended starting point for most users

> **The simplest starting point is ASIO when an interface provides it, App Safety Buffer set to Automatic (Recommended) · 512 frames, and the dedicated OBS audio source.** You do not need to manually try every buffer first.

- Prefer the interface vendor's ASIO driver. Keep the interface hardware buffer at an already-stable value—commonly 128 or 256 frames. It is separate from the App Buffer.
- Without ASIO, choose Windows Audio and leave the App Buffer on automatic 512. Do not force 128 or 256 as the first step.
- Run Full Check only when you want lower software Dry monitoring latency; apply 256 only when the check recommends it. Prefer the interface's Direct Monitor for primary singing monitoring.
- Prefer the dedicated Singing Stream Savior source in OBS. Use a virtual cable only when another application also needs the complete Mix.
- Run Full Check and apply its recommendation at least once after the initial route setup; you do not need to repeat it before every stream. Run it again only after device／driver or major Profile／VST3／routing changes, a yellow state, or an audible dropout.

## Create and edit voice Profiles

A Profile is a reusable vocal effect chain. Add built-in effects or VST3 plug-ins, drag blocks into processing order, bypass individual blocks, and audition the result before saving.

### What the Profile editor saves

- Every block's enabled state, parameters, and processing order are stored with the Profile and restored when the project opens again.
- Built-in effects and VST3 plug-ins can be combined, with up to eight VST3 slots. The plug-in parameter state is stored with the Profile.
- Dragging a block changes the real processing order. Bypass temporarily skips an effect without deleting its settings.
- With monitoring enabled, the Profile editor plays the Profile currently being edited. You can keep accompaniment playing while adjusting effects. Press **S (Solo)** at the upper right when you want to hear only the Profile preview. Returning to Live Control, minimizing to the tray, or closing the editor leaves audition and restores the previous live-monitoring route.
- Factory Profiles are practical starting points; tune them for the microphone, room noise, vocal range, and singing style before saving a personal Profile.

{% include profile-signal-chain.html %}

{% include factory-profiles-reference.html %}

### Fifteen built-in vocal effects

Every built-in effect provides a live graph, Bypass control, and Help button. Simple mode starts from a useful scenario; Advanced mode exposes the complete parameter set.

{% include one-knob-guide.html %}

| Group | Effect | Main purpose |
| --- | --- | --- |
| Utility | **Input Gain** | Set the level entering the chain without clipping its first stage. |
| Cleanup | **Background Attenuation** | Reduce steady fan or room noise during gaps in the voice. |
| Cleanup | **Noise Gate** | Close the mic between phrases to reduce keyboard and mouse sounds. |
| Dynamics | **Compressor** | Reduce the difference between quiet and powerful phrases with Threshold, Attack, and Release. |
| Tone | **Equalizer (EQ)** | Remove unnecessary lows, reduce mud, and shape different vocal ranges. |
| Tone | **Saturation** | Add harmonics, density, or controlled edge. |
| Tone | **Air Enhancer** | Add presence, air, and sparkle, then level-match with Trim. |
| Cleanup | **De-esser** | Control harsh S and SH consonants. |
| Creative | **Voice Changer** | Change Pitch and Formant together for character or section effects. |
| Pitch & voice | **Harmony** | Create a key-aware harmony above or below the lead, fading out when tracking is uncertain. |
| Pitch & voice | **Doubler** | Add two short, slightly detuned vocal layers for thickness and stereo width. |
| Space | **Delay** | Add slap, KTV, or ballad-style echoes. |
| Space | **Reverb** | Create rooms, plates, or longer airy ambience. |
| Space | **Shimmer** | Add an octave-up halo to reverb tails for airy sections. |
| Dynamics | **Limiter** | Catch sudden vocal peaks at the end of a Profile. |

After the Profile, the complete stream still passes through the **Mix Bus Compressor**, **Stream Output Limiter**, and Master level. These belong to the overall output chain and do not rewrite the tone of an individual Profile. Final Limiter state is saved separately by mode: it is off by default in Normal Playback, on the first time Advanced Streaming Mode is used, and each mode remembers later manual changes independently.

Open an effect below for its signal role, primary controls, live-singing approach, and failure modes.

{% include effect-editor-gallery.html %}

{% include effects-reference-en.html %}

{% include profile-performance-controls.html %}

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h3>Profile examples</h3><p>Separate chat, singing range, genre, and special-effect chains so they can be recalled instead of rebuilt during a live stream.</p></div>
  <div class="feature-shot-grid">
    {% include localized-release-screenshot.html name="profile-horizontal-rack.png" alt="Horizontal Profile effect rack" caption="The horizontal rack shows the real block processing order across the page." %}
    {% include localized-release-screenshot.html name="profile-vertical-rack.png" alt="Vertical Profile effect rack" caption="The vertical rack uses the same blocks, bypass state, drag order, and editors without changing signal processing." %}
  </div>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">SONG AUTOMATION</p><h2>Switch Profiles automatically with song tags</h2><p>Use the tag button in the song list to assign a voice Profile. Playing that accompaniment automatically activates its effect chain. <strong>Automatic · Singing Profile</strong> uses the current default singing Profile.</p></div>
  {% include advanced-streaming-screenshot.html name="26-song-profile-tag-menu.png" alt="Profile tag menu opened from a song row" caption="Open the tag icon on a song row to choose Automatic Singing Profile, Live Chat, or any custom or built-in Profile. The colored tag remains visible on the row." %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">LIVE CONTROL</p><h2>Switch effects and mute the microphone manually</h2><p>The workspace toolbar can apply any Profile immediately or return control to song-tag automation. The nearby microphone button mutes or unmutes the microphone; check the meters on the routing page after switching.</p></div>
  {% include advanced-streaming-screenshot.html name="27-live-profile-menu.png" alt="Live Profile menu opened from the top workspace toolbar" caption="Use the top Profile menu to apply an effect immediately or return to automatic switching. Monitoring, recording, and microphone mute remain beside it." size="medium" %}
</div>

### What each top-bar control does

- **Monitor source** selects BGM/accompaniment, the full mix, BGM plus wet voice, BGM plus dry voice, or the processed microphone alone.
- The **headphones button** toggles the selected monitor without forgetting the source.
- **Left-click the record button** to start or stop immediately; **right-click it** to open the menu for full output or monitor content, WAV format, and the recording folder.
- **Left-click the microphone button** to mute or restore the mic; **right-click it** to open the Profile menu and select a chain or resume automatic switching. Its state icon matches the tray menu.
- The **Profile menu** applies a chain manually or returns control to Automatic Profile Switching.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>Choose what you monitor and record the mix</h2><p>The headphones button controls monitoring. Listen to BGM/accompaniment, the full mix, wet or dry microphone combinations, or the processed microphone alone. Recording can capture the full output or monitored content as WAV 16-bit PCM, WAV 24-bit PCM, or WAV 32-bit Float.</p></div>
  <p><strong>Avoid feedback:</strong> use headphones when microphone monitoring is enabled, not speakers that feed back into the mic. Make a short test recording before a live stream to check voice, accompaniment, levels, and latency.</p>
</div>

- **WAV 16-bit PCM** is the smallest and most compatible; **WAV 24-bit PCM** is the recommended balance for normal recording and editing; **WAV 32-bit Float** keeps the most post-production headroom but creates the largest files.

### Monitoring and recording do not rewrite Profile tone

Monitoring is a separate headphone path. Dry Cue uses an independent software capture to reduce dry-vocal monitoring latency where possible; it does not change the formal Mix, OBS, or recording path. For the lowest singing-monitor latency, prefer the audio interface's hardware Direct Monitor. The Meter's BGM/accompaniment-monitor and vocal-monitor knobs run from 0–200% and change only the performer's balance—not the audience Stream Output or any Compressor, EQ, or other Profile parameter. **Full Output** recording follows the formal Stream Output timeline, so BGM/accompaniment and Vocal share that timeline; Dry Cue or other software-monitor latency does not shift their relative offset in the recording. Record **Monitored Content** when you specifically want to inspect the headphone balance.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2>Inspect five audio paths and system load</h2><p>Advanced Streaming Mode exposes the Meter through View or the tray menu. It can dock on the right, float independently, and switch between horizontal and vertical layouts with one split button.</p></div>
  <p>The five tracks are <strong>BGM / accompaniment</strong>, <strong>Vocal (after Profile, before Mix)</strong>, <strong>Stream Output</strong>, <strong>BGM / accompaniment monitor</strong>, and <strong>Vocal monitor</strong>. Every track shows Peak; Stream Output also shows three-second short-term <strong>LUFS-S</strong>. Calibrated knobs cover 0–200% and use the main app's muted blue.</p>
  <p>The horizontal Meter can suggest raising Vocal or lowering BGM/accompaniment after a sustained imbalance. It is advisory only and never changes gain automatically. Silence, breaths, and instrumental sections are not immediately treated as a quiet vocal.</p>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="audio-meter-horizontal.png" alt="Five-track audio Meter with horizontal level bars" caption="The horizontal Meter shows five Peak tracks and their 0–200% controls. LUFS-S and balance advice appear when enough audio has been measured." %}{% include localized-release-screenshot.html name="audio-meter-vertical.png" alt="Five-track audio Meter panel with vertical level bars" caption="The vertical Meter provides the same five tracks and controls and can dock at the right side of the main window." %}</div>
  <div class="effect-reference"><details><summary><strong>When does loudness advice appear?</strong><span>Only after enough accompaniment and vocal activity</span></summary><div class="effect-reference__body"><p>The app observes a sustained section of accompaniment and vocal before comparing their balance. Advice is delayed at the beginning of a song, during silence, breaths, interludes, Profile changes, or audio-device recovery. If Vocal is already close to overload, the app only suggests lowering the accompaniment instead of raising Vocal. Changing tracks, stopping, restarting, or making a large seek starts a fresh observation.</p></div></details></div>
  <p>The CPU/RAM status shows this app's resource use. Hover over it for detailed system and app usage; Advanced Streaming Mode also shows the Buffer, processing time, estimated latency, and audio-interruption counts. Colors warn when load may affect stability.</p>
  {% include localized-release-screenshot.html name="system-resource-status.png" alt="Collapsed CPU and RAM summary at the lower-right of the main window" caption="This capture shows only the compact CPU/RAM summary before hover. Pointing at it expands the system/app load and Advanced-mode audio-health details described above." size="medium" %}
  {% include system-health-interpretation.html %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2>Keep control after minimizing to the system tray</h2><p>A setting chooses whether the main-window close button minimizes to the tray or exits. When the app stays in the background, common live controls remain available without reopening the workspace.</p></div>
  <p>The state-aware menu includes play/resume, pause, stop, restart from the beginning, Key, speed, Profile, microphone mute/restore, Lyrics Window, Open Main Window, and—only in Advanced Streaming Mode—the Meter. **Exit Application** closes the app and its playback features.</p>
  {% include localized-release-screenshot.html name="notification-area-menu.png" alt="Singing Stream Savior Windows notification-area menu while idle" caption="The compact menu appears while idle. Playback and Advanced Streaming Mode add the playback, Key, speed, Profile, microphone, and Meter actions described above. Exit at the bottom closes the app completely." size="medium" %}
  <p>Global shortcuts are grouped into Playback Controls and Microphone/Monitoring, include defaults, and hide Advanced-only actions in Normal Playback Mode.</p>
  {% include keyboard-shortcuts-reference.html %}
  {% include localized-release-screenshot.html name="keyboard-shortcuts.png" alt="Keyboard Shortcuts settings grouped by playback, microphone, and monitoring" caption="Defaults can be edited directly. Controls that require Advanced Streaming Mode are hidden in Normal Playback Mode." %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h2>Use the OBS audio plug-in or a virtual device</h2><p>Both routes carry the same Stream Output after the Profile, Mix Bus, and final limiter.</p></div>
  <p>The existing Install OBS Plug-in menu covers standard OBS, a Portable OBS folder, and removal. A successful install automatically selects <strong>Singing Stream Savior Audio (OBS Plugin)</strong>; restart OBS and add the source with the same name to receive the signal.</p>
  <p>With VB-CABLE, select CABLE Input in Singing Stream Savior and CABLE Output in an OBS Audio Input Capture. Disable any duplicate raw-microphone source to avoid doubled vocals.</p>
</div>

{% include obs-audio-output-setup.html %}

```text
Singing Stream Savior → virtual audio cable → OBS / Discord
```

The virtual audio cable is a separate Windows driver. Singing Stream Savior never downloads, runs, or changes the driver for you. Install it only from its official vendor.

> **A Windows restart is required.** VB-Audio's official instructions require a restart after installation. Restarting Singing Stream Savior or refreshing its device list is not a substitute for restarting Windows.

<a id="vb-cable-installation"></a>
## Install VB-CABLE

These steps cover a typical 64-bit Windows 10/11 PC. For Windows on ARM or another architecture, follow VB-Audio's official package instructions.

<a class="manual-cta" href="https://vb-audio.com/Cable/index.htm" target="_blank" rel="noopener noreferrer">Open the official VB-Audio download page</a>

<div class="setup-steps">
  <section class="setup-step"><span class="setup-step-number">1</span><div><h3>Download the current Windows package</h3><p>Under the Windows section of the official page, select <strong>New Package</strong>. Do not download an audio driver from a third-party mirror.</p><figure class="manual-figure"><a href="{{ '/assets/images/vb-cable/01-official-download.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/01-official-download.jpg' | relative_url }}" alt="VB-Audio official page with the new Windows VB-CABLE package outlined in red" loading="lazy" decoding="async"></a><figcaption>The package name and version can change. Always use the New Package shown by the official page.</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">2</span><div><h3>Extract the complete ZIP</h3><p>Choose <strong>Extract all</strong> for the downloaded ZIP, then open the extracted folder. Do not run Setup from the ZIP preview; that can cause a missing INF or corrupted driver-package error.</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/02-extracted-folder.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/02-extracted-folder.jpg' | relative_url }}" alt="Extracted VBCABLE Driver Pack45 folder" loading="lazy" decoding="async"></a><figcaption>Confirm that you are opening a normal folder, not browsing inside the archive.</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">3</span><div><h3>Run the 64-bit setup as administrator</h3><p>On a normal 64-bit Windows PC, right-click <code>VBCABLE_Setup_x64.exe</code> and choose <strong>Run as administrator</strong>. Use the file without <code>_x64</code> only on 32-bit Windows.</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/03-run-x64-setup.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/03-run-x64-setup.jpg' | relative_url }}" alt="VBCABLE Setup x64 executable in the extracted folder" loading="lazy" decoding="async"></a><figcaption>Select the setup file whose name includes <code>_x64</code>.</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">4</span><div><h3>Install the driver</h3><p>When Windows asks for permission, verify the publisher, then select <strong>Install Driver</strong>. Wait for the process to finish; do not repeatedly press the button or force-close the window.</p><figure class="manual-figure"><a href="{{ '/assets/images/vb-cable/04-install-driver.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/04-install-driver.jpg' | relative_url }}" alt="VB-Audio Virtual Cable Driver Installation window with Install Driver button" loading="lazy" decoding="async"></a><figcaption>The installer may look different in later driver versions, but the primary action remains Install Driver.</figcaption></figure></div></section>
  <section class="setup-step setup-step--important"><span class="setup-step-number">5</span><div><h3>Restart Windows after success</h3><p>After <strong>Installation Complete and Successful</strong> appears, acknowledge the message, save your work, and restart the computer. Continue with Singing Stream Savior, OBS, or Discord only after the restart.</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/05-restart-required.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/05-restart-required.jpg' | relative_url }}" alt="VB-CABLE installation successful message requiring a system restart" loading="lazy" decoding="async"></a><figcaption>This is not optional: the restart completes driver registration.</figcaption></figure></div></section>
</div>

### Connect Singing Stream Savior after restarting

1. Open **Settings → Audio Routing** and select **Advanced Streaming Mode (Mixed Output)**.
2. Select **Set up virtual output…**, then **Refresh devices**.
3. Set Stream Output to VB-CABLE's playback endpoint, normally **CABLE Input**.
4. Set Monitor Output to physical headphones or your audio interface. Do **not** select the same CABLE Input.
5. In OBS, add **Audio Input Capture** and select VB-CABLE's recording endpoint, normally **CABLE Output**. In Discord, select the same CABLE Output as the input device.
6. Play a test song and speak. Confirm activity in Singing Stream Savior's Stream Mix and in OBS/Discord, without duplicated voice or feedback.

> If OBS already captures the raw microphone directly, disable that duplicate source when using the complete Stream Mix. Otherwise the voice may be doubled, louder, or phasey.

### CABLE Input or Output is missing

- Confirm that Windows was actually restarted after installation.
- Confirm that Setup was run as administrator from the fully extracted folder.
- Select **Refresh devices** in Singing Stream Savior's Virtual Output Setup.
- Close apps that may be holding audio devices. If it is still missing, use the [official VB-Audio reference manual](https://vb-audio.com/Cable/VBCABLE_ReferenceManual.pdf).

<small>VB-CABLE names, interfaces, and installers are products of VB-Audio Software. Screenshots are included only to explain the installation steps.</small>
