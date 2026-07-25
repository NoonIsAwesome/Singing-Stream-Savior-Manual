---
title: Singing Stream Savior 2.0 사용자 설명서
description: Singing Stream Savior 2.0.0.0 한국어 설명서
lang: ko
translation_key: home
manual_bundle: true
---

# Singing Stream Savior 2.0 사용자 설명서

Singing Stream Savior는 노래 방송을 위한 Windows 앱입니다. 곡 라이브러리, BGM, 반주, 대기 목록, 가사와 OBS 오버레이를 하나의 흐름으로 관리합니다. 이 설명서는 **2.0.0.0** 버전을 기준으로 합니다.

<figure class="manual-figure"><a href="{{ '/assets/images/ko/lyrics-reading-preview.png' | relative_url }}"><img src="{{ '/assets/images/ko/lyrics-reading-preview.png' | relative_url }}" alt="가사 설정, OBS 미리보기, 플레이어와 대기 목록을 표시한 전체 모드"></a><figcaption>전체 모드는 방송 전에 곡, 가사와 OBS 화면을 준비할 때 적합합니다. 이미지를 누르면 원본 크기로 볼 수 있습니다.</figcaption></figure>

먼저 `.bgmsproj` 프로젝트를 만들거나 열고 곡을 추가한 뒤 표시 제목을 정리하세요. **재생목록 외관**에서 테마를 고르고 **Drag로OBS** 버튼을 OBS에 놓으면 됩니다. 대기 목록, 표지, 가사와 OBS WebSocket은 선택 기능입니다.

<a id="getting-started"></a>
## 01 · 시작하기

ZIP을 일반 폴더에 완전히 압축 해제하세요. 가장 바깥쪽 폴더에서 아래 아이콘의 `Singing Stream Savior.exe`를 두 번 클릭하면 됩니다. 사용자가 열어야 하는 파일은 이것뿐이며, ZIP 안에서 직접 실행하거나 데이터 폴더 안의 다른 EXE를 찾을 필요가 없습니다.

<div class="launch-target"><img src="{{ '/assets/images/singing-stream-savior.ico' | relative_url }}" alt="Singing Stream Savior 앱 아이콘"><div><strong>Singing Stream Savior.exe</strong><span>평소에는 이 앱만 실행하세요</span></div></div>

**파일 > 새 프로젝트**에서 `.bgmsproj`를 만듭니다. 곡, 표시 제목, 대기 순서, 부른 곡 기록, 가사 연결과 테마 설정이 저장됩니다. 창 제목의 `*`는 저장하지 않은 변경 사항을 뜻합니다.

<a id="library-and-playback"></a>
## 02 · 곡 라이브러리와 재생

라이브러리에는 모든 곡, 즐겨찾기, 최근 재생과 사용자 재생목록이 있습니다. YouTube 동영상/재생목록과 함께 `MP3`, `WAV`, `FLAC`, `M4A`, `MP4`, `AAC`, `OGG`, `OPUS`, `WMA` 형식의 로컬 곡과 반주를 추가할 수 있습니다. **표시 제목**은 대기 목록과 OBS에 사용되며, 비어 있으면 파일명이나 YouTube 제목을 사용합니다.

표지는 필수가 아니며 Card와 CD 테마에서 특별히 활용됩니다. 곡 메뉴에서 **표지 삽입**을 열고 검색 결과나 로컬 이미지를 선택한 뒤 미리보기 로딩이 끝나면 삽입하세요.

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ko/cover-dialog.png' | relative_url }}"><img src="{{ '/assets/images/ko/cover-dialog.png' | relative_url }}" alt="표지 미리보기와 검색 결과가 있는 표지 삽입 창"></a><figcaption>선택한 표지 미리보기가 준비되면 삽입 버튼을 사용할 수 있습니다.</figcaption></figure>

BGM과 반주는 각각 재생, 음량과 탐색을 제어할 수 있습니다. 반주는 원본 파일을 바꾸지 않고 속도와 반음 단위 음높이도 조절할 수 있습니다.

**예약**은 선택 기능이며, 곡 표에서 곡을 두 번 클릭하면 바로 재생할 수 있습니다. 예약은 시청자 신청곡이나 나중에 부를 예정인 곡을 관리할 때 사용합니다. 지원 테마는 첫 예약 곡을 **Next On**에, 여러 곡을 **Reserve**에 표시할 수 있습니다. 재생을 마친 곡은 **연혁**으로 이동합니다.

<a id="lyrics"></a>
## 03 · 가사 기능

