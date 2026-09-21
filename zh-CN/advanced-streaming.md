---
title: "高级直播音频：麦克风效果与混音输出"
description: "从 2.1.0.0 起，高级直播模式可在 Singing Stream Savior 内混合 BGM、伴奏与 Profile 效果器处理后的麦克风，再把完整 Stream Mix 发送到 OBS、Discord 或其他通话／直播软件。"
lang: zh-CN
translation_key: advanced-streaming
published: true
---

# 高级直播音频：麦克风效果与混音输出

<section class="advanced-streaming-lead" data-article-lead markdown="1">

{% include advanced-streaming-benefits.html %}

<nav class="article-outline audio-output-targets" id="advanced-quick-start" aria-label="先选择混音的输出目的地">
  <strong>先选择混音的输出目的地</strong><ul><li><a href="#output-obs">输出信号发送至 OBS</a></li><li><a href="#output-discord">输出信号发送至 Discord（或其他通话软件）</a></li></ul>
</nav>

<a id="obs-output-walkthrough-title"></a>
<h2 id="output-obs">输出信号发送至 OBS</h2>
<p>只需发送到 OBS 时，先使用专用音频插件，无需安装虚拟音频设备。先完成以下四步，再按后面的说明调整默认演唱 Profile。</p>
{% include stream-route-steps.html target="obs" %}

<details class="audio-route-details" markdown="1"><summary>其他 OBS 接法与插件细节（需要时展开）</summary>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h3>使用 OBS 音频插件或虚拟音频设备</h3><p>两种方式都会传送经过 Profile、Mix Bus 与最终限制器的同一条 Stream Output。</p></div>
  <p>现有“安装 OBS 插件”菜单包含标准版、Portable 文件夹与移除。安装成功后会自动选择 <strong>Singing Stream Savior 音频（OBS 插件）</strong>输出；重新启动 OBS 并添加同名音频来源即可接收信号。</p>
  <p>使用 VB-CABLE 时，在歌回救星选择 CABLE Input，再在 OBS 的“音频输入采集”选择 CABLE Output。不要同时保留另一条原始麦克风，以免人声重复。</p>
</div>

{% include stream-route-steps.html target="virtual" %}

</details>

<a id="discord-output-walkthrough-title"></a>
<h2 id="output-discord">输出信号发送至 Discord（或其他通话软件）</h2>
<p>利用 VB-CABLE 等虚拟音频设备，将完成的混音作为通话软件的麦克风输入。无需先开 OBS：Singing Stream Savior 输出到 CABLE Input，Discord 从 CABLE Output 接收。</p>
{% include stream-route-steps.html target="discord" %}
<p>Discord 的通话传输仍可能重新编码、压缩或进行平台处理，因此音质可能比本地录音或 OBS 录像略差。这通常不是 Singing Stream Savior 路由异常；需要保留最高音质时，请以 OBS 或本地录音为准。</p>

<a id="vb-cable-installation"></a>
<details class="audio-route-details audio-route-details--installation" markdown="1"><summary>VB-CABLE 安装图解（尚未安装时展开）</summary>

虚拟音频线是另外安装的 Windows 驱动。本程序不会替你下载、运行或更改驱动；请只从官方网站获取安装程序。

> **必须重新启动 Windows。** VB-Audio 官方安装说明要求安装完成后重新启动。重新打开 Singing Stream Savior 或刷新设备列表不能代替重启电脑。

### VB-CABLE 安装教程

以下步骤适用于一般 64 位 Windows 10／11。Windows on ARM 或其他架构请依照 VB-Audio 官方说明选择对应的安装程序。

<a class="manual-cta" href="https://vb-audio.com/Cable/index.htm" target="_blank" rel="noopener noreferrer">打开 VB-Audio 官方下载页</a>

