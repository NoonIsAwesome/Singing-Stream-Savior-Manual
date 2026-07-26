---
title: 歌回救星 2.0 使用說明
description: 從安裝、歌曲庫、歌詞與 OBS 主題，到工作區與疑難排解的完整使用指南
lang: zh-TW
translation_key: home
manual_bundle: true
---

# 歌回救星 2.0 使用說明

這一頁依照實際使用流程整理所有操作章節。可以從左側選擇章節，也可以直接向下閱讀；目前閱讀的位置會同步顯示在章節列表。

{% assign chapter_keys = "getting-started,library-and-playback,lyrics,obs-and-themes,obs-websocket,workspace-modes,settings-and-troubleshooting" | split: "," %}
{% for chapter_key in chapter_keys %}
  {% assign chapter_page = site.pages | where: "lang", "zh-TW" | where: "translation_key", chapter_key | first %}
  {% if chapter_page %}
<section class="manual-chapter" id="{{ chapter_key }}" data-manual-chapter>
{{ chapter_page.content | replace: '# ', '## ' | markdownify }}
</section>
  {% endif %}
{% endfor %}
