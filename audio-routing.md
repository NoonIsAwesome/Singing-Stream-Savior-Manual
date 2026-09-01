---
title: 音訊路由完整教學｜2.1.0.0 測試功能
description: 設定歌回救星 2.1.0.0 的麥克風、伴奏、監聽、錄音、OBS 外掛、虛擬音源、音量 Meter 與音訊健康資訊
lang: zh-TW
translation_key: audio-routing
---

# 音訊路由

音訊路由決定「聲音從哪裡進來、經過哪些處理，以及最後送到哪裡」。如果只使用歌回救星播放 BGM 和伴奏，可以維持一般播放模式；如果希望歌曲開始時自動套用麥克風效果，並把處理後的人聲與伴奏一起送到 OBS，請使用進階直播模式。

<aside class="version-preview" role="note">
  <span class="version-preview__badge">2.1.0.0 測試功能</span>
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
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}" alt="音訊路由分頁中的一般播放與進階直播模式選單" loading="lazy" decoding="async"></a><figcaption><strong>一般播放：</strong>只播放 BGM 與伴奏。<strong>進階直播：</strong>加入麥克風、人聲 Profile、完整混音、監聽與直播輸出。</figcaption></figure>
</div>

選擇進階直播模式後，建議依序設定：

1. 麥克風輸入與音訊驅動。
2. Stream Output 要送往 OBS 外掛或哪一個虛擬音源。
3. Monitor Output 要送往哪一副耳機或音訊介面。
4. 到「人聲 Profiles」頁確認聊天與唱歌效果。
5. 播放測試伴奏，在 Meter 與 OBS 中確認訊號。

## 音訊驅動與 Buffer

<div class="feature-shot-grid">
  <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}" alt="ASIO 與 Windows Audio 音訊驅動選項" loading="lazy" decoding="async"></a><figcaption><strong>ASIO：</strong>通常適合低延遲唱歌，優先使用音訊介面原廠驅動。<strong>Windows Audio：</strong>相容一般 Windows 裝置，設定較容易。</figcaption></figure>
  <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}" alt="Windows Audio 的自動、WASAPI、DirectSound 與 MME 播放方式" loading="lazy" decoding="async"></a><figcaption>Windows Audio 建議先使用「自動」。只有遇到裝置無聲或相容問題時，才改測 WASAPI、DirectSound 或 MME。</figcaption></figure>
</div>

- Buffer 越小，監聽延遲通常越低，但電腦或驅動來不及處理時可能出現爆音。
- Buffer 越大，穩定餘裕通常越高，但自己聽到麥克風的時間會更晚。
- 不要只追求最小數字。請以實際唱歌時沒有爆音、沒有中斷，而且延遲可以接受為準。

### 使用 Buffer 健檢

**程式安全 Buffer** 選單與 **檢查 Buffer 穩定性…** 按鈕會固定顯示在同一列。使用 ASIO 輸入時，這一列位於 ASIO 取樣率／硬體 Buffer 區塊下方；即使 **Windows 播放相容性**的進階設定保持收合，也能直接調整或開啟健檢。

- **快速健檢**：測試 512／1024 frames，約需 25 秒，適合先確認安全值的基本狀況。
- **完整健檢**：測試 128／256／512／1024 frames，約需 5 分鐘。只有完整健檢會對 128／256 等低值做嚴格驗證；通過後才可能列為可套用的建議。
- 每一列會整理測試狀況與預估延遲；完成後可直接套用建議值。低值通過代表它已在**目前這組裝置、Profile、效果器與路由**完成驗證，不代表以後不可能因負載或裝置變更而斷訊。

這項健檢診斷的是歌回救星內部的 **App Buffer**，不會更改錄音介面的 **ASIO hardware buffer**。例如音訊介面維持 128 frames 時，健檢仍可另外測試 App Buffer；兩者是不同層級。測試會暫時切換 App 路由，因此錄音或 OBS 串流正在進行時不會啟動。

### 黃色穩定度訊息代表什麼

- **檢查音訊中斷**：偵測到麥克風／監聽 under/overrun、正式 Stream 路徑斷續，或裝置正在中斷／復原時立即顯示；恢復後仍會短暫保留，方便看見剛發生的事件。
- **檢查音訊時序**：callback、裝置回報、時鐘或延遲帳務等異常持續約 2 秒後才顯示，和已確認的音訊中斷是不同狀態。

一次瞬時 callback peak 或短暫時鐘修正，不等於觀眾已聽到斷訊，也不會直接被寫成「檢查音訊中斷」。將游標停在穩定度文字上，可以查看麥克風／監聽計數、Stream 斷續與通知、裝置復原、callback peak／period、時序旗標及 Dry Cue 監聽計數，據此判斷黃色提示的來源。

<figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}" alt="一般播放模式的 BGM 到系統輸出路由圖與電平表" loading="lazy" decoding="async"></a><figcaption>路由圖會顯示目前訊號是否正在流動，並列出取樣率、Buffer、預估延遲與裝置狀態。看到電平不代表 OBS 一定已設定完成，仍要到 OBS 再確認一次。</figcaption></figure>

## 進階直播模式的混音畫面

<figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}" alt="包含 BGM、麥克風、人聲 Profile、直播混音、虛擬輸出、監聽與錄音的完整音訊路由圖" loading="lazy" decoding="async"></a><figcaption>畫面由左到右顯示來源、Profile、直播混音、Stream Output、監聽與錄音。訊號線與 Meter 可協助判斷聲音停在哪一段。</figcaption></figure>

### 直播輸出的三個主要控制

- **Mix Bus Compressor**：輕微整理伴奏與人聲合在一起時的動態。可 Bypass；一般只需要讓正常峰值出現約 1–3 dB 的增益衰減。
- **Final Limiter**：攔截 Stream Output 的短暫峰值，避免最後輸出超過設定上限。可 Bypass，但正式直播建議保留安全限制。
- **Master**：調整整條 Stream Output 的最終音量，不會改寫個別 Profile 的音色。

這些是整體直播輸出處理，不屬於任何一個人聲 Profile。切換歌曲 Profile 時，它們不會一起被替換。

## 將聲音送進 OBS

歌回救星提供兩種方式。兩者傳送的是同一條 Stream Output，不需要同時使用。

### 方法一：Singing Stream Savior OBS 音訊外掛

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
  <figure class="manual-figure manual-figure--small"><a href="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}" alt="BGM、完整混音、濕聲乾聲與處理後麥克風的監聽來源選單" loading="lazy" decoding="async"></a><figcaption>主畫面上方可選擇監聽來源；耳機按鈕則負責暫時開啟或關閉監聽。</figcaption></figure>
</div>

- **BGM／伴奏**：只聽播放內容，不聽軟體麥克風監聽。
- **完整混音**：接近 Stream Output 的整體結果，適合檢查觀眾會聽到的平衡。
- **BGM／伴奏 + Dry**：加入未經 Profile 的麥克風。Dry Cue 使用獨立的軟體乾聲監聽擷取，目的是盡量降低耳機中的乾聲延遲；它不會改變送往正式 Mix、OBS 或錄音的訊號路徑。它仍會經過擷取與監聽輸出 Buffer，因此不是音訊介面的零延遲 Direct Monitor。
- **BGM／伴奏 + Wet**：加入經過 Profile／VST3 的人聲，可聽見效果，但處理與 Buffer 會增加監聽延遲。
- **只聽處理後麥克風**：方便調整效果器，正式演唱時通常仍會搭配伴奏。

需要最低延遲時，優先使用音訊介面的 **Hardware Direct Monitor**。它繞過軟體監聽路徑，通常是唱歌時延遲最低的選擇，但無法包含歌回救星內的 Profile 效果。Dry Cue 即使發生監聽專用的 underrun／讀取落後，也不能單憑這項計數判定正式 Mix、OBS 或錄音已掉訊。開啟任何麥克風監聽時請使用耳機，避免喇叭聲再次被麥克風收到而回授。

## 錄音

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}" alt="完整輸出、監聽內容、WAV 格式與錄音資料夾選項" loading="lazy" decoding="async"></a><figcaption>錄音主按鈕可立即開始／停止；旁邊選單決定要錄完整輸出或目前監聽內容，並可選擇格式與資料夾。</figcaption></figure>

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

## 系統工具、快捷鍵與完整關閉

設定中的 **按下關閉軟體時縮到系統工具** 預設開啟。按主視窗叉叉後，程式可繼續播放、處理麥克風與輸出音訊；系統工具右鍵選單可操作播放／暫停、停止、從頭播放、Key、速度、Profile、麥克風、歌詞視窗與 Meter。

全域快捷鍵在歌回救星不是目前作用中視窗時也能使用。音訊路由不是進階直播模式時，會隱藏不適用的「麥克風／監聽」與效果器 Switch 項目。要完全結束主程式與 helper，請選系統工具選單中的 **關閉軟體**，或在設定中關閉縮到系統工具選項。

## 直播前最後檢查

1. 播放伴奏，確認歌回救星的 BGM／伴奏 Meter 有動作。
2. 說話或試唱，確認人聲（Profile 後、Mix 前）Meter 有動作。
3. 確認直播輸出沒有持續撞到 CLIP，Limiter 也沒有長時間重度衰減。
4. 到 OBS 確認同名來源有電平，而且沒有第二條重複麥克風。
5. 錄製至少一段包含說話、唱歌、安靜段落與切換 Profile 的測試影片。
6. 戴耳機確認監聽延遲與人聲／伴奏平衡可接受。

下一步請前往 [人聲 Profiles]({{ '/profiles.html' | relative_url }})，設定聊天、歌唱與每首歌曲要自動套用的效果器訊號鏈。
