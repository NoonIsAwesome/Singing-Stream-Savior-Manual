---
title: 2.1.0.0 進階直播、Profiles 與音訊路由完整指南
description: 詳細介紹 Singing Stream Savior 2.1.0.0 的主畫面直播控制、人聲 Profiles、內建效果器、音訊路由、Meter、錄音、OBS 直連與系統工具
lang: zh-TW
translation_key: advanced-streaming
published: false
---

# 進階直播模式

從 **2.1.0.0** 起，進階直播模式可以在 Singing Stream Savior 內混合 BGM、伴奏與處理後的麥克風，再把完整 Stream Mix 送到 OBS、Discord 或其他直播軟體。

<aside class="version-preview" role="note">
  <span class="version-preview__badge">2.1.0.0 PREVIEW</span>
  <div><strong>本頁介紹的是尚未發布版本。</strong><p>目前公開下載版可能尚未出現以下分頁與控制項；畫面與名稱仍可能在正式發布前微調。</p></div>
</aside>

## 2.1.0.0 設定位置變更

- **YouTube 下載**已移至 **設定 → 檔案與專案**，與專案路徑、媒體資料夾放在同一頁。
- 原本的 **進階設定**已改名為 **直播時間戳**，OBS WebSocket、直播時間讀取與 Set List 時間戳都在這裡設定。
- 新增 **音訊路由**分頁，集中管理一般播放、進階混音、音訊驅動、輸出、監聽與錄音。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2>選擇一般播放或進階直播模式</h2><p>在<strong>設定 → 音訊路由</strong>先選擇路由模式。一般播放模式只輸出本程式的 BGM 與伴奏；進階直播模式會加入麥克風、Profile 效果鏈、完整混音與虛擬輸出。</p></div>
  <div class="feature-shot-grid feature-shot-grid--wide">
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}" alt="音訊路由分頁中的一般播放與進階直播模式選單" loading="lazy" decoding="async"></a><figcaption>不需要處理麥克風時可維持一般播放模式；要把完整混音送往 OBS 或 Discord 時才使用進階直播模式。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}" alt="ASIO 與 Windows Audio 音訊驅動選項" loading="lazy" decoding="async"></a><figcaption>ASIO 適合低延遲唱歌；Windows Audio 相容模式較容易搭配一般 Windows 裝置。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}" alt="Windows Audio 的自動、WASAPI、DirectSound 與 MME 播放方式" loading="lazy" decoding="async"></a><figcaption>「自動（建議）」會優先選擇合適方式；遇到裝置相容問題時才手動改成 WASAPI、DirectSound 或 MME。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}" alt="一般播放模式的 BGM 到系統輸出路由圖與電平表" loading="lazy" decoding="async"></a><figcaption>路由圖會顯示訊號實際流向、預估延遲、Buffer、取樣率與穩定度。</figcaption></figure>
  </div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}" alt="包含 BGM、麥克風、人聲 Profile、直播混音、虛擬輸出、監聽與錄音的完整音訊路由圖" loading="lazy" decoding="async"></a><figcaption>進階直播模式把訊號來源、兩組人聲 Profile、混音、Stream Output、監聽與錄音放在同一張可視化路由圖中。</figcaption></figure>
</div>

### App Buffer 健檢與黃色狀態

**程式安全 Buffer** 選單與 **檢查 Buffer 穩定性…** 按鈕會固定顯示在同一列。使用 ASIO 輸入時，這一列位於 ASIO 取樣率／硬體 Buffer 區塊下方；即使 **Windows 播放相容性**的進階設定保持收合，也能直接調整或開啟健檢。**快速健檢**測試 512／1024 frames，約需 25 秒；**完整健檢**測試 128／256／512／1024 frames，約需 5 分鐘。健檢只診斷歌回救星的 App Buffer，不會更改音訊介面的 ASIO hardware buffer；完成後可直接套用建議，但 128／256 等低值只有在完整健檢的兩輪獨立嚴格觀察都通過後，才會列為目前裝置、Profile、效果器與路由已驗證。

