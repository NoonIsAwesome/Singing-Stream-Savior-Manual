---
title: 2.1.0.0 고급 방송, Profiles 및 오디오 라우팅 전체 안내
description: 2.1.0.0 라이브 컨트롤, 보컬 Profiles, 내장 효과, 라우팅, Meter, 녹음, OBS 직접 출력과 시스템 트레이를 자세히 설명합니다
lang: ko
translation_key: advanced-streaming
published: true
---

# 고급 방송 모드

**2.1.0.0**부터 고급 방송 모드는 BGM, 반주와 처리된 마이크를 Singing Stream Savior 안에서 믹스한 뒤 전체 Stream Mix를 OBS, Discord 또는 다른 방송 앱으로 보낼 수 있습니다.

{% include advanced-quick-start.html %}

<aside class="version-preview" role="note"><span class="version-preview__badge">2.1.0.0 새 기능</span><div><strong>오디오 라우팅과 음성 Profile을 함께 설정하세요.</strong><p>라우팅은 입력, Monitor, 녹음과 방송 출력을, Profile은 보컬 음색을 관리합니다. 모든 이미지는 Release build의 실제 화면이며 현지화 버전이 있을 때 우선 사용합니다.</p></div></aside>

## 2.1.0.0에서 이동한 설정

- **YouTube 다운로드**는 **설정 → 파일 및 프로젝트**로 이동하여 프로젝트 경로와 미디어 폴더 설정을 한곳에서 관리합니다.
- **고급 설정**은 **방송 타임스탬프**로 이름이 바뀌었으며 OBS WebSocket, 방송 시간 읽기, Set List 타임스탬프를 설정합니다.
- 새 **오디오 라우팅** 탭에서 일반 재생, 고급 믹싱, 오디오 드라이버, 출력, 모니터링, 녹음을 관리합니다.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.1.0.0 · AUDIO ROUTING</p><h2>일반 재생 또는 고급 방송 모드 선택</h2><p>먼저 <strong>설정 → 오디오 라우팅</strong>에서 모드를 선택하세요. 일반 재생은 앱의 BGM과 반주만 출력합니다. 고급 방송 모드는 마이크, Profile 효과 체인, 전체 믹스와 가상 출력을 추가합니다.</p></div>
  {% include localized-release-screenshot.html name="audio-routing.png" alt="2.1.0.0 오디오 라우팅 화면의 위쪽 부분" caption="이 실제 화면은 오른쪽 위의 OBS 플러그인 설치／가상 출력 진입점, 라우팅 모드, Windows Audio, App Buffer, 점검 입구와 소스, Profile, 정식 Mix, Stream Output을 보여 줍니다. Monitor, 녹음과 아래쪽 경로는 스크롤해 확인합니다." %}
  {% include localized-release-screenshot.html name="audio-routing-bottom.png" alt="2.1.0.0 오디오 라우팅 화면의 아래쪽 부분" caption="아래쪽에는 Monitor, 녹음, 전체 라우팅 선과 지연 상태가 보입니다. Monitor 지연은 OBS／정식 출력의 반주와 보컬 정렬을 바꾸지 않습니다." %}
</div>

### 기본 Profile과 BGM 덕킹

- **방송 대화용 Voice Profile**은 BGM 재생이나 라이브 대화 중 자동으로 적용됩니다.
- **노래용 Voice Profile**은 반주 재생 중의 기본값이며 곡별 Profile 태그가 이를 덮어쓸 수 있습니다. 마이크 버튼의 오른쪽 클릭 메뉴에서 다른 Profile을 임시로 고정할 수 있습니다. **Profile 자동 전환**을 선택하면 대화／노래 상태와 곡 태그에 따른 자동 선택을 다시 시작합니다.
- **BGM 덕킹 · 자동**은 마이크 음성이 감지되는 동안에만 BGM을 최대 9 dB 낮추며 마이크 음량을 높이지 않습니다. 노래 반주 중에는 구절마다 반주가 출렁이지 않도록 자동 바이패스되고 전체 결합은 Mix Bus Compressor가 처리합니다. **끄기**를 선택하면 자동 BGM 감소를 완전히 비활성화합니다.

