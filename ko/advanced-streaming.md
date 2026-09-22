---
title: "고급 방송 오디오: 마이크 효과와 믹스 출력"
description: "2.1.0.0부터 고급 방송 모드는 Singing Stream Savior 안에서 BGM／반주와 Profile 이펙트로 처리한 마이크를 믹스하고, 완성된 Stream Mix를 OBS, Discord 또는 다른 방송／통화 앱으로 보냅니다."
lang: ko
translation_key: advanced-streaming
published: true
---

# 고급 방송 오디오: 마이크 효과와 믹스 출력

<section class="advanced-streaming-lead" data-article-lead markdown="1">

{% include advanced-streaming-benefits.html %}

<nav class="article-outline audio-output-targets" id="advanced-quick-start" aria-label="믹스를 보낼 곳 선택">
  <strong>믹스를 보낼 곳 선택</strong><ul><li><a href="#output-obs">오디오를 OBS로 보내기</a></li><li><a href="#output-discord">오디오를 Discord 또는 통화 앱으로 보내기</a></li></ul>
</nav>

<a id="obs-output-walkthrough-title"></a>
<h2 id="output-obs">오디오를 OBS로 보내기</h2>
<p>OBS만 사용한다면 전용 오디오 플러그인으로 시작하세요. 가상 케이블은 필요하지 않습니다. 네 단계로 출력을 완료하고 기본 노래 Profile은 아래에서 설정합니다.</p>
{% include stream-route-steps.html target="obs" %}
{% include route-next-profile.html %}

<details class="audio-route-details" markdown="1"><summary>OBS 대체 경로 및 플러그인 상세(필요할 때 펼치기)</summary>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h3>OBS 오디오 플러그인 또는 가상 장치 사용</h3><p>두 경로 모두 Profile, Mix Bus와 최종 리미터를 통과한 같은 Stream Output을 보냅니다.</p></div>
  <p>기존 OBS 플러그인 메뉴에는 표준 OBS, Portable 폴더와 제거가 있습니다. 설치가 끝나면 <strong>Singing Stream Savior Audio (OBS Plugin)</strong> 출력을 자동 선택합니다. OBS를 다시 시작하고 같은 이름의 오디오 소스를 추가하세요.</p>
  <p>VB-CABLE을 사용할 때는 Singing Stream Savior에서 CABLE Input, OBS 오디오 입력 캡처에서 CABLE Output을 선택합니다. 중복되는 원본 마이크 소스는 비활성화하세요.</p>
</div>

{% include stream-route-steps.html target="virtual" %}

</details>

<a id="discord-output-walkthrough-title"></a>
<h2 id="output-discord">오디오를 Discord 또는 통화 앱으로 보내기</h2>
<p>VB-CABLE 같은 가상 장치로 완성된 믹스를 통화 앱의 마이크 입력으로 보냅니다. OBS를 켤 필요는 없습니다. 앱은 CABLE Input으로 출력하고 Discord는 CABLE Output을 받습니다.</p>
{% include stream-route-steps.html target="discord" %}
{% include route-next-profile.html %}
<p>라우팅이 정확해도 Discord가 통화 오디오를 다시 인코딩하거나 압축하고 플랫폼 처리를 적용할 수 있어 로컬 녹음이나 OBS 녹화보다 음질이 낮을 수 있습니다. 최고 음질을 보존하려면 OBS 또는 로컬 녹음을 기준으로 사용하세요.</p>

<a id="vb-cable-installation"></a>
<details class="audio-route-details audio-route-details--installation" markdown="1"><summary>VB-CABLE 설치 그림 안내(필요할 때 펼치기)</summary>

가상 오디오 케이블은 별도로 설치하는 Windows 드라이버입니다. 이 앱은 드라이버를 대신 다운로드하거나 실행 또는 변경하지 않습니다. 반드시 공식 제공처에서 설치하세요.

> **Windows를 다시 시작해야 합니다.** VB-Audio 공식 설치 안내는 설치 후 재시작을 요구합니다. Singing Stream Savior를 다시 열거나 장치 목록을 새로 고치는 것으로 대신할 수 없습니다.

### VB-CABLE 설치 안내

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

</details>

</section>


