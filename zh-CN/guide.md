---
title: 歌回救星 2.1 使用说明
description: Singing Stream Savior 2.1.2.0 简体中文使用说明
lang: zh-CN
translation_key: home
manual_bundle: true
---

# 歌回救星 2.1 使用说明

歌回救星（Singing Stream Savior）是为歌回直播设计的 Windows 工具，将歌曲库、BGM、歌唱伴奏、待播、歌词、音频路由、人声效果与 OBS 画面整合在同一套流程中。本说明适用于 **2.1.2.0**。

<figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/lyrics-reading-preview.png' | relative_url }}" alt="完整模式中的歌词设置、OBS 预览、播放器和待播列表"></a><figcaption>完整模式适合开播前整理歌曲、歌词与 OBS 画面。点击图片可放大预览。</figcaption></figure>

## 第一次使用的建议流程

1. 设置直播 BGM：可拖入本地文件或 YouTube 链接，也可通过按钮选择；设置后会自动循环播放。
2. 将本地文件或 YouTube 链接拖入歌曲列表，或通过导入按钮添加伴奏。
3. 编辑伴奏的“显示歌名”；播放时会以这里的名称显示在歌单上。
4. 将歌曲加入“待播”，让歌单画面显示接下来准备演唱的歌曲。
5. 切换到“歌单外观”，通过自动预览选择主题，再将“拖放至 OBS”拖入 OBS。
6. 回到“直播操作”，从歌曲列表或待播双击歌曲开始演唱；BGM 会自动暂停并在结束后恢复。
7. 播放时若自动打开歌词搜索，请选择时长接近且歌手信息相符的同步歌词。
8. 切换到“歌词”页调整显示或手动管理歌词，再将“拖放至 OBS”拖入 OBS 显示同步歌词。

> 第一次使用不必先调整界面语言、项目／媒体文件夹位置，也不必建立测试待播列表。待播、封面、歌词与 OBS WebSocket 都可以在直播需要时再设置。

<a id="getting-started"></a>
## 01 · 开始使用

<section class="chapter-quick-start chapter-quick-start--single" aria-labelledby="getting-started-quick-start">
  <div>
    <p class="chapter-quick-start__eyebrow">第一次打开</p>
    <h2 id="getting-started-quick-start">5 分钟完成第一次测试播放</h2>
    <p class="chapter-quick-start__intro">按照下面的步骤，即可打开软件、设置循环播放的 BGM、测试第一首伴奏，并保存下次可以继续使用的项目。</p>
    <ol class="chapter-quick-start__steps">
      <li><div><strong>完整解压 ZIP</strong><span>将文件解压到普通文件夹，不要直接在 ZIP 中运行软件。</span></div></li>
      <li><div><strong>打开主程序</strong><span>在最外层文件夹双击 <code>Singing Stream Savior.exe</code>。</span></div></li>
      <li><div><strong>新建项目</strong><span>选择“文件 &gt; 新建项目”。</span></div></li>
      <li><div><strong>添加直播 BGM</strong><span>从 BGM 播放器选择本地文件或粘贴 YouTube 链接，也可直接把文件／链接拖进播放器；载入后会自动开始循环播放。</span></div></li>
      <li><div><strong>加入并播放一首歌</strong><span>把本地音频或单个 YouTube 链接拖进歌曲表格，再双击该歌曲。</span></div></li>
      <li><div><strong>保存项目</strong><span>选择“文件 &gt; 保存”，建立一个 <code>.bgmsproj</code> 文件。</span></div></li>
    </ol>
    <p class="chapter-quick-start__done"><strong>完成时：</strong>BGM 已载入并会自动循环；双击歌曲后，伴奏播放器会显示歌名与进度，BGM 也会自动暂停。保存项目后，窗口标题中的 <code>*</code> 会消失。</p>
  </div>
</section>

