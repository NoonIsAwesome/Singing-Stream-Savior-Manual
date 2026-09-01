---
title: 人聲 Profiles 與效果器完整教學｜2.1.0.0 測試功能
description: 使用歌回救星 2.1.0.0 為每首歌曲指定麥克風效果器訊號鏈，並編輯內建效果器、Shimmer 與 VST3
lang: zh-TW
translation_key: profiles
---

# 人聲 Profiles

Profile 是一組可以重複使用的「麥克風效果器訊號鏈」。你可以先建立古風、搖滾、KTV、空靈等不同風格，再替每一首歌曲指定要使用哪一組；播放伴奏時，歌回救星就會自動切換麥克風效果，不必一邊直播一邊逐顆調整效果器。

<aside class="version-preview" role="note">
  <span class="version-preview__badge">2.1.0.0 測試功能</span>
  <div><strong>本章與「音訊路由」需要搭配閱讀。</strong><p>Profile 決定人聲音色；音訊路由決定麥克風從哪裡進來、自己如何監聽，以及處理後的聲音如何送到 OBS。</p></div>
</aside>

<nav class="paired-guides" aria-label="2.1.0.0 音訊設定教學">
  <a class="paired-guide" href="{{ '/audio-routing.html' | relative_url }}"><span class="paired-guide__node">IN</span><span class="paired-guide__copy"><strong>音訊路由</strong><small>麥克風、伴奏、監聽、OBS 與錄音</small></span><span class="paired-guide__arrow" aria-hidden="true">›</span></a>
  <a class="paired-guide" href="{{ '/profiles.html' | relative_url }}" aria-current="page"><span class="paired-guide__node">FX</span><span class="paired-guide__copy"><strong>人聲 Profiles</strong><small>效果器訊號鏈、歌曲標籤與自動切換</small></span><span class="paired-guide__arrow" aria-hidden="true">›</span></a>
</nav>

## 最重要的新功能：每首歌自動切換人聲效果

使用方式可以簡化成三個步驟：

1. 在 **人聲 Profiles** 建立或調整效果器訊號鏈。
2. 在歌曲列表替歌曲選擇一個 Profile 標籤。
3. 播放伴奏時，軟體自動套用該歌曲指定的效果；歌曲結束後回到聊天 Profile。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">01 · SONG AUTOMATION</p><h2>替歌曲指定一種人聲風格</h2><p>同一場歌回可以讓抒情歌使用空靈效果、搖滾歌曲使用較有力度的壓縮與飽和、KTV 歌曲使用熟悉的 Echo；設定一次後，之後播放同一首歌就會再次套用。</p></div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}" alt="歌曲列表中可選擇自動或特定人聲 Profile 的標籤選單" loading="lazy" decoding="async"></a><figcaption>選擇「自動 · 唱歌 Profile」會使用目前預設的唱歌 Profile；也可以固定指定古風、搖滾、KTV、空靈或自己的自訂 Profile。</figcaption></figure>
</div>

> Profile 會在伴奏播放狀態改變時切換。正式直播前請逐首試唱，避免不同效果鏈之間的音量落差過大。

## 內建多種可直接使用的 Profiles

Factory Profile 是調音起點，不是每一支麥克風、房間和唱法的唯一答案。可以直接使用，也可以複製後再微調成自己的版本。

<div class="feature-shot-grid">
  <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}" alt="唱歌 Profile 的清理、壓縮、EQ、空氣感與空間效果訊號鏈" loading="lazy" decoding="async"></a><figcaption>唱歌 Profile 可以同時包含噪音清理、動態控制、音色與空間效果，並依實際處理順序排列。</figcaption></figure>
  <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}" alt="直播聊天 Profile 的輸入增益、噪音閥與人聲處理訊號鏈" loading="lazy" decoding="async"></a><figcaption>聊天 Profile 與唱歌 Profile 分開管理；停止伴奏後可回到較自然、較乾淨的聊天聲音。</figcaption></figure>
</div>

### Factory Profiles 的用途

