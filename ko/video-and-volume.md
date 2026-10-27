---
title: 동영상 재생과 OBS 캡처
lang: ko
translation_key: video-and-volume
---

# 동영상 재생과 OBS 캡처

2.2.1.0부터 MP4/MOV 듀엣 동영상을 재생하고 곡마다 게인과 크로마 키 설정을 저장할 수 있습니다.

<ol class="chapter-quick-start__steps">
<li><div><strong>동영상 추가</strong><span>MP4/MOV를 곡 목록에 놓거나 반주 가져오기로 파일을 선택합니다.</span></div></li>
<li><div><strong>재생과 미리보기</strong><span>재생 후 동영상 화면을 엽니다. 소리는 메인 플레이어에서 처리하며 동영상 창의 재생, 정지, 탐색도 같은 플레이어를 제어합니다.</span></div></li>
<li><div><strong>동영상별 설정</strong><span>곡 설정 → 동영상에서 키 색상, 유사도, 부드러움, 색 번짐 억제를 조절합니다. 설정과 프로젝트를 저장하면 동영상마다 따로 유지됩니다.</span></div></li>
<li><div><strong>OBS에서 투명 화면 캡처</strong><span>S3S에서 클린 캡처로 전환한 뒤 OBS 창 캡처에서 동영상 화면의 클린 캡처 창을 선택합니다. 방식은 Windows 10(1903 이상), 창 제목은 정확히 일치하도록 설정합니다.</span></div></li>
</ol>

{% include video-output-guide-images.html kind='controls' %}

{% include video-output-guide-images.html kind='key' %}

{% include video-output-guide-images.html kind='obs' %}

아래에 배경 소스를 놓아 투명도를 확인합니다. 체크무늬는 편집용입니다. 알파 채널이 있는 MOV에는 크로마 키가 필요 없지만 MOV 확장자만으로 투명 여부를 알 수는 없습니다.

Esc 또는 우클릭으로 조작 화면에 돌아옵니다. 메인 플레이어에서 다시 열 수도 있습니다. 창을 다른 창 뒤에 놓을 수 있지만 최소화에 의존하여 캡처하지 마세요.

OBS에서는 기존 S3S 오디오 소스를 사용하고 동영상 소리를 중복 캡처하지 마세요.

## 곡별 음량 조절

설정에서 자동 음량 균형을 켭니다. 기본 −18 LUFS-I는 반주용 시작값이며 YouTube 업로드 규정이 아닙니다. 기본은 꺼짐이며 분석 결과는 다음 재생부터 적용되어 노래 도중 갑자기 바뀌지 않습니다.

게인에는 합계가 표시되며 펼치면 자동 보정과 수동 조절을 볼 수 있습니다. 한 번에 0.5 dB씩 조절하고 초기화는 수동 값만 지웁니다. 수동 게인은 프로젝트에 저장되고 BGM에는 적용되지 않습니다.

로컬 오디오와 동영상 음성을 분석합니다. 온라인 YouTube 스트림은 직접 분석할 수 없지만 수동 조절은 가능합니다. 동영상에 이미 섞인 듀엣 목소리도 함께 조절됩니다.

자동 증폭은 최대 +6 dB이며 원본 피크 여유에 따라 제한됩니다. 곡의 강약을 유지하고 원본 파일을 바꾸지 않습니다. OBS의 dBFS 미터는 LUFS와 다릅니다. 짧게 녹음하여 최종 목소리와 반주 균형 및 왜곡을 확인하세요.
