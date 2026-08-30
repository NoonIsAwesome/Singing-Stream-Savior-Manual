---
title: 2.1.0.0 高级直播、Profiles 与音频路由完整指南
description: 详细介绍 Singing Stream Savior 2.1.0.0 的直播控制、人声 Profiles、内置效果器、音频路由、Meter、录音、OBS 直连与系统托盘
lang: zh-CN
translation_key: advanced-streaming
published: false
---

# 高级直播模式

从 **2.1.0.0** 起，高级直播模式可以在 Singing Stream Savior 内混合 BGM、伴奏与处理后的麦克风，再把完整 Stream Mix 发送到 OBS、Discord 或其他直播软件。

<aside class="version-preview" role="note"><span class="version-preview__badge">2.1.0.0 PREVIEW</span><div><strong>本页介绍的是尚未发布版本。</strong><p>当前公开下载版可能还没有以下分页与控制项。截图来自繁体中文预览版，正式软件会依所选语言显示；画面与名称仍可能在发布前微调。</p></div></aside>

## 2.1.0.0 设置位置变更

- **YouTube 下载**已移至 **设置 → 文件与项目**，与项目路径、媒体文件夹集中在同一页。
- 原来的 **高级设置**已改名为 **直播时间戳**；OBS WebSocket、直播时间读取与 Set List 时间戳都在这里设置。
- 新增 **音频路由**分页，统一管理普通播放、高级混音、音频驱动、输出、监听与录音。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2>选择普通播放或高级直播模式</h2><p>先到<strong>设置 → 音频路由</strong>选择路由模式。普通播放模式只输出本程序的 BGM 与伴奏；高级直播模式会加入麦克风、Profile 效果链、完整混音与虚拟输出。</p></div>
  <div class="feature-shot-grid feature-shot-grid--wide">
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}" alt="音频路由分页中的普通播放与高级直播模式菜单" loading="lazy" decoding="async"></a><figcaption>不处理麦克风时可使用普通播放；需要把完整混音发送到 OBS 或 Discord 时再选择高级直播模式。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}" alt="ASIO 与 Windows Audio 音频驱动选项" loading="lazy" decoding="async"></a><figcaption>ASIO 适合低延迟演唱；Windows Audio 兼容模式更容易搭配一般 Windows 设备。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}" alt="自动、WASAPI、DirectSound 与 MME 播放方式" loading="lazy" decoding="async"></a><figcaption>“自动（推荐）”会优先选择合适方式；只有排查设备兼容性时才需要手动指定。</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}" alt="普通播放模式中 BGM 到系统输出的路由图和电平表" loading="lazy" decoding="async"></a><figcaption>路由图会显示实际信号流向、预计延迟、Buffer、采样率与稳定度。</figcaption></figure>
  </div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}" alt="包含 BGM、麦克风、人声 Profile、直播混音、虚拟输出、监听与录音的完整音频路由图" loading="lazy" decoding="async"></a><figcaption>高级直播模式把信号来源、两组人声 Profile、混音、Stream Output、监听与录音放在同一张可视化路由图中。</figcaption></figure>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h2>创建并编辑人声 Profiles</h2><p>每个 Profile 都是一条可重复使用的人声效果链。可以加入内置效果或 VST3 Plugin、拖动调整处理顺序、暂时停用单个 Block，并在保存前试听。</p></div>
  <div class="feature-shot-grid"><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}" alt="高音域演唱 Profile 的动态抑制、EQ、混响与限制器效果链" loading="lazy" decoding="async"></a><figcaption>可为高低音域、KTV、古风等演唱场景建立不同效果链。</figcaption></figure><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}" alt="直播聊天 Profile 的输入增益、噪声门与限制器效果链" loading="lazy" decoding="async"></a><figcaption>聊天与演唱 Profile 分开管理，不必直播中逐项重调效果器。</figcaption></figure></div>
</div>

### Profile 编辑器会保存哪些内容

- 每个 Block 的启用状态、参数与顺序都会一起保存；重新打开项目后无需重新调整。
- 内置效果与 VST3 Plugin 可以混合使用，最多八个 VST3 插槽；VST3 参数 state 也会随 Profile 保存。
- 拖动 Block 会改变实际处理顺序；旁路只是暂时跳过效果，不会删除设置。
- 编辑时可以直接试听。切回直播操作、缩到系统托盘或关闭编辑器时，会退出 Profile 试听并恢复当前直播监听。
- Factory Profile 是可立即使用的起点；仍建议依麦克风、环境噪声、音域与唱法微调后另存为自己的 Profile。

### 12 个内置人声效果器

所有效果器使用一致的雾面面板、刻度旋钮、实时信号图与说明按钮。简易模式提供情境起点，进阶模式开放完整参数。

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
| 空间 | **Delay** | 加入 slap、KTV 或抒情回声。 |
| 空间 | **Reverb** | 建立房间、Plate 或较长的空灵混响。 |
| 动态 | **Limiter** | 在 Profile 末端拦截突发人声峰值。 |

