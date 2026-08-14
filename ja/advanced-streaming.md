---
title: 高度な配信モードと VB-CABLE のインストール
description: Singing Stream Savior 2.1.0.0 のマイクミックスと仮想出力を OBS・Discord に接続する方法
lang: ja
translation_key: advanced-streaming
---

# 高度な配信モード

**2.1.0.0** 以降の高度な配信モードでは、BGM、伴奏、処理済みマイクを Singing Stream Savior 内でミックスし、完全な Stream Mix を OBS、Discord、その他の配信アプリへ送信できます。

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

## 再起動後に Singing Stream Savior を接続

1. **設定 → オーディオルーティング**で **高度な配信モード（ミックス出力）**を選択します。
2. **仮想出力を設定…**を開き、**デバイスを更新**します。
3. Stream Output を VB-CABLE の再生側、通常は **CABLE Input** に設定します。
4. Monitor Output は物理ヘッドホンまたはオーディオインターフェースにします。同じ CABLE Input は選択しないでください。
5. OBS で**音声入力キャプチャ**を追加し、VB-CABLE の録音側、通常は **CABLE Output** を選びます。Discord でも入力デバイスに同じ CABLE Output を選択します。
6. テスト曲を再生しながら話し、Stream Mix と OBS／Discord のメーターが反応し、二重音声やフィードバックがないことを確認します。

> OBS が元のマイクを直接キャプチャしている場合、完全な Stream Mix を使用するときは重複するマイクソースを無効にしてください。

## CABLE Input／Output が見つからない場合

- インストール後に Windows を実際に再起動したか確認します。
- 完全に展開したフォルダーから、管理者として Setup を実行したか確認します。
- Singing Stream Savior の仮想出力設定で**デバイスを更新**します。
- オーディオデバイスを使用中のアプリを閉じます。解決しない場合は [VB-Audio 公式リファレンスマニュアル](https://vb-audio.com/Cable/VBCABLE_ReferenceManual.pdf)を参照してください。

<small>VB-CABLE の名称、画面、インストーラーは VB-Audio Software の製品です。スクリーンショットは手順説明のために掲載しています。</small>
