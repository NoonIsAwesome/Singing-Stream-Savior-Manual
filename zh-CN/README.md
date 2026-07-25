---
title: 歌回救星 2.0 使用说明
description: Singing Stream Savior 2.0.0.0 简体中文使用说明
lang: zh-CN
translation_key: home
---

# 歌回救星 2.0 使用说明

歌回救星（Singing Stream Savior）是为歌回直播设计的 Windows 工具，将歌曲库、BGM、歌唱伴奏、待播、歌词和 OBS 画面整合在同一套流程中。本说明适用于 **2.0.0.0**。

<figure class="manual-figure"><a href="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/lyrics-reading-preview.png' | relative_url }}" alt="完整模式中的歌词设置、OBS 预览、播放器和待播列表"></a><figcaption>完整模式适合开播前整理歌曲、歌词与 OBS 画面。点击图片可查看原尺寸。</figcaption></figure>

建议先建立或打开 `.bgmsproj`，加入歌曲、填写显示歌名、整理待播，再到“歌单外观”选择主题并把“拖曳至 OBS”拖入 OBS。封面、歌词与 OBS WebSocket 都是选用功能。

<a id="getting-started"></a>
## 01 · 开始使用

将 ZIP 完整解压后，打开最外层的 `Singing Stream Savior.exe`。不要直接在 ZIP 中运行，也不要单独移动 EXE 或 DLL；Qt、FFmpeg、主题与日文读音字典需要保持原目录结构。

从“文件 > 新建项目”建立项目并保存 `.bgmsproj`。项目会保存歌曲、显示歌名、待播顺序、已唱记录、歌词关联和主题设置。标题栏出现 `*` 表示还有未保存的更改。

<a id="library-and-playback"></a>
## 02 · 歌曲库与播放

歌曲库包含全部歌曲、我的最爱、最近播放与自定义歌单。可以加入本地音频、YouTube 单曲或播放列表。“显示歌名”会用于待播与 OBS；未填写时会使用文件名或 YouTube 标题。

封面不是必需，仅在 Card 与 CD 主题下有特别效果。在歌曲菜单打开“嵌入封面”，选择搜索结果或本地图片，等待预览完成后按“嵌入”。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/cover-dialog.png' | relative_url }}" alt="嵌入封面窗口"></a><figcaption>封面预览载入完成后即可嵌入。</figcaption></figure>

BGM 与歌唱伴奏拥有独立播放、音量与进度控制；伴奏还可调整速度和半音音高，不会修改原文件。将歌曲拖到“待播”，完成后会移入“已唱”。

<a id="lyrics"></a>
## 03 · 歌词功能

歌词可供主播在独立“歌词窗口”阅读，也可作为 OBS 歌词画面给观众观看。支持 LRC、SRT、VTT、纯文本、YouTube 字幕与 LRCLIB。

“管理歌词…”可以搜索、导入本地歌词、附加结果或取消歌词关联。搜索最多 50 条，优先显示同步歌词以及长度最接近伴奏的版本。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/lyrics-manager-linked.png' | relative_url }}" alt="管理歌词窗口中的导入 LRC 和取消歌词关联"></a><figcaption>已有歌词时，左下角仍可导入其他文件或取消当前关联。</figcaption></figure>

日文读音可关闭、在汉字上方显示小平假名，或在原文下方显示带空格的罗马拼音。自动读音仅供参考，特殊读法与演唱方式可能和原曲不同。

<a id="obs-and-themes"></a>
## 04 · 歌单外观与主题

在“歌单外观”选择主题，并检查 Now Singing、Set List、Next On 与 Reserve。基本主题依次为 Default、Transparent Black、Transparent White、Card、CD，之后才是精致主题。

<figure class="manual-figure"><a href="{{ '/assets/images/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/theme-workspace.png' | relative_url }}" alt="歌单外观页面的主题卡片、设置、预览和说明"></a><figcaption>完整模式可同时比较主题、调整设置并查看 OBS 效果。</figcaption></figure>

用“拖曳至 OBS”建立本地 Browser Source，不需要启用 WebSocket。Card 使用直向封面卡片，CD 使用圆形唱片效果；其他主题与正常播放不要求封面。

<a id="obs-websocket"></a>
## 05 · OBS WebSocket（测试功能）

此功能默认关闭，目前主要用于读取 OBS 直播时间、记录伴奏开始时间，并在 Set List 歌名前显示时间戳。一般歌单与歌词画面不需要 WebSocket。

在 OBS Studio 28 以上版本打开“工具 > WebSocket 服务器设置”，启用服务器并确认端口（通常为 `4455`）与密码。再到软件“设置 > 高级设置”，启用 WebSocket，填写 `127.0.0.1`、端口和密码后按“连接”。

<figure class="manual-figure"><a href="{{ '/assets/images/obs-websocket-settings.png' | relative_url }}"><img src="{{ '/assets/images/obs-websocket-settings.png' | relative_url }}" alt="高级设置中的 OBS WebSocket 说明和连接资料"></a><figcaption>启用选项后，连接按钮与状态显示才会出现。</figcaption></figure>

右下角绿灯为已连接，黄灯为连接中，红灯为未连接。正式直播前请先用测试直播确认时间戳。

<a id="workspace-modes"></a>
## 06 · 工作区模式

- **完整模式：** 显示所有资料、设置与大型预览，适合准备直播。
- **精简模式：** 保留选歌、播放器、待播和已唱，隐藏宽列与大型预览。
- **迷你模式：** 隐藏歌曲库与 BGM，只保留伴奏、歌词窗口按钮、待播和已唱。

快捷键为 `Ctrl + Shift + M`。切换模式不会停止播放或影响 OBS，每种模式会记住各自的窗口配置。

<a id="settings-and-troubleshooting"></a>
## 07 · 设置与疑难解答

设置包含界面语言、项目/媒体路径、YouTube 下载格式与测试中的 WebSocket。搬到其他电脑前，请备份 `.bgmsproj`、本地媒体和自行导入的歌词。

若出现 Qt platform plugin 错误，请完整解压 ZIP、从外层 EXE 启动，并确认内层有 `platforms/qwindows.dll`。不要只复制主程序到桌面；请建立外层启动器的快捷方式。

找不到歌词时可缩短关键词、检查歌名/歌手、选择同步且长度接近的结果，或导入 LRC/SRT/VTT/纯文本。OBS 画面未更新时，请重新载入软件预览并刷新 OBS Browser Source。
