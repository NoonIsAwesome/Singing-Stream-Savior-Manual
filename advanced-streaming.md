---
title: "進階直播音訊：麥克風效果與混音輸出"
description: "從 2.1.0.0 起，進階直播模式可以在 Singing Stream Savior 內混合 BGM、伴奏與 Profile 效果器處理後的麥克風，再把完整 Stream Mix 送到 OBS、Discord 或其他通訊／直播軟體。"
lang: zh-TW
translation_key: advanced-streaming
published: true
---

# 進階直播音訊：麥克風效果與混音輸出

<section class="advanced-streaming-lead" data-article-lead markdown="1">

{% include advanced-streaming-benefits.html %}

<nav class="article-outline audio-output-targets" id="advanced-quick-start" aria-label="先選擇混音的輸出目的地">
  <strong>先選擇混音的輸出目的地</strong><ul><li><a href="#output-obs">輸出訊號送至 OBS</a></li><li><a href="#output-discord">輸出訊號送至 Discord（或其他通訊軟體）</a></li></ul>
</nav>

<a id="obs-output-walkthrough-title"></a>
<h2 id="output-obs">輸出訊號送至 OBS</h2>
<p>只需要送到 OBS 時，先使用專用音訊外掛，不必安裝虛擬音源。先完成以下四步，再依後面說明調整預設唱歌 Profile。</p>
{% include stream-route-steps.html target="obs" %}
{% include route-next-profile.html %}

<details class="audio-route-details" markdown="1"><summary>其他 OBS 接法與外掛細節（需要時展開）</summary>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h3>使用 OBS 音訊插件或虛擬音源</h3><p>進階直播輸出提供兩條路徑：可直接送到 Singing Stream Savior OBS 音訊插件，也可輸出到 VB-CABLE 等虛擬音源。兩者都輸出同一條經過 Profile、Mix Bus 與最終限制器的 Stream Output。</p></div>
  <p>「安裝 OBS 外掛」的既有選單可選標準版或 Portable OBS 資料夾，並可在同一選單執行移除。安裝成功後，Stream Output 會自動切換到 <strong>Singing Stream Savior 音訊（OBS 外掛）</strong>；重新啟動 OBS 後新增同名音訊來源，就能直接接收訊號，不需要再把它當成一般 Windows 播放裝置尋找。</p>
  <p>如果使用虛擬音源，則在歌回救星選擇 CABLE Input，並在 OBS 以「音訊輸入擷取」選擇 CABLE Output。不要同時保留另一條原始麥克風來源，以免人聲重複。</p>
</div>

{% include stream-route-steps.html target="virtual" %}

</details>

<a id="discord-output-walkthrough-title"></a>
<h2 id="output-discord">輸出訊號送至 Discord（或其他通訊軟體）</h2>
<p>利用 VB-CABLE 等虛擬音源，把已完成的混音當作通訊軟體的麥克風輸入。不需要先開 OBS：歌回救星送到 CABLE Input，Discord 從 CABLE Output 接收。</p>
{% include stream-route-steps.html target="discord" %}
{% include route-next-profile.html %}
<p>Discord 的通話傳輸仍可能對聲音重新編碼、壓縮或做平台端處理，因此音質可能比本機錄音或 OBS 錄影稍差。這通常不是歌回救星路由異常；需要保留最高音質時，請以 OBS 或本機錄音為準。</p>

<a id="vb-cable-installation"></a>
<details class="audio-route-details audio-route-details--installation" markdown="1"><summary>VB-CABLE 安裝圖解（尚未安裝時展開）</summary>

虛擬音訊線是另外安裝的 Windows 驅動。本程式不會替你下載、執行或變更驅動；請只從官方網站取得安裝程式。

> **重新啟動是必要步驟。** VB-Audio 官方安裝說明要求安裝完成後重新啟動 Windows。重新開啟 Singing Stream Savior 或按「重新整理裝置」不能取代重新啟動電腦。

