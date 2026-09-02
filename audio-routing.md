---
title: 音訊路由完整教學｜2.1.0.0
description: 設定歌回救星 2.1.0.0 的麥克風、伴奏、監聽、錄音、OBS 外掛、虛擬音源、音量 Meter 與音訊健康資訊
lang: zh-TW
translation_key: audio-routing
---

# 音訊路由

音訊路由決定「聲音從哪裡進來、經過哪些處理，以及最後送到哪裡」。如果只使用歌回救星播放 BGM 和伴奏，可以維持一般播放模式；如果希望歌曲開始時自動套用麥克風效果，並把處理後的人聲與伴奏一起送到 OBS，請使用進階直播模式。

<aside class="version-preview" role="note">
  <span class="version-preview__badge">2.1.0.0 新功能</span>
  <div><strong>本章與「人聲 Profiles」需要搭配閱讀。</strong><p>路由負責接收麥克風、混合伴奏與輸出；Profile 負責人聲音色。正式直播前，請先用短錄音確認裝置、音量、效果與延遲。</p></div>
</aside>

<nav class="paired-guides" aria-label="2.1.0.0 音訊設定教學">
  <a class="paired-guide" href="{{ '/audio-routing.html' | relative_url }}" aria-current="page"><span class="paired-guide__node">IN</span><span class="paired-guide__copy"><strong>音訊路由</strong><small>麥克風、伴奏、監聽、OBS 與錄音</small></span><span class="paired-guide__arrow" aria-hidden="true">›</span></a>
  <a class="paired-guide" href="{{ '/profiles.html' | relative_url }}"><span class="paired-guide__node">FX</span><span class="paired-guide__copy"><strong>人聲 Profiles</strong><small>效果器訊號鏈、歌曲標籤與自動切換</small></span><span class="paired-guide__arrow" aria-hidden="true">›</span></a>
</nav>

## 先理解完整訊號流程

```text
麥克風 → 人聲 Profile → 直播混音 → Stream Output → OBS／Discord
                          ↑
                    BGM／歌唱伴奏
```

觀眾聽到的是 **Stream Output**。自己的耳機則走獨立的 **Monitor Output**，所以可以把人聲監聽調大、把伴奏監聽調小，而不改變直播中的音量平衡。

<div class="guide-checklist">
  <div><strong>音訊路由負責</strong><p>輸入裝置、驅動、Buffer、直播輸出、監聽、錄音、OBS 外掛或虛擬音源。</p></div>
  <div><strong>人聲 Profile 負責</strong><p>噪音閥、壓縮、EQ、Reverb、Shimmer、VST3 與效果器先後順序。</p></div>
</div>

## 選擇一般播放或進階直播模式

開啟 **設定 → 音訊路由**，先選擇使用方式。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">01 · ROUTING MODE</p><h2>依需求選擇模式</h2><p>一般播放模式不接管麥克風；進階直播模式才會啟用麥克風 Profile、Stream Output、監聽混音、錄音、Meter 與 OBS 直連。</p></div>
</div>

選擇進階直播模式後，建議依序設定：

1. 麥克風輸入與音訊驅動。
2. Stream Output 要送往 OBS 外掛或哪一個虛擬音源。
3. Monitor Output 要送往哪一副耳機或音訊介面。
4. 到「人聲 Profiles」頁確認聊天與唱歌效果。
5. 播放測試伴奏，在 Meter 與 OBS 中確認訊號。

## 音訊驅動與 Buffer

- Buffer 越小，監聽延遲通常越低，但電腦或驅動來不及處理時可能出現爆音。
- Buffer 越大，穩定餘裕通常越高，但自己聽到麥克風的時間會更晚。
- 不要只追求最小數字。請以實際唱歌時沒有爆音、沒有中斷，而且延遲可以接受為準。

### 使用 Buffer 健檢

**程式安全 Buffer** 選單與 **檢查 Buffer 穩定性…** 按鈕會固定顯示在同一列。使用 ASIO 輸入時，這一列位於 ASIO 取樣率／硬體 Buffer 區塊下方；即使 **Windows 播放相容性**的進階設定保持收合，也能直接調整或開啟健檢。

