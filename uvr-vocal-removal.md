---
title: UVR 人聲消除
lang: zh-TW
translation_key: uvr-vocal-removal
---

# UVR 人聲消除

<section class="chapter-quick-start" aria-labelledby="uvr-quick-start">
  <div>
    <p class="chapter-quick-start__eyebrow">2.1.1 新功能</p>
    <h2 id="uvr-quick-start">四步產生可演唱伴奏</h2>
    <p class="chapter-quick-start__intro">本機音檔與 YouTube 連結都能直接處理，完成後不必離開軟體就能加入歌曲列表。</p>
    <ol class="chapter-quick-start__steps">
      <li><div><strong>拖入待處理清單</strong><span>把一個或多個音訊檔，或 YouTube 影片連結，直接拖到表格。</span></div></li>
      <li><div><strong>確認每首設定</strong><span>可逐首選擇 HP 或 MDX，以及保留合音或完全消除人聲；再選擇輸出格式與取樣率。</span></div></li>
      <li><div><strong>開始處理</strong><span>按「開始處理」，從每首歌曲狀態與底部總進度查看進度；處理中可「全部停止」。</span></div></li>
      <li><div><strong>匯入伴奏</strong><span>完成後逐首匯入，或等全部完成再按「全部匯入歌曲列表」。</span></div></li>
    </ol>
    <p class="chapter-quick-start__done"><strong>完成時：</strong>歌曲列表只會加入實際伴奏；人聲與伴奏兩個輸出檔仍會保留在輸出資料夾。</p>
  </div>
  <figure class="manual-figure">
    <a href="assets/images/uvr-model-selection-2-1-2.png"><img src="assets/images/uvr-model-selection-2-1-2.png" alt="UVR 表格中的 HP 與 MDX 四種模型選項、歌名鉛筆與每首歌曲狀態" loading="lazy" decoding="async"></a>
    <figcaption>2.1.2 介面示意：每首可使用不同模型，進度與操作會顯示在同一列。</figcaption>
  </figure>
</section>

## 加入待處理清單

把一個或多個本機音訊檔，或 YouTube 影片連結，直接拖到「待處理清單」即可。YouTube 會自動讀取影片標題；影片超過 15 分鐘時，會先詢問是否選取需要的播放範圍。

點歌名旁的鉛筆可編輯標題。2.1.2 新增 HP 模型，與 MDX 一樣可選「保留合音／完全消除人聲」，同一份清單可逐首使用不同模型。新安裝預設為 HP 保留合音；軟體會記住你選擇的預設設定。

按下「開始處理」後，這一批工作的設定會暫時鎖定。視窗最小化後仍會在背景處理，可隨時使用「全部停止」。

沐橙個人聽感推薦 HP，實測認為較能保留伴奏細節，但效果可能因歌曲或曲風而有差異，僅供參考。相同條件實測，HP 會比 MDX 慢，實際速度依歌曲與電腦而異。

## 輸出與 GPU

- 輸出格式可選 WAV、FLAC 或 MP3；MP3 使用 320 kbps。
- 取樣率預設為 **48 kHz**，也可改為 **44.1 kHz**。
- 勾選 GPU 加速後，軟體會使用相容的顯示卡處理；若無法使用 GPU，會自動改用 CPU，並在主視窗左下角說明原因。
- 輸出資料夾統一在「設定 > 檔案與專案」管理；UVR 頁面的「開啟設定」會直接帶到該位置。

## 處理與匯入

按「開始處理」後，清單會依序處理所有歌曲，並顯示每首歌曲與整批工作的進度。完成時會產生名稱帶有 `(Instrumental)` 與 `(Vocal)` 的兩個檔案。

「匯入歌曲列表」只會把實際的伴奏檔加入歌曲庫；人聲檔仍會保留在輸出資料夾。所有歌曲都完成後，也可以一次全部匯入。

<div class="figure-grid">
  <figure class="manual-figure">
    <a href="assets/images/uvr-completed-redacted.png"><img src="assets/images/uvr-completed-redacted.png" alt="UVR 人聲消除完成並可匯入歌曲列表" loading="lazy" decoding="async"></a>
    <figcaption>全部處理完成後，可逐首匯入或使用「全部匯入歌曲列表」。</figcaption>
  </figure>
  <figure class="manual-figure">
    <a href="assets/images/uvr-imported-redacted.png"><img src="assets/images/uvr-imported-redacted.png" alt="UVR 伴奏已成功匯入歌曲列表" loading="lazy" decoding="async"></a>
    <figcaption>匯入完成後，主視窗左下角與清單狀態都會顯示結果。</figcaption>
  </figure>
</div>

> **建議在直播前先處理。** 人聲分離會使用 CPU 或 GPU 資源；直播中執行前，請先確認電腦仍有足夠效能處理音訊與 OBS。

[上一頁：直播時間戳擷取](obs-websocket.md) · [下一頁：完整、精簡與迷你模式](workspace-modes.md)
