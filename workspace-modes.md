---
title: 完整、精簡與迷你模式
lang: zh-TW
translation_key: workspace-modes
---

# 完整、精簡與迷你模式

右上角的模式按鈕可在三種工作空間之間切換。按主要按鈕會依序循環，右側下拉選單可直接選擇指定模式。

快捷鍵：`Ctrl + Shift + M`

## 完整模式

適合準備直播與調整設定：

- 顯示完整歌曲資料與來源欄位。
- 顯示歌詞即時預覽。
- 顯示歌單外觀即時預覽與主題指南。
- 適合管理歌曲、封面、歌詞及 OBS 畫面。

<figure class="manual-figure">
  <a href="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}">
    <img src="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}" alt="完整模式顯示歌詞設定、OBS 即時預覽、背景音樂、歌唱伴奏與待播清單">
  </a>
  <figcaption>完整模式保留所有設定及大型預覽；畫面中的歌詞分頁同時顯示 OBS 效果與播放控制。</figcaption>
</figure>

## 精簡模式

適合直播進行中、仍需要選歌與調整內容時：

- 保留歌曲庫、歌單、播放器、待播與已唱。
- 隱藏歌曲來源或檔名欄位。
- 隱藏大型內嵌預覽以節省寬度與繪製資源。
- 仍可切換到歌詞頁並開啟「歌詞視窗」。

<figure class="manual-figure manual-figure--medium">
  <a href="{{ '/assets/images/compact-workspace.png' | relative_url }}">
    <img src="{{ '/assets/images/compact-workspace.png' | relative_url }}" alt="精簡模式主畫面">
  </a>
  <figcaption>精簡模式保留歌曲庫與直播操作，同時縮小工作區寬度。</figcaption>
</figure>

## 迷你模式

適合開播前已完成歌曲與主題設定的主播：

- 隱藏歌曲庫、歌單編輯及背景音樂播放器。
- 保留歌唱伴奏播放器。
- 保留速度、音高及音量控制。
- 保留待播／已唱清單。
- 保留「歌詞視窗」按鈕。

迷你模式不會停止目前播放、不會改變待播順序，也不會影響 OBS 輸出。

<figure class="manual-figure manual-figure--portrait">
  <a href="{{ '/assets/images/mini-workspace.png' | relative_url }}">
    <img src="{{ '/assets/images/mini-workspace.png' | relative_url }}" alt="迷你模式只顯示歌唱伴奏播放器與待播已唱清單">
  </a>
  <figcaption>迷你模式隱藏 BGM 與歌曲庫，把垂直空間留給待播和已唱清單。</figcaption>
</figure>

## 視窗配置記憶

完整、精簡與迷你模式會分別記住視窗大小及相關分隔位置。切回原模式時會恢復先前配置。

## 使用建議

- **整理歌曲、歌詞與主題：** 完整模式。
- **直播中仍會臨時點歌：** 精簡模式。
- **曲目已排定，只需要播放與看待播：** 迷你模式。
- **需要大字閱讀歌詞：** 開啟獨立歌詞視窗並移到適合的螢幕位置。

[上一頁：OBS WebSocket 與直播時間戳](obs-websocket.md) · [下一頁：設定、備份與疑難排解](settings-and-troubleshooting.md)
