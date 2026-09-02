---
title: 2.1.0.0 高级直播、Profiles 与音频路由完整指南
description: 详细介绍 Singing Stream Savior 2.1.0.0 的直播控制、人声 Profiles、内置效果器、音频路由、Meter、录音、OBS 直连与系统托盘
lang: zh-CN
translation_key: advanced-streaming
published: true
---

# 高级直播模式

从 **2.1.0.0** 起，高级直播模式可以在 Singing Stream Savior 内混合 BGM、伴奏与处理后的麦克风，再把完整 Stream Mix 发送到 OBS、Discord 或其他直播软件。

<aside class="version-preview" role="note"><span class="version-preview__badge">2.1.0.0 新功能</span><div><strong>请将音频路由与人声 Profile 一起设置。</strong><p>音频路由负责输入、监听、录音与直播输出；Profile 负责人声音色。本页最终截图均来自 Release build，并与页面使用相同语言。</p></div></aside>

## 2.1.0.0 设置位置变更

- **YouTube 下载**已移至 **设置 → 文件与项目**，与项目路径、媒体文件夹集中在同一页。
- 原来的 **高级设置**已改名为 **直播时间戳**；OBS WebSocket、直播时间读取与 Set List 时间戳都在这里设置。
- 新增 **音频路由**分页，统一管理普通播放、高级混音、音频驱动、输出、监听与录音。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2>选择普通播放或高级直播模式</h2><p>先到<strong>设置 → 音频路由</strong>选择路由模式。普通播放模式只输出本程序的 BGM 与伴奏；高级直播模式会加入麦克风、Profile 效果链、完整混音与虚拟输出。</p></div>
  {% include localized-release-screenshot.html name="audio-routing.png" alt="2.1.0.0 音频路由页面的上半部" caption="这张实图显示右上方的 OBS 插件安装与虚拟输出入口、路由模式、Windows Audio、App Buffer、健康检查入口，以及来源、Profile、正式 Mix 与 Stream Output；监听、录音和路由图下半部需向下滚动查看。" %}
  {% include localized-release-screenshot.html name="audio-routing-bottom.png" alt="2.1.0.0 音频路由页面的下半部" caption="向下滚动后可查看监听、录音、完整路由线与延迟状态；监听延迟不会改变 OBS／正式输出中伴奏与人声的对齐。" %}
</div>

### 默认 Profile 与 BGM 闪避

- **直播聊天人声 Profile**会在播放 BGM 或聊天时自动应用。
- **唱歌人声 Profile**是播放伴奏时的默认值，单首歌曲的 Profile 标签可以覆盖它。通过麦克风按钮的右键菜单可暂时固定其他 Profile；选择**自动切换 Profile**后，才会重新按聊天／唱歌状态与歌曲标签自动切换。
- **BGM 闪避 · 自动**只在检测到麦克风人声时暂时降低 BGM，最多降低 9 dB，且不会提高麦克风音量。播放歌唱伴奏时会自动旁路，避免整首伴奏随每句人声忽大忽小；此时伴奏与人声的整体融合由 Mix Bus Compressor 处理。选择**关闭**可完全停用自动降低。

### App Buffer 检查与黄色状态

**程序安全 Buffer** 选单与 **检查 Buffer 稳定性…** 按钮会固定显示在同一行。使用 ASIO 输入时，该行位于 ASIO 采样率／硬件 Buffer 区块下方；即使 **Windows 播放兼容性**的高级设置保持收起，也能直接调整或打开检查。**快速检查**测试 512／1024 frames，约需 25 秒；**完整检查**测试 128／256／512／1024 frames，约需 5 分钟。检查只诊断歌回救星的 App Buffer，不会更改音频接口独立的 ASIO hardware buffer；完成后可以直接应用建议。128／256 等低数值只有在完整检查中的两轮独立严格观察均通过后，才会视为已针对当前设备、Profile、效果与路由完成验证。

检查本身不会播放合成测试音或伴奏。若已启用软件监听，测试期间仍可能听到实时麦克风；每次路由重新启动也可能造成短暂中断。确认后，歌回救星会自动停止本程序正在播放的 BGM 与伴奏，但无法代为停止 OBS 直播、Discord 通话或外部录音，仍需用户先行停止。音频接口的 **Direct Monitor** 不受本次检查影响。

{% include localized-release-screenshot.html name="audio-health-check.png" alt="尚未开始测试的 Buffer 稳定性检查窗口" caption="这张实图是测试前的初始状态；开始后才会逐行填入独立观察结果与预计延迟，完成判断后才会提供可直接应用的建议。" %}

