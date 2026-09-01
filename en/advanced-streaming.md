---
title: Complete 2.1.0.0 guide to Advanced Streaming, Profiles, and audio routing
description: Learn the 2.1.0.0 live controls, vocal Profiles, built-in effects, routing, Meter, recording, direct OBS output, and system-tray workflow
lang: en
translation_key: advanced-streaming
published: true
---

# Advanced Streaming Mode

Starting with **2.1.0.0**, Advanced Streaming Mode mixes BGM, accompaniment, and the processed microphone inside Singing Stream Savior, then sends the complete Stream Mix to OBS, Discord, or another app.

<aside class="version-preview" role="note">
  <span class="version-preview__badge">2.1.0.0 PREVIEW</span>
  <div><strong>This page covers an unreleased version.</strong><p>The current public download may not include these tabs and controls yet. Screenshots are from the Traditional Chinese preview build; controls follow the language selected in the app. Labels and layouts can still change before release.</p></div>
</aside>

## Settings moved in 2.1.0.0

- **YouTube downloads** moved to **Settings → Files &amp; Projects**, together with project and media-folder controls.
- **Advanced Settings** was renamed **Stream Timestamps**. OBS WebSocket, stream-time detection, and Set List timestamps are configured there.
- The new **Audio Routing** tab manages normal playback, advanced mixing, the audio driver, outputs, monitoring, and recording.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2>Choose normal playback or Advanced Streaming Mode</h2><p>Begin in <strong>Settings → Audio Routing</strong>. Normal Playback outputs the app's BGM and accompaniment only. Advanced Streaming Mode adds the microphone, Profile effect chains, complete mix, and virtual output.</p></div>
  <div class="feature-shot-grid feature-shot-grid--wide">
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}" alt="Normal Playback and Advanced Streaming Mode selector on the Audio Routing tab" loading="lazy" decoding="async"></a><figcaption>Stay in Normal Playback when you do not need microphone processing. Use Advanced Streaming Mode to send a complete mix to OBS or Discord.</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}" alt="ASIO and Windows Audio driver choices" loading="lazy" decoding="async"></a><figcaption>ASIO is intended for low-latency singing; Windows Audio compatibility mode works with typical Windows devices.</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}" alt="Automatic, WASAPI, DirectSound, and MME playback methods" loading="lazy" decoding="async"></a><figcaption>Automatic (recommended) chooses a suitable method first. Select a specific API only when troubleshooting device compatibility.</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}" alt="Normal Playback route from BGM to system output with signal meters" loading="lazy" decoding="async"></a><figcaption>The graph shows the active signal path, estimated latency, buffer, sample rate, and stability.</figcaption></figure>
  </div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}" alt="Complete audio route with BGM, microphone, voice Profiles, stream mix, virtual output, monitor, and recording" loading="lazy" decoding="async"></a><figcaption>Advanced Streaming Mode places sources, two voice Profiles, the stream mix, Stream Output, monitoring, and recording in one visual route.</figcaption></figure>
</div>

### App-buffer health check and yellow status

The **App safety buffer** selector and **Check buffer stability…** button stay together in one visible row. With ASIO input, the row appears directly below the ASIO sample-rate/hardware-buffer panel; it remains available while the advanced **Windows playback compatibility** section is collapsed. **Quick check** tests 512 and 1024 frames in about 25 seconds. **Full check** tests 128, 256, 512, and 1024 frames in about five minutes. It diagnoses the app buffer without changing the audio interface's separate ASIO hardware buffer, and its recommendation can be applied directly. A low value such as 128 or 256 is treated as verified only after both independent strict observations in Full check pass for the current devices, Profile, effects, and route.

The yellow messages have two different meanings. **Check dropouts** appears for microphone or monitor underruns/overruns, a discontinuity in the formal Stream path, or an interrupted/recovering device. **Check audio timing** requires the same callback, clock, or latency-accounting anomaly to persist for about two seconds. A momentary callback peak alone is not proof of an audible dropout. Hover over Stability to inspect route counters, device recovery, callback peak/period, and anomaly flags.

## Create and edit voice Profiles

A Profile is a reusable vocal effect chain. Add built-in effects or VST3 plug-ins, drag blocks into processing order, bypass individual blocks, and audition the result before saving.

### What the Profile editor saves

