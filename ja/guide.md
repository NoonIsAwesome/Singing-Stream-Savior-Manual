---
title: Singing Stream Savior 2.1 ユーザーマニュアル
description: Singing Stream Savior 2.1.0.3 日本語マニュアル
lang: ja
translation_key: home
manual_bundle: true
---

# Singing Stream Savior 2.1 ユーザーマニュアル

Singing Stream Savior は、歌枠配信向けの Windows アプリです。曲ライブラリ、BGM、カラオケ音源、待機リスト、歌詞、ボーカル処理、オーディオルーティング、OBS 出力を一つの操作画面にまとめます。本書は **2.1.0.3** に対応しています。

<figure class="manual-figure"><a href="{{ '/assets/images/ja/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/ja/lyrics-reading-preview.png' | relative_url }}" alt="歌詞設定、OBS プレビュー、プレイヤー、待機リストを表示したフルモード"></a><figcaption>フルモードは配信前の曲・歌詞・OBS 画面の準備に適しています。画像を選ぶと拡大プレビューを開けます。</figcaption></figure>

## 初回セットアップのおすすめ手順

1. ローカルファイルまたは YouTube リンクをドラッグするか、選択ボタンを使って配信用 BGM を設定します。設定後は自動でループ再生します。
2. ローカルファイルまたは YouTube リンクを曲一覧へドラッグするか、読み込みボタンからカラオケ音源を追加します。
3. 各曲の「表示曲名」を編集します。再生中はこの名前がセットリストに表示されます。
4. 曲を「予約」へ追加すると、セットリストに次の曲を表示できます。
5. 「プレイリスト外観」へ切り替え、自動プレビューでテーマを選び、「OBSへドラッグ」を OBS へドロップします。
6. 「ライブ操作」へ戻り、曲一覧または予約の曲をダブルクリックして歌唱を始めます。BGM は自動で一時停止し、終了後に再開します。
7. 再生時に歌詞検索が開いた場合は、時間とアーティストが音源に近い同期歌詞を選びます。
8. 「歌詞」タブで表示を調整するか歌詞を管理し、「OBSへドラッグ」を OBS へドロップして同期歌詞を表示します。

> 最初に表示言語やプロジェクト／メディアフォルダーを設定したり、テスト用の待機リストを作ったりする必要はありません。待機リスト、ジャケット、歌詞、OBS WebSocket は必要になった時点で追加設定できます。

<a id="getting-started"></a>
## 01 · はじめに

ZIP を通常のフォルダーへ完全に展開します。一番外側のフォルダーにある、下のアイコンの `Singing Stream Savior.exe` をダブルクリックしてください。起動に必要なのはこのファイルだけです。ZIP 内から直接実行したり、データフォルダー内で別の EXE を探したりする必要はありません。

<div class="launch-target"><img src="{{ '/assets/images/singing-stream-savior.ico' | relative_url }}" alt="Singing Stream Savior のアプリアイコン"><div><strong>Singing Stream Savior.exe</strong><span>通常はこのアプリだけを起動します</span></div></div>

「ファイル > 新規プロジェクト」から `.bgmsproj` を作成します。曲、表示名、待機順、歌詞の関連付け、テーマ設定が保存されます。歌唱履歴は当日の配信セッション用で、通常のプロジェクト保存には含まれません。アプリが異常終了した場合は、再起動時に復元スナップショットから待機リストと歌唱履歴を戻せます。タイトルバーの `*` は未保存の変更を表します。

### 初回ガイドに沿って設定する

2.0.2.0 以降、初めて操作画面へ入ると 8 ステップの初回ガイドが自動的に開きます。説明するページへ切り替えて対象箇所を強調しますが、プロジェクトの変更や曲の再生は行いません。後から「ヘルプ > 初回ガイド」でいつでも再表示できます。

<div class="figure-grid">
  {% include localized-release-screenshot.html name="full-workspace.png" alt="2.1 のフルワークスペースと BGM プレイヤー" caption="初回ガイドは対応ページへ移動し、BGM 設定、ドラッグ＆ドロップ、自動切替の領域を強調します。" %}
  {% include localized-release-screenshot.html name="theme-workspace.png" alt="2.1 のプレイリスト外観ワークスペース" caption="テーマのステップでは自動プレビューと「OBSへドラッグ」の位置を案内します。画像も説明言語に合わせて切り替わります。" %}