黄色信息有两种不同含义。**检查音频中断**表示检测到麦克风／监听 underrun、overrun、正式 Stream 路径中断，或设备正在中断／恢复；**检查音频时序**则要求同一 callback、时钟或延迟核算异常持续约 2 秒。单次瞬时 callback peak 不代表已经发生可听见的断音。将鼠标停在“稳定性”上，可查看各路径计数、设备恢复、callback peak／period 与异常标志。

### 开发机实测与一般建议

{% include audio-test-results-zh-CN.html %}

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h2>创建并编辑人声 Profiles</h2><p>每个 Profile 都是一条可重复使用的人声效果链。可以加入内置效果或 VST3 Plugin、拖动调整处理顺序、暂时停用单个 Block，并在保存前试听。</p></div>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="profile-horizontal-rack.png" alt="人声 Profile 的横向效果器 Rack" caption="横向 Rack 按实际处理顺序显示整条效果链。" %}{% include localized-release-screenshot.html name="profile-vertical-rack.png" alt="人声 Profile 的纵向效果器 Rack" caption="纵向 Rack 使用相同的 Block、旁路、拖动顺序与编辑器，不会改变信号处理。" %}</div>
</div>

### Profile 编辑器会保存哪些内容

- 每个 Block 的启用状态、参数与顺序都会一起保存；重新打开项目后无需重新调整。
- 内置效果与 VST3 Plugin 可以混合使用，最多八个 VST3 插槽；VST3 参数 state 也会随 Profile 保存。
- 拖动 Block 会改变实际处理顺序；旁路只是暂时跳过效果，不会删除设置。
- 编辑时可以直接试听。切回直播操作、缩到系统托盘或关闭编辑器时，会退出 Profile 试听并恢复当前直播监听。
- Factory Profile 是可立即使用的起点；仍建议依麦克风、环境噪声、音域与唱法微调后另存为自己的 Profile。

{% include factory-profiles-reference.html %}

### 15 个内置人声效果器

每个内置效果器都提供实时信号图、Bypass 与说明按钮。简易模式提供实用的情境起点，进阶模式开放完整参数。

{% include one-knob-guide.html %}

| 分类 | 效果器 | 主要用途 |
| --- | --- | --- |
| 信号工具 | **Input Gain** | 调整进入效果链的电平，并避免最前端削波。 |
| 清理 | **Background Attenuation** | 在人声空隙降低风扇或房间底噪。 |
| 清理 | **Noise Gate** | 在句子之间关闭麦克风，减少键盘、鼠标等间歇声。 |
| 动态 | **Compressor** | 缩小轻声与大声的差距，控制 Threshold、Attack 与 Release。 |
| 音色 | **Equalizer (EQ)** | 去除多余低频、整理混浊并塑造不同音域的人声。 |
| 音色 | **Saturation** | 增加泛音、厚度或受控的粗糙感。 |
| 音色 | **Air Enhancer** | 增加存在感、空气感与亮度，并以 Trim 匹配音量。 |
| 清理 | **De-esser** | 压低刺耳的 S、SH 等齿音。 |
| 创意 | **Voice Changer** | 同时调整 Pitch 与 Formant，制作角色或特殊段落效果。 |
| 音高与人声 | **Harmony** | 按歌曲 Key 与演唱音高生成上方或下方三度和声；跟踪不确定时会平滑淡出。 |
| 音高与人声 | **Doubler** | 加入两层短延迟与轻微音高差的人声，增加厚度与立体声宽度。 |
| 空间 | **Delay** | 加入 slap、KTV 或抒情回声。 |
| 空间 | **Reverb** | 建立房间、Plate 或较长的空灵混响。 |
| 空间 | **Shimmer** | 在混响尾音加入高八度光晕，适合空灵段落。 |
| 动态 | **Limiter** | 在 Profile 末端拦截突发人声峰值。 |

Profile 处理后，完整直播输出还会依次经过 **Mix Bus Compressor**、**Stream Output Limiter** 与 Master 音量；这些属于整体输出，不会写回单个 Profile 的音色设置。Final Limiter 的开关状态按模式分别保存：普通播放默认关闭，第一次使用高级直播模式时默认开启；之后两种模式都会独立记住用户手动调整的状态。

展开下列效果器，可查看信号用途、主要参数、直播演唱建议与常见风险。

{% include effect-editor-gallery.html %}

{% include effects-reference-zh-CN.html %}

