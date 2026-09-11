---
title: 歌回救星 2.1 使用說明
description: 從安裝、歌曲庫、歌詞與 OBS 主題，到 UVR 人聲消除、工作區與疑難排解的完整使用指南
lang: zh-TW
translation_key: home
manual_bundle: true
---

# 歌回救星 2.1 使用說明

這是將全部操作集中在一起的完整閱讀版。手機或只想處理單一功能時，建議從章節選單開啟獨立頁面；每頁會先顯示最短操作流程，再提供完整設定與排錯說明。

{% capture feature_download_marker %}{% raw %}{% include feature-guide.html section="download" %}{% endraw %}{% endcapture %}
{% capture feature_lyrics_marker %}{% raw %}{% include feature-guide.html section="lyrics" %}{% endraw %}{% endcapture %}
{% capture feature_preview_marker %}{% raw %}{% include feature-guide.html section="preview" %}{% endraw %}{% endcapture %}
{% capture feature_health_marker %}{% raw %}{% include feature-guide.html section="health" %}{% endraw %}{% endcapture %}
{% capture feature_download_html %}{% include feature-guide.html section="download" %}{% endcapture %}
{% capture feature_lyrics_html %}{% include feature-guide.html section="lyrics" %}{% endcapture %}
{% capture feature_preview_html %}{% include feature-guide.html section="preview" %}{% endcapture %}
{% capture feature_health_html %}{% include feature-guide.html section="health" %}{% endcapture %}
{% assign chapter_keys = "getting-started,library-and-playback,lyrics,obs-and-themes,obs-websocket,uvr-vocal-removal,workspace-modes,settings-and-troubleshooting" | split: "," %}
{% for chapter_key in chapter_keys %}
  {% assign chapter_page = site.pages | where: "lang", "zh-TW" | where: "translation_key", chapter_key | first %}
  {% if chapter_page %}
<section class="manual-chapter" id="{{ chapter_key }}" data-manual-chapter>
{% assign chapter_content = chapter_page.content | replace: feature_download_marker, feature_download_html | replace: feature_lyrics_marker, feature_lyrics_html | replace: feature_preview_marker, feature_preview_html | replace: feature_health_marker, feature_health_html %}
{{ chapter_content | replace: '# ', '## ' | markdownify }}
</section>
  {% endif %}
{% endfor %}