</div>

<a id="library-and-playback"></a>
## 02 · 曲ライブラリと再生

ライブラリには「すべての曲」「お気に入り」「最近再生した曲」とカスタムプレイリストがあります。固定分類は削除できません。カスタムプレイリストは配信企画、ジャンル、イベントごとの整理に使用できます。

<figure class="manual-figure"><a href="{{ '/assets/images/ja/song-library.png' | relative_url }}"><img src="{{ '/assets/images/ja/song-library.png' | relative_url }}" alt="すべての曲、お気に入り、最近再生した曲、カスタムプレイリストと曲テーブルを表示した曲ライブラリ"></a><figcaption>左側で分類を選ぶと、右側のテーブルと検索対象が切り替わります。</figcaption></figure>

曲を分類するには、1 曲または複数曲を選択して右クリックし、「プレイリストに追加」から「お気に入り」またはカスタムプレイリストを選びます。音源は複製されず、「すべての曲」からも削除されません。同じ曲を複数のプレイリストに登録できます。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ja/add-to-playlist-menu.png' | relative_url }}"><img src="{{ '/assets/images/ja/add-to-playlist-menu.png' | relative_url }}" alt="表示曲名の編集、予約へ追加、プレイリストに追加、曲の削除を表示した右クリックメニュー"></a><figcaption>表示曲名の編集を先頭に置き、同じメニューから予約やプレイリストへの追加も行えます。</figcaption></figure>

ファイル選択画面から読み込むほか、1 曲または複数のローカル音源をソフトへ直接ドラッグ＆ドロップできます。YouTube の単一動画 URL は貼り付けまたはドラッグで 1 曲として追加できます。YouTube プレイリストの URL もそのままドラッグでき、収録動画を認識して対応するカスタムプレイリストとして読み込むため、URL を 1 件ずつ追加する必要はありません。ローカル音源は `MP3`、`WAV`、`FLAC`、`M4A`、`MP4`、`AAC`、`OGG`、`OPUS`、`WMA` に対応します。YouTube の読み込みにはインターネット接続が必要です。

「表示曲名」は予約、履歴、OBS に使用され、空欄ならファイル名または YouTube タイトルが使われます。曲の行をダブルクリックすると、その曲を読み込んですぐ再生し、文字編集には入りません。表示名を変更するには曲を右クリックし、先頭の「表示曲名を編集」を選びます。`Enter` で確定し、`Esc` でキャンセルします。元の音源ファイル名は変更されません。

曲の右クリックメニューは、「表示曲名を編集」「待機リストに追加」「プレイリストに追加」（お気に入り／カスタムプレイリスト）、現在の分類に応じた削除／分類から除外の順に並びます。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ja/display-title-edit.png' | relative_url }}"><img src="{{ '/assets/images/ja/display-title-edit.png' | relative_url }}" alt="右クリックメニューから表示曲名セルを編集している画面"></a><figcaption>右クリックメニューの先頭項目から、配信に表示する曲名だけを編集します。左側の元ファイル名は維持されます。</figcaption></figure>

<section class="manual-feature-update" aria-labelledby="library-bgm-205-title">
  <header class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.0.5.0</p><h2 id="library-bgm-205-title">見やすい曲カードと BGM プレイリスト</h2><p>曲ライブラリは従来の表とカード表示を切り替えられます。BGM は配信テーマに合わせて事前にまとめ、すぐ切り替えられます。</p></header>
  <div class="manual-feature-update__copy"><h3>曲リストの表示</h3><p><strong>初期設定は従来の表形式です。</strong>「設定 → 一般 → 曲リスト表示」からカード表示へ切り替えられます。表示曲名を大きく見せつつ、音源、ジャケット、歌詞の状態も確認できます。ダブルクリックは再生、鉛筆アイコンは表示曲名の編集です。</p></div>
  <div class="manual-feature-update__copy"><h3>BGM プレイリスト</h3><p>複数のローカル／YouTube 音源を保存し、各 BGM にメモを付け、ドラッグで順番を変更できます。再生中の項目は強調表示されます。YouTube プレイリストは現在の動画だけ、または全項目を追加できます。</p><ul><li><strong>1曲リピート（初期設定）</strong></li><li><strong>全曲リピート</strong></li><li><strong>シャッフルリピート</strong></li></ul></div>
  {% include localized-release-screenshot.html name="bgm-playlist.png" alt="2.1 の BGM プレイリスト" caption="メモ、音源、再生中の項目をすぐ確認できます。" %}