{% include profile-performance-controls.html %}

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">SONG AUTOMATION</p><h2>用歌曲标签自动切换 Profile</h2><p>歌曲列表的标签按钮可以指定人声 Profile。播放该首伴奏时，软件会自动切换到对应效果链；选择<strong>自动 · 演唱 Profile</strong>则使用当前默认的演唱 Profile。</p></div>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">LIVE CONTROL</p><h2>直播中手动切换效果器与麦克风静音</h2><p>工作区上方可立即套用指定 Profile，或交回歌曲标签自动切换。旁边的麦克风按钮可立即静音／取消静音；切换后请通过路由页电平表确认信号。</p></div>
  {% include localized-release-screenshot.html name="full-workspace.png" alt="2.1 高级直播模式完整工作区" caption="这张 Release 实图同时显示歌曲库、BGM／伴奏，以及高级模式的监听、录音、麦克风与 Profile 控制。" %}
</div>

### 主界面顶部控制项

- **监听来源**选择 BGM／伴奏、完整混音、BGM／伴奏加湿声、BGM／伴奏加干声，或只听处理后麦克风。
- **耳机按钮**开关当前监听，不会清除已选来源。
- **录音按钮**左键直接开始／停止；右键打开菜单，选择完整输出或监听内容、WAV 格式与保存文件夹。
- **麦克风按钮**左键立即静音／恢复；右键打开 Profile 菜单，可指定效果链或恢复自动切换，并与系统托盘菜单使用相同图标。
- **Profile 菜单**可手动指定效果链，或回到“自动切换 Profile”交由歌曲标签控制。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>选择监听内容并录制完整混音</h2><p>耳机按钮控制监听，可选择 BGM／伴奏、完整混音、加入湿声或干声的组合，或只听处理后麦克风。录音可捕捉完整输出或当前监听内容，并使用 WAV 16-bit PCM 或 WAV 32-bit Float。</p></div>
  <p><strong>避免回授：</strong>开启麦克风监听时请使用耳机，不要使用会被麦克风再次收到的扬声器。正式直播前先做短录音，确认人声、伴奏、音量与延迟。</p>
</div>

### 监听与录音不会改写 Profile 音色

