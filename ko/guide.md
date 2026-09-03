---
title: Singing Stream Savior 2.1 사용자 설명서
description: Singing Stream Savior 2.1.0.3 한국어 설명서
lang: ko
translation_key: home
manual_bundle: true
---

# Singing Stream Savior 2.1 사용자 설명서

Singing Stream Savior는 노래 방송을 위한 Windows 앱입니다. 곡 라이브러리, BGM, 반주, 대기 목록, 가사, 보컬 처리, 오디오 라우팅과 OBS 출력을 하나의 흐름으로 관리합니다. 이 설명서는 **2.1.0.3** 버전을 기준으로 합니다.

<figure class="manual-figure"><a href="{{ '/assets/images/ko/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/ko/lyrics-reading-preview.png' | relative_url }}" alt="가사 설정, OBS 미리보기, 플레이어와 대기 목록을 표시한 전체 모드"></a><figcaption>전체 모드는 방송 전에 곡, 가사와 OBS 화면을 준비할 때 적합합니다. 이미지를 누르면 확대 미리보기를 열 수 있습니다.</figcaption></figure>

## 처음 사용할 때 권장 설정 순서

1. 로컬 파일이나 YouTube 링크를 드래그하거나 선택 버튼을 사용해 방송용 BGM을 설정합니다. 설정한 BGM은 자동으로 반복 재생됩니다.
2. 로컬 파일이나 YouTube 링크를 곡 목록에 드래그하거나 가져오기 버튼으로 반주를 추가합니다.
3. 각 곡의 **표시 제목**을 수정합니다. 재생 중에는 이 제목이 세트리스트에 표시됩니다.
4. 곡을 **대기 목록**에 추가하면 세트리스트에 다음 곡을 표시할 수 있습니다.
5. **재생목록 외관**으로 이동해 자동 미리보기로 테마를 고른 뒤 **OBS로 드래그**를 OBS에 놓습니다.
6. **라이브 조작**으로 돌아가 곡 목록이나 대기 목록의 곡을 두 번 클릭해 노래를 시작합니다. BGM은 자동으로 멈췄다가 종료 후 다시 재생됩니다.
7. 재생 중 가사 검색 창이 열리면 길이와 가수 정보가 반주에 가까운 동기화 가사를 선택합니다.
8. **가사** 탭에서 표시를 조절하거나 가사를 직접 관리한 뒤 **OBS로 드래그**를 OBS에 놓아 동기화 가사를 표시합니다.

> 처음부터 인터페이스 언어나 프로젝트/미디어 폴더 위치를 설정하거나 시험용 대기 목록을 만들 필요는 없습니다. 대기 목록, 표지, 가사와 OBS WebSocket은 방송에 필요할 때 나중에 설정할 수 있습니다.

<a id="getting-started"></a>
## 01 · 시작하기

ZIP을 일반 폴더에 완전히 압축 해제하세요. 가장 바깥쪽 폴더에서 아래 아이콘의 `Singing Stream Savior.exe`를 두 번 클릭하면 됩니다. 사용자가 열어야 하는 파일은 이것뿐이며, ZIP 안에서 직접 실행하거나 데이터 폴더 안의 다른 EXE를 찾을 필요가 없습니다.

<div class="launch-target"><img src="{{ '/assets/images/singing-stream-savior.ico' | relative_url }}" alt="Singing Stream Savior 앱 아이콘"><div><strong>Singing Stream Savior.exe</strong><span>평소에는 이 앱만 실행하세요</span></div></div>

**파일 > 새 프로젝트**에서 `.bgmsproj`를 만듭니다. 곡, 표시 제목, 대기 순서, 가사 연결과 테마 설정이 저장됩니다. 부른 곡 기록은 현재 라이브 세션용이며 일반 프로젝트 저장에는 포함되지 않습니다. 앱이 예기치 않게 중단되면 다시 시작할 때 복구 스냅샷에서 대기 목록과 부른 곡 진행 상황을 복원할 수 있습니다. 창 제목의 `*`는 저장하지 않은 변경 사항을 뜻합니다.

