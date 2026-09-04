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
    <img src="{{ '/assets/images/full-workspace.png' | relative_url }}" alt="歌回救星完整模式，左側為卡片式歌曲列表，右側包含背景音樂、歌唱伴奏與待播清單">
    <figcaption>卡片式歌單、兩組播放器與待播清單都在同一個工作區。</figcaption>
  </figure>
</div>

<section class="intro-promo" aria-labelledby="intro-promo-title">
  <a class="intro-promo__visual" href="{{ '/assets/images/booth-promo-zh-TW.jpg' | relative_url }}"><img src="{{ '/assets/images/booth-promo-zh-TW.jpg' | relative_url }}" alt="歌回救星繁體中文功能宣傳圖，展示 OBS 歌單、字幕與直播畫面" decoding="async"></a>
  <div class="intro-promo__copy">
    <p class="section-kicker">讓觀眾看到的，是完成後的直播</p>
    <h2 id="intro-promo-title">伴奏一開始，BGM、歌名、歌單與歌詞就一起跟上</h2>
    <p>歌回救星把容易遺漏的播放切換與 OBS 畫面更新整理成同一套流程；你只要選歌與演唱，不必在每首歌之間逐項改畫面。</p>
    <div class="intro-promo__points"><span>BGM 自動切換</span><span>OBS 歌單同步</span><span>同步歌詞</span><span>時間戳自動記錄</span></div>
  </div>
</section>

