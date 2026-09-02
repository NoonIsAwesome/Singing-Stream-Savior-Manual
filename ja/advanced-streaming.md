---
title: 2.1.0.0 高度な配信・Profiles・音声ルーティング完全ガイド
description: 2.1.0.0 のライブ操作、ボーカル Profiles、内蔵エフェクト、ルーティング、Meter、録音、OBS 直接出力、システムトレイを詳しく説明します
lang: ja
translation_key: advanced-streaming
published: true
---

# 高度な配信モード

**2.1.0.0** 以降の高度な配信モードでは、BGM、伴奏、処理済みマイクを Singing Stream Savior 内でミックスし、完全な Stream Mix を OBS、Discord、その他の配信アプリへ送信できます。

{% include advanced-quick-start.html %}

## 詳細説明と付録

上の短いテスト録画が正常なら基本設定は完了し、ここで読むのを止めてもかまいません。以下はデバイス変更、Buffer の手動調整、エフェクト、Monitor、録音の詳細設定、またはトラブル解決が必要な場合だけ参照してください。

<aside class="version-preview" role="note"><span class="version-preview__badge">2.1.0.0 新機能</span><div><strong>オーディオルーティングと音声 Profile を一緒に設定してください。</strong><p>ルーティングは入力、Monitor、録音、配信出力を、Profile はボーカル音色を管理します。画像はすべて Release build の実画面で、対応するローカライズ版がある場合はそちらを使用します。</p></div></aside>

## 2.1.0.0 で移動した設定

- **YouTube ダウンロード**は **設定 → ファイルとプロジェクト**へ移動し、プロジェクトとメディアフォルダーの設定と同じページになりました。
- **詳細設定**は **配信タイムスタンプ**へ名称変更され、OBS WebSocket、配信時間の取得、Set List のタイムスタンプを設定します。
- 新しい**オーディオルーティング**タブで、通常再生、高度なミックス、ドライバー、出力、モニター、録音をまとめて管理します。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2>通常再生と高度な配信モードを選ぶ</h2><p>まず<strong>設定 → オーディオルーティング</strong>でモードを選びます。通常再生はアプリの BGM と伴奏だけを出力します。高度な配信モードではマイク、Profile のエフェクトチェーン、完全なミックス、仮想出力を追加します。</p></div>
  {% include localized-release-screenshot.html name="audio-routing.png" alt="2.1.0.0 オーディオルーティング画面の上半分" caption="この実画面は右上の OBS プラグイン導入／仮想出力入口、ルーティングモード、Windows Audio、App Buffer、チェック入口と、音源、Profile、正式 Mix、Stream Output を表示します。Monitor、録音、下側のルートはスクロールして確認します。" %}
  {% include localized-release-screenshot.html name="audio-routing-bottom.png" alt="2.1.0.0 オーディオルーティング画面の下半分" caption="下側には Monitor、録音、完全なルート線、遅延状態を表示します。Monitor の遅延は OBS／正式出力内の伴奏と声の同期を変更しません。" %}
</div>

### 既定 Profile と BGM ダッキング

- **雑談用 Voice Profile**は、BGM 再生中または配信での雑談中に自動適用されます。
- **歌唱用 Voice Profile**は伴奏再生中の既定値で、曲ごとの Profile タグがある場合はそちらを優先します。マイクボタンの右クリックメニューでは別の Profile を一時的に固定できます。**Profile を自動切り替え**へ戻すと、雑談／歌唱状態と曲タグによる自動選択を再開します。
- **BGM ダッキング · 自動**はマイク音声を検出している間だけ BGM を最大 9 dB 下げ、マイク音量を上げることはありません。歌唱伴奏では、フレーズごとに伴奏が上下しないよう自動的にバイパスされ、全体のまとまりは Mix Bus Compressor が処理します。**オフ**を選ぶと自動減衰を完全に無効化します。

### App バッファのチェックと黄色の状態表示

