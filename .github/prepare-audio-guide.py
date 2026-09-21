from pathlib import Path
import copy, hashlib, json, re, subprocess

BASE = '5496a76b2b350b508cab7872bd08e1646cf88308'
assert subprocess.check_output(['git', 'status', '--porcelain'], text=True) == ''
subprocess.run(['git', 'merge-base', '--is-ancestor', BASE, 'HEAD'], check=True)
temporary = {'.github/prepare-audio-guide.py', '.github/workflows/prepare-audio-guide.yml'}
assert set(subprocess.check_output(['git','diff','--name-only',BASE,'HEAD'],text=True).splitlines()) == temporary
read = lambda name: Path(name).read_text(encoding='utf-8')
write = lambda name, text: Path(name).write_text(text, encoding='utf-8')
# Ruby's standard YAML library reads the existing localization sources. No package installation.
def yaml_data(name):
    return json.loads(subprocess.check_output(['ruby','-ryaml','-rjson','-e','puts JSON.generate(YAML.load_file(ARGV[0]))',name],text=True))
quick = yaml_data('_data/advanced_quick_start.yml')
setup = yaml_data('_data/obs_audio_setup.yml')
C = {
'zh-TW': {
 'title':'進階直播音訊：麥克風效果與混音輸出', 'nav':'進階直播音訊（混音輸出）', 'profile':'Profile（直播效果器）設定',
 'obs':'輸出訊號送至 OBS', 'discord':'輸出訊號送至 Discord（或其他通訊軟體）', 'choose':'先選擇混音的輸出目的地',
 'intro':'從 **2.1.0.0** 起，進階直播模式可以在 Singing Stream Savior 內混合 **BGM、伴奏**與 **Profile 效果器處理後的麥克風**，再把完整 **Stream Mix** 送到 OBS、Discord 或其他通訊／直播軟體。',
 'obs_intro':'只需要送到 OBS 時，先使用專用音訊外掛，不必安裝虛擬音源。先完成以下四步，再依後面說明調整預設唱歌 Profile。',
 'obs_install':'在「設定 → 音訊路由」按「安裝／修復 OBS 外掛」，選擇自己的 OBS 安裝位置，完成後重新啟動 OBS。直播輸出選「Singing Stream Savior 音訊（OBS 外掛）」；Monitor 另選實體耳機或錄音介面。',
 'test_title':'用短錄音確認人聲、伴奏與效果', 'test_obs':'播放伴奏並說話或唱歌，確認 OBS 專用來源有電平，再錄一小段回放，檢查人聲、伴奏、效果與音量平衡。電平會動不代表每一部分都正確；也要確認沒有重複人聲或回音。',
 'obs_details':'其他 OBS 接法與外掛細節（需要時展開）',
 'dc_intro':'利用 VB-CABLE 等虛擬音源，把已完成的混音當作通訊軟體的麥克風輸入。不需要先開 OBS：歌回救星送到 CABLE Input，Discord 從 CABLE Output 接收。',
 'install_title':'先準備虛擬音源', 'install':'若已有 CABLE Input／Output 可略過。否則從 VB-Audio 官方網站下載，完整解壓縮，以系統管理員身分安裝適合電腦架構的版本，並重新啟動 Windows。下方可展開安裝圖解；只重開軟體不能取代重新啟動電腦。',
 'dc_route_title':'在歌回救星啟用進階模式並送到 CABLE Input', 'dc_route':'到「設定 → 音訊路由」啟用進階直播模式，選擇實際使用的麥克風，再把直播輸出設為 CABLE Input。App Buffer 先保留自動建議值，Monitor 選實體耳機或錄音介面。不要把 CABLE Output 設成歌回救星的麥克風輸入，以免混音繞回自己。',
 'dc_receive':'Discord 的輸出裝置選實體耳機，不要選 CABLE Input，以免把通話對方的声音回送給對方。其他通訊軟體同樣在麥克風／輸入裝置選 CABLE Output。',
 'dc_process_title':'避免通訊軟體把音樂當成噪音', 'dc_process':'若你的 Discord 版本提供 Studio（Pure Audio），可先選這個模式；下圖是作者使用版本的介面。若沒有此選項，調整不必要的語音隔離、降噪與自動增益，並確認語音活動門檻或按鍵發話不會切掉伴奏。請以通話中實際收到的聲音確認。',
 'dc_caption':'作者使用版本的 Studio／Pure Audio 設定。不同版本的名稱或選項可能不同；這是 Discord 輸入模式，不是歌回救星的 Profile。',
 'test_dc':'播放伴奏並說話或唱歌，先確認 Stream Output 與 Discord 輸入電平，再請通話中的朋友確認人聲、伴奏與殘響都能聽到。若音樂被切掉，檢查降噪與發話模式；若有回音，檢查重複路徑或是否把通話輸出接回虛擬線。',
 'install_details':'VB-CABLE 安裝圖解（尚未安裝時展開）',
 'modes':'一般播放器與進階直播模式的差異', 'scope':'一般播放器保留 BGM／伴奏播放與歌詞／歌單功能；進階直播模式另外處理麥克風並完成混音。Profile 主要處理麥克風，不是把伴奏也送進同一條人聲效果鏈。Monitor 是自己聽的路徑，OBS／Discord 接收的是 Stream Output。',
 'signal':'麥克風 → Profile 效果器訊號鏈 → 與 BGM／伴奏混音 → Stream Output → OBS／Discord',
 'defaults':'設定預設唱歌 Profile 與自動切換', 'defaults_intro':'在「設定 → 音訊路由」選擇唱歌與聊天的預設 Profile，不必為每首歌設定標籤。再確認主畫面使用自動切換，而不是手動固定某組效果。',
 'auto_title':'把主畫面 Profile 設為自動切換', 'auto':'在上方 Profile 選單選「自動切換 Profile」。歌曲沒有專屬 Profile，或選「自動・唱歌 Profile」時，使用路由页的預設唱歌 Profile；歌曲明確指定的 Profile 優先。手動選定 Profile 會暫時覆蓋自動化，選回自動切換才恢復。',
 'test_auto':'播放伴奏確認套用唱歌 Profile；停止伴奏回到聊天時確認恢復聊天 Profile。用 OBS 短錄音、完整輸出錄音或 Discord 通話驗證收到的效果。沒有切換時，先檢查手動指定狀態與歌曲標籤。',
 'profile_pre':'要讓 Profile 效果送到 OBS 或 Discord，先在「設定 → 音訊路由」啟用進階直播模式（混音輸出），並選好麥克風與 Stream Output。這條路徑會把效果器處理後的麥克風和 BGM／伴奏混音；一般播放器模式不會透過此路徑處理並輸出麥克風。',
 'profile_intro':'Profile 是一組可重複使用的人聲效果設定，保存 Signal Chain（效果器訊號鏈）中的效果器、參數、啟用狀態與處理順序。這一章集中介紹效果器編輯、試聽、歌曲標籤、內建 Profile 與 VST3。',
 'route_link':'先完成麥克風與混音輸出設定', 'profile_link':'前往 Profile（直播效果器）設定', 'reference':'裝置、監聽、錄音與穩定性詳細說明', 'reference_intro':'輸出與自動切換設定好後，再依需要閱讀以下內容。第一次正式使用前，請在沒有直播、通話或外部錄音時完成穩定性健檢，不必每次開播重跑。', 'more':'效果器細節已移至獨立的 Profile 章節。'
},
'en': {
 'title':'Advanced audio: microphone effects and mixed output', 'nav':'Advanced audio · mix output', 'profile':'Profile settings (streaming effects)',
 'obs':'Send audio to OBS', 'discord':'Send audio to Discord or another calling app', 'choose':'Choose where to send the mix',
 'intro':'Since **2.1.0.0**, Advanced Streaming Mode mixes **BGM/accompaniment** with the **Profile-processed microphone** inside Singing Stream Savior, then sends the complete **Stream Mix** to OBS, Discord or another calling/streaming app.',
 'obs_intro':'For OBS alone, start with the dedicated audio plug-in; no virtual cable is required. Complete these four steps first, then configure the default singing Profile below.',
 'obs_install':'In Settings → Audio Routing select Install / repair OBS plug-in, choose your OBS installation, and restart OBS afterwards. Set Stream Output to Singing Stream Savior Audio (OBS Plugin). Select real headphones or your audio interface separately for Monitor.',
 'test_title':'Check vocals, accompaniment and effects', 'test_obs':'Play accompaniment and speak or sing. Check the dedicated OBS meter, then record and replay a short clip to check vocals, music, effects and balance. A moving meter alone is insufficient; check for duplicated voice or echo too.',
 'obs_details':'Alternative OBS route and plug-in details (expand if needed)',
 'dc_intro':'Use a virtual device such as VB-CABLE to present the finished mix as a calling app’s microphone input. OBS does not need to be open: Singing Stream Savior sends to CABLE Input and Discord receives CABLE Output.',
 'install_title':'Prepare a virtual audio device', 'install':'Skip this if CABLE Input / Output are available. Otherwise download VB-CABLE from VB-Audio, fully extract it, run the installer matching your computer architecture as administrator, and restart Windows. Installation screenshots are below; restarting only the app is not a substitute.',
 'dc_route_title':'Enable Advanced mode and send to CABLE Input', 'dc_route':'In Settings → Audio Routing enable Advanced Streaming Mode, select your actual microphone, and set Stream Output to CABLE Input. Keep App Buffer on the recommended automatic setting initially and Monitor on real headphones or an interface. Do not select CABLE Output as this app’s microphone input: it would feed the mix back into itself.',
 'dc_receive':'Set Discord’s output device to real headphones, not CABLE Input, so callers do not hear their own voices returned. In another calling app, likewise select CABLE Output as its microphone/input device.',
 'dc_process_title':'Prevent voice processing from cutting the music', 'dc_process':'If your Discord version offers Studio (Pure Audio), start there; the screenshot shows the author’s version. Otherwise adjust unnecessary voice isolation, noise suppression and automatic gain, and check voice-activity thresholds or Push to Talk. Verify the result with audio actually received in the call.',
 'dc_caption':'Studio / Pure Audio in the author’s Discord version. Names and options may vary. This is a Discord input mode, not a Singing Stream Savior Profile.',
 'test_dc':'Play accompaniment and speak or sing. Check Stream Output and Discord’s input meter, then ask another person in the call to confirm vocals, music and reverb. If music cuts out, check suppression and input mode. If there is echo, check duplicate paths and whether call output is fed back into the cable.',
 'install_details':'VB-CABLE installation screenshots (expand if needed)',
 'modes':'Normal Playback versus Advanced Streaming Mode', 'scope':'Normal Playback retains BGM/accompaniment playback and lyric/set-list features. Advanced mode also processes the microphone and creates the mix. A vocal Profile processes the microphone, not accompaniment through the same chain. Monitor is your listening path; OBS/Discord receive Stream Output.',
 'signal':'Microphone → Profile effect chain → Mix with BGM/accompaniment → Stream Output → OBS / Discord',
 'defaults':'Default singing Profile and automatic switching', 'defaults_intro':'Choose singing and chat defaults in Settings → Audio Routing; you do not need to tag every song. Then confirm the main Profile menu uses automatic switching rather than a fixed manual Profile.',
 'auto_title':'Return the main Profile menu to automatic switching', 'auto':'Choose Automatically switch Profile in the top Profile menu. Untagged songs or Automatic · Singing Profile use the default from Audio Routing. An explicitly assigned song Profile takes priority. A manually selected Profile overrides automation until you return to automatic switching.',
 'test_auto':'Start accompaniment to confirm the singing Profile, then stop and return to chat to confirm the chat Profile. Verify the received effects with a short OBS recording, Full Output recording, or a Discord call. Check manual override and song tags first if switching does not happen.',
 'profile_pre':'To deliver Profile effects to OBS or Discord, first enable Advanced Streaming Mode (mix output) in Settings → Audio Routing and select the microphone and Stream Output. This route mixes the processed microphone with BGM/accompaniment. Normal Playback does not process and deliver the microphone through this route.',
 'profile_intro':'A Profile is a reusable vocal-effect setup that stores the effects, parameters, enabled states and order of a Signal Chain. This chapter covers effect editing, audition, song tags, factory Profiles and VST3.',
 'route_link':'Set up microphone and mixed output first', 'profile_link':'Open Profile settings (streaming effects)', 'reference':'Devices, monitoring, recording and stability reference', 'reference_intro':'After output and automatic switching work, use the following reference as needed. Before first serious use, run a stability check while no stream, call or external recording is active; it need not be repeated before every stream.', 'more':'Detailed effects are now in the separate Profile chapter.'
},
'ja': {
 'title':'高度な配信音声：マイクエフェクトとミックス出力', 'nav':'配信音声（ミックス出力）', 'profile':'Profile（配信エフェクト）設定',
 'obs':'音声を OBS に送る', 'discord':'音声を Discord・通話アプリに送る', 'choose':'ミックスの送信先を選ぶ',
 'intro':'**2.1.0.0** 以降、高度な配信モードでは Singing Stream Savior 内で **BGM・伴奏**と **Profile のエフェクトで処理したマイク音声**をミックスし、完全な **Stream Mix** を OBS・Discord などの配信／通話アプリへ送れます。',
 'obs_intro':'OBS だけに送る場合は専用音声プラグインを使い、仮想ケーブルは不要です。まず次の 4 ステップで出力し、既定の歌唱 Profile は後で設定します。',
 'obs_install':'「設定 → 音声ルーティング」で OBS プラグインのインストール／修復を選び、自分の OBS の場所を指定して、完了後に OBS を再起動します。Stream Output は Singing Stream Savior Audio（OBS Plugin）、Monitor は別途実際のヘッドホン／インターフェースを選びます。',
 'test_title':'声・伴奏・エフェクトを確認', 'test_obs':'伴奏を再生して話すか歌い、OBS 専用ソースのメーターを確認します。短く録画し、声・伴奏・エフェクトのバランスと二重音声やエコーがないことを再生して確認してください。メーターが動くだけでは十分ではありません。',
 'obs_details':'OBS の別経路とプラグインの詳細（必要な場合に開く）',
 'dc_intro':'VB-CABLE などの仮想デバイスで、完成したミックスを通話アプリのマイク入力へ送ります。OBS の起動は不要です。歌回救星は CABLE Input に出力し、Discord は CABLE Output を受信します。',
 'install_title':'仮想オーディオを準備する', 'install':'CABLE Input／Output がすでにあれば省略できます。未導入なら VB-Audio 公式から取得し、完全に展開して PC の構成に合うインストーラーを管理者として実行し、Windows を再起動します。図解は下にあります。アプリだけの再起動では代用できません。',
 'dc_route_title':'高度な配信モードで CABLE Input に出力', 'dc_route':'「設定 → 音声ルーティング」で高度な配信モードと実際のマイクを選び、Stream Output を CABLE Input にします。App Buffer はまず推奨の自動設定、Monitor は実際のヘッドホン／インターフェースにします。アプリのマイク入力に CABLE Output を選ぶとミックスが循環するため選ばないでください。',
 'dc_receive':'Discord の出力は実際のヘッドホンにし、CABLE Input にしないでください。相手の声をそのまま返すループを防ぎます。他の通話アプリもマイク／入力で CABLE Output を選びます。',
 'dc_process_title':'音声処理で音楽が途切れないようにする', 'dc_process':'利用中の Discord に Studio（Pure Audio）があれば選びます。画像は作者の環境です。ない場合は不要な音声分離・ノイズ抑制・自動ゲインを調整し、音声検出の閾値やプッシュ・トゥ・トークも確認します。通話相手に届いた音で確認してください。',
 'dc_caption':'作者の Discord での Studio／Pure Audio 設定です。名称や選択肢は環境で異なります。Discord 側の入力モードであり、歌回救星の Profile ではありません。',
 'test_dc':'伴奏を再生して話すか歌い、Stream Output と Discord 入力のメーターを確認します。相手に声・伴奏・残響が届くか確認してもらいます。音楽が切れる場合はノイズ抑制と入力モード、エコー時は二重取り込みや通話出力の循環を確認します。',
 'install_details':'VB-CABLE のインストール図解（必要な場合に開く）',
 'modes':'通常再生と高度な配信モードの違い', 'scope':'通常再生は BGM・伴奏、歌詞・セットリスト機能を使用できます。高度な配信モードではさらにマイクを処理してミックスします。Profile はマイクの声を処理し、伴奏を同じボーカルチェーンへ通すわけではありません。Monitor は自分用で、OBS・Discord には Stream Output を送ります。',
 'signal':'マイク → Profile エフェクトチェーン → BGM・伴奏とミックス → Stream Output → OBS / Discord',
 'defaults':'既定の歌唱 Profile と自動切り替え', 'defaults_intro':'「設定 → 音声ルーティング」で歌唱とトークの既定 Profile を選びます。全曲にタグを付ける必要はありません。メイン画面の Profile も手動固定ではなく自動切り替えにします。',
 'auto_title':'Profile メニューを自動切り替えに戻す', 'auto':'上部の Profile メニューで自動切り替えを選びます。専用タグなし、または「自動・歌唱 Profile」の曲はルーティングの既定歌唱 Profile を使用します。曲別指定が優先され、手動指定中は自動化を上書きします。自動切り替えを選び直すと戻ります。',
 'test_auto':'伴奏開始で歌唱 Profile、停止してトークへ戻るとトーク Profile になるか確認します。OBS の短い録画、完全出力録音、Discord 通話で届く音を確認してください。切り替わらない場合は手動指定と曲タグを先に確認します。',
 'profile_pre':'Profile の効果を OBS・Discord へ送るには、先に「設定 → 音声ルーティング」で高度な配信モード（Mix 出力）を有効にし、マイクと Stream Output を選びます。この経路が処理後の声と BGM・伴奏をミックスします。通常再生モードではこの経路でマイクを処理・出力しません。',
 'profile_intro':'Profile は再利用できるボーカルエフェクト設定です。Signal Chain 内の各エフェクト、パラメーター、有効状態と処理順序を保存します。この章では編集、試聴、曲タグ、既定 Profile と VST3 を説明します。',
 'route_link':'先にマイクとミックス出力を設定', 'profile_link':'Profile（配信エフェクト）設定へ', 'reference':'デバイス・モニター・録音・安定性の詳細', 'reference_intro':'出力と自動切り替えができたら、必要に応じて以下を確認します。初回の本番前には配信・通話・外部録音を停止して安定性を検査します。毎回の配信前に繰り返す必要はありません。', 'more':'エフェクトの詳細は独立した Profile 章へ移しました。'
},
'ko': {
 'title':'고급 방송 오디오: 마이크 효과와 믹스 출력', 'nav':'고급 오디오 · 믹스 출력', 'profile':'Profile(방송 이펙트) 설정',
 'obs':'오디오를 OBS로 보내기', 'discord':'오디오를 Discord 또는 통화 앱으로 보내기', 'choose':'믹스를 보낼 곳 선택',
 'intro':'**2.1.0.0**부터 고급 방송 모드는 Singing Stream Savior 안에서 **BGM／반주**와 **Profile 이펙트로 처리한 마이크**를 믹스하고, 완성된 **Stream Mix**를 OBS, Discord 또는 다른 방송／통화 앱으로 보냅니다.',
 'obs_intro':'OBS만 사용한다면 전용 오디오 플러그인으로 시작하세요. 가상 케이블은 필요하지 않습니다. 네 단계로 출력을 완료하고 기본 노래 Profile은 아래에서 설정합니다.',
 'obs_install':'설정 → 오디오 라우팅에서 OBS 플러그인 설치／복구를 누르고 OBS 위치를 선택한 뒤 OBS를 재시작합니다. Stream Output은 Singing Stream Savior Audio(OBS Plugin), Monitor는 별도로 실제 헤드폰／인터페이스를 선택하세요.',
 'test_title':'보컬·반주·효과 확인', 'test_obs':'반주를 재생하고 말하거나 노래해 OBS 전용 소스 미터를 확인합니다. 짧게 녹화하여 보컬·반주·효과의 밸런스와 중복 음성 또는 에코가 없는지 재생해서 확인하세요. 미터가 움직이는 것만으로는 충분하지 않습니다.',
 'obs_details':'OBS 대체 경로 및 플러그인 상세(필요할 때 펼치기)',
 'dc_intro':'VB-CABLE 같은 가상 장치로 완성된 믹스를 통화 앱의 마이크 입력으로 보냅니다. OBS를 켤 필요는 없습니다. 앱은 CABLE Input으로 출력하고 Discord는 CABLE Output을 받습니다.',
 'install_title':'가상 오디오 장치 준비', 'install':'CABLE Input／Output이 이미 있으면 건너뛰세요. 없다면 VB-Audio 공식 패키지를 완전히 압축 해제하고 PC 아키텍처에 맞는 설치 프로그램을 관리자 권한으로 실행한 뒤 Windows를 재시작합니다. 아래에 그림 안내가 있습니다. 앱만 다시 열어서는 재부팅을 대신하지 못합니다.',
 'dc_route_title':'고급 방송 모드에서 CABLE Input으로 출력', 'dc_route':'설정 → 오디오 라우팅에서 고급 방송 모드와 실제 마이크를 선택하고 Stream Output을 CABLE Input으로 설정합니다. App Buffer는 우선 자동 권장값, Monitor는 실제 헤드폰／인터페이스로 둡니다. 앱의 마이크 입력에 CABLE Output을 선택하면 믹스가 되돌아오므로 선택하지 마세요.',
 'dc_receive':'Discord 출력 장치는 CABLE Input이 아닌 실제 헤드폰을 선택해 상대 목소리가 되돌아가지 않게 하세요. 다른 통화 앱도 마이크／입력 장치를 CABLE Output으로 설정합니다.',
 'dc_process_title':'음성 처리가 음악을 자르지 않도록 설정', 'dc_process':'현재 Discord에 Studio(Pure Audio)가 있으면 먼저 선택하세요. 이미지는 개발자 환경입니다. 없다면 불필요한 음성 분리·노이즈 억제·자동 게인을 조정하고 음성 감지 임계값이나 눌러서 말하기도 확인합니다. 실제 통화로 전달된 소리를 확인하세요.',
 'dc_caption':'개발자 Discord 버전의 Studio／Pure Audio입니다. 이름과 선택지는 환경에 따라 다릅니다. Discord 입력 모드이며 이 앱의 Profile이 아닙니다.',
 'test_dc':'반주를 틀고 말하거나 노래해 Stream Output과 Discord 입력 미터를 확인한 뒤 상대에게 보컬·반주·잔향이 들리는지 물어보세요. 음악이 끊기면 노이즈 억제와 입력 모드를 확인합니다. 에코가 있으면 중복 경로나 통화 출력이 케이블로 되돌아오는지 확인하세요.',
 'install_details':'VB-CABLE 설치 그림 안내(필요할 때 펼치기)',
 'modes':'일반 재생과 고급 방송 모드의 차이', 'scope':'일반 재생에서도 BGM／반주, 가사／세트리스트 기능을 사용할 수 있습니다. 고급 모드에서는 마이크 효과 처리와 믹싱도 합니다. Profile은 마이크 보컬을 처리하며 반주를 같은 보컬 체인으로 보내지 않습니다. Monitor는 자신이 듣는 경로이고 OBS／Discord에는 Stream Output을 보냅니다.',
 'signal':'마이크 → Profile 이펙트 체인 → BGM／반주와 믹스 → Stream Output → OBS / Discord',
 'defaults':'기본 노래 Profile과 자동 전환', 'defaults_intro':'설정 → 오디오 라우팅에서 노래와 대화의 기본 Profile을 선택하세요. 모든 곡에 태그를 지정할 필요는 없습니다. 상단 Profile 메뉴도 수동 고정이 아닌 자동 전환으로 둡니다.',
 'auto_title':'상단 Profile을 자동 전환으로 되돌리기', 'auto':'상단 Profile 메뉴에서 자동 전환을 선택합니다. 전용 태그가 없거나 자동 · Singing Profile인 곡은 라우팅의 기본 노래 Profile을 사용합니다. 곡에 지정한 Profile이 기본값보다 우선합니다. 수동 지정은 자동화를 덮어쓰므로 자동 전환을 다시 선택해야 복구됩니다.',
 'test_auto':'반주 시작 시 노래 Profile, 정지 후 대화로 돌아가면 대화 Profile인지 확인하세요. OBS 짧은 녹화, 전체 출력 녹음 또는 Discord 통화로 전달된 효과를 확인합니다. 전환되지 않으면 수동 지정과 곡 태그를 먼저 확인하세요.',
 'profile_pre':'Profile 효과를 OBS／Discord에 보내려면 먼저 설정 → 오디오 라우팅에서 고급 방송 모드(믹스 출력)를 켜고 마이크와 Stream Output을 선택하세요. 이 경로가 처리된 마이크와 BGM／반주를 믹스합니다. 일반 재생 모드에서는 이 경로로 마이크를 처리하거나 출력하지 않습니다.',
 'profile_intro':'Profile은 반복해서 사용할 보컬 효과 설정입니다. Signal Chain의 각 효과, 매개변수, 켜짐 상태와 처리 순서를 저장합니다. 이 장은 효과 편집, 미리 듣기, 곡 태그, 기본 Profile과 VST3를 다룹니다.',
 'route_link':'먼저 마이크와 믹스 출력 설정', 'profile_link':'Profile(방송 이펙트) 설정으로 이동', 'reference':'장치·모니터·녹음·안정성 상세', 'reference_intro':'출력과 자동 전환을 확인한 후 필요할 때 아래 내용을 살펴보세요. 첫 실전 사용 전에는 방송·통화·외부 녹음을 멈추고 안정성 점검을 합니다. 매 방송마다 반복할 필요는 없습니다.', 'more':'효과 상세 설명은 별도 Profile 장으로 옮겼습니다.'
},
'zh-CN': {
 'title':'高级直播音频：麦克风效果与混音输出', 'nav':'高级直播音频（混音输出）', 'profile':'Profile（直播效果器）设置',
 'obs':'输出信号发送至 OBS', 'discord':'输出信号发送至 Discord（或其他通话软件）', 'choose':'先选择混音的输出目的地',
 'intro':'从 **2.1.0.0** 起，高级直播模式可在 Singing Stream Savior 内混合 **BGM、伴奏**与 **Profile 效果器处理后的麦克风**，再把完整 **Stream Mix** 发送到 OBS、Discord 或其他通话／直播软件。',
 'obs_intro':'只需发送到 OBS 时，先使用专用音频插件，无需安装虚拟音频设备。先完成以下四步，再按后面的说明调整默认演唱 Profile。',
 'obs_install':'在“设置 → 音频路由”点击“安装／修复 OBS 插件”，选择自己的 OBS 安装位置，完成后重新启动 OBS。直播输出选择“Singing Stream Savior 音频（OBS 插件）”；Monitor 另选实体耳机或音频接口。',
 'test_title':'确认人声、伴奏与效果', 'test_obs':'播放伴奏并说话或唱歌，确认 OBS 专用来源有电平，再录一小段回放，检查人声、伴奏、效果和音量平衡。电平会动不代表每一部分都正确，还要确认没有重复人声或回声。',
 'obs_details':'其他 OBS 接法与插件细节（需要时展开）',
 'dc_intro':'利用 VB-CABLE 等虚拟音频设备，将完成的混音作为通话软件的麦克风输入。无需先开 OBS：Singing Stream Savior 输出到 CABLE Input，Discord 从 CABLE Output 接收。',
 'install_title':'先准备虚拟音频设备', 'install':'已有 CABLE Input／Output 可跳过。否则从 VB-Audio 官网下载，完整解压，以管理员身份安装匹配电脑架构的版本，再重新启动 Windows。下方有安装图解；仅重开软件不能代替重启电脑。',
 'dc_route_title':'在软件中启用高级模式并输出到 CABLE Input', 'dc_route':'在“设置 → 音频路由”启用高级直播模式，选择实际使用的麦克风，将直播输出设为 CABLE Input。App Buffer 先保留自动建议值，Monitor 选择实体耳机或音频接口。不要将 CABLE Output 设成软件的麦克风输入，以免混音回送自身。',
 'dc_receive':'Discord 输出设备选择实体耳机，不要选择 CABLE Input，避免把通话对方的声音回送。其他通话软件同样在麦克风／输入设备选择 CABLE Output。',
 'dc_process_title':'避免通话软件将音乐当成噪声', 'dc_process':'若你的 Discord 版本提供 Studio（Pure Audio），可以先选该模式；下图为作者所用版本。若没有该选项，调整不必要的语音隔离、降噪和自动增益，并确认语音活动阈值或按键发话不会切掉伴奏。请通过通话实际收到的声音确认。',
 'dc_caption':'作者所用版本的 Studio／Pure Audio 设置。不同版本的名称或选项可能不同；这是 Discord 输入模式，不是本软件的 Profile。',
 'test_dc':'播放伴奏并说话或唱歌，确认 Stream Output 与 Discord 输入电平，再请通话中的朋友确认人声、伴奏和混响。音乐被切掉时检查降噪与发话模式；有回声时检查重复路径或通话输出是否接回虚拟音频线。',
 'install_details':'VB-CABLE 安装图解（尚未安装时展开）',
 'modes':'普通播放器与高级直播模式的区别', 'scope':'普通播放器保留 BGM／伴奏、歌词与歌单功能；高级直播模式还会处理麦克风并完成混音。Profile 主要处理麦克风，不是将伴奏也送入同一条人声效果链。Monitor 是自己听的路径，OBS／Discord 接收 Stream Output。',
 'signal':'麦克风 → Profile 效果器信号链 → 与 BGM／伴奏混音 → Stream Output → OBS／Discord',
 'defaults':'设置默认演唱 Profile 与自动切换', 'defaults_intro':'在“设置 → 音频路由”选择演唱与聊天的默认 Profile，无需为每首歌设置标签。再确认主界面使用自动切换，而不是手动固定某组效果。',
 'auto_title':'将主界面 Profile 设为自动切换', 'auto':'在上方 Profile 菜单选择自动切换。歌曲没有专属 Profile 或选择“自动・演唱 Profile”时，使用路由页的默认演唱 Profile；歌曲明确指定的 Profile 优先。手动选定 Profile 会临时覆盖自动化，选回自动切换才恢复。',
 'test_auto':'播放伴奏确认使用演唱 Profile；停止伴奏回到聊天时确认恢复聊天 Profile。通过 OBS 短录音、完整输出录音或 Discord 通话验证效果。没有切换时，先检查手动指定状态与歌曲标签。',
 'profile_pre':'要将 Profile 效果送到 OBS 或 Discord，先在“设置 → 音频路由”启用高级直播模式（混音输出），并选好麦克风与 Stream Output。此路径将效果处理后的麦克风与 BGM／伴奏混音；普通播放器模式不会通过此路径处理并输出麦克风。',
 'profile_intro':'Profile 是可重复使用的人声效果设置，保存 Signal Chain（效果器信号链）的效果器、参数、启用状态和处理顺序。本章集中说明效果器编辑、试听、歌曲标签、内置 Profile 与 VST3。',
 'route_link':'先完成麦克风与混音输出设置', 'profile_link':'前往 Profile（直播效果器）设置', 'reference':'设备、监听、录音与稳定性详细说明', 'reference_intro':'输出与自动切换设置好后，再按需阅读以下内容。第一次正式使用前，请在没有直播、通话或外部录音时完成稳定性检查，无需每次开播重跑。', 'more':'效果器细节已移到独立的 Profile 章节。'
}}
C['zh-TW']['dc_receive'] = C['zh-TW']['dc_receive'].replace('声音','聲音')
C['zh-TW']['auto'] = C['zh-TW']['auto'].replace('路由页','路由頁')
for lang,c in C.items():
    q,o = quick[lang],setup[lang]
    obs = [copy.deepcopy(q['steps'][0]),copy.deepcopy(o['steps'][1]),copy.deepcopy(o['steps'][2]),copy.deepcopy(o['steps'][3])]
    obs[1]['body'] = c['obs_install']
    obs[2]['body'] += ' '+o['note']
    obs[3].update(title=c['test_title'],body=c['test_obs'])
    dc = [dict(title=c['install_title'],body=c['install']),dict(title=c['dc_route_title'],body=c['dc_route'],images=copy.deepcopy(o['steps'][4]['images'])),copy.deepcopy(o['discord']['steps'][0]),copy.deepcopy(o['discord']['steps'][1]),dict(title=c['test_title'],body=c['test_dc'])]
    dc[1]['images'][0]['caption']=c['dc_intro']
    dc[2]['body'] += ' '+c['dc_receive']
    dc[3].update(title=c['dc_process_title'],body=c['dc_process'])
    dc[3]['images'][0]['caption']=c['dc_caption']
    defaults=[copy.deepcopy(q['steps'][4]),dict(title=c['auto_title'],body=c['auto'],images=[dict(file='27-live-profile-menu.png',alt=c['auto_title'],caption=c['auto_title'])]),dict(title=c['test_title'],body=c['test_auto'])]
    c['obs_steps'],c['discord_steps'],c['default_steps']=obs,dc,defaults
    c['virtual_steps']=copy.deepcopy(o['steps'][4:7])
    c['dc_note']=o['discord']['note']