<div class="setup-steps">
  <section class="setup-step"><span class="setup-step-number">1</span><div><h3>下载当前 Windows 套件</h3><p>在官方页面的 Windows 区域选择 <strong>New Package</strong>。不要从第三方下载站获取音频驱动。</p><figure class="manual-figure"><a href="{{ '/assets/images/vb-cable/01-official-download.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/01-official-download.jpg' | relative_url }}" alt="VB-Audio 官方页面中用红框标出的 Windows 新版 VB-CABLE 套件" loading="lazy" decoding="async"></a><figcaption>套件名称和版本可能更新，请以官方页面标示的 New Package 为准。</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">2</span><div><h3>完整解压 ZIP</h3><p>对下载的 ZIP 选择“全部解压缩”，然后进入解压后的文件夹。不要直接在 ZIP 预览窗口中运行安装程序，否则可能出现缺少 INF 或驱动套件损坏。</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/02-extracted-folder.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/02-extracted-folder.jpg' | relative_url }}" alt="解压后的 VBCABLE Driver Pack45 文件夹" loading="lazy" decoding="async"></a><figcaption>确认当前打开的是普通文件夹，而不是压缩包内部。</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">3</span><div><h3>以管理员身份运行 64 位安装程序</h3><p>一般 64 位 Windows 请右键点击 <code>VBCABLE_Setup_x64.exe</code>，选择“以管理员身份运行”。只有 32 位 Windows 才使用不带 <code>_x64</code> 的版本。</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/03-run-x64-setup.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/03-run-x64-setup.jpg' | relative_url }}" alt="VB-CABLE 文件夹中的 VBCABLE Setup x64 安装程序" loading="lazy" decoding="async"></a><figcaption>请选择文件名包含 <code>_x64</code> 的程序。</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">4</span><div><h3>安装驱动</h3><p>Windows 请求更改权限时确认发布者，然后点击 <strong>Install Driver</strong>。等待安装完成，不要反复点击按钮或强制关闭窗口。</p><figure class="manual-figure"><a href="{{ '/assets/images/vb-cable/04-install-driver.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/04-install-driver.jpg' | relative_url }}" alt="VB-Audio Virtual Cable Driver Installation 窗口与 Install Driver 按钮" loading="lazy" decoding="async"></a><figcaption>后续驱动版本的界面可能变化，主要操作仍是 Install Driver。</figcaption></figure></div></section>
  <section class="setup-step setup-step--important"><span class="setup-step-number">5</span><div><h3>成功后重新启动 Windows</h3><p>看到 <strong>Installation Complete and Successful</strong> 后确认消息，保存工作并重新启动电脑。完成重启后才能继续设置 Singing Stream Savior、OBS 或 Discord。</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/05-restart-required.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/05-restart-required.jpg' | relative_url }}" alt="VB-CABLE 安装成功并要求重新启动系统的消息" loading="lazy" decoding="async"></a><figcaption>这不是可选提示；驱动需要重启才能完成注册。</figcaption></figure></div></section>
</div>

### 重启后连接 Singing Stream Savior

1. 打开 **设置 → 音频路由**，选择 **高级直播模式（混合输出）**。
2. 点击 **设置虚拟输出…**，再点击 **刷新设备**。
3. 将 Stream Output 设为 VB-CABLE 的播放端点，通常是 **CABLE Input**。
4. Monitor Output 请选择实体耳机或音频接口，**不要**选择同一个 CABLE Input。
5. 在 OBS 添加 **音频输入采集**，设备选择 VB-CABLE 的录音端点，通常是 **CABLE Output**。Discord 则将输入设备设为同一个 CABLE Output。
6. 播放测试歌曲并说话，确认 Stream Mix 与 OBS／Discord 电平都有响应，并且没有重复收音或回授。

> 如果 OBS 已经直接采集原始麦克风，使用完整 Stream Mix 后请停用重复的麦克风来源，否则人声可能叠加、变大或出现相位感。

### 找不到 CABLE Input／Output

