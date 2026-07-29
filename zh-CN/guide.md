---
title: 歌回救星 2.0 使用说明
description: Singing Stream Savior 2.0.0.0 简体中文使用说明
lang: zh-CN
translation_key: home
manual_bundle: true
---

# 歌回救星 2.0 使用说明

歌回救星（Singing Stream Savior）是为歌回直播设计的 Windows 工具，将歌曲库、BGM、歌唱伴奏、待播、歌词和 OBS 画面整合在同一套流程中。本说明适用于 **2.0.0.0**。

<figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/lyrics-reading-preview.png' | relative_url }}" alt="完整模式中的歌词设置、OBS 预览、播放器和待播列表"></a><figcaption>完整模式适合开播前整理歌曲、歌词与 OBS 画面。点击图片可放大预览。</figcaption></figure>

## 第一次使用的建议流程

1. 选择直播时要播放的 BGM，并将音量调整到适合直播的大小。
2. 将这次直播需要的伴奏加入歌曲库或歌单。
3. 逐一修改歌曲的“显示歌名”；这个名称会显示在待播列表与 OBS 歌单画面中。
4. 前往“歌单外观”，将“拖放至 OBS”按钮拖入 OBS，再选择想使用的主题。
5. 测试播放一首伴奏，停止后确认 BGM 会自动恢复播放。
6. 实际操作一次选歌、播放与停止流程，熟悉直播时会使用的操作方式。
7. 保存项目，即完成第一次设置。

> 第一次使用不必先调整界面语言、项目／媒体文件夹位置，也不必建立测试待播列表。待播、封面、歌词与 OBS WebSocket 都可以在直播需要时再设置。

<a id="getting-started"></a>
## 01 · 开始使用

将 ZIP 完整解压到普通文件夹。在最外层找到下图图标的 `Singing Stream Savior.exe`，双击即可启动。这是唯一需要打开的程序；不要直接在 ZIP 中运行，也不需要进入其他资料文件夹寻找 EXE。

<div class="launch-target"><img src="{{ '/assets/images/singing-stream-savior.ico' | relative_url }}" alt="Singing Stream Savior 软件图标"><div><strong>Singing Stream Savior.exe</strong><span>平时只需要打开这个程序</span></div></div>

从“文件 > 新建项目”建立项目并保存 `.bgmsproj`。项目会保存歌曲、显示歌名、待播顺序、歌词关联和主题设置。已唱记录属于本次直播，不会写入普通项目存档；如果软件异常中断，重新启动时可从恢复快照找回待播与已唱进度。标题栏出现 `*` 表示还有未保存的更改。

<a id="library-and-playback"></a>
## 02 · 歌曲库与播放

歌曲库包含全部歌曲、我的最爱、最近播放与自定义歌单。固定分类无法删除；自定义歌单可依直播企划、曲风或活动分类。

<figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/song-library.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/song-library.png' | relative_url }}" alt="完整歌曲库，左侧显示全部歌曲、我的最爱、最近播放与自定义歌单，右侧显示歌曲表格"></a><figcaption>在左侧选择分类后，右侧表格与搜索范围会一起切换。</figcaption></figure>

要将歌曲加入分类，先选择一首或多首歌曲，按鼠标右键，展开“加入歌单”，再选择“我的最爱”或自定义歌单。这不会复制音频，也不会将歌曲移出“全部歌曲”；同一首歌可以加入多个歌单。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/zh-CN/add-to-playlist-menu.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/add-to-playlist-menu.png' | relative_url }}" alt="歌曲右键菜单包含编辑显示歌名、加入待播、加入歌单与删除歌曲"></a><figcaption>编辑显示歌名位于第一项，同一个菜单也可将歌曲加入待播或其他歌单。</figcaption></figure>

除了通过文件选择窗口导入，也可以把一首或多首本地音频直接拖进软件。单个 YouTube 视频网址可以粘贴或拖入并加入为一首歌曲；YouTube 播放列表网址也可以直接拖入，软件会识别其中的歌曲并导入为对应的自定义歌单，不必逐首粘贴网址。本地歌曲／歌唱伴奏支持 `MP3`、`WAV`、`FLAC`、`M4A`、`MP4`、`AAC`、`OGG`、`OPUS`、`WMA` 格式。YouTube 导入需要网络连接。

“显示歌名”会用于待播、已唱与 OBS；未填写时会使用文件名或 YouTube 标题。双击歌曲列会直接载入并播放歌曲，不会进入文字编辑。要修改名称，请对歌曲按右键，选择第一项“编辑显示歌名”；按 `Enter` 套用，按 `Esc` 取消。这个操作不会更改原始音频文件名。

歌曲右键菜单依次提供“编辑显示歌名”“加入待播”“加入歌单”（我的最爱或自定义歌单），以及符合当前分类的删除／从分类移除操作。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/zh-CN/display-title-edit.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/display-title-edit.png' | relative_url }}" alt="通过歌曲右键菜单编辑显示歌名"></a><figcaption>从右键菜单第一项打开编辑，只修改直播会显示的名称；左侧原始文件名保持不变。</figcaption></figure>

