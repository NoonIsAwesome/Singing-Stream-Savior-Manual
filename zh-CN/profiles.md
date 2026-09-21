---
title: "Profile（直播效果器）设置"
description: "Profile 是可重复使用的人声效果设置，保存 Signal Chain（效果器信号链）的效果器、参数、启用状态和处理顺序。本章集中说明效果器编辑、试听、歌曲标签、内置 Profile 与 VST3。"
lang: zh-CN
translation_key: profiles
---

# Profile（直播效果器）设置

{% include profile-prerequisite.html %}

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h2>创建并编辑人声 Profiles</h2><p>每个 Profile 都是一条可重复使用的人声效果链。可以加入内置效果或 VST3 Plugin、拖动调整处理顺序、暂时停用单个 Block，并在保存前试听。</p></div>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="profile-horizontal-rack.png" alt="人声 Profile 的横向效果器 Rack" caption="横向 Rack 按实际处理顺序显示整条效果链。" %}{% include localized-release-screenshot.html name="profile-vertical-rack.png" alt="人声 Profile 的纵向效果器 Rack" caption="纵向 Rack 使用相同的 Block、旁路、拖动顺序与编辑器，不会改变信号处理。" %}</div>
</div>

### Profile 编辑器会保存哪些内容

- 每个 Block 的启用状态、参数与顺序都会一起保存；重新打开项目后无需重新调整。
- 内置效果与 VST3 Plugin 可以混合使用，最多八个 VST3 插槽；VST3 参数 state 也会随 Profile 保存。
- 拖动 Block 会改变实际处理顺序；旁路只是暂时跳过效果，不会删除设置。
- 开启监听后，Profile 编辑页面会播放当前正在编辑的 Profile 预览；可以一边播放伴奏，一边调整效果。只想听人声效果时，点击右上角的 **S（Solo）**，即可暂时只保留 Profile 预览。切回直播操作、缩到系统托盘或关闭编辑器时，会退出试听并恢复原来的直播监听。
- Factory Profile 是可立即使用的起点；仍建议依麦克风、环境噪声、音域与唱法微调后另存为自己的 Profile。

{% include profile-signal-chain.html %}

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
  {% include advanced-streaming-screenshot.html name="26-song-profile-tag-menu.png" alt="歌曲列表展开 Profile 标签选项" caption="点击歌曲行右侧的标签图标后，可选择自动使用演唱 Profile、直播聊天或任意自定义／内置 Profile；彩色标签会直接显示在歌曲行中。" %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">LIVE CONTROL</p><h2>直播中手动切换效果器与麦克风静音</h2><p>工作区上方可立即套用指定 Profile，或交回歌曲标签自动切换。旁边的麦克风按钮可立即静音／取消静音；切换后请通过路由页电平表确认信号。</p></div>
  {% include advanced-streaming-screenshot.html name="27-live-profile-menu.png" alt="主界面顶部展开直播中的 Profile 选项" caption="顶部 Profile 选项可立即指定效果或恢复自动切换；旁边可同时操作监听、录音与麦克风静音。" size="medium" %}
</div>

### 主界面顶部控制项

- **监听来源**选择 BGM／伴奏、完整混音、BGM／伴奏加湿声、BGM／伴奏加干声，或只听处理后麦克风。
- **耳机按钮**开关当前监听，不会清除已选来源。
- **录音按钮**左键直接开始／停止；右键打开菜单，选择完整输出或监听内容、WAV 格式与保存文件夹。
- **麦克风按钮**左键立即静音／恢复；右键打开 Profile 菜单，可指定效果链或恢复自动切换，并与系统托盘菜单使用相同图标。
- **Profile 菜单**可手动指定效果链，或回到“自动切换 Profile”交由歌曲标签控制。
