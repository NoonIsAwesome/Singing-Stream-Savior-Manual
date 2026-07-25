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

<section class="origin-story" id="why">
  <div><p class="section-kicker">왜 만들었나요?</p><h2>노래 방송에서 자주 생기는 작은 실수에서 시작했습니다</h2><p>노래를 시작하기 전에 BGM을 끄거나, 노래가 끝난 뒤 다시 켜는 것을 자주 잊었습니다. 방금 부른 곡을 OBS 세트리스트에 추가하는 일도 놓치기 쉬웠습니다. 어려운 일은 아니지만 노래, 채팅과 다음 곡을 동시에 챙기다 보면 빠뜨리기 쉽습니다.</p><p>그래서 Singing Stream Savior를 만들었습니다. 반주를 재생하면 BGM을 자동으로 일시 정지하고, 반주를 일시 정지하거나 끝내면 BGM을 다시 재생할 수 있습니다. 세트리스트 Overlay도 곡 상태에 따라 갱신되어 OBS에서 매번 제목을 다시 입력할 필요가 없습니다.</p></div>
  <div class="stream-sequence" aria-label="BGM과 반주의 자동 전환"><div class="stream-step"><span>BGM</span><strong>곡 사이에 재생</strong></div><div class="stream-arrow"><span>반주 시작</span></div><div class="stream-step stream-step--active"><span>반주</span><strong>BGM 자동 정지</strong></div><div class="stream-arrow"><span>일시 정지·종료</span></div><div class="stream-step"><span>BGM</span><strong>자동 재생 재개</strong></div></div>
</section>

<section class="feature-section" id="features">
  <div class="section-heading"><p class="section-kicker">주요 기능</p><h2>실제 노래 방송 흐름에 맞춘 설계</h2><p>곡 준비, 노래, OBS 갱신을 하나의 연속된 작업 흐름으로 다룹니다.</p></div>
  <div class="feature-grid">
    <article class="feature-card feature-card--signal"><span class="feature-card__label">재생 연동</span><h3>BGM과 반주를 자동 전환</h3><p>반주가 시작되면 BGM을 자동으로 일시 정지하고, 반주를 일시 정지하거나 끝내면 원래 BGM을 다시 재생합니다.</p></article>
    <article class="feature-card"><span class="feature-card__label">곡과 예약</span><h3>미리 준비하고 현장 선곡에도 대응</h3><p>곡 라이브러리, 재생목록, 즐겨찾기와 예약 순서를 관리합니다. 예약에서 고르거나 원하는 곡을 두 번 클릭해 바로 재생할 수 있습니다.</p></article>
    <article class="feature-card"><span class="feature-card__label">OBS 세트리스트</span><h3>테마를 바꾸고 곡명 입력은 줄이기</h3><p>Default, 투명, Card, CD 또는 장식 테마를 골라 OBS로 드래그합니다. Now Singing, Set List, Reserve와 Next On이 재생 상태를 따릅니다.</p></article>
    <article class="feature-card"><span class="feature-card__label">가사</span><h3>진행자가 읽거나 시청자에게 표시</h3><p>동기화 가사를 검색·가져오고 이동 가능한 ‘가사 창’에서 읽거나 OBS 가사 화면으로 표시합니다. 일본어는 히라가나와 로마자 읽기 보조를 지원합니다.</p></article>
    <article class="feature-card"><span class="feature-card__label">표지</span><h3>Card와 CD 테마에 곡의 개성 추가</h3><p>표지와 가사는 선택 사항입니다. 표지를 설정하면 Card와 CD 테마에서 현재 곡을 카드나 디스크로 보여 줄 수 있습니다.</p></article>
    <article class="feature-card"><span class="feature-card__label">작업 공간</span><h3>전체, 간단, 미니의 세 가지 모드</h3><p>준비할 때는 전체 모드, 방송 중에는 간단 또는 미니 모드를 사용해 반주, 예약, 연혁과 가사 창 같은 필수 조작만 남깁니다.</p></article>
  </div>
</section>

<aside class="experimental-note"><span>시험 기능</span><div><strong>OBS WebSocket 방송 타임스탬프</strong><p>OBS의 실제 방송 시간을 읽고 반주 시작 시각을 기록하여 지원 Set List에 표시할 수 있습니다. 일반 세트리스트와 가사 화면에는 WebSocket이 필요하지 않습니다.</p></div></aside>

<section class="intro-next"><p class="section-kicker">준비 시작</p><h2>먼저 한 곡을 가져와 테스트 재생하세요</h2><p>사용자 설명서는 압축 해제, 앱 실행과 첫 프로젝트 만들기부터 안내합니다.</p><a class="intro-button intro-button--primary" href="{{ '/ko/guide.html#getting-started' | relative_url }}">사용자 설명서 열기</a></section>
