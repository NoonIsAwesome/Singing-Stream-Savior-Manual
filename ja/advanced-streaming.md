---
title: 高度な配信モードと VB-CABLE のインストール
description: Singing Stream Savior 2.1.0.0 のマイクミックスと仮想出力を OBS・Discord に接続する方法
lang: ja
translation_key: advanced-streaming
published: false
---

# 高度な配信モード

**2.1.0.0** 以降の高度な配信モードでは、BGM、伴奏、処理済みマイクを Singing Stream Savior 内でミックスし、完全な Stream Mix を OBS、Discord、その他の配信アプリへ送信できます。

<aside class="version-preview" role="note"><span class="version-preview__badge">2.1.0.0 PREVIEW</span><div><strong>このページは未公開バージョンの機能を説明しています。</strong><p>現在の一般公開版には、以下のタブや操作がまだ含まれていない場合があります。画像は繁体字中国語のプレビュー版ですが、製品の操作項目は選択言語で表示されます。画面や名称は正式公開までに調整される可能性があります。</p></div></aside>

## 2.1.0.0 で移動した設定

- **YouTube ダウンロード**は **設定 → ファイルとプロジェクト**へ移動し、プロジェクトとメディアフォルダーの設定と同じページになりました。
- **詳細設定**は **配信タイムスタンプ**へ名称変更され、OBS WebSocket、配信時間の取得、Set List のタイムスタンプを設定します。
- 新しい**オーディオルーティング**タブで、通常再生、高度なミックス、ドライバー、出力、モニター、録音をまとめて管理します。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2>通常再生と高度な配信モードを選ぶ</h2><p>まず<strong>設定 → オーディオルーティング</strong>でモードを選びます。通常再生はアプリの BGM と伴奏だけを出力します。高度な配信モードではマイク、Profile のエフェクトチェーン、完全なミックス、仮想出力を追加します。</p></div>
  <div class="feature-shot-grid feature-shot-grid--wide">
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}" alt="オーディオルーティングの通常再生と高度な配信モード選択" loading="lazy" decoding="async"></a><figcaption>マイク処理が不要なら通常再生、完全なミックスを OBS／Discord へ送る場合は高度な配信モードを使用します。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}" alt="ASIO と Windows Audio のドライバー選択" loading="lazy" decoding="async"></a><figcaption>ASIO は低遅延の歌唱向け、Windows Audio 互換モードは一般的な Windows デバイス向けです。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}" alt="自動、WASAPI、DirectSound、MME の再生方式" loading="lazy" decoding="async"></a><figcaption>通常は「自動（推奨）」を使い、デバイス互換性の問題を調べる場合だけ方式を指定します。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}" alt="BGM からシステム出力までの通常再生ルートとメーター" loading="lazy" decoding="async"></a><figcaption>ルート図には信号経路、推定遅延、Buffer、サンプルレート、安定性が表示されます。</figcaption></figure>
  </div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}" alt="BGM、マイク、音声 Profile、配信ミックス、仮想出力、モニター、録音を含む全体ルート" loading="lazy" decoding="async"></a><figcaption>高度な配信モードでは、音源、2 系統の音声 Profile、ミックス、Stream Output、モニター、録音を一つの図で確認できます。</figcaption></figure>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h2>音声 Profiles を作成・編集する</h2><p>Profile は再利用できるボーカルエフェクトチェーンです。内蔵エフェクトや VST3 Plugin を追加し、Block の順序変更、一時バイパス、試聴を行ってから保存できます。</p></div>
  <div class="feature-shot-grid"><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}" alt="高音域用 Profile のダイナミック抑制、EQ、リバーブ、リミッター" loading="lazy" decoding="async"></a><figcaption>高音域、低音域、KTV、古風など、歌唱場面ごとにチェーンを作成できます。</figcaption></figure><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}" alt="配信トーク用 Profile の入力ゲイン、ノイズゲート、リミッター" loading="lazy" decoding="async"></a><figcaption>トーク用と歌唱用を分ければ、配信中に各エフェクトを調整し直す必要がありません。</figcaption></figure></div>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">SONG AUTOMATION</p><h2>曲タグで Profile を自動切り替え</h2><p>曲一覧のタグボタンで音声 Profile を割り当てます。その伴奏を再生すると対応するエフェクトチェーンへ自動切り替えします。<strong>自動・歌唱 Profile</strong>は現在の標準歌唱 Profile を使います。</p></div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}" alt="曲ごとに自動または特定の音声 Profile を選ぶタグメニュー" loading="lazy" decoding="async"></a><figcaption>音域、ジャンル、特別な曲に合わせて事前設定できます。本番前に試唱して音量を確認してください。</figcaption></figure>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">LIVE CONTROL</p><h2>配信中にエフェクトを切り替え、マイクをミュート</h2><p>ワークスペース上部で任意の Profile を即時適用するか、曲タグの自動切り替えへ戻せます。隣のマイクボタンでミュート／解除し、切り替え後はルーティング画面のメーターを確認します。</p></div>
  <figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}" alt="モニター音源、ヘッドホン、録音、マイクミュート、Profile の操作" loading="lazy" decoding="async"></a><figcaption>手動選択はすぐ反映されます。曲タグへ戻すには「Profile を自動切り替え」を選びます。</figcaption></figure>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>モニター内容を選び、完全なミックスを録音</h2><p>ヘッドホンボタンでモニターを操作します。BGM／伴奏、完全なミックス、ウェット／ドライマイクを含む組み合わせ、処理後マイクだけを選べます。録音は完全出力またはモニター内容を WAV 16-bit PCM／32-bit Float で保存できます。</p></div>
  <div class="feature-shot-grid feature-shot-grid--compact"><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}" alt="BGM、完全ミックス、ウェット／ドライ、処理済みマイクのモニター選択" loading="lazy" decoding="async"></a><figcaption>モニターはヘッドホンで聞く内容だけを変更します。Stream Output はルーティング設定どおり出力されます。</figcaption></figure><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}" alt="完全出力、モニター内容、WAV 形式、録音フォルダーの設定" loading="lazy" decoding="async"></a><figcaption>32-bit Float は編集時の余裕が大きい一方、容量も増えます。一般用途には 16-bit PCM を選べます。</figcaption></figure></div>
  <p><strong>フィードバック防止：</strong>マイクモニター時は、マイクへ再入力されるスピーカーではなくヘッドホンを使います。本番前に短く録音し、声、伴奏、音量、遅延を確認してください。</p>
