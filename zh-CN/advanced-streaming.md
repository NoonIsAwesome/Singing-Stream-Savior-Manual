---
title: 高级直播模式与 VB-CABLE 安装
description: 在 Singing Stream Savior 2.1.0.0 设置麦克风混音、虚拟输出、OBS 与 Discord
lang: zh-CN
translation_key: advanced-streaming
---

# 高级直播模式

从 **2.1.0.0** 起，高级直播模式可以在 Singing Stream Savior 内混合 BGM、伴奏与处理后的麦克风，再把完整 Stream Mix 发送到 OBS、Discord 或其他直播软件。

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

## 重启后连接 Singing Stream Savior

1. 打开 **设置 → 音频路由**，选择 **高级直播模式（混合输出）**。
2. 点击 **设置虚拟输出…**，再点击 **刷新设备**。
3. 将 Stream Output 设为 VB-CABLE 的播放端点，通常是 **CABLE Input**。
4. Monitor Output 请选择实体耳机或音频接口，**不要**选择同一个 CABLE Input。
5. 在 OBS 添加 **音频输入采集**，设备选择 VB-CABLE 的录音端点，通常是 **CABLE Output**。Discord 则将输入设备设为同一个 CABLE Output。
6. 播放测试歌曲并说话，确认 Stream Mix 与 OBS／Discord 电平都有响应，并且没有重复收音或回授。

> 如果 OBS 已经直接采集原始麦克风，使用完整 Stream Mix 后请停用重复的麦克风来源，否则人声可能叠加、变大或出现相位感。

## 找不到 CABLE Input／Output

- 确认安装后已经真正重新启动 Windows。
- 确认安装程序在完整解压后以管理员身份运行。
- 在 Singing Stream Savior 的虚拟输出设置中点击 **刷新设备**。
- 关闭可能占用音频设备的程序；仍然找不到时，请参阅 [VB-Audio 官方参考手册](https://vb-audio.com/Cable/VBCABLE_ReferenceManual.pdf)。

<small>VB-CABLE 名称、界面与安装程序属于 VB-Audio Software。此处截图仅用于说明安装步骤。</small>