| Profile | 適合的情境 |
| --- | --- |
| **直播聊天** | 以自然說話為主，加入噪音閥與基本動態整理，減少鍵盤、滑鼠和房間底噪。 |
| **唱歌 · 通用** | 不分男女聲的保守唱歌起點，先保持清楚與穩定，再依麥克風微調。 |
| **唱歌 · 低音域／高音域** | 針對較低或較高的人聲頻段提供不同 EQ 與 Air 感起點，不代表性別限制。 |
| **唱歌 · 古風** | 較長、較空靈的殘響，但保留字頭與歌詞清晰度。 |
| **唱歌 · 搖滾** | 較有力度的 Gate、壓縮與受控飽和，適合需要厚度與存在感的唱法。 |
| **唱歌 · KTV** | 使用 Delay／Echo 搭配 Reverb，建立熟悉的 KTV 演唱空間。 |
| **唱歌 · 空靈** | Air、Reverb 與較保守的 Shimmer 光暈；可在歌曲中用快捷鍵切換 Shimmer。 |
| **唱歌 · 浴室** | 短而明亮的早期反射，模擬磁磚空間感。 |
| **Radio** | 限縮頻段、壓縮與些微飽和的廣播／電話風格。 |
| **超級爆音** | 故意製造過載麥克風效果；內部仍使用噪音閥與限制器控制不必要的噪音與峰值。 |

## 編輯一條效果器訊號鏈

Profile 頁面中的每個 Block 就是一顆內建效果器或 VST3。訊號會由上到下依序處理。

1. 選擇要編輯的 Profile；Factory Profile 建議先複製，再修改副本。
2. 按 **＋** 新增內建效果器或 VST3。
3. 拖曳 Block 改變處理順序。
4. 使用 Block 右上角的 Switch 暫時 Bypass；設定不會被刪除。
5. 點選 Block 開啟參數視窗，邊試聽邊調整。
6. 儲存後，參數、Block 順序、Bypass 與 VST3 state 都會跟著 Profile 保存。

同一條鏈可以放入多顆相同類型的效果器，每顆 Block 都有自己的識別與參數。最多可放入八個 VST3 插槽；如果另一台電腦沒有安裝同一個 VST3，Profile 仍可開啟，但該 Plugin 無法產生原本的效果。

## 內建效果器與參數

所有內建效果器使用一致的霧面面板、刻度旋鈕、起始設定、簡易／進階切換、Bypass 與說明按鈕。即時訊號圖用來協助觀察，不會把麥克風音量的自然變化誤當成參數自己改動。

<figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/12-built-in-effect-editor.png' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/12-built-in-effect-editor.png' | relative_url }}" alt="Noise Gate 內建效果器視窗，包含即時訊號圖、起始設定、Bypass、進階切換與刻度旋鈕" loading="lazy" decoding="async"></a><figcaption>以 Noise Gate 為例：先選擇接近使用環境的起始設定，再看訊號圖微調開啟／關閉閾值。效果器視窗開啟時，主畫面仍可繼續操作。</figcaption></figure>

點開下列項目可查看用途與常用參數。