step_include='''{% assign route_lang = page.lang | default: 'zh-TW' %}
{% assign route_copy = site.data.stream_routes[route_lang] %}
{% assign step_key = include.target | append: '_steps' %}
<div class="setup-steps" data-route-steps="{{ include.target | escape }}">
{% for step in route_copy[step_key] %}
<section class="setup-step">
  <span class="setup-step-number">{{ forloop.index }}</span>
  <div><h3>{{ step.title | escape }}</h3><p>{{ step.body }}</p>
  {% if step.images %}<div class="feature-shot-grid{% if step.images.size == 1 %} feature-shot-grid--compact{% endif %}">
    {% for shot in step.images %}
    {% if shot.localized %}
      {% if route_lang == 'zh-TW' %}{% capture route_shot %}/assets/images/{{ shot.file }}{% endcapture %}{% else %}{% capture route_shot %}/assets/images/{{ route_lang }}/{{ shot.file }}{% endcapture %}{% endif %}
    {% else %}{% capture route_shot %}/assets/images/advanced-streaming/{{ shot.file }}{% endcapture %}{% endif %}
    <figure class="manual-figure"><a href="{{ route_shot | relative_url }}"><img src="{{ route_shot | relative_url }}" alt="{{ shot.alt | escape }}" loading="lazy" decoding="async"></a><figcaption>{{ shot.caption }}</figcaption></figure>
    {% endfor %}
  </div>{% endif %}</div>
</section>
{% endfor %}
</div>
'''
write('_includes/stream-route-steps.html',step_include)
write('_includes/profile-prerequisite.html','''{% assign profile_lang = page.lang | default: 'zh-TW' %}
{% assign profile_copy = site.data.stream_routes[profile_lang] %}
{% if profile_lang == 'zh-TW' %}{% assign audio_target = '/advanced-streaming.html' %}{% else %}{% capture audio_target %}/{{ profile_lang }}/advanced-streaming.html{% endcapture %}{% endif %}
<section data-article-lead id="profile-prerequisite">
  <p><strong>{{ profile_copy.profile_pre | escape }}</strong></p>
  <p>{{ profile_copy.profile_intro | escape }}</p>
  <p>{{ profile_copy.signal | escape }}</p>
  <p>{{ profile_copy.scope | escape }}</p>
  <nav class="article-outline" aria-label="{{ profile_copy.route_link | escape }}"><ul>
    <li><a href="{{ audio_target | relative_url }}">{{ profile_copy.route_link | escape }}</a></li>
    <li><a href="{{ audio_target | relative_url }}#singing-profile-defaults">{{ profile_copy.defaults | escape }}</a></li>
  </ul></nav>
</section>
''')
for lang,c in C.items():
    prefix = '' if lang=='zh-TW' else lang+'/'
    filename=prefix+'advanced-streaming.md'
    src=read(filename)
    def start_before(marker):
        assert src.count(marker)==1,(lang,marker)
        i=src.rfind('<div class="manual-feature-update">',0,src.index(marker))
        assert i>=0
        return i
    mode_start=start_before('>2.1.0.0 · AUDIO ROUTING<')
    mode_end=src.index('\n</div>',mode_start)+len('\n</div>')
    voice_start=src.index('## Create and edit voice Profiles') if lang=='en' else start_before('>VOICE CHAIN<')
    monitor_start=start_before('>MONITOR &amp; RECORD<')
    obs_start=start_before('>OBS DIRECT OUTPUT<')
    assert mode_start<mode_end<voice_start<monitor_start<obs_start
    voice=src[voice_start:monitor_start].strip()
    routing=src[mode_end:voice_start].strip()
    mode=src[mode_start:mode_end]
    mode=re.sub(r'<h2>.*?</h2>',lambda m:'<h2 id="route-modes">'+c['modes']+'</h2>',mode,count=1)
    remaining=src[monitor_start:obs_start].strip()
    setup_marker='{% include obs-audio-output-setup.html %}'
    assert src.count(setup_marker)==1
    plugin=src[obs_start:src.index(setup_marker)].strip().replace('<h2>','<h3>').replace('</h2>','</h3>')
    install_at=src.index('<a id="vb-cable-installation"></a>')
    installation=src[install_at+len('<a id="vb-cable-installation"></a>'):].strip()
    installation=re.sub(r'^## ', '### ',installation,flags=re.M)
    between=src[src.index(setup_marker)+len(setup_marker):install_at]
    warning=re.sub(r'```[\s\S]*?```','',between).strip()
    earlier=src[:mode_start]
    heads=list(re.finditer(r'^## ',earlier,re.M))
    assert len(heads)>=2
    settings=earlier[heads[-1].start():].strip()
    front=src[:src.index('\n---',4)+4]
    front=re.sub(r'^title:.*$',lambda m:'title: '+json.dumps(c['title'],ensure_ascii=False),front,flags=re.M)
    front=re.sub(r'^description:.*$',lambda m:'description: '+json.dumps(c['intro'].replace('**',''),ensure_ascii=False),front,flags=re.M)
    profile_url='/'+prefix+'profiles.html'
    leading='''<section data-article-lead markdown="1">

INTRO

<nav class="article-outline audio-output-targets" id="advanced-quick-start" aria-label="CHOOSE">
  <strong>CHOOSE</strong><ul><li><a href="#output-obs">OBS</a></li><li><a href="#output-discord">DISCORD</a></li></ul>
</nav>

<a id="obs-output-walkthrough-title"></a>
<h2 id="output-obs">OBS</h2>
<p>OBS_INTRO</p>
{% include stream-route-steps.html target="obs" %}

<details class="audio-route-details" markdown="1"><summary>OBS_DETAILS</summary>

PLUGIN

{% include stream-route-steps.html target="virtual" %}

</details>

<a id="discord-output-walkthrough-title"></a>
<h2 id="output-discord">DISCORD</h2>
<p>DC_INTRO</p>
{% include stream-route-steps.html target="discord" %}
<p>DC_NOTE</p>

<a id="vb-cable-installation"></a>
<details class="audio-route-details" markdown="1"><summary>INSTALL_DETAILS</summary>

WARNING

INSTALLATION

</details>

</section>
'''
    replacements={'INTRO':c['intro'],'CHOOSE':c['choose'],'OBS':c['obs'],'DISCORD':c['discord'],'OBS_INTRO':c['obs_intro'],'OBS_DETAILS':c['obs_details'],'PLUGIN':plugin,'DC_INTRO':c['dc_intro'],'DC_NOTE':c['dc_note'],'INSTALL_DETAILS':c['install_details'],'WARNING':warning,'INSTALLATION':installation}
    leading=re.sub(r'\b(?:'+ '|'.join(sorted(replacements,key=len,reverse=True))+r')\b',lambda m:replacements[m[0]],leading)
    tail=f'''\n\n{mode}\n\n{c['scope']}\n\n**{c['signal']}**\n\n<h2 id="singing-profile-defaults">{c['defaults']}</h2>\n\n{c['defaults_intro']}\n\n{{% include stream-route-steps.html target="default" %}}\n\n[{c['profile_link']} →]({{{{ '{profile_url}' | relative_url }}}})\n\n<h2 id="audio-reference">{c['reference']}</h2>\n\n{c['reference_intro']}\n\n{routing}\n\n{remaining}\n\n<p id="profile-chain-heading">{c['more']} <a href="{{{{ '{profile_url}#profile-chain-heading' | relative_url }}}}">{c['profile_link']} →</a></p>\n\n{settings}\n'''
    write(filename,front+'\n\n# '+c['title']+'\n\n'+leading+tail)
    if lang!='zh-TW':
        profile_front='---\ntitle: '+json.dumps(c['profile'],ensure_ascii=False)+'\ndescription: '+json.dumps(c['profile_intro'],ensure_ascii=False)+'\nlang: '+lang+'\ntranslation_key: profiles\n---\n\n'
        write(prefix+'profiles.md',profile_front+'# '+c['profile']+'\n\n{% include profile-prerequisite.html %}\n\n'+voice+'\n')
    else:
        p=read('profiles.md')
        p=re.sub(r'^title:.*$','title: '+c['profile'],p,count=1,flags=re.M)
        begin=p.index('# 人聲 Profiles')
        body=p[p.index('## 最重要的新功能',begin):]
        body=body.replace('3. 播放伴奏時，軟體自動套用該歌曲指定的效果；歌曲結束後回到聊天 Profile。','3. 主畫面維持「自動切換 Profile」時，播放伴奏會套用歌曲指定的效果；停止伴奏回到聊天時切回聊天 Profile。')
        body=body.replace('> Profile 會在伴奏播放狀態改變時切換。','> 自動模式下，Profile 會在伴奏播放狀態改變時切換。手動指定會暫時覆蓋自動化，請選回「自動切換 Profile」恢復。')
        unique_at=voice.rfind('<div class="manual-feature-update">',0,voice.index('>SONG AUTOMATION<'))
        unique=voice[unique_at:]
        # Existing root reference already contains every effect; retain it instead of duplicating it.
        body+='\n\n'+unique+'\n'
        write('profiles.md',p[:begin]+'# '+c['profile']+'\n\n{% include profile-prerequisite.html %}\n\n'+body)