</section>

アカペラ、弾き語りなどメディアファイルを使わない演奏は、検索欄の横にある「＋ 無伴奏演奏」から追加できます。公開する表示曲名を入力し、手動終了または任意の予定時間を選びます。時間は 10 秒単位のボタンとマウスホイールで調整できます。開始すると BGM を一時停止して Now Singing、予約、履歴を通常の曲と同様に更新し、終了後に元の BGM を再開します。項目は専用のスマート分類とプロジェクトに保存され、偽の無音ファイルは作成しません。

ジャケットは必須ではなく、Card と CD テーマで特に効果を発揮します。曲のメニューから「ジャケットを埋め込む」を開き、検索結果またはローカル画像を選び、プレビューの読み込み後に「埋め込む」を押します。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ja/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/ja/cover-dialog.png' | relative_url }}" alt="オンライン検索結果と読み込み済みジャケットを表示した埋め込み画面"></a><figcaption>検索結果を選択し、左側のプレビューが読み込まれると埋め込み操作が有効になります。</figcaption></figure>

BGM とカラオケ音源は別々に再生・音量・シークを操作できます。カラオケ側では再生速度と半音単位のキーを調整できます。難しい曲をゆっくり練習したいとき、当日の歌いやすいテンポに合わせたいとき、音域が高すぎる／低すぎる伴奏を自分に合うキーへ移したいときに便利で、別バージョンの音源を用意する必要はありません。

2.1 では BGM とカラオケ音源の音量に、より聴感に合う知覚的なラウドネスカーブを使用します。ローカルファイルと YouTube 再生は、同じスライダー数値から出力ゲインへの変換を共有します。更新後も現在のスライダー数値は保持されますが、同じ数値でも旧バージョンと聴感が異なる場合があるため、初回配信前に伴奏とボーカルのバランスを再確認してください。これは音量操作カーブであり、自動ラウドネス正規化ではありません。

調整した速度とキーは曲ごとに記憶されます。別の曲へ切り替えてから戻っても、その曲に合う設定が復元されます。元に戻す場合は速度を `100%`、キーを `0` 半音にリセットできます。変更は再生時だけに適用され、元の音源ファイルや音質を書き換えません。

「予約」を使わなくても、曲テーブルの曲をダブルクリックすればすぐに再生できます。「予約」は視聴者リクエストや歌唱順を管理する任意機能で、ドラッグによる並べ替えと予約行のダブルクリック再生に対応します。「プレイリスト外観」で OBS の予約表示を有効にし、「次の1曲のみ」または 2、3、5、10 曲を選べます。1 曲は **Next On**、複数曲は **Reserve** として表示されますが、最終的な形式は選択テーマの対応内容に従います。再生を終えた曲は「履歴」に移動します。通常終了後は履歴を次回へ持ち越しませんが、異常終了時は復元スナップショットから当日の予約と履歴を復元できます。

<a id="lyrics"></a>
## 03 · 歌詞機能

歌詞は任意です。配信者用の独立した「歌詞ウィンドウ」、視聴者向け OBS 歌詞オーバーレイ、または両方に使用できます。LRC、SRT、VTT、テキスト、YouTube 字幕、LRCLIB に対応します。

曲の「歌詞」ページにある「歌詞を管理…」を押すか、曲一覧の「歌詞」列にある対象曲のアイコンをクリックすると、同じ歌詞管理画面が開きます。オンライン検索、ローカル歌詞の読み込み、検索結果の関連付け、現在の関連付け解除ができます。LRCLIB と YouTube 字幕をまとめて最大 50 件表示し、同期状態、言語、音源時間、歌手情報に合う候補を優先します。YouTube の一時的な制限で字幕を取得できない場合も、他の候補を残して後で再試行できることを案内します。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ja/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/ja/lyrics-manager-linked.png' | relative_url }}" alt="歌詞ファイルの読み込みと歌詞リンク解除を表示した歌詞管理画面"></a><figcaption>歌詞を設定済みでも、左下から別ファイルの読み込みや関連付け解除ができます。</figcaption></figure>

