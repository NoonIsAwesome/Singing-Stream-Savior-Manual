---
title: Advanced Streaming Mode and VB-CABLE setup
description: Route the processed microphone and complete stream mix from Singing Stream Savior 2.1.0.0 to OBS or Discord
lang: en
translation_key: advanced-streaming
---

# Advanced Streaming Mode

Starting with **2.1.0.0**, Advanced Streaming Mode mixes BGM, accompaniment, and the processed microphone inside Singing Stream Savior, then sends the complete Stream Mix to OBS, Discord, or another app.

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

## Connect Singing Stream Savior after restarting

1. Open **Settings → Audio Routing** and select **Advanced Streaming Mode (Mixed Output)**.
2. Select **Set up virtual output…**, then **Refresh devices**.
3. Set Stream Output to VB-CABLE's playback endpoint, normally **CABLE Input**.
4. Set Monitor Output to physical headphones or your audio interface. Do **not** select the same CABLE Input.
5. In OBS, add **Audio Input Capture** and select VB-CABLE's recording endpoint, normally **CABLE Output**. In Discord, select the same CABLE Output as the input device.
6. Play a test song and speak. Confirm activity in Singing Stream Savior's Stream Mix and in OBS/Discord, without duplicated voice or feedback.

> If OBS already captures the raw microphone directly, disable that duplicate source when using the complete Stream Mix. Otherwise the voice may be doubled, louder, or phasey.

## CABLE Input or Output is missing

- Confirm that Windows was actually restarted after installation.
- Confirm that Setup was run as administrator from the fully extracted folder.
- Select **Refresh devices** in Singing Stream Savior's Virtual Output Setup.
- Close apps that may be holding audio devices. If it is still missing, use the [official VB-Audio reference manual](https://vb-audio.com/Cable/VBCABLE_ReferenceManual.pdf).

<small>VB-CABLE names, interfaces, and installers are products of VB-Audio Software. Screenshots are included only to explain the installation steps.</small>