### VB-CABLE 安裝教學

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

### 重新啟動後連接 Singing Stream Savior

1. 開啟 **設定 → 音訊路由**，選擇 **進階直播模式（混音輸出）**。
2. 按 **設定虛擬輸出…**，再按 **重新整理裝置**。
3. 將 Stream Output 設為 VB-CABLE 的播放端點，通常是 **CABLE Input**。
4. Monitor Output 請選擇實體耳機或音訊介面，**不要**選擇同一個 CABLE Input。
5. 在 OBS 新增 **音訊輸入擷取**，裝置選擇 VB-CABLE 的錄音端點，通常是 **CABLE Output**。Discord 則在輸入裝置選擇同一個 CABLE Output。
6. 播放測試歌曲並說話，確認 Singing Stream Savior 的 Stream Mix、OBS／Discord 電平都有反應，且沒有雙重收音或回授。

> 若 OBS 已直接擷取原始麥克風，使用完整 Stream Mix 後請停用重複的麥克風來源，否則人聲可能疊加、變大或產生相位感。

### 找不到 CABLE Input／Output

- 先確認安裝後已真正重新啟動 Windows，而不是只重開應用程式。
- 確認安裝程式是在完整解壓後，以系統管理員身分執行。
- 在 Singing Stream Savior 的虛擬輸出設定按 **重新整理裝置**。
- 關閉正在占用音訊裝置的程式後再檢查；仍無法辨識時，依 [VB-Audio 官方參考手冊](https://vb-audio.com/Cable/VBCABLE_ReferenceManual.pdf) 排除安裝問題。

<small>VB-CABLE 名稱、介面與安裝程式為 VB-Audio Software 的產品。此處截圖僅用於安裝步驟說明。</small>

</details>

</section>


<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2 id="route-modes">一般播放器與進階直播模式的差異</h2><p>在<strong>設定 → 音訊路由</strong>先選擇路由模式。一般播放模式只輸出本程式的 BGM 與伴奏；進階直播模式會加入麥克風、Profile 效果鏈、完整混音與虛擬輸出。</p></div>
  {% include localized-release-screenshot.html name="audio-routing.png" alt="2.1 音訊路由頁上半部" caption="頁面上半部可選擇 OBS 外掛／虛擬輸出、路由模式、Windows Audio、App Buffer、輸入來源、Profile 與 Stream Output。" %}
  {% include localized-release-screenshot.html name="audio-routing-bottom.png" alt="2.1 音訊路由頁下半部" caption="向下捲動可設定 Monitor 與錄音，並查看預估延遲和完整訊號路徑。" %}
</div>

一般播放器保留 BGM／伴奏播放與歌詞／歌單功能；進階直播模式另外處理麥克風並完成混音。Profile（人聲效果設定）主要處理麥克風，不是把伴奏也送進同一條人聲效果鏈。Monitor（監聽）是自己聽的路徑，OBS／Discord 接收的是 Stream Output。

**麥克風 → Profile 效果器訊號鏈 → 與 BGM／伴奏混音 → Stream Output → OBS／Discord**

<h2 id="singing-profile-defaults">設定預設唱歌 Profile 與自動切換</h2>

在「設定 → 音訊路由」選擇唱歌與聊天的預設 Profile，不必為每首歌設定標籤。再確認主畫面使用自動切換，而不是手動固定某組效果。

{% include profile-introduction.html %}

{% include stream-route-steps.html target="default" %}

[前往 Profile（直播效果器）設定 →]({{ '/profiles.html' | relative_url }})

<h2 id="audio-reference">裝置、監聽、錄音與穩定性詳細說明</h2>

輸出與自動切換設定好後，再依需要閱讀以下內容。第一次正式使用前，請在沒有直播、通話或外部錄音時完成穩定性健檢，不必每次開播重跑。

### 建議設定：一般使用者先照這樣做

> **最省事的起點是 ASIO（有錄音介面時）＋程式安全 Buffer「自動（建議）· 512 frames」＋ OBS 專用音訊來源。** 一開始不必為了追求最低數字手動嘗試每一種 Buffer。

- 錄音介面有原廠 ASIO 時優先使用 ASIO；介面的 hardware buffer 維持原本已穩定的設定，常見起點是 128 或 256 frames。App Buffer 與它是兩個不同設定。
- 沒有 ASIO 時選 Windows Audio，App Buffer 先維持自動 512。不要一開始就強迫使用 128／256。
- 想降低軟體 Dry Monitor 延遲時再執行「完整健檢」；只有健檢建議 256 時才直接套用。唱歌主監聽仍優先使用錄音介面的 Direct Monitor。
- OBS 優先使用 Singing Stream Savior 專用音訊來源；只有其他程式也要接收同一份完整 Mix 時，才需要 VB-CABLE 等虛擬音源。
- 完成初次路由設定後至少執行一次完整健檢並套用建議值；之後不必每次開播重跑。只有更換裝置／驅動、大幅改變 Profile／VST3／路由，或狀態轉黃、真的聽到爆音時才重新健檢。

<details class="audio-route-details" id="buffer-stability" markdown="1">
<summary>{{ site.data.manual_workflows[page.lang].buffer_summary | escape }}</summary>

### App Buffer 健檢與黃色狀態

**程式安全 Buffer** 選單與 **檢查 Buffer 穩定性…** 按鈕會固定顯示在同一列。使用 ASIO 輸入時，這一列位於 ASIO 取樣率／硬體 Buffer 區塊下方；即使 **Windows 播放相容性**的進階設定保持收合，也能直接調整或開啟健檢。**快速健檢**測試 512／1024 frames，約需 25 秒；**完整健檢**測試 128／256／512／1024 frames，約需 5 分鐘。健檢只診斷歌回救星的 App Buffer，不會更改音訊介面的 ASIO hardware buffer；完成後可直接套用建議，但 128／256 等低值只有在完整健檢的兩輪獨立嚴格觀察都通過後，才會列為目前裝置、Profile、效果器與路由已驗證。

健檢本身不會播放合成測試音或伴奏。若已啟用軟體監聽，測試期間仍可能聽到即時麥克風；每次路由重新啟動也可能造成短暫中斷。按下確認後，歌回救星會自動停止本程式正在播放的 BGM 與伴奏，但無法代為停止 OBS 串流、Discord 通話或外部錄音，仍須由使用者先行停止。音訊介面的 **Direct Monitor** 不受這項測試影響。

{% include localized-release-screenshot.html name="audio-health-check.png" alt="完整 App Buffer 穩定性健檢完成後的結果視窗" caption="完整健檢完成示例：綠色勾勾表示通過，較深的綠色列是這台電腦的建議值；黃色表示測試完成但安全餘裕不足。每台電腦的建議值與延遲都可能不同。" %}

> **128／256 顯示「尚未驗證」是正常的嗎？** 是。低 Buffer 需要連續通過較嚴格的穩定性檢查，才會列為建議值；「尚未驗證」不代表當下已經爆音。此時直接使用健檢推薦的 512，只有確實需要降低軟體監聽延遲時才再嘗試較低數值。App Buffer 與音訊介面的 ASIO hardware buffer 是兩個不同設定。

黃色的 **檢查音訊中斷**表示麥克風、監聽、直播輸出或裝置復原期間可能不穩；**檢查音訊時序**表示處理時間或同步狀態持續異常。短暫的尖峰不一定代表已經出現可聽見的斷音，將游標停在穩定度文字上可查看詳細資訊。

</details>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2 id="monitor-record">選擇監聽內容並錄下完整混音</h2><p>耳機按鈕控制監聽，來源可以是 BGM／伴奏、完整混音、加入濕聲或乾聲的組合，或只聽處理後麥克風。錄音可選擇完整輸出或目前監聽內容，並可使用 WAV 16-bit PCM、WAV 24-bit PCM 或 WAV 32-bit Float。</p></div>
  {% include localized-release-screenshot.html name="audio-routing-bottom.png" alt="音訊路由中的 Monitor 與錄音路徑" caption="Monitor 只改變自己聽到的內容；完整輸出錄音沿用正式 Stream Output 時間軸，畫面中的路由線可直接核對兩者。" %}
  <p><strong>避免回授：</strong>開啟麥克風監聽時請使用耳機，不要用會被麥克風再次收到的喇叭。正式直播前先做短錄音，確認人聲、伴奏、音量與延遲。</p>
</div>

### 監聽與錄音不會改變直播輸出

監聽是給演唱者自己聽的獨立路徑。Dry Cue 會用獨立的軟體擷取盡量降低乾聲監聽延遲，但不會改變正式 Mix、OBS 或錄音路徑；需要最低延遲時，仍應優先使用音訊介面的 Hardware Direct Monitor。切換監聽來源或調整 BGM／伴奏監聽、人聲監聽的音量，不會改變觀眾收到的 Stream Output。Meter 的監聽旋鈕可在 0–200% 間調整，適合在唱歌時把人聲稍微提高、把伴奏稍微降低；它不會改寫 Profile 裡的 Compressor、EQ 或其他音色參數。

錄音選單則將「要錄什麼」與「自己聽什麼」分開：

- **完整輸出**沿用正式 Stream Output 的時間軸錄下完整混音；BGM／伴奏與人聲位於同一條正式時間線，Dry Cue 或其他軟體監聽延遲不會改變錄音中的相對 offset。
- **監聽內容**會錄下目前耳機路徑，適合檢查演唱時的監聽平衡。
- **WAV 16-bit PCM**檔案最小、相容性最高；**WAV 24-bit PCM**是一般錄音與後製的建議平衡；**WAV 32-bit Float**保留最大的後製餘裕，但檔案也最大。
- 可直接選擇錄音資料夾或開啟目前資料夾，不必離開直播操作頁。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2 id="audio-meter">查看六條音訊路徑與系統負載</h2><p>進階直播模式可從「檢視」或系統工具右鍵選單開啟音量 Meter。它可以停駐在主視窗右側，也能獨立懸浮，並用單一切換按鈕改成橫向或直向顯示。</p></div>
  <p>六軌依序是 <strong>BGM／伴奏</strong>、<strong>人聲（Profile 後、Mix 前）</strong>、<strong>BGM／伴奏監聽</strong>、<strong>人聲監聽</strong>、<strong>導唱監聽</strong>與<strong>Master／直播輸出</strong>。每軌顯示 Peak；直播輸出另顯示三秒短期 <strong>LUFS-S</strong>。導唱只供演唱者監聽，不會送入 OBS 的直播混音。</p>
  <p>每軌旋鈕沿用效果器的刻度樣式：導唱監聽為 0–100%，其餘音軌為 0–200%。直播路徑旋鈕調整路由階段的音量，監聽旋鈕只調整耳機平衡；這些控制不會直接改寫 Profile 內部參數。</p>
  <p>橫向 Meter 會在 BGM／伴奏與人聲持續失衡時，提示提高人聲或調低伴奏；它只提供建議，不會自動改變任何增益。安靜、換氣或歌曲間奏不會立刻被判斷成人聲過小。</p>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="audio-meter-horizontal.png" alt="六軌音量 Meter 的橫向電平顯示" caption="橫向音量表可向下捲動，查看導唱監聽與最後的 Master／直播輸出。導唱音量為 0–100%，其餘控制為 0–200%。" %}{% include localized-release-screenshot.html name="audio-meter-vertical.png" alt="六軌音量 Meter 的直向電平顯示" caption="直向 Meter 使用相同六軌與控制，可停駐在主視窗右側或拆出獨立視窗；Master 位於最後。" %}</div>
  <div class="effect-reference"><details><summary><strong>響度提示何時會出現？</strong><span>只在有足夠伴奏與演唱資料時判斷</span></summary><div class="effect-reference__body"><p>軟體會先觀察一段持續的伴奏與人聲，再比較兩者的長時間平衡。歌曲剛開始、安靜段落、換氣、間奏、切換 Profile 或音訊裝置正在恢復時，都不會急著顯示建議。若人聲已接近過載，軟體也只會建議調低伴奏，不會要求再提高人聲。換歌、停止、重新播放或大幅移動播放位置後，會重新累積資料。</p></div></details></div>
  <details class="audio-route-details"><summary>{{ site.data.manual_workflows[page.lang].health_summary | escape }}</summary>
  <p>主視窗右下角的 CPU／RAM 狀態會顯示本程式使用率。停留滑鼠可查看系統與本程式的詳細資源用量；進階直播模式還會顯示 Buffer、處理時間、預估延遲及音訊中斷計數。負載可能影響穩定度時會以顏色提示。</p>
  {% include localized-release-screenshot.html name="system-resource-status.png" alt="主視窗右下角收合狀態的 CPU 與記憶體摘要" caption="未停留滑鼠時只保留精簡 CPU／RAM 摘要；指向文字後會展開系統、本程式與進階音訊健康資料。" size="medium" %}
  {% include system-health-interpretation.html %}
  </details>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2 id="tray-shortcuts">縮到系統工具後仍可控制直播</h2><p>設定中的「按下關閉軟體時縮到系統工具」預設開啟。按主視窗叉叉後，程式可在背景維持直播流程，不必重新打開完整工作區。</p></div>
  <p>系統工具右鍵選單會依目前狀態顯示播放／繼續、暫停、停止、從頭播放、升降 Key、原 Key、速度增減、原速、Profile、麥克風靜音／恢復、歌詞視窗與開啟主視窗；進階直播模式另有 Meter。選擇「關閉軟體」才會結束程式與播放功能。</p>
  {% include localized-release-screenshot.html name="notification-area-menu.png" alt="歌回救星未播放時的 Windows 系統通知區右鍵選單" caption="實際截圖為未播放時的精簡選單；播放伴奏或啟用進階直播模式後，會依狀態增加播放、Key、速度、Profile、麥克風與 Meter 操作。" size="medium" %}
  <p>全域快捷鍵也依「播放控制」與「麥克風／監聽」分類並提供預設按鍵；音訊路由不是進階直播模式時，會隱藏不適用的麥克風／監聽項目。快捷鍵在歌回救星執行期間可從其他應用程式觸發，並可在設定中改成自己的組合。</p>
  {% include keyboard-shortcuts-reference.html %}
  {% include localized-release-screenshot.html name="keyboard-shortcuts.png" alt="設定頁中的鍵盤快捷鍵分類與按鍵設定" caption="快捷鍵依播放控制、麥克風與監聽分類；可直接修改，非進階直播模式會隱藏不適用項目。" %}
</div>

<p id="profile-chain-heading">效果器細節已移至獨立的 Profile 章節。 <a href="{{ '/profiles.html#profile-chain-heading' | relative_url }}">前往 Profile（直播效果器）設定 →</a></p>

## 2.1.0.0 設定位置變更

- **YouTube 下載**已移至 **設定 → 檔案與專案**，與專案路徑、媒體資料夾放在同一頁。
- 原本的 **進階設定**已改名為 **直播時間戳**，OBS WebSocket、直播時間讀取與 Set List 時間戳都在這裡設定。
- 新增 **音訊路由**分頁，集中管理一般播放、進階混音、音訊驅動、輸出、監聽與錄音。