日本語読みはオフ、漢字の上の小さなひらがな、原文下の空白区切りローマ字、またはひらがなとローマ字の同時表示から選べます。韓国語歌詞では、単語間の空白を保ったローマ字表示を選べます。「即時プレビュー + OBS」は同じ設定を使い、独立した「歌詞ウィンドウ」は別の設定を使用します。メイン画面、歌詞ウィンドウ、OBS は同じオフライン背景読みサービスを利用するため、結果が揃います。自動生成は参考用で、固有名詞や歌手独自の読み方とは異なる場合があります。

独立した「歌詞ウィンドウ」では、タイムスタンプ付きの行をクリックすると、カラオケ音源をその行の時刻へ移動できます。LRC などの同期歌詞で利用でき、タイムスタンプのないテキスト歌詞では利用できません。

{% include localized-release-screenshot.html name="lyrics-reading-preview.png" alt="2.1 の同期歌詞と読み方プレビュー" caption="プレビューのレイアウト、フォント、色、現在行の強調、読み方設定は OBS にも反映されます。" %}

歌詞と伴奏がずれている場合、正負の値を考える必要はありません。歌唱が始まっても歌詞がまだ表示されない場合は「歌詞が遅い → 早める」、歌唱より先に歌詞が表示される場合は「歌詞が早い → 遅らせる」を選びます。スライダー中央が同期位置で、左へ動かすと早く、右へ動かすと遅くなります。リセットアイコンで `0 ms` に戻せます。

現在行の前後に表示する行数は、別々のスライダーまたは数値欄で設定できます。曲の冒頭や終わりでは、設定値より表示できる行が少ない場合があります。オフセット変更は、再生を一時停止している間もプレビュー、歌詞ウィンドウ、OBS 用歌詞データへ即時反映されます。

{% include localized-release-screenshot.html name="lyrics-viewer.png" extra_class="manual-figure--medium" alt="2.1 の早める・遅らせる操作と同期歌詞ウィンドウ" caption="歌詞ウィンドウでも同じ時刻調整を使えます。時刻付き歌詞を選ぶとその位置へ移動し、曲を先頭へ戻すと一覧も上端へ戻ります。" %}

<a id="obs-and-themes"></a>
## 04 · プレイリスト外観と OBS

「プレイリスト外観」でテーマを選び、Now Singing、Set List、Next On、Reserve をプレビューします。基本テーマは Default、Transparent Black、Transparent White、Transparent Black v2、Transparent White v2、Card、CD、Signal Line、Stage Caption の順で、その後に装飾テーマが並びます。

<figure class="manual-figure"><a href="{{ '/assets/images/ja/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ja/theme-workspace.png' | relative_url }}" alt="テーマカード、設定、プレビュー、テーマガイドを表示した画面"></a><figcaption>フルモードではテーマ比較、設定、OBS 表示確認を同時に行えます。</figcaption></figure>

<div class="figure-grid">
  <figure class="manual-figure">
    <a href="{{ '/assets/images/demo-obs-result.png' | relative_url }}">
      <img src="{{ '/assets/images/demo-obs-result.png' | relative_url }}" alt="OBS の配信背景に Transparent Black v2 のセットリストと同期歌詞を重ねた状態" loading="lazy" decoding="async">
    </a>
    <figcaption>OBS 内：セットリストと歌詞を別々に拡大縮小・クロップ・移動し、自分の背景へ合わせられます。</figcaption>
  </figure>
</div>

Card は縦型ジャケットカード、CD は円盤風の表示になります。「OBSへドラッグ」を押したまま OBS へドロップするとローカル Browser Source を直接作成できます。配信中などにドロップできない場合は、同じボタンをクリックしてソースのパスをコピーし、OBS で Browser Source を追加して URL 欄へ貼り付け、1920 × 1080 に設定してください。「ローカルファイル」は有効にしません。どちらの方法にも WebSocket は不要です。

