---
title: Singing Stream Savior 2.0 ユーザーマニュアル
description: Singing Stream Savior 2.0.0.0 日本語マニュアル
lang: ja
translation_key: home
manual_bundle: true
---

# Singing Stream Savior 2.0 ユーザーマニュアル

Singing Stream Savior は、歌枠配信向けの Windows アプリです。曲ライブラリ、BGM、カラオケ音源、待機リスト、歌詞、OBS オーバーレイを一つの操作画面にまとめます。本書は **2.0.0.0** に対応しています。

<figure class="manual-figure"><a href="{{ '/assets/images/ja/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/ja/lyrics-reading-preview.png' | relative_url }}" alt="歌詞設定、OBS プレビュー、プレイヤー、待機リストを表示したフルモード"></a><figcaption>フルモードは配信前の曲・歌詞・OBS 画面の準備に適しています。画像を選ぶと原寸で確認できます。</figcaption></figure>

まず `.bgmsproj` を作成または開き、曲を登録して表示名を整えます。「プレイリスト外観」でテーマを選び、「OBSへドラッグ」を OBS にドロップしてください。待機リスト、ジャケット、歌詞、OBS WebSocket は任意です。

<a id="getting-started"></a>
## 01 · はじめに

ZIP を通常のフォルダーへ完全に展開します。一番外側のフォルダーにある、下のアイコンの `Singing Stream Savior.exe` をダブルクリックしてください。起動に必要なのはこのファイルだけです。ZIP 内から直接実行したり、データフォルダー内で別の EXE を探したりする必要はありません。

<div class="launch-target"><img src="{{ '/assets/images/singing-stream-savior.ico' | relative_url }}" alt="Singing Stream Savior のアプリアイコン"><div><strong>Singing Stream Savior.exe</strong><span>通常はこのアプリだけを起動します</span></div></div>

「ファイル > 新規プロジェクト」から `.bgmsproj` を作成します。曲、表示名、待機順、歌唱履歴、歌詞の関連付け、テーマ設定が保存されます。タイトルバーの `*` は未保存の変更を表します。

<a id="library-and-playback"></a>
## 02 · 曲ライブラリと再生

ライブラリには「すべての曲」「お気に入り」「最近再生した曲」とカスタムプレイリストがあります。YouTube 動画／プレイリストのほか、`MP3`、`WAV`、`FLAC`、`M4A`、`MP4`、`AAC`、`OGG`、`OPUS`、`WMA` 形式のローカル曲・カラオケ音源を追加できます。「表示曲名」は待機リストと OBS に使用され、空欄ならファイル名または YouTube タイトルが使われます。

ジャケットは必須ではなく、Card と CD テーマで特に効果を発揮します。曲のメニューから「ジャケットを埋め込む」を開き、検索結果またはローカル画像を選び、プレビューの読み込み後に「埋め込む」を押します。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ja/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/ja/cover-dialog.png' | relative_url }}" alt="ジャケット埋め込み画面"></a><figcaption>選択した画像のプレビューが読み込まれると、埋め込み操作が有効になります。</figcaption></figure>

BGM とカラオケ音源は別々に再生・音量・シークを操作できます。カラオケ側では速度と半音単位のピッチも変更でき、元ファイルは書き換えません。

「予約」を使わなくても、曲テーブルの曲をダブルクリックすればすぐに再生できます。「予約」は視聴者からのリクエストや後で歌う予定の曲を管理するための任意機能です。対応テーマでは最初の予約曲を **Next On**、複数の予約曲を **Reserve** に表示できます。再生を終えた曲は「履歴」に移動します。

<a id="lyrics"></a>
## 03 · 歌詞機能

歌詞は任意です。配信者用の独立した「歌詞ウィンドウ」、視聴者向け OBS 歌詞オーバーレイ、または両方に使用できます。LRC、SRT、VTT、テキスト、YouTube 字幕、LRCLIB に対応します。

