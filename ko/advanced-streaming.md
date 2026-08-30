---
title: 2.1.0.0 고급 방송, Profiles 및 오디오 라우팅 전체 안내
description: 2.1.0.0 라이브 컨트롤, 보컬 Profiles, 내장 효과, 라우팅, Meter, 녹음, OBS 직접 출력과 시스템 트레이를 자세히 설명합니다
lang: ko
translation_key: advanced-streaming
published: false
---

# 고급 방송 모드

**2.1.0.0**부터 고급 방송 모드는 BGM, 반주와 처리된 마이크를 Singing Stream Savior 안에서 믹스한 뒤 전체 Stream Mix를 OBS, Discord 또는 다른 방송 앱으로 보낼 수 있습니다.

<aside class="version-preview" role="note"><span class="version-preview__badge">2.1.0.0 PREVIEW</span><div><strong>이 페이지는 아직 공개되지 않은 버전을 설명합니다.</strong><p>현재 공개 다운로드에는 아래 탭과 컨트롤이 없을 수 있습니다. 이미지는 번체 중국어 미리 보기 빌드이며 실제 컨트롤은 앱에서 선택한 언어로 표시됩니다. 화면과 명칭은 정식 출시 전에 조정될 수 있습니다.</p></div></aside>

## 2.1.0.0에서 이동한 설정

- **YouTube 다운로드**는 **설정 → 파일 및 프로젝트**로 이동하여 프로젝트 경로와 미디어 폴더 설정을 한곳에서 관리합니다.
- **고급 설정**은 **방송 타임스탬프**로 이름이 바뀌었으며 OBS WebSocket, 방송 시간 읽기, Set List 타임스탬프를 설정합니다.
- 새 **오디오 라우팅** 탭에서 일반 재생, 고급 믹싱, 오디오 드라이버, 출력, 모니터링, 녹음을 관리합니다.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2>일반 재생 또는 고급 방송 모드 선택</h2><p>먼저 <strong>설정 → 오디오 라우팅</strong>에서 모드를 선택하세요. 일반 재생은 앱의 BGM과 반주만 출력합니다. 고급 방송 모드는 마이크, Profile 효과 체인, 전체 믹스와 가상 출력을 추가합니다.</p></div>
  <div class="feature-shot-grid feature-shot-grid--wide">
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/01-audio-routing-mode.jpg' | relative_url }}" alt="오디오 라우팅 탭의 일반 재생과 고급 방송 모드 선택" loading="lazy" decoding="async"></a><figcaption>마이크 처리가 필요 없으면 일반 재생을, 전체 믹스를 OBS／Discord로 보낼 때는 고급 방송 모드를 사용하세요.</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/02-audio-driver.jpg' | relative_url }}" alt="ASIO 및 Windows Audio 드라이버 선택" loading="lazy" decoding="async"></a><figcaption>ASIO는 낮은 지연의 노래에 적합하고 Windows Audio 호환 모드는 일반 Windows 장치에 편리합니다.</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/04-playback-api.jpg' | relative_url }}" alt="자동, WASAPI, DirectSound, MME 재생 방식" loading="lazy" decoding="async"></a><figcaption>평소에는 자동(권장)을 사용하고 장치 호환 문제를 확인할 때만 재생 방식을 직접 선택하세요.</figcaption></figure>
    <figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/03-bgm-output-graph.jpg' | relative_url }}" alt="BGM에서 시스템 출력까지의 일반 재생 경로와 레벨 미터" loading="lazy" decoding="async"></a><figcaption>경로 그래프는 실제 신호 흐름, 예상 지연, Buffer, 샘플 레이트와 안정성을 보여 줍니다.</figcaption></figure>
  </div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/05-routing-mixer.jpg' | relative_url }}" alt="BGM, 마이크, 음성 Profile, 방송 믹스, 가상 출력, 모니터와 녹음을 포함한 전체 경로" loading="lazy" decoding="async"></a><figcaption>고급 방송 모드는 소스, 두 음성 Profile, 믹스, Stream Output, 모니터와 녹음을 하나의 시각적 경로에 표시합니다.</figcaption></figure>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h2>음성 Profiles 만들기 및 편집</h2><p>Profile은 재사용할 수 있는 보컬 효과 체인입니다. 내장 효과 또는 VST3 Plugin을 추가하고, Block 순서를 드래그해 바꾸며, 개별 Block을 우회하고 저장 전에 미리 들을 수 있습니다.</p></div>
  <div class="feature-shot-grid"><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/06-vocal-profile-effects.jpg' | relative_url }}" alt="고음역 노래 Profile의 다이내믹 억제, EQ, 리버브와 리미터" loading="lazy" decoding="async"></a><figcaption>고음역, 저음역, KTV, 고풍 등 노래 상황별로 다른 체인을 만들 수 있습니다.</figcaption></figure><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/07-chat-profile-effects.jpg' | relative_url }}" alt="방송 대화 Profile의 입력 게인, 노이즈 게이트와 리미터" loading="lazy" decoding="async"></a><figcaption>대화용과 노래용 Profile을 나누면 방송 중 효과를 하나씩 다시 조절할 필요가 없습니다.</figcaption></figure></div>