黃色的 **檢查音訊中斷**會在麥克風／監聽 under/overrun、正式 Stream 斷續或裝置中斷／復原時顯示；**檢查音訊時序**則需同一 callback、時鐘或延遲異常持續約 2 秒。一次瞬時 callback peak 不代表已發生可聽掉訊，將游標停在穩定度文字上可查看各路徑計數、裝置復原、callback peak／period 與異常旗標。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h2>建立與編輯人聲 Profiles</h2><p>每個 Profile 是一條可重用的人聲效果鏈。可以新增內建效果或 VST3 Plugin、拖曳調整處理順序、暫時停用單一 Block，並先試聽再儲存。</p></div>
  <div class="feature-shot-grid">
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}" alt="唱歌高音域 Profile 的動音抑制器、EQ、殘響與限制器效果鏈" loading="lazy" decoding="async"></a><figcaption>可為高音域、低音域、KTV、古風等演唱情境建立不同效果鏈。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}" alt="直播聊天 Profile 的輸入增益、噪音閘與限制器效果鏈" loading="lazy" decoding="async"></a><figcaption>聊天與唱歌 Profile 可分開管理，切換時不需要重新調整每一顆效果器。</figcaption></figure>
  </div>
</div>

### Profile 編輯器會保留哪些內容

- Profile 內每個 Block 的啟用狀態、參數與先後順序都會一起保存；重新開啟專案後不必重調。
- 內建效果與 VST3 Plugin 可以混合使用，最多可加入八個 VST3 插槽。VST3 的參數 state 也會跟著 Profile 儲存。
- 拖曳 Block 可以改變實際處理順序；旁路只暫時略過該效果，不會刪除設定。
- 編輯時可直接試聽處理結果。切回直播操作、縮到系統工具或關閉編輯器時，會離開 Profile 試聽並恢復目前的直播監聽設定。
- Factory Profile 是可立即使用的起點；仍建議依麥克風、房間噪音、音域與唱法微調，再另存成自己的 Profile。

### 15 顆內建人聲效果器

效果器採用同一套霧面面板、刻度旋鈕、即時訊號圖與說明按鈕。簡易模式可從情境起點快速調整，進階模式則開放完整參數。

| 類型 | 效果器 | 適合處理的問題 |
| --- | --- | --- |
| 訊號工具 | **Input Gain** | 調整進入效果鏈的音量；音訊介面已設好時先維持接近 0 dB，避免在最前端削波。 |
| 清理 | **Background Attenuation** | 在人聲空隙降低持續背景聲；適合風扇與房間底噪，但無法消除和人聲同時出現的噪音。 |
| 清理 | **Noise Gate** | 在句子之間關閉麥克風，減少鍵盤、滑鼠等間歇聲；開啟／關閉閾值需配合實際環境調整。 |
| 動態 | **Compressor** | 縮小輕聲與大聲之間的差距；Threshold、Attack 與 Release 會共同影響人聲力度與自然度。 |
| 音色 | **Equalizer (EQ)** | 去除不需要的低頻、整理混濁感並塑造男女聲或不同音域的音色。 |
| 音色 | **Saturation** | 增加泛音、厚度或受控的粗糙感；Mix 過高會降低歌詞清晰度。 |
| 音色 | **Air Enhancer** | 增加存在感、空氣感與亮度，並可用 Trim 對齊旁路前後的音量。 |
| 清理 | **De-esser** | 壓低刺耳的 S、SH 等齒音，避免高頻過亮或 Limiter 被齒音頻繁觸發。 |
| 創意 | **Voice Changer** | 同時調整 Pitch 與 Formant，適合角色或特殊段落效果；用途是創意變聲而非身分保護。 |
| 音高與人聲 | **Harmony** | 依歌曲 Key 與演唱音高產生上方或下方三度和聲；追蹤不確定時會平順淡出。 |
| 音高與人聲 | **Doubler** | 加入兩層短延遲與些微音高差的人聲，增加厚度與立體寬度。 |
| 空間 | **Delay** | 加入 slap、KTV 或抒情回聲；Wet 與 Feedback 應保守，避免尾音掩蓋下一句。 |
| 空間 | **Reverb** | 建立房間、Plate 或較長的空靈殘響；Pre-delay 可保留字頭清晰度。 |
| 空間 | **Shimmer** | 在殘響尾音加入高八度光暈；適合空靈段落，也可用歌曲預設與快捷鍵切換。 |
| 動態 | **Limiter** | 放在 Profile 尾端攔截突發人聲峰值，保留輸出安全餘裕。 |