将 ZIP 完整解压到普通文件夹。在最外层找到下图图标的 `Singing Stream Savior.exe`，双击即可启动。这是唯一需要打开的程序；不要直接在 ZIP 中运行，也不需要进入其他资料文件夹寻找 EXE。

<div class="launch-target"><img src="{{ '/assets/images/singing-stream-savior.ico' | relative_url }}" alt="Singing Stream Savior 软件图标"><div><strong>Singing Stream Savior.exe</strong><span>平时只需要打开这个程序</span></div></div>

从“文件 > 新建项目”建立项目并保存 `.bgmsproj`。项目会保存歌曲、显示歌名、待播顺序、歌词关联和主题设置。已唱记录属于本次直播，不会写入普通项目存档；如果软件异常中断，重新启动时可从恢复快照找回待播与已唱进度。标题栏出现 `*` 表示还有未保存的更改。

### 跟随初次使用引导完成设置

从 2.0.2.0 开始，第一次进入操作界面时会自动打开八步初次使用引导。引导会切换到对应页面并高亮当前说明的区域，但不会修改项目或自动播放歌曲。之后可随时从“帮助 > 初次使用引导”重新打开。

<div class="figure-grid">
  {% include localized-release-screenshot.html name="full-workspace.png" alt="2.1 完整工作区与 BGM 播放器" caption="初次使用引导会切换到对应页面并高亮 BGM 设置、拖放与自动切换区域。" %}
  {% include localized-release-screenshot.html name="theme-workspace.png" alt="2.1 歌单外观工作区" caption="主题步骤会指出自动预览与“拖放至 OBS”的位置。" %}
</div>

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

<section class="manual-feature-update" aria-labelledby="library-bgm-205-title">
  <header class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.0.5.0</p><h2 id="library-bgm-205-title">更直观的歌曲列表与 BGM 播放列表</h2><p>歌曲库现在可切换传统列表与卡片列表；背景音乐也能预先整理成列表，配合直播主题快速切换。</p></header>
  <div class="manual-feature-update__copy"><h3>歌曲列表显示</h3><p><strong>传统列表仍是默认值</strong>；可在“设置 → 一般 → 歌曲列表显示”改用卡片列表。卡片会突出显示观众看到的歌名，同时保留来源、封面与歌词状态。双击卡片会播放歌曲，铅笔图标则用于编辑显示歌名。</p></div>
  <div class="manual-feature-update__copy"><h3>BGM 播放列表</h3><p>可保存多首本地音频或 YouTube 音源，为每首 BGM 添加备注，并直接拖动调整顺序。正在播放的项目会清楚高亮；YouTube 播放列表可选择只加入当前视频或全部项目。</p><ul><li><strong>单曲循环（默认）</strong></li><li><strong>全部循环</strong></li><li><strong>全部随机循环</strong></li></ul></div>
  {% include localized-release-screenshot.html name="bgm-playlist.png" alt="2.1 展开的 BGM 播放列表" caption="可直接辨认备注、来源与正在播放的项目。" %}
</section>

清唱、自弹自唱或其他不使用媒体文件的演出，可从搜索栏旁的“＋ 无伴奏演出”新增。输入观众会看到的显示歌名，再选择手动结束或可选的预计时间；时间按钮每次调整 10 秒，也支持鼠标滚轮。开始后会像普通伴奏一样暂停 BGM，并更新 Now Singing、待播与已唱；结束后恢复原本的 BGM。项目会保存到“无伴奏演出”智能分类与当前项目，不会建立假的静音音频文件。

封面不是必需，仅在 Card 与 CD 主题下有特别效果。在歌曲菜单打开“嵌入封面”，选择搜索结果或本地图片，等待预览完成后按“嵌入”。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/zh-CN/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/cover-dialog.png' | relative_url }}" alt="显示搜索结果与封面预览的嵌入封面窗口"></a><figcaption>选择搜索结果并等待左侧封面预览载入完成后，即可嵌入。</figcaption></figure>