### 첫 사용 가이드를 따라 설정하기

2.0.2.0부터 처음 조작 화면에 들어가면 8단계 첫 사용 가이드가 자동으로 열립니다. 설명할 페이지로 전환해 해당 영역을 강조하지만 프로젝트를 바꾸거나 곡을 재생하지는 않습니다. 이후에도 **도움말 > 첫 사용 가이드**에서 언제든 다시 열 수 있습니다.

<div class="figure-grid">
  {% include localized-release-screenshot.html name="full-workspace.png" alt="2.1 전체 작업 화면과 BGM 플레이어" caption="첫 사용 가이드는 관련 페이지로 이동해 BGM 설정, 드래그 앤 드롭과 자동 전환 영역을 강조합니다." %}
  {% include localized-release-screenshot.html name="theme-workspace.png" alt="2.1 재생목록 외관 작업 화면" caption="테마 단계는 자동 미리보기와 OBS로 드래그 위치를 안내하며 스크린샷도 현재 설명 언어에 맞춰 바뀝니다." %}
</div>

<a id="library-and-playback"></a>
## 02 · 곡 라이브러리와 재생

라이브러리에는 모든 곡, 즐겨찾기, 최근 재생과 사용자 재생목록이 있습니다. 고정 분류는 삭제할 수 없으며, 사용자 재생목록은 방송 기획, 장르나 이벤트별로 곡을 정리할 때 사용합니다.

<figure class="manual-figure"><a href="{{ '/assets/images/ko/song-library.png' | relative_url }}"><img src="{{ '/assets/images/ko/song-library.png' | relative_url }}" alt="모든 곡, 즐겨찾기, 최근 재생, 사용자 재생목록과 곡 표가 보이는 전체 라이브러리"></a><figcaption>왼쪽에서 분류를 선택하면 오른쪽 표와 검색 대상이 함께 바뀝니다.</figcaption></figure>

곡을 분류하려면 한 곡 또는 여러 곡을 선택해 마우스 오른쪽 버튼을 누르고 **재생목록에 추가**에서 **즐겨찾기** 또는 사용자 재생목록을 고르세요. 음원은 복제되지 않고 모든 곡에서도 사라지지 않으며, 한 곡을 여러 재생목록에 넣을 수 있습니다.

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ko/add-to-playlist-menu.png' | relative_url }}"><img src="{{ '/assets/images/ko/add-to-playlist-menu.png' | relative_url }}" alt="표시 곡명 편집, 대기 목록에 추가, 재생목록에 추가와 트랙 삭제가 있는 오른쪽 클릭 메뉴"></a><figcaption>표시 곡명 편집이 첫 항목이며 같은 메뉴에서 대기 목록이나 재생목록에도 추가할 수 있습니다.</figcaption></figure>

파일 선택 창에서 가져오는 것뿐 아니라 하나 이상의 로컬 오디오 파일을 소프트웨어로 바로 끌어다 놓을 수 있습니다. YouTube 단일 동영상 URL은 붙여넣거나 끌어다 놓으면 한 곡으로 추가됩니다. YouTube 재생목록 URL도 바로 끌어다 놓을 수 있으며, 포함된 동영상을 인식해 해당 사용자 재생목록으로 가져오므로 링크를 하나씩 추가할 필요가 없습니다. 로컬 곡과 반주는 `MP3`, `WAV`, `FLAC`, `M4A`, `MP4`, `AAC`, `OGG`, `OPUS`, `WMA` 형식을 지원합니다. YouTube 가져오기에는 인터넷 연결이 필요합니다.