「歌詞を管理…」では、オンライン検索、ローカル歌詞の読み込み、検索結果の関連付け、現在の関連付け解除ができます。最大 50 件を表示し、同期歌詞と音源時間に近い候補を優先します。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ja/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/ja/lyrics-manager-linked.png' | relative_url }}" alt="歌詞ファイルの読み込みと歌詞リンク解除を表示した歌詞管理画面"></a><figcaption>歌詞を設定済みでも、左下から別ファイルの読み込みや関連付け解除ができます。</figcaption></figure>

日本語読みはオフ、漢字の上の小さなひらがな、原文下の空白区切りローマ字から選べます。辞書による自動生成のため、固有名詞や歌手独自の読み方とは異なる場合があります。

<a id="obs-and-themes"></a>
## 04 · プレイリスト外観と OBS

「プレイリスト外観」でテーマを選び、Now Singing、Set List、Next On、Reserve をプレビューします。基本テーマは Default、Transparent Black、Transparent White、Card、CD の順で、その後に装飾テーマが並びます。

<figure class="manual-figure"><a href="{{ '/assets/images/ja/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ja/theme-workspace.png' | relative_url }}" alt="テーマカード、設定、プレビュー、テーマガイドを表示した画面"></a><figcaption>フルモードではテーマ比較、設定、OBS 表示確認を同時に行えます。</figcaption></figure>

「OBSへドラッグ」を OBS にドロップするとローカル Browser Source が作成されます。この操作に WebSocket は不要です。Card は縦型ジャケットカード、CD は円盤風の表示になります。

テーマのキャンバスは、OBS での使い方を制限するものではありません。自分の配信レイアウトに合わせて、Browser Source を自由に拡大縮小・クロップ・配置できます。Default は特に自由な組み合わせに向いています。プレビューの破線で示された文字領域を目安に、Now Singing や Set List など必要な部分を OBS で切り出し、自作背景の好きな位置に配置してください。透明・装飾テーマも、全体構図のまま使うか一部だけを切り出すかを自由に選べます。OBS のクロップはそのシーン内の表示範囲だけを変え、テーマや曲データは変更しません。

「画面設定」には 4 つのタブがあります。

| タブ | 設定できる内容 |
| --- | --- |
| **歌唱中** | Now Singing のフォント、サイズ、色、太字／斜体／下線、配置、長い曲名のマーキー速度 |
| **履歴** | Set List のフォント、サイズ、色、番号、文字スタイル、配置、リストのスクロール速度 |
| **予約** | Reserve／Next On 専用のフォント、サイズ、色、番号、文字スタイル、配置 |
| **レイアウト** | プロジェクト固有レイアウトを有効にし、Now Singing・履歴・Reserve の見出し／内容ブロックの X、Y、幅、高さを調整、またはテーマ配置へ復元 |

OBS に予約曲を表示するか、最大 1～10 曲の表示数も設定できます。OBS WebSocket を有効にした場合のみ Set List のタイムスタンプ設定が表示され、Reserve／Next On には時刻を付けません。

プレビュー背景は透明、暗色、明色、任意色、画像から選べ、画像はフィット／フィル／ストレッチに対応します。プレビューの配置調整はアプリ内の確認表示だけに作用し、OBS 出力は変わりません。固定デザインのテーマでは一部の文字・配置設定がロックされるため、右側のテーマガイドを確認してください。

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

Qt platform plugin エラーが出る場合は ZIP を再ダウンロードして完全に展開し、一番外側の `Singing Stream Savior.exe` だけを起動してください。データフォルダーの中を確認したり開いたりする必要はありません。デスクトップには、その外側 EXE の Windows ショートカットを作成してください。

歌詞が見つからない場合は検索語を短くし、曲名・歌手名を確認するか、音源時間に近い同期歌詞を選びます。LRC/SRT/VTT/テキストの手動読み込みも可能です。
