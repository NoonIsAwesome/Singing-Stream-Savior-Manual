---
title: "Profile(방송 이펙트) 설정"
description: "Profile은 반복해서 사용할 보컬 효과 설정입니다. Signal Chain의 각 효과, 매개변수, 켜짐 상태와 처리 순서를 저장합니다. 이 장은 효과 편집, 미리 듣기, 곡 태그, 기본 Profile과 VST3를 다룹니다."
lang: ko
translation_key: profiles
---

# Profile(방송 이펙트) 설정

{% include profile-prerequisite.html %}

<div class="manual-feature-update">
  <div class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">VOICE CHAIN</p><h2>음성 Profiles 만들기 및 편집</h2><p>Profile은 재사용할 수 있는 보컬 효과 체인입니다. 내장 효과 또는 VST3 Plugin을 추가하고, Block 순서를 드래그해 바꾸며, 개별 Block을 우회하고 저장 전에 미리 들을 수 있습니다.</p></div>
  <div class="feature-shot-grid">{% include localized-release-screenshot.html name="profile-horizontal-rack.png" alt="가로 Profile 효과 Rack" caption="가로 Rack은 실제 처리 순서로 전체 효과 체인을 보여 줍니다." %}{% include localized-release-screenshot.html name="profile-vertical-rack.png" alt="세로 Profile 효과 Rack" caption="세로 Rack도 같은 Block, Bypass, 드래그 순서와 편집기를 사용하며 신호 처리는 바뀌지 않습니다." %}</div>
</div>

### Profile에 저장되는 내용

- 각 Block의 활성 상태, 파라미터와 처리 순서를 함께 저장하고 프로젝트를 다시 열 때 복원합니다.
- 내장 효과와 최대 8개의 VST3 Plugin 슬롯을 함께 사용할 수 있으며 VST3 parameter state도 Profile에 저장합니다.
- Block을 드래그하면 실제 처리 순서가 바뀝니다. Bypass는 설정을 삭제하지 않고 처리만 잠시 건너뜁니다.
- Monitor를 켜면 Profile 편집기에서 현재 편집 중인 Profile을 미리 들을 수 있습니다. 반주를 재생한 채 이펙트를 조정할 수 있고, 음성 효과만 들으려면 오른쪽 위의 **S(Solo)**를 누릅니다. 라이브 화면으로 돌아가거나 트레이로 최소화하거나 편집기를 닫으면 미리 듣기를 끝내고 이전 방송 Monitor로 복원합니다.
- Factory Profile은 실용적인 출발점입니다. 마이크, 방 소음, 음역과 창법에 맞게 조절한 뒤 개인 Profile로 저장하세요.

{% include profile-signal-chain.html %}

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