**표시 제목**은 대기 목록, 부른 곡과 OBS에 사용되며, 비어 있으면 파일명이나 YouTube 제목을 사용합니다. 곡 행을 두 번 클릭하면 곡을 불러와 바로 재생하며 텍스트 편집으로 들어가지 않습니다. 표시 제목을 바꾸려면 곡을 오른쪽 클릭하고 첫 항목인 **표시 곡명 편집**을 선택하세요. `Enter`로 적용하고 `Esc`로 취소할 수 있으며 원본 음원 파일명은 바뀌지 않습니다.

곡 오른쪽 클릭 메뉴는 **표시 곡명 편집**, **대기 목록에 추가**, **재생목록에 추가**(즐겨찾기 또는 사용자 재생목록), 현재 분류에 맞는 삭제/분류에서 제거 순서로 제공됩니다.

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ko/display-title-edit.png' | relative_url }}"><img src="{{ '/assets/images/ko/display-title-edit.png' | relative_url }}" alt="오른쪽 클릭 메뉴에서 표시 제목 셀을 편집하는 화면"></a><figcaption>오른쪽 클릭 메뉴의 첫 항목으로 방송에 표시할 제목만 편집하며, 왼쪽 원본 파일명은 유지됩니다.</figcaption></figure>

<section class="manual-feature-update" aria-labelledby="library-bgm-205-title">
  <header class="manual-feature-update__header"><p class="manual-feature-update__eyebrow">2.0.5.0</p><h2 id="library-bgm-205-title">더 직관적인 곡 카드와 BGM 재생목록</h2><p>곡 라이브러리는 기존 표와 카드 표시를 전환할 수 있고, BGM은 방송 주제에 맞게 미리 정리해 빠르게 바꿀 수 있습니다.</p></header>
  <div class="manual-feature-update__copy"><h3>곡 목록 표시</h3><p><strong>기본값은 기존 표 형식입니다.</strong> “설정 → 일반 → 곡 목록 표시”에서 카드 표시로 바꿀 수 있습니다. 표시 곡명을 강조하면서 음원, 커버와 가사 상태를 유지하며, 두 번 클릭은 재생, 연필 아이콘은 표시 곡명 편집입니다.</p></div>
  <div class="manual-feature-update__copy"><h3>BGM 재생목록</h3><p>여러 로컬／YouTube 음원을 저장하고, 각 BGM에 메모를 붙이며, 드래그로 순서를 바꿀 수 있습니다. 재생 중인 항목은 강조됩니다. YouTube 재생목록은 현재 영상만 또는 모든 항목을 추가할 수 있습니다.</p><ul><li><strong>한 곡 반복(기본값)</strong></li><li><strong>전체 반복</strong></li><li><strong>전체 무작위 반복</strong></li></ul></div>
  {% include localized-release-screenshot.html name="bgm-playlist.png" alt="2.1 BGM 재생목록" caption="메모, 음원과 현재 재생 항목을 바로 확인할 수 있습니다." %}
</section>

아카펠라, 직접 연주 등 미디어 파일을 사용하지 않는 공연은 검색창 옆의 **+ 무반주 공연**에서 추가할 수 있습니다. 공개 표시 제목을 입력하고 수동 종료 또는 선택적인 예상 시간을 고르세요. 시간은 10초 단위 버튼과 마우스 휠로 조절할 수 있습니다. 시작하면 BGM을 일시 정지하고 Now Singing, 대기 목록과 완료 기록을 일반 곡처럼 갱신하며, 종료 후 이전 BGM을 다시 재생합니다. 항목은 전용 스마트 분류와 프로젝트에 저장되며 가짜 무음 파일을 만들지 않습니다.

표지는 필수가 아니며 Card와 CD 테마에서 특별히 활용됩니다. 곡 메뉴에서 **표지 삽입**을 열고 검색 결과나 로컬 이미지를 선택한 뒤 미리보기 로딩이 끝나면 삽입하세요.

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ko/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/ko/cover-dialog.png' | relative_url }}" alt="검색 결과와 불러온 표지 미리보기가 있는 표지 삽입 창"></a><figcaption>검색 결과를 선택하고 왼쪽 미리보기가 준비되면 삽입 버튼을 사용할 수 있습니다.</figcaption></figure>

