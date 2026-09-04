---
title: 人聲 Profiles 與效果器完整教學｜2.1.0.0
description: 使用歌回救星 2.1.0.0 為每首歌曲指定麥克風效果器訊號鏈，並編輯內建效果器、Shimmer 與 VST3
lang: zh-TW
translation_key: profiles
---

# 人聲 Profiles

Profile 是一組可以重複使用的「麥克風效果器訊號鏈」。你可以先建立古風、搖滾、KTV、空靈等不同風格，再替每一首歌曲指定要使用哪一組；播放伴奏時，歌回救星就會自動切換麥克風效果，不必一邊直播一邊逐顆調整效果器。

<aside class="version-preview" role="note">
  <span class="version-preview__badge">2.1.0.0 新功能</span>
  <div><strong>本章與「音訊路由」需要搭配閱讀。</strong><p>Profile 決定人聲音色；音訊路由決定麥克風從哪裡進來、自己如何監聽，以及處理後的聲音如何送到 OBS。</p></div>
</aside>

<nav class="paired-guides" aria-label="2.1.0.0 音訊設定教學">
  <a class="paired-guide" href="{{ '/advanced-streaming.html' | relative_url }}"><span class="paired-guide__node">IN</span><span class="paired-guide__copy"><strong>進階直播設定</strong><small>麥克風、伴奏、監聽、OBS 與錄音</small></span><span class="paired-guide__arrow" aria-hidden="true">›</span></a>
  <a class="paired-guide" href="{{ '/profiles.html' | relative_url }}" aria-current="page"><span class="paired-guide__node">FX</span><span class="paired-guide__copy"><strong>人聲 Profiles</strong><small>效果器訊號鏈、歌曲標籤與自動切換</small></span><span class="paired-guide__arrow" aria-hidden="true">›</span></a>
</nav>

## 最重要的新功能：每首歌自動切換人聲效果

使用方式可以簡化成三個步驟：

1. 在 **人聲 Profiles** 建立或調整效果器訊號鏈。
2. 在歌曲列表替歌曲選擇一個 Profile 標籤。
3. 播放伴奏時，軟體自動套用該歌曲指定的效果；歌曲結束後回到聊天 Profile。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">01 · SONG AUTOMATION</p><h2>替歌曲指定一種人聲風格</h2><p>同一場歌回可以讓抒情歌使用空靈效果、搖滾歌曲使用較有力度的壓縮與飽和、KTV 歌曲使用熟悉的 Echo；設定一次後，之後播放同一首歌就會再次套用。</p></div>
</div>

> Profile 會在伴奏播放狀態改變時切換。正式直播前請逐首試唱，避免不同效果鏈之間的音量落差過大。

## 內建多種可直接使用的 Profiles

Factory Profile 是調音起點，不是每一支麥克風、房間和唱法的唯一答案。可以直接使用，也可以複製後再微調成自己的版本。

### Factory Profiles 的用途

| Profile | 適合的情境 |
| --- | --- |
| **直播聊天** | 以自然說話為主，加入噪音閥與基本動態整理，減少鍵盤、滑鼠和房間底噪。 |
| **唱歌 · 通用** | 不分男女聲的保守唱歌起點，先保持清楚與穩定，再依麥克風微調。 |
| **唱歌 · 低音域** | 為較低的人聲頻段提供不同 EQ、動態與 Air 感起點，不代表性別限制。 |
| **唱歌 · 高音域** | 為較高的人聲頻段保留清楚度並控制刺耳感，不代表性別限制。 |
| **唱歌 · 人聲加厚（Vocal Double）** | 以短時間差與輕微音高差增加寬度和厚度；主唱仍留在中央，避免 Mix 過高造成相位感或字頭模糊。 |
| **唱歌 · 古風** | 較長、較空靈的殘響，但保留字頭與歌詞清晰度。 |
| **唱歌 · 搖滾** | 較有力度的 Gate、壓縮與受控飽和，適合需要厚度與存在感的唱法。 |
| **唱歌 · KTV** | 使用 Delay／Echo 搭配 Reverb，建立熟悉的 KTV 演唱空間。 |
| **唱歌 · 夢幻空靈** | Air、Reverb 與較保守的 Shimmer 光暈；可在歌曲中用快捷鍵切換 Shimmer。 |
| **唱歌 · 浴室** | 短而明亮的早期反射，模擬磁磚空間感。 |
| **廣播音色** | 限縮頻段、壓縮與些微飽和的廣播／電話風格。 |
| **超級爆音** | 故意製造過載麥克風的搞笑效果，同時控制不必要的背景噪音與音量峰值。 |