가사는 선택 기능입니다. 진행자 전용 **가사 창**, 시청자용 OBS 가사 오버레이 또는 둘 다 사용할 수 있습니다. LRC, SRT, VTT, 일반 텍스트, YouTube 자막과 LRCLIB를 지원합니다.

**가사 관리…**에서 온라인 검색, 로컬 가사 가져오기, 결과 연결 또는 현재 가사 연결 해제를 할 수 있습니다. 최대 50개 결과를 표시하며 동기화 가사와 반주 길이에 가까운 버전을 우선합니다.

<figure class="manual-figure manual-figure--medium"><a href="{{ '/assets/images/ko/lyrics-manager-linked.png' | relative_url }}"><img src="{{ '/assets/images/ko/lyrics-manager-linked.png' | relative_url }}" alt="가사 파일 가져오기와 가사 연결 해제가 표시된 가사 관리 창"></a><figcaption>가사가 연결된 뒤에도 왼쪽 아래에서 다른 파일을 가져오거나 연결을 해제할 수 있습니다.</figcaption></figure>

일본어 읽기는 끄기, 한자 위의 작은 히라가나, 원문 아래의 단어 간격 로마자 중에서 선택합니다. 자동 생성 결과는 참고용이며 고유명사나 가수의 실제 발음과 다를 수 있습니다.

<a id="obs-and-themes"></a>
## 04 · 재생목록 외관과 OBS

**재생목록 외관**에서 테마를 선택하고 Now Singing, Set List, Next On과 Reserve를 미리 봅니다. 기본 테마는 Default, Transparent Black, Transparent White, Card, CD 순서이며 그 뒤에 장식 테마가 표시됩니다.

<figure class="manual-figure"><a href="{{ '/assets/images/ko/theme-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ko/theme-workspace.png' | relative_url }}" alt="테마 카드, 설정, 미리보기와 테마 안내가 있는 화면"></a><figcaption>전체 모드에서는 테마 비교, 설정과 OBS 결과 확인을 동시에 할 수 있습니다.</figcaption></figure>

현재 한국어 인터페이스의 **Drag로OBS** 버튼을 OBS에 놓으면 로컬 Browser Source가 만들어집니다. 이 작업에는 WebSocket이 필요 없습니다. Card는 세로 표지 카드, CD는 원형 디스크로 표지를 보여 줍니다.

테마 캔버스는 OBS에서의 사용 방식을 제한하지 않습니다. 자신의 방송 레이아웃에 맞게 Browser Source를 자유롭게 확대·축소하고 자르거나 배치할 수 있습니다. Default는 자유롭게 조합하는 기본 화면으로 특히 적합합니다. 미리보기의 점선 텍스트 영역을 기준으로 Now Singing, Set List 등 필요한 블록만 OBS에서 잘라 내고 직접 만든 배경의 원하는 위치에 놓으세요. 투명 또는 장식 테마도 전체 구도를 유지하거나 필요한 부분만 사용할 수 있습니다. OBS 자르기는 해당 장면 소스의 표시 범위만 바꾸며 테마나 곡 데이터는 수정하지 않습니다.

**화면 설정**에는 네 개의 탭이 있습니다.

| 탭 | 설정 항목 |
| --- | --- |
| **현재 곡** | Now Singing 글꼴, 크기, 색상, 굵게/기울임/밑줄, 정렬과 긴 제목의 흐르는 속도 |
| **부른 곡** | Set List 글꼴, 크기, 색상, 번호, 글자 스타일, 정렬과 목록 스크롤 속도 |
| **대기** | Reserve/Next On 전용 글꼴, 크기, 색상, 번호, 글자 스타일과 정렬 |
| **레이아웃** | 프로젝트 사용자 레이아웃을 켠 뒤 Now Singing, 기록, Reserve 제목/내용 블록의 X, Y, 너비와 높이를 조절하거나 테마 배치로 복원 |

OBS 대기 목록 표시 여부와 1–10곡 표시 한도도 정할 수 있습니다. OBS WebSocket을 켠 경우에만 Set List 타임스탬프 옵션이 나타나며, Reserve/Next On에는 시간이 붙지 않습니다.

미리보기 배경은 투명, 어두운색, 밝은색, 사용자 색상 또는 이미지 중에서 선택하며 이미지는 맞춤/채우기/늘이기를 지원합니다. 미리보기 배치 조정은 앱 안의 확인 화면에만 적용되고 OBS 출력은 바꾸지 않습니다. 고정 디자인 테마는 일부 글자나 레이아웃 설정을 잠글 수 있으므로 오른쪽 테마 안내를 확인하세요.

