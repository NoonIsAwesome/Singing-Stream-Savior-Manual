---
title: Singing Stream Savior 2.0 ユーザーマニュアル
description: Singing Stream Savior 2.0.1.0 日本語マニュアル
lang: ja
translation_key: home
manual_bundle: true
---

# Singing Stream Savior 2.0 ユーザーマニュアル

Singing Stream Savior は、歌枠配信向けの Windows アプリです。曲ライブラリ、BGM、カラオケ音源、待機リスト、歌詞、OBS オーバーレイを一つの操作画面にまとめます。本書は **2.0.1.0** に対応しています。

<figure class="manual-figure"><a href="{{ '/assets/images/ja/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/ja/lyrics-reading-preview.png' | relative_url }}" alt="歌詞設定、OBS プレビュー、プレイヤー、待機リストを表示したフルモード"></a><figcaption>フルモードは配信前の曲・歌詞・OBS 画面の準備に適しています。画像を選ぶと拡大プレビューを開けます。</figcaption></figure>

## 初回セットアップのおすすめ手順

1. 配信中に使用する BGM を選び、配信に合う音量へ調整します。
2. 今回の配信で必要なカラオケ音源をライブラリまたはプレイリストへ追加します。
3. 各曲の「表示曲名」を編集します。この名前が待機リストと OBS のセットリストに表示されます。
4. 「プレイリスト外観」を開き、「OBSへドラッグ」ボタンを OBS へドロップしてから、使用したいテーマを選びます。
5. カラオケ音源を 1 曲テスト再生し、停止後に BGM が自動で再開することを確認します。
6. 選曲・再生・停止を一度操作し、配信中の流れに慣れておきます。
7. プロジェクトを保存すれば、初回設定は完了です。

> 最初に表示言語やプロジェクト／メディアフォルダーを設定したり、テスト用の待機リストを作ったりする必要はありません。待機リスト、ジャケット、歌詞、OBS WebSocket は必要になった時点で追加設定できます。

<a id="getting-started"></a>
## 01 · はじめに

ZIP を通常のフォルダーへ完全に展開します。一番外側のフォルダーにある、下のアイコンの `Singing Stream Savior.exe` をダブルクリックしてください。起動に必要なのはこのファイルだけです。ZIP 内から直接実行したり、データフォルダー内で別の EXE を探したりする必要はありません。

<div class="launch-target"><img src="{{ '/assets/images/singing-stream-savior.ico' | relative_url }}" alt="Singing Stream Savior のアプリアイコン"><div><strong>Singing Stream Savior.exe</strong><span>通常はこのアプリだけを起動します</span></div></div>

「ファイル > 新規プロジェクト」から `.bgmsproj` を作成します。曲、表示名、待機順、歌詞の関連付け、テーマ設定が保存されます。歌唱履歴は当日の配信セッション用で、通常のプロジェクト保存には含まれません。アプリが異常終了した場合は、再起動時に復元スナップショットから待機リストと歌唱履歴を戻せます。タイトルバーの `*` は未保存の変更を表します。

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

ジャケットは必須ではなく、Card と CD テーマで特に効果を発揮します。曲のメニューから「ジャケットを埋め込む」を開き、検索結果またはローカル画像を選び、プレビューの読み込み後に「埋め込む」を押します。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ja/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/ja/cover-dialog.png' | relative_url }}" alt="オンライン検索結果と読み込み済みジャケットを表示した埋め込み画面"></a><figcaption>検索結果を選択し、左側のプレビューが読み込まれると埋め込み操作が有効になります。</figcaption></figure>

BGM とカラオケ音源は別々に再生・音量・シークを操作できます。カラオケ側では再生速度と半音単位のキーを調整できます。難しい曲をゆっくり練習したいとき、当日の歌いやすいテンポに合わせたいとき、音域が高すぎる／低すぎる伴奏を自分に合うキーへ移したいときに便利で、別バージョンの音源を用意する必要はありません。

調整した速度とキーは曲ごとに記憶されます。別の曲へ切り替えてから戻っても、その曲に合う設定が復元されます。元に戻す場合は速度を `100%`、キーを `0` 半音にリセットできます。変更は再生時だけに適用され、元の音源ファイルや音質を書き換えません。

「予約」を使わなくても、曲テーブルの曲をダブルクリックすればすぐに再生できます。「予約」は視聴者からのリクエストや後で歌う予定の曲を管理するための任意機能です。対応テーマでは最初の予約曲を **Next On**、複数の予約曲を **Reserve** に表示できます。再生を終えた曲は「履歴」に移動します。通常終了後は履歴を次回へ持ち越しませんが、異常終了時は復元スナップショットから当日の予約と履歴を復元できます。