**アプリ安全バッファ**セレクターと **バッファの安定性をチェック…** ボタンは、同じ行に常時表示されます。ASIO 入力を使用している場合、この行は ASIO サンプルレート／ハードウェアバッファ欄の直下にあります。**Windows 再生互換性**の詳細設定を閉じたままでも、値の変更とチェックを行えます。**クイックチェック**は 512／1024 フレームを約 25 秒で、**フルチェック**は 128／256／512／1024 フレームを約 5 分で確認します。診断対象はアプリ側のバッファであり、オーディオインターフェース側の ASIO hardware buffer は変更しません。推奨値はそのまま適用できますが、128／256 などの低い値は、現在のデバイス、Profile、エフェクト、ルートでフルチェック内の独立した 2 回の厳格な観測の両方に合格した場合だけ検証済みとして扱われます。

このチェック自体は、合成テストトーンや伴奏を再生しません。ソフトウェアモニターが有効な場合は、チェック中も入力中のマイク音声が聞こえることがあり、ルートを再起動するたびに一時的な途切れが生じる場合があります。確認後、本アプリは再生中の BGM と伴奏を自動停止します。ただし、OBS 配信、Discord 通話、外部アプリの録音は停止できないため、先にユーザーが停止してください。オーディオインターフェースの **Direct Monitor** は影響を受けません。

{% include localized-release-screenshot.html name="audio-health-check.png" alt="テスト開始前の Buffer 安定性チェック画面" caption="この実画面はテスト前の初期状態です。開始後に各行へ独立した観測結果と推定遅延が入り、判定完了後だけ推奨値を適用できます。" %}

黄色の表示には 2 種類あります。**ドロップアウトを確認**は、マイク／モニターの underrun・overrun、正式な Stream 経路の不連続、またはデバイスの中断／復旧を検出した場合に表示します。**オーディオタイミングを確認**は、同じ callback、クロック、遅延計算の異常が約 2 秒続いた場合に表示します。一度だけの瞬間的な callback peak は、聞こえるドロップアウトが発生した証拠ではありません。「安定性」にポインターを置くと、各経路のカウンター、デバイス復旧、callback peak／period、異常フラグを確認できます。

### 一般ユーザー向けの推奨開始設定

> **最も簡単な開始点は、対応インターフェースでは ASIO、アプリ安全 Buffer は「自動（推奨）・512 frames」、OBS は専用音声ソースです。** 最初から技術表を読んだり、すべての Buffer を手動で試したりする必要はありません。

- メーカー製 ASIO がある場合は優先して使い、インターフェースの hardware buffer は既に安定している値（一般には 128 または 256 frames）を維持します。App Buffer とは別設定です。
- ASIO がない場合は Windows Audio と自動 512 を使い、最初から 128／256 を強制しません。
- ソフトウェア Dry Monitor をさらに短くしたい場合だけ完全チェックを実行し、推奨された場合だけ 256 を適用します。歌唱の主モニターには Direct Monitor を優先します。
- OBS は Singing Stream Savior 専用音声ソースを優先し、他アプリにも完全 Mix が必要な場合だけ仮想ケーブルを使います。
- 配信前にクイックチェックと短い OBS 録画を行い、黄色状態、増え続けるカウンター、聞こえる途切れがある場合は配信を止めて完全チェックを実行し、必要なら 1024 を使います。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h2>音声 Profiles を作成・編集する</h2><p>Profile は再利用できるボーカルエフェクトチェーンです。内蔵エフェクトや VST3 Plugin を追加し、Block の順序変更、一時バイパス、試聴を行ってから保存できます。</p></div>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="profile-horizontal-rack.png" alt="横向きの Profile エフェクト Rack" caption="横向き Rack は実際の処理順でチェーン全体を表示します。" %}{% include localized-release-screenshot.html name="profile-vertical-rack.png" alt="縦向きの Profile エフェクト Rack" caption="縦向きでも Block、Bypass、ドラッグ順、エディターは同じで、信号処理は変わりません。" %}</div>
</div>

### Profile に保存される内容

