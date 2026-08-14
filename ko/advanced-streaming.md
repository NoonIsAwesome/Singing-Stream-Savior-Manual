---
title: 고급 방송 모드와 VB-CABLE 설치
description: Singing Stream Savior 2.1.0.0의 마이크 믹스와 가상 출력을 OBS 및 Discord에 연결하는 방법
lang: ko
translation_key: advanced-streaming
---

# 고급 방송 모드

**2.1.0.0**부터 고급 방송 모드는 BGM, 반주와 처리된 마이크를 Singing Stream Savior 안에서 믹스한 뒤 전체 Stream Mix를 OBS, Discord 또는 다른 방송 앱으로 보낼 수 있습니다.

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

## 재시작 후 Singing Stream Savior 연결

1. **설정 → 오디오 라우팅**에서 **고급 방송 모드(믹스 출력)**를 선택하세요.
2. **가상 출력 설정…**을 열고 **장치 새로 고침**을 누르세요.
3. Stream Output을 VB-CABLE의 재생 장치, 일반적으로 **CABLE Input**으로 설정하세요.
4. Monitor Output은 실제 헤드폰이나 오디오 인터페이스로 설정하고, 같은 CABLE Input을 선택하지 마세요.
5. OBS에서 **오디오 입력 캡처**를 추가하고 VB-CABLE의 녹음 장치, 일반적으로 **CABLE Output**을 선택하세요. Discord 입력 장치도 같은 CABLE Output으로 설정합니다.
6. 테스트 곡을 재생하며 말해 보고 Stream Mix와 OBS／Discord 미터가 반응하며 음성 중복이나 피드백이 없는지 확인하세요.

> OBS가 원본 마이크를 직접 캡처 중이라면 전체 Stream Mix를 사용할 때 중복 마이크 소스를 끄세요. 그렇지 않으면 음성이 겹치거나 커지고 위상감이 생길 수 있습니다.

## CABLE Input／Output이 보이지 않을 때

- 설치 후 Windows를 실제로 다시 시작했는지 확인하세요.
- 완전히 압축을 푼 폴더에서 관리자 권한으로 Setup을 실행했는지 확인하세요.
- Singing Stream Savior의 가상 출력 설정에서 **장치 새로 고침**을 누르세요.
- 오디오 장치를 사용 중인 앱을 닫으세요. 계속 보이지 않으면 [VB-Audio 공식 참조 설명서](https://vb-audio.com/Cable/VBCABLE_ReferenceManual.pdf)를 확인하세요.

<small>VB-CABLE 이름, 화면과 설치 프로그램은 VB-Audio Software의 제품입니다. 스크린샷은 설치 단계 설명 목적으로만 사용합니다.</small>
