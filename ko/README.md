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
    <div class="intro-actions"><a class="intro-button intro-button--primary" href="{{ '/ko/guide.html#getting-started' | relative_url }}">시작하기</a><a class="intro-button" href="#features">주요 기능 보기</a></div>
  </div>
  <figure class="intro-hero__visual"><img src="{{ '/assets/images/ko/full-workspace.png' | relative_url }}" alt="한국어 전체 모드의 라이브러리, BGM, 반주와 예약 목록"><figcaption>선곡, 재생과 방송 화면을 하나의 작업 공간에서 관리합니다.</figcaption></figure>
</div>

{% include demo-video.html %}

<section class="release-log" aria-labelledby="release-201-title">
  <div class="release-log__rail"><span class="release-log__signal" aria-hidden="true"></span><span>STABLE UPDATE</span><strong>2.0.1.0</strong></div>
  <div class="release-log__body">
    <div class="section-heading"><p class="section-kicker">이번 업데이트</p><h2 id="release-201-title">자동화를 눈에 보이게 하고 미리보기를 방송에 가깝게</h2><p>재생 연동, 테마 상태와 가사 타이밍을 방송 전에 더 쉽게 이해하고 확인할 수 있습니다.</p></div>
    <div class="release-log__grid">
      <article><span class="release-log__index">01</span><div><strong>재생 상태</strong><p>하단 상태 영역에서 BGM과 반주 연동을 설명합니다. BGM 페이드아웃을 선택하고 반주와의 겹침을 막을 수 있습니다.</p></div></article>
      <article><span class="release-log__index">02</span><div><strong>자동 테마 데모</strong><p>샘플 곡으로 긴 Set List, 타임스탬프, Reserve와 Next On을 순환 표시하며 프로젝트와 OBS는 변경하지 않습니다.</p></div></article>
      <article><span class="release-log__index">03</span><div><strong>쉬운 가사 보정</strong><p>‘가사가 너무 빠름/느림’, 앞뒤 줄 슬라이더, 히라가나＋로마자와 가사 창 동기화 개선을 제공합니다.</p></div></article>
      <article><span class="release-log__index">04</span><div><strong>조작과 업데이트 안정성</strong><p>속도, 음정, 탐색, 숫자 입력, 버튼과 hover를 개선했습니다. 업데이트는 SHA-256 검증과 롤백을 지원합니다.</p></div></article>
    </div>
    <a class="release-log__link" href="https://github.com/NoonIsAwesome/Singing-Stream-Savior-Updates/releases/tag/v2.0.1.0">2.0.1.0 전체 업데이트 보기 <span aria-hidden="true">→</span></a>
  </div>
</section>

<section class="origin-story" id="why">
  <div><p class="section-kicker">왜 만들었나요?</p><h2>노래 방송에서 자주 생기는 작은 실수에서 시작했습니다</h2><p>노래를 시작하기 전에 BGM을 끄거나, 노래가 끝난 뒤 다시 켜는 것을 자주 잊었습니다. 방금 부른 곡을 OBS 세트리스트에 추가하는 일도 놓치기 쉬웠습니다. 어려운 일은 아니지만 노래, 채팅과 다음 곡을 동시에 챙기다 보면 빠뜨리기 쉽습니다.</p><p>그래서 Singing Stream Savior를 만들었습니다. 먼저 BGM을 선택해 재생하면 반주 시작 시 해당 BGM을 자동으로 일시 정지하고, 반주를 정지하거나 끝까지 재생한 뒤 원래 BGM을 자동으로 다시 재생합니다. 세트리스트 Overlay도 곡 상태에 따라 갱신되어 OBS에서 매번 제목을 다시 입력할 필요가 없습니다.</p></div>
  <div class="stream-sequence" aria-label="BGM과 반주의 자동 전환"><div class="stream-step stream-step--playing"><span>BGM</span><strong>곡 사이에 재생</strong></div><div class="stream-arrow"><span>반주 시작</span></div><div class="stream-step stream-step--active stream-step--paused"><span>반주</span><strong>BGM 자동 정지</strong></div><div class="stream-arrow"><span>일시 정지·종료</span></div><div class="stream-step stream-step--playing"><span>BGM</span><strong>자동 재생 재개</strong></div></div>
</section>

<section class="demo-flow" aria-labelledby="demo-flow-title">
  <div class="section-heading">
    <p class="section-kicker">설정에서 방송 화면까지</p>
    <h2 id="demo-flow-title">Singing Stream Savior에서 미리 확인한 뒤 OBS에 표시하세요</h2>
    <p>아래 화면은 한국어 UI와 격리된 샘플 데이터를 사용한 2.0.1.0 실제 화면입니다.</p>
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
    <article class="feature-card feature-card--signal"><span class="feature-card__label">재생 연동</span><h3>BGM과 반주를 자동 전환</h3><p>반주 시작 시 BGM을 자동으로 일시 정지하거나 페이드아웃하고, 반주를 정지하거나 끝까지 재생한 뒤 원래 BGM을 다시 재생합니다.</p></article>
    <article class="feature-card"><span class="feature-card__label">곡과 예약</span><h3>미리 준비하고 현장 선곡에도 대응</h3><p>곡 라이브러리, 재생목록, 즐겨찾기와 예약 순서를 관리합니다. 예약에서 고르거나 원하는 곡을 두 번 클릭해 바로 재생할 수 있습니다.</p></article>
    <article class="feature-card"><span class="feature-card__label">OBS 세트리스트</span><h3>테마를 바꾸고 곡명 입력은 줄이기</h3><p>Default, 투명, Card, CD 또는 장식 테마를 자동 데모로 확인한 뒤 OBS로 드래그할 수 있습니다.</p></article>
    <article class="feature-card"><span class="feature-card__label">가사</span><h3>진행자가 읽거나 시청자에게 표시</h3><p>동기화 가사를 검색·가져와 가사 창 또는 OBS에 표시합니다. 일본어는 히라가나, 로마자 또는 두 가지 동시 표기를 지원합니다.</p></article>
    <article class="feature-card"><span class="feature-card__label">반주 소스</span><h3>로컬 음원과 YouTube 반주를 하나의 플레이어에서</h3><p>보컬을 제거하거나 직접 녹음하고 내려받은 로컬 파일도, 그 자리에서 YouTube로 찾은 반주도 사용할 수 있습니다. Singing Stream Savior는 두 방식을 모두 지원하므로 미디어 플레이어와 브라우저를 번갈아 열 필요가 없습니다.</p></article>
    <article class="feature-card"><span class="feature-card__label">작업 공간</span><h3>전체, 간단, 미니의 세 가지 모드</h3><p>준비할 때는 전체 모드, 방송 중에는 간단 또는 미니 모드를 사용해 반주, 예약, 연혁과 가사 창 같은 필수 조작만 남깁니다.</p></article>
  </div>
</section>

<aside class="experimental-note"><span>시험 기능</span><div><strong>OBS WebSocket 방송 타임스탬프</strong><p>OBS의 실제 방송 시간을 읽고 반주 시작 시각을 기록하여 지원 Set List에 표시할 수 있습니다. 일반 세트리스트와 가사 화면에는 WebSocket이 필요하지 않습니다.</p></div></aside>

<section class="intro-next"><p class="section-kicker">준비 시작</p><h2>먼저 한 곡을 가져와 테스트 재생하세요</h2><p>사용자 설명서는 압축 해제, 앱 실행과 첫 프로젝트 만들기부터 안내합니다.</p><a class="intro-button intro-button--primary" href="{{ '/ko/guide.html#getting-started' | relative_url }}">사용자 설명서 열기</a></section>