<div class="effect-reference">
  <details><summary><strong>輸入增益 Input Gain</strong><span>先把進入整條 Profile 的音量調到合理範圍</span></summary><div class="effect-reference__body"><p>音訊介面已調好時先維持接近 0 dB。提高過多可能讓後續效果器提早過載，無法修復已經削波的原始訊號。</p><ul class="parameter-list"><li><strong>輸入增益：</strong>在所有 Profile 效果器之前增加或降低音量。</li></ul></div></details>
  <details><summary><strong>背景噪音衰減</strong><span>在沒有唱歌的空隙降低持續底噪</span></summary><div class="effect-reference__body"><p>適合風扇與房間底噪，但無法移除與人聲同時出現的聲音。設定過重會讓弱音和句尾不自然。</p><ul class="parameter-list"><li><strong>最大衰減：</strong>安靜時最多降低多少音量。</li><li><strong>衰減閾值：</strong>低於此音量後才開始判斷為背景。</li><li><strong>開啟速度：</strong>人聲出現時恢復正常音量的速度。</li><li><strong>關閉速度：</strong>人聲停止後進入衰減的平滑速度。</li></ul></div></details>
  <details><summary><strong>噪音閥 Noise Gate</strong><span>句子之間關閉麥克風，減少鍵盤與滑鼠聲</span></summary><div class="effect-reference__body"><p>先量測房間底噪，再讓最小聲的字也能可靠打開 Gate。開啟閾值應高於關閉閾值，避免在邊界反覆開關。</p><ul class="parameter-list"><li><strong>關閉閾值：</strong>低於此音量且持續時間結束後，開始關閉。</li><li><strong>開啟閾值：</strong>人聲超過此音量時打開。</li><li><strong>啟動：</strong>打開時恢復人聲的速度。</li><li><strong>持續時間：</strong>音量降低後仍維持開啟多久，避免字尾被切掉。</li><li><strong>釋放：</strong>持續時間結束後關閉的平滑速度。</li><li><strong>關閉衰減：</strong>關閉時最多降低多少；72 dB 接近靜音。</li><li><strong>偵測器 HPF：</strong>只讓 Gate 判斷忽略低頻震動，不會濾掉實際人聲。</li></ul></div></details>
  <details><summary><strong>壓縮器 Compressor</strong><span>縮小輕聲與大聲的差距，讓人聲較穩定</span></summary><div class="effect-reference__body"><p>壓縮不是單純把聲音變大。先調臨界值，讓一般歌唱峰值有適量增益衰減，再用補償對齊音量。</p><ul class="parameter-list"><li><strong>臨界值：</strong>從哪個音量開始壓縮。</li><li><strong>比率：</strong>超過臨界值後壓縮多強。</li><li><strong>啟動：</strong>遇到大聲時開始壓縮的速度。</li><li><strong>釋放：</strong>音量降低後回復的速度。</li><li><strong>補償：</strong>補回壓縮後降低的整體音量。</li><li><strong>轉折寬度：</strong>臨界值附近從柔和到明確壓縮的過渡。</li></ul></div></details>
  <details><summary><strong>等化器 Equalizer（EQ）</strong><span>去除不需要的頻率並塑造人聲音色</span></summary><div class="effect-reference__body"><p>六個頻段可在圖上拖曳，也可輸入精確數值。請先做寬而小的調整，再處理特定共鳴；不要把固定男女聲範本當成每個人的答案。</p><ul class="parameter-list"><li><strong>濾波器類型：</strong>Low Cut、Shelf、Bell、High Cut 等用途不同。</li><li><strong>頻率：</strong>決定調整的中心或轉折位置。</li><li><strong>增益：</strong>提升或降低該頻段。</li><li><strong>Q／寬度：</strong>決定影響範圍；Q 越高通常越窄。</li><li><strong>頻段 Bypass：</strong>暫時略過單一頻段，方便比較。</li></ul></div></details>
  <details><summary><strong>飽和 Saturation</strong><span>增加泛音、厚度或刻意的粗糙感</span></summary><div class="effect-reference__body"><p>少量可增加密度，過量會讓咬字模糊。不同 Type 有不同質感，請配合 Mix 與輸出微調比較 Bypass 前後。</p><ul class="parameter-list"><li><strong>類型：</strong>選擇暖聲、搖滾質感或較強烈的飽和演算法。</li><li><strong>驅動：</strong>推入飽和曲線的強度。</li><li><strong>色彩：</strong>強化所選演算法的個性。</li><li><strong>效果混合：</strong>飽和聲與原聲的比例。</li><li><strong>輸出微調：</strong>對齊旁路前後音量並保留 Headroom。</li></ul></div></details>
  <details><summary><strong>Air 感增強</strong><span>增加清晰度、呼吸感與高頻光澤</span></summary><div class="effect-reference__body"><p>先少量增加；麥克風原本已偏亮時，過量會放大齒音與底噪。</p><ul class="parameter-list"><li><strong>中頻 Air：</strong>增加存在感與清晰度。</li><li><strong>高頻 Air：</strong>增加呼吸感與光澤。</li><li><strong>輸出微調：</strong>對齊 Bypass 音量並避免削波。</li></ul></div></details>
  <details><summary><strong>齒音抑制器 De-esser</strong><span>壓低刺耳的 S、SH 等高頻子音</span></summary><div class="effect-reference__body"><p>只壓到刺耳感變自然即可；太重會讓人聲像含著東西或失去亮度。</p><ul class="parameter-list"><li><strong>齒音頻率：</strong>選擇要偵測的高頻範圍。</li><li><strong>臨界值：</strong>越低越容易觸發。</li><li><strong>最大衰減：</strong>限制最多壓低多少。</li><li><strong>啟動／釋放：</strong>控制抓住齒音與恢復的速度。</li></ul></div></details>
  <details><summary><strong>變聲器 Voice Changer</strong><span>調整音高與共振峰，製作角色或特殊段落</span></summary><div class="effect-reference__body"><p>它是創意效果，不是身分保護工具。大幅改變音高時，也需要調整共振峰避免不自然。</p><ul class="parameter-list"><li><strong>音高：</strong>以半音升高或降低演唱音高。</li><li><strong>共振峰：</strong>改變聲道大小感；正值較小較亮，負值較大較深。</li><li><strong>效果混合：</strong>變聲與原聲比例。</li><li><strong>人聲範圍：</strong>協助分析接近演唱者音域，不是輸出音高。</li></ul></div></details>
  <details><summary><strong>和聲器 Harmony</strong><span>依歌曲調性產生自然的和聲聲部</span></summary><div class="effect-reference__body"><p>和聲器會依目前歌曲的音樂資訊追蹤主唱並產生額外聲部；它適合點綴副歌或特定段落，不建議把合成聲部蓋過主唱。開始前請先確認歌曲的 Key 與調式。</p><ul class="parameter-list"><li><strong>效果混合：</strong>和聲與原本人聲的比例。</li><li><strong>和聲方向：</strong>選擇自然音階的上方三度、下方三度，或高／低八度聲部。</li><li><strong>立體寬度：</strong>控制和聲聲部在左右聲道的展開程度。</li><li><strong>人性化：</strong>加入短而緩慢變化的時間偏移，避免和聲僵硬地黏住主唱。</li><li><strong>音色：</strong>控制和聲的明暗，讓它避開主唱的主要存在感。</li><li><strong>追蹤：</strong>設定和聲出現所需的音高穩定度與歌曲 Key 信心門檻；數值越高，只有較穩定、判斷較可信的音符才會產生和聲。</li></ul></div></details>
  <details><summary><strong>疊聲器 Doubler</strong><span>以短時間差與輕微音高差建立雙軌演唱厚度</span></summary><div class="effect-reference__body"><p>疊聲器模擬同一句人聲重唱兩次的差異，可讓主唱更寬、更厚。少量通常最自然；過多會讓字頭模糊，耳機播放時也可能顯得過度分散。</p><ul class="parameter-list"><li><strong>效果混合：</strong>疊聲與原本人聲的比例。</li><li><strong>時間差：</strong>控制疊聲相對主唱的短延遲；數值越大，越接近可辨識的兩次演唱。</li><li><strong>音高差：</strong>以 cents 為單位微調疊聲音高，避免完全重疊。</li><li><strong>立體寬度：</strong>控制兩側疊聲的展開程度。</li><li><strong>人性化：</strong>加入自然的細微變化，降低固定複製感。</li><li><strong>音色：</strong>控制疊聲高頻明暗，讓主唱仍位於最前方。</li></ul></div></details>
  <details><summary><strong>Delay</strong><span>加入可清楚辨識的回聲，不延後直接人聲</span></summary><div class="effect-reference__body"><p>短時間可形成 Slap，較長時間適合節奏回聲。Feedback 與 Wet 過高會遮住下一句歌詞。</p><ul class="parameter-list"><li><strong>濕聲比例：</strong>回聲與直接人聲的比例。</li><li><strong>延遲時間：</strong>每次回聲的間隔。</li><li><strong>回授：</strong>回聲餵回下一次重複的強度。</li><li><strong>立體寬度：</strong>稍微錯開左右回聲時間。</li><li><strong>低切／高切：</strong>清理回聲的低頻並讓重複逐漸變暗。</li></ul></div></details>
  <details><summary><strong>Reverb</strong><span>在人聲周圍建立房間、Plate 或長空間感</span></summary><div class="effect-reference__body"><p>Pre-delay 可保留字頭；Decay 與 Wet 共同影響尾音是否遮住下一句。古風和空靈效果通常較長，但仍要以歌詞清楚為前提。</p><ul class="parameter-list"><li><strong>濕聲比例：</strong>殘響與直接人聲的比例。</li><li><strong>前置延遲：</strong>直接人聲之後多久才出現殘響。</li><li><strong>空間大小：</strong>空間的尺寸與密度感。</li><li><strong>衰減時間：</strong>殘響尾音維持多久。</li><li><strong>阻尼：</strong>控制尾音明亮或偏暗。</li></ul></div></details>
  <details><summary><strong>Shimmer</strong><span>在殘響尾音加入高八度光暈，適合空靈段落</span></summary><div class="effect-reference__body"><p>Shimmer 很容易變得搶耳，建議讓它小於主唱並使用 Ducking。Block 的 Bypass、每首歌的預設開啟／關閉，以及唱歌途中快捷鍵切換是三件不同的事。</p><ul class="parameter-list"><li><strong>濕聲比例：</strong>高八度尾音與直接人聲的比例。</li><li><strong>前置延遲：</strong>光暈出現前等待多久。</li><li><strong>衰減時間：</strong>高八度尾音維持多久。</li><li><strong>回授：</strong>尾音重新進入八度產生器的強度。</li><li><strong>音色：</strong>控制產生尾音的高頻明暗。</li><li><strong>Ducking：</strong>唱歌時先壓低 Shimmer，句子空隙再浮現。</li></ul></div></details>
  <details><summary><strong>限制器 Limiter</strong><span>在 Profile 尾端攔截突發人聲峰值</span></summary><div class="effect-reference__body"><p>Profile Limiter 只保護該條人聲鏈；完整直播輸出仍有獨立 Final Limiter。</p><ul class="parameter-list"><li><strong>前級增益：</strong>讓人聲推入 Limiter 的程度。</li><li><strong>上限：</strong>Profile 輸出的最大 Sample Peak。</li><li><strong>釋放：</strong>峰值後恢復的平滑速度。</li><li><strong>前瞻：</strong>提早看見峰值；會增加畫面顯示的 Profile 延遲。</li></ul></div></details>