- Block の有効状態、パラメーター、処理順をまとめて保存し、プロジェクト再開時に復元します。
- 内蔵エフェクトと最大 8 スロットの VST3 Plugin を混在でき、VST3 の parameter state も Profile に保存します。
- Block のドラッグは実際の処理順を変更します。Bypass は設定を消さず、一時的に処理だけを省略します。
- Monitor を有効にすると、Profile エディターで現在編集中の Profile を試聴できます。伴奏を再生したままエフェクトを調整でき、声の効果だけを聴く場合は右上の **S（Solo）**を押します。ライブ操作へ戻る、トレイへ格納する、またはエディターを閉じると試聴を終了し、元の配信 Monitor へ戻ります。
- Factory Profile は実用的な開始点です。マイク、部屋のノイズ、音域、歌い方に合わせて調整してから個人用 Profile として保存してください。

{% include factory-profiles-reference.html %}

### 15 個の内蔵ボーカルエフェクト

各内蔵エフェクトにはライブグラフ、Bypass、ヘルプボタンがあります。簡易モードは実用的な用途別の開始点、詳細モードは全パラメーターを表示します。

{% include one-knob-guide.html %}

- **入力ゲイン**：チェーン入口のレベルを調整し、最初の段でのクリップを防ぎます。
- **背景ノイズ減衰／ノイズゲート／ディエッサー**：定常ノイズ、フレーズ間のキーボード音、強い歯擦音をそれぞれ整理します。
- **コンプレッサー／リミッター**：声量差を整え、Profile 末尾で急なピークを止めます。
- **イコライザー（EQ）／サチュレーション／Air エンハンサー**：不要な低域、音の厚み、明瞭さや空気感を調整します。
- **ボイスチェンジャー**：Pitch と Formant を同時に変え、キャラクターや特定パート向けの音色を作ります。
- **ハーモニー／ダブラー**：楽曲 Key に沿う実験的なハーモニー、または短い遅延とわずかなピッチ差を持つ 2 層の声を加えます。
- **ディレイ／リバーブ／シマー**：KTV、バラード、Plate、長い空間や1オクターブ上の幻想的な余韻を作ります。

Profile の後段には、配信全体用の **Mix Bus Compressor**、**Stream Output Limiter**、Master 音量があります。これらは個別 Profile の音色設定を書き換えません。Final Limiter の有効／無効はモードごとに保存されます。通常再生は初期状態でオフ、高度な配信モードは初回のみオンで、以後は各モードで手動変更した状態を独立して記憶します。

各項目を開くと、信号上の役割、主なパラメーター、歌配信での調整方針、注意点を確認できます。

{% include effect-editor-gallery.html %}

{% include effects-reference-ja.html %}

