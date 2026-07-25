---
title: 歌回救星 2.0 使用說明
description: Singing Stream Savior 2.0.0.0 繁體中文使用說明
lang: zh-TW
translation_key: home
---

# 歌回救星 2.0 使用說明

歌回救星（Singing Stream Savior）是為歌回直播設計的 Windows 桌面工具。它把歌曲庫、BGM、歌唱伴奏、待播清單、歌詞與 OBS 畫面整合在同一個操作流程中。

本說明適用於 **2.0.0.0** 版。

<figure class="manual-figure">
  <a href="{{ '/assets/images/full-workspace.png' | relative_url }}">
    <img src="{{ '/assets/images/full-workspace.png' | relative_url }}" alt="歌回救星 2.0 完整模式，左側為歌曲庫，右側為播放器與待播清單">
  </a>
  <figcaption>完整模式可管理歌曲、播放器與待播清單，並可切換到歌詞或歌單外觀頁進行設定。點圖片可查看原尺寸。</figcaption>
</figure>

## 第一次使用，從這裡開始

1. [安裝、啟動與建立專案](getting-started.md)
2. [歌曲庫、歌單與播放器](library-and-playback.md)
3. [歌詞、同步歌詞與日文讀音](lyrics.md)
4. [歌單外觀、歌詞畫面與 OBS](obs-and-themes.md)
5. [OBS WebSocket 與直播時間戳](obs-websocket.md)
6. [完整、精簡與迷你模式](workspace-modes.md)
7. [設定、備份與疑難排解](settings-and-troubleshooting.md)

## 建議的直播準備流程

1. 建立或開啟 `.bgmsproj` 專案。
2. 將本機伴奏或 YouTube 歌曲加入歌曲庫。
3. 填寫直播時要顯示的歌名；封面與歌詞可依直播需求選用。
4. 若有觀眾點歌或預定曲目，可加入「待播」並排好順序；沒有待播時也能直接雙擊歌曲播放。
5. 到「歌單外觀」選擇主題，再將「拖曳至 OBS」拖入 OBS。
6. 若要測試直播時間戳，到「設定 > 進階設定」啟用 OBS WebSocket。
7. 開播前播放一首測試歌曲，確認聲音、歌詞、歌單與 OBS 畫面。
8. 開播後可切換到精簡或迷你模式，保留最常用的直播操作。

> **重要：** 日文平假名與羅馬拼音由離線字典自動產生，僅供閱讀參考，可能與歌手實際唱法不同。

## 哪些功能是選用的？

- **封面：** 一般播放與多數歌單主題不要求封面。Card 與 CD 主題會在設定封面後呈現歌曲專屬的卡片或唱片效果。
- **歌詞：** 不設定歌詞也能播放歌曲。設定後可供主播在獨立歌詞視窗閱讀，也能另外建立 OBS 歌詞畫面給觀眾觀看。
- **待播清單：** 不使用待播也能直接雙擊歌曲播放。待播適合管理觀眾點歌或接下來預定演唱的歌曲，並可由支援的主題顯示在 Reserve／Next On 區域。
- **OBS WebSocket：** 目前仍在測試，主要用來讀取 OBS 直播時間並記錄歌曲開始的時間戳。一般歌單與歌詞 Overlay 不需要 WebSocket 也能使用。

## 系統需求

- Windows 10 或 Windows 11，64 位元
- 可用的音訊輸出裝置
- 本機歌曲／歌唱伴奏支援 MP3、WAV、FLAC、M4A、MP4、AAC、OGG、OPUS 與 WMA
- 使用 YouTube、線上歌詞或封面搜尋時需要網路連線
- 使用測試中的 OBS WebSocket 時，建議使用 OBS Studio 28 或更新版本

## 名詞說明

- **BGM**：直播空檔播放的背景音樂。
- **歌唱伴奏**：演唱時使用的伴奏音軌，可調整速度與音高。
- **待播**：預計接下來演唱的歌曲。
- **已唱**：已完成演唱的歷史歌曲。
- **Set List**：OBS 歌單畫面中的已唱歌曲清單。
- **Next On／Reserve**：部分 OBS 主題提供的下一首或待播顯示區。
- **Overlay**：加入 OBS Browser Source 的歌單或歌詞網頁畫面。