<a id="lyrics"></a>
## 03 · 歌詞機能

歌詞は任意です。配信者用の独立した「歌詞ウィンドウ」、視聴者向け OBS 歌詞オーバーレイ、または両方に使用できます。LRC、SRT、VTT、テキスト、YouTube 字幕、LRCLIB に対応します。

曲の「歌詞」ページにある「歌詞を管理…」を押すか、曲一覧の「歌詞」列にある対象曲のアイコンをクリックすると、同じ歌詞管理画面が開きます。オンライン検索、ローカル歌詞の読み込み、検索結果の関連付け、現在の関連付け解除ができます。最大 50 件を表示し、同期歌詞と音源時間に近い候補を優先します。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ja/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/ja/lyrics-manager-linked.png' | relative_url }}" alt="歌詞ファイルの読み込みと歌詞リンク解除を表示した歌詞管理画面"></a><figcaption>歌詞を設定済みでも、左下から別ファイルの読み込みや関連付け解除ができます。</figcaption></figure>

日本語読みはオフ、漢字の上の小さなひらがな、原文下の空白区切りローマ字から選べます。内蔵のオフライン解析・分かち書きエンジンで生成するため、歌詞を外部へ送信する必要はありません。ただし、固有名詞や歌手独自の読み方とは異なる場合があります。

独立した「歌詞ウィンドウ」では、タイムスタンプ付きの行をクリックすると、カラオケ音源をその行の時刻へ移動できます。LRC などの同期歌詞で利用でき、タイムスタンプのないテキスト歌詞では利用できません。歌詞オフセットの変更は、再生を一時停止している間もプレビュー、歌詞ウィンドウ、OBS 用歌詞データへ即時反映されます。

<figure class="manual-figure">
  <a href="{{ '/assets/images/demo-lyrics-preview.png' | relative_url }}">
    <img src="{{ '/assets/images/demo-lyrics-preview.png' | relative_url }}" alt="繁体字中国語の歌詞画面で、カラオケ再生中の現在行を強調した同期歌詞プレビュー" loading="lazy" decoding="async">
  </a>
  <figcaption>この操作例は繁体字中国語の画面です。プレビューで確認した歌詞の配置、フォント、色、ハイライトが OBS にも反映されます。</figcaption>
</figure>

<a id="obs-and-themes"></a>
## 04 · プレイリスト外観と OBS

「プレイリスト外観」でテーマを選び、Now Singing、Set List、Next On、Reserve をプレビューします。基本テーマは Default、Transparent Black、Transparent White、Transparent Black v2、Transparent White v2、Card、CD、Signal Line、Stage Caption の順で、その後に装飾テーマが並びます。

<figure class="manual-figure"><a href="{{ '/assets/images/ja/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ja/theme-workspace.png' | relative_url }}" alt="テーマカード、設定、プレビュー、テーマガイドを表示した画面"></a><figcaption>フルモードではテーマ比較、設定、OBS 表示確認を同時に行えます。</figcaption></figure>

<div class="figure-grid">
  <figure class="manual-figure">
    <a href="{{ '/assets/images/demo-theme-preview.png' | relative_url }}">
      <img src="{{ '/assets/images/demo-theme-preview.png' | relative_url }}" alt="繁体字中国語のプレイリスト外観画面で Transparent Black v2 をプレビューした状態" loading="lazy" decoding="async">
    </a>
    <figcaption>アプリ内：テーマを選び、Now Singing、Song List、Next On の配置を確認します。画面表示は繁体字中国語です。</figcaption>
  </figure>
  <figure class="manual-figure">
    <a href="{{ '/assets/images/demo-obs-result.png' | relative_url }}">
      <img src="{{ '/assets/images/demo-obs-result.png' | relative_url }}" alt="OBS の配信背景に Transparent Black v2 のセットリストと同期歌詞を重ねた状態" loading="lazy" decoding="async">
    </a>
    <figcaption>OBS 内：セットリストと歌詞を別々に拡大縮小・クロップ・移動し、自分の背景へ合わせられます。</figcaption>
  </figure>
</div>

「OBSへドラッグ」を OBS にドロップするとローカル Browser Source が作成されます。この操作に WebSocket は不要です。Card は縦型ジャケットカード、CD は円盤風の表示になります。

