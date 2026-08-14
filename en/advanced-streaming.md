---
title: Advanced Streaming Mode and VB-CABLE setup
description: Route the processed microphone and complete stream mix from Singing Stream Savior 2.1.0.0 to OBS or Discord
lang: en
translation_key: advanced-streaming
published: false
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

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h2>Create and edit voice Profiles</h2><p>A Profile is a reusable vocal effect chain. Add built-in effects or VST3 plug-ins, drag blocks into processing order, bypass individual blocks, and audition the result before saving.</p></div>
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

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>Choose what you monitor and record the mix</h2><p>The headphones button controls monitoring. Listen to BGM/accompaniment, the full mix, wet or dry microphone combinations, or the processed microphone alone. Recording can capture the full output or monitored content as WAV 16-bit PCM or WAV 32-bit Float.</p></div>
  <div class="feature-shot-grid feature-shot-grid--compact">
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}" alt="Monitor source menu for BGM, full mix, wet or dry microphone, and processed microphone" loading="lazy" decoding="async"></a><figcaption>Monitoring changes only what you hear in your headphones. Stream Output continues to follow the routing settings.</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}" alt="Full output, monitored content, WAV format, and recording-folder options" loading="lazy" decoding="async"></a><figcaption>32-bit Float preserves more headroom for editing but uses more storage; 16-bit PCM suits normal delivery.</figcaption></figure>
  </div>
  <p><strong>Avoid feedback:</strong> use headphones when microphone monitoring is enabled, not speakers that feed back into the mic. Make a short test recording before a live stream to check voice, accompaniment, levels, and latency.</p>
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