BGM 与歌唱伴奏拥有独立播放、音量与进度控制。歌唱伴奏还可以调整播放速度，并以半音为单位升降 Key：可放慢较难掌握的歌曲、配合练习节奏，或把音域太高／太低的伴奏调到更适合演唱的位置，不需要另外制作不同版本的音频。

2.1 中的 BGM 与歌唱伴奏音量改用更符合人耳感知的响度曲线；本地文件和 YouTube 播放使用相同的滑块数值到输出增益映射。更新会保留现有滑块数值，但同一数值的听感可能与旧版不同；第一次直播前请重新确认伴奏与人声的平衡。这是音量控制曲线，不是自动响度标准化。

软件会为每首歌曲分别记住调整过的速度与音高。切换歌曲后再次回来时会恢复该歌曲的设置；需要回到原始状态时，可重置为 `100%` 速度和 `0` 半音。这些调整只影响播放，不会修改原始文件或降低其音频质量。

待播不是播放歌曲的必要步骤；在歌曲表格中双击歌曲即可直接播放。准备观众点歌或预定演唱顺序时，可将项目歌曲列表或全局歌曲库中的歌曲直接拖入“待播”，也可通过右键菜单添加。待播项目可以拖动重新排序，也可双击开始播放。歌曲开始播放时仍会留在待播，自然播放完成或最后按停止后才移入“已唱”。

伴奏播放器的模式按钮会依序切换 **单次播放、单曲循环、全曲依序自动播放、全曲随机播放**。单曲循环不会在每次循环后重复加入已唱，最后停止时只加入一次。两种全曲模式会在每首完成后移入已唱并继续下一首，期间保持 BGM 暂停；整份待播播完后才停止并恢复 BGM。随机模式只会从剩余待播中选择，因此同一轮不会重复已完成的歌曲。Windows 通知区域的右键菜单也有相同选项。

待播为空时，在全曲模式按播放只会显示提示，不会打断 BGM。从歌曲列表直接双击歌曲则会自动回到 **单次播放**。在“歌单外观”中开启“在 OBS 显示待播列表”后，可选择“只显示下一首”或最多显示 2、3、5、10 首；一首会显示为 **Next On**，多首会显示为 **Reserve**。正常关闭软件后，已唱记录不会带到下一次直播；若软件异常中断，则可从恢复快照恢复本次直播的待播与已唱进度。

<a id="lyrics"></a>
## 03 · 歌词功能

歌词可供主播在独立“歌词窗口”阅读，也可作为 OBS 歌词画面给观众观看。支持 LRC、SRT、VTT、纯文本、YouTube 字幕与 LRCLIB。

在歌曲的“歌词”页面点击“管理歌词…”，或直接点击歌曲列表中该歌曲“歌词”栏的图标，都可以打开管理歌词窗口。你可以在这里搜索、导入本地歌词、附加结果或取消歌词关联。搜索会合并 LRCLIB 与 YouTube 字幕，最多显示 50 条，并依同步状态、语言、伴奏长度与歌手信息排序。YouTube 暂时限制字幕下载时，其他候选仍会保留，并提示稍后重试。

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/zh-CN/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/lyrics-manager-linked.png' | relative_url }}" alt="管理歌词窗口中的导入歌词文件和取消歌词关联"></a><figcaption>已有歌词时，左下角仍可导入其他文件或取消当前关联。</figcaption></figure>

日文读音可关闭、在汉字上方显示小平假名、在原文下方显示带空格的罗马拼音，或同时显示平假名与罗马拼音。韩文歌词也可显示保留词间空格的罗马拼音。“即时预览 + OBS”共用一组设置，独立“歌词窗口”使用另一组设置；主界面、歌词窗口与 OBS 会通过同一个离线后台读音服务取得一致结果。自动读音仅供参考，特殊读法与演唱方式可能和原曲不同。

