---
title: 歌回救星使用說明：全部章節與基礎操作
description: 選擇需要的教學章節，或連續閱讀安裝、播放器、歌詞、OBS 畫面與疑難排解；進階音訊與 Profile 提供獨立完整教學。
lang: zh-TW
translation_key: home
manual_bundle: true
---

# 全部教學章節與基礎操作

先從下方選擇要完成的事。安裝、播放、歌詞與其他基礎操作可在本頁連續閱讀；**進階直播音訊與 Profile（人聲效果器）**提供獨立教學。手機閱讀或只需要一個功能時，建議開啟對應的章節頁。

<nav class="article-outline manual-chapter-index" aria-label="全部教學章節">
<strong>全部教學章節</strong><ul>
{% for chapter in site.data.chapters %}{% if chapter.number %}
  {% if chapter.standalone %}{% capture chapter_target %}{% include chapter-url.html chapter=chapter lang='zh-TW' %}{% endcapture %}{% else %}{% assign chapter_target = '#' | append: chapter.key %}{% endif %}
  <li><a href="{% if chapter.standalone %}{{ chapter_target | strip | relative_url }}{% else %}{{ chapter_target }}{% endif %}">{{ site.data.i18n['zh-TW'].nav[chapter.label] }}{% if chapter.standalone %} ↗{% endif %}</a></li>
{% endif %}{% endfor %}
</ul></nav>

{% for chapter in site.data.chapters %}
{% if chapter.number and chapter.standalone != true %}
{% assign chapter_file = chapter.key | append: '.md' %}
{% capture chapter_source %}{% include_relative {{ chapter_file }} %}{% endcapture %}
{% assign chapter_parts = chapter_source | split: '---' %}
{% assign chapter_body = chapter_parts | shift | shift | join: '---' %}
{% assign chapter_html = chapter_body | markdownify %}
<section class="manual-chapter" id="{{ chapter.key }}" data-manual-chapter>
{{ chapter_html | replace: '<h5', '<h6' | replace: '</h5>', '</h6>' | replace: '<h4', '<h5' | replace: '</h4>', '</h5>' | replace: '<h3', '<h4' | replace: '</h3>', '</h4>' | replace: '<h2', '<h3' | replace: '</h2>', '</h3>' | replace: '<h1', '<h2' | replace: '</h1>', '</h2>' }}
</section>
{% endif %}
{% endfor %}