- Every block's enabled state, parameters, and processing order are stored with the Profile and restored when the project opens again.
- Built-in effects and VST3 plug-ins can be combined, with up to eight VST3 slots. The plug-in parameter state is stored with the Profile.
- Dragging a block changes the real processing order. Bypass temporarily skips an effect without deleting its settings.
- You can audition edits live. Returning to Live Control, minimizing to the tray, or closing the editor leaves Profile audition and restores the current live-monitoring route.
- Factory Profiles are practical starting points; tune them for the microphone, room noise, vocal range, and singing style before saving a personal Profile.

### Fifteen built-in vocal effects

All editors share the same matte panel, calibrated knobs, live graph, and Help button. Simple mode starts from a useful scenario; Advanced mode exposes the complete parameter set.

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

After the Profile, the complete stream still passes through the **Mix Bus Compressor**, **Stream Output Limiter**, and Master level. These belong to the overall output chain and do not rewrite the tone of an individual Profile.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h3>Profile examples</h3><p>Separate chat, singing range, genre, and special-effect chains so they can be recalled instead of rebuilt during a live stream.</p></div>
  <div class="feature-shot-grid">
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}" alt="High-range singing Profile with dynamic suppression, EQ, reverb, and limiter blocks" loading="lazy" decoding="async"></a><figcaption>Create separate chains for high or low ranges, KTV, traditional styles, and other singing situations.</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}" alt="Streaming chat Profile with input gain, noise gate, and limiter blocks" loading="lazy" decoding="async"></a><figcaption>Keep talking and singing Profiles separate instead of readjusting every effect during a stream.</figcaption></figure>
  </div>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">SONG AUTOMATION</p><h2>Switch Profiles automatically with song tags</h2><p>Use the tag button in the song list to assign a voice Profile. Playing that accompaniment automatically activates its effect chain. <strong>Automatic · Singing Profile</strong> uses the current default singing Profile.</p></div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}" alt="Song tag menu for choosing automatic or a specific voice Profile" loading="lazy" decoding="async"></a><figcaption>Prepare effects for different ranges, genres, or special songs. Always test the voice and level before going live.</figcaption></figure>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">LIVE CONTROL</p><h2>Switch effects and mute the microphone manually</h2><p>The workspace toolbar can apply any Profile immediately or return control to song-tag automation. The nearby microphone button mutes or unmutes the microphone; check the meters on the routing page after switching.</p></div>
  <figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}" alt="Workspace monitor source, headphones, record, microphone mute, and Profile controls" loading="lazy" decoding="async"></a><figcaption>A manual selection takes effect immediately. Choose Automatic Profile Switching to follow song tags again.</figcaption></figure>
</div>

### What each top-bar control does

- **Monitor source** selects BGM/accompaniment, the full mix, BGM plus wet voice, BGM plus dry voice, or the processed microphone alone.
- The **headphones button** toggles the selected monitor without forgetting the source.
- The **record button** starts or stops immediately; its menu chooses full output or monitor content, WAV format, and recording folder.
- The **microphone button** mutes or restores the mic and uses the same state icon as the tray menu.
- The **Profile menu** applies a chain manually or returns control to Automatic Profile Switching.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>Choose what you monitor and record the mix</h2><p>The headphones button controls monitoring. Listen to BGM/accompaniment, the full mix, wet or dry microphone combinations, or the processed microphone alone. Recording can capture the full output or monitored content as WAV 16-bit PCM or WAV 32-bit Float.</p></div>
  <div class="feature-shot-grid feature-shot-grid--compact">
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}" alt="Monitor source menu for BGM, full mix, wet or dry microphone, and processed microphone" loading="lazy" decoding="async"></a><figcaption>Monitoring changes only what you hear in your headphones. Stream Output continues to follow the routing settings.</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}" alt="Full output, monitored content, WAV format, and recording-folder options" loading="lazy" decoding="async"></a><figcaption>32-bit Float preserves more headroom for editing but uses more storage; 16-bit PCM suits normal delivery.</figcaption></figure>
  </div>
  <p><strong>Avoid feedback:</strong> use headphones when microphone monitoring is enabled, not speakers that feed back into the mic. Make a short test recording before a live stream to check voice, accompaniment, levels, and latency.</p>
</div>

### Monitoring and recording do not rewrite Profile tone