<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2 id="route-modes">일반 재생과 고급 방송 모드의 차이</h2><p>먼저 <strong>설정 → 오디오 라우팅</strong>에서 모드를 선택하세요. 일반 재생은 앱의 BGM과 반주만 출력합니다. 고급 방송 모드는 마이크, Profile 효과 체인, 전체 믹스와 가상 출력을 추가합니다.</p></div>
  {% include localized-release-screenshot.html name="audio-routing.png" alt="2.1.0.0 오디오 라우팅 화면의 위쪽 부분" caption="위쪽에는 OBS 플러그인／가상 출력, 라우팅 모드, Windows Audio, App Buffer, 점검, 소스, Profile, Mix와 Stream Output이 표시됩니다. Monitor, 녹음과 나머지 경로는 아래로 스크롤해 확인합니다." %}
  {% include localized-release-screenshot.html name="audio-routing-bottom.png" alt="2.1.0.0 오디오 라우팅 화면의 아래쪽 부분" caption="아래쪽에는 Monitor, 녹음, 라우팅 선과 지연이 표시됩니다. Monitor 지연은 OBS／Stream Output의 반주와 보컬 정렬을 바꾸지 않습니다." %}
</div>

일반 재생에서도 BGM／반주, 가사／세트리스트 기능을 사용할 수 있습니다. 고급 모드에서는 마이크 효과 처리와 믹싱도 합니다. Profile은 마이크 보컬을 처리하며 반주를 같은 보컬 체인으로 보내지 않습니다. Monitor는 자신이 듣는 경로이고 OBS／Discord에는 Stream Output을 보냅니다.

**마이크 → Profile 이펙트 체인 → BGM／반주와 믹스 → Stream Output → OBS / Discord**

<h2 id="singing-profile-defaults">기본 노래 Profile과 자동 전환</h2>

설정 → 오디오 라우팅에서 노래와 대화의 기본 Profile을 선택하세요. 모든 곡에 태그를 지정할 필요는 없습니다. 상단 Profile 메뉴도 수동 고정이 아닌 자동 전환으로 둡니다.

{% include profile-introduction.html %}

{% include stream-route-steps.html target="default" %}

[Profile(방송 이펙트) 설정으로 이동 →]({{ '/ko/profiles.html' | relative_url }})

<h2 id="audio-reference">장치·모니터·녹음·안정성 상세</h2>

출력과 자동 전환을 확인한 후 필요할 때 아래 내용을 살펴보세요. 첫 실전 사용 전에는 방송·통화·외부 녹음을 멈추고 안정성 점검을 합니다. 매 방송마다 반복할 필요는 없습니다.

### 기본 Profile과 BGM 덕킹

- **방송 대화용 Voice Profile**은 BGM 재생이나 라이브 대화 중 자동으로 적용됩니다.
- **노래용 Voice Profile**은 반주 재생 중의 기본값이며 곡별 Profile 태그가 이를 덮어쓸 수 있습니다. 마이크 버튼의 오른쪽 클릭 메뉴에서 다른 Profile을 임시로 고정할 수 있습니다. **Profile 자동 전환**을 선택하면 대화／노래 상태와 곡 태그에 따른 자동 선택을 다시 시작합니다.
- **BGM 덕킹 · 자동**은 마이크 음성이 감지되는 동안에만 BGM을 최대 9 dB 낮추며 마이크 음량을 높이지 않습니다. 노래 반주 중에는 구절마다 반주가 출렁이지 않도록 자동 바이패스되고 전체 결합은 Mix Bus Compressor가 처리합니다. **끄기**를 선택하면 자동 BGM 감소를 완전히 비활성화합니다.

### 일반 사용자를 위한 권장 시작 설정

> **가장 간단한 시작점은 지원 인터페이스에서 ASIO, 앱 안전 Buffer는 자동(권장) · 512 frames, OBS는 전용 오디오 소스입니다.** 처음부터 모든 Buffer를 직접 시험할 필요는 없습니다.