- **快速健檢**：測試 512／1024 frames，約需 25 秒，適合先確認安全值的基本狀況。
- **完整健檢**：測試 128／256／512／1024 frames，約需 5 分鐘。只有完整健檢會對 128／256 等低值做嚴格驗證；通過後才可能列為可套用的建議。
- 每一列會整理測試狀況與預估延遲；完成後可直接套用建議值。低值通過代表它已在**目前這組裝置、Profile、效果器與路由**完成驗證，不代表以後不可能因負載或裝置變更而斷訊。

這項健檢診斷的是歌回救星內部的 **App Buffer**，不會更改錄音介面的 **ASIO hardware buffer**。例如音訊介面維持 128 frames 時，健檢仍可另外測試 App Buffer；兩者是不同層級。測試會暫時切換 App 路由，因此錄音或 OBS 串流正在進行時不會啟動。

健檢本身不會播放合成測試音或伴奏。若已啟用軟體監聽，測試期間仍可能聽到即時麥克風；每次路由重新啟動也可能造成短暫中斷。按下確認後，歌回救星會自動停止本程式正在播放的 BGM 與伴奏，但無法代為停止 OBS 串流、Discord 通話或外部錄音，仍須由使用者先行停止。音訊介面的 **Direct Monitor** 不受這項測試影響。

{% include localized-release-screenshot.html name="audio-health-check.png" alt="尚未開始測試的 Buffer 穩定性健檢視窗" caption="此圖是開始測試前的實際視窗；健檢開始後才會逐列填入測試狀態、估計延遲與是否通過，全部判定完成後才提供可直接套用的建議 Buffer。" %}

### 黃色穩定度訊息代表什麼

- **檢查音訊中斷**：偵測到麥克風／監聽 under/overrun、正式 Stream 路徑斷續，或裝置正在中斷／復原時立即顯示；恢復後仍會短暫保留，方便看見剛發生的事件。
- **檢查音訊時序**：callback、裝置回報、時鐘或延遲帳務等異常持續約 2 秒後才顯示，和已確認的音訊中斷是不同狀態。

一次瞬時 callback peak 或短暫時鐘修正，不等於觀眾已聽到斷訊，也不會直接被寫成「檢查音訊中斷」。將游標停在穩定度文字上，可以查看麥克風／監聽計數、Stream 斷續與通知、裝置復原、callback peak／period、時序旗標及 Dry Cue 監聽計數，據此判斷黃色提示的來源。

### 開發機實測

測試環境為 **Windows、48 kHz、Universal Audio Volt ASIO、Volt 276、Monitor Output：MONITOR L／R (Volt 276)**；硬體 Buffer 使用 128 frames。數值來自 2.1.0.0 正式版的工程測試訊號，**只代表這台開發機，不保證其他電腦、驅動、裝置或效果鏈得到相同結果**。`mic → monitor` 是麥克風進入軟體到達監聽輸出的端到端估計；`Dry − Program` 是耳機裡 Dry 人聲相對 BGM／伴奏較晚到達的估計。

