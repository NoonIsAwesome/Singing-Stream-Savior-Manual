---
title: Singing Stream Savior｜노래 방송의 재생, 세트리스트와 가사 관리
description: Singing Stream Savior를 만든 이유와 주요 기능
lang: ko
translation_key: home
---

<div class="intro-hero">
  <div class="intro-hero__copy">
    <p class="intro-kicker">SINGING STREAM SAVIOR · 노래 방송 컨트롤 데스크</p>
    <h1>방송 중 잊기 쉬운 작업은 앱에 맡기세요</h1>
    <p class="intro-lead">BGM, 반주, 예약 곡, OBS 세트리스트와 가사를 한 화면에서 준비하고 조작합니다. 곡 사이에 여러 창을 정리하는 대신 노래와 시청자에게 집중할 수 있습니다.</p>
    <div class="intro-actions"><a class="intro-button intro-button--primary" href="{{ '/ko/guide.html#getting-started' | relative_url }}">시작하기</a><a class="intro-button" href="#features">주요 기능 보기</a><a class="intro-button" href="{{ '/ko/resources.html' | relative_url }}">앱 다운로드</a></div>
  </div>
  <figure class="intro-hero__visual"><img src="{{ '/assets/images/ko/full-workspace.png' | relative_url }}" alt="한국어 전체 모드의 카드형 곡 목록, BGM, 반주와 대기 목록"><figcaption>카드형 곡 목록, 두 플레이어와 대기 목록을 한 작업 공간에서 관리합니다.</figcaption></figure>
</div>

<section class="intro-promo" aria-labelledby="intro-promo-title">
  <a class="intro-promo__visual" href="{{ '/assets/images/booth-promo-ko.png' | relative_url }}"><img src="{{ '/assets/images/booth-promo-ko.png' | relative_url }}" alt="OBS 세트리스트, 자막과 방송 화면을 보여 주는 한국어 기능 소개" decoding="async"></a>
  <div class="intro-promo__copy">
    <p class="section-kicker">시청자에게 보이는 완성된 방송</p>
    <h2 id="intro-promo-title">반주를 시작하면 BGM, 곡명, 세트리스트와 가사가 함께 움직입니다</h2>
    <p>놓치기 쉬운 재생 전환과 OBS 화면 갱신을 하나의 방송 흐름으로 정리합니다. 곡 사이에 화면을 고치는 대신 선곡과 노래에 집중하세요.</p>
    <div class="intro-promo__points"><span>BGM 자동 전환</span><span>OBS 세트리스트 동기화</span><span>싱크 가사</span><span>타임스탬프 자동 기록</span></div>
  </div>
</section>

{% include demo-video.html %}

<section class="origin-story" id="why">
  <div><p class="section-kicker">왜 만들었나요?</p><h2>노래 방송에서 자주 생기는 작은 실수에서 시작했습니다</h2><p>노래를 시작하기 전에 BGM을 끄거나, 노래가 끝난 뒤 다시 켜는 것을 자주 잊었습니다. 방금 부른 곡을 OBS 세트리스트에 추가하는 일도 놓치기 쉬웠습니다. 어려운 일은 아니지만 노래, 채팅과 다음 곡을 동시에 챙기다 보면 빠뜨리기 쉽습니다.</p><p>그래서 Singing Stream Savior를 만들었습니다. 먼저 BGM을 선택해 재생하면 반주 시작 시 해당 BGM을 자동으로 일시 정지하고, 반주를 정지하거나 끝까지 재생한 뒤 원래 BGM을 자동으로 다시 재생합니다. 세트리스트 Overlay도 곡 상태에 따라 갱신되어 OBS에서 매번 제목을 다시 입력할 필요가 없습니다.</p></div>
  <div class="stream-sequence" aria-label="BGM과 반주의 자동 전환"><div class="stream-step stream-step--playing"><span>BGM</span><strong>곡 사이에 재생</strong></div><div class="stream-arrow"><span>반주 시작</span></div><div class="stream-step stream-step--active stream-step--paused"><span>반주</span><strong>BGM 자동 정지</strong></div><div class="stream-arrow"><span>일시 정지·종료</span></div><div class="stream-step stream-step--playing"><span>BGM</span><strong>자동 재생 재개</strong></div></div>
</section>