Profile 處理完成後，完整直播輸出還會依序經過 **Mix Bus Compressor**、**Stream Output Limiter** 與 Master 音量。這三項屬於整體直播輸出，不會寫回單一 Profile 的音色設定。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">SONG AUTOMATION</p><h2>用歌曲標籤自動切換 Profile</h2><p>歌曲列表的標籤按鈕可以指定人聲 Profile。播放該首伴奏時，軟體會自動切換到對應效果鏈；選擇<strong>自動 · 唱歌 Profile</strong>則使用目前預設的唱歌 Profile。</p></div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}" alt="歌曲列表中可選擇自動或特定人聲 Profile 的標籤選單" loading="lazy" decoding="async"></a><figcaption>適合替不同音域、曲風或特殊歌曲預先配好效果；正式演唱前仍建議先試唱並確認音量。</figcaption></figure>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">LIVE CONTROL</p><h2>直播中手動切換效果器與麥克風靜音</h2><p>工作區上方可隨時改用指定 Profile，或交回歌曲標籤自動切換。旁邊的麥克風按鈕可立即靜音／解除靜音；切換後請以路由頁的電平表確認訊號狀態。</p></div>
  <figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}" alt="工作區上方的監聽來源、耳機、錄音、麥克風靜音與 Profile 選單" loading="lazy" decoding="async"></a><figcaption>手動選擇會立即套用；要恢復依歌曲標籤切換，選回「自動切換 Profile」。</figcaption></figure>
</div>

### 主畫面上方每個控制項的用途

- **監聽來源**：決定耳機中要聽到 BGM／伴奏、完整混音、BGM／伴奏加濕聲、BGM／伴奏加乾聲，或只聽處理後麥克風。
- **耳機按鈕**：開啟或關閉目前選定的監聽，不會清除已選來源；再次開啟時會沿用同一個來源。
- **錄音按鈕**：主按鈕直接開始／停止錄音，旁邊選單用來選擇錄音來源、WAV 格式與資料夾。
- **麥克風按鈕**：立即將麥克風靜音或恢復；圖示和系統工具右鍵選單保持一致，方便不看文字也能判斷狀態。
- **Profile 選單**：手動指定目前效果鏈，或選回「自動切換 Profile」讓歌曲標籤接管。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>選擇監聽內容並錄下完整混音</h2><p>耳機按鈕控制監聽，來源可以是 BGM／伴奏、完整混音、加入濕聲或乾聲的組合，或只聽處理後麥克風。錄音可選擇完整輸出或目前監聽內容，並可使用 WAV 16-bit PCM 或 WAV 32-bit Float。</p></div>
  <div class="feature-shot-grid feature-shot-grid--compact">
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}" alt="BGM、完整混音、濕聲乾聲與處理後麥克風的監聽來源選單" loading="lazy" decoding="async"></a><figcaption>監聽只影響自己耳機中聽到的內容；Stream Output 仍依音訊路由設定輸出。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}" alt="完整輸出、監聽內容、WAV 格式與錄音資料夾選項" loading="lazy" decoding="async"></a><figcaption>32-bit Float 適合保留後製空間但檔案較大；一般交付可選 16-bit PCM。</figcaption></figure>
  </div>
  <p><strong>避免回授：</strong>開啟麥克風監聽時請使用耳機，不要用會被麥克風再次收到的喇叭。正式直播前先做短錄音，確認人聲、伴奏、音量與延遲。</p>