| 路徑／驅動 | Buffer／時間 | 訊號路徑延遲與對齊 | OBS marker／下游 transport | 中斷、爆音與測試結果 | 適合用途 |
| --- | --- | --- | --- | --- | --- |
| ASIO 軟體 Monitor | App 256／硬體 128；180 秒 | mic → monitor **52.729 ms**；Dry − Program **31.396 ms**。這是監聽差，不是正式 Mix offset。 | — | mic 與 monitor 的 underrun／overrun／discontinuity 均為 **0**。 | 低延遲軟體 Dry 參考；仍以 Direct Monitor 為主。 |
| ASIO 軟體 Monitor | App 512／硬體 128；180 秒 | mic → monitor **68.833 ms**；Dry − Program **36.833 ms**。 | — | mic 與 monitor 的 underrun／overrun／discontinuity 均為 **0**。 | 256 不穩時換取較大穩定餘裕。 |
| ASIO「BGM／伴奏 + Dry」Monitor 長測 | App 256／硬體 128；2026-09-02；**30:00.032** | 估算 mic → Stream **24.354 ms**；Dry mic → Monitor **52.729 ms**；Dry − BGM **31.396 ms**。三者是不同觀測點的工程估算，不是 ADC／嘴形端到端，**不可彼此相加**。 | — | mic、Dry Cue、Monitor 的 underrun／overrun／discontinuity 全為 **0**；Dry lapped／reprime／invalid／overflow **0**；錄音 dropped／overrun／write failed **0**；Profile **60／60**、效果開關 **60／60**、參數編輯 **732／732**。WAV analyzer **PASS**：markers **900**、clipping **0**、low-energy windows **0**、suspicious jumps **0**。 | BGM＋Dry 監聽、正式輸出與錄音隔離的半小時壓力證據；主唱仍優先使用 Direct Monitor。 |
| Windows Audio Monitor | App 512；不使用 ASIO hardware buffer；300 秒 | mic → Final Mix **45.895833 ms**；Dry mic → Monitor **86.208333 ms**；Dry − Program **43.541667 ms**。 | — | mic underrun／overrun／discontinuity **0**；monitor underrun／overrun／discontinuity **0**；recording dropped／overrun **0**。 | 沒有 ASIO 的相容方案；接受較高監聽延遲。 |
| ASIO → OBS 專用音訊來源，完整輸出 | App 512／硬體 128；300 秒 | calculated mic → stream **38.6875 ms**；BGM 與人聲沿用正式 Mix 共同時間線。 | min／avg／max **83.6016／88.9963／94.0491 ms**。marker 已走「正式 Program／Mix 對齊 → OBS 接收」，不是類比 ADC／攝影機端到端。 | dropped／overrun／write failed **0**；Profile **10／10**；效果開關 **10／10**。 | OBS 29–32 優先選擇，少一層 Windows 虛擬裝置。 |
| Windows Audio → OBS 專用音訊來源，完整輸出 | App 512；Volt 276；不使用 ASIO hardware buffer；300 秒 | calculated mic → stream **50.541667 ms**；BGM 與人聲沿用正式 Mix 共同時間線。 | min／avg／max **90.1341／95.67／101.182 ms**。marker 定義同上，不是嘴形同步總延遲。 | mic underrun／overrun／discontinuity **0**；OBS dropped frames／rebuffers／timestamp discontinuities／near-underruns **0**；recording dropped／overrun／write failed **0**；Profile **10／10**；效果開關失敗 **0**。 | 沒有 ASIO 時的 OBS 相容路徑；開發機通過 5 分鐘整合測試，但延遲高於 ASIO。 |
| OBS 專用音訊外掛，歷史 transport gate | Connector 1.0.3；正式 Mix／DSP 後；600 秒 | — | transport min／avg／max **36.48／45.33／57.74 ms**；這不是 mic → stream 或嘴形同步總延遲。 | steady-state silence、fade、drop、timestamp、bridge discontinuity 全為 **0**。 | 說明 OBS transport 自身的延遲與連續性；不能和其他列當成同一次測試。 |
| ASIO 完整輸出與錄音 | App 256／硬體 128；30 分鐘 | mic → stream **31.895833 ms**；正式輸出與 WAV 共用對齊時間線。 | — | xrun、recording dropped／overrun／write failed **0**；Profile **60／60**；效果開關 **60／60**；markers **900**；callback max **0.824 ms**；source max gap **21.0445 ms**。 | 長時間直播與完整輸出錄音的開發機基準。 |
| VB-CABLE 虛擬音訊輸出，歷史 transport run | 正式 Mix／DSP 後的 Windows 虛擬裝置；1,800 秒 | — | median／P95／max **78.12／87.47／96.88 ms**；MAD jitter **0.85 ms**。這是 transport-only，不是嘴形同步總延遲。 | 該 30 分鐘單獨 transport run 完成；BGM／人聲進入裝置前已在正式 Mix 對齊。 | OBS 以外的程式也需要同一混音時使用；延遲通常高於專用 OBS 外掛。 |

