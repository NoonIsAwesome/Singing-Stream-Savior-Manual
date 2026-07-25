---
title: Singing Stream Savior 2.0 ユーザーマニュアル
description: Singing Stream Savior 2.0.0.0 日本語マニュアル
lang: ja
translation_key: home
---

# Singing Stream Savior 2.0 ユーザーマニュアル

Singing Stream Savior は、歌枠配信向けの Windows アプリです。曲ライブラリ、BGM、カラオケ音源、待機リスト、歌詞、OBS オーバーレイを一つの操作画面にまとめます。本書は **2.0.0.0** に対応しています。

<figure class="manual-figure"><a href="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}" alt="歌詞設定、OBS プレビュー、プレイヤー、待機リストを表示したフルモード"></a><figcaption>フルモードは配信前の曲・歌詞・OBS 画面の準備に適しています。画像を選ぶと原寸で確認できます。</figcaption></figure>

まず `.bgmsproj` を作成または開き、曲を登録して表示名と待機順を整えます。「セットリスト外観」でテーマを選び、「OBS へドラッグ」を OBS にドロップしてください。ジャケット、歌詞、OBS WebSocket は任意です。

<a id="getting-started"></a>
## 01 · はじめに

ZIP を通常のフォルダーへ完全に展開し、外側の `Singing Stream Savior.exe` を起動します。ZIP 内から直接実行したり、EXE や DLL だけを移動したりしないでください。Qt、FFmpeg、テーマ、日本語読み辞書は元の配置を必要とします。

「ファイル > 新規プロジェクト」から `.bgmsproj` を作成します。曲、表示名、待機順、歌唱履歴、歌詞の関連付け、テーマ設定が保存されます。タイトルバーの `*` は未保存の変更を表します。

<a id="library-and-playback"></a>
## 02 · 曲ライブラリと再生

ライブラリには「すべての曲」「お気に入り」「最近再生した曲」とカスタムプレイリストがあります。ローカル音源、YouTube 動画、YouTube プレイリストを追加できます。「表示曲名」は待機リストと OBS に使用され、空欄ならファイル名または YouTube タイトルが使われます。

ジャケットは必須ではなく、Card と CD テーマで特に効果を発揮します。曲のメニューから「ジャケットを埋め込む」を開き、検索結果またはローカル画像を選び、プレビューの読み込み後に「埋め込む」を押します。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/cover-dialog.png' | relative_url }}" alt="ジャケット埋め込み画面"></a><figcaption>選択した画像のプレビューが読み込まれると、埋め込み操作が有効になります。</figcaption></figure>

BGM とカラオケ音源は別々に再生・音量・シークを操作できます。カラオケ側では速度と半音単位のピッチも変更でき、元ファイルは書き換えません。

<a id="lyrics"></a>
## 03 · 歌詞機能

歌詞は任意です。配信者用の独立した「歌詞ウィンドウ」、視聴者向け OBS 歌詞オーバーレイ、または両方に使用できます。LRC、SRT、VTT、テキスト、YouTube 字幕、LRCLIB に対応します。

「歌詞を管理…」では、オンライン検索、ローカル歌詞の読み込み、検索結果の関連付け、現在の関連付け解除ができます。最大 50 件を表示し、同期歌詞と音源時間に近い候補を優先します。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/lyrics-manager-linked.png' | relative_url }}" alt="LRC 読み込みと歌詞リンク解除を表示した歌詞管理画面"></a><figcaption>歌詞を設定済みでも、左下から別ファイルの読み込みや関連付け解除ができます。</figcaption></figure>

日本語読みはオフ、漢字の上の小さなひらがな、原文下の空白区切りローマ字から選べます。辞書による自動生成のため、固有名詞や歌手独自の読み方とは異なる場合があります。

<a id="obs-and-themes"></a>
## 04 · セットリストテーマと OBS

「セットリスト外観」でテーマを選び、Now Singing、Set List、Next On、Reserve をプレビューします。基本テーマは Default、Transparent Black、Transparent White、Card、CD の順で、その後に装飾テーマが並びます。

<figure class="manual-figure"><a href="{{ '/assets/images/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/theme-workspace.png' | relative_url }}" alt="テーマカード、設定、プレビュー、テーマガイドを表示した画面"></a><figcaption>フルモードではテーマ比較、設定、OBS 表示確認を同時に行えます。</figcaption></figure>

「OBS へドラッグ」を OBS にドロップするとローカル Browser Source が作成されます。この操作に WebSocket は不要です。Card は縦型ジャケットカード、CD は円盤風の表示になります。

<a id="obs-websocket"></a>
## 05 · OBS WebSocket（テスト機能）

初期状態では無効です。現在は主に OBS の配信時間を読み取り、カラオケ開始時刻を記録し、Set List の曲名前にタイムスタンプを表示するために開発されています。通常のセットリストや歌詞表示には不要です。

OBS Studio 28 以降で「ツール > WebSocket サーバー設定」を開き、サーバーを有効にしてポート（通常 `4455`）とパスワードを確認します。アプリの「設定 > 詳細設定」で WebSocket を有効にし、`127.0.0.1`、同じポートとパスワードを入力して「接続」を押します。

<figure class="manual-figure"><a href="{{ '/assets/images/obs-websocket-settings.png' | relative_url }}"><img src="{{ '/assets/images/obs-websocket-settings.png' | relative_url }}" alt="OBS WebSocket の説明と接続項目を表示した詳細設定"></a><figcaption>WebSocket を有効にした場合のみ、接続操作と状態表示を使用できます。</figcaption></figure>

右下の緑は接続済み、黄は接続または再接続中、赤は未接続です。本番前にテスト配信でタイムスタンプを確認してください。

<a id="workspace-modes"></a>
## 06 · ワークスペース

- **フルモード：** 全データ、設定、大きなプレビューを表示。配信準備向け。
- **コンパクトモード：** 選曲、プレイヤー、待機・歌唱済みを残し、幅を取る列と大型プレビューを非表示。
- **ミニモード：** ライブラリと BGM を隠し、カラオケ操作、歌詞ウィンドウ、待機・歌唱済みだけを表示。

`Ctrl + Shift + M` で切り替えられます。再生、待機順、OBS 出力には影響せず、各モードのウィンドウ配置を個別に記憶します。

<a id="settings-and-troubleshooting"></a>
## 07 · 設定とトラブル対処

設定には表示言語、プロジェクト／メディア保存先、YouTube 形式、テスト中の WebSocket が含まれます。他の PC へ移す前に `.bgmsproj`、ローカル音源、読み込んだ歌詞をバックアップしてください。

Qt platform plugin エラーが出る場合は ZIP を完全に展開し、外側の EXE から起動して、内側に `platforms/qwindows.dll` があることを確認します。デスクトップには EXE 単体ではなく外側ランチャーのショートカットを作成してください。

歌詞が見つからない場合は検索語を短くし、曲名・歌手名を確認するか、音源時間に近い同期歌詞を選びます。LRC/SRT/VTT/テキストの手動読み込みも可能です。