- 제조사 ASIO가 있으면 우선 사용하고 인터페이스 hardware buffer는 이미 안정적인 값(보통 128 또는 256 frames)을 유지합니다. App Buffer와는 별도 설정입니다.
- ASIO가 없으면 Windows Audio와 자동 512를 사용하며 처음부터 128／256을 강제로 선택하지 않습니다.
- 소프트웨어 Dry Monitor 지연을 더 줄이고 싶을 때만 전체 점검을 실행하고, 점검이 권장할 때만 256을 적용합니다. 노래의 주 모니터는 Direct Monitor를 우선합니다.
- OBS는 Singing Stream Savior 전용 오디오 소스를 우선하고, 다른 앱에도 완전한 Mix가 필요할 때만 가상 케이블을 사용합니다.
- 처음 라우팅을 설정한 뒤 전체 점검을 최소 한 번 실행하고 권장값을 적용하세요. 방송 전마다 다시 실행할 필요는 없습니다. 장치／드라이버, Profile／VST3／라우팅을 크게 변경했거나 노란 상태 또는 실제 끊김이 있을 때만 다시 실행합니다.

<details class="audio-route-details" id="buffer-stability" markdown="1">
<summary>{{ site.data.manual_workflows[page.lang].buffer_summary | escape }}</summary>

### App 버퍼 점검과 노란색 상태

**앱 안전 버퍼** 선택 상자와 **버퍼 안정성 점검…** 버튼은 한 줄에 항상 표시됩니다. ASIO 입력을 사용하는 경우 이 줄은 ASIO 샘플 레이트／하드웨어 버퍼 영역 바로 아래에 있습니다. **Windows 재생 호환성** 고급 설정을 접어 둔 상태에서도 값을 조정하거나 점검을 시작할 수 있습니다. **빠른 점검**은 512／1024프레임을 약 25초 동안, **전체 점검**은 128／256／512／1024프레임을 약 5분 동안 확인합니다. 점검 대상은 앱 버퍼이며 오디오 인터페이스의 별도 ASIO hardware buffer는 변경하지 않습니다. 완료 후 권장값을 바로 적용할 수 있지만, 128／256 같은 낮은 값은 현재 장치, Profile, 효과 및 경로에서 전체 점검의 독립적인 엄격 관찰 2회를 모두 통과한 경우에만 검증된 값으로 취급됩니다.

점검 자체는 합성 테스트 톤이나 반주를 재생하지 않습니다. 소프트웨어 모니터링이 켜져 있으면 점검 중에도 실시간 마이크 소리가 들릴 수 있으며, 경로를 다시 시작할 때마다 짧은 끊김이 발생할 수 있습니다. 확인 후에는 Singing Stream Savior가 앱 안에서 재생 중인 BGM과 반주를 자동으로 중지합니다. 하지만 OBS 방송, Discord 통화, 외부 녹음은 대신 중지할 수 없으므로 사용자가 먼저 중지해야 합니다. 오디오 인터페이스의 **Direct Monitor**는 영향을 받지 않습니다.

{% include localized-release-screenshot.html name="audio-health-check.png" alt="App Buffer 전체 점검 완료 결과" caption="전체 점검 완료 예시입니다. 녹색 체크는 통과, 진한 녹색 행은 이 PC의 권장값, 노란색은 점검을 마쳤지만 안전 여유가 부족함을 뜻합니다. 권장값과 지연은 PC마다 다릅니다." %}

> **128／256이 ‘검증되지 않음’으로 표시되어도 정상인가요?** 정상입니다. 낮은 Buffer는 반복된 안정성 점검을 통과한 경우에만 권장됩니다. ‘검증되지 않음’은 이미 들리는 끊김이 발생했다는 뜻이 아닙니다. 소프트웨어 Monitor 지연을 특별히 낮춰야 하는 경우가 아니라면 권장된 512를 사용하세요. App Buffer와 ASIO hardware buffer는 서로 다른 설정입니다.

노란색 메시지는 두 가지 의미로 나뉩니다. **드롭아웃 확인**은 마이크, Monitor, 방송 출력 또는 복구 중인 장치가 불안정할 수 있음을 뜻합니다. **오디오 타이밍 확인**은 처리 시간이나 동기화 상태의 이상이 계속되고 있음을 뜻합니다. 짧은 피크만으로 들리는 끊김이 발생했다고 단정할 수는 없습니다. 안정성 텍스트에 포인터를 두면 자세한 내용을 확인할 수 있습니다.