</div>

## Shimmer 的 Bypass、預設狀態與快捷鍵

- **Bypass 關閉 Block**：整顆 Shimmer 不參與處理，參數仍保留。這是編輯訊號鏈時的效果器旁路。
- **預設開啟／預設關閉**：決定每次重新套用這個 Profile 或開始下一首歌時，Shimmer 的起始狀態。
- **Shimmer Switch 快捷鍵**：只改變目前這一首歌的暫時狀態，不會覆寫 Profile 的預設值。只有目前 Profile 中存在可用的 Shimmer Block、而且音訊路由為進階直播模式時才生效。

例如「唱歌 · 空靈」可設為預設開啟；唱到不需要光暈的段落時用快捷鍵暫時關閉。下一首歌重新套用同一個 Profile 時，仍會依 Profile 設定再次預設開啟。

## VST3

Profile 可混合內建效果器與 VST3，並保存 Plugin 的 state、Block 順序與 Bypass。使用時請注意：

- VST3 的編輯器由 Plugin 廠商提供，外觀與鍵盤操作可能和內建效果器不同。
- Plugin 回報的 latency 會納入 Profile 延遲資訊；高延遲 Plugin 可能不適合即時演唱監聽。
- 儲存的是參數 state，不會把第三方 VST3 本體打包進專案。
- 拖曳改變順序會改變實際聲音；例如 Reverb 放在飽和前後會有明顯差異。
- 關閉 VST3 編輯視窗只關閉參數介面，不會自動從 Profile 刪除該 Block。

