---
title: 歌回救星｜為歌回直播設計的播放器
description: 整合 BGM、伴奏播放、歌單、歌詞與 OBS 畫面的歌回直播工具
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

{% include demo-video.html %}

<section class="release-preview-section" aria-labelledby="release-preview-title">
  <div class="section-heading">
    <p class="section-kicker">2.1.0.0 · 測試功能先行介紹</p>
    <h2 id="release-preview-title">這次更新，先從每一首歌的人聲風格開始</h2>
    <p>2.1.0.0 的重點不是要求使用者理解複雜音訊術語，而是讓麥克風效果能跟著歌曲自動準備好。以下功能仍在發布前測試，介面文字與細節可能微調。</p>
  </div>
  <div class="release-highlights">
    <article class="release-highlight"><div><strong>播放伴奏時，自動切換該歌曲的麥克風效果</strong><p>可以為每一首歌曲指定不同風格的效果器訊號鏈；伴奏開始時自動套用，結束後回到聊天用設定。</p></div></article>
    <article class="release-highlight"><div><strong>自行設計各種人聲效果器訊號鏈</strong><p>軟體內建噪音閥、壓縮器、EQ、Reverb、Delay、Shimmer 等效果器，也能加入 VST3 並拖曳調整先後順序。</p></div></article>
    <article class="release-highlight"><div><strong>內建多種可直接使用的效果</strong><p>提供古風、搖滾、KTV、空靈、通用歌唱、不同音域與聊天等 Profiles，可直接使用，也可複製後微調。</p></div></article>
    <article class="release-highlight"><div><strong>縮小到系統工具，以最少空間持續執行</strong><p>主視窗收起後，仍可從右鍵選單與全域快捷鍵控制伴奏、Key、速度、Profile、麥克風、歌詞視窗與 Meter。</p></div></article>
    <article class="release-highlight"><div><strong>完整的直播音訊路由</strong><p>把 BGM／伴奏與處理後的人聲混合，再透過 OBS 音訊外掛或虛擬音源送到 OBS；監聽與錄音可分開設定。</p></div></article>
    <article class="release-highlight"><div><strong>五軌音量 Meter 與效能狀態</strong><p>觀察伴奏、人聲、直播輸出與兩條監聽訊號，並查看 PEAK、LUFS-S、CPU、記憶體、Buffer 與預估延遲。</p></div></article>
    <article class="release-highlight"><div><strong>更完整的直播控制</strong><p>主畫面新增監聽、錄音、麥克風靜音與 Profile 切換；播放、重播、升降 Key、速度與歌詞視窗也都有預設快捷鍵。</p></div></article>
    <article class="release-highlight"><div><strong>歌詞與效果器操作改善</strong><p>歌詞 Offset 可即時反映並隨專案保存；效果器視窗不再鎖住主畫面，並統一旋鈕、Bypass、說明與即時訊號圖。</p></div></article>
  </div>
  <div class="release-preview-gallery" aria-label="2.1.0.0 功能畫面">
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}" alt="在歌曲列表替每首歌曲指定人聲 Profile" loading="lazy" decoding="async"></a><figcaption><strong>歌曲自動切換效果：</strong>在歌曲選單指定 Profile，之後播放伴奏就會自動套用。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/12-built-in-effect-editor.png' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/12-built-in-effect-editor.png' | relative_url }}" alt="使用刻度旋鈕與即時訊號圖編輯 Noise Gate" loading="lazy" decoding="async"></a><figcaption><strong>一致的內建效果器介面：</strong>以起始設定、即時圖、刻度旋鈕與 Bypass 調整人聲。</figcaption></figure>
    <figure class="manual-figure release-preview-gallery__wide"><a href="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}" alt="包含伴奏、人聲 Profile、直播輸出、監聽與錄音的完整音訊路由" loading="lazy" decoding="async"></a><figcaption><strong>看得懂聲音去了哪裡：</strong>從伴奏與麥克風，一路確認 Profile、直播輸出、監聽、錄音與 OBS。</figcaption></figure>
  </div>
  <div class="intro-actions">
    <a class="intro-button intro-button--primary" href="{{ '/profiles.html' | relative_url }}">閱讀人聲 Profiles 教學</a>
    <a class="intro-button" href="{{ '/audio-routing.html' | relative_url }}">閱讀音訊路由教學</a>
  </div>
</section>

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
      <p>全自動展示會循環模擬歌曲與長歌單，直接看見目前歌曲、已唱清單與下一首歌如何移動。</p>
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
      <p>請先選擇 BGM 並開始播放。伴奏開始時會自動暫停或淡出 BGM；伴奏停止或播放完畢後，會自動恢復原本的背景音樂。</p>
    </article>
    <article class="feature-card">
      <span class="feature-card__label">歌曲與待播</span>
      <h3>整理歌曲，也保留臨場彈性</h3>
      <p>建立歌曲庫、自訂歌單、我的最愛與待播順序。可以直接播放伴奏，也能建立清唱或自彈自唱使用的無伴奏演出。</p>
    </article>
    <article class="feature-card">
      <span class="feature-card__label">OBS 歌單</span>
      <h3>切換主題，不必手動重打歌單</h3>
      <p>選擇 Default、透明、Card、CD 或各種精緻主題，先用全自動展示確認完整狀態，再將畫面拖入 OBS；內容會依播放狀態更新。</p>
    </article>
    <article class="feature-card">
      <span class="feature-card__label">歌詞</span>
      <h3>自己看，也可以顯示給觀眾</h3>
      <p>搜尋或匯入同步歌詞，使用可自由移動的「歌詞視窗」閱讀，也能建立 OBS 歌詞畫面。日文支援平假名與羅馬拼音，韓文也可顯示羅馬拼音。</p>
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

<aside class="feature-note">
  <span>直播時間戳</span>
  <div><strong>OBS WebSocket 直播時間戳</strong><p>可讀取 OBS 的實際直播時間，記錄伴奏開始時刻，並在支援的 Set List 前顯示時間戳。一般歌單與歌詞畫面不需要啟用 WebSocket。</p></div>
</aside>

<section class="intro-next">
  <p class="section-kicker">準備開始</p>
  <h2>先匯入一首歌，完成第一次測試播放</h2>
  <p>接下來的使用說明會從解壓縮、開啟程式與建立專案開始。</p>
  <a class="intro-button intro-button--primary" href="{{ '/getting-started.html' | relative_url }}">前往安裝與開始使用</a>
</section>