- 确认安装后已经真正重新启动 Windows。
- 确认安装程序在完整解压后以管理员身份运行。
- 在 Singing Stream Savior 的虚拟输出设置中点击 **刷新设备**。
- 关闭可能占用音频设备的程序；仍然找不到时，请参阅 [VB-Audio 官方参考手册](https://vb-audio.com/Cable/VBCABLE_ReferenceManual.pdf)。

<small>VB-CABLE 名称、界面与安装程序属于 VB-Audio Software。此处截图仅用于说明安装步骤。</small>

</details>

</section>


<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2 id="route-modes">普通播放器与高级直播模式的区别</h2><p>先到<strong>设置 → 音频路由</strong>选择路由模式。普通播放模式只输出本程序的 BGM 与伴奏；高级直播模式会加入麦克风、Profile 效果链、完整混音与虚拟输出。</p></div>
  {% include localized-release-screenshot.html name="audio-routing.png" alt="2.1.0.0 音频路由页面的上半部" caption="上半部会显示 OBS 插件与虚拟输出、路由模式、Windows Audio、App Buffer、健康检查、来源、Profile、Mix 与 Stream Output；监听、录音和其余路由可向下滚动查看。" %}
  {% include localized-release-screenshot.html name="audio-routing-bottom.png" alt="2.1.0.0 音频路由页面的下半部" caption="下半部会显示监听、录音、路由线与延迟；监听延迟不会改变 OBS／Stream Output 中伴奏与人声的对齐。" %}
</div>

普通播放器保留 BGM／伴奏、歌词与歌单功能；高级直播模式还会处理麦克风并完成混音。Profile 主要处理麦克风，不是将伴奏也送入同一条人声效果链。Monitor 是自己听的路径，OBS／Discord 接收 Stream Output。

**麦克风 → Profile 效果器信号链 → 与 BGM／伴奏混音 → Stream Output → OBS／Discord**

<h2 id="singing-profile-defaults">设置默认演唱 Profile 与自动切换</h2>

在“设置 → 音频路由”选择演唱与聊天的默认 Profile，无需为每首歌设置标签。再确认主界面使用自动切换，而不是手动固定某组效果。

{% include profile-introduction.html %}

{% include stream-route-steps.html target="default" %}

[前往 Profile（直播效果器）设置 →]({{ '/zh-CN/profiles.html' | relative_url }})

<h2 id="audio-reference">设备、监听、录音与稳定性详细说明</h2>

输出与自动切换设置好后，再按需阅读以下内容。第一次正式使用前，请在没有直播、通话或外部录音时完成稳定性检查，无需每次开播重跑。

### 默认 Profile 与 BGM 闪避

- **直播聊天人声 Profile**会在播放 BGM 或聊天时自动应用。
- **唱歌人声 Profile**是播放伴奏时的默认值，单首歌曲的 Profile 标签可以覆盖它。通过麦克风按钮的右键菜单可暂时固定其他 Profile；选择**自动切换 Profile**后，才会重新按聊天／唱歌状态与歌曲标签自动切换。
- **BGM 闪避 · 自动**只在检测到麦克风人声时暂时降低 BGM，最多降低 9 dB，且不会提高麦克风音量。播放歌唱伴奏时会自动旁路，避免整首伴奏随每句人声忽大忽小；此时伴奏与人声的整体融合由 Mix Bus Compressor 处理。选择**关闭**可完全停用自动降低。

### App Buffer 检查与黄色状态

**程序安全 Buffer** 选单与 **检查 Buffer 稳定性…** 按钮会固定显示在同一行。使用 ASIO 输入时，该行位于 ASIO 采样率／硬件 Buffer 区块下方；即使 **Windows 播放兼容性**的高级设置保持收起，也能直接调整或打开检查。**快速检查**测试 512／1024 frames，约需 25 秒；**完整检查**测试 128／256／512／1024 frames，约需 5 分钟。检查只诊断歌回救星的 App Buffer，不会更改音频接口独立的 ASIO hardware buffer；完成后可以直接应用建议。128／256 等低数值只有在完整检查中的两轮独立严格观察均通过后，才会视为已针对当前设备、Profile、效果与路由完成验证。

检查本身不会播放合成测试音或伴奏。若已启用软件监听，测试期间仍可能听到实时麦克风；每次路由重新启动也可能造成短暂中断。确认后，歌回救星会自动停止本程序正在播放的 BGM 与伴奏，但无法代为停止 OBS 直播、Discord 通话或外部录音，仍需用户先行停止。音频接口的 **Direct Monitor** 不受本次检查影响。

{% include localized-release-screenshot.html name="audio-health-check.png" alt="完整 App Buffer 稳定性检查完成后的结果窗口" caption="完整检查完成示例：绿色勾选表示通过，较深的绿色行是这台电脑的建议值；黄色表示测试完成但安全余量不足。每台电脑的建议值与延迟都可能不同。" %}

> **128／256 显示“尚未验证”正常吗？** 正常。较低的 Buffer 只有在重复通过稳定性检查后才会被推荐；“尚未验证”不代表当时已经出现爆音。此时直接使用检查推荐的 512，只在确实需要降低软件监听延迟时再尝试较低数值。App Buffer 与音频接口的 ASIO hardware buffer 是两个不同设置。

黄色信息有两种含义。**检查音频中断**表示麦克风、监听、直播输出或正在恢复的设备可能不稳定；**检查音频时序**表示处理时间或同步状态持续异常。短暂峰值不一定代表已经出现可听见的断音，将鼠标停在“稳定性”上可查看详细信息。

### 建议设置：普通用户先这样使用

> **最简单的起点是有音频接口时使用 ASIO、程序安全 Buffer 设为“自动（推荐）· 512 frames”，并在 OBS 使用专用音频来源。** 一开始不用手动测试每一种 Buffer。

- 音频接口提供原厂 ASIO 时优先使用；接口 hardware buffer 保持已经稳定的设置，常见起点为 128 或 256 frames。它与 App Buffer 是两个独立设置。
- 没有 ASIO 时选择 Windows Audio，App Buffer 先保持自动 512，不要一开始就强制使用 128／256。
- 只有希望降低软件 Dry 监听延迟时才运行“完整检查”；仅在检查建议 256 时直接应用。演唱主监听仍优先使用音频接口的 Direct Monitor。
- OBS 优先使用 Singing Stream Savior 专用音频来源；只有其他程序也需要完整 Mix 时才使用 VB-CABLE 等虚拟音频设备。
- 完成首次路由设置后至少运行一次完整检查并应用建议值；之后无需每次开播都重跑。只有更换设备／驱动、大幅改变 Profile／VST3／路由，或状态变黄、实际听到爆音时才重新检查。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>选择监听内容并录制完整混音</h2><p>耳机按钮控制监听，可选择 BGM／伴奏、完整混音、加入湿声或干声的组合，或只听处理后麦克风。录音可捕捉完整输出或当前监听内容，并使用 WAV 16-bit PCM、WAV 24-bit PCM 或 WAV 32-bit Float。</p></div>
  <p><strong>避免回授：</strong>开启麦克风监听时请使用耳机，不要使用会被麦克风再次收到的扬声器。正式直播前先做短录音，确认人声、伴奏、音量与延迟。</p>
</div>

- **WAV 16-bit PCM** 文件最小、兼容性最高；**WAV 24-bit PCM** 是一般录音与后期处理的建议平衡；**WAV 32-bit Float** 保留最大的后期余量，但文件也最大。

### 监听与录音不会改写 Profile 音色

监听是独立的耳机路径。Dry Cue 使用独立的软件采集尽量降低干声监听延迟，但不会改变正式 Mix、OBS 或录音路径；需要最低演唱监听延迟时，请优先使用音频接口的 hardware Direct Monitor。Meter 中的 BGM／伴奏监听与人声监听旋钮可在 0–200% 调整，只改变演唱者听到的平衡，不改变观众的 Stream Output，也不会重写 Profile 内的 Compressor、EQ 或其他效果参数。“完整输出”录音沿用正式 Stream Output 时间轴，BGM／伴奏与人声位于同一条正式时间线；Dry Cue 或其他软件监听延迟不会改变录音中两者的相对 offset。录制“监听内容”则适合检查自己的耳机平衡。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2>查看六条音频路径与系统负载</h2><p>高级直播模式可从“查看”或系统托盘菜单打开 Meter。它可以停靠在主窗口右侧或独立悬浮，并通过一颗按钮切换横向／纵向布局。</p></div>
  <p>六轨依次为 <strong>BGM／伴奏</strong>、<strong>人声（Profile 后、Mix 前）</strong>、<strong>BGM／伴奏监听</strong>、<strong>人声监听</strong>、<strong>导唱监听</strong>与<strong>Master／Stream Output</strong>。每轨显示 Peak；Master／Stream Output 另显示三秒短期 <strong>LUFS-S</strong>。除导唱监听为 0–100% 外，其余旋钮为 0–200%；导唱只用于演唱者监听，不会进入 Stream 或 OBS。</p>
  <p>横向 Meter 会在 BGM／伴奏与人声持续失衡时提示提高人声或调低伴奏；它只提供建议，不会自动改变任何增益。安静、换气或歌曲间奏不会立刻被判断为人声过小。</p>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="audio-meter-horizontal.png" alt="使用横向电平条的六轨音量 Meter" caption="在横向音量表中向下滚动，可查看导唱监听和最后的 Master／直播输出。导唱音量为 0–100%，其余控制为 0–200%。" %}{% include localized-release-screenshot.html name="audio-meter-vertical.png" alt="使用纵向电平条的六轨音量 Meter 面板" caption="纵向 Meter 提供相同六轨，可停靠在主窗口右侧或独立悬浮；导唱仍只用于监听。" %}</div>
  <div class="effect-reference"><details><summary><strong>响度提示何时会出现？</strong><span>只在有足够伴奏与演唱数据时判断</span></summary><div class="effect-reference__body"><p>软件会先观察一段持续的伴奏与人声，再比较两者的长期平衡。歌曲刚开始、安静段落、换气、间奏、切换 Profile 或音频设备正在恢复时，都不会立刻显示建议。如果人声已经接近过载，软件也只会建议调低伴奏，不会要求继续提高人声。换曲、停止、重新播放或大幅移动播放位置后，会重新累计数据。</p></div></details></div>
  <p>右下角的 CPU／RAM 状态会显示本程序的使用率。将鼠标停在上面可以查看系统与本程序的详细资源用量；高级直播模式还会显示 Buffer、处理时间、估计延迟与音频中断次数。负载可能影响稳定性时会以颜色提示。</p>
  {% include localized-release-screenshot.html name="system-resource-status.png" alt="主窗口右下角收起状态的 CPU 与 RAM 摘要" caption="这张图只显示鼠标尚未停留时的精简 CPU／RAM 摘要；指向文字后才会展开上文说明的系统／程序负载与高级音频健康资料。" size="medium" %}
  {% include system-health-interpretation.html %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2>缩到系统托盘后继续控制直播</h2><p>设置可决定点击主窗口关闭按钮时缩到系统托盘或直接退出。缩到后台后，不需要重新打开完整窗口也能完成常用操作。</p></div>
  <p>右键菜单会按状态显示播放／继续、暂停、停止、从头播放、Key、速度、Profile、麦克风静音／恢复、歌词窗口、打开主窗口，以及高级直播模式限定的 Meter。选择“关闭软件”才会结束程序与播放功能。</p>
  {% include localized-release-screenshot.html name="notification-area-menu.png" alt="Singing Stream Savior 未播放时的 Windows 系统托盘菜单" caption="未播放时会显示精简菜单；播放伴奏或启用高级直播模式后，才会增加上文说明的播放、Key、速度、Profile、麦克风与 Meter 操作。底部“结束”会完全关闭程序。" size="medium" %}
  <p>全局快捷键分为“播放控制”和“麦克风／监听”，并提供默认按键；非高级直播模式会隐藏不适用的麦克风／监听项目。</p>
  {% include keyboard-shortcuts-reference.html %}
  {% include localized-release-screenshot.html name="keyboard-shortcuts.png" alt="设置页中按播放、麦克风与监听分类的键盘快捷键" caption="默认快捷键可直接修改；普通播放模式会隐藏需要高级直播模式的项目。" %}
</div>

<p id="profile-chain-heading">效果器细节已移到独立的 Profile 章节。 <a href="{{ '/zh-CN/profiles.html#profile-chain-heading' | relative_url }}">前往 Profile（直播效果器）设置 →</a></p>

## 2.1.0.0 设置位置变更

- **YouTube 下载**已移至 **设置 → 文件与项目**，与项目路径、媒体文件夹集中在同一页。
- 原来的 **高级设置**已改名为 **直播时间戳**；OBS WebSocket、直播时间读取与 Set List 时间戳都在这里设置。
- 新增 **音频路由**分页，统一管理普通播放、高级混音、音频驱动、输出、监听与录音。