</div>

### 監聽與錄音不會改變直播輸出

監聽是給演唱者自己聽的獨立路徑。Dry Cue 會用獨立的軟體擷取盡量降低乾聲監聽延遲，但不會改變正式 Mix、OBS 或錄音路徑；需要最低延遲時，仍應優先使用音訊介面的 Hardware Direct Monitor。切換監聽來源或調整 BGM／伴奏監聽、人聲監聽的音量，不會改變觀眾收到的 Stream Output。Meter 的監聽旋鈕可在 0–200% 間調整，適合在唱歌時把人聲稍微提高、把伴奏稍微降低；它不會改寫 Profile 裡的 Compressor、EQ 或其他音色參數。

錄音選單則將「要錄什麼」與「自己聽什麼」分開：

- **完整輸出**沿用正式 Stream Output 的時間軸錄下完整混音；BGM／伴奏與人聲位於同一條正式時間線，Dry Cue 或其他軟體監聽延遲不會改變錄音中的相對 offset。
- **監聽內容**會錄下目前耳機路徑，適合檢查演唱時的監聽平衡。
- **WAV 16-bit PCM**檔案較小、相容性高；**WAV 32-bit Float**保留較多後製空間但檔案更大。
- 可直接選擇錄音資料夾或開啟目前資料夾，不必離開直播操作頁。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2>查看五條音訊路徑與系統負載</h2><p>進階直播模式可從「檢視」或系統工具右鍵選單開啟音量 Meter。它可以停駐在主視窗右側，也能獨立懸浮，並用單一切換按鈕改成橫向或直向顯示。</p></div>
  <p>五軌分別是 <strong>BGM／伴奏</strong>、<strong>人聲（Profile 後、Mix 前）</strong>、<strong>直播輸出</strong>、<strong>BGM／伴奏監聽</strong>與<strong>人聲監聽</strong>。每軌顯示 Peak；直播輸出另顯示三秒短期 <strong>LUFS-S</strong>，方便同時觀察瞬間峰值與主觀響度趨勢。</p>
  <p>每軌旋鈕沿用效果器的刻度樣式，範圍為 0–200%。直播路徑旋鈕調整路由階段的音量，監聽旋鈕只調整耳機平衡；這些控制不會直接改寫 Profile 內部參數。</p>
  <p>橫向 Meter 會在 BGM／伴奏與人聲長時間失衡時，提示提高人聲或調低伴奏；它只提供建議，絕不自動改變任何增益。從頭沒有合格人聲時不會提示；連續 5 秒沒有合格人聲會視為間奏，清除舊提示與判斷資料，下一段歌聲需重新累積。</p>
  <div class="effect-reference"><details><summary><strong>響度提示的判斷方式</strong><span>避免把安靜、換氣或間奏誤判為人聲過小</span></summary><div class="effect-reference__body"><p>系統以正式直播路徑中的 Mix 前 BGM／伴奏與 Profile 後人聲，每 100 ms 建立一筆資料。只有 BGM／伴奏實際處於 Playing、有伴奏訊號、路由與麥克風健康，而且人聲通過活動條件時才累積證據。Noise Gate 有資料時，該區段至少約 25% 時間必須保持開啟；Profile 後人聲平均能量至少為 −45 dBFS，原始麥克風 Peak 至少為 −50 dBFS。顯示失衡提示前，需要至少 10 秒播放、最近 12 秒內至少 6 秒合格人聲，並包含兩段各至少 1.2 秒、彼此相隔至少 300 ms 的人聲；伴奏不比人聲低超過 2 dB，或比人聲更大聲的狀況，還需在最新合格人聲資料中累積至少 6 秒。只有合格人聲平均能量不高於 −26 dBFS，才會同時提示「人聲可能偏小」。若最近資料中原始或處理後人聲 Peak 達到 −6 dBFS 或更高，或 Limiter 增益衰減超過 1 dB，則只保留降低伴奏的建議，不會要求提高人聲。換歌、停止或重新播放、大幅移動播放位置、切換 Profile、路由中斷或等待恢復，以及隱藏 Meter，都會重置判斷。這是訊號活動與長時間響度比較，不是語音辨識。</p></div></details></div>
  <p>主視窗右下角的無外框 CPU／RAM 狀態會顯示本程式使用率。停留滑鼠可看到系統總 CPU、系統記憶體、本程式 Working Set 與 Private Memory；只有進階直播模式才會加上 Buffer、callback、估計延遲和 underrun／overrun 等音訊資訊。負載可能影響穩定度時會以顏色提示。</p>