</details>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2 id="monitor-record">모니터 내용을 선택하고 전체 믹스 녹음</h2><p>헤드폰 버튼으로 모니터링을 제어합니다. BGM／반주, 전체 믹스, Wet／Dry 마이크 조합 또는 처리된 마이크만 들을 수 있습니다. 녹음은 전체 출력이나 모니터 내용을 WAV 16-bit PCM, WAV 24-bit PCM 또는 WAV 32-bit Float로 저장합니다.</p></div>
  <p><strong>피드백 방지:</strong> 마이크 모니터링 중에는 마이크로 다시 들어가는 스피커 대신 헤드폰을 사용하세요. 실제 방송 전에 짧게 녹음해 목소리, 반주, 음량과 지연을 확인하세요.</p>
</div>

- **WAV 16-bit PCM**은 파일이 가장 작고 호환성이 높으며, **WAV 24-bit PCM**은 일반 녹음과 편집에 권장하는 균형, **WAV 32-bit Float**는 편집 여유가 가장 크지만 파일도 가장 큽니다.

### 모니터와 녹음은 Profile 음색을 바꾸지 않습니다

모니터는 독립된 헤드폰 경로입니다. Dry Cue는 독립된 소프트웨어 캡처로 드라이 보컬 모니터 지연을 가능한 한 낮추지만 정식 Mix, OBS 또는 녹음 경로는 바꾸지 않습니다. 노래할 때 가장 낮은 모니터 지연이 필요하면 오디오 인터페이스의 hardware Direct Monitor를 우선 사용하세요. Meter의 BGM／반주 모니터와 보컬 모니터 노브는 0–200% 범위로 연주자가 듣는 균형만 바꿉니다. 시청자용 Stream Output이나 Profile 내부 Compressor, EQ 등에는 영향을 주지 않습니다. **전체 출력** 녹음은 정식 Stream Output 타임라인을 사용하므로 BGM／반주와 보컬이 같은 정식 시간축에 기록됩니다. Dry Cue 또는 다른 소프트웨어 모니터 지연은 녹음 안에서 두 신호의 상대 offset을 바꾸지 않습니다.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2 id="audio-meter">6개 오디오 경로와 시스템 부하 확인</h2><p>고급 방송 모드에서는 보기 또는 트레이 메뉴에서 Meter를 열 수 있습니다. 오른쪽 도킹, 독립 창, 가로／세로 레이아웃 전환을 지원합니다.</p></div>
  <p><strong>BGM／반주</strong>, <strong>보컬(Profile 후, Mix 전)</strong>, <strong>BGM／반주 모니터</strong>, <strong>보컬 모니터</strong>, <strong>가이드 보컬 모니터</strong>, <strong>Master／Stream Output</strong>의 6개 경로를 이 순서로 표시합니다. 모든 경로에 Peak를 표시하고 Master／Stream Output에는 3초 단기 <strong>LUFS-S</strong>도 표시합니다. 게인은 가이드 보컬 모니터만 0–100%, 나머지는 0–200%입니다. 가이드 보컬은 모니터 전용이며 Stream이나 OBS에 들어가지 않습니다.</p>
  <p>가로형 Meter는 BGM／반주와 보컬의 균형이 지속적으로 어긋날 때 보컬을 높이거나 반주를 낮추도록 안내합니다. 조언만 제공하며 게인을 자동으로 변경하지 않습니다. 무음, 호흡, 간주 구간을 곧바로 작은 보컬로 판단하지 않습니다.</p>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="audio-meter-horizontal.png" alt="가로 레벨 바를 사용하는 6트랙 오디오 Meter" caption="가로 미터를 아래로 스크롤하면 가이드 보컬 모니터와 마지막 Master／방송 출력을 볼 수 있습니다. 가이드 음량은 0–100%, 나머지는 0–200%입니다." %}{% include localized-release-screenshot.html name="audio-meter-vertical.png" alt="세로 레벨 바를 사용하는 6트랙 오디오 Meter 패널" caption="세로형 Meter에서도 같은 6개 경로를 제어할 수 있으며 메인 창 오른쪽에 도킹하거나 독립 창으로 띄울 수 있습니다. 가이드 보컬은 모니터 전용입니다." %}</div>
  <div class="effect-reference"><details><summary><strong>음량 균형 안내는 언제 표시되나요?</strong><span>반주와 보컬 데이터가 충분할 때만 판단합니다</span></summary><div class="effect-reference__body"><p>앱은 반주와 보컬을 일정 시간 관찰한 뒤 장기적인 균형을 비교합니다. 곡이 막 시작했거나 무음, 호흡, 간주, Profile 전환, 오디오 장치 복구 중일 때는 바로 안내하지 않습니다. 보컬이 이미 과부하에 가까우면 보컬을 높이라고 하지 않고 반주를 낮추라는 안내만 표시합니다. 곡 변경, 정지, 다시 재생 또는 큰 폭의 탐색 후에는 새로 관찰합니다.</p></div></details></div>
  <details class="audio-route-details"><summary>{{ site.data.manual_workflows[page.lang].health_summary | escape }}</summary>
  <p>오른쪽 아래의 CPU／RAM 표시는 이 앱의 사용량을 보여 줍니다. 포인터를 두면 시스템과 앱의 자세한 사용량을 확인할 수 있으며, 고급 방송 모드에서는 Buffer, 처리 시간, 예상 지연과 오디오 중단 횟수도 표시합니다.</p>
  {% include localized-release-screenshot.html name="system-resource-status.png" alt="메인 창 오른쪽 아래에 접힌 CPU／RAM 요약" caption="이 이미지는 포인터를 두기 전의 간결한 CPU／RAM 요약만 보여 줍니다. 포인터를 두면 위에서 설명한 시스템／앱 부하와 고급 오디오 상태가 펼쳐집니다." size="medium" %}
  {% include system-health-interpretation.html %}
  </details>
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2 id="tray-shortcuts">시스템 트레이에 둔 채 방송 제어</h2><p>닫기 버튼을 트레이 최소화 또는 완전 종료로 동작하도록 설정할 수 있습니다.</p></div>
  <p>상태에 따라 재생／계속, 일시 정지, 정지, 처음부터 재생, Key, 속도, Profile, 마이크, 가사 창, 메인 창과 고급 방송 모드 전용 Meter를 표시합니다. “앱 종료”를 선택하면 앱과 재생 기능이 종료됩니다.</p>
  {% include localized-release-screenshot.html name="notification-area-menu.png" alt="재생하지 않을 때의 Singing Stream Savior Windows 시스템 트레이 메뉴" caption="재생하지 않을 때는 간결한 메뉴가 표시됩니다. 반주 재생 또는 고급 방송 모드에서는 위에서 설명한 재생, Key, 속도, Profile, 마이크와 Meter 동작이 추가됩니다. 맨 아래 종료 항목을 선택하면 앱이 완전히 종료됩니다." size="medium" %}
  <p>전역 단축키는 재생 제어와 마이크／모니터로 분류되며 기본 키를 제공합니다. 일반 재생에서는 고급 모드 전용 항목을 숨깁니다.</p>
  {% include keyboard-shortcuts-reference.html %}
  {% include localized-release-screenshot.html name="keyboard-shortcuts.png" alt="재생, 마이크와 모니터로 분류된 키보드 단축키 설정" caption="기본 키를 직접 바꿀 수 있으며 고급 방송 모드가 필요한 항목은 일반 재생에서 숨깁니다." %}
</div>

<p id="profile-chain-heading">효과 상세 설명은 별도 Profile 장으로 옮겼습니다. <a href="{{ '/ko/profiles.html#profile-chain-heading' | relative_url }}">Profile(방송 이펙트) 설정으로 이동 →</a></p>

## 2.1.0.0에서 이동한 설정

- **YouTube 다운로드**는 **설정 → 파일 및 프로젝트**로 이동하여 프로젝트 경로와 미디어 폴더 설정을 한곳에서 관리합니다.
- **고급 설정**은 **방송 타임스탬프**로 이름이 바뀌었으며 OBS WebSocket, 방송 시간 읽기, Set List 타임스탬프를 설정합니다.
- 새 **오디오 라우팅** 탭에서 일반 재생, 고급 믹싱, 오디오 드라이버, 출력, 모니터링, 녹음을 관리합니다.