</div>

### Profile에 저장되는 내용

- 각 Block의 활성 상태, 파라미터와 처리 순서를 함께 저장하고 프로젝트를 다시 열 때 복원합니다.
- 내장 효과와 최대 8개의 VST3 Plugin 슬롯을 함께 사용할 수 있으며 VST3 parameter state도 Profile에 저장합니다.
- Block을 드래그하면 실제 처리 순서가 바뀝니다. Bypass는 설정을 삭제하지 않고 처리만 잠시 건너뜁니다.
- 편집 중 결과를 바로 들어 볼 수 있습니다. 라이브 화면으로 돌아가거나 트레이로 최소화하거나 편집기를 닫으면 Profile 미리 듣기를 끝내고 현재 방송 모니터로 복원합니다.
- Factory Profile은 실용적인 출발점입니다. 마이크, 방 소음, 음역과 창법에 맞게 조절한 뒤 개인 Profile로 저장하세요.

### 12개 내장 보컬 효과

모든 편집기는 무광 패널, 눈금 노브, 실시간 그래프와 도움말 버튼을 공유합니다. 간단 모드는 용도별 시작점을, 고급 모드는 전체 파라미터를 제공합니다.

- **Input Gain**: 체인 입력 레벨을 맞추고 첫 단계의 클리핑을 방지합니다.
- **Background Attenuation／Noise Gate／De-esser**: 지속 소음, 구절 사이 키보드 소리, 강한 치찰음을 각각 정리합니다.
- **Compressor／Limiter**: 작은 소리와 큰 소리의 차이를 줄이고 Profile 끝에서 갑작스러운 피크를 막습니다.
- **Equalizer／Saturation／Air Enhancer**: 불필요한 저역, 두께, 명료도와 Air 느낌을 조절합니다.
- **Voice Changer**: Pitch와 Formant를 함께 바꿔 캐릭터나 특정 파트 효과를 만듭니다.
- **Delay／Reverb**: KTV, 발라드, Plate 또는 긴 공간감을 만듭니다.

Profile 뒤에는 전체 방송용 **Mix Bus Compressor**, **Stream Output Limiter**, Master 음량이 있습니다. 이들은 개별 Profile의 음색 설정을 다시 쓰지 않습니다.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">SONG AUTOMATION</p><h2>곡 태그로 Profile 자동 전환</h2><p>곡 목록의 태그 버튼에서 음성 Profile을 지정하세요. 해당 반주를 재생하면 연결된 효과 체인으로 자동 전환됩니다. <strong>자동 · 노래 Profile</strong>은 현재 기본 노래 Profile을 사용합니다.</p></div>
  <figure class="manual-figure manual-feature-update__wide-figure"><a href="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/08-song-profile-tag.jpg' | relative_url }}" alt="곡마다 자동 또는 특정 음성 Profile을 선택하는 태그 메뉴" loading="lazy" decoding="async"></a><figcaption>음역, 장르 또는 특별한 곡에 맞춰 효과를 미리 준비할 수 있습니다. 실제 방송 전에 노래와 음량을 시험하세요.</figcaption></figure>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">LIVE CONTROL</p><h2>방송 중 효과 전환 및 마이크 음소거</h2><p>작업 화면 위에서 원하는 Profile을 즉시 적용하거나 곡 태그 자동 전환으로 돌아갈 수 있습니다. 옆의 마이크 버튼으로 음소거／해제하고 전환 후 라우팅 화면의 미터를 확인하세요.</p></div>
  <figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/09-manual-profile-mic-controls.jpg' | relative_url }}" alt="모니터 소스, 헤드폰, 녹음, 마이크 음소거와 Profile 컨트롤" loading="lazy" decoding="async"></a><figcaption>수동 선택은 즉시 적용됩니다. 곡 태그를 다시 따르려면 자동 Profile 전환을 선택하세요.</figcaption></figure>