BGM과 반주는 각각 재생, 음량과 탐색을 제어할 수 있습니다. 반주는 재생 속도와 반음 단위 키도 조절할 수 있습니다. 어려운 곡을 천천히 연습하거나 라이브에서 편안한 템포에 맞출 때, 음역이 너무 높거나 낮은 반주를 자신에게 맞는 키로 옮길 때 유용하며 별도의 반주 파일을 만들 필요가 없습니다.

2.1에서 BGM과 반주 음량은 청감에 더 잘 맞는 지각적 라우드니스 곡선을 사용합니다. 로컬 파일과 YouTube 재생은 같은 슬라이더 수치-출력 게인 매핑을 공유합니다. 업데이트 후에도 기존 슬라이더 수치는 유지되지만, 같은 수치의 청감이 이전 버전과 다를 수 있으므로 첫 방송 전에 반주와 보컬 균형을 다시 확인하세요. 이는 음량 제어 곡선이며 자동 라우드니스 정규화가 아닙니다.

조절한 속도와 키는 곡마다 따로 기억됩니다. 다른 곡으로 전환했다가 돌아와도 해당 곡에 맞춘 설정이 복원되며, 필요하면 `100%` 속도와 `0` 반음으로 초기화할 수 있습니다. 이 설정은 재생에만 적용되고 원본 파일이나 음질을 변경하지 않습니다.

**대기 목록**은 선택 기능이며 곡 표에서 곡을 두 번 클릭해도 바로 재생할 수 있습니다. 시청자 신청곡이나 예정 순서를 관리할 때 사용하며, 드래그로 순서를 바꾸거나 대기 행을 두 번 클릭해 재생할 수 있습니다. 재생목록 외관에서 OBS 대기 목록 표시를 켠 뒤 **다음 한 곡만** 또는 2, 3, 5, 10곡을 선택합니다. 한 곡은 **Next On**, 여러 곡은 **Reserve**로 표시되지만 최종 형식은 선택한 테마 지원 범위를 따릅니다. 재생을 마친 곡은 **부른 곡**으로 이동합니다. 정상적으로 앱을 종료하면 부른 곡 기록은 다음 방송으로 넘어가지 않으며, 예기치 않게 중단된 경우에는 복구 스냅샷으로 해당 라이브 세션의 대기 목록과 부른 곡 진행 상황을 복원할 수 있습니다.

<a id="lyrics"></a>
## 03 · 가사 기능

가사는 선택 기능입니다. 진행자 전용 **가사 창**, 시청자용 OBS 가사 오버레이 또는 둘 다 사용할 수 있습니다. LRC, SRT, VTT, 일반 텍스트, YouTube 자막과 LRCLIB를 지원합니다.

곡의 **가사** 페이지에서 **가사 관리…**를 누르거나 곡 목록의 **가사** 열에서 해당 곡의 아이콘을 클릭하면 같은 가사 관리 창이 열립니다. 여기에서 온라인 검색, 로컬 가사 가져오기, 결과 연결 또는 현재 가사 연결 해제를 할 수 있습니다. LRCLIB와 YouTube 자막을 함께 최대 50개 표시하며 동기화 여부, 언어, 반주 길이와 가수 정보에 맞는 후보를 우선합니다. YouTube의 일시적인 요청 제한으로 자막을 받지 못해도 다른 후보는 유지되고 나중에 다시 시도할 수 있다는 안내를 표시합니다.

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ko/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/ko/lyrics-manager-linked.png' | relative_url }}" alt="가사 파일 가져오기와 가사 연결 해제가 표시된 가사 관리 창"></a><figcaption>가사가 연결된 뒤에도 왼쪽 아래에서 다른 파일을 가져오거나 연결을 해제할 수 있습니다.</figcaption></figure>