{% include profile-performance-controls.html %}

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">SONG AUTOMATION</p><h2>曲タグで Profile を自動切り替え</h2><p>曲一覧のタグボタンで音声 Profile を割り当てます。その伴奏を再生すると対応するエフェクトチェーンへ自動切り替えします。<strong>自動・歌唱 Profile</strong>は現在の標準歌唱 Profile を使います。</p></div>
  {% include advanced-streaming-screenshot.html name="26-song-profile-tag-menu.png" alt="曲行から開いた Profile タグメニュー" caption="曲行右側のタグアイコンから、自動歌唱 Profile、配信雑談、任意のユーザー／内蔵 Profile を選べます。選んだ色付きタグは曲行に表示されます。" %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">LIVE CONTROL</p><h2>配信中にエフェクトを切り替え、マイクをミュート</h2><p>ワークスペース上部で任意の Profile を即時適用するか、曲タグの自動切り替えへ戻せます。隣のマイクボタンでミュート／解除し、切り替え後はルーティング画面のメーターを確認します。</p></div>
  {% include advanced-streaming-screenshot.html name="27-live-profile-menu.png" alt="ワークスペース上部から開いた配信中の Profile メニュー" caption="上部 Profile メニューで即時にエフェクトを指定するか、自動切り替えへ戻せます。隣には Monitor、録音、マイクミュートがあります。" size="medium" %}
</div>

### 上部バーの操作

- **モニター音源**で BGM／伴奏、完全ミックス、Wet／Dry 声を含む組み合わせ、処理後マイクのみを選びます。
- **ヘッドホン**は選択したモニターをオン／オフし、音源の選択は保持します。
- **録音**は左クリックで開始／停止、右クリックで完全出力／モニター内容、WAV 形式、保存先のメニューを開きます。
- **マイク**は左クリックでミュート／復帰、右クリックで Profile メニューを開いて手動チェーンまたは自動切替を選びます。状態アイコンはトレイメニューと共通です。
- **Profile**は手動指定、または曲タグに任せる自動切り替えを選べます。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>モニター内容を選び、完全なミックスを録音</h2><p>ヘッドホンボタンでモニターを操作します。BGM／伴奏、完全なミックス、ウェット／ドライマイクを含む組み合わせ、処理後マイクだけを選べます。録音は完全出力またはモニター内容を WAV 16-bit PCM／32-bit Float で保存できます。</p></div>
  <p><strong>フィードバック防止：</strong>マイクモニター時は、マイクへ再入力されるスピーカーではなくヘッドホンを使います。本番前に短く録音し、声、伴奏、音量、遅延を確認してください。</p>
</div>

### モニターと録音は Profile の音色を書き換えません

モニターは独立したヘッドホン経路です。Dry Cue は独立したソフトウェアキャプチャーでドライ音声のモニター遅延をできるだけ小さくしますが、正式な Mix、OBS、録音経路は変更しません。歌唱時のモニター遅延を最小にするには、オーディオインターフェースの hardware Direct Monitor を優先してください。Meter の BGM／伴奏モニターとボーカルモニターは 0–200% で調整でき、演奏者が聞くバランスだけを変えます。観客向け Stream Output や Profile 内の Compressor、EQ などには影響しません。**完全出力**の録音は正式な Stream Output のタイムラインを使用するため、BGM／伴奏とボーカルは同じ正式な時間軸に記録されます。Dry Cue などのソフトウェアモニター遅延が、録音内の相対オフセットを変えることはありません。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2>5 系統の音声とシステム負荷を確認</h2><p>高度な配信モードでは「表示」またはトレイメニューから Meter を開けます。右側へドッキング、独立表示、横／縦レイアウトの切り替えに対応します。</p></div>
  <p><strong>BGM／伴奏</strong>、<strong>ボーカル（Profile 後・Mix 前）</strong>、<strong>配信出力</strong>、<strong>BGM／伴奏モニター</strong>、<strong>ボーカルモニター</strong>を表示します。全系統に Peak、配信出力には 3 秒の短期 <strong>LUFS-S</strong>も表示し、0–200% の目盛り付きノブで調整します。</p>
  <p>横型 Meter は、BGM／伴奏とボーカルのバランスが長時間崩れた場合、ボーカルを上げるか伴奏を下げるよう提案します。助言だけを表示し、ゲインを自動変更することはありません。適格なボーカル活動がまだ検出されていない間は表示しません。適格なボーカルが 5 秒間連続して検出されない場合は間奏として扱い、古い助言と判定履歴を消去して、次の歌唱から再判定します。</p>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="audio-meter-horizontal.png" alt="横方向のレベルバーを使う 5 トラック音量 Meter" caption="この実画面は 5 系統の Peak と 0–200% 操作を表示します。LUFS-S と継続バランス文字は測定条件を満たした場合だけ表示されるため、この固定信号画像には入りません。" %}{% include localized-release-screenshot.html name="audio-meter-vertical.png" alt="縦方向のレベルバーを使う 5 トラック音量 Meter パネル" caption="この画像は縦向き Meter パネルと同じ 5 系統の操作を表示します。音声経路を変更せずメイン画面右側へドッキングすることもできます。" %}</div>
  <div class="effect-reference"><details><summary><strong>音量バランス助言の判定方法</strong><span>無音、息継ぎ、間奏を歌声と区別します</span></summary><div class="effect-reference__body"><p>Meter は実際の配信経路にある Mix 前の BGM／伴奏と Profile 後のボーカルを 100 ms 単位で確認します。BGM／伴奏が実際に Playing 状態で信号も存在し、ルーティングとマイクが正常で、ボーカル活動が条件を満たす場合だけ証拠を蓄積します。Noise Gate の情報がある場合は、区間の約 25% 以上で Gate が開いている必要があります。さらに、Profile 後ボーカルの平均エネルギーが −45 dBFS 以上、処理前マイクの Peak が −50 dBFS 以上である必要があります。表示には 10 秒以上の再生、直近 12 秒中 6 秒以上の適格ボーカル、および各 1.2 秒以上で互いに 300 ms 以上離れた 2 つのフレーズが必要です。BGM／伴奏がボーカルより 2 dB を超えて小さくない状態、または伴奏の方が大きい状態も、最新の適格区間で 6 秒以上必要です。適格区間のボーカル平均エネルギーが −26 dBFS 以下の場合だけ「ボーカルが小さい可能性」も表示します。直近データの処理前または処理後 Peak が −6 dBFS 以上、あるいは Limiter のゲインリダクションが 1 dB を超える場合は、伴奏を下げる助言だけを残し、ボーカルを上げるよう提案しません。曲の変更、停止または再生し直し、大幅なシーク、Profile の切り替え、経路の中断または復旧待ち、Meter の非表示で判定をリセットします。これは持続的な信号活動と音量の比較であり、音声認識ではありません。</p></div></details></div>
  <p>右下の枠なし CPU／RAM 表示はシステム全体と本アプリを区別します。高度な配信モードでは Buffer、callback、推定遅延、underrun／overrun も Tooltip に追加します。</p>
  {% include localized-release-screenshot.html name="system-resource-status.png" alt="メイン画面右下に折りたたまれた CPU／RAM 概要" caption="この画像はポインターを置く前の簡潔な CPU／RAM 表示だけです。ポインターを置くと、上記のシステム／アプリ負荷と高度な音声状態が展開します。" size="medium" %}
  {% include system-health-interpretation.html %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2>システムトレイへ格納したまま配信を操作</h2><p>閉じるボタンをトレイ格納または完全終了のどちらにするか設定できます。</p></div>
  <p>状態に応じて再生／再開、一時停止、停止、先頭から再生、Key、速度、Profile、マイク、歌詞ウィンドウ、メイン画面、そして高度な配信モード限定の Meter を表示します。「アプリを終了」で本体と helper を終了します。</p>
  {% include localized-release-screenshot.html name="notification-area-menu.png" alt="未再生時の Singing Stream Savior Windows システムトレイメニュー" caption="この実画面は未再生時の簡潔なメニューです。伴奏再生または高度な配信モードでは、上記の再生、Key、速度、Profile、マイク、Meter 操作が追加されます。最下部の終了項目で本体と helper を完全終了します。" size="medium" %}
  <p>グローバルショートカットは「再生操作」と「マイク／モニター」に分類され、既定キーがあります。通常再生では不要な高度モード操作を非表示にします。</p>
  {% include keyboard-shortcuts-reference.html %}
  {% include localized-release-screenshot.html name="keyboard-shortcuts.png" alt="再生、マイク、モニターに分類されたキーボードショートカット設定" caption="既定キーは直接変更できます。高度な配信モードが必要な項目は通常再生で非表示になります。" %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h2>OBS 音声プラグインまたは仮想デバイスを使用</h2><p>どちらも Profile、Mix Bus、最終リミッターを通った同じ Stream Output を送ります。</p></div>
  <p>既存の OBS プラグインメニューには標準版、Portable フォルダー、削除があります。インストール成功後は <strong>Singing Stream Savior Audio (OBS Plugin)</strong> を自動選択します。OBS を再起動し、同名の音声ソースを追加してください。</p>
  <p>VB-CABLE では Singing Stream Savior 側で CABLE Input、OBS の音声入力キャプチャで CABLE Output を選びます。重複する生マイクソースは無効にしてください。</p>
</div>

{% include obs-audio-output-setup.html %}

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

## 開発機の完全なテストデータ（補足）

通常設定で以下の技術データを一行ずつ理解する必要はありません。作者 PC でのテスト証拠と、遅延／安定性を詳しく調べる場合の参考として残しています。

<div class="effect-reference"><details><summary><strong>ASIO、Windows Audio、OBS、仮想出力の完全な結果を表示</strong><span>遅延、連続性、長時間ストレス試験</span></summary><div class="effect-reference__body">
{% include audio-test-results-ja.html %}
</div></details></div>

<small>VB-CABLE の名称、画面、インストーラーは VB-Audio Software の製品です。スクリーンショットは手順説明のために掲載しています。</small>