</div>

### 상단 바 컨트롤

- **모니터 소스**에서 BGM／반주, 전체 믹스, Wet／Dry 보컬 조합 또는 처리된 마이크만 선택합니다.
- **헤드폰**은 선택한 모니터를 켜고 끄며 소스 선택은 유지합니다.
- **녹음** 메인 버튼은 시작／정지, 메뉴는 전체 출력／모니터 내용, WAV 형식과 저장 폴더를 설정합니다.
- **마이크**는 즉시 음소거／복원하며 트레이 메뉴와 같은 상태 아이콘을 사용합니다.
- **Profile**은 수동 효과 체인 또는 곡 태그를 따르는 자동 전환을 선택합니다.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>모니터 내용을 선택하고 전체 믹스 녹음</h2><p>헤드폰 버튼으로 모니터링을 제어합니다. BGM／반주, 전체 믹스, Wet／Dry 마이크 조합 또는 처리된 마이크만 들을 수 있습니다. 녹음은 전체 출력이나 모니터 내용을 WAV 16-bit PCM 또는 WAV 32-bit Float로 저장합니다.</p></div>
  <div class="feature-shot-grid feature-shot-grid--compact"><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/10-monitor-source.jpg' | relative_url }}" alt="BGM, 전체 믹스, Wet Dry 마이크와 처리된 마이크의 모니터 소스 메뉴" loading="lazy" decoding="async"></a><figcaption>모니터링은 헤드폰으로 듣는 내용만 바꿉니다. Stream Output은 계속 라우팅 설정을 따릅니다.</figcaption></figure><figure class="manual-figure"><a href="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}"><img src="{{ '/assets/images/advanced-streaming/11-recording-options.jpg' | relative_url }}" alt="전체 출력, 모니터 내용, WAV 형식과 녹음 폴더 옵션" loading="lazy" decoding="async"></a><figcaption>32-bit Float는 편집 여유가 크지만 용량도 큽니다. 일반 전달용은 16-bit PCM을 선택할 수 있습니다.</figcaption></figure></div>
  <p><strong>피드백 방지:</strong> 마이크 모니터링 중에는 마이크로 다시 들어가는 스피커 대신 헤드폰을 사용하세요. 실제 방송 전에 짧게 녹음해 목소리, 반주, 음량과 지연을 확인하세요.</p>
</div>

### 모니터와 녹음은 Profile 음색을 바꾸지 않습니다