监听是独立的耳机路径。Dry Cue 使用独立的软件采集尽量降低干声监听延迟，但不会改变正式 Mix、OBS 或录音路径；需要最低演唱监听延迟时，请优先使用音频接口的 hardware Direct Monitor。Meter 中的 BGM／伴奏监听与人声监听旋钮可在 0–200% 调整，只改变演唱者听到的平衡，不改变观众的 Stream Output，也不会重写 Profile 内的 Compressor、EQ 或其他效果参数。“完整输出”录音沿用正式 Stream Output 时间轴，BGM／伴奏与人声位于同一条正式时间线；Dry Cue 或其他软件监听延迟不会改变录音中两者的相对 offset。录制“监听内容”则适合检查自己的耳机平衡。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2>查看五条音频路径与系统负载</h2><p>高级直播模式可从“查看”或系统托盘菜单打开 Meter。它可以停靠在主窗口右侧或独立悬浮，并通过一颗按钮切换横向／纵向布局。</p></div>
  <p>五轨为 <strong>BGM／伴奏</strong>、<strong>人声（Profile 后、Mix 前）</strong>、<strong>直播输出</strong>、<strong>BGM／伴奏监听</strong>与<strong>人声监听</strong>。每轨显示 Peak；直播输出另显示三秒短期 <strong>LUFS-S</strong>。刻度旋钮范围为 0–200%，配色与主界面一致。</p>
  <p>横向 Meter 会在 BGM／伴奏与人声长时间失衡时提示提高人声或调低伴奏；它只提供建议，绝不自动改变任何增益。尚未检测到合格人声时不会提示；连续 5 秒未检测到合格人声会视为间奏，清除旧提示与判断数据，并从下一段人声重新累计。</p>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="audio-meter-horizontal.png" alt="使用横向电平条的五轨音量 Meter" caption="这张实图显示五轨 Peak 与 0–200% 控制；LUFS-S 和长时间平衡文字只有在满足量测条件时才会出现，因此未填入这张固定信号截图。" %}{% include localized-release-screenshot.html name="audio-meter-vertical.png" alt="使用纵向电平条的五轨音量 Meter 面板" caption="这张裁图显示纵向 Meter 面板本身与相同的五轨控制；它也可以停靠在主窗口右侧而不改变音频路由。" %}</div>
  <div class="effect-reference"><details><summary><strong>响度提示的判断方式</strong><span>避免把安静、换气或间奏误判为人声过小</span></summary><div class="effect-reference__body"><p>系统每 100 ms 检查一次实际直播路径中的 Mix 前 BGM／伴奏与 Profile 后人声。只有 BGM／伴奏确实处于 Playing 状态、有伴奏信号、路由与麦克风状态正常，并且人声通过活动条件时才会累计数据。Noise Gate 有状态数据时，该区段至少约 25% 的时间必须保持开启；Profile 后人声平均能量至少为 −45 dBFS，原始麦克风 Peak 至少为 −50 dBFS。显示失衡提示前，需要至少播放 10 秒、最近 12 秒内至少 6 秒合格人声，并包含两段各至少 1.2 秒、彼此间隔至少 300 ms 的人声；伴奏不比人声低超过 2 dB，或比人声更大的状态，还必须在最近的合格人声数据中累计至少 6 秒。只有合格人声平均能量不高于 −26 dBFS，才会同时提示“人声可能偏小”。如果最近数据中的原始或处理后人声 Peak 达到 −6 dBFS 或更高，或 Limiter 增益衰减超过 1 dB，则只保留调低伴奏的建议，不会要求提高人声。换曲、停止或重新播放、大幅跳转播放位置、切换 Profile、路由中断或等待恢复，以及隐藏 Meter，都会重置判断。这是信号活动与长时间响度比较，并非语音识别。</p></div></details></div>
  <p>右下角无边框 CPU／RAM 状态区分系统与本程序用量。高级直播模式的 Tooltip 还会显示 Buffer、callback、估计延迟及 underrun／overrun，并在负载可能影响稳定性时用颜色提醒。</p>
  {% include localized-release-screenshot.html name="system-resource-status.png" alt="主窗口右下角收起状态的 CPU 与 RAM 摘要" caption="这张图只显示鼠标尚未停留时的精简 CPU／RAM 摘要；指向文字后才会展开上文说明的系统／程序负载与高级音频健康资料。" size="medium" %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2>缩到系统托盘后继续控制直播</h2><p>设置可决定点击主窗口关闭按钮时缩到系统托盘或直接退出。缩到后台后，不需要重新打开完整窗口也能完成常用操作。</p></div>
  <p>右键菜单会按状态显示播放／继续、暂停、停止、从头播放、Key、速度、Profile、麦克风静音／恢复、歌词窗口、打开主窗口，以及高级直播模式限定的 Meter。选择“关闭软件”才会结束主程序与 helper。</p>
  {% include localized-release-screenshot.html name="notification-area-menu.png" alt="Singing Stream Savior 未播放时的 Windows 系统托盘菜单" caption="这张实图是未播放时的精简菜单；播放伴奏或启用高级直播模式后，才会增加上文说明的播放、Key、速度、Profile、麦克风与 Meter 操作。底部“结束”会完全关闭主程序与 helper。" size="medium" %}
  <p>全局快捷键分为“播放控制”和“麦克风／监听”，并提供默认按键；非高级直播模式会隐藏不适用的麦克风／监听项目。</p>
  {% include keyboard-shortcuts-reference.html %}
  {% include localized-release-screenshot.html name="keyboard-shortcuts.png" alt="设置页中按播放、麦克风与监听分类的键盘快捷键" caption="默认快捷键可直接修改；普通播放模式会隐藏需要高级直播模式的项目。" %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h2>使用 OBS 音频插件或虚拟音频设备</h2><p>两种方式都会传送经过 Profile、Mix Bus 与最终限制器的同一条 Stream Output。</p></div>
  <p>现有“安装 OBS 插件”菜单包含标准版、Portable 文件夹与移除。安装成功后会自动选择 <strong>Singing Stream Savior 音频（OBS 插件）</strong>输出；重新启动 OBS 并添加同名音频来源即可接收信号。</p>
  <p>使用 VB-CABLE 时，在歌回救星选择 CABLE Input，再在 OBS 的“音频输入采集”选择 CABLE Output。不要同时保留另一条原始麦克风，以免人声重复。</p>
</div>

```text
Singing Stream Savior → 虚拟音频线 → OBS／Discord
```

虚拟音频线是另外安装的 Windows 驱动。本程序不会替你下载、运行或更改驱动；请只从官方网站获取安装程序。

> **必须重新启动 Windows。** VB-Audio 官方安装说明要求安装完成后重新启动。重新打开 Singing Stream Savior 或刷新设备列表不能代替重启电脑。

<a id="vb-cable-installation"></a>
## VB-CABLE 安装教程

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