{% include demo-video.html %}

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
      {% assign home_theme_path = '/assets/images/theme-workspace.png' %}
      {% assign home_theme_file = site.static_files | where: "path", home_theme_path | first %}
      {% if home_theme_file %}<a class="demo-flow__frame" href="{{ home_theme_path | relative_url }}"><img src="{{ home_theme_path | relative_url }}" alt="2.1 歌單外觀頁的主題卡片、設定與 OBS 預覽" loading="lazy" decoding="async"></a>{% endif %}
      <p>全自動展示會循環模擬歌曲與長歌單，直接看見目前歌曲、已唱清單與下一首歌如何移動。</p>
    </article>
    <article class="demo-flow__step">
      <header>
        <span class="demo-flow__number">02</span>
        <div><strong>確認同步歌詞</strong><span>歌詞即時預覽</span></div>
      </header>
      {% assign home_lyrics_path = '/assets/images/lyrics-reading-preview.png' %}
      {% assign home_lyrics_file = site.static_files | where: "path", home_lyrics_path | first %}
      {% if home_lyrics_file %}<a class="demo-flow__frame" href="{{ home_lyrics_path | relative_url }}"><img src="{{ home_lyrics_path | relative_url }}" alt="2.1 歌詞頁即時預覽同步歌詞、讀音、字型、顏色與目前行高亮" loading="lazy" decoding="async"></a>{% endif %}
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
    <article class="feature-card feature-card--signal feature-card--illustrated">
      <a class="feature-card__visual" href="{{ '/assets/images/bgm-playlist.png' | relative_url }}"><img src="{{ '/assets/images/bgm-playlist.png' | relative_url }}" alt="背景音樂播放器正在播放 BGM，並顯示循環播放清單與控制按鈕" loading="lazy" decoding="async"></a>
      <div class="feature-card__body"><span class="feature-card__label">播放協調</span><h3>BGM 與伴奏自動交接</h3><p>請先選擇 BGM 並開始播放。伴奏開始時會自動暫停或淡出 BGM；伴奏停止或播放完畢後，會自動恢復原本的背景音樂。</p></div>
    </article>
    <article class="feature-card feature-card--illustrated">
      <a class="feature-card__visual" href="{{ '/assets/images/song-library.png' | relative_url }}"><img src="{{ '/assets/images/song-library.png' | relative_url }}" alt="歌曲庫顯示歌單、搜尋欄與多首歌曲" loading="lazy" decoding="async"></a>
      <div class="feature-card__body"><span class="feature-card__label">歌曲與待播</span><h3>整理歌曲，也保留臨場彈性</h3><p>建立歌曲庫、自訂歌單、我的最愛與待播順序。可以直接播放伴奏，也能建立清唱或自彈自唱使用的無伴奏演出。</p></div>
    </article>
    <article class="feature-card feature-card--illustrated">
      <a class="feature-card__visual" href="{{ '/assets/images/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/theme-workspace.png' | relative_url }}" alt="歌單外觀頁顯示多種 OBS 歌單主題與即時預覽" loading="lazy" decoding="async"></a>
      <div class="feature-card__body"><span class="feature-card__label">OBS 歌單</span><h3>切換主題，不必手動重打歌單</h3><p>選擇 Default、透明、Card、CD 或各種精緻主題，先用全自動展示確認完整狀態，再將畫面拖入 OBS；內容會依播放狀態更新。</p></div>
    </article>
    <article class="feature-card feature-card--illustrated">
      <a class="feature-card__visual" href="{{ '/assets/images/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/lyrics-manager-linked.png' | relative_url }}" alt="歌詞管理視窗顯示同步歌詞搜尋結果與已連結歌詞" loading="lazy" decoding="async"></a>
      <div class="feature-card__body"><span class="feature-card__label">歌詞</span><h3>自己看，也可以顯示給觀眾</h3><p>搜尋或匯入同步歌詞，使用可自由移動的「歌詞視窗」閱讀，也能建立 OBS 歌詞畫面。日文支援平假名與羅馬拼音，韓文也可顯示羅馬拼音。</p></div>
    </article>
    <article class="feature-card">
      <span class="feature-card__label">伴奏來源</span>
      <h3>本機音檔與 YouTube 伴奏，放在同一個播放器</h3>
      <p>本機檔案與 YouTube 伴奏都在同一個播放器，並共用貼近日常播放器的感知音量曲線；YouTube 播放另有分階段備援，不必在播放器與瀏覽器之間切換。</p>
    </article>
    <article class="feature-card feature-card--illustrated">
      <a class="feature-card__visual" href="{{ '/assets/images/compact-workspace.png' | relative_url }}"><img src="{{ '/assets/images/compact-workspace.png' | relative_url }}" alt="精簡工作區顯示歌詞、BGM、伴奏與待播控制" loading="lazy" decoding="async"></a>
      <div class="feature-card__body"><span class="feature-card__label">工作區</span><h3>完整、精簡、迷你三種模式</h3><p>準備直播時使用完整模式；開播後可縮成精簡或迷你模式。也能隱藏到 Windows 系統通知區，繼續用右鍵選單或全域快捷鍵控制直播。</p></div>
    </article>
    <article class="feature-card">
      <span class="feature-card__label">歌曲人聲</span>
      <h3>播放伴奏時，自動切換歌曲的人聲效果</h3>
      <p>每首歌可指定不同的麥克風 Profile；伴奏開始時自動套用，結束後回到聊天設定，也能在直播中手動切換。</p>
    </article>
    <article class="feature-card feature-card--illustrated">
      <a class="feature-card__visual" href="{{ '/assets/images/profile-horizontal-rack.png' | relative_url }}"><img src="{{ '/assets/images/profile-horizontal-rack.png' | relative_url }}" alt="人聲 Profile 編輯器以橫向 Rack 顯示多顆效果器" loading="lazy" decoding="async"></a>
      <div class="feature-card__body"><span class="feature-card__label">人聲 Profiles</span><h3>內建效果器與 VST3，組成自己的效果鏈</h3><p>使用噪音閥、壓縮器、EQ、Reverb、Delay、Shimmer 等 15 顆內建效果器，或加入 VST3；可調參數、Bypass 並拖曳處理順序。</p></div>
    </article>
    <article class="feature-card feature-card--illustrated">
      <a class="feature-card__visual" href="{{ '/assets/images/audio-routing-bottom.png' | relative_url }}"><img src="{{ '/assets/images/audio-routing-bottom.png' | relative_url }}" alt="音訊路由圖顯示麥克風、Profile、直播混音、輸出與監聽" loading="lazy" decoding="async"></a>
      <div class="feature-card__body"><span class="feature-card__label">直播音訊</span><h3>把伴奏與人聲混合後直接送到 OBS</h3><p>支援 ASIO、Windows Audio、OBS 專用音訊外掛與虛擬音源；Final Mix、OBS 與完整輸出錄音共用穩定且對齊的正式路徑。</p></div>
    </article>
    <article class="feature-card">
      <span class="feature-card__label">監聽與錄音</span>
      <h3>自己聽的內容，不必改變觀眾收到的訊號</h3>
      <p>可監聽或錄製伴奏、乾聲、濕聲與完整輸出；「伴奏＋乾聲」使用獨立低延遲 Cue，主監聽仍建議使用錄音介面的 Direct Monitor。</p>
    </article>
    <article class="feature-card feature-card--illustrated">
      <a class="feature-card__visual" href="{{ '/assets/images/audio-health-check.png' | relative_url }}"><img src="{{ '/assets/images/audio-health-check.png' | relative_url }}" alt="音訊 Buffer 健檢結果顯示穩定度、延遲與建議設定" loading="lazy" decoding="async"></a>
      <div class="feature-card__body"><span class="feature-card__label">Meter 與健檢</span><h3>查看音量、Buffer、延遲與斷訊</h3><p>五軌 Meter 顯示 Peak 與 Stream Output 的 LUFS-S；Buffer 健檢可比較穩定度、預估延遲並提供可直接套用的建議。</p></div>
    </article>
    <article class="feature-card feature-card--illustrated">
      <a class="feature-card__visual" href="{{ '/assets/images/live-timeline-card.jpg' | relative_url }}"><img src="{{ '/assets/images/live-timeline-card.jpg' | relative_url }}" alt="直播畫面中的 Now Singing、Next On 與歌曲時間戳" loading="lazy" decoding="async"></a>
      <div class="feature-card__body"><span class="feature-card__label">直播時間戳</span><h3>讓 Set List 顯示實際直播時間軸</h3><p>透過 OBS WebSocket 記錄每首伴奏開始的直播時間，並在支援的 Set List 顯示時間戳；一般歌單與歌詞不必啟用。</p></div>
    </article>
  </div>
</section>

<section class="intro-next">
  <p class="section-kicker">準備開始</p>
  <h2>先匯入一首歌，完成第一次測試播放</h2>
  <p>接下來的使用說明會從解壓縮、開啟程式與建立專案開始。</p>
  <a class="intro-button intro-button--primary" href="{{ '/getting-started.html' | relative_url }}">前往安裝與開始使用</a>
</section>
