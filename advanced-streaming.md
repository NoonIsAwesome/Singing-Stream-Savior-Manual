---
title: 進階直播模式與 VB-CABLE 安裝
description: 在 Singing Stream Savior 2.1.0.0 設定麥克風混音、虛擬輸出、OBS 與 Discord
lang: zh-TW
translation_key: advanced-streaming
---

# 進階直播模式

從 **2.1.0.0** 起，進階直播模式可以在 Singing Stream Savior 內混合 BGM、伴奏與處理後的麥克風，再把完整 Stream Mix 送到 OBS、Discord 或其他直播軟體。

```text
Singing Stream Savior → 虛擬音訊線 → OBS／Discord
```

虛擬音訊線是另外安裝的 Windows 驅動。本程式不會替你下載、執行或變更驅動；請只從官方網站取得安裝程式。

> **重新啟動是必要步驟。** VB-Audio 官方安裝說明要求安裝完成後重新啟動 Windows。重新開啟 Singing Stream Savior 或按「重新整理裝置」不能取代重新啟動電腦。

<a id="vb-cable-installation"></a>
## VB-CABLE 安裝教學

以下流程適用於一般 64 位元 Windows 10／11。若使用 Windows on ARM 或其他架構，請依 VB-Audio 官方說明選擇相符的安裝程式。

<a class="manual-cta" href="https://vb-audio.com/Cable/index.htm" target="_blank" rel="noopener noreferrer">開啟 VB-Audio 官方下載頁</a>

<div class="setup-steps">
  <section class="setup-step">
    <span class="setup-step-number">1</span>
    <div>
      <h3>下載目前的 Windows 套件</h3>
      <p>在官方頁面的 Windows 區塊選擇 <strong>New Package</strong>。不要從第三方下載站取得音訊驅動。</p>
      <figure class="manual-figure"><a href="{{ '/assets/images/vb-cable/01-official-download.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/01-official-download.jpg' | relative_url }}" alt="VB-Audio 官方頁面中以紅框標示 Windows 新版 VB-CABLE 套件" loading="lazy" decoding="async"></a><figcaption>套件名稱與版本可能更新；請以官方頁面標示的 New Package 為準。</figcaption></figure>
    </div>
  </section>
  <section class="setup-step">
    <span class="setup-step-number">2</span>
    <div>
      <h3>完整解壓縮 ZIP</h3>
      <p>對下載的 ZIP 選擇「全部解壓縮」，再進入解壓後的資料夾。不要直接在 ZIP 預覽視窗中執行安裝程式，否則可能出現缺少 INF 或驅動套件損壞。</p>
      <figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/02-extracted-folder.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/02-extracted-folder.jpg' | relative_url }}" alt="解壓後的 VBCABLE Driver Pack45 資料夾" loading="lazy" decoding="async"></a><figcaption>先確認看到的是一般資料夾，而不是仍在壓縮檔內。</figcaption></figure>
    </div>
  </section>
  <section class="setup-step">
    <span class="setup-step-number">3</span>
    <div>
      <h3>以系統管理員身分執行 64 位元安裝程式</h3>
      <p>一般 64 位元 Windows 請在 <code>VBCABLE_Setup_x64.exe</code> 上按右鍵，選擇「以系統管理員身分執行」。只有 32 位元 Windows 才使用不含 <code>_x64</code> 的版本。</p>
      <figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/03-run-x64-setup.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/03-run-x64-setup.jpg' | relative_url }}" alt="VB-CABLE 資料夾中的 VBCABLE Setup x64 安裝程式" loading="lazy" decoding="async"></a><figcaption>請選擇檔名包含 <code>_x64</code> 的程式。</figcaption></figure>
    </div>
  </section>
  <section class="setup-step">
    <span class="setup-step-number">4</span>
    <div>
      <h3>安裝驅動</h3>
      <p>Windows 詢問是否允許變更時確認發行來源，然後在安裝視窗按 <strong>Install Driver</strong>。安裝期間請等待完成，不要重複按按鈕或強制關閉視窗。</p>
      <figure class="manual-figure"><a href="{{ '/assets/images/vb-cable/04-install-driver.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/04-install-driver.jpg' | relative_url }}" alt="VB-Audio Virtual Cable Driver Installation 視窗與 Install Driver 按鈕" loading="lazy" decoding="async"></a><figcaption>安裝程式畫面可能隨驅動版本調整，主要操作仍是 Install Driver。</figcaption></figure>
    </div>
  </section>
  <section class="setup-step setup-step--important">
    <span class="setup-step-number">5</span>
    <div>
      <h3>成功後重新啟動 Windows</h3>
      <p>看到 <strong>Installation Complete and Successful</strong> 後按「確定」，儲存正在進行的工作並重新啟動電腦。必須完成重新啟動後，才繼續設定 Singing Stream Savior、OBS 或 Discord。</p>
      <figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/05-restart-required.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/05-restart-required.jpg' | relative_url }}" alt="VB-CABLE 安裝成功並要求重新啟動系統的訊息" loading="lazy" decoding="async"></a><figcaption>這不是選用提醒；驅動需要重新啟動才能完成註冊。</figcaption></figure>
    </div>
  </section>
</div>

## 重新啟動後連接 Singing Stream Savior

1. 開啟 **設定 → 音訊路由**，選擇 **進階直播模式（混合輸出）**。
2. 按 **設定虛擬輸出…**，再按 **重新整理裝置**。
3. 將 Stream Output 設為 VB-CABLE 的播放端點，通常是 **CABLE Input**。
4. Monitor Output 請選擇實體耳機或音訊介面，**不要**選擇同一個 CABLE Input。
5. 在 OBS 新增 **音訊輸入擷取**，裝置選擇 VB-CABLE 的錄音端點，通常是 **CABLE Output**。Discord 則在輸入裝置選擇同一個 CABLE Output。
6. 播放測試歌曲並說話，確認 Singing Stream Savior 的 Stream Mix、OBS／Discord 電平都有反應，且沒有雙重收音或回授。

> 若 OBS 已直接擷取原始麥克風，使用完整 Stream Mix 後請停用重複的麥克風來源，否則人聲可能疊加、變大或產生相位感。

## 找不到 CABLE Input／Output

- 先確認安裝後已真正重新啟動 Windows，而不是只重開應用程式。
- 確認安裝程式是在完整解壓後，以系統管理員身分執行。
- 在 Singing Stream Savior 的虛擬輸出設定按 **重新整理裝置**。
- 關閉正在占用音訊裝置的程式後再檢查；仍無法辨識時，依 [VB-Audio 官方參考手冊](https://vb-audio.com/Cable/VBCABLE_ReferenceManual.pdf) 排除安裝問題。

<small>VB-CABLE 名稱、介面與安裝程式為 VB-Audio Software 的產品。此處截圖僅用於安裝步驟說明。</small>