</div>

<!-- RELEASE_SCREENSHOT: 12-meter-horizontal.jpg + 13-meter-vertical.jpg
     Capture the final muted-blue Meter with native Windows title bar, all five
     route names, PEAK/LUFS-S, 0-200% effect-style knobs, and both orientations. -->
<!-- RELEASE_SCREENSHOT: 14-system-health-tooltip.jpg
     Capture the borderless status plus expanded Advanced-mode audio details. -->

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2>縮到系統工具後仍可控制直播</h2><p>設定中的「按下關閉軟體時縮到系統工具」預設開啟。按主視窗叉叉後，程式可在背景維持直播流程，不必重新打開完整工作區。</p></div>
  <p>系統工具右鍵選單會依目前狀態顯示播放／繼續、暫停、停止、從頭播放、升降 Key、原 Key、速度增減、原速、Profile、麥克風靜音／恢復、歌詞視窗與開啟主視窗；進階直播模式另有 Meter。選擇「關閉軟體」才會結束主程式與相關 helper。</p>
  <p>全域快捷鍵也依「播放控制」與「麥克風／監聽」分類並提供預設按鍵；音訊路由不是進階直播模式時，會隱藏不適用的麥克風／監聽項目。快捷鍵在歌回救星執行期間可從其他應用程式觸發，並可在設定中改成自己的組合。</p>
</div>

<!-- RELEASE_SCREENSHOT: 15-tray-menu.jpg
     Capture the complete state-aware menu while accompaniment is playing,
     including icons, Key/speed submenus, Lyrics, Meter, and red Exit action. -->

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h2>使用 OBS 音訊插件或虛擬音源</h2><p>進階直播輸出提供兩條路徑：可直接送到 Singing Stream Savior OBS 音訊插件，也可輸出到 VB-CABLE 等虛擬音源。兩者都輸出同一條經過 Profile、Mix Bus 與最終限制器的 Stream Output。</p></div>
  <p>「安裝 OBS 外掛」的既有選單可選標準版或 Portable OBS 資料夾，並可在同一選單執行移除。安裝成功後，Stream Output 會自動切換到 <strong>Singing Stream Savior 音訊（OBS 外掛）</strong>；重新啟動 OBS 後新增同名音訊來源，就能直接接收訊號，不需要再把它當成一般 Windows 播放裝置尋找。</p>
  <p>如果使用虛擬音源，則在歌回救星選擇 CABLE Input，並在 OBS 以「音訊輸入擷取」選擇 CABLE Output。不要同時保留另一條原始麥克風來源，以免人聲重複。</p>
</div>

<!-- RELEASE_SCREENSHOT: 16-obs-plugin-output.jpg
     Capture the install/repair/remove menu, synthetic OBS output selection,
     and the corresponding OBS source after the final real-OBS signal test. -->

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

### 重新啟動後連接 Singing Stream Savior

1. 開啟 **設定 → 音訊路由**，選擇 **進階直播模式（混合輸出）**。
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