## 編輯一條效果器訊號鏈

Profile 頁面中的每個 Block 就是一顆內建效果器或 VST3。訊號會由上到下依序處理。

{% include profile-signal-chain.html %}

各效果器的用途、建議與參數可直接[跳到後面的詳細說明](#內建效果器與參數)。

1. 選擇要編輯的 Profile；Factory Profile 建議先複製，再修改副本。
2. 按 **＋** 新增內建效果器或 VST3。
3. 拖曳 Block 改變處理順序。
4. 使用 Block 右上角的 Switch 暫時 Bypass；設定不會被刪除。
5. 點選 Block 開啟參數視窗，邊試聽邊調整。
6. 儲存後，參數、Block 順序、Bypass 與 VST3 state 都會跟著 Profile 保存。

開啟監聽後，這個頁面會讓你聽到「目前正在編輯的 Profile」預覽效果；伴奏可以繼續播放，因此能直接比較人聲與歌曲的搭配。如果只想單獨聽 Profile 預覽，按右上角的 **S（Solo）**。離開 Solo、切回直播操作或關閉編輯器後，會恢復原本的監聽內容。

同一條鏈可以放入多顆相同類型的效果器，每顆 Block 都有自己的識別與參數。最多可放入八個 VST3 插槽；如果另一台電腦沒有安裝同一個 VST3，Profile 仍可開啟，但該 Plugin 無法產生原本的效果。

<div class="feature-shot-grid">
{% include localized-release-screenshot.html name="profile-horizontal-rack.png" alt="人聲 Profile 編輯頁的橫向效果器 Rack 與右上角 S Solo 按鈕" caption="橫向 Rack 依實際處理順序排列 Block；右上角 S（Solo）可只保留目前 Profile 的預覽，適合單獨確認人聲效果。" %}
{% include localized-release-screenshot.html name="profile-vertical-rack.png" alt="人聲 Profile 編輯頁的直向效果器 Rack" caption="直向 Rack 使用相同的 Block、Bypass、拖曳順序與編輯器；切換方向不會改變訊號處理。" %}
</div>

## 內建效果器與參數

所有內建效果器都提供起始設定、簡易／進階切換、Bypass、說明按鈕與即時訊號圖。訊號圖只協助觀察處理結果，不會因麥克風音量自然變化而自行改動參數。

{% include one-knob-guide.html %}

{% include effect-editor-gallery.html %}

點開下列項目可查看用途與常用參數。

<div class="effect-reference">
  <details><summary><strong>輸入增益 Input Gain</strong><span>先把進入整條 Profile 的音量調到合理範圍</span></summary><div class="effect-reference__body"><p>Input Gain 位於效果鏈入口，用來校準軟體內部的工作電平，不是音訊介面 Gain 的替代品。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>音訊介面已調好時先維持接近 0 dB，唱最小聲與最大聲段落後再微調，並保留後續壓縮與 EQ 的 Headroom。</p><p><strong>注意事項</strong>它無法修復進入軟體前已削波的訊號；提高過多會讓後續效果器提早過載，也可能讓 Noise Gate 判斷改變。</p></div><ul class="parameter-list"><li><strong>輸入增益：</strong>在所有 Profile 效果器之前增加或降低音量。</li></ul></div></details>
  <details><summary><strong>背景噪音衰減</strong><span>在沒有唱歌的空隙降低持續底噪</span></summary><div class="effect-reference__body"><p>以平滑增益衰減降低安靜處的風扇、空調與房間底噪；它比完全關閉麥克風更自然。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>先讓最弱的氣聲與句尾仍能自然通過，再逐步增加最大衰減；通常放在 Gate 前面作溫和清理。</p><p><strong>注意事項</strong>無法分離與歌聲同時出現的噪音。閾值太高或關閉太快會產生呼吸感抽動，並吃掉弱音。</p></div><ul class="parameter-list"><li><strong>最大衰減：</strong>安靜時最多降低多少音量。</li><li><strong>衰減閾值：</strong>低於此音量後才開始判斷為背景。</li><li><strong>開啟速度：</strong>人聲出現時恢復正常音量的速度。</li><li><strong>關閉速度：</strong>人聲停止後進入衰減的平滑速度。</li></ul></div></details>
  <details><summary><strong>噪音閥 Noise Gate</strong><span>句子之間關閉麥克風，減少鍵盤與滑鼠聲</span></summary><div class="effect-reference__body"><p>Gate 依偵測器音量在開啟與關閉狀態間平滑切換；開啟與關閉使用不同閾值，避免卡在邊界反覆跳動。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>先量測房間底噪，再以最輕的氣聲、字頭與長句句尾試唱。適度增加 Hold 與 Release，通常比直接把閾值拉高更自然。</p><p><strong>注意事項</strong>Gate 不能去除唱歌同時發生的鍵盤聲。設定太緊會切掉子音、換氣與尾音；偵測器 HPF 只影響判斷，不會濾掉實際輸出。</p></div><ul class="parameter-list"><li><strong>關閉閾值：</strong>低於此音量且持續時間結束後，開始關閉。</li><li><strong>開啟閾值：</strong>人聲超過此音量時打開。</li><li><strong>啟動：</strong>打開時恢復人聲的速度。</li><li><strong>持續時間：</strong>音量降低後仍維持開啟多久，避免字尾被切掉。</li><li><strong>釋放：</strong>持續時間結束後關閉的平滑速度。</li><li><strong>關閉衰減：</strong>關閉時最多降低多少；72 dB 接近靜音。</li><li><strong>偵測器 HPF：</strong>讓 Gate 判斷忽略低頻震動，不影響實際人聲頻率。</li></ul></div></details>
  <details><summary><strong>壓縮器 Compressor</strong><span>縮小輕聲與大聲的差距，讓人聲較穩定</span></summary><div class="effect-reference__body"><p>Compressor 只在音量高於 Threshold 時依 Ratio 壓低增幅，再由 Makeup 補回需要的整體電平。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>讓一般歌唱峰值出現溫和且會回復的增益衰減，先保留字頭，再以 Makeup 做 Bypass 前後的等響比較。</p><p><strong>注意事項</strong>Attack 太快會讓咬字失去衝擊，Release 太短會抽動；Makeup 過多只會把底噪一起放大。不要把持續重壓當成音量正常化。</p></div><ul class="parameter-list"><li><strong>臨界值：</strong>從哪個音量開始壓縮。</li><li><strong>比率：</strong>超過臨界值後壓縮多強。</li><li><strong>啟動：</strong>遇到大聲時開始壓縮的速度。</li><li><strong>釋放：</strong>音量降低後回復的速度。</li><li><strong>補償：</strong>補回壓縮後降低的整體音量。</li><li><strong>轉折寬度：</strong>臨界值附近從柔和到明確壓縮的過渡。</li></ul></div></details>
  <details><summary><strong>等化器 Equalizer（EQ）</strong><span>去除不需要的頻率並塑造人聲音色</span></summary><div class="effect-reference__body"><p>六個頻段可在圖上拖曳，也能輸入精確數值；Low Cut、Shelf、Bell 與 High Cut 各自處理不同形狀的頻率範圍。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>先切除不需要的極低頻，再用寬而小的調整減少混濁、增加一點存在感，讓人聲在伴奏中突出而不是單純加大音量。</p><p><strong>注意事項</strong>高 Q、大幅 Boost 容易放大刺耳共鳴與回授；固定的男女聲頻率表不能取代依歌手、麥克風與房間實際試聽。</p></div><ul class="parameter-list"><li><strong>濾波器類型：</strong>Low Cut、Shelf、Bell、High Cut 等用途不同。</li><li><strong>頻率：</strong>決定調整的中心或轉折位置。</li><li><strong>增益：</strong>提升或降低該頻段。</li><li><strong>Q／寬度：</strong>決定影響範圍；Q 越高通常越窄。</li><li><strong>頻段 Bypass：</strong>暫時略過單一頻段，方便比較。</li></ul></div></details>
  <details><summary><strong>飽和 Saturation</strong><span>增加泛音、厚度或刻意的粗糙感</span></summary><div class="effect-reference__body"><p>Saturation 以非線性曲線產生額外泛音；Warm Vocal、Rock Edge 與 Metal Bite 提供由溫和密度到明顯粗糙感的不同起點。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>一般演唱先低 Drive、低 Mix，利用新增泛音增加穿透力；金屬嘶吼等特殊唱法再逐步提高，並以 Output Trim 做等響比較。</p><p><strong>注意事項</strong>音量變大常被誤認為音色變好。Drive 與 Color 過多會放大齒音、底噪並模糊字頭，務必保留 Final Limiter 前的 Headroom。</p></div><ul class="parameter-list"><li><strong>類型：</strong>選擇 Warm Vocal、Rock Edge 或 Metal Bite 曲線。</li><li><strong>驅動：</strong>推入飽和曲線的強度。</li><li><strong>色彩：</strong>強化所選演算法的個性。</li><li><strong>效果混合：</strong>飽和聲與原聲的比例。</li><li><strong>輸出微調：</strong>對齊旁路前後音量並保留 Headroom。</li></ul></div></details>
  <details><summary><strong>Air 感增強</strong><span>增加清晰度、呼吸感與高頻光澤</span></summary><div class="effect-reference__body"><p>Air Enhancer 的 Mid Air 主要增加存在感與清楚度，High Air 則增加呼吸感與較高頻的光澤。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>先用少量 Mid Air 讓歌詞穿過伴奏，再非常保守地加入 High Air；搭配 De-esser 通常比單獨大量提升高頻自然。</p><p><strong>注意事項</strong>麥克風本身偏亮、房間噪音多或齒音明顯時，Air 會同時放大問題。用 Trim 對齊音量後再判斷是否真的更清楚。</p></div><ul class="parameter-list"><li><strong>中頻 Air：</strong>增加存在感與清晰度。</li><li><strong>高頻 Air：</strong>增加呼吸感與光澤。</li><li><strong>輸出微調：</strong>對齊 Bypass 音量並避免削波。</li></ul></div></details>
  <details><summary><strong>齒音抑制器 De-esser</strong><span>壓低刺耳的 S、SH 等高頻子音</span></summary><div class="effect-reference__body"><p>De-esser 只在所選高頻範圍變得突出時短暫衰減，用來控制刺耳齒音而不是把整條人聲變暗。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>用最容易出現齒音的歌詞試唱，調到刺耳感下降但子音仍清楚；通常放在 Air 或高頻 EQ 之後較容易抓到新增的齒音。</p><p><strong>注意事項</strong>Threshold 太低或最大衰減太大會造成含糊、口齒不清；不同歌手與麥克風的齒音中心不同，不要只照固定頻率。</p></div><ul class="parameter-list"><li><strong>齒音頻率：</strong>選擇要偵測的高頻範圍。</li><li><strong>臨界值：</strong>越低越容易觸發。</li><li><strong>最大衰減：</strong>限制最多壓低多少。</li><li><strong>啟動／釋放：</strong>控制抓住齒音與恢復的速度。</li></ul></div></details>
  <details><summary><strong>變聲器 Voice Changer</strong><span>調整音高與共振峰，製作角色或特殊段落</span></summary><div class="effect-reference__body"><p>Voice Changer 分開控制 Pitch 與 Formant，可改變音高，同時調整聲道大小感來減少單純移調的卡通感。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>先用小幅半音與 Formant 調整製作角色段落，或用 Mix 混回原聲；選擇接近演唱者的人聲範圍可幫助分析穩定。</p><p><strong>注意事項</strong>大幅移調會增加人工感與處理痕跡，也可能增加 Profile latency。它是創意效果，不是匿名或身分保護工具。</p></div><ul class="parameter-list"><li><strong>音高：</strong>以半音升高或降低演唱音高。</li><li><strong>共振峰：</strong>正值較小較亮，負值較大較深。</li><li><strong>效果混合：</strong>變聲與原聲比例。</li><li><strong>人聲範圍：</strong>協助分析接近演唱者音域，不是輸出音高。</li></ul></div></details>
  <details><summary><strong>和聲器 Harmony（實驗性）</strong><span>依歌曲調性產生額外和聲聲部</span></summary><div class="effect-reference__body"><p>Harmony 依目前歌曲的 Key／調式與主唱音高，產生自然音階三度或八度聲部；追蹤信心不足時會淡出，避免硬套錯音。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>先確認歌曲 Key，再以低 Mix 點綴副歌或長音；用 Tone 讓和聲比主唱稍暗，並利用 Width 與 Humanize 把它放在主唱後方。</p><p><strong>注意事項</strong>歌曲 Key 錯誤、滑音、吼腔或不穩定音高都可能讓判斷失準。這是實驗性效果，不建議讓合成和聲蓋過主唱。</p></div><ul class="parameter-list"><li><strong>效果混合：</strong>和聲與原本人聲的比例。</li><li><strong>和聲方向：</strong>自然音階的上／下三度或高／低八度。</li><li><strong>立體寬度：</strong>控制聲部左右展開。</li><li><strong>人性化：</strong>加入細微時間變化，避免僵硬貼合。</li><li><strong>音色：</strong>控制和聲的明暗。</li><li><strong>追蹤：</strong>設定音高穩定度與歌曲 Key 信心門檻。</li></ul></div></details>
  <details><summary><strong>疊聲器 Doubler</strong><span>以短時間差與輕微音高差建立雙軌演唱厚度</span></summary><div class="effect-reference__body"><p>Doubler 建立兩層略為錯時、偏移音高的人聲，模擬同一句重唱而不是可辨識的節奏回聲。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>主歌可用較低 Mix，副歌再以 Switch 加寬；短 Delay、微量 Detune 與中等 Width 通常最自然，Tone 可讓疊聲退到主唱後方。</p><p><strong>注意事項</strong>延遲與 Mix 過高會模糊子音或像兩次演唱；過寬在單聲道下可能變薄，正式直播前要同時檢查立體聲與 Mono。</p></div><ul class="parameter-list"><li><strong>效果混合：</strong>疊聲與原本人聲的比例。</li><li><strong>時間差：</strong>疊聲相對主唱的短延遲。</li><li><strong>音高差：</strong>以 cents 微調疊聲音高。</li><li><strong>立體寬度：</strong>控制兩側疊聲展開。</li><li><strong>人性化：</strong>加入自然細微變化。</li><li><strong>音色：</strong>控制疊聲高頻明暗。</li></ul></div></details>
  <details><summary><strong>Delay</strong><span>加入可清楚辨識的回聲，不延後直接人聲</span></summary><div class="effect-reference__body"><p>Delay 保留直接人聲，再依 Time 產生重複；短時間是 Slap，較長時間可製作 KTV 或節奏型回聲。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>先配合歌曲速度選擇回聲間隔，再用 Low／High Cut 讓回聲比主唱更薄、更暗；保守 Wet 與 Feedback 可保留歌詞清晰度。</p><p><strong>注意事項</strong>Feedback 過高可能長時間堆疊甚至接近失控，Wet 過高會遮住下一句。不同歌曲速度下，同一毫秒值不一定仍落在拍點上。</p></div><ul class="parameter-list"><li><strong>濕聲比例：</strong>回聲與直接人聲的比例。</li><li><strong>延遲時間：</strong>每次回聲的間隔。</li><li><strong>回授：</strong>回聲餵回下一次重複的強度。</li><li><strong>立體寬度：</strong>稍微錯開左右回聲時間。</li><li><strong>低切／高切：</strong>清理回聲低頻並讓重複變暗。</li></ul></div></details>
  <details><summary><strong>Reverb</strong><span>在人聲周圍建立房間、Plate 或長空間感</span></summary><div class="effect-reference__body"><p>Reverb 以密集反射建立空間深度；Pre-delay 將直接人聲與尾韻分開，Decay、Size 與 Damping 決定空間個性。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>先用 Pre-delay 保留字頭，再調 Decay 與 Wet。聊天 Profile 使用短、少的空間；古風或空靈可更長，但主唱仍應位於前方。</p><p><strong>注意事項</strong>房間本身已很響時再加長 Reverb 會降低清晰度。Wet 與 Decay 過高會讓尾音遮住下一句，也會放大 Gate 開關的突兀感。</p></div><ul class="parameter-list"><li><strong>濕聲比例：</strong>殘響與直接人聲的比例。</li><li><strong>前置延遲：</strong>直接人聲後多久出現殘響。</li><li><strong>空間大小：</strong>空間的尺寸與密度感。</li><li><strong>衰減時間：</strong>殘響尾音維持多久。</li><li><strong>阻尼：</strong>控制尾音明亮或偏暗。</li></ul></div></details>
  <details><summary><strong>Shimmer</strong><span>在殘響尾音加入高八度光暈，適合空靈段落</span></summary><div class="effect-reference__body"><p>Shimmer 把殘響尾音移高一個八度並回授成光暈；Ducking 可在人聲出現時壓低效果，句子空隙再浮現。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>以低 Wet、受控 Feedback 與較暗 Tone 開始，配合 Ducking 保留歌詞；可把 Profile 預設狀態設好，再用全域 Switch 切換副歌。</p><p><strong>注意事項</strong>高頻尾音非常容易搶耳與累積。Bypass、Profile 預設開關與歌曲中的暫時 Switch 是三種不同狀態，不要用錯方式保存。</p></div><ul class="parameter-list"><li><strong>濕聲比例：</strong>高八度尾音與直接人聲的比例。</li><li><strong>前置延遲：</strong>光暈出現前等待多久。</li><li><strong>衰減時間：</strong>尾音維持多久。</li><li><strong>回授：</strong>尾音重新進入八度產生器的強度。</li><li><strong>音色：</strong>控制尾音高頻明暗。</li><li><strong>Ducking：</strong>唱歌時壓低 Shimmer，空隙再浮現。</li></ul></div></details>
  <details><summary><strong>限制器 Limiter</strong><span>在 Profile 尾端攔截突發人聲峰值</span></summary><div class="effect-reference__body"><p>Profile Limiter 與 Output Final Limiter 都是<strong>立體聲連動、具 Lookahead 的 Sample-Peak Limiter</strong>，不是 True-Peak Limiter。Lookahead 是提早看見即將到來的取樣點峰值；它不會估算兩個取樣點之間的 inter-sample peak，因此不等於 True Peak。</p><div class="effect-reference__guidance"><p><strong>直播歌唱建議</strong>把 Profile Limiter 當作偶發峰值保護，不要讓它整首歌持續重壓；正式 Mix 仍由獨立 Final Limiter 保護。Final Limiter 預設 ceiling 為 −1.0 dBFS，提供編碼前餘裕。</p><p><strong>注意事項</strong>−1.0 dBFS 的 Sample-Peak ceiling 不保證 AAC 編碼、取樣率轉換或重建後仍低於 −1.0 dBTP。需要 True-Peak 規格時，仍須在後段使用具過取樣／重建峰值估測的工具驗證。</p></div><ul class="parameter-list"><li><strong>前級增益：</strong>讓人聲推入 Limiter 的程度。</li><li><strong>上限：</strong>限制實際 PCM 取樣點的最大 Sample Peak。</li><li><strong>釋放：</strong>峰值後恢復的平滑速度。</li><li><strong>前瞻：</strong>預讀取樣點峰值；會增加 Profile 顯示延遲，但不會把它變成 True Peak。</li></ul></div></details>
</div>

## Shimmer、疊聲器與和聲器的 Bypass、預設狀態與 Switch

- **Bypass 關閉 Block**：整顆效果器不參與處理，參數仍保留。這是編輯訊號鏈時的效果器旁路。
- **預設開啟／預設關閉**：決定每次重新套用這個 Profile 或開始下一首歌時，Shimmer、疊聲器或和聲器的起始狀態。
- **Profile 效果器 Switch**：全域快捷鍵與系統工具選單共用同一個 Switch，只改變目前歌曲的暫時狀態，不會覆寫 Profile 的預設值。只有目前 Profile 中存在可用的 Shimmer、疊聲器或和聲器 Block，而且音訊路由為進階直播模式時才生效。

例如「唱歌 · 夢幻空靈」可讓 Shimmer 預設開啟，演唱途中暫時關閉；下一首歌重新套用同一個 Profile 時，仍會依 Profile 保存的預設狀態開始。疊聲器與和聲器也使用相同規則。

## 歌曲 Key、Pitch 提示與和聲器分析

歌曲 Key 可在背景分析，不會阻塞播放操作。將游標移到播放器的 **Pitch** 按鈕，可查看偵測到的原調、信心程度，以及升降 Key 後的調性；如果結果不正確，也可以手動修正。當歌曲指定的 Profile 含有和聲器時，軟體會為該歌曲自動安排一次 Key 分析，避免和聲器在完全未知調性的狀態下直接工作。分析結果仍只是輔助；遇到轉調、非標準調律或信心偏低時，請以實際聽感手動確認。

## VST3

Profile 可混合內建效果器與 VST3，並保存 Plugin 的 state、Block 順序與 Bypass。使用時請注意：

- VST3 的編輯器由 Plugin 廠商提供，外觀與鍵盤操作可能和內建效果器不同。
- Plugin 回報的 latency 會納入 Profile 延遲資訊；高延遲 Plugin 可能不適合即時演唱監聽。
- 儲存的是參數 state，不會把第三方 VST3 本體打包進專案。
- 拖曳改變順序會改變實際聲音；例如 Reverb 放在飽和前後會有明顯差異。
- 關閉 VST3 編輯視窗只關閉參數介面，不會自動從 Profile 刪除該 Block。

## 直播中手動切換、麥克風靜音與歌曲自動化

{% include localized-release-screenshot.html name="full-workspace.png" alt="2.1 進階直播模式完整工作區" caption="完整工作區會同時顯示歌曲庫、BGM／伴奏，以及進階模式的監聽、錄音、麥克風與 Profile 控制。" %}

- **自動切換 Profile**：伴奏開始時使用歌曲標籤；沒有固定標籤時使用預設唱歌 Profile，伴奏結束後回到聊天 Profile。
- **手動選擇 Profile**：立即改用指定訊號鏈，直到選回自動切換。
- **麥克風靜音**：只停止麥克風進入直播混音，不會停止 BGM／伴奏播放。
- **系統工具與快捷鍵**：主視窗縮小後仍可切換 Profile、靜音／恢復麥克風與操作支援的效果器 Switch。

## 儲存與測試

Profile 的 Block、順序、Bypass、內建參數、Shimmer／疊聲器／和聲器的預設狀態與 VST3 state 會隨 Profile／專案保存。正式直播前建議：

1. 先用說話測試 Gate，不要切掉輕聲與句尾。
2. 再唱最小聲和最大聲段落，確認 Compressor／Limiter 不會持續重壓。
3. 比較 Bypass 前後的音量，避免只因變大聲而誤以為音色更好。
4. 播放設定過標籤的歌曲，確認開始與停止伴奏時切換正確。
5. 錄製包含聊天、唱歌、Profile 效果器 Switch 與 Profile 切換的短片，在 OBS 回放中確認沒有爆音或不自然跳變。

如果尚未設定麥克風、監聽或 OBS 輸出，請回到 [進階直播模式的最短設定流程]({{ '/advanced-streaming.html' | relative_url }})。
