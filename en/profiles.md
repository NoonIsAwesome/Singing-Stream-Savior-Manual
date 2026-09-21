---
title: "Profile settings (streaming effects)"
description: "A Profile is a reusable vocal-effect setup that stores the effects, parameters, enabled states and order of a Signal Chain. This chapter covers effect editing, audition, song tags, factory Profiles and VST3."
lang: en
translation_key: profiles
---

# Profile settings (streaming effects)

{% include profile-prerequisite.html %}

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