端到端延遲表示整條訊號多久到達目的地，**不等於 BGM／伴奏與人聲之間存在同樣大小的 offset**。OBS 外掛、虛擬音訊輸出與「完整輸出」錄音在送出前都使用正式 Mix 的共同時間線；即使整體晚 50 或 100 ms，兩者仍可保持彼此對齊。表中的 `calculated mic → stream` 與同列 OBS marker 是同一次 run 的不同觀測點，**不可相加**；marker 已經包含正式 Program／Mix 對齊後送到 OBS 接收端的區段，也不是從類比 ADC 或攝影機嘴形開始量的端到端數字。虛擬音訊裝置、OBS 與影像擷取則可能各自再增加延遲，嘴形同步仍要用實際錄影確認。

表中的 OBS transport 與 VB-CABLE transport 是不同日期、不同測試目的的歷史 Release 證據，不能把兩列數字相減或當成同一次 A／B。OBS connector 的前一代 1,800 秒驗證曾量到 **27.05／40.74／47.86 ms** min／avg／max 且 continuity 問題為 0，可作回歸背景，但目前公開建議以較新的 600 秒嚴格 gate 為主。正式直播仍應查看 App 健康資訊，並錄一段拍手／嘴形影片做本機同步確認。

### 一般建議設定

- 有原廠 ASIO 時，先設定錄音介面 **128 frames**、App **256 frames**。完整健檢與實際唱歌都穩定即可維持，不必只為追求數字改成更小。
- 出現 under/overrun、可聽爆音、斷訊或裝置復原時，把 App Buffer 提高到 **512 frames**；穩定輸出比軟體監聽再少幾毫秒重要。
- 只能使用 Windows Audio 時，先確保正式輸出穩定並接受較高的軟體監聽延遲。
- 演唱主監聽仍使用音訊介面的 **Direct Monitor**；BGM／伴奏＋Dry 是低延遲參考，不是硬體零延遲監聽的替代品。

## 進階直播模式的混音畫面

{% include localized-release-screenshot.html name="audio-routing.png" alt="2.1.0.0 音訊路由頁面的上半部" caption="此實圖顯示右上方的 OBS 外掛安裝與虛擬輸出入口、路由模式、Windows Audio、App Buffer、健檢入口，以及來源、Profile、正式 Mix 與 Stream Output；Monitor、錄音與路由圖下半部需向下捲動查看。" %}

{% include localized-release-screenshot.html name="audio-routing-bottom.png" alt="2.1.0.0 音訊路由頁面的下半部" caption="向下捲動後可查看 Monitor、錄音、完整路由線與延遲狀態；Monitor 的延遲不會改變 OBS／正式輸出內伴奏與人聲的對齊。" %}

### 預設 Profile 與 BGM 閃避

- **直播聊天人聲 Profile**：播放 BGM 或聊天時自動套用。
- **唱歌人聲 Profile**：播放歌唱伴奏時的預設值；單一歌曲的 Profile 標籤可覆寫它。主畫面麥克風按鈕的右鍵選單可暫時指定其他 Profile，選回「自動切換 Profile」後才會再次依聊天／唱歌狀態與歌曲標籤切換。
- **BGM 閃避 · 自動**：只在偵測到麥克風人聲時暫時降低 BGM，最多降低 9 dB；它不會提高麥克風音量。播放歌唱伴奏時會自動 Bypass，避免整首伴奏跟著歌聲忽大忽小，此時伴奏與人聲的整體融合交由 Mix Bus Compressor。選擇「關閉」則完全停用這項自動降低。

### 直播輸出的三個主要控制