### App 버퍼 점검과 노란색 상태

**앱 안전 버퍼** 선택 상자와 **버퍼 안정성 점검…** 버튼은 한 줄에 항상 표시됩니다. ASIO 입력을 사용하는 경우 이 줄은 ASIO 샘플 레이트／하드웨어 버퍼 영역 바로 아래에 있습니다. **Windows 재생 호환성** 고급 설정을 접어 둔 상태에서도 값을 조정하거나 점검을 시작할 수 있습니다. **빠른 점검**은 512／1024프레임을 약 25초 동안, **전체 점검**은 128／256／512／1024프레임을 약 5분 동안 확인합니다. 점검 대상은 앱 버퍼이며 오디오 인터페이스의 별도 ASIO hardware buffer는 변경하지 않습니다. 완료 후 권장값을 바로 적용할 수 있지만, 128／256 같은 낮은 값은 현재 장치, Profile, 효과 및 경로에서 전체 점검의 독립적인 엄격 관찰 2회를 모두 통과한 경우에만 검증된 값으로 취급됩니다.

점검 자체는 합성 테스트 톤이나 반주를 재생하지 않습니다. 소프트웨어 모니터링이 켜져 있으면 점검 중에도 실시간 마이크 소리가 들릴 수 있으며, 경로를 다시 시작할 때마다 짧은 끊김이 발생할 수 있습니다. 확인 후에는 Singing Stream Savior가 앱 안에서 재생 중인 BGM과 반주를 자동으로 중지합니다. 하지만 OBS 방송, Discord 통화, 외부 녹음은 대신 중지할 수 없으므로 사용자가 먼저 중지해야 합니다. 오디오 인터페이스의 **Direct Monitor**는 영향을 받지 않습니다.

{% include localized-release-screenshot.html name="audio-health-check.png" alt="테스트 시작 전 Buffer 안정성 점검 화면" caption="이 실제 화면은 테스트 전 초기 상태입니다. 시작 후 각 행에 독립 관찰 결과와 예상 지연이 채워지고 판단이 끝난 뒤에만 권장값을 적용할 수 있습니다." %}

노란색 메시지는 두 가지 의미로 나뉩니다. **드롭아웃 확인**은 마이크／모니터 underrun 또는 overrun, 정식 Stream 경로의 불연속, 장치 중단／복구가 감지되었을 때 표시됩니다. **오디오 타이밍 확인**은 동일한 callback, 클록 또는 지연 계산 이상이 약 2초 동안 지속될 때 표시됩니다. 순간적인 callback peak 한 번만으로 실제 들리는 드롭아웃이 발생했다고 판단하지 않습니다. 안정성 텍스트에 포인터를 두면 경로별 카운터, 장치 복구, callback peak／period와 이상 플래그를 확인할 수 있습니다.

### 일반 사용자를 위한 권장 시작 설정

> **가장 간단한 시작점은 지원 인터페이스에서 ASIO, 앱 안전 Buffer는 자동(권장) · 512 frames, OBS는 전용 오디오 소스입니다.** 처음부터 기술 표를 읽거나 모든 Buffer를 직접 시험할 필요는 없습니다.

- 제조사 ASIO가 있으면 우선 사용하고 인터페이스 hardware buffer는 이미 안정적인 값(보통 128 또는 256 frames)을 유지합니다. App Buffer와는 별도 설정입니다.
- ASIO가 없으면 Windows Audio와 자동 512를 사용하며 처음부터 128／256을 강제로 선택하지 않습니다.
- 소프트웨어 Dry Monitor 지연을 더 줄이고 싶을 때만 전체 점검을 실행하고, 점검이 권장할 때만 256을 적용합니다. 노래의 주 모니터는 Direct Monitor를 우선합니다.
- OBS는 Singing Stream Savior 전용 오디오 소스를 우선하고, 다른 앱에도 완전한 Mix가 필요할 때만 가상 케이블을 사용합니다.
- 방송 전 빠른 점검과 짧은 OBS 녹화를 실행합니다. 노란 상태, 계속 증가하는 카운터 또는 들리는 끊김이 있으면 방송을 멈추고 전체 점검을 실행하며 필요하면 1024를 사용합니다.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h2>음성 Profiles 만들기 및 편집</h2><p>Profile은 재사용할 수 있는 보컬 효과 체인입니다. 내장 효과 또는 VST3 Plugin을 추가하고, Block 순서를 드래그해 바꾸며, 개별 Block을 우회하고 저장 전에 미리 들을 수 있습니다.</p></div>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="profile-horizontal-rack.png" alt="가로 Profile 효과 Rack" caption="가로 Rack은 실제 처리 순서로 전체 효과 체인을 보여 줍니다." %}{% include localized-release-screenshot.html name="profile-vertical-rack.png" alt="세로 Profile 효과 Rack" caption="세로 Rack도 같은 Block, Bypass, 드래그 순서와 편집기를 사용하며 신호 처리는 바뀌지 않습니다." %}</div>
</div>