<a id="obs-websocket"></a>
## 05 · OBS WebSocket(시험 기능)

기본값은 꺼짐입니다. 현재 주요 목적은 OBS 방송 시간을 읽고 반주 시작 시각을 기록하여 Set List의 곡 이름 앞에 타임스탬프를 표시하는 것입니다. 일반 세트리스트와 가사 오버레이에는 필요하지 않습니다.

OBS Studio 28 이상에서 **도구 > WebSocket 서버 설정**을 열고 서버를 켠 뒤 포트(보통 `4455`)와 비밀번호를 확인합니다. 앱의 **설정 > 고급 설정**에서 WebSocket을 켜고 `127.0.0.1`, 같은 포트와 비밀번호를 입력한 다음 **연결**을 누르세요.

<figure class="manual-figure"><a href="{{ '/assets/images/ko/obs-websocket-settings.png' | relative_url }}"><img src="{{ '/assets/images/ko/obs-websocket-settings.png' | relative_url }}" alt="OBS WebSocket 안내와 연결 정보를 표시한 고급 설정"></a><figcaption>WebSocket을 켠 경우에만 연결 버튼과 상태가 활성화됩니다.</figcaption></figure>

오른쪽 아래 녹색은 연결됨, 노란색은 연결 또는 재연결 중, 빨간색은 연결되지 않음을 뜻합니다. 실제 방송 전에 테스트 방송으로 타임스탬프를 확인하세요.

<a id="workspace-modes"></a>
## 06 · 작업 공간 모드

- **전체 모드:** 모든 정보, 설정과 큰 미리보기. 방송 준비에 적합합니다.
- **간단 모드:** 곡 선택, 플레이어, **예약**과 **연혁**을 유지하고 넓은 열과 큰 미리보기를 숨깁니다.
- **미니 모드:** 방송 전에 부를 곡과 화면 설정을 마치고 **예약** 목록까지 준비한 스트리머에게 적합합니다. 라이브러리와 BGM을 숨기고 반주, **예약**, **연혁**, ‘가사 창’ 버튼만 표시합니다. 방송 중에는 준비한 예약 목록에서 곡을 골라 바로 재생할 수 있습니다. 별도 가사 창은 자유롭게 이동하고 글자 크기를 조절할 수 있습니다.

`Ctrl + Shift + M`으로 전환할 수 있습니다. 모드 전환은 화면에 보이는 조작 항목만 바꿉니다. 재생 중인 곡은 계속 재생되고 기존 대기 순서와 OBS 화면도 초기화되지 않습니다. 각 모드의 창 배치는 따로 기억합니다.

<div class="figure-grid">
  <figure class="manual-figure"><a href="{{ '/assets/images/ko/full-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ko/full-workspace.png' | relative_url }}" alt="한국어 전체 모드"></a><figcaption>전체 모드는 전체 라이브러리, 플레이어와 대기 목록을 표시합니다.</figcaption></figure>
  <figure class="manual-figure"><a href="{{ '/assets/images/ko/compact-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ko/compact-workspace.png' | relative_url }}" alt="한국어 간단 모드"></a><figcaption>간단 모드는 곡 선택과 방송 중 조작 기능을 유지합니다.</figcaption></figure>
  <figure class="manual-figure manual-figure--portrait"><a href="{{ '/assets/images/ko/mini-workspace.png' | relative_url }}"><img src="{{ '/assets/images/ko/mini-workspace.png' | relative_url }}" alt="한국어 미니 모드"></a><figcaption>미니 모드는 대기 목록을 위한 세로 공간을 더 확보합니다.</figcaption></figure>
</div>

<a id="settings-and-troubleshooting"></a>
## 07 · 설정 및 문제 해결

설정에는 화면 언어, 프로젝트/미디어 경로, YouTube 형식과 시험 중인 WebSocket이 있습니다. 다른 PC로 옮기기 전에 `.bgmsproj`, 로컬 미디어와 가져온 가사를 함께 백업하세요.

Qt platform plugin 오류가 나오면 ZIP을 다시 내려받아 완전히 압축 해제하고 가장 바깥쪽 `Singing Stream Savior.exe`만 실행하세요. 데이터 폴더 안의 파일을 확인하거나 열 필요는 없습니다. 바탕 화면에는 이 바깥쪽 EXE의 Windows 바로가기를 만드세요.

가사를 찾지 못하면 검색어를 줄이고 곡명/가수 표기를 확인하거나 반주 길이에 가까운 동기화 결과를 선택하세요. LRC/SRT/VTT/텍스트를 직접 가져올 수도 있습니다.