Monitoring is a separate headphone path. Dry Cue uses an independent software capture to reduce dry-vocal monitoring latency where possible; it does not change the formal Mix, OBS, or recording path. For the lowest singing-monitor latency, prefer the audio interface's hardware Direct Monitor. The Meter's BGM/accompaniment-monitor and vocal-monitor knobs run from 0–200% and change only the performer's balance—not the audience Stream Output or any Compressor, EQ, or other Profile parameter. **Full Output** recording follows the formal Stream Output timeline, so BGM/accompaniment and Vocal share that timeline; Dry Cue or other software-monitor latency does not shift their relative offset in the recording. Record **Monitored Content** when you specifically want to inspect the headphone balance.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2>Inspect five audio paths and system load</h2><p>Advanced Streaming Mode exposes the Meter through View or the tray menu. It can dock on the right, float independently, and switch between horizontal and vertical layouts with one split button.</p></div>
  <p>The five tracks are <strong>BGM / accompaniment</strong>, <strong>Vocal (after Profile, before Mix)</strong>, <strong>Stream Output</strong>, <strong>BGM / accompaniment monitor</strong>, and <strong>Vocal monitor</strong>. Every track shows Peak; Stream Output also shows three-second short-term <strong>LUFS-S</strong>. Calibrated knobs cover 0–200% and use the main app's muted blue.</p>
  <p>The horizontal Meter can suggest raising Vocal or lowering BGM/accompaniment after a sustained imbalance. It is advisory only and never changes gain automatically. No advice appears before qualified vocal activity has been detected. Five continuous seconds without qualified Vocal is treated as an interlude, clears the old advice and evidence, and requires the next vocal section to qualify again.</p>
  <div class="effect-reference"><details><summary><strong>How loudness advice is qualified</strong><span>Silence, breaths, and interludes are excluded</span></summary><div class="effect-reference__body"><p>The Meter evaluates 100 ms buckets from the live-output path, using BGM/accompaniment before Mix and Vocal after the Profile. Evidence accumulates only while BGM/accompaniment is truly in the Playing state, its signal is present, routing and microphone health are good, and vocal activity qualifies. When Noise Gate telemetry is available, the gate must be open for about 25% or more of the bucket; average post-Profile Vocal energy must be at least −45 dBFS and raw-microphone Peak at least −50 dBFS. A warning requires at least 10 seconds of playback, at least 6 seconds of qualified Vocal in the latest 12 seconds, and two phrases of at least 1.2 seconds each separated by at least 300 ms. BGM/accompaniment must be no more than 2 dB below Vocal—or louder—for at least 6 seconds of the latest qualified evidence. “Vocal may be too quiet” additionally requires average qualified Vocal energy at or below −26 dBFS. If recent raw or processed Vocal Peak reaches −6 dBFS or higher, or limiter gain reduction exceeds 1 dB, only the safer suggestion to lower accompaniment remains; the Meter will not recommend raising Vocal. Changing tracks, stopping or restarting playback, making a significant seek, switching Profiles, route interruption or pending recovery, and hiding the Meter reset the evidence. This is sustained signal-activity and loudness comparison, not speech recognition.</p></div></details></div>
  <p>The borderless CPU/RAM status distinguishes total-system and app use. In Advanced Streaming Mode its tooltip also includes buffer size, callback time, estimated latency, and underrun/overrun counts, with color warnings when load may affect stability.</p>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2>Keep control after minimizing to the system tray</h2><p>A setting chooses whether the main-window close button minimizes to the tray or exits. When the app stays in the background, common live controls remain available without reopening the workspace.</p></div>
  <p>The state-aware menu includes play/resume, pause, stop, restart from the beginning, Key, speed, Profile, microphone mute/restore, Lyrics Window, Open Main Window, and—only in Advanced Streaming Mode—the Meter. **Exit Application** is the action that closes the app and its helpers.</p>
  <p>Global shortcuts are grouped into Playback Controls and Microphone/Monitoring, include defaults, and hide Advanced-only actions in Normal Playback Mode.</p>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h2>Use the OBS audio plug-in or a virtual device</h2><p>Both routes carry the same Stream Output after the Profile, Mix Bus, and final limiter.</p></div>
  <p>The existing Install OBS Plug-in menu covers standard OBS, a Portable OBS folder, and removal. A successful install automatically selects <strong>Singing Stream Savior Audio (OBS Plugin)</strong>; restart OBS and add the source with the same name to receive the signal.</p>
  <p>With VB-CABLE, select CABLE Input in Singing Stream Savior and CABLE Output in an OBS Audio Input Capture. Disable any duplicate raw-microphone source to avoid doubled vocals.</p>
</div>

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
