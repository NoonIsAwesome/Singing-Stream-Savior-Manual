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
    <div class="intro-actions"><a class="intro-button intro-button--primary" href="{{ '/en/guide.html#getting-started' | relative_url }}">Get started</a><a class="intro-button" href="#features">Explore the features</a></div>
  </div>
  <figure class="intro-hero__visual"><img src="{{ '/assets/images/en/full-workspace.png' | relative_url }}" alt="English Full Mode with the library, BGM, karaoke player, and Reserve"><figcaption>Song selection, playback, and stream visuals in one workspace.</figcaption></figure>
</div>

<section class="origin-story" id="why">
  <div><p class="section-kicker">Why was it made?</p><h2>It began with the small mistakes that happen during singing streams</h2><p>I often forgot to turn BGM off before singing, turn it back on afterward, or add the song I had just finished to the set list shown in OBS. None of these tasks is difficult, but they are easy to miss while singing, talking to chat, and finding the next track.</p><p>Singing Stream Savior was built to handle that rhythm. First choose and start your BGM. Starting karaoke then pauses that BGM automatically, and stopping or finishing the karaoke track resumes it. The set-list overlay also follows song status without retyping every title in OBS.</p></div>
  <div class="stream-sequence" aria-label="Automatic handoff between BGM and karaoke"><div class="stream-step"><span>BGM</span><strong>Plays between songs</strong></div><div class="stream-arrow"><span>Start karaoke</span></div><div class="stream-step stream-step--active"><span>Karaoke</span><strong>BGM pauses</strong></div><div class="stream-arrow"><span>Pause or finish</span></div><div class="stream-step"><span>BGM</span><strong>Playback resumes</strong></div></div>
</section>

<section class="feature-section" id="features">
  <div class="section-heading"><p class="section-kicker">Core features</p><h2>Designed around the real flow of a singing stream</h2><p>Preparing songs, performing, and updating OBS are parts of one continuous workflow.</p></div>
  <div class="feature-grid">
    <article class="feature-card feature-card--signal"><span class="feature-card__label">Playback handoff</span><h3>BGM and karaoke work together</h3><p>First choose and start your BGM. Starting karaoke then pauses it automatically; stopping or finishing the karaoke track resumes the BGM that was playing.</p></article>
    <article class="feature-card"><span class="feature-card__label">Library & Reserve</span><h3>Plan ahead without losing flexibility</h3><p>Organize a library, playlists, favorites, and Reserve order. Pick from Reserve or double-click any song to play it immediately.</p></article>
    <article class="feature-card"><span class="feature-card__label">OBS set list</span><h3>Change themes, not text after every song</h3><p>Choose Default, transparent, Card, CD, or illustrated themes and drag the overlay into OBS. Now Singing, Set List, Reserve, and Next On follow playback status.</p></article>
    <article class="feature-card"><span class="feature-card__label">Lyrics</span><h3>Read them yourself or show the audience</h3><p>Search or import synchronized lyrics, open a movable Lyrics Window, or create an OBS lyric overlay. Japanese lyrics can include hiragana or spaced romaji aids.</p></article>
    <article class="feature-card"><span class="feature-card__label">Cover art</span><h3>Give Card and CD themes a song identity</h3><p>Cover art and lyrics are optional. When cover art is embedded, Card and CD can present the current song as a card or disc.</p></article>
    <article class="feature-card"><span class="feature-card__label">Workspace</span><h3>Full, Compact, and Mini modes</h3><p>Prepare in Full Mode, then reduce the window for the stream. Mini Mode keeps karaoke, Reserve, History, and the Lyrics Window close at hand.</p></article>
  </div>
</section>

<aside class="experimental-note"><span>Experimental</span><div><strong>OBS WebSocket stream timestamps</strong><p>The app can read OBS’s live timer, record when karaoke starts, and show timestamps in supported Set Lists. Normal set-list and lyric overlays do not require WebSocket.</p></div></aside>

<section class="intro-next"><p class="section-kicker">Ready to begin</p><h2>Import one song and complete a test playback</h2><p>The guide begins with extracting the app, launching it, and creating your first project.</p><a class="intro-button intro-button--primary" href="{{ '/en/guide.html#getting-started' | relative_url }}">Open the user guide</a></section>
