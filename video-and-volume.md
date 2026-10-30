---
title: 影片播放與 OBS 擷取
lang: zh-TW
translation_key: video-and-volume
---

# 影片播放與 OBS 擷取

2.2.1.0 起，可播放 MP4／MOV 合唱影片，並為每首歌保存增益與去背參數。

<ol class="chapter-quick-start__steps">
<li><div><strong>加入影片</strong><span>將 MP4／MOV 拖進歌曲列表，或按「匯入伴奏」選取檔案。</span></div></li>
<li><div><strong>播放與預覽</strong><span>播放後按伴奏播放器標題列右上角的「影片畫面」圖示（原 YouTube 影片視窗按鈕，位置見下圖）。聲音由主播放器處理；影片視窗的播放、停止與進度拉桿控制同一個播放器。</span></div></li>
<li><div><strong>設定每支影片</strong><span>到「歌曲設定 → 影片」選擇色度鍵背景色、相似性、平滑與溢色抑制。儲存設定及專案，每支影片分別保留參數。</span></div></li>
<li><div><strong>在 OBS 取得透明畫面</strong><span>在軟體按「乾淨擷取」，再新增 OBS「視窗擷取」，選「影片畫面 — 乾淨擷取」。擷取方式選 Windows 10（1903 或更新版本），視窗標題須相符。</span></div></li>
</ol>

{% include video-window-entry.html %}

{% include video-output-guide-images.html kind='controls' %}

{% include video-output-guide-images.html kind='key' %}

{% include video-output-guide-images.html kind='obs' %}

把背景來源放在下方確認透明效果。格子底只是一般預覽的參考；原生透明 MOV 不需再套色度鍵，但 MOV 副檔名不保證包含透明通道。

按 Esc 或右鍵返回操作介面；也可從主播放器重新開啟影片畫面。可把影片視窗放到其他視窗後方，不要依賴最小化維持擷取。

若已使用 S3S 的音訊來源送入 OBS，請沿用它，避免重複擷取影片聲音。

## 歌曲音量平衡

在「設定」開啟「自動平衡歌曲音量」。預設 −18 LUFS-I 是伴奏的起始參考，不是 YouTube 上傳標準；預設不啟用。分析完成後，下次播放才套用，演唱中不會突然改變。

播放器「增益」顯示合計；展開可查看自動補償與手動微調。每次加減 0.5 dB，重設只清除手動值。手動增益隨專案保存，BGM 不受影響。

可分析本機音訊及影片音軌；線上 YouTube 串流尚不能直接分析，仍可手動微調。影片中已混入的合唱人聲也會一起調整。

自動向上補償最多 +6 dB，且受來源峰值空間限制。它保留歌曲內的強弱變化，不會改寫原始檔。OBS 音量條的 dBFS 不等於 LUFS；請錄一段確認人聲加伴奏的最終平衡與失真。