### Profile에 저장되는 내용

- 각 Block의 활성 상태, 파라미터와 처리 순서를 함께 저장하고 프로젝트를 다시 열 때 복원합니다.
- 내장 효과와 최대 8개의 VST3 Plugin 슬롯을 함께 사용할 수 있으며 VST3 parameter state도 Profile에 저장합니다.
- Block을 드래그하면 실제 처리 순서가 바뀝니다. Bypass는 설정을 삭제하지 않고 처리만 잠시 건너뜁니다.
- 편집 중 결과를 바로 들어 볼 수 있습니다. 라이브 화면으로 돌아가거나 트레이로 최소화하거나 편집기를 닫으면 Profile 미리 듣기를 끝내고 현재 방송 모니터로 복원합니다.
- Factory Profile은 실용적인 출발점입니다. 마이크, 방 소음, 음역과 창법에 맞게 조절한 뒤 개인 Profile로 저장하세요.

{% include factory-profiles-reference.html %}

### 15개 내장 보컬 효과

각 내장 이펙트는 실시간 그래프, Bypass 및 도움말 버튼을 제공합니다. 간단 모드는 실용적인 용도별 시작점을, 고급 모드는 전체 파라미터를 제공합니다.

{% include one-knob-guide.html %}

- **입력 게인**: 체인 입력 레벨을 맞추고 첫 단계의 클리핑을 방지합니다.
- **배경 소음 감쇠／노이즈 게이트／디에서**: 지속 소음, 구절 사이 키보드 소리, 강한 치찰음을 각각 정리합니다.
- **컴프레서／리미터**: 작은 소리와 큰 소리의 차이를 줄이고 Profile 끝에서 갑작스러운 피크를 막습니다.
- **이퀄라이저(EQ)／새추레이션／Air 인핸서**: 불필요한 저역, 두께, 명료도와 Air 느낌을 조절합니다.
- **보이스 체인저**: Pitch와 Formant를 함께 바꿔 캐릭터나 특정 파트 효과를 만듭니다.
- **하모니／더블러**: 곡 Key를 따르는 실험적 화음 또는 짧은 지연과 미세한 피치 차이가 있는 두 보컬 레이어를 더합니다.
- **딜레이／리버브／시머**: KTV, 발라드, Plate, 긴 공간감과 한 옥타브 위의 몽환적인 잔향을 만듭니다.

Profile 뒤에는 전체 방송용 **Mix Bus Compressor**, **Stream Output Limiter**, Master 음량이 있습니다. 이들은 개별 Profile의 음색 설정을 다시 쓰지 않습니다. Final Limiter 상태는 모드별로 따로 저장됩니다. 일반 재생은 기본으로 꺼져 있고, 고급 방송 모드는 처음 사용할 때 기본으로 켜지며, 이후 각 모드에서 수동으로 바꾸어 둔 상태를 독립적으로 기억합니다.

아래 효과를 펼치면 신호 역할, 주요 파라미터, 라이브 노래 조절 방법과 주의점을 확인할 수 있습니다.

{% include effect-editor-gallery.html %}

{% include effects-reference-ko.html %}

