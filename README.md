---
title: 歌回救星｜為歌回直播整理播放、歌單與歌詞
description: 認識 Singing Stream Savior 的設計初衷與主要功能
lang: zh-TW
translation_key: home
---

<div class="intro-hero">
  <div class="intro-hero__copy">
    <p class="intro-kicker">SINGING STREAM SAVIOR · 歌回直播控制台</p>
    <h1>把容易忘記的歌回直播雜務，交給歌回救星</h1>
    <p class="intro-lead">從背景音樂、歌唱伴奏、待播歌曲，到 OBS 上的歌單與歌詞，都在同一個畫面準備與操作。你可以把注意力留給演唱與觀眾，不必在每首歌之間反覆整理視窗。</p>
    <div class="intro-actions">
      <a class="intro-button intro-button--primary" href="{{ '/getting-started.html' | relative_url }}">開始使用</a>
      <a class="intro-button" href="#features">先看主要功能</a>
      <a class="intro-button" href="{{ '/resources.html' | relative_url }}">軟體下載</a>
    </div>
  </div>
  <figure class="intro-hero__visual">
    <img src="{{ '/assets/images/full-workspace.png' | relative_url }}" alt="歌回救星完整模式，包含歌曲庫、背景音樂、歌唱伴奏與待播清單">
    <figcaption>同一個工作區，同時照顧選歌、播放與直播畫面。</figcaption>
  </figure>
</div>

<section class="origin-story" id="why">
  <div>
    <p class="section-kicker">為什麼做這個軟體？</p>
    <h2>它從歌回裡最常發生的小失誤開始</h2>
    <p>我在歌回直播時，常常會忘記在演唱前關掉 BGM、唱完後再把 BGM 打開，也會忘記把剛唱完的歌曲補到 OBS 畫面上的歌單。這些事情都不難，卻很容易在忙著唱歌、聊天和找下一首歌時漏掉。</p>
    <p>因此做了 Singing Stream Savior：先選擇 BGM 並開始播放，之後播放伴奏時會自動暫停 BGM；伴奏停止或播放完畢後，會自動恢復原本的 BGM。歌單 Overlay 也會隨歌曲狀態更新，不需要每唱一首就回到 OBS 手動改字。</p>
  </div>
  <div class="stream-sequence" aria-label="背景音樂與歌唱伴奏的自動切換流程">
    <div class="stream-step stream-step--playing"><span>BGM</span><strong>直播空檔播放</strong></div>
    <div class="stream-arrow"><span>播放伴奏</span></div>
    <div class="stream-step stream-step--active stream-step--paused"><span>歌唱伴奏</span><strong>BGM 自動暫停</strong></div>
    <div class="stream-arrow"><span>暫停或結束</span></div>
    <div class="stream-step stream-step--playing"><span>BGM</span><strong>自動恢復播放</strong></div>
  </div>
</section>

<section class="demo-flow" aria-labelledby="demo-flow-title">
  <div class="section-heading">
    <p class="section-kicker">從軟體到直播畫面</p>
    <h2 id="demo-flow-title">先在歌回救星確認，再把成果交給 OBS</h2>
    <p>歌單主題與歌詞都能先在軟體裡預覽。加入 OBS 後，兩個畫面會跟著歌曲與播放進度更新，並可疊在自己的直播背景上。</p>
  </div>
  <div class="demo-flow__track">
    <article class="demo-flow__step">
      <header>
        <span class="demo-flow__number">01</span>
        <div><strong>選擇歌單主題</strong><span>歌單外觀</span></div>
      </header>
      <a class="demo-flow__frame" href="{{ '/assets/images/demo-theme-preview.png' | relative_url }}">
        <img src="{{ '/assets/images/demo-theme-preview.png' | relative_url }}" alt="歌單外觀頁選擇 Transparent Black v2，並預覽 Now Singing、Set List 與 Next On" loading="lazy" decoding="async">
      </a>
      <p>從主題列選擇外觀，先確認目前歌曲、已唱清單和下一首歌的配置。</p>
    </article>
    <article class="demo-flow__step">
      <header>
        <span class="demo-flow__number">02</span>
        <div><strong>確認同步歌詞</strong><span>歌詞即時預覽</span></div>
      </header>
      <a class="demo-flow__frame" href="{{ '/assets/images/demo-lyrics-preview.png' | relative_url }}">
        <img src="{{ '/assets/images/demo-lyrics-preview.png' | relative_url }}" alt="歌詞頁即時預覽目前同步歌詞、字型、顏色與高亮效果" loading="lazy" decoding="async">
      </a>
      <p>播放伴奏時，預覽會顯示和 OBS 相同的歌詞版面、文字樣式與目前句高亮。</p>
    </article>
    <article class="demo-flow__step">
      <header>
        <span class="demo-flow__number">03</span>
        <div><strong>在 OBS 自由編排</strong><span>觀眾看到的成果</span></div>
      </header>
      <a class="demo-flow__frame" href="{{ '/assets/images/demo-obs-result.png' | relative_url }}">
        <img src="{{ '/assets/images/demo-obs-result.png' | relative_url }}" alt="OBS 畫面將 Transparent Black v2 歌單與同步歌詞疊在直播背景上" loading="lazy" decoding="async">
      </a>
      <p>歌單與歌詞是獨立來源，可各自縮放、裁切和移動，搭配自己的直播背景。</p>
    </article>
  </div>
