---
title: Singing Stream Savior｜歌枠の再生・セットリスト・歌詞をまとめて管理
description: Singing Stream Savior を作った理由と主な機能
lang: ja
translation_key: home
---

<div class="intro-hero">
  <div class="intro-hero__copy">
    <p class="intro-kicker">SINGING STREAM SAVIOR · 歌枠コントロールデスク</p>
    <h1>配信中に忘れやすい操作を、アプリに任せる</h1>
    <p class="intro-lead">BGM、カラオケ音源、予約曲、OBS のセットリスト、歌詞を一つの画面で準備・操作できます。曲間のウィンドウ操作ではなく、歌と視聴者に集中するためのアプリです。</p>
    <div class="intro-actions"><a class="intro-button intro-button--primary" href="{{ '/ja/guide.html#getting-started' | relative_url }}">使い始める</a><a class="intro-button" href="#features">主な機能を見る</a></div>
  </div>
  <figure class="intro-hero__visual"><img src="{{ '/assets/images/ja/full-workspace.png' | relative_url }}" alt="日本語のフルモード。曲ライブラリ、BGM、カラオケ、予約リストを表示"><figcaption>選曲・再生・配信画面を一つのワークスペースで管理します。</figcaption></figure>
</div>

<section class="origin-story" id="why">
  <div><p class="section-kicker">なぜ作ったのか</p><h2>歌枠で起こりやすい、小さな操作忘れが出発点です</h2><p>歌い始める前に BGM を止めること、歌い終えた後に BGM を戻すこと、そして歌った曲を OBS のセットリストへ追加することを、配信中によく忘れていました。難しい操作ではありませんが、歌やコメント、次の曲に気を配っていると抜けやすい作業です。</p><p>そこで Singing Stream Savior を作りました。最初に BGM を選んで再生しておくと、カラオケ開始時にその BGM を自動で一時停止し、カラオケを停止または最後まで再生した後に元の BGM を自動で再開します。セットリスト Overlay も曲の状態に合わせて更新されるため、毎回 OBS で曲名を入力し直す必要がありません。</p></div>
  <div class="stream-sequence" aria-label="BGM とカラオケの自動切り替え"><div class="stream-step stream-step--playing"><span>BGM</span><strong>曲間に再生</strong></div><div class="stream-arrow"><span>カラオケ開始</span></div><div class="stream-step stream-step--active stream-step--paused"><span>カラオケ</span><strong>BGM を自動停止</strong></div><div class="stream-arrow"><span>一時停止・終了</span></div><div class="stream-step stream-step--playing"><span>BGM</span><strong>自動で再開</strong></div></div>
</section>

<section class="demo-flow" aria-labelledby="demo-flow-title">
  <div class="section-heading">
    <p class="section-kicker">設定から配信画面まで</p>
    <h2 id="demo-flow-title">Singing Stream Savior で確認してから、OBS に表示</h2>
    <p>スクリーンショットの画面表示は繁体字中国語ですが、操作手順と各コントロールの位置は、対応するすべての言語で共通です。</p>
  </div>
  <div class="demo-flow__track">
    <article class="demo-flow__step">
      <header><span>01</span><div><strong>セットリストテーマを選ぶ</strong><small>プレイリスト外観</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/demo-theme-preview.png' | relative_url }}"><img src="{{ '/assets/images/demo-theme-preview.png' | relative_url }}" alt="繁体字中国語のプレイリスト外観画面で Transparent Black v2 を選択した状態" loading="lazy" decoding="async"></a>
      <p>テーマを選択し、内蔵プレビューで Now Singing、Song List、Next On の配置を確認します。</p>
    </article>
    <article class="demo-flow__step">
      <header><span>02</span><div><strong>同期歌詞を確認する</strong><small>歌詞プレビュー</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/demo-lyrics-preview.png' | relative_url }}"><img src="{{ '/assets/images/demo-lyrics-preview.png' | relative_url }}" alt="繁体字中国語の歌詞画面で再生中の同期歌詞をプレビューしている状態" loading="lazy" decoding="async"></a>
      <p>カラオケ再生中に、現在行、フォント、色、ハイライト、タイミングを確認できます。</p>
    </article>
    <article class="demo-flow__step">
      <header><span>03</span><div><strong>OBS の表示を確認する</strong><small>配信画面</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/demo-obs-result.png' | relative_url }}"><img src="{{ '/assets/images/demo-obs-result.png' | relative_url }}" alt="OBS の配信背景に透明なセットリストと同期歌詞を重ねた表示" loading="lazy" decoding="async"></a>
      <p>セットリストと歌詞は OBS で別々のソースとして、自由に拡大縮小・クロップ・配置できます。</p>
    </article>
  </div>