テーマのキャンバスは、OBS での使い方を制限するものではありません。自分の配信レイアウトに合わせて、Browser Source を自由に拡大縮小・クロップ・配置できます。Default は特に自由な組み合わせに向いています。プレビューの破線で示された文字領域を目安に、Now Singing や Set List など必要な部分を OBS で切り出し、自作背景の好きな位置に配置してください。透明・装飾テーマも、全体構図のまま使うか一部だけを切り出すかを自由に選べます。OBS のクロップはそのシーン内の表示範囲だけを変え、テーマや曲データは変更しません。

「レイアウト」は画面設定の一番左にあります。アプリはテーマが宣言した機能を読み取り、実際に使用できるタブと設定項目だけを表示します。

| タブ | 設定できる内容 |
| --- | --- |
| **レイアウト** | 対応テーマのテーマ色、背景透明度、またはプロジェクト固有ブロック位置を調整し、テーマ既定値へ復元 |
| **歌唱中** | Now Singing のフォント、サイズ、色、太字／斜体／下線、配置、長い曲名のマーキー速度 |
| **履歴** | Set List のフォント、サイズ、色、番号、文字スタイル、配置、リストのスクロール速度 |
| **予約** | Reserve／Next On 専用のフォント、サイズ、色、番号、文字スタイル、配置 |

OBS に予約曲を表示するか、「次の1曲のみ」または 2、3、5、10 曲の表示数も設定できます。OBS WebSocket を有効にした場合のみ Set List のタイムスタンプ設定が表示され、Reserve／Next On には時刻を付けません。

プレビュー背景は透明、暗色、明色、任意色、画像から選べ、画像はフィット／フィル／ストレッチに対応します。プレビューの配置調整はアプリ内の確認表示だけに作用し、OBS 出力は変わりません。対応しない設定項目は無効表示ではなく非表示になります。Default は最も多くの文字・配置設定に対応し、旧 Transparent Black／White は歌唱中と履歴の文字設定を維持します。v2、Signal Line、Stage Caption では対応する色と透明度を調整できます。

<a id="obs-websocket"></a>
## 05 · OBS WebSocket

初期状態では無効です。主に OBS の配信時間を読み取り、カラオケ開始時刻を記録し、Set List の曲名前にタイムスタンプを表示するために使用します。通常のセットリストや歌詞表示には不要です。

OBS Studio 28 以降で「ツール > WebSocket サーバー設定」を開き、サーバーを有効にしてポート（通常 `4455`）とパスワードを確認します。Singing Stream Savior の「設定 > 配信タイムスタンプ」で WebSocket を有効にし、`127.0.0.1`、同じポートとパスワードを入力して「接続」を押します。OBS のパスワードはローカル接続用の認証情報です。パスワードが写った設定画面を公開しないでください。

右下の緑は接続済み、黄は接続または再接続中、赤は未接続です。本番前にテスト配信でタイムスタンプを確認してください。

<a id="workspace-modes"></a>
## 06 · ワークスペース

- **フルモード：** 全データ、設定、大きなプレビューを表示。配信準備向け。
- **コンパクトモード：** 選曲、プレイヤー、「予約」と「履歴」を残し、幅を取る列と大型プレビューを非表示。
- **ミニモード：** 配信前に歌唱予定曲と画面設定を準備し、「予約」まで並べ終えた配信者向けです。ライブラリと BGM を隠し、カラオケ操作、「予約」「履歴」、［歌詞ウィンドウ］だけを表示します。配信中は準備済みの予約リストから曲を選んで再生できます。歌詞ウィンドウは自由に移動でき、文字サイズも調整できます。

`Ctrl + Shift + M` で切り替えられます。切り替わるのは表示する操作項目だけです。再生中の曲はそのまま続き、既存の予約順と OBS 画面もリセットされません。各モードのウィンドウ配置は個別に記憶されます。

<div class="figure-grid">
  <figure class="manual-figure"><a href="{{ '/assets/images/ja/full-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ja/full-workspace.png' | relative_url }}" alt="日本語のフルモード"></a><figcaption>フルモードは曲ライブラリ、プレイヤー、予約リストをすべて表示します。</figcaption></figure>
  <figure class="manual-figure"><a href="{{ '/assets/images/ja/compact-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ja/compact-workspace.png' | relative_url }}" alt="日本語のコンパクトモード"></a><figcaption>コンパクトモードは選曲と配信中の操作を残します。</figcaption></figure>
  <figure class="manual-figure manual-figure--portrait"><a href="{{ '/assets/images/ja/mini-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ja/mini-workspace.png' | relative_url }}" alt="日本語のミニモード"></a><figcaption>ミニモードは予約リストの表示領域を広く取れます。</figcaption></figure>