일본어 읽기는 끄기, 한자 위의 작은 히라가나, 원문 아래의 단어 간격 로마자, 또는 히라가나와 로마자 동시 표시 중에서 선택합니다. 한국어 가사는 단어 사이 공백을 유지하는 로마자 표기를 선택할 수 있습니다. **즉시 미리보기 + OBS**는 같은 설정을 사용하며 독립 **가사 창**은 별도 설정을 사용합니다. 메인 화면, 가사 창과 OBS는 같은 오프라인 백그라운드 읽기 서비스를 사용하므로 결과가 일관됩니다. 자동 생성 결과는 참고용이며 고유명사나 가수의 실제 발음과 다를 수 있습니다.

독립 **가사 창**에서 타임스탬프가 있는 가사 줄을 클릭하면 반주가 해당 줄의 시점으로 이동합니다. LRC 같은 동기화 가사에서만 사용할 수 있으며 일반 텍스트 가사에는 이동할 시간이 없습니다.

{% include localized-release-screenshot.html name="lyrics-reading-preview.png" alt="2.1 동기화 가사와 읽기 미리보기" caption="미리보기의 가사 배치, 글꼴, 색상, 현재 줄 강조와 읽기 설정은 OBS에도 적용됩니다." %}

가사와 반주가 맞지 않을 때 양수와 음수를 계산할 필요는 없습니다. 노래가 시작됐는데 가사가 아직 나오지 않으면 **가사가 늦음 → 앞당기기**, 노래보다 가사가 먼저 나오면 **가사가 빠름 → 늦추기**를 선택합니다. 슬라이더 중앙은 동기화 상태이며 왼쪽은 앞당기기, 오른쪽은 늦추기입니다. 초기화 아이콘으로 `0 ms`로 돌아갈 수 있습니다.

현재 줄 앞뒤에 표시할 줄 수는 각각 슬라이더나 숫자 입력란으로 설정할 수 있습니다. 곡의 시작이나 끝에서는 설정한 수보다 표시 가능한 줄이 적을 수 있습니다. 오프셋 변경은 재생을 일시 정지한 상태에서도 미리보기, 가사 창과 OBS용 가사 데이터에 즉시 반영됩니다.

{% include localized-release-screenshot.html name="lyrics-viewer.png" extra_class="manual-figure--medium" alt="2.1 앞당기기·늦추기 조작과 동기화 가사 창" caption="가사 창에서도 같은 시간 조정 방식을 사용합니다. 타임스탬프가 있는 가사를 누르면 해당 위치로 이동하고 곡을 처음으로 돌리면 목록도 맨 위로 돌아갑니다." %}

<a id="obs-and-themes"></a>
## 04 · 재생목록 외관과 OBS

**재생목록 외관**에서 테마를 선택하고 Now Singing, Set List, Next On과 Reserve를 미리 봅니다. 기본 테마는 Default, Transparent Black, Transparent White, Transparent Black v2, Transparent White v2, Card, CD, Signal Line, Stage Caption 순서이며 그 뒤에 장식 테마가 표시됩니다.

<figure class="manual-figure"><a href="{{ '/assets/images/ko/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ko/theme-workspace.png' | relative_url }}" alt="테마 카드, 설정, 미리보기와 테마 안내가 있는 화면"></a><figcaption>전체 모드에서는 테마 비교, 설정과 OBS 결과 확인을 동시에 할 수 있습니다.</figcaption></figure>

<div class="figure-grid">
  <figure class="manual-figure">
    <a href="{{ '/assets/images/demo-obs-result.png' | relative_url }}">
      <img src="{{ '/assets/images/demo-obs-result.png' | relative_url }}" alt="OBS 방송 배경 위에 Transparent Black v2 세트리스트와 동기화 가사를 표시한 모습" loading="lazy" decoding="async">
    </a>
    <figcaption>OBS에서: 세트리스트와 가사 소스를 각각 크기 조절, 자르기와 이동하여 자신의 배경에 맞춥니다.</figcaption>
  </figure>
