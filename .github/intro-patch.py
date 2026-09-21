import json
import subprocess
from pathlib import Path
BASE = '8f6f2fe749f4049ebc844e290bb0b48751e53ece'
assert subprocess.check_output(['git', 'rev-parse', 'HEAD^'], text=True).strip() == BASE, 'Unexpected source revision'
assert not subprocess.check_output(['git', 'status', '--porcelain'], text=True).strip(), 'Checkout must be clean'
copy = {
    'zh-TW': ['設定好進階直播模式後，你可以做到：', '播放伴奏時自動切換到唱歌用 Profile', '歌曲結束後自動切回聊天用 Profile', '將伴奏、BGM 與麥克風效果混音後送到 OBS 或 Discord'],
    'en': ['Once Advanced Streaming Mode is set up, you can:', 'Automatically switch to your singing Profile when a backing track starts', 'Automatically switch back to your chatting Profile when the song ends', 'Mix backing tracks, BGM and your processed microphone, then send the mix to OBS or Discord'],
    'ja': ['高度な配信モードを設定すると、次のことができます：', '伴奏の再生時に歌唱用 Profile へ自動切り替え', '曲が終わると雑談用 Profile へ自動で戻る', '伴奏・BGM・エフェクト処理後のマイク音声をミックスして OBS や Discord に送信'],
    'ko': ['고급 방송 모드를 설정하면 다음과 같은 기능을 사용할 수 있습니다:', '반주를 재생하면 노래용 Profile로 자동 전환', '곡이 끝나면 대화용 Profile로 자동 복귀', '반주, BGM, 이펙트가 적용된 마이크 음성을 믹스하여 OBS 또는 Discord로 전송'],
    'zh-CN': ['设置好高级直播模式后，你可以做到：', '播放伴奏时自动切换到演唱用 Profile', '歌曲结束后自动切回聊天用 Profile', '将伴奏、BGM 与麦克风效果混音后发送到 OBS 或 Discord']
}
data_path=Path('_data/stream_routes.json');data_text=data_path.read_text(encoding='utf-8');old_data=json.loads(data_text)
assert set(copy)==set(old_data)
replacements={}
for lang,phrases in copy.items():
    path=Path(('' if lang=='zh-TW' else lang+'/')+'advanced-streaming.md');text=path.read_text(encoding='utf-8');old_intro=old_data[lang]['intro']
    assert text.count(old_intro)==1,f'{path}: old lead must be unique'
    text=text.replace(old_intro,'{% include advanced-streaming-benefits.html %}',1)
    anchor='<a id="vb-cable-installation"></a>\n<details class="audio-route-details"'
    assert text.count(anchor)==1,f'{path}: unique installation accordion required'
    text=text.replace(anchor,'<a id="vb-cable-installation"></a>\n<details class="audio-route-details audio-route-details--installation"',1)
    replacements[path]=text
    line='    "intro": '+json.dumps(old_intro,ensure_ascii=False)+','
    assert data_text.count(line)==1,f'{lang}: unique data intro required'
    replacement='    "intro": '+json.dumps(phrases[0],ensure_ascii=False)+',\n    "intro_bullets": [\n'
    replacement+=',\n'.join('      '+json.dumps(phrase,ensure_ascii=False) for phrase in phrases[1:])+'\n    ],'
    data_text=data_text.replace(line,replacement,1)
new_data=json.loads(data_text)
for lang,phrases in copy.items():
    assert new_data[lang]==dict(old_data[lang],intro=phrases[0],intro_bullets=phrases[1:]),'Do not alter unrelated route copy'
replacements[data_path]=data_text
include=Path('_includes/advanced-streaming-benefits.html');assert not include.exists()
replacements[include]='''{% assign benefit_lang = page.lang | default: site.lang | default: 'zh-TW' %}
{% assign benefit_copy = site.data.stream_routes[benefit_lang] %}
<div class="advanced-streaming-benefits">
  <p>{{ benefit_copy.intro | escape }}</p>
  <ul>
    {% for benefit in benefit_copy.intro_bullets %}
    <li>{{ benefit | escape }}</li>
    {% endfor %}
  </ul>
</div>
'''
css_path=Path('assets/css/reader.css');css=css_path.read_text(encoding='utf-8')
assert 'advanced-streaming-benefits' not in css and 'audio-route-details--installation' not in css
replacements[css_path]=css.rstrip()+'''

/* Short, unboxed benefits before the OBS/Discord destination links. */
.inner-page .manual-article .advanced-streaming-benefits {
  margin:0 0 20px
}
.inner-page .manual-article .advanced-streaming-benefits > p {
  margin:0 0 8px
}
.inner-page .manual-article .advanced-streaming-benefits > ul {
  margin:0;
  padding-left:1.4em;
  list-style:disc
}
.inner-page .manual-article .advanced-streaming-benefits > ul > li {
  margin:4px 0
}

/* Keep breathing room even when the installation screenshots are collapsed. */
.inner-page .manual-article details.audio-route-details--installation {
  margin-bottom:24px
}
.inner-page .manual-article details.audio-route-details--installation[open] {
  margin-bottom:32px
}
'''
validator_path=Path('scripts/validate-audio-guides.mjs');validator=validator_path.read_text(encoding='utf-8')
anchor='  const positions=order.map(id=>audio.indexOf(`id="${id}"`));'
assert validator.count(anchor)==1
extra='''  const benefits=audio.match(/<div class="advanced-streaming-benefits">[\\s\\S]*?<\\/div>/)?.[0] || '';
  assert.ok(benefits, `${lang}: concise benefits must be present`);
  assert.ok(decode(benefits).includes(copy[lang].intro), `${lang}: benefits heading`);
  assert.equal(copy[lang].intro_bullets.length,3);
  const bullets=[...benefits.matchAll(/<li>([\\s\\S]*?)<\\/li>/g)].map(m=>decode(m[1]).trim());
  assert.deepEqual(bullets,copy[lang].intro_bullets,`${lang}: exactly the three intended benefits`);
  assert.ok(audio.indexOf(benefits)>audio.indexOf('data-article-lead')
    && audio.indexOf(benefits)<audio.indexOf('id="advanced-quick-start"'),`${lang}: benefits before destination links`);
  const accordion=audio.match(/<details class="audio-route-details audio-route-details--installation"[^>]*>/g)||[];
  assert.equal(accordion.length,1,`${lang}: installation-only spacing hook`);
  assert.ok(!/\\sopen(?:\\s|=|>)/.test(accordion[0]),`${lang}: installation initially collapsed`);
'''
replacements[validator_path]=validator.replace(anchor,extra+anchor,1)
for path,text in replacements.items():path.write_text(text,encoding='utf-8',newline='\n')
print('Prepared exactly these documentation files:')
for path in replacements:print(path)