Profile 处理后，完整直播输出还会依次经过 **Mix Bus Compressor**、**Stream Output Limiter** 与 Master 音量；这些属于整体输出，不会写回单个 Profile 的音色设置。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">SONG AUTOMATION</p><h2>用歌曲标签自动切换 Profile</h2><p>歌曲列表的标签按钮可以指定人声 Profile。播放该首伴奏时，软件会自动切换到对应效果链；选择<strong>自动 · 演唱 Profile</strong>则使用当前默认的演唱 Profile。</p></div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}" alt="歌曲列表中选择自动或特定人声 Profile 的标签菜单" loading="lazy" decoding="async"></a><figcaption>适合为不同音域、曲风或特殊歌曲预先配置效果；正式演唱前仍建议先试唱并确认音量。</figcaption></figure>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">LIVE CONTROL</p><h2>直播中手动切换效果器与麦克风静音</h2><p>工作区上方可立即套用指定 Profile，或交回歌曲标签自动切换。旁边的麦克风按钮可立即静音／取消静音；切换后请通过路由页电平表确认信号。</p></div>
  <figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}" alt="工作区上方的监听来源、耳机、录音、麦克风静音与 Profile 控制" loading="lazy" decoding="async"></a><figcaption>手动选择会立即套用；要重新依歌曲标签切换，请选择“自动切换 Profile”。</figcaption></figure>
</div>

### 主界面顶部控制项

- **监听来源**选择 BGM／伴奏、完整混音、BGM／伴奏加湿声、BGM／伴奏加干声，或只听处理后麦克风。
- **耳机按钮**开关当前监听，不会清除已选来源。
- **录音按钮**直接开始／停止；旁边菜单选择完整输出或监听内容、WAV 格式与保存文件夹。
- **麦克风按钮**立即静音／恢复，并与系统托盘菜单使用相同图标。
- **Profile 菜单**可手动指定效果链，或回到“自动切换 Profile”交由歌曲标签控制。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>选择监听内容并录制完整混音</h2><p>耳机按钮控制监听，可选择 BGM／伴奏、完整混音、加入湿声或干声的组合，或只听处理后麦克风。录音可捕捉完整输出或当前监听内容，并使用 WAV 16-bit PCM 或 WAV 32-bit Float。</p></div>
  <div class="feature-shot-grid feature-shot-grid--compact"><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}" alt="BGM、完整混音、湿声干声与处理后麦克风的监听来源菜单" loading="lazy" decoding="async"></a><figcaption>监听只影响自己耳机听到的内容，Stream Output 仍依照路由设置输出。</figcaption></figure><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}" alt="完整输出、监听内容、WAV 格式与录音文件夹选项" loading="lazy" decoding="async"></a><figcaption>32-bit Float 适合保留后期空间但文件较大；一般交付可选择 16-bit PCM。</figcaption></figure></div>
  <p><strong>避免回授：</strong>开启麦克风监听时请使用耳机，不要使用会被麦克风再次收到的扬声器。正式直播前先做短录音，确认人声、伴奏、音量与延迟。</p>
</div>

### 监听与录音不会改写 Profile 音色

监听是独立的耳机路径。Meter 中的 BGM／伴奏监听与人声监听旋钮可在 0–200% 调整，只改变演唱者听到的平衡，不改变观众的 Stream Output，也不会重写 Profile 内的 Compressor、EQ 或其他效果参数。录制“完整输出”适合检查观众实际收到的混音；录制“监听内容”适合检查自己的耳机平衡。

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2>查看五条音频路径与系统负载</h2><p>高级直播模式可从“查看”或系统托盘菜单打开 Meter。它可以停靠在主窗口右侧或独立悬浮，并通过一颗按钮切换横向／纵向布局。</p></div>
  <p>五轨为 <strong>BGM／伴奏</strong>、<strong>人声（Profile 后、Mix 前）</strong>、<strong>直播输出</strong>、<strong>BGM／伴奏监听</strong>与<strong>人声监听</strong>。每轨显示 Peak；直播输出另显示三秒短期 <strong>LUFS-S</strong>。刻度旋钮范围为 0–200%，配色与主界面一致。</p>
  <p>右下角无边框 CPU／RAM 状态区分系统与本程序用量。高级直播模式的 Tooltip 还会显示 Buffer、callback、估计延迟及 underrun／overrun，并在负载可能影响稳定性时用颜色提醒。</p>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2>缩到系统托盘后继续控制直播</h2><p>设置可决定点击主窗口关闭按钮时缩到系统托盘或直接退出。缩到后台后，不需要重新打开完整窗口也能完成常用操作。</p></div>
  <p>右键菜单会按状态显示播放／继续、暂停、停止、从头播放、Key、速度、Profile、麦克风静音／恢复、歌词窗口、打开主窗口，以及高级直播模式限定的 Meter。选择“关闭软件”才会结束主程序与 helper。</p>
  <p>全局快捷键分为“播放控制”和“麦克风／监听”，并提供默认按键；非高级直播模式会隐藏不适用的麦克风／监听项目。</p>
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
