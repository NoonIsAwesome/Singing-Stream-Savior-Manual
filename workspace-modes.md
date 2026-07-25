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
  <a href="{{ '/assets/images/full-workspace.png' | relative_url }}">
    <img src="{{ '/assets/images/full-workspace.png' | relative_url }}" alt="完整模式顯示歌曲庫、背景音樂、歌唱伴奏與待播清單">
  </a>
  <figcaption>完整模式的歌曲頁保留完整歌曲資料、播放器與待播清單；也可切換到歌詞或歌單外觀頁進行設定。</figcaption>
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

適合在開播前已完成待唱歌曲與畫面設定，並已將歌曲排入待播清單的主播。這個模式把畫面縮到最精簡，直播中只要從待播清單選擇下一首歌曲播放即可。

- 隱藏歌曲庫、歌單編輯及背景音樂播放器。
- 保留歌唱伴奏播放器，以及速度、音高和音量控制。
- 保留待播／已唱清單，方便依照預先安排的順序播放。
- 保留「歌詞視窗」按鈕。歌詞視窗可自由移動及調整文字大小，方便依照直播螢幕上的其他軟體自行安排位置。

從完整或精簡模式切換到迷你模式時，只會收起不常用的介面；正在播放的歌曲會繼續播放，原本的待播順序與 OBS 畫面也不會被重設。

<figure class="manual-figure manual-figure--portrait">
  <a href="{{ '/assets/images/mini-workspace.png' | relative_url }}">
    <img src="{{ '/assets/images/mini-workspace.png' | relative_url }}" alt="迷你模式只顯示歌唱伴奏播放器與待播已唱清單">
  </a>
  <figcaption>迷你模式隱藏 BGM 與歌曲庫，把空間留給歌唱伴奏、待播和已唱清單；需要閱讀歌詞時可另外開啟「歌詞視窗」。</figcaption>
</figure>

## 視窗配置記憶

完整、精簡與迷你模式會分別記住視窗大小及相關分隔位置。切回原模式時會恢復先前配置。

## 使用建議

- **整理歌曲、歌詞與主題：** 完整模式。
- **直播中仍會臨時點歌：** 精簡模式。
- **曲目已排定，只需要播放與看待播：** 迷你模式。
- **需要大字閱讀歌詞：** 開啟獨立歌詞視窗並移到適合的螢幕位置。

[上一頁：OBS WebSocket 與直播時間戳](obs-websocket.md) · [下一頁：設定、備份與疑難排解](settings-and-troubleshooting.md)