</div>

Card는 세로 표지 카드, CD는 원형 디스크로 표지를 보여 줍니다. **OBS로 드래그**를 누른 채 OBS에 놓으면 로컬 Browser Source를 바로 만들 수 있습니다. 방송 중 드롭이 되지 않으면 같은 버튼을 클릭해 소스 경로를 복사하고, OBS에서 Browser Source를 추가해 URL 칸에 붙여 넣은 뒤 1920 × 1080으로 설정하세요. **로컬 파일**은 선택하지 않습니다. 두 방법 모두 WebSocket이 필요 없습니다.

테마 캔버스는 OBS에서의 사용 방식을 제한하지 않습니다. 자신의 방송 레이아웃에 맞게 Browser Source를 자유롭게 확대·축소하고 자르거나 배치할 수 있습니다. Default는 자유롭게 조합하는 기본 화면으로 특히 적합합니다. 미리보기의 점선 텍스트 영역을 기준으로 Now Singing, Set List 등 필요한 블록만 OBS에서 잘라 내고 직접 만든 배경의 원하는 위치에 놓으세요. 투명 또는 장식 테마도 전체 구도를 유지하거나 필요한 부분만 사용할 수 있습니다. OBS 자르기는 해당 장면 소스의 표시 범위만 바꾸며 테마나 곡 데이터는 수정하지 않습니다.

**레이아웃**은 화면 설정의 가장 왼쪽 탭입니다. 앱은 각 테마가 선언한 기능을 확인하여 실제로 사용할 수 있는 탭과 설정만 표시합니다.

| 탭 | 설정 항목 |
| --- | --- |
| **레이아웃** | 지원하는 테마의 테마 색상, 배경 투명도 또는 프로젝트별 블록 위치를 조절하고 테마 기본값으로 복원 |
| **재생 중** | Now Singing 글꼴, 크기, 색상, 굵게/기울임/밑줄, 정렬과 긴 제목의 흐르는 속도 |
| **부른 곡** | Set List 글꼴, 크기, 색상, 번호, 글자 스타일, 정렬과 목록 스크롤 속도 |
| **대기 목록** | Reserve/Next On 전용 글꼴, 크기, 색상, 번호, 글자 스타일과 정렬 |

OBS 대기 목록 표시 여부와 다음 한 곡만 또는 2, 3, 5, 10곡 표시 한도도 정할 수 있습니다. OBS WebSocket을 켠 경우에만 Set List 타임스탬프 옵션이 나타나며, Reserve/Next On에는 시간이 붙지 않습니다.

미리보기 배경은 투명, 어두운색, 밝은색, 사용자 색상 또는 이미지 중에서 선택하며 이미지는 맞춤/채우기/늘이기를 지원합니다. 미리보기 배치 조정은 앱 안의 확인 화면에만 적용되고 OBS 출력은 바꾸지 않습니다. 지원하지 않는 설정은 잠긴 채 남지 않고 숨겨집니다. Default는 가장 많은 글자와 배치 설정을 제공하고, 기존 Transparent Black/White는 현재 곡과 부른 곡의 글자 설정을 유지합니다. v2, Signal Line, Stage Caption에서는 지원하는 색상과 배경 투명도를 조절할 수 있습니다.

<a id="obs-websocket"></a>
## 05 · OBS WebSocket

기본값은 꺼짐입니다. 현재 주요 목적은 OBS 방송 시간을 읽고 반주 시작 시각을 기록하여 Set List의 곡 이름 앞에 타임스탬프를 표시하는 것입니다. 일반 세트리스트와 가사 오버레이에는 필요하지 않습니다.

