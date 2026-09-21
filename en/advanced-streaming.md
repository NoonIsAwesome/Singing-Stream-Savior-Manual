---
title: "Advanced audio: microphone effects and mixed output"
description: "Since 2.1.0.0, Advanced Streaming Mode mixes BGM/accompaniment with the Profile-processed microphone inside Singing Stream Savior, then sends the complete Stream Mix to OBS, Discord or another calling/streaming app."
lang: en
translation_key: advanced-streaming
published: true
---

# Advanced audio: microphone effects and mixed output

<section data-article-lead markdown="1">

Since **2.1.0.0**, Advanced Streaming Mode mixes **BGM/accompaniment** with the **Profile-processed microphone** inside Singing Stream Savior, then sends the complete **Stream Mix** to OBS, Discord or another calling/streaming app.

<nav class="article-outline audio-output-targets" id="advanced-quick-start" aria-label="Choose where to send the mix">
  <strong>Choose where to send the mix</strong><ul><li><a href="#output-obs">Send audio to OBS</a></li><li><a href="#output-discord">Send audio to Discord or another calling app</a></li></ul>
</nav>

<a id="obs-output-walkthrough-title"></a>
<h2 id="output-obs">Send audio to OBS</h2>
<p>For OBS alone, start with the dedicated audio plug-in; no virtual cable is required. Complete these four steps first, then configure the default singing Profile below.</p>
{% include stream-route-steps.html target="obs" %}

<details class="audio-route-details" markdown="1"><summary>Alternative OBS route and plug-in details (expand if needed)</summary>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h3>Use the OBS audio plug-in or a virtual device</h3><p>Both routes carry the same Stream Output after the Profile, Mix Bus, and final limiter.</p></div>
  <p>The existing Install OBS Plug-in menu covers standard OBS, a Portable OBS folder, and removal. A successful install automatically selects <strong>Singing Stream Savior Audio (OBS Plugin)</strong>; restart OBS and add the source with the same name to receive the signal.</p>
  <p>With VB-CABLE, select CABLE Input in Singing Stream Savior and CABLE Output in an OBS Audio Input Capture. Disable any duplicate raw-microphone source to avoid doubled vocals.</p>
</div>

{% include stream-route-steps.html target="virtual" %}

</details>

<a id="discord-output-walkthrough-title"></a>
<h2 id="output-discord">Send audio to Discord or another calling app</h2>
<p>Use a virtual device such as VB-CABLE to present the finished mix as a calling app’s microphone input. OBS does not need to be open: Singing Stream Savior sends to CABLE Input and Discord receives CABLE Output.</p>
{% include stream-route-steps.html target="discord" %}
<p>Discord may still re-encode, compress, or otherwise process call audio, so it can sound worse than a local recording or OBS capture even when routing is correct. Use OBS or local recording when preserving the highest quality matters.</p>

<a id="vb-cable-installation"></a>
<details class="audio-route-details" markdown="1"><summary>VB-CABLE installation screenshots (expand if needed)</summary>

The virtual audio cable is a separate Windows driver. Singing Stream Savior never downloads, runs, or changes the driver for you. Install it only from its official vendor.

> **A Windows restart is required.** VB-Audio's official instructions require a restart after installation. Restarting Singing Stream Savior or refreshing its device list is not a substitute for restarting Windows.

### Install VB-CABLE

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

</details>

</section>


<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2 id="route-modes">Normal Playback versus Advanced Streaming Mode</h2><p>Begin in <strong>Settings → Audio Routing</strong>. Normal Playback outputs the app's BGM and accompaniment only. Advanced Streaming Mode adds the microphone, Profile effect chains, complete mix, and virtual output.</p></div>
  {% include localized-release-screenshot.html name="audio-routing.png" alt="Upper portion of the 2.1.0.0 Audio Routing page" caption="The upper part shows the OBS plug-in and virtual-output entries, route mode, Windows Audio, App Buffer, health check, source, Profile, Mix, and Stream Output. Scroll down for Monitor, recording, and the rest of the route." %}
  {% include localized-release-screenshot.html name="audio-routing-bottom.png" alt="Lower portion of the 2.1.0.0 Audio Routing page" caption="The lower part shows Monitor, recording, route lines, and latency. Monitor latency does not change accompaniment-to-vocal alignment in OBS or Stream Output." %}
</div>

Normal Playback retains BGM/accompaniment playback and lyric/set-list features. Advanced mode also processes the microphone and creates the mix. A vocal Profile processes the microphone, not accompaniment through the same chain. Monitor is your listening path; OBS/Discord receive Stream Output.