{% include profile-performance-controls.html %}

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">SONG AUTOMATION</p><h2>곡 태그로 Profile 자동 전환</h2><p>곡 목록의 태그 버튼에서 음성 Profile을 지정하세요. 해당 반주를 재생하면 연결된 효과 체인으로 자동 전환됩니다. <strong>자동 · 노래 Profile</strong>은 현재 기본 노래 Profile을 사용합니다.</p></div>
  {% include advanced-streaming-screenshot.html name="26-song-profile-tag-menu.png" alt="곡 행에서 연 Profile 태그 메뉴" caption="곡 행 오른쪽 태그 아이콘에서 자동 노래 Profile, 방송 대화 또는 사용자／내장 Profile을 선택할 수 있습니다. 선택한 색상 태그는 곡 행에 표시됩니다." %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">LIVE CONTROL</p><h2>방송 중 효과 전환 및 마이크 음소거</h2><p>작업 화면 위에서 원하는 Profile을 즉시 적용하거나 곡 태그 자동 전환으로 돌아갈 수 있습니다. 옆의 마이크 버튼으로 음소거／해제하고 전환 후 라우팅 화면의 미터를 확인하세요.</p></div>
  {% include advanced-streaming-screenshot.html name="27-live-profile-menu.png" alt="작업 화면 위쪽에서 연 방송 중 Profile 메뉴" caption="위쪽 Profile 메뉴로 효과를 즉시 지정하거나 자동 전환으로 돌아갈 수 있습니다. 옆에서 Monitor, 녹음과 마이크 음소거도 조작합니다." size="medium" %}
</div>

### 상단 바 컨트롤

- **모니터 소스**에서 BGM／반주, 전체 믹스, Wet／Dry 보컬 조합 또는 처리된 마이크만 선택합니다.
- **헤드폰**은 선택한 모니터를 켜고 끄며 소스 선택은 유지합니다.
- **녹음**은 왼쪽 클릭으로 시작／정지하고 오른쪽 클릭으로 전체 출력／모니터 내용, WAV 형식과 저장 폴더 메뉴를 엽니다.
- **마이크**는 왼쪽 클릭으로 음소거／복원하고 오른쪽 클릭으로 Profile 메뉴를 열어 수동 체인 또는 자동 전환을 선택합니다. 상태 아이콘은 트레이 메뉴와 같습니다.
- **Profile**은 수동 효과 체인 또는 곡 태그를 따르는 자동 전환을 선택합니다.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">MONITOR &amp; RECORD</p><h2>모니터 내용을 선택하고 전체 믹스 녹음</h2><p>헤드폰 버튼으로 모니터링을 제어합니다. BGM／반주, 전체 믹스, Wet／Dry 마이크 조합 또는 처리된 마이크만 들을 수 있습니다. 녹음은 전체 출력이나 모니터 내용을 WAV 16-bit PCM 또는 WAV 32-bit Float로 저장합니다.</p></div>
  <p><strong>피드백 방지:</strong> 마이크 모니터링 중에는 마이크로 다시 들어가는 스피커 대신 헤드폰을 사용하세요. 실제 방송 전에 짧게 녹음해 목소리, 반주, 음량과 지연을 확인하세요.</p>
</div>

### 모니터와 녹음은 Profile 음색을 바꾸지 않습니다

모니터는 독립된 헤드폰 경로입니다. Dry Cue는 독립된 소프트웨어 캡처로 드라이 보컬 모니터 지연을 가능한 한 낮추지만 정식 Mix, OBS 또는 녹음 경로는 바꾸지 않습니다. 노래할 때 가장 낮은 모니터 지연이 필요하면 오디오 인터페이스의 hardware Direct Monitor를 우선 사용하세요. Meter의 BGM／반주 모니터와 보컬 모니터 노브는 0–200% 범위로 연주자가 듣는 균형만 바꿉니다. 시청자용 Stream Output이나 Profile 내부 Compressor, EQ 등에는 영향을 주지 않습니다. **전체 출력** 녹음은 정식 Stream Output 타임라인을 사용하므로 BGM／반주와 보컬이 같은 정식 시간축에 기록됩니다. Dry Cue 또는 다른 소프트웨어 모니터 지연은 녹음 안에서 두 신호의 상대 offset을 바꾸지 않습니다.

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">METER &amp; HEALTH</p><h2>5개 오디오 경로와 시스템 부하 확인</h2><p>고급 방송 모드에서는 보기 또는 트레이 메뉴에서 Meter를 열 수 있습니다. 오른쪽 도킹, 독립 창, 가로／세로 레이아웃 전환을 지원합니다.</p></div>
  <p><strong>BGM／반주</strong>, <strong>보컬(Profile 후, Mix 전)</strong>, <strong>방송 출력</strong>, <strong>BGM／반주 모니터</strong>, <strong>보컬 모니터</strong>를 표시합니다. 모든 트랙에 Peak, 방송 출력에는 3초 단기 <strong>LUFS-S</strong>도 표시하며 0–200% 눈금 노브로 조절합니다.</p>
  <p>가로형 Meter는 BGM／반주와 보컬의 균형이 오랫동안 어긋날 때 보컬을 높이거나 반주를 낮추도록 안내합니다. 조언만 제공하며 게인을 자동으로 변경하지 않습니다. 적격 보컬 활동이 아직 감지되지 않은 동안에는 안내를 표시하지 않습니다. 적격 보컬이 5초 동안 연속으로 감지되지 않으면 간주 구간으로 처리하고 이전 안내와 판단 데이터를 지운 뒤 다음 보컬 구간부터 다시 판단합니다.</p>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="audio-meter-horizontal.png" alt="가로 레벨 바를 사용하는 5트랙 오디오 Meter" caption="이 실제 화면은 5개 Peak 경로와 0–200% 제어를 보여 줍니다. LUFS-S와 지속 균형 문구는 측정 조건을 만족할 때만 나타나므로 이 고정 신호 이미지에는 채워지지 않았습니다." %}{% include localized-release-screenshot.html name="audio-meter-vertical.png" alt="세로 레벨 바를 사용하는 5트랙 오디오 Meter 패널" caption="이 이미지는 세로 Meter 패널과 같은 5개 경로／제어를 표시합니다. 오디오 경로를 바꾸지 않고 메인 창 오른쪽에 도킹할 수도 있습니다." %}</div>
  <div class="effect-reference"><details><summary><strong>음량 균형 안내의 판단 방식</strong><span>무음, 호흡, 간주를 보컬과 구분합니다</span></summary><div class="effect-reference__body"><p>Meter는 실제 방송 경로의 Mix 전 BGM／반주와 Profile 후 보컬을 100ms 단위로 확인합니다. BGM／반주가 실제 Playing 상태이고 신호가 있으며, 라우팅과 마이크 상태가 정상이고 보컬 활동이 조건을 통과할 때만 데이터를 누적합니다. Noise Gate 정보가 있으면 해당 구간의 약 25% 이상에서 Gate가 열려 있어야 하며, Profile 후 보컬의 평균 에너지는 −45 dBFS 이상, 처리 전 마이크 Peak는 −50 dBFS 이상이어야 합니다. 안내가 표시되려면 최소 10초 재생, 최근 12초 중 6초 이상의 적격 보컬, 각각 최소 1.2초이고 서로 최소 300ms 떨어진 두 구절이 필요합니다. BGM／반주 레벨이 보컬보다 2dB 넘게 낮지 않거나 더 큰 상태도 최근 적격 데이터에서 최소 6초 누적되어야 합니다. 적격 구간의 보컬 평균 에너지가 −26 dBFS 이하일 때만 “보컬이 작을 수 있음” 안내도 표시합니다. 최근 처리 전 또는 처리 후 보컬 Peak가 −6 dBFS 이상이거나 Limiter 게인 감소가 1dB를 초과하면 반주를 낮추라는 안내만 유지하고 보컬을 높이라고 권하지 않습니다. 곡 변경, 재생 중지 또는 재시작, 큰 폭의 재생 위치 이동, Profile 변경, 라우팅 중단 또는 복구 대기, Meter 숨김은 판단 데이터를 초기화합니다. 이는 지속적인 신호 활동과 음량 비교이며 음성 인식이 아닙니다.</p></div></details></div>
  <p>오른쪽 아래의 테두리 없는 CPU／RAM 표시는 시스템 전체와 앱 사용량을 구분합니다. 고급 방송 모드에서는 Buffer, callback, 예상 지연, underrun／overrun도 Tooltip에 표시합니다.</p>
  {% include localized-release-screenshot.html name="system-resource-status.png" alt="메인 창 오른쪽 아래에 접힌 CPU／RAM 요약" caption="이 이미지는 포인터를 두기 전의 간결한 CPU／RAM 요약만 보여 줍니다. 포인터를 두면 위에서 설명한 시스템／앱 부하와 고급 오디오 상태가 펼쳐집니다." size="medium" %}
  {% include system-health-interpretation.html %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">TRAY &amp; SHORTCUTS</p><h2>시스템 트레이에 둔 채 방송 제어</h2><p>닫기 버튼을 트레이 최소화 또는 완전 종료로 동작하도록 설정할 수 있습니다.</p></div>
  <p>상태에 따라 재생／계속, 일시 정지, 정지, 처음부터 재생, Key, 속도, Profile, 마이크, 가사 창, 메인 창과 고급 방송 모드 전용 Meter를 표시합니다. “앱 종료”가 본체와 helper를 끝냅니다.</p>
  {% include localized-release-screenshot.html name="notification-area-menu.png" alt="재생하지 않을 때의 Singing Stream Savior Windows 시스템 트레이 메뉴" caption="이 실제 화면은 재생하지 않을 때의 간결한 메뉴입니다. 반주 재생 또는 고급 방송 모드에서는 위에서 설명한 재생, Key, 속도, Profile, 마이크와 Meter 동작이 추가됩니다. 맨 아래 종료 항목은 본체와 helper를 완전히 종료합니다." size="medium" %}
  <p>전역 단축키는 재생 제어와 마이크／모니터로 분류되며 기본 키를 제공합니다. 일반 재생에서는 고급 모드 전용 항목을 숨깁니다.</p>
  {% include keyboard-shortcuts-reference.html %}
  {% include localized-release-screenshot.html name="keyboard-shortcuts.png" alt="재생, 마이크와 모니터로 분류된 키보드 단축키 설정" caption="기본 키를 직접 바꿀 수 있으며 고급 방송 모드가 필요한 항목은 일반 재생에서 숨깁니다." %}
</div>

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">OBS DIRECT OUTPUT</p><h2>OBS 오디오 플러그인 또는 가상 장치 사용</h2><p>두 경로 모두 Profile, Mix Bus와 최종 리미터를 통과한 같은 Stream Output을 보냅니다.</p></div>
  <p>기존 OBS 플러그인 메뉴에는 표준 OBS, Portable 폴더와 제거가 있습니다. 설치가 끝나면 <strong>Singing Stream Savior Audio (OBS Plugin)</strong> 출력을 자동 선택합니다. OBS를 다시 시작하고 같은 이름의 오디오 소스를 추가하세요.</p>
  <p>VB-CABLE을 사용할 때는 Singing Stream Savior에서 CABLE Input, OBS 오디오 입력 캡처에서 CABLE Output을 선택합니다. 중복되는 원본 마이크 소스는 비활성화하세요.</p>
</div>

{% include obs-audio-output-setup.html %}

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

## 개발 PC 전체 테스트 데이터(참고)

일반 설정에서는 아래 기술 데이터를 행마다 이해할 필요가 없습니다. 작성자 PC의 버전 테스트 근거와 지연／안정성 문제를 자세히 확인할 때의 참고 자료로 남겨 둡니다.

<div class="effect-reference"><details><summary><strong>ASIO, Windows Audio, OBS 및 가상 출력 전체 결과 보기</strong><span>지연, 연속성 및 장시간 스트레스 테스트</span></summary><div class="effect-reference__body">
{% include audio-test-results-ko.html %}
</div></details></div>

<small>VB-CABLE 이름, 화면과 설치 프로그램은 VB-Audio Software의 제품입니다. 스크린샷은 설치 단계 설명 목적으로만 사용합니다.</small>