모니터는 독립된 헤드폰 경로입니다. Meter의 BGM／반주 모니터와 보컬 모니터 노브는 0–200% 범위로 연주자가 듣는 균형만 바꿉니다. 시청자용 Stream Output이나 Profile 내부 Compressor, EQ 등에는 영향을 주지 않습니다.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2>5개 오디오 경로와 시스템 부하 확인</h2><p>고급 방송 모드에서는 보기 또는 트레이 메뉴에서 Meter를 열 수 있습니다. 오른쪽 도킹, 독립 창, 가로／세로 레이아웃 전환을 지원합니다.</p></div>
  <p><strong>BGM／반주</strong>, <strong>보컬(Profile 후, Mix 전)</strong>, <strong>방송 출력</strong>, <strong>BGM／반주 모니터</strong>, <strong>보컬 모니터</strong>를 표시합니다. 모든 트랙에 Peak, 방송 출력에는 3초 단기 <strong>LUFS-S</strong>도 표시하며 0–200% 눈금 노브로 조절합니다.</p>
  <p>오른쪽 아래의 테두리 없는 CPU／RAM 표시는 시스템 전체와 앱 사용량을 구분합니다. 고급 방송 모드에서는 Buffer, callback, 예상 지연, underrun／overrun도 Tooltip에 표시합니다.</p>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2>시스템 트레이에 둔 채 방송 제어</h2><p>닫기 버튼을 트레이 최소화 또는 완전 종료로 동작하도록 설정할 수 있습니다.</p></div>
  <p>상태에 따라 재생／계속, 일시 정지, 정지, 처음부터 재생, Key, 속도, Profile, 마이크, 가사 창, 메인 창과 고급 방송 모드 전용 Meter를 표시합니다. “앱 종료”가 본체와 helper를 끝냅니다.</p>
  <p>전역 단축키는 재생 제어와 마이크／모니터로 분류되며 기본 키를 제공합니다. 일반 재생에서는 고급 모드 전용 항목을 숨깁니다.</p>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h2>OBS 오디오 플러그인 또는 가상 장치 사용</h2><p>두 경로 모두 Profile, Mix Bus와 최종 리미터를 통과한 같은 Stream Output을 보냅니다.</p></div>
  <p>기존 OBS 플러그인 메뉴에는 표준 OBS, Portable 폴더와 제거가 있습니다. 설치가 끝나면 <strong>Singing Stream Savior Audio (OBS Plugin)</strong> 출력을 자동 선택합니다. OBS를 다시 시작하고 같은 이름의 오디오 소스를 추가하세요.</p>
  <p>VB-CABLE을 사용할 때는 Singing Stream Savior에서 CABLE Input, OBS 오디오 입력 캡처에서 CABLE Output을 선택합니다. 중복되는 원본 마이크 소스는 비활성화하세요.</p>
</div>

```text
Singing Stream Savior → 가상 오디오 케이블 → OBS／Discord
```

가상 오디오 케이블은 별도로 설치하는 Windows 드라이버입니다. 이 앱은 드라이버를 대신 다운로드하거나 실행 또는 변경하지 않습니다. 반드시 공식 제공처에서 설치하세요.

> **Windows를 다시 시작해야 합니다.** VB-Audio 공식 설치 안내는 설치 후 재시작을 요구합니다. Singing Stream Savior를 다시 열거나 장치 목록을 새로 고치는 것으로 대신할 수 없습니다.

<a id="vb-cable-installation"></a>
## VB-CABLE 설치 안내

아래 단계는 일반적인 64비트 Windows 10／11 기준입니다. Windows on ARM 등 다른 환경에서는 VB-Audio 공식 안내에 맞는 설치 파일을 선택하세요.

<a class="manual-cta" href="https://vb-audio.com/Cable/index.htm" target="_blank" rel="noopener noreferrer">VB-Audio 공식 다운로드 페이지 열기</a>