</section>

<section class="feature-section" id="features">
  <div class="section-heading">
    <p class="section-kicker">主要功能</p>
    <h2>依照一場歌回真正會用到的流程設計</h2>
    <p>功能不是彼此分離的工具，而是從準備歌曲、開始演唱到更新 OBS 畫面的同一條工作流程。</p>
  </div>
  <div class="feature-grid">
    <article class="feature-card feature-card--signal">
      <span class="feature-card__label">播放協調</span>
      <h3>BGM 與伴奏自動交接</h3>
      <p>請先選擇 BGM 並開始播放。之後播放歌唱伴奏時會自動暫停 BGM；伴奏停止或播放完畢後，會自動恢復原本的背景音樂。</p>
    </article>
    <article class="feature-card">
      <span class="feature-card__label">歌曲與待播</span>
      <h3>整理歌曲，也保留臨場彈性</h3>
      <p>建立歌曲庫、自訂歌單、我的最愛與待播順序。可以從待播選歌，也能直接雙擊歌曲立即播放。</p>
    </article>
    <article class="feature-card">
      <span class="feature-card__label">OBS 歌單</span>
      <h3>切換主題，不必手動重打歌單</h3>
      <p>選擇 Default、透明、Card、CD 或各種精緻主題，將畫面拖入 OBS；Now Singing、Set List、Reserve 與 Next On 會依播放狀態更新。</p>
    </article>
    <article class="feature-card">
      <span class="feature-card__label">歌詞</span>
      <h3>自己看，也可以顯示給觀眾</h3>
      <p>搜尋或匯入同步歌詞，使用可自由移動的「歌詞視窗」閱讀，也能建立 OBS 歌詞畫面。日文歌詞可選擇平假名或羅馬拼音輔助。</p>
    </article>
    <article class="feature-card">
      <span class="feature-card__label">伴奏來源</span>
      <h3>本機音檔與 YouTube 伴奏，放在同一個播放器</h3>
      <p>伴奏可能是自行消除人聲、錄製或下載的本機檔案，也可能是臨時在 YouTube 找到的版本。Singing Stream Savior 同時支援兩者，不必在播放器與瀏覽器之間來回切換。</p>
    </article>
    <article class="feature-card">
      <span class="feature-card__label">工作區</span>
      <h3>完整、精簡、迷你三種模式</h3>
      <p>準備直播時使用完整模式；開播後可縮成精簡或迷你模式，只留下播放器、待播／已唱和歌詞視窗等常用操作。</p>
    </article>
  </div>
</section>

<aside class="experimental-note">
  <span>測試中</span>
  <div><strong>OBS WebSocket 直播時間戳</strong><p>可讀取 OBS 的實際直播時間，記錄伴奏開始時刻，並在支援的 Set List 前顯示時間戳。一般歌單與歌詞畫面不需要啟用 WebSocket。</p></div>
</aside>

<section class="intro-next">
  <p class="section-kicker">準備開始</p>
  <h2>先匯入一首歌，完成第一次測試播放</h2>
  <p>接下來的使用說明會從解壓縮、開啟程式與建立專案開始。</p>
  <a class="intro-button intro-button--primary" href="{{ '/getting-started.html' | relative_url }}">前往安裝與開始使用</a>
</section>