- **Mix Bus Compressor**：輕微整理伴奏與人聲合在一起時的動態。可 Bypass；一般只需要讓正常峰值出現約 1–3 dB 的增益衰減。
- **Final Limiter**：立體聲連動、具 Lookahead 的 **Sample-Peak Limiter**，不是 True-Peak Limiter。預設 ceiling −1.0 dBFS 可攔截 PCM 取樣點峰值並保留編碼前餘裕，但不保證 AAC／重取樣後仍低於 −1.0 dBTP；Lookahead 也不等於 True Peak。它的開關狀態依模式分開：<strong>一般播放模式預設關閉</strong>；<strong>進階直播模式第一次使用預設開啟</strong>。之後在兩種模式手動設定的開／關狀態會各自保存，不會互相覆寫。正式直播建議保留安全限制。
- **Master**：調整整條 Stream Output 的最終音量，不會改寫個別 Profile 的音色。

這些是整體直播輸出處理，不屬於任何一個人聲 Profile。切換歌曲 Profile 時，它們不會一起被替換。

## 將聲音送進 OBS

歌回救星提供兩種方式。兩者傳送的是同一條 Stream Output，不需要同時使用。

### 方法一：Singing Stream Savior OBS 音訊外掛

安裝入口就是本章音訊路由實圖右上方的 **安裝 OBS 外掛…** 按鈕；旁邊的 **設定虛擬輸出…** 屬於下個方法，不需要兩種路徑同時設定。

1. 在歌回救星的 OBS 外掛選單選擇 **標準版 OBS**，或指定 **Portable OBS 資料夾**。
2. 安裝或修復完成後，重新啟動 OBS。
3. Stream Output 會自動選取 **Singing Stream Savior 音訊（OBS 外掛）**。
4. 在 OBS 的「來源」按 **＋**，新增同名的 Singing Stream Savior 音訊來源。
5. 播放伴奏並說話，確認 OBS 混音器中的電平有反應。

外掛更新時可直接使用同一個選單執行修復／更新；不再需要時，也可從同一選單移除標準版或 Portable OBS 的外掛。請避免在 OBS 同時保留原始麥克風與完整 Stream Output，否則人聲可能重複、變大或產生相位感。

### 方法二：虛擬音源

```text
歌回救星的 Stream Output → CABLE Input → CABLE Output → OBS 音訊輸入擷取
```

1. 只從虛擬音源的官方網站安裝驅動，完成後依安裝程式要求重新啟動 Windows。
2. 在歌回救星將 Stream Output 選為虛擬音源的播放端，例如 **CABLE Input**。
3. Monitor Output 請選實體耳機或音訊介面，不要選同一個 CABLE Input。
4. 在 OBS 新增 **音訊輸入擷取**，選擇虛擬音源的錄音端，例如 **CABLE Output**。
5. 在歌回救星與 OBS 兩邊都確認電平，再錄製一段測試影片。

> OBS 外掛少經過一層 Windows 虛擬音源；虛擬音源則可供 OBS 以外的軟體使用。實際延遲與穩定度會受電腦、驅動、Buffer 和裝置影響，請以本機狀態資訊與測試錄音為準，而不是把單一測試數字當成每台電腦的保證。

## 監聽：自己在耳機中聽到什麼

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">02 · MONITOR</p><h2>監聽與直播輸出彼此獨立</h2><p>切換監聽來源或調整監聽音量，只改變演唱者耳機中的內容，不會改變觀眾收到的 Stream Output。</p></div>
</div>

- **BGM／伴奏**：只聽播放內容，不聽軟體麥克風監聽。
- **完整混音**：接近 Stream Output 的整體結果，適合檢查觀眾會聽到的平衡。
- **BGM／伴奏 + Dry**：加入未經 Profile 的麥克風。Dry Cue 使用獨立的軟體乾聲監聽擷取，目的是盡量降低耳機中的乾聲延遲；它不會改變送往正式 Mix、OBS 或錄音的訊號路徑。它仍會經過擷取與監聽輸出 Buffer，因此不是音訊介面的零延遲 Direct Monitor。
- **BGM／伴奏 + Wet**：加入經過 Profile／VST3 的人聲，可聽見效果，但處理與 Buffer 會增加監聽延遲。
- **只聽處理後麥克風**：方便調整效果器，正式演唱時通常仍會搭配伴奏。

