---
title: Singing Stream Savior｜Playback, set lists, and lyrics for singing streams
description: Why Singing Stream Savior was created and what it can do
lang: en
translation_key: home
---

<div class="intro-hero">
  <div class="intro-hero__copy">
    <p class="intro-kicker">SINGING STREAM SAVIOR · LIVE CONTROL DESK</p>
    <h1>Let the app remember the stream chores</h1>
    <p class="intro-lead">Prepare and control BGM, karaoke tracks, Reserve, OBS set lists, and lyrics from one workspace. Keep your attention on singing and chat instead of rearranging windows between songs.</p>
    <div class="intro-actions"><a class="intro-button intro-button--primary" href="{{ '/en/guide.html#getting-started' | relative_url }}">Get started</a><a class="intro-button" href="#features">Explore the features</a><a class="intro-button" href="{{ '/en/resources.html' | relative_url }}">Software download</a></div>
  </div>
  <figure class="intro-hero__visual"><img src="{{ '/assets/images/en/full-workspace.png' | relative_url }}" alt="English Full Mode with the library, BGM, karaoke player, and Reserve"><figcaption>Song selection, playback, and stream visuals in one workspace.</figcaption></figure>
</div>

{% include demo-video.html %}

<section class="origin-story" id="why">
  <div><p class="section-kicker">Why was it made?</p><h2>It began with the small mistakes that happen during singing streams</h2><p>I often forgot to turn BGM off before singing, turn it back on afterward, or add the song I had just finished to the set list shown in OBS. None of these tasks is difficult, but they are easy to miss while singing, talking to chat, and finding the next track.</p><p>Singing Stream Savior was built to handle that rhythm. First choose and start your BGM. Starting karaoke then pauses that BGM automatically, and stopping or finishing the karaoke track resumes it. The set-list overlay also follows song status without retyping every title in OBS.</p></div>
  <div class="stream-sequence" aria-label="Automatic handoff between BGM and karaoke"><div class="stream-step stream-step--playing"><span>BGM</span><strong>Plays between songs</strong></div><div class="stream-arrow"><span>Start karaoke</span></div><div class="stream-step stream-step--active stream-step--paused"><span>Karaoke</span><strong>BGM pauses</strong></div><div class="stream-arrow"><span>Pause or finish</span></div><div class="stream-step stream-step--playing"><span>BGM</span><strong>Playback resumes</strong></div></div>
</section>

<section class="demo-flow" aria-labelledby="demo-flow-title">
  <div class="section-heading">
    <p class="section-kicker">From setup to live output</p>
    <h2 id="demo-flow-title">Preview the result in Singing Stream Savior, then use it in OBS</h2>
    <p>The screenshots below use the English interface and real 2.0.3.1 controls with isolated sample data.</p>
  </div>
  <div class="demo-flow__track">
    <article class="demo-flow__step">
      <header><span class="demo-flow__number">01</span><div><strong>Choose a set-list theme</strong><small>Playlist Appearance</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/en/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/en/theme-workspace.png' | relative_url }}" alt="English Playlist Appearance page automatically demonstrating Transparent Black v2 with a long Set List" loading="lazy" decoding="async"></a>
      <p>The automatic demo cycles through songs and a long Set List so you can see Now Singing, Reserve, and Next On in motion.</p>
    </article>
    <article class="demo-flow__step">
      <header><span class="demo-flow__number">02</span><div><strong>Check synchronized lyrics</strong><small>Lyrics preview</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/en/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/en/lyrics-reading-preview.png' | relative_url }}" alt="English Lyrics page showing timing controls, line-count sliders, and synchronized Japanese sample lyrics" loading="lazy" decoding="async"></a>
      <p>Confirm the current line, font, color, highlight, and timing while the karaoke track is playing.</p>
    </article>
    <article class="demo-flow__step">
      <header><span class="demo-flow__number">03</span><div><strong>Confirm the OBS result</strong><small>Live output</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/demo-obs-result.png' | relative_url }}"><img src="{{ '/assets/images/demo-obs-result.png' | relative_url }}" alt="OBS showing a transparent set list and synchronized lyrics over a stream background" loading="lazy" decoding="async"></a>
      <p>The set list and lyrics are independent sources in OBS, so each can be resized, cropped, and positioned for your scene.</p>
    </article>
  </div>
</section>

<section class="feature-section" id="features">
  <div class="section-heading"><p class="section-kicker">Core features</p><h2>Designed around the real flow of a singing stream</h2><p>Preparing songs, performing, and updating OBS are parts of one continuous workflow.</p></div>
  <div class="feature-grid">
    <article class="feature-card feature-card--signal"><span class="feature-card__label">Playback handoff</span><h3>BGM and karaoke work together</h3><p>First choose and start your BGM. Starting karaoke pauses or fades it automatically; stopping or finishing the karaoke track resumes the BGM that was playing.</p></article>
    <article class="feature-card"><span class="feature-card__label">Library & Reserve</span><h3>Plan ahead without losing flexibility</h3><p>Organize songs and Reserve, play a backing track immediately, or create an unaccompanied item for a cappella and self-accompanied performances.</p></article>
    <article class="feature-card"><span class="feature-card__label">OBS set list</span><h3>Change themes, not text after every song</h3><p>Choose Default, transparent, Card, CD, or illustrated themes, inspect every state in the automatic demo, then drag the overlay into OBS.</p></article>
    <article class="feature-card"><span class="feature-card__label">Lyrics</span><h3>Read them yourself or show the audience</h3><p>Search or import synchronized lyrics, open a movable Lyrics Window, or create an OBS lyric overlay. Japanese supports Hiragana and Romaji, and Korean can show romanization.</p></article>
    <article class="feature-card"><span class="feature-card__label">Backing sources</span><h3>Local files and YouTube backing tracks in one player</h3><p>Your backing track may be a vocal-removed, self-recorded, or downloaded local file—or a version you just found on YouTube. Singing Stream Savior supports both, so you do not have to switch between a media player and browser.</p></article>
    <article class="feature-card"><span class="feature-card__label">Workspace</span><h3>Full, Compact, and Mini modes</h3><p>Prepare in Full Mode, then reduce the window for the stream. Mini Mode keeps karaoke, Reserve, History, and the Lyrics Window close at hand.</p></article>
  </div>
</section>

<aside class="feature-note"><span>Stream timestamps</span><div><strong>OBS WebSocket stream timestamps</strong><p>The app can read OBS’s live timer, record when karaoke starts, and show timestamps in supported Set Lists. Normal set-list and lyric overlays do not require WebSocket.</p></div></aside>

<section class="intro-next"><p class="section-kicker">Ready to begin</p><h2>Import one song and complete a test playback</h2><p>The guide begins with extracting the app, launching it, and creating your first project.</p><a class="intro-button intro-button--primary" href="{{ '/en/guide.html#getting-started' | relative_url }}">Open the user guide</a></section>