テーマのキャンバスは、OBS での使い方を制限するものではありません。自分の配信レイアウトに合わせて、Browser Source を自由に拡大縮小・クロップ・配置できます。Default は特に自由な組み合わせに向いています。プレビューの破線で示された文字領域を目安に、Now Singing や Set List など必要な部分を OBS で切り出し、自作背景の好きな位置に配置してください。透明・装飾テーマも、全体構図のまま使うか一部だけを切り出すかを自由に選べます。OBS のクロップはそのシーン内の表示範囲だけを変え、テーマや曲データは変更しません。

「レイアウト」は画面設定の一番左にあります。アプリはテーマが宣言した機能を読み取り、実際に使用できるタブと設定項目だけを表示します。

| タブ | 設定できる内容 |
| --- | --- |
| **レイアウト** | 対応テーマのテーマ色、背景透明度、またはプロジェクト固有ブロック位置を調整し、テーマ既定値へ復元 |
| **歌唱中** | Now Singing のフォント、サイズ、色、太字／斜体／下線、配置、長い曲名のマーキー速度 |
| **履歴** | Set List のフォント、サイズ、色、番号、文字スタイル、配置、リストのスクロール速度 |
| **予約** | Reserve／Next On 専用のフォント、サイズ、色、番号、文字スタイル、配置 |

OBS に予約曲を表示するか、最大 1～10 曲の表示数も設定できます。OBS WebSocket を有効にした場合のみ Set List のタイムスタンプ設定が表示され、Reserve／Next On には時刻を付けません。

プレビュー背景は透明、暗色、明色、任意色、画像から選べ、画像はフィット／フィル／ストレッチに対応します。プレビューの配置調整はアプリ内の確認表示だけに作用し、OBS 出力は変わりません。対応しない設定項目は無効表示ではなく非表示になります。Default は最も多くの文字・配置設定に対応し、旧 Transparent Black／White は歌唱中と履歴の文字設定を維持します。v2、Signal Line、Stage Caption では対応する色と透明度を調整できます。

<a id="obs-websocket"></a>
## 05 · OBS WebSocket（テスト機能）

初期状態では無効です。現在は主に OBS の配信時間を読み取り、カラオケ開始時刻を記録し、Set List の曲名前にタイムスタンプを表示するために開発されています。通常のセットリストや歌詞表示には不要です。

OBS Studio 28 以降で「ツール > WebSocket サーバー設定」を開き、サーバーを有効にしてポート（通常 `4455`）とパスワードを確認します。アプリの「設定 > 詳細設定」で WebSocket を有効にし、`127.0.0.1`、同じポートとパスワードを入力して「接続」を押します。

<figure class="manual-figure"><a href="{{ '/assets/images/ja/obs-websocket-settings.png' | relative_url }}"><img src="{{ '/assets/images/ja/obs-websocket-settings.png' | relative_url }}" alt="OBS WebSocket の説明と接続項目を表示した詳細設定"></a><figcaption>WebSocket を有効にした場合のみ、接続操作と状態表示を使用できます。</figcaption></figure>

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

<a id="settings-and-troubleshooting"></a>
## 07 · 設定とトラブル対処

設定には表示言語、プロジェクト／メディア保存先、YouTube 形式、テスト中の WebSocket が含まれます。他の PC へ移す前に `.bgmsproj`、ローカル音源、読み込んだ歌詞をバックアップしてください。

最上位の `Singing Stream Savior.exe` は、今後の更新を確認し、ダークテーマの進行画面に状態を表示します。新しいバージョンがある場合は、ダウンロードとインストールの前に確認します。更新しない場合も、現在のバージョンをそのまま起動できます。外側のランチャー、`current.json`、内部フォルダーは同じ相対位置に保ってください。新しいランチャーが必要な場合や更新に失敗した場合は、異なる版の DLL を混ぜず、最新版の完全 ZIP を展開してください。

Qt platform plugin エラーが出る場合は ZIP を再ダウンロードして完全に展開し、一番外側の `Singing Stream Savior.exe` だけを起動してください。データフォルダーの中を確認したり開いたりする必要はありません。デスクトップには、その外側 EXE の Windows ショートカットを作成してください。

歌詞が見つからない場合は検索語を短くし、曲名・歌手名を確認するか、音源時間に近い同期歌詞を選びます。LRC/SRT/VTT/テキストの手動読み込みも可能です。

最近使用したプロジェクトの `.bgmsproj` が移動または削除されている場合、その項目は一覧から自動的に除外されます。