</section>

<section class="feature-section" id="features">
  <div class="section-heading"><p class="section-kicker">主な機能</p><h2>実際の歌枠の流れに合わせた設計</h2><p>曲の準備、歌唱、OBS の更新を一つの連続した作業として扱います。</p></div>
  <div class="feature-grid">
    <article class="feature-card feature-card--signal"><span class="feature-card__label">再生連携</span><h3>BGM とカラオケを自動で切り替え</h3><p>最初に BGM を選んで再生してください。カラオケ開始時にその BGM を自動で一時停止し、カラオケを停止または最後まで再生した後に元の BGM を自動で再開します。</p></article>
    <article class="feature-card"><span class="feature-card__label">曲と予約</span><h3>準備しながら、その場の選曲にも対応</h3><p>曲ライブラリ、プレイリスト、お気に入り、予約順を管理できます。予約から選ぶほか、曲をダブルクリックしてすぐ再生できます。</p></article>
    <article class="feature-card"><span class="feature-card__label">OBS セットリスト</span><h3>テーマを選び、曲名の手入力を減らす</h3><p>Default、透明、Card、CD、装飾テーマを選んで OBS へドラッグ。Now Singing、Set List、Reserve、Next On が再生状態に合わせて更新されます。</p></article>
    <article class="feature-card"><span class="feature-card__label">歌詞</span><h3>配信者用にも、視聴者用にも</h3><p>同期歌詞を検索・読み込みし、移動できる「歌詞ウィンドウ」で読むか、OBS 歌詞画面として表示できます。日本語はひらがな・ローマ字補助にも対応します。</p></article>
    <article class="feature-card"><span class="feature-card__label">伴奏の追加元</span><h3>ローカル音源と YouTube 伴奏を一つのプレイヤーで</h3><p>ボーカルを除去した音源、自分で録音した伴奏、ダウンロード済みのファイルも、その場で YouTube から見つけた伴奏も使用できます。Singing Stream Savior なら両方を扱えるため、プレイヤーとブラウザを行き来する必要がありません。</p></article>
    <article class="feature-card"><span class="feature-card__label">ワークスペース</span><h3>フル・コンパクト・ミニの 3 モード</h3><p>準備はフルモード、配信中はコンパクトまたはミニモードへ。カラオケ、予約、履歴、歌詞ウィンドウなど必要な操作だけを残せます。</p></article>
  </div>
</section>

<aside class="experimental-note"><span>テスト機能</span><div><strong>OBS WebSocket の配信タイムスタンプ</strong><p>OBS の実際の配信時間を読み取り、カラオケ開始時刻を記録して、対応 Set List に表示できます。通常のセットリスト・歌詞画面には WebSocket は不要です。</p></div></aside>

<section class="intro-next"><p class="section-kicker">準備を始める</p><h2>まず 1 曲を追加して、テスト再生する</h2><p>ユーザーマニュアルは、展開・起動・最初のプロジェクト作成から説明します。</p><a class="intro-button intro-button--primary" href="{{ '/ja/guide.html#getting-started' | relative_url }}">ユーザーマニュアルへ</a></section>
