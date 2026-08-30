---
title: 2.1.0.0 高度な配信・Profiles・音声ルーティング完全ガイド
description: 2.1.0.0 のライブ操作、ボーカル Profiles、内蔵エフェクト、ルーティング、Meter、録音、OBS 直接出力、システムトレイを詳しく説明します
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

### Profile に保存される内容

- Block の有効状態、パラメーター、処理順をまとめて保存し、プロジェクト再開時に復元します。
- 内蔵エフェクトと最大 8 スロットの VST3 Plugin を混在でき、VST3 の parameter state も Profile に保存します。
- Block のドラッグは実際の処理順を変更します。Bypass は設定を消さず、一時的に処理だけを省略します。
- 編集中は結果を試聴できます。ライブ操作へ戻る、トレイへ格納する、またはエディターを閉じると試聴を終了し、現在の配信モニターへ戻ります。
- Factory Profile は実用的な開始点です。マイク、部屋のノイズ、音域、歌い方に合わせて調整してから個人用 Profile として保存してください。

### 12 個の内蔵ボーカルエフェクト

すべてのエディターはマットなパネル、目盛り付きノブ、ライブグラフ、ヘルプボタンを共通化しています。簡易モードは用途別の開始点、詳細モードは全パラメーターを表示します。

- **Input Gain**：チェーン入口のレベルを調整し、最初の段でのクリップを防ぎます。
- **Background Attenuation／Noise Gate／De-esser**：定常ノイズ、フレーズ間のキーボード音、強い歯擦音をそれぞれ整理します。
- **Compressor／Limiter**：声量差を整え、Profile 末尾で急なピークを止めます。
- **Equalizer／Saturation／Air Enhancer**：不要な低域、音の厚み、明瞭さや空気感を調整します。
- **Voice Changer**：Pitch と Formant を同時に変え、キャラクターや特定パート向けの音色を作ります。
- **Delay／Reverb**：KTV、バラード、Plate、長い空間などの反響を作ります。

Profile の後段には、配信全体用の **Mix Bus Compressor**、**Stream Output Limiter**、Master 音量があります。これらは個別 Profile の音色設定を書き換えません。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">SONG AUTOMATION</p><h2>曲タグで Profile を自動切り替え</h2><p>曲一覧のタグボタンで音声 Profile を割り当てます。その伴奏を再生すると対応するエフェクトチェーンへ自動切り替えします。<strong>自動・歌唱 Profile</strong>は現在の標準歌唱 Profile を使います。</p></div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}" alt="曲ごとに自動または特定の音声 Profile を選ぶタグメニュー" loading="lazy" decoding="async"></a><figcaption>音域、ジャンル、特別な曲に合わせて事前設定できます。本番前に試唱して音量を確認してください。</figcaption></figure>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">LIVE CONTROL</p><h2>配信中にエフェクトを切り替え、マイクをミュート</h2><p>ワークスペース上部で任意の Profile を即時適用するか、曲タグの自動切り替えへ戻せます。隣のマイクボタンでミュート／解除し、切り替え後はルーティング画面のメーターを確認します。</p></div>
  <figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}" alt="モニター音源、ヘッドホン、録音、マイクミュート、Profile の操作" loading="lazy" decoding="async"></a><figcaption>手動選択はすぐ反映されます。曲タグへ戻すには「Profile を自動切り替え」を選びます。</figcaption></figure>
</div>

### 上部バーの操作

- **モニター音源**で BGM／伴奏、完全ミックス、Wet／Dry 声を含む組み合わせ、処理後マイクのみを選びます。
- **ヘッドホン**は選択したモニターをオン／オフし、音源の選択は保持します。
- **録音**のメインボタンは開始／停止、メニューは完全出力／モニター内容、WAV 形式、保存先を設定します。
- **マイク**はすぐにミュート／復帰し、トレイメニューと同じ状態アイコンを使います。
- **Profile**は手動指定、または曲タグに任せる自動切り替えを選べます。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>モニター内容を選び、完全なミックスを録音</h2><p>ヘッドホンボタンでモニターを操作します。BGM／伴奏、完全なミックス、ウェット／ドライマイクを含む組み合わせ、処理後マイクだけを選べます。録音は完全出力またはモニター内容を WAV 16-bit PCM／32-bit Float で保存できます。</p></div>
  <div class="feature-shot-grid feature-shot-grid--compact"><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}" alt="BGM、完全ミックス、ウェット／ドライ、処理済みマイクのモニター選択" loading="lazy" decoding="async"></a><figcaption>モニターはヘッドホンで聞く内容だけを変更します。Stream Output はルーティング設定どおり出力されます。</figcaption></figure><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}" alt="完全出力、モニター内容、WAV 形式、録音フォルダーの設定" loading="lazy" decoding="async"></a><figcaption>32-bit Float は編集時の余裕が大きい一方、容量も増えます。一般用途には 16-bit PCM を選べます。</figcaption></figure></div>
  <p><strong>フィードバック防止：</strong>マイクモニター時は、マイクへ再入力されるスピーカーではなくヘッドホンを使います。本番前に短く録音し、声、伴奏、音量、遅延を確認してください。</p>
</div>

### モニターと録音は Profile の音色を書き換えません

モニターは独立したヘッドホン経路です。Meter の BGM／伴奏モニターとボーカルモニターは 0–200% で調整でき、演奏者が聞くバランスだけを変えます。観客向け Stream Output や Profile 内の Compressor、EQ などには影響しません。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2>5 系統の音声とシステム負荷を確認</h2><p>高度な配信モードでは「表示」またはトレイメニューから Meter を開けます。右側へドッキング、独立表示、横／縦レイアウトの切り替えに対応します。</p></div>
  <p><strong>BGM／伴奏</strong>、<strong>ボーカル（Profile 後・Mix 前）</strong>、<strong>配信出力</strong>、<strong>BGM／伴奏モニター</strong>、<strong>ボーカルモニター</strong>を表示します。全系統に Peak、配信出力には 3 秒の短期 <strong>LUFS-S</strong>も表示し、0–200% の目盛り付きノブで調整します。</p>
  <p>右下の枠なし CPU／RAM 表示はシステム全体と本アプリを区別します。高度な配信モードでは Buffer、callback、推定遅延、underrun／overrun も Tooltip に追加します。</p>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2>システムトレイへ格納したまま配信を操作</h2><p>閉じるボタンをトレイ格納または完全終了のどちらにするか設定できます。</p></div>
  <p>状態に応じて再生／再開、一時停止、停止、先頭から再生、Key、速度、Profile、マイク、歌詞ウィンドウ、メイン画面、そして高度な配信モード限定の Meter を表示します。「アプリを終了」で本体と helper を終了します。</p>
  <p>グローバルショートカットは「再生操作」と「マイク／モニター」に分類され、既定キーがあります。通常再生では不要な高度モード操作を非表示にします。</p>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h2>OBS 音声プラグインまたは仮想デバイスを使用</h2><p>どちらも Profile、Mix Bus、最終リミッターを通った同じ Stream Output を送ります。</p></div>
  <p>既存の OBS プラグインメニューには標準版、Portable フォルダー、削除があります。インストール成功後は <strong>Singing Stream Savior Audio (OBS Plugin)</strong> を自動選択します。OBS を再起動し、同名の音声ソースを追加してください。</p>
  <p>VB-CABLE では Singing Stream Savior 側で CABLE Input、OBS の音声入力キャプチャで CABLE Output を選びます。重複する生マイクソースは無効にしてください。</p>
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