OBS Studio 28 이상에서 **도구 > WebSocket 서버 설정**을 열고 서버를 켠 뒤 포트(보통 `4455`)와 비밀번호를 확인합니다. Singing Stream Savior의 **설정 > 방송 타임스탬프**에서 WebSocket을 켜고 `127.0.0.1`, 같은 포트와 비밀번호를 입력한 다음 **연결**을 누르세요. OBS 비밀번호는 로컬 연결용 인증 정보이므로 비밀번호가 보이는 설정 화면을 공개하지 마세요.

오른쪽 아래 녹색은 연결됨, 노란색은 연결 또는 재연결 중, 빨간색은 연결되지 않음을 뜻합니다. 실제 방송 전에 테스트 방송으로 타임스탬프를 확인하세요.

<a id="workspace-modes"></a>
## 06 · 작업 공간 모드

- **전체 모드:** 모든 정보, 설정과 큰 미리보기. 방송 준비에 적합합니다.
- **간단 모드:** 곡 선택, 플레이어, **대기 목록**과 **부른 곡**을 유지하고 넓은 열과 큰 미리보기를 숨깁니다.
- **미니 모드:** 방송 전에 부를 곡과 화면 설정을 마치고 **대기 목록**까지 준비한 스트리머에게 적합합니다. 라이브러리와 BGM을 숨기고 반주, **대기 목록**, **부른 곡**, ‘가사 창’ 버튼만 표시합니다. 방송 중에는 준비한 대기 목록에서 곡을 골라 바로 재생할 수 있습니다. 별도 가사 창은 자유롭게 이동하고 글자 크기를 조절할 수 있습니다.

`Ctrl + Shift + M`으로 전환할 수 있습니다. 모드 전환은 화면에 보이는 조작 항목만 바꿉니다. 재생 중인 곡은 계속 재생되고 기존 대기 순서와 OBS 화면도 초기화되지 않습니다. 각 모드의 창 배치는 따로 기억합니다.

<div class="figure-grid">
  <figure class="manual-figure"><a href="{{ '/assets/images/ko/full-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ko/full-workspace.png' | relative_url }}" alt="한국어 전체 모드"></a><figcaption>전체 모드는 전체 라이브러리, 플레이어와 대기 목록을 표시합니다.</figcaption></figure>
  <figure class="manual-figure"><a href="{{ '/assets/images/ko/compact-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ko/compact-workspace.png' | relative_url }}" alt="한국어 간단 모드"></a><figcaption>간단 모드는 곡 선택과 방송 중 조작 기능을 유지합니다.</figcaption></figure>
  <figure class="manual-figure manual-figure--portrait"><a href="{{ '/assets/images/ko/mini-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ko/mini-workspace.png' | relative_url }}" alt="한국어 미니 모드"></a><figcaption>미니 모드는 대기 목록을 위한 세로 공간을 더 확보합니다.</figcaption></figure>
</div>

메인 창이 필요하지 않을 때는 닫기 버튼이 종료 대신 Singing Stream Savior를 Windows 알림 영역으로 숨기도록 설정할 수 있습니다. 재생은 백그라운드에서 계속되며 트레이 메뉴와 전역 단축키로 재생, Key, 속도, Profile, 마이크, 가사 창과 Meter를 제어할 수 있습니다. 앱과 helper를 완전히 끝내려면 트레이 메뉴의 ‘앱 종료’를 선택하세요.

{% include localized-release-screenshot.html name="notification-area-menu.png" alt="재생하지 않을 때의 Singing Stream Savior Windows 알림 영역 메뉴" caption="재생하지 않을 때는 메뉴가 간결합니다. 반주 재생 또는 고급 방송 모드에서는 필요한 재생, Key, 속도, Profile, 마이크와 Meter 항목이 추가됩니다." size="medium" %}

<a id="settings-and-troubleshooting"></a>
## 07 · 설정 및 문제 해결

다른 PC로 옮기기 전에 `.bgmsproj`, 로컬 미디어와 가져온 가사를 함께 백업하세요.