封面不是必需，仅在 Card 与 CD 主题下有特别效果。在歌曲菜单打开“嵌入封面”，选择搜索结果或本地图片，等待预览完成后按“嵌入”。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/zh-CN/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/cover-dialog.png' | relative_url }}" alt="显示搜索结果与封面预览的嵌入封面窗口"></a><figcaption>选择搜索结果并等待左侧封面预览载入完成后，即可嵌入。</figcaption></figure>

BGM 与歌唱伴奏拥有独立播放、音量与进度控制。歌唱伴奏还可以调整播放速度，并以半音为单位升降 Key：可放慢较难掌握的歌曲、配合练习节奏，或把音域太高／太低的伴奏调到更适合演唱的位置，不需要另外制作不同版本的音频。

软件会为每首歌曲分别记住调整过的速度与音高。切换歌曲后再次回来时会恢复该歌曲的设置；需要回到原始状态时，可重置为 `100%` 速度和 `0` 半音。这些调整只影响播放，不会修改原始文件或降低其音频质量。

待播不是播放歌曲的必要步骤；在歌曲表格中双击歌曲即可直接播放。待播适合管理观众点歌或之后预定演唱的歌曲，支持的主题会将第一首显示在 **Next On**，或将数首显示在 **Reserve**。播放完成的歌曲会移入“已唱”。正常关闭软件后，已唱记录不会带到下一次直播；若软件异常中断，则可从恢复快照恢复本次直播的待播与已唱进度。

<a id="lyrics"></a>
## 03 · 歌词功能

歌词可供主播在独立“歌词窗口”阅读，也可作为 OBS 歌词画面给观众观看。支持 LRC、SRT、VTT、纯文本、YouTube 字幕与 LRCLIB。

在歌曲的“歌词”页面点击“管理歌词…”，或直接点击歌曲列表中该歌曲“歌词”栏的图标，都可以打开管理歌词窗口。你可以在这里搜索、导入本地歌词、附加结果或取消歌词关联。搜索最多 50 条，优先显示同步歌词以及长度最接近伴奏的版本。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/zh-CN/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/lyrics-manager-linked.png' | relative_url }}" alt="管理歌词窗口中的导入歌词文件和取消歌词关联"></a><figcaption>已有歌词时，左下角仍可导入其他文件或取消当前关联。</figcaption></figure>

日文读音可关闭、在汉字上方显示小平假名，或在原文下方显示带空格的罗马拼音。自动读音仅供参考，特殊读法与演唱方式可能和原曲不同。

<figure class="manual-figure">
  <a href="{{ '/assets/images/demo-lyrics-preview.png' | relative_url }}">
    <img src="{{ '/assets/images/demo-lyrics-preview.png' | relative_url }}" alt="繁体中文歌词页面在伴奏播放时强调当前同步歌词" loading="lazy" decoding="async">
  </a>
  <figcaption>此示例使用繁体中文界面。预览中的歌词版面、字体、颜色与强调效果也会套用到 OBS。</figcaption>
</figure>

<a id="obs-and-themes"></a>
## 04 · 歌单外观与主题

在“歌单外观”选择主题，并检查 Now Singing、Set List、Next On 与 Reserve。基本主题依次为 Default、Transparent Black、Transparent White、Transparent Black v2、Transparent White v2、Card、CD、Signal Line、Stage Caption，之后才是精致主题。

<figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/theme-workspace.png' | relative_url }}" alt="歌单外观页面的主题卡片、设置、预览和说明"></a><figcaption>完整模式可同时比较主题、调整设置并查看 OBS 效果。</figcaption></figure>

<div class="figure-grid">
  <figure class="manual-figure">
    <a href="{{ '/assets/images/demo-theme-preview.png' | relative_url }}">
      <img src="{{ '/assets/images/demo-theme-preview.png' | relative_url }}" alt="繁体中文歌单外观页面预览 Transparent Black v2" loading="lazy" decoding="async">
    </a>
    <figcaption>软件内：选择主题，检查 Now Singing、Song List 与 Next On 的版面。截图界面为繁体中文。</figcaption>
  </figure>
  <figure class="manual-figure">
    <a href="{{ '/assets/images/demo-obs-result.png' | relative_url }}">
      <img src="{{ '/assets/images/demo-obs-result.png' | relative_url }}" alt="OBS 在直播背景上显示 Transparent Black v2 歌单与同步歌词" loading="lazy" decoding="async">
    </a>
    <figcaption>OBS 中：歌单与歌词可以分别缩放、裁切与移动，搭配自己的直播背景。</figcaption>
  </figure>
</div>

用“拖放至 OBS”建立本地 Browser Source，不需要启用 WebSocket。Card 使用直向封面卡片，CD 使用圆形唱片效果；其他主题与正常播放不要求封面。