需要最低延遲時，優先使用音訊介面的 **Hardware Direct Monitor**。它繞過軟體監聽路徑，通常是唱歌時延遲最低的選擇，但無法包含歌回救星內的 Profile 效果。Dry Cue 即使發生監聽專用的 underrun／讀取落後，也不能單憑這項計數判定正式 Mix、OBS 或錄音已掉訊。開啟任何麥克風監聽時請使用耳機，避免喇叭聲再次被麥克風收到而回授。

## 錄音

- **完整輸出**：沿用正式 Stream Output 的時間軸錄下觀眾會收到的完整混音，BGM／伴奏與人聲使用同一條正式輸出時間線。Dry Cue 或其他軟體監聽在耳機中的延遲，不會改變完整輸出錄音內兩者的相對 offset。
- **監聽內容**：錄下自己耳機路徑，適合檢查監聽平衡。
- **WAV 16-bit PCM**：檔案較小、相容性高。
- **WAV 32-bit Float**：保留較多後製空間，但檔案較大。

## 音量 Meter 與系統狀態

只有啟用進階直播模式時，「檢視」與系統工具右鍵選單才會顯示音量 Meter。Meter 可停駐在主視窗右側或獨立懸浮，並可用同一顆按鈕切換橫向／直向顯示。

五條 Meter 分別是：

1. **BGM／伴奏**。
2. **人聲（Profile 後、Mix 前）**。
3. **直播輸出**，另顯示 PEAK 與三秒短期 LUFS-S。
4. **BGM／伴奏監聽**。
5. **人聲監聽**。

每軌旋鈕範圍為 0–200%。直播路徑的旋鈕調整該路徑音量；兩個監聽旋鈕只改變耳機平衡，不會改寫 Compressor、EQ 或其他 Profile 參數。

橫向 Meter 會在伴奏與人聲長時間失衡時顯示小型文字，建議提高人聲或調低伴奏。這只是健檢提示，**不會自行改變 BGM、麥克風、Profile 或直播輸出的音量**；直向 Meter 為了保留寬度，不顯示這段文字。

{% include localized-release-screenshot.html name="audio-meter-horizontal.png" alt="以橫向電平條排列的五軌音量 Meter" caption="此實圖顯示五軌 Peak 與 0–200% 音量旋鈕；LUFS-S 與長時間失衡文字必須在符合量測條件時才會出現，因此未顯示在這張固定訊號截圖中。" %}

{% include localized-release-screenshot.html name="audio-meter-vertical.png" alt="以直向電平條排列的五軌音量 Meter 面板" caption="此圖只裁出直向 Meter 面板本身；它保留相同的五軌與旋鈕，實際停駐在主視窗右側的整體畫面將另以實機圖補充。" %}

<div class="effect-reference">
<details>
  <summary><strong>Meter 如何避免把沒唱歌或間奏判成「人聲過小」？</strong><span>安靜、換氣與間奏都不會直接觸發提示</span></summary>
  <div class="effect-reference__body">
    <p>系統不辨識歌詞內容，而是使用正式直播路徑中每 100 ms 的 Mix 前 BGM／伴奏與 Profile 後人聲資料。只有伴奏確實為 Playing、伴奏能量高於 −65 dBFS、目前的路由與麥克風健康，而且量測資料屬於正在使用的 Profile 時，才會保留這次觀察。</p>
    <ul>
      <li><strong>片段先要像人聲：</strong>Noise Gate 有資料時，該片段至少約 25% 時間保持開啟；Profile 後人聲平均能量至少為 −45 dBFS，原始麥克風 Peak 至少為 −50 dBFS。未同時通過的片段不算合格人聲。</li>
      <li><strong>不能只靠一句或一個峰值：</strong>伴奏要先播放至少 10 秒；最近 12 秒內要有至少 6 秒合格人聲，而且至少包含兩段各 1.2 秒以上、彼此相隔至少 300 ms 的人聲段落。</li>
      <li><strong>失衡也必須持續：</strong>當 BGM／伴奏只比人聲低 2 dB 以內、與人聲一樣大聲，或比人聲更大聲時，這種情況還要在最新的合格人聲片段中累積至少 6 秒，才會顯示提示。短暫換氣不計入秒數，但也不會切斷趨勢；下一個合格人聲片段若不再符合條件，才會重新累積。</li>
    </ul>
    <p>從頭沒有說話或唱歌時，證據不足，不會出現提示。連續 5 秒沒有合格人聲會視為間奏，清除最近 12 秒的比較資料與既有提示，下一段歌聲必須重新累積。提示出現後，則要等最新的合格人聲中「BGM／伴奏至少比人聲低 5 dB」累積 4 秒才會清除；顯示與清除採用不同門檻，可避免文字在臨界值附近閃爍。</p>
    <p>切換歌曲、暫停或停止播放、播放位置向後跳超過 750 ms 或向前跳超過 2 秒、切換 Profile 或等待 Profile 過渡、路由重新啟動／停滯／中斷、麥克風中斷或等待復原、伴奏訊號不高於 −65 dBFS，以及關閉 Meter，都會清除判斷。若畫面連續 5 次更新都讀不到有效量測資料，也會清除舊提示，不會把過期結果一直留在畫面上。</p>
    <p>「人聲可能偏小」只會附加在伴奏／人聲失衡提示之下，而且最近合格人聲的平均能量必須不高於 −26 dBFS。若最近觀察資料中原始或處理後人聲 Peak 已達 −6 dBFS，或人聲 Profile 內的 Limiter 增益衰減超過 1 dB，系統不會再建議提高人聲，以免造成削波；此時仍可保留較安全的「降低伴奏」建議。</p>
  </div>