在独立“歌词窗口”中，点击有时间戳的任一行歌词，可让伴奏跳到该行的时间点。此功能只适用于 LRC 等同步歌词；纯文本歌词没有可跳转的时间。

{% include localized-release-screenshot.html name="lyrics-reading-preview.png" alt="2.1 伴奏播放时的同步歌词与读音预览" caption="预览中的歌词排版、字体、颜色、当前行强调和读音设置也会应用到 OBS。" %}

如果歌词与伴奏不同步，不必换算正负值：歌词已经唱到却还没出现时，选择“歌词太晚 → 提前”；歌词比演唱更早出现时，选择“歌词太早 → 延后”。滑杆中央代表同步，向左是提前，向右是延后；重设图标会恢复为 `0 ms`。

“当前行之前”与“当前行之后”可以分别用滑杆或数值栏设置显示行数。歌曲接近开头或结尾时，实际可显示的前后歌词可能少于设置值。调整偏移后，即使伴奏暂停，预览、歌词窗口和 OBS 歌词数据也会立即同步。

{% include localized-release-screenshot.html name="lyrics-viewer.png" extra_class="manual-figure--medium" alt="2.1 歌词窗口中的提前、延后与同步歌词" caption="歌词窗口使用相同的时间校正方式；点击有时间戳的歌词可跳转，歌曲回到开头时列表也会回到顶部。" %}

<a id="obs-and-themes"></a>
## 04 · 歌单外观与主题

在“歌单外观”选择主题，并检查 Now Singing、Set List、Next On 与 Reserve。基本主题依次为 Default、Transparent Black、Transparent White、Transparent Black v2、Transparent White v2、Card、CD、Signal Line、Stage Caption，之后才是精致主题。

<figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/theme-workspace.png' | relative_url }}" alt="歌单外观页面的主题卡片、设置、预览和说明"></a><figcaption>完整模式可同时比较主题、调整设置并查看 OBS 效果。</figcaption></figure>

<div class="figure-grid">
  <figure class="manual-figure">
    <a href="{{ '/assets/images/demo-obs-result.png' | relative_url }}">
      <img src="{{ '/assets/images/demo-obs-result.png' | relative_url }}" alt="OBS 在直播背景上显示 Transparent Black v2 歌单与同步歌词" loading="lazy" decoding="async">
    </a>
    <figcaption>OBS 中：歌单与歌词可以分别缩放、裁切与移动，搭配自己的直播背景。</figcaption>
  </figure>
</div>

Card 使用直向封面卡片，CD 使用圆形唱片效果；其他主题与正常播放不要求封面。按住“拖放至 OBS”并拖进 OBS，可直接建立本地 Browser Source。若直播中无法拖入，可单击同一个按钮复制来源路径，在 OBS 新增 Browser Source 后粘贴到网址栏，并设置为 1920 × 1080；不必勾选“本地文件”。两种方式都不需要启用 WebSocket。

主题画布不会限制 Browser Source 的使用方式。可以在 OBS 中按照自己的直播版面自由缩放、裁切与定位。Default 特别适合作为可自由组合的基础版面：参考预览中的虚线文字区域，沿虚线裁切想保留的 Now Singing、Set List 等区块，再放到自制背景的合适位置。透明与精致主题可以保留完整构图，也可以只裁取需要的部分。OBS 裁切只会改变当前场景中来源的显示范围，不会修改主题或歌曲资料。

“版面配置”位于画面设置最左侧。软件会读取主题声明的能力，只显示该主题真正可用的分页和控制项：

| 分页 | 可调整项目 |
| --- | --- |
| **版面配置** | 依主题支持情况调整主题颜色、背景透明度或项目自定义区块位置，并可恢复主题默认值 |
| **演唱** | Now Singing 的字体、大小、颜色、粗体／斜体／下划线、对齐和长歌名跑马灯速度 |
| **已唱** | Set List 的字体、大小、颜色、编号、文字样式、对齐和列表滚动速度 |
| **待播** | Reserve／Next On 独立的字体、大小、颜色、编号、文字样式与对齐 |