</div>

```text
Singing Stream Savior → 仮想オーディオケーブル → OBS／Discord
```

仮想オーディオケーブルは別途インストールする Windows ドライバーです。本アプリがドライバーをダウンロード、実行、変更することはありません。必ず公式提供元から入手してください。

> **Windows の再起動が必要です。** VB-Audio の公式手順では、インストール後の再起動が必須です。アプリの再起動やデバイス一覧の更新では代用できません。

<a id="vb-cable-installation"></a>
## VB-CABLE のインストール

以下は一般的な 64 ビット版 Windows 10／11 の手順です。Windows on ARM などでは、VB-Audio の公式説明に従って対応するセットアップを選択してください。

<a class="manual-cta" href="https://vb-audio.com/Cable/index.htm" target="_blank" rel="noopener noreferrer">VB-Audio 公式ダウンロードページを開く</a>

<div class="setup-steps">
  <section class="setup-step"><span class="setup-step-number">1</span><div><h3>最新の Windows パッケージをダウンロード</h3><p>公式ページの Windows 欄で <strong>New Package</strong> を選択します。第三者の配布サイトからオーディオドライバーを入手しないでください。</p><figure class="manual-figure"><a href="{{ '/assets/images/vb-cable/01-official-download.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/01-official-download.jpg' | relative_url }}" alt="VB-Audio 公式ページで赤枠表示された Windows 用 VB-CABLE 新パッケージ" loading="lazy" decoding="async"></a><figcaption>パッケージ名やバージョンは更新される場合があります。公式ページの New Package を使用してください。</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">2</span><div><h3>ZIP をすべて展開</h3><p>ダウンロードした ZIP で「すべて展開」を選び、展開先のフォルダーを開きます。ZIP のプレビュー内から Setup を実行すると、INF 不足やドライバーパッケージ破損のエラーになることがあります。</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/02-extracted-folder.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/02-extracted-folder.jpg' | relative_url }}" alt="展開済みの VBCABLE Driver Pack45 フォルダー" loading="lazy" decoding="async"></a><figcaption>圧縮ファイル内ではなく、通常のフォルダーを開いていることを確認します。</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">3</span><div><h3>64 ビット版 Setup を管理者として実行</h3><p>通常の 64 ビット版 Windows では <code>VBCABLE_Setup_x64.exe</code> を右クリックし、「管理者として実行」を選択します。<code>_x64</code> のないファイルは 32 ビット版 Windows 用です。</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/03-run-x64-setup.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/03-run-x64-setup.jpg' | relative_url }}" alt="展開フォルダー内の VBCABLE Setup x64 実行ファイル" loading="lazy" decoding="async"></a><figcaption>ファイル名に <code>_x64</code> が含まれる Setup を選択します。</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">4</span><div><h3>ドライバーをインストール</h3><p>Windows の許可画面で発行元を確認し、<strong>Install Driver</strong> を選択します。完了まで待ち、ボタンの連打やウィンドウの強制終了は行わないでください。</p><figure class="manual-figure"><a href="{{ '/assets/images/vb-cable/04-install-driver.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/04-install-driver.jpg' | relative_url }}" alt="Install Driver ボタンを表示した VB-Audio Virtual Cable Driver Installation" loading="lazy" decoding="async"></a><figcaption>今後のバージョンで外観が変わっても、主な操作は Install Driver です。</figcaption></figure></div></section>
  <section class="setup-step setup-step--important"><span class="setup-step-number">5</span><div><h3>成功後に Windows を再起動</h3><p><strong>Installation Complete and Successful</strong> が表示されたら確認し、作業を保存してコンピューターを再起動します。再起動が完了してから Singing Stream Savior、OBS、Discord を設定してください。</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/05-restart-required.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/05-restart-required.jpg' | relative_url }}" alt="VB-CABLE のインストール成功とシステム再起動を求めるメッセージ" loading="lazy" decoding="async"></a><figcaption>任意の案内ではありません。ドライバー登録の完了には再起動が必要です。</figcaption></figure></div></section>