</details>
</div>

主視窗右下角的 CPU／RAM 文字不使用外框。滑鼠停留後可看到系統與歌回救星的 CPU、系統記憶體、程式 Working Set 與 Private Memory；進階直播模式才會再顯示 Buffer、callback、估計延遲與 underrun／overrun。警示會綜合系統壓力與音訊異常，不會只因工作管理員中正常的記憶體用量就亮起。

{% include localized-release-screenshot.html name="system-resource-status.png" alt="主視窗右下角收合狀態的 CPU 與 RAM 摘要" caption="此圖只顯示未停留游標時的精簡 CPU／RAM 摘要；將游標停在文字上，才會展開前述系統／程式資源與進階音訊健康資料。" size="medium" %}

## 系統工具、快捷鍵與完整關閉

設定中的 **按下關閉軟體時縮到系統工具** 預設開啟。按主視窗叉叉後，程式可繼續播放、處理麥克風與輸出音訊；系統工具右鍵選單可操作播放／暫停、停止、從頭播放、Key、速度、Profile、麥克風、歌詞視窗與 Meter。

{% include localized-release-screenshot.html name="notification-area-menu.png" alt="歌回救星未播放時的 Windows 系統工具右鍵選單" caption="此實圖是未播放時的精簡選單；播放伴奏或啟用進階直播模式後，才會依狀態增加前述播放、Key、速度、Profile、麥克風與 Meter 動作。底部「結束」會完全關閉主程式與 helper。" size="medium" %}

全域快捷鍵在歌回救星不是目前作用中視窗時也能使用。音訊路由不是進階直播模式時，會隱藏不適用的「麥克風／監聽」與效果器 Switch 項目。要完全結束主程式與 helper，請選系統工具選單中的 **關閉軟體**，或在設定中關閉縮到系統工具選項。

## 直播前最後檢查

1. 播放伴奏，確認歌回救星的 BGM／伴奏 Meter 有動作。
2. 說話或試唱，確認人聲（Profile 後、Mix 前）Meter 有動作。
3. 確認直播輸出沒有持續撞到 CLIP，Limiter 也沒有長時間重度衰減。
4. 到 OBS 確認同名來源有電平，而且沒有第二條重複麥克風。
5. 錄製至少一段包含說話、唱歌、安靜段落與切換 Profile 的測試影片。
6. 戴耳機確認監聽延遲與人聲／伴奏平衡可接受。

下一步請前往 [人聲 Profiles]({{ '/profiles.html' | relative_url }})，設定聊天、歌唱與每首歌曲要自動套用的效果器訊號鏈。
