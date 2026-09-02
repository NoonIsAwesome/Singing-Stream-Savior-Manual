# 說明書圖片

`images/` 內的畫面截圖隨說明書一起部署，避免網站引用本機暫存檔。根目錄圖片為繁體中文；`en/`、`zh-CN/`、`ja/`、`ko/` 分別存放軟體實際切換至該語言後擷取的同版畫面。

- `compact-workspace.png`：精簡模式與主要播放器配置
- `full-workspace.png`：一般播放模式下，完整工作區的歌曲庫、播放器與待播清單
- `song-library.png`：完整歌曲庫分類、搜尋與歌曲表格
- `display-title-edit.png`：顯示歌名的重點區域編輯畫面
- `add-to-playlist-menu.png`：歌曲右鍵加入我的最愛／自訂歌單
- `cover-dialog.png`：嵌入封面
- `lyrics-manager.png`：管理歌詞
- `lyrics-manager-linked.png`：管理歌詞的匯入與取消連結狀態
- `lyrics-reading-preview.png`：日文讀音與 OBS 歌詞預覽
- `lyrics-viewer.png`：獨立歌詞視窗與語意化時間校正
- `theme-workspace.png`：歌單外觀與全自動主題展示
- `card-theme-cover.png`：Card 主題的封面效果
- `cd-theme-cover.png`：CD 主題的封面效果
- `obs-websocket-settings.png`：OBS WebSocket 進階設定
- `mini-workspace.png`：迷你模式
- `qt-platform-error.png`：Qt 外掛錯誤
- `audio-routing.png`：2.1.0.0 進階直播音訊路由頁面上半部，包含 OBS 外掛／虛擬輸出入口、App Buffer 與路由圖上半部
- `audio-health-check.png`：App Buffer 穩定性健檢與延遲建議
- `audio-meter-horizontal.png`／`audio-meter-vertical.png`：五軌音量 Meter 的兩種方向
- `profile-horizontal-rack.png`／`profile-vertical-rack.png`：Profile 效果鏈的兩種 Rack 方向
- `notification-area-menu.png`：未播放時的 Windows 系統工具右鍵選單；播放／進階模式會依狀態增加動作
- `keyboard-shortcuts.png`：鍵盤快捷鍵設定頁與依模式分類的全域快捷鍵
- `system-resource-status.png`：未停留游標時的 CPU／記憶體收合摘要；音訊健康資訊位於 hover Tooltip
- `live-timeline-card.jpg`：實際直播畫面中的 Now Singing、Next On 與歌曲時間戳，用於首頁功能卡片
- `bgm-playlist.png`：展開後的背景音樂播放清單，顯示備註、來源與目前播放項目
- `reserve-list.png`、`reserve-display-setting.png`、`reserve-overlay-next.png`、`reserve-overlay-multiple.png`：待播／已唱清單、OBS 顯示選項，以及 Next On 與 Reserve 的實際呈現
- `advanced-streaming/13-obs-add-s3s-audio-source.png` 至 `22-audio-routing-signal-graph.png`：進階直播模式、OBS 外掛、虛擬音源、OBS 混音器與直播輸出裝置選擇的逐步設定圖
- `advanced-streaming/23-system-resource-status-expanded.png`：主視窗 CPU／RAM 與進階音訊健康 Tooltip 的完整欄位，用於判讀教學
- `advanced-streaming/24-singing-profile-default.png` 與 `25-chat-profile-ducking.png`：快速設定中的預設唱歌／聊天 Profile 與 BGM 閃避位置
- `advanced-streaming/26-song-profile-tag-menu.png`：從歌曲列展開 Profile 標籤選單
- `advanced-streaming/27-live-profile-menu.png`：直播操作列的即時 Profile、監聽、錄音與麥克風控制

`effect-editors/` 存放 15 顆內建效果器的實際編輯視窗，檔名必須使用 `S3S_REGISTRY_EDITOR_SCREENSHOT_DIR` 實際輸出的 Qt／DSP module ID：`gain.png`、`noise.png`、`gate.png`、`compressor.png`、`eq.png`、`saturation.png`、`air.png`、`deesser.png`、`voice-changer.png`、`harmony.png`、`doubler.png`、`delay.png`、`reverb.png`、`shimmer.png`、`limiter.png`。根目錄為繁體中文；其他語言放在各自語言資料夾下的 `effect-editors/`。

截圖應與當前公開版本一致；介面有明顯變更時，請同步更新五種語言的同名圖片，避免不同語言頁面顯示舊介面或錯誤語言。

此資料夾預留給 GitHub Pages 說明書使用的介面截圖。

建議圖片規格：

- PNG 或 WebP。
- 視窗截圖寬度 1400–1800 px。
- 避免包含個人檔案路徑、OBS 密碼、私人歌單或未公開主題。
- 檔名使用英文小寫及連字號，例如 `live-workspace-full.png`。
- 每張圖片在 Markdown 中提供清楚的替代文字。
