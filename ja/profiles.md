---
title: "Profile（配信エフェクト）設定"
description: "Profile は再利用できるボーカルエフェクト設定です。Signal Chain 内の各エフェクト、パラメーター、有効状態と処理順序を保存します。この章では編集、試聴、曲タグ、既定 Profile と VST3 を説明します。"
lang: ja
translation_key: profiles
---

# Profile（配信エフェクト）設定

{% include profile-prerequisite.html %}

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

{% include profile-signal-chain.html %}

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