<section class="demo-flow" aria-labelledby="demo-flow-title">
  <div class="section-heading">
    <p class="section-kicker">설정에서 방송 화면까지</p>
    <h2 id="demo-flow-title">Singing Stream Savior에서 미리 확인한 뒤 OBS에 표시하세요</h2>
    <p>세트리스트 테마와 가사는 앱에서 먼저 미리 볼 수 있습니다. OBS에 추가하면 두 화면이 곡과 재생 위치를 따라가며 방송 화면 위에 자유롭게 배치할 수 있습니다.</p>
  </div>
  <div class="demo-flow__track">
    <article class="demo-flow__step">
      <header><span class="demo-flow__number">01</span><div><strong>세트리스트 테마 선택</strong><small>재생목록 외관</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/ko/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ko/theme-workspace.png' | relative_url }}" alt="한국어 재생목록 외관 화면에서 Transparent Black v2와 긴 Set List를 자동 시연하는 모습" loading="lazy" decoding="async"></a>
      <p>자동 데모가 곡과 긴 Set List를 순환하며 Now Singing, Reserve와 Next On 변화를 보여 줍니다.</p>
    </article>
    <article class="demo-flow__step">
      <header><span class="demo-flow__number">02</span><div><strong>동기화 가사 확인</strong><small>가사 미리보기</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/ko/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/ko/lyrics-reading-preview.png' | relative_url }}" alt="한국어 가사 화면에서 타이밍 보정, 앞뒤 줄 수와 일본어 샘플 가사를 표시한 모습" loading="lazy" decoding="async"></a>
      <p>반주를 재생하면서 현재 줄, 글꼴, 색상, 강조와 타이밍을 확인할 수 있습니다.</p>
    </article>
    <article class="demo-flow__step">
      <header><span class="demo-flow__number">03</span><div><strong>OBS 결과 확인</strong><small>방송 화면</small></div></header>
      <a class="demo-flow__frame" href="{{ '/assets/images/demo-obs-result.png' | relative_url }}"><img src="{{ '/assets/images/demo-obs-result.png' | relative_url }}" alt="OBS 방송 배경 위에 투명 세트리스트와 동기화 가사를 표시한 모습" loading="lazy" decoding="async"></a>
      <p>세트리스트와 가사는 OBS의 독립된 소스이므로 각각 크기, 자르기와 위치를 자유롭게 조정할 수 있습니다.</p>
    </article>
  </div>
</section>