**Microphone → Profile effect chain → Mix with BGM/accompaniment → Stream Output → OBS / Discord**

<h2 id="singing-profile-defaults">Default singing Profile and automatic switching</h2>

Choose singing and chat defaults in Settings → Audio Routing; you do not need to tag every song. Then confirm the main Profile menu uses automatic switching rather than a fixed manual Profile.

{% include profile-introduction.html %}

{% include stream-route-steps.html target="default" %}

[Open Profile settings (streaming effects) →]({{ '/en/profiles.html' | relative_url }})

<h2 id="audio-reference">Devices, monitoring, recording and stability reference</h2>

After output and automatic switching work, use the following reference as needed. Before first serious use, run a stability check while no stream, call or external recording is active; it need not be repeated before every stream.

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

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>Choose what you monitor and record the mix</h2><p>The headphones button controls monitoring. Listen to BGM/accompaniment, the full mix, wet or dry microphone combinations, or the processed microphone alone. Recording can capture the full output or monitored content as WAV 16-bit PCM, WAV 24-bit PCM, or WAV 32-bit Float.</p></div>
  <p><strong>Avoid feedback:</strong> use headphones when microphone monitoring is enabled, not speakers that feed back into the mic. Make a short test recording before a live stream to check voice, accompaniment, levels, and latency.</p>
</div>

- **WAV 16-bit PCM** is the smallest and most compatible; **WAV 24-bit PCM** is the recommended balance for normal recording and editing; **WAV 32-bit Float** keeps the most post-production headroom but creates the largest files.

### Monitoring and recording do not rewrite Profile tone

Monitoring is a separate headphone path. Dry Cue uses an independent software capture to reduce dry-vocal monitoring latency where possible; it does not change the formal Mix, OBS, or recording path. For the lowest singing-monitor latency, prefer the audio interface's hardware Direct Monitor. The Meter's BGM/accompaniment-monitor and vocal-monitor knobs run from 0–200% and change only the performer's balance—not the audience Stream Output or any Compressor, EQ, or other Profile parameter. **Full Output** recording follows the formal Stream Output timeline, so BGM/accompaniment and Vocal share that timeline; Dry Cue or other software-monitor latency does not shift their relative offset in the recording. Record **Monitored Content** when you specifically want to inspect the headphone balance.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2>Inspect six audio paths and system load</h2><p>Advanced Streaming Mode exposes the Meter through View or the tray menu. It can dock on the right, float independently, and switch between horizontal and vertical layouts with one split button.</p></div>
  <p>The six tracks appear in this order: <strong>BGM / accompaniment</strong>, <strong>Vocal (after Profile, before Mix)</strong>, <strong>BGM / accompaniment monitor</strong>, <strong>Vocal monitor</strong>, <strong>Guide vocal Monitor</strong>, and <strong>Master / Stream Output</strong>. Every track shows Peak; Master / Stream Output also shows three-second short-term <strong>LUFS-S</strong>. All gains run from 0–200% except Guide vocal Monitor at 0–100%; guide vocal is monitor-only and never enters Stream or OBS.</p>
  <p>The horizontal Meter can suggest raising Vocal or lowering BGM/accompaniment after a sustained imbalance. It is advisory only and never changes gain automatically. Silence, breaths, and instrumental sections are not immediately treated as a quiet vocal.</p>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="audio-meter-horizontal.png" alt="Six-track audio Meter with horizontal level bars" caption="Scroll down in the horizontal Meter to see Guide vocal Monitor and the final Master / Stream Output row. Guide volume is 0–100%; other gains are 0–200%." %}{% include localized-release-screenshot.html name="audio-meter-vertical.png" alt="Six-track audio Meter panel with vertical level bars" caption="The vertical Meter provides the same six tracks and can dock on the right side of the main window or float independently; guide vocal remains monitor-only." %}</div>
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

<p id="profile-chain-heading">Detailed effects are now in the separate Profile chapter. <a href="{{ '/en/profiles.html#profile-chain-heading' | relative_url }}">Open Profile settings (streaming effects) →</a></p>

## Settings moved in 2.1.0.0

- **YouTube downloads** moved to **Settings → Files &amp; Projects**, together with project and media-folder controls.
- **Advanced Settings** was renamed **Stream Timestamps**. OBS WebSocket, stream-time detection, and Set List timestamps are configured there.
- The new **Audio Routing** tab manages normal playback, advanced mixing, the audio driver, outputs, monitoring, and recording.