<div class="setup-steps">
  <section class="setup-step"><span class="setup-step-number">1</span><div><h3>현재 Windows 패키지 다운로드</h3><p>공식 페이지의 Windows 영역에서 <strong>New Package</strong>를 선택하세요. 제3자 다운로드 사이트에서 오디오 드라이버를 받지 마세요.</p><figure class="manual-figure"><a href="{{ '/assets/images/vb-cable/01-official-download.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/01-official-download.jpg' | relative_url }}" alt="VB-Audio 공식 페이지에서 빨간 테두리로 표시된 Windows용 새 VB-CABLE 패키지" loading="lazy" decoding="async"></a><figcaption>패키지 이름과 버전은 바뀔 수 있으므로 공식 페이지의 New Package를 기준으로 하세요.</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">2</span><div><h3>ZIP 전체 압축 풀기</h3><p>다운로드한 ZIP에서 “모두 압축 풀기”를 선택한 뒤 압축을 푼 폴더를 여세요. ZIP 미리 보기 안에서 Setup을 실행하면 INF 누락 또는 드라이버 패키지 손상 오류가 날 수 있습니다.</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/02-extracted-folder.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/02-extracted-folder.jpg' | relative_url }}" alt="압축을 푼 VBCABLE Driver Pack45 폴더" loading="lazy" decoding="async"></a><figcaption>압축 파일 내부가 아닌 일반 폴더를 열었는지 확인하세요.</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">3</span><div><h3>64비트 Setup을 관리자 권한으로 실행</h3><p>일반 64비트 Windows에서는 <code>VBCABLE_Setup_x64.exe</code>를 마우스 오른쪽 버튼으로 누르고 <strong>관리자 권한으로 실행</strong>을 선택하세요. <code>_x64</code>가 없는 파일은 32비트 Windows용입니다.</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/03-run-x64-setup.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/03-run-x64-setup.jpg' | relative_url }}" alt="압축을 푼 폴더의 VBCABLE Setup x64 실행 파일" loading="lazy" decoding="async"></a><figcaption>파일 이름에 <code>_x64</code>가 포함된 Setup을 선택하세요.</figcaption></figure></div></section>
  <section class="setup-step"><span class="setup-step-number">4</span><div><h3>드라이버 설치</h3><p>Windows 권한 요청에서 게시자를 확인한 뒤 <strong>Install Driver</strong>를 누르세요. 완료될 때까지 기다리고 버튼을 반복해서 누르거나 창을 강제로 닫지 마세요.</p><figure class="manual-figure"><a href="{{ '/assets/images/vb-cable/04-install-driver.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/04-install-driver.jpg' | relative_url }}" alt="Install Driver 버튼이 있는 VB-Audio Virtual Cable Driver Installation 창" loading="lazy" decoding="async"></a><figcaption>이후 드라이버 버전에서 화면이 달라져도 주요 작업은 Install Driver입니다.</figcaption></figure></div></section>
  <section class="setup-step setup-step--important"><span class="setup-step-number">5</span><div><h3>성공 후 Windows 다시 시작</h3><p><strong>Installation Complete and Successful</strong>이 표시되면 메시지를 확인하고 작업을 저장한 뒤 컴퓨터를 다시 시작하세요. 재시작이 끝난 뒤 Singing Stream Savior, OBS 또는 Discord 설정을 계속하세요.</p><figure class="manual-figure manual-figure--compact"><a href="{{ '/assets/images/vb-cable/05-restart-required.jpg' | relative_url }}"><img src="{{ '/assets/images/vb-cable/05-restart-required.jpg' | relative_url }}" alt="VB-CABLE 설치 성공 및 시스템 재시작 요청 메시지" loading="lazy" decoding="async"></a><figcaption>선택 안내가 아닙니다. 드라이버 등록을 완료하려면 재시작해야 합니다.</figcaption></figure></div></section>
</div>

### 재시작 후 Singing Stream Savior 연결

1. **설정 → 오디오 라우팅**에서 **고급 방송 모드(믹스 출력)**를 선택하세요.
2. **가상 출력 설정…**을 열고 **장치 새로 고침**을 누르세요.
3. Stream Output을 VB-CABLE의 재생 장치, 일반적으로 **CABLE Input**으로 설정하세요.
4. Monitor Output은 실제 헤드폰이나 오디오 인터페이스로 설정하고, 같은 CABLE Input을 선택하지 마세요.
5. OBS에서 **오디오 입력 캡처**를 추가하고 VB-CABLE의 녹음 장치, 일반적으로 **CABLE Output**을 선택하세요. Discord 입력 장치도 같은 CABLE Output으로 설정합니다.
6. 테스트 곡을 재생하며 말해 보고 Stream Mix와 OBS／Discord 미터가 반응하며 음성 중복이나 피드백이 없는지 확인하세요.

> OBS가 원본 마이크를 직접 캡처 중이라면 전체 Stream Mix를 사용할 때 중복 마이크 소스를 끄세요. 그렇지 않으면 음성이 겹치거나 커지고 위상감이 생길 수 있습니다.

### CABLE Input／Output이 보이지 않을 때

- 설치 후 Windows를 실제로 다시 시작했는지 확인하세요.
- 완전히 압축을 푼 폴더에서 관리자 권한으로 Setup을 실행했는지 확인하세요.
- Singing Stream Savior의 가상 출력 설정에서 **장치 새로 고침**을 누르세요.
- 오디오 장치를 사용 중인 앱을 닫으세요. 계속 보이지 않으면 [VB-Audio 공식 참조 설명서](https://vb-audio.com/Cable/VBCABLE_ReferenceManual.pdf)를 확인하세요.

<small>VB-CABLE 이름, 화면과 설치 프로그램은 VB-Audio Software의 제품입니다. 스크린샷은 설치 단계 설명 목적으로만 사용합니다.</small>