还可设置是否在 OBS 显示待播，并选择只显示下一首或最多显示 2、3、5、10 首。启用 OBS WebSocket 后，才会出现 Set List 时间戳选项；时间不会显示在 Reserve／Next On 前。

预览背景可选透明、深色、浅色、自定义颜色或图片；图片支持符合、填满、拉伸。“调整预览”只改变软件内检查画面的大小与位置，不会改变 OBS 输出。不支持的控制项会直接隐藏，而不是以锁定状态保留。Default 提供最多文字与版面设置；旧版 Transparent Black／White 保留演唱与已唱文字设置；v2、Signal Line 与 Stage Caption 可调整各自支持的颜色和背景透明度。

<a id="obs-websocket"></a>
## 05 · 直播时间戳获取

此功能默认关闭，目前主要用于读取 OBS 直播时间、记录伴奏开始时间，并在 Set List 歌名前显示时间戳。一般歌单与歌词画面不需要 WebSocket。

在 OBS Studio 28 以上版本打开“工具 > WebSocket 服务器设置”，启用服务器并确认端口（通常为 `4455`）与密码。关闭连接信息后按“确定”保存并关闭设置。在歌回救星中打开“设置 > 直播时间戳”，启用 WebSocket，填写 `127.0.0.1`、端口和密码后按“连接”。OBS 密码属于本机连接凭据，请勿公开分享包含密码的设置截图。

右下角绿灯为已连接，黄灯为连接中，红灯为未连接。正式直播前请先用测试直播确认时间戳。

<a id="uvr-vocal-removal"></a>
## 06 · UVR 人声消除

**UVR 为 2.1.1 新功能，HP 与 MP3 于 2.1.2 新增。** 将音频文件或 YouTube 链接直接拖入待处理列表即可。标题会自动识别，超过 15 分钟的视频可先选择范围。每首歌可分别选择 HP/MDX，以及保留和声/完全消除人声。新安装默认使用 HP 保留和声，并会记住你更改的默认设置。点击铅笔可编辑歌名；开始后本批设置会锁定，最小化后仍会继续处理。

输出支持 WAV、FLAC、MP3（320 kbps），以及默认 48 kHz 或可选 44.1 kHz。无法使用 GPU 时会自动改用 CPU，并在主窗口左下角显示说明。输出文件夹统一在“设置 > 文件与项目”管理。

沐橙个人听感推荐 HP，实测认为较能保留伴奏细节，但效果可能因歌曲或曲风而有差异，仅供参考。相同条件实测，HP 会比 MDX 慢，实际速度依歌曲与电脑而异。

完成后可逐首或一次全部把伴奏导入歌曲列表。输出文件夹会保留 `(Instrumental)` 与 `(Vocal)` 两个文件，歌曲列表只会导入实际伴奏。

<a id="workspace-modes"></a>
## 07 · 工作区模式

- **完整模式：** 显示所有资料、设置与大型预览，适合准备直播。
- **精简模式：** 保留选歌、播放器、待播和已唱，隐藏宽列与大型预览。
- **迷你模式：** 适合开播前已经完成待唱歌曲与画面设置，并已排好待播列表的主播。它会隐藏歌曲库与 BGM，只保留伴奏、待播、已唱和“歌词窗口”按钮；直播中可直接从待播列表选择歌曲播放。歌词窗口可以自由移动并调整文字大小，方便配合其他直播软件安排位置。

快捷键为 `Ctrl + Shift + M`。切换模式只会改变画面上显示的控制项目；正在播放的歌曲会继续播放，原有待播顺序与 OBS 画面不会被重置。每种模式会记住各自的窗口配置。