<section class="feature-section" id="features">
  <div class="section-heading"><p class="section-kicker">주요 기능</p><h2>실제 노래 방송 흐름에 맞춘 설계</h2><p>곡 준비, 노래, OBS 갱신을 하나의 연속된 작업 흐름으로 다룹니다.</p></div>
  <div class="feature-grid">
    <article class="feature-card feature-card--signal feature-card--illustrated"><a class="feature-card__visual" href="{{ '/assets/images/ko/bgm-playlist.png' | relative_url }}"><img src="{{ '/assets/images/ko/bgm-playlist.png' | relative_url }}" alt="반복 재생 목록과 재생 컨트롤을 표시한 BGM 플레이어" loading="lazy" decoding="async"></a><div class="feature-card__body"><span class="feature-card__label">재생 연동</span><h3>BGM과 반주를 자동 전환</h3><p>반주 시작 시 BGM을 자동으로 일시 정지하거나 페이드아웃하고, 반주를 정지하거나 끝까지 재생한 뒤 원래 BGM을 다시 재생합니다.</p></div></article>
    <article class="feature-card feature-card--illustrated"><a class="feature-card__visual" href="{{ '/assets/images/ko/song-library.png' | relative_url }}"><img src="{{ '/assets/images/ko/song-library.png' | relative_url }}" alt="재생 목록, 검색창, 여러 곡을 표시한 곡 라이브러리" loading="lazy" decoding="async"></a><div class="feature-card__body"><span class="feature-card__label">곡과 예약</span><h3>미리 준비하고 현장 선곡에도 대응</h3><p>곡과 대기 순서를 정리하고 반주를 바로 재생하거나, 아카펠라와 직접 연주를 위한 무반주 공연을 만들 수 있습니다.</p></div></article>
    <article class="feature-card feature-card--illustrated"><a class="feature-card__visual" href="{{ '/assets/images/ko/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ko/theme-workspace.png' | relative_url }}" alt="OBS 세트리스트 테마와 실시간 미리 보기를 표시한 노래 외관 페이지" loading="lazy" decoding="async"></a><div class="feature-card__body"><span class="feature-card__label">OBS 세트리스트</span><h3>테마를 바꾸고 곡명 입력은 줄이기</h3><p>Default, 투명, Card, CD 또는 장식 테마를 자동 데모로 확인한 뒤 OBS로 드래그할 수 있습니다.</p></div></article>
    <article class="feature-card feature-card--illustrated"><a class="feature-card__visual" href="{{ '/assets/images/ko/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/ko/lyrics-manager-linked.png' | relative_url }}" alt="동기화 가사 검색 결과와 연결된 가사를 표시한 가사 관리 화면" loading="lazy" decoding="async"></a><div class="feature-card__body"><span class="feature-card__label">가사</span><h3>진행자가 읽거나 시청자에게 표시</h3><p>동기화 가사를 검색·가져와 가사 창 또는 OBS에 표시합니다. 일본어는 히라가나와 로마자, 한국어는 로마자 표기를 지원합니다.</p></div></article>
    <article class="feature-card"><span class="feature-card__label">반주 소스</span><h3>로컬 음원과 YouTube 반주를 하나의 플레이어에서</h3><p>두 소스에 익숙한 지각 음량 곡선을 함께 적용하고 YouTube에는 단계별 대체 재생도 제공합니다. 미디어 플레이어와 브라우저를 번갈아 열 필요가 없습니다.</p></article>
    <article class="feature-card feature-card--illustrated"><a class="feature-card__visual" href="{{ '/assets/images/ko/compact-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ko/compact-workspace.png' | relative_url }}" alt="가사, BGM, 반주, 대기 컨트롤을 표시한 간단 작업 공간" loading="lazy" decoding="async"></a><div class="feature-card__body"><span class="feature-card__label">작업 공간</span><h3>전체, 간단, 미니의 세 가지 모드</h3><p>준비할 때는 전체 모드, 방송 중에는 간단 또는 미니 모드를 사용합니다. Windows 알림 영역으로 숨긴 뒤 트레이 메뉴나 전역 단축키로 계속 제어할 수도 있습니다.</p></div></article>
    <article class="feature-card"><span class="feature-card__label">곡별 보컬</span><h3>반주 재생에 맞춰 보컬 이펙트 자동 전환</h3><p>곡마다 마이크 Profile을 지정할 수 있습니다. 반주가 시작되면 자동 적용되고 끝나면 라이브 채팅 설정으로 돌아가며, 방송 중 수동 전환도 가능합니다.</p></article>
    <article class="feature-card feature-card--illustrated"><a class="feature-card__visual" href="{{ '/assets/images/ko/profile-horizontal-rack.png' | relative_url }}"><img src="{{ '/assets/images/ko/profile-horizontal-rack.png' | relative_url }}" alt="여러 이펙트를 가로 Rack으로 표시한 보컬 Profile 편집기" loading="lazy" decoding="async"></a><div class="feature-card__body"><span class="feature-card__label">보컬 Profiles</span><h3>내장 이펙트와 VST3로 체인 구성</h3><p>Gate, Compressor, EQ, Reverb, Delay, Shimmer 등 15개 내장 이펙트나 VST3를 추가하고 파라미터, Bypass와 처리 순서를 편집할 수 있습니다.</p></div></article>
    <article class="feature-card feature-card--illustrated"><a class="feature-card__visual" href="{{ '/assets/images/ko/audio-routing-bottom.png' | relative_url }}"><img src="{{ '/assets/images/ko/audio-routing-bottom.png' | relative_url }}" alt="마이크, Profile, 방송 Mix, 출력과 Monitor를 연결한 오디오 라우팅 그래프" loading="lazy" decoding="async"></a><div class="feature-card__body"><span class="feature-card__label">방송 오디오</span><h3>반주와 보컬을 하나의 Mix로 OBS에 전송</h3><p>ASIO, Windows Audio, 전용 OBS 오디오 플러그인과 가상 오디오 장치를 지원합니다. Final Mix, OBS와 전체 출력 녹음은 안정적으로 정렬된 정식 경로를 공유합니다.</p></div></article>
    <article class="feature-card"><span class="feature-card__label">Monitor와 녹음</span><h3>시청자 Mix를 움직이지 않고 들을 소리 선택</h3><p>반주, Dry, Wet 또는 전체 출력을 모니터하거나 녹음할 수 있습니다. ‘반주＋Dry’는 독립 저지연 Cue를 사용하며, 주 보컬 모니터는 오디오 인터페이스의 Direct Monitor를 권장합니다.</p></article>
    <article class="feature-card feature-card--illustrated"><a class="feature-card__visual" href="{{ '/assets/images/ko/audio-health-check.png' | relative_url }}"><img src="{{ '/assets/images/ko/audio-health-check.png' | relative_url }}" alt="안정성, 지연과 권장 설정을 표시한 오디오 Buffer 상태 점검 결과" loading="lazy" decoding="async"></a><div class="feature-card__body"><span class="feature-card__label">Meter와 상태 점검</span><h3>음량, Buffer, 지연과 끊김 확인</h3><p>5트랙 Meter에 Peak와 Stream Output LUFS-S를 표시합니다. Buffer 상태 점검은 안정성과 예상 지연을 비교하고 바로 적용할 수 있는 설정을 제안합니다.</p></div></article>
    <article class="feature-card feature-card--illustrated"><a class="feature-card__visual" href="{{ '/assets/images/live-timeline-card.jpg' | relative_url }}"><img src="{{ '/assets/images/live-timeline-card.jpg' | relative_url }}" alt="Now Singing, Next On과 곡 타임스탬프가 표시된 방송 화면" loading="lazy" decoding="async"></a><div class="feature-card__body"><span class="feature-card__label">방송 타임스탬프</span><h3>Set List에 실제 방송 타임라인 표시</h3><p>OBS WebSocket으로 각 반주 시작 시각을 기록해 지원 Set List에 표시합니다. 일반 세트리스트와 가사에는 WebSocket이 필요하지 않습니다.</p></div></article>
  </div>
</section>

<section class="intro-next"><p class="section-kicker">준비 시작</p><h2>먼저 한 곡을 가져와 테스트 재생하세요</h2><p>사용자 설명서는 압축 해제, 앱 실행과 첫 프로젝트 만들기부터 안내합니다.</p><a class="intro-button intro-button--primary" href="{{ '/ko/guide.html#getting-started' | relative_url }}">사용자 설명서 열기</a></section>