최상위 `Singing Stream Savior.exe`는 Launcher 1.2로 업데이트를 확인합니다. 새 버전이 없으면 빈 업데이트 화면에 머물지 않고 확인 후 검증된 현재 앱을 자동으로 실행합니다. 오프라인이거나 다음 확인 시간이 아직 되지 않았을 때도 설치된 버전을 바로 실행합니다.

업데이트가 있으면 카드형 화면에 현재／대상 버전과 한국어 업데이트 내용을 표시합니다. ‘나중에’를 누르거나 확인 창을 닫으면 파일을 바꾸지 않고 현재 버전을 실행하며, ‘지금 업데이트’를 선택해야 다운로드를 시작합니다.

<figure class="manual-figure"><a href="{{ '/assets/images/ko/launcher-update-prompt.png' | relative_url }}"><img src="{{ '/assets/images/ko/launcher-update-prompt.png' | relative_url }}" alt="버전과 업데이트 내용을 표시하는 Launcher 1.2 카드형 업데이트 창"></a><figcaption>스크롤 가능한 카드에 업데이트 내용을 표시합니다. ‘나중에’는 현재 버전을 유지하고 ‘지금 업데이트’는 검증 업데이트를 시작합니다.</figcaption></figure>

취소 가능한 다운로드 단계에서는 ‘취소’를 누르거나 창을 닫아 안전한 취소를 요청할 수 있습니다. 기존 파일과 `current.json`을 정확히 보존하고 임시 잔여물을 지운 뒤 현재 버전을 실행합니다. 짧은 최종 커밋 단계에서는 닫기 동작을 잠시 무시합니다. 업데이트 중 프로세스나 PC가 강제로 종료되어도 다음 실행 때 영구 트랜잭션 기록으로 롤백 또는 마무리를 먼저 수행하여 일관된 버전만 실행합니다.

<figure class="manual-figure"><a href="{{ '/assets/images/ko/launcher-update-progress.png' | relative_url }}"><img src="{{ '/assets/images/ko/launcher-update-progress.png' | relative_url }}" alt="Launcher 1.2 다운로드, 검증 및 설치 진행 화면"></a><figcaption>HTTPS 출처, 예상 크기와 SHA-256을 확인한 뒤 복구 가능한 원자적 트랜잭션으로 버전을 전환합니다.</figcaption></figure>

외부 실행기, `current.json`과 내부 폴더의 상대 위치를 유지하세요. Launcher 1.2는 자동 복구와 트랜잭션 롤백을 위해 이전 검증 패키지 하나를 보관하지만 원클릭 다운그레이드는 제공하지 않습니다. 이전 앱이 새 버전에서 저장한 프로젝트를 이해하지 못할 수 있기 때문입니다. 꼭 이전 버전을 시험해야 한다면 공식 전체 ZIP을 **별도 폴더**에 풀고 `.bgmsproj`와 미디어의 복사본을 사용하세요. 업데이트가 완료되지 않을 때도 서로 다른 버전의 DLL을 섞지 말고 최신 전체 ZIP을 새로 압축 해제하세요.

Qt platform plugin 오류가 나오면 ZIP을 다시 내려받아 완전히 압축 해제하고 가장 바깥쪽 `Singing Stream Savior.exe`만 실행하세요. 데이터 폴더 안의 파일을 확인하거나 열 필요는 없습니다. 바탕 화면에는 이 바깥쪽 EXE의 Windows 바로가기를 만드세요.

가사를 찾지 못하면 검색어를 줄이고 곡명/가수 표기를 확인하거나 반주 길이에 가까운 동기화 결과를 선택하세요. LRC/SRT/VTT/텍스트를 직접 가져올 수도 있습니다.

최근 프로젝트의 `.bgmsproj` 파일이 이동되거나 삭제된 경우 해당 항목은 목록에서 자동으로 제거됩니다.