<div class="figure-grid">
  <figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/full-workspace.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/full-workspace.png' | relative_url }}" alt="简体中文完整模式"></a><figcaption>完整模式保留完整歌曲库、播放器和待播列表。</figcaption></figure>
  <figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/compact-workspace.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/compact-workspace.png' | relative_url }}" alt="简体中文精简模式"></a><figcaption>精简模式保留选歌与直播时常用控制。</figcaption></figure>
  <figure class="manual-figure manual-figure--portrait"><a href="{{ '/assets/images/zh-CN/mini-workspace.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/mini-workspace.png' | relative_url }}" alt="简体中文迷你模式"></a><figcaption>迷你模式把更多垂直空间留给待播列表。</figcaption></figure>
</div>

不需要保留主窗口时，可在设置中让关闭按钮把 Singing Stream Savior 缩到 Windows 通知区域而不是退出。播放会在后台继续；托盘菜单与全局快捷键仍可操作播放、Key、速度、Profile、麦克风、歌词窗口与 Meter。只有选择托盘菜单中的“关闭软件”，才会完整结束程序。

{% include localized-release-screenshot.html name="notification-area-menu.png" alt="Singing Stream Savior 未播放时的 Windows 通知区域右键菜单" caption="未播放时菜单保持精简；播放伴奏或开启高级直播模式后，会增加相应的播放、Key、速度、Profile、麦克风与 Meter 项目。" size="medium" %}

<a id="settings-and-troubleshooting"></a>
## 08 · 设置与疑难解答

搬到其他电脑前，请备份 `.bgmsproj`、本地媒体和自行导入的歌词。

最外层的 `Singing Stream Savior.exe` 会通过 Launcher 1.2 检查更新。没有新版本时不会停留在空白提示页，检查完成后会自动打开已验证的当前版本；离线或尚未到下一次检查时间时，也会继续启动当前版本。

发现新版本时，卡片式提示会显示当前版本、目标版本与本地化更新内容。选择“稍后”或关闭询问窗口，会直接启动当前版本且不改动文件；只有选择“立即更新”才开始下载。

<figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/launcher-update-prompt.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/launcher-update-prompt.png' | relative_url }}" alt="Launcher 1.2 卡片式更新提示，显示版本与更新内容"></a><figcaption>更新内容显示在可滚动卡片中；“稍后”保留当前版本，“立即更新”开始验证更新。</figcaption></figure>

下载期间可以按“取消”或关闭窗口，继续使用当前版本。进入最后的安装阶段后，关闭操作会暂时停用；如果更新意外中断，下次启动时会自动修复或完成更新。

<figure class="manual-figure"><a href="{{ '/assets/images/zh-CN/launcher-update-progress.png' | relative_url }}"><img src="{{ '/assets/images/zh-CN/launcher-update-progress.png' | relative_url }}" alt="Launcher 1.2 下载、验证与安装更新的进度画面"></a><figcaption>启动器会先确认下载完整，再安全切换到新版本。</figcaption></figure>

请保持外层启动器与程序文件夹内其他文件的原有位置，不要只移动其中一部分。如果必须使用旧版，请将官方旧版完整 ZIP 解压到**另一个文件夹**，并先备份 `.bgmsproj` 与媒体。若更新仍无法完成，请下载最新版完整 ZIP，不要混合覆盖不同版本的程序文件。

若出现 Qt platform plugin 错误，请重新下载并完整解压 ZIP，只打开最外层的 `Singing Stream Savior.exe`。不需要检查或打开资料文件夹中的内容。需要桌面入口时，请为这个外层 EXE 建立 Windows 快捷方式，不要移动文件本身。

找不到歌词时可缩短关键词、检查歌名/歌手、选择同步且长度接近的结果，或导入 LRC/SRT/VTT/纯文本。OBS 画面未更新时，请重新载入软件预览并刷新 OBS Browser Source。

若最近项目中的 `.bgmsproj` 已被移动或删除，该失效项目会自动从列表移除。