# Public copy only; no API credentials, counter changes or desktop code.
write('_data/stream_routes.json',json.dumps(C,ensure_ascii=False,indent=2)+'\n')
s=read('_includes/guide-sidebar.html')
s=s.replace('obs-and-themes,advanced-streaming,obs-websocket','obs-and-themes,advanced-streaming,profiles,obs-websocket')
s=s.replace('themes,advanced_streaming,websocket','themes,advanced_streaming,profiles,websocket')
s=s.replace("key == 'advanced-streaming' or key == 'open-source'", "key == 'advanced-streaming' or key == 'profiles' or key == 'open-source'")
write('_includes/guide-sidebar.html',s)
s=read('_layouts/default.html')
assert s.count("section == 'audio-routing' or section == 'profiles'")==1
write('_layouts/default.html',s.replace("section == 'audio-routing' or section == 'profiles'","section == 'audio-routing'",1))
s=read('_data/i18n.yml')
for lang,c in C.items():
    m=re.search(r'^'+re.escape(lang)+r':\n[\s\S]*?(?=^\S|\Z)',s,re.M)
    assert m,lang
    b=re.sub(r'^    profiles:.*$','    profiles: '+c['profile'],m[0],flags=re.M)
    b=re.sub(r'^    advanced_streaming:.*$','    advanced_streaming: '+c['nav'],b,flags=re.M)
    s=s[:m.start()]+b+s[m.end():]
write('_data/i18n.yml',s)
links=json.loads(read('_data/homepage_links.json'))
for lang,values in links.items():
    if isinstance(values,dict) and 'profiles' in values: values['profiles']='/'+('' if lang=='zh-TW' else lang+'/')+'profiles.html'
write('_data/homepage_links.json',json.dumps(links,ensure_ascii=False,indent=2)+'\n')
# Record the bounded, documentation-only set for review and commit.
changed=subprocess.check_output(['git','diff','--name-only'],text=True).splitlines()
added=['_data/stream_routes.json','_includes/stream-route-steps.html','_includes/profile-prerequisite.html']+[l+'/profiles.md' for l in C if l!='zh-TW']
files=sorted(set(changed+added))
assert all(not f.startswith(('assets/','BGMSavior/')) for f in files)
assert '_data/analytics.json' not in files and '_data/download_clicks.json' not in files
Path('/tmp/audio-guide-changed.json').write_text(json.dumps(files))
print('Prepared documentation files:',json.dumps(files))
