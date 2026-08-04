---
title: 歌回救星｜为歌回直播整理播放、歌单与歌词
description: 认识 Singing Stream Savior 的设计初衷与主要功能
lang: zh-CN
translation_key: home
---

<div class="intro-hero">
  <div class="intro-hero__copy">
    <p class="intro-kicker">SINGING STREAM SAVIOR · 歌回直播控制台</p>
    <h1>把容易忘记的直播杂务，交给歌回救星</h1>
    <p class="intro-lead">背景音乐、歌唱伴奏、待播歌曲、OBS 歌单与歌词，都能在同一个画面准备和操作。把注意力留给演唱与观众，不必在每首歌之间来回整理窗口。</p>
    <div class="intro-actions">
      <a class="intro-button intro-button--primary" href="{{ '/zh-CN/guide.html#getting-started' | relative_url }}">开始使用</a>
      <a class="intro-button" href="#features">查看主要功能</a>
      <a class="intro-button" href="{{ '/zh-CN/resources.html' | relative_url }}">软件下载</a>
    </div>
  </div>
  <figure class="intro-hero__visual">
    <img src="{{ '/assets/images/zh-CN/full-workspace.png' | relative_url }}" alt="简体中文完整模式，包含歌曲库、背景音乐、歌唱伴奏与待播列表">
    <figcaption>同一个工作区，同时照顾选歌、播放与直播画面。</figcaption>
  </figure>
</div>

{% include demo-video.html %}

<section class="origin-story" id="why">
  <div><p class="section-kicker">为什么制作这个软件？</p><h2>它从歌回里最常发生的小失误开始</h2><p>我在歌回直播时，常常忘记在演唱前关闭 BGM、唱完后再打开 BGM，也会忘记把刚唱完的歌曲补到 OBS 画面上的歌单。这些事情并不难，却很容易在唱歌、聊天和寻找下一首歌时遗漏。</p><p>因此制作了 Singing Stream Savior：先选择 BGM 并开始播放，之后播放伴奏时会自动暂停 BGM；伴奏停止或播放完毕后，会自动恢复原来的 BGM。歌单 Overlay 也会跟随歌曲状态更新，不需要每唱一首就回到 OBS 手动修改文字。</p></div>
  <div class="stream-sequence" aria-label="背景音乐与歌唱伴奏自动切换流程"><div class="stream-step stream-step--playing"><span>BGM</span><strong>直播空档播放</strong></div><div class="stream-arrow"><span>播放伴奏</span></div><div class="stream-step stream-step--active stream-step--paused"><span>歌唱伴奏</span><strong>BGM 自动暂停</strong></div><div class="stream-arrow"><span>暂停或结束</span></div><div class="stream-step stream-step--playing"><span>BGM</span><strong>自动恢复播放</strong></div></div>
</section>

<section class="demo-flow" aria-labelledby="demo-flow-title">
  <div class="section-heading">
    <p class="section-kicker">从设置到直播画面</p>
    <h2 id="demo-flow-title">先在歌回救星中确认，再把效果显示到 OBS</h2>
    <p>以下截图使用简体中文界面与隔离的示例数据，显示 2.0.3.1 的实际控件。</p>
  </div>
  <div class="demo-flow__track">
    <article class="demo-flow__step">
      <header><span class="demo-flow__number">01</span><div><strong>选择歌单主题</strong><small>歌单外观</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/zh-CN/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/theme-workspace.png' | relative_url }}" alt="简体中文歌单外观页面自动展示 Transparent Black v2 与长歌单" loading="lazy" decoding="async"></a>
      <p>自动展示会循环模拟歌曲与长歌单，直接查看 Now Singing、Reserve 与 Next On 的变化。</p>
    </article>
    <article class="demo-flow__step">
      <header><span class="demo-flow__number">02</span><div><strong>检查同步歌词</strong><small>歌词预览</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/zh-CN/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/lyrics-reading-preview.png' | relative_url }}" alt="简体中文歌词页面显示时间校正、前后句数滑杆与日文示例歌词" loading="lazy" decoding="async"></a>
      <p>播放伴奏时确认当前歌词、字体、颜色、强调效果与时间同步。</p>
    </article>
    <article class="demo-flow__step">
      <header><span class="demo-flow__number">03</span><div><strong>确认 OBS 效果</strong><small>直播画面</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/demo-obs-result.png' | relative_url }}"><img src="{{ '/assets/images/demo-obs-result.png' | relative_url }}" alt="OBS 在直播背景上显示透明歌单与同步歌词的效果" loading="lazy" decoding="async"></a>
      <p>歌单与歌词在 OBS 中是独立来源，可分别缩放、裁切与移动到合适位置。</p>
    </article>
  </div>
</section>

<section class="feature-section" id="features">
  <div class="section-heading"><p class="section-kicker">主要功能</p><h2>按照一场歌回真正会用到的流程设计</h2><p>从准备歌曲、开始演唱到更新 OBS 画面，是同一条连续的工作流程。</p></div>
  <div class="feature-grid">
    <article class="feature-card feature-card--signal"><span class="feature-card__label">播放协调</span><h3>BGM 与伴奏自动交接</h3><p>请先选择 BGM 并开始播放。伴奏开始时会自动暂停或淡出 BGM；伴奏停止或播放完毕后，会自动恢复原来的背景音乐。</p></article>
    <article class="feature-card"><span class="feature-card__label">歌曲与待播</span><h3>整理歌曲，也保留临场弹性</h3><p>整理歌曲与待播，可直接播放伴奏，也能为清唱或自弹自唱建立无伴奏演出。</p></article>
    <article class="feature-card"><span class="feature-card__label">OBS 歌单</span><h3>切换主题，不必手动重打歌单</h3><p>选择 Default、透明、Card、CD 或精致主题，先通过自动展示检查完整状态，再拖入 OBS。</p></article>
    <article class="feature-card"><span class="feature-card__label">歌词</span><h3>自己阅读，也能显示给观众</h3><p>搜索或导入同步歌词，使用可移动的“歌词窗口”阅读，也能建立 OBS 歌词画面。日文支持平假名与罗马拼音，韩文也可显示罗马拼音。</p></article>
    <article class="feature-card"><span class="feature-card__label">伴奏来源</span><h3>本地音频与 YouTube 伴奏，放在同一个播放器</h3><p>伴奏可能是自行消除人声、录制或下载的本地文件，也可能是临时在 YouTube 找到的版本。Singing Stream Savior 同时支持两者，不必在播放器与浏览器之间来回切换。</p></article>
    <article class="feature-card"><span class="feature-card__label">工作区</span><h3>完整、精简、迷你三种模式</h3><p>准备直播时使用完整模式；开播后可缩为精简或迷你模式，只保留播放器、待播／已唱和歌词窗口等常用操作。</p></article>
  </div>
</section>

<aside class="feature-note"><span>直播时间戳</span><div><strong>OBS WebSocket 直播时间戳</strong><p>可读取 OBS 的实际直播时间，记录伴奏开始时刻，并在支持的 Set List 前显示时间戳。一般歌单与歌词画面无需启用 WebSocket。</p></div></aside>

<section class="intro-next"><p class="section-kicker">准备开始</p><h2>先导入一首歌，完成第一次测试播放</h2><p>接下来的使用说明会从解压、启动软件与建立项目开始。</p><a class="intro-button intro-button--primary" href="{{ '/zh-CN/guide.html#getting-started' | relative_url }}">前往开始使用</a></section>