</div>

### 再起動後に Singing Stream Savior を接続

1. **設定 → オーディオルーティング**で **高度な配信モード（ミックス出力）**を選択します。
2. **仮想出力を設定…**を開き、**デバイスを更新**します。
3. Stream Output を VB-CABLE の再生側、通常は **CABLE Input** に設定します。
4. Monitor Output は物理ヘッドホンまたはオーディオインターフェースにします。同じ CABLE Input は選択しないでください。
5. OBS で**音声入力キャプチャ**を追加し、VB-CABLE の録音側、通常は **CABLE Output** を選びます。Discord でも入力デバイスに同じ CABLE Output を選択します。
6. テスト曲を再生しながら話し、Stream Mix と OBS／Discord のメーターが反応し、二重音声やフィードバックがないことを確認します。

> OBS が元のマイクを直接キャプチャしている場合、完全な Stream Mix を使用するときは重複するマイクソースを無効にしてください。

### CABLE Input／Output が見つからない場合

- インストール後に Windows を実際に再起動したか確認します。
- 完全に展開したフォルダーから、管理者として Setup を実行したか確認します。
- Singing Stream Savior の仮想出力設定で**デバイスを更新**します。
- オーディオデバイスを使用中のアプリを閉じます。解決しない場合は [VB-Audio 公式リファレンスマニュアル](https://vb-audio.com/Cable/VBCABLE_ReferenceManual.pdf)を参照してください。

<small>VB-CABLE の名称、画面、インストーラーは VB-Audio Software の製品です。スクリーンショットは手順説明のために掲載しています。</small>