## 直播中手動切換、麥克風靜音與歌曲自動化

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}" alt="主畫面的監聽、錄音、麥克風靜音與 Profile 控制" loading="lazy" decoding="async"></a><figcaption>直播中可手動改用指定 Profile、將麥克風靜音，或選回「自動切換 Profile」讓歌曲標籤接管。</figcaption></figure>

- **自動切換 Profile**：伴奏開始時使用歌曲標籤；沒有固定標籤時使用預設唱歌 Profile，伴奏結束後回到聊天 Profile。
- **手動選擇 Profile**：立即改用指定訊號鏈，直到選回自動切換。
- **麥克風靜音**：只停止麥克風進入直播混音，不會停止 BGM／伴奏播放。
- **系統工具與快捷鍵**：主視窗縮小後仍可切換 Profile、靜音／恢復麥克風與操作支援的效果器 Switch。

## 儲存與測試

Profile 的 Block、順序、Bypass、內建參數、Shimmer 預設狀態與 VST3 state 會隨 Profile／專案保存。正式直播前建議：

1. 先用說話測試 Gate，不要切掉輕聲與句尾。
2. 再唱最小聲和最大聲段落，確認 Compressor／Limiter 不會持續重壓。
3. 比較 Bypass 前後的音量，避免只因變大聲而誤以為音色更好。
4. 播放設定過標籤的歌曲，確認開始與停止伴奏時切換正確。
5. 錄製包含聊天、唱歌、Shimmer Switch 與 Profile 切換的短片，在 OBS 回放中確認沒有爆音或不自然跳變。

如果尚未設定麥克風、監聽或 OBS 輸出，請回到 [音訊路由完整教學]({{ '/audio-routing.html' | relative_url }})。