</div>

メインウィンドウが不要なときは、閉じるボタンで終了せず Windows の通知領域へ格納するよう設定できます。再生はバックグラウンドで続き、トレイメニューとグローバルショートカットから再生、Key、速度、Profile、マイク、歌詞ウィンドウ、Meter を操作できます。アプリ本体と helper を完全に終了する場合は、トレイメニューの「アプリを終了」を選びます。

{% include localized-release-screenshot.html name="notification-area-menu.png" alt="未再生時の Singing Stream Savior Windows 通知領域メニュー" caption="未再生時は簡潔なメニューです。伴奏再生または高度な配信モードでは、再生、Key、速度、Profile、マイク、Meter の必要な項目が追加されます。" size="medium" %}

<a id="settings-and-troubleshooting"></a>
## 07 · 設定とトラブル対処

他の PC へ移す前に `.bgmsproj`、ローカル音源、読み込んだ歌詞をバックアップしてください。

最上位の `Singing Stream Savior.exe` は Launcher 1.2 で更新を確認します。新しい版がない場合は空の更新画面で停止せず、確認後に検証済みの現行版を自動起動します。オフライン時や次の確認時刻より前でも、インストール済みの版をそのまま起動します。

更新がある場合は、カード形式の画面に現在／更新先バージョンと日本語の更新内容を表示します。「後で」または確認画面を閉じるとファイルを変更せず現行版を起動し、「今すぐ更新」を選んだ場合だけダウンロードを開始します。

<figure class="manual-figure"><a href="{{ '/assets/images/ja/launcher-update-prompt.png' | relative_url }}"><img src="{{ '/assets/images/ja/launcher-update-prompt.png' | relative_url }}" alt="バージョンと更新内容を表示する Launcher 1.2 のカード形式更新画面"></a><figcaption>更新内容はスクロール可能なカードに表示されます。「後で」は現行版を維持し、「今すぐ更新」で検証付き更新を開始します。</figcaption></figure>

キャンセル可能なダウンロード中は、「キャンセル」またはウィンドウを閉じる操作で安全な中止を要求できます。既存ファイルと `current.json` を完全に維持し、一時ファイルを片付けてから現行版を起動します。短い最終コミット段階では閉じる操作を一時的に無視します。更新中にプロセスや PC が強制終了しても、次回起動時に永続トランザクション記録からロールバックまたは完了処理を行い、整合した版だけを起動します。

<figure class="manual-figure"><a href="{{ '/assets/images/ja/launcher-update-progress.png' | relative_url }}"><img src="{{ '/assets/images/ja/launcher-update-progress.png' | relative_url }}" alt="Launcher 1.2 のダウンロード、検証、インストール進行画面"></a><figcaption>HTTPS の取得元、想定サイズ、SHA-256 を確認してから、復旧可能なアトミック処理で版を切り替えます。</figcaption></figure>

外側のランチャー、`current.json`、内部フォルダーは同じ相対位置に保ってください。Launcher 1.2 は自動修復とトランザクション復旧用に一つ前の検証済みパッケージを保持しますが、ワンクリックのダウングレード機能はありません。古いアプリが新しい版で保存したプロジェクトを理解できない可能性があるためです。旧版を試す必要がある場合は、公式の完全 ZIP を**別フォルダー**へ展開し、`.bgmsproj` とメディアのコピーを使用してください。更新に失敗する場合も、異なる版の DLL を混ぜず最新版の完全 ZIP を展開してください。

Qt platform plugin エラーが出る場合は ZIP を再ダウンロードして完全に展開し、一番外側の `Singing Stream Savior.exe` だけを起動してください。データフォルダーの中を確認したり開いたりする必要はありません。デスクトップには、その外側 EXE の Windows ショートカットを作成してください。

歌詞が見つからない場合は検索語を短くし、曲名・歌手名を確認するか、音源時間に近い同期歌詞を選びます。LRC/SRT/VTT/テキストの手動読み込みも可能です。

最近使用したプロジェクトの `.bgmsproj` が移動または削除されている場合、その項目は一覧から自動的に除外されます。