主题画布不会限制 Browser Source 的使用方式。可以在 OBS 中按照自己的直播版面自由缩放、裁切与定位。Default 特别适合作为可自由组合的基础版面：参考预览中的虚线文字区域，沿虚线裁切想保留的 Now Singing、Set List 等区块，再放到自制背景的合适位置。透明与精致主题可以保留完整构图，也可以只裁取需要的部分。OBS 裁切只会改变当前场景中来源的显示范围，不会修改主题或歌曲资料。

“版面配置”位于画面设置最左侧。软件会读取主题声明的能力，只显示该主题真正可用的分页和控制项：

| 分页 | 可调整项目 |
| --- | --- |
| **版面配置** | 依主题支持情况调整主题颜色、背景透明度或项目自定义区块位置，并可恢复主题默认值 |
| **演唱** | Now Singing 的字体、大小、颜色、粗体／斜体／下划线、对齐和长歌名跑马灯速度 |
| **已唱** | Set List 的字体、大小、颜色、编号、文字样式、对齐和列表滚动速度 |
| **待播** | Reserve／Next On 独立的字体、大小、颜色、编号、文字样式与对齐 |

还可设置是否在 OBS 显示待播以及 1–10 首显示上限。启用 OBS WebSocket 后，才会出现 Set List 时间戳选项；时间不会显示在 Reserve／Next On 前。

预览背景可选透明、深色、浅色、自定义颜色或图片；图片支持符合、填满、拉伸。“调整预览”只改变软件内检查画面的大小与位置，不会改变 OBS 输出。不支持的控制项会直接隐藏，而不是以锁定状态保留。Default 提供最多文字与版面设置；旧版 Transparent Black／White 保留演唱与已唱文字设置；v2、Signal Line 与 Stage Caption 可调整各自支持的颜色和背景透明度。

<a id="obs-websocket"></a>
## 05 · OBS WebSocket（测试功能）

此功能默认关闭，目前主要用于读取 OBS 直播时间、记录伴奏开始时间，并在 Set List 歌名前显示时间戳。一般歌单与歌词画面不需要 WebSocket。

在 OBS Studio 28 以上版本打开“工具 > WebSocket 服务器设置”，启用服务器并确认端口（通常为 `4455`）与密码。再到软件“设置 > 高级设置”，启用 WebSocket，填写 `127.0.0.1`、端口和密码后按“连接”。

<figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/obs-websocket-settings.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/obs-websocket-settings.png' | relative_url }}" alt="高级设置中的 OBS WebSocket 说明和连接资料"></a><figcaption>启用选项后，连接按钮与状态显示才会出现。</figcaption></figure>

右下角绿灯为已连接，黄灯为连接中，红灯为未连接。正式直播前请先用测试直播确认时间戳。

<a id="workspace-modes"></a>
## 06 · 工作区模式

- **完整模式：** 显示所有资料、设置与大型预览，适合准备直播。
- **精简模式：** 保留选歌、播放器、待播和已唱，隐藏宽列与大型预览。
- **迷你模式：** 适合开播前已经完成待唱歌曲与画面设置，并已排好待播列表的主播。它会隐藏歌曲库与 BGM，只保留伴奏、待播、已唱和“歌词窗口”按钮；直播中可直接从待播列表选择歌曲播放。歌词窗口可以自由移动并调整文字大小，方便配合其他直播软件安排位置。

快捷键为 `Ctrl + Shift + M`。切换模式只会改变画面上显示的控制项目；正在播放的歌曲会继续播放，原有待播顺序与 OBS 画面不会被重置。每种模式会记住各自的窗口配置。

<div class="figure-grid">
  <figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/full-workspace.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/full-workspace.png' | relative_url }}" alt="简体中文完整模式"></a><figcaption>完整模式保留完整歌曲库、播放器和待播列表。</figcaption></figure>
  <figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/compact-workspace.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/compact-workspace.png' | relative_url }}" alt="简体中文精简模式"></a><figcaption>精简模式保留选歌与直播时常用控制。</figcaption></figure>
  <figure class="manual-figure manual-figure--portrait"><a href="{{ '/assets/images/zh-CN/mini-workspace.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/mini-workspace.png' | relative_url }}" alt="简体中文迷你模式"></a><figcaption>迷你模式把更多垂直空间留给待播列表。</figcaption></figure>
</div>

<a id="settings-and-troubleshooting"></a>
## 07 · 设置与疑难解答

设置包含界面语言、项目/媒体路径、YouTube 下载格式与测试中的 WebSocket。搬到其他电脑前，请备份 `.bgmsproj`、本地媒体和自行导入的歌词。

若出现 Qt platform plugin 错误，请重新下载并完整解压 ZIP，只打开最外层的 `Singing Stream Savior.exe`。不需要检查或打开资料文件夹中的内容。需要桌面入口时，请为这个外层 EXE 建立 Windows 快捷方式，不要移动文件本身。

找不到歌词时可缩短关键词、检查歌名/歌手、选择同步且长度接近的结果，或导入 LRC/SRT/VTT/纯文本。OBS 画面未更新时，请重新载入软件预览并刷新 OBS Browser Source。
