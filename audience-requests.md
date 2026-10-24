---
title: 觀眾點歌與主播後台
description: 申請開通免費觀眾點歌、公開專案歌單、分享觀眾連結，並在電腦或手機 Studio 審核點歌。包含場次、待播、身分備份與連線排錯。
lang: zh-TW
translation_key: audience-requests
---

# 觀眾點歌與主播後台

2.2.0.0 起，可讓觀眾從網頁查看你的歌單並提出點歌，再由你審核是否加入「待播」。**功能免費；為避免濫用增加伺服器負擔，使用前需要申請並經管理員開通。** 一般本機播放不需要申請。

截圖使用繁體中文介面與示範資料；申請畫面的電子信箱已隱藏，實際申請時仍需填寫。點擊圖片可放大查看。

## 第一次使用：申請開通

<figure class="manual-figure">
  <a href="{{ '/assets/images/2200/audience-requests/01-activation.png' | relative_url }}"><img src="{{ '/assets/images/2200/audience-requests/01-activation.png' | relative_url }}" alt="1．尚未開通時，在「觀眾點歌」按「申請開通觀眾點歌」開始申請。" width="1602" height="932" loading="lazy" decoding="async"></a>
  <figcaption>1．尚未開通時，在「觀眾點歌」按「申請開通觀眾點歌」開始申請。</figcaption>
</figure>

1. 在軟體開啟「觀眾點歌」，按「申請開通觀眾點歌」。未開通時，申請畫面會覆蓋這個分頁的線上功能。
2. 填寫主播 ID、名稱、個人簡介、頻道網址、電子信箱及 Discord ID。主播 ID 不可與他人重複，使用 3–50 個小寫英文字母、數字、連字號或底線；頻道網址須以 `https://` 開頭。
3. 名稱填**主播使用的名字，請不要填本名**；個人資訊簡單介紹自己即可。電子信箱與 Discord ID 可以填經紀人或公司的聯絡方式。申請留言選填，不知道寫什麼也可以誇誇我！
4. 按「檢查申請內容…」逐項核對，再確認送出。送出後不能直接編輯申請內容，請先檢查聯絡資訊是否正確。
5. 等待管理員審核，之後按「檢查開通狀態」。通過並完成連線後，這個分頁才會顯示點歌功能；仍在審核中時不必重複申請。

<figure class="manual-figure">
  <a href="{{ '/assets/images/2200/audience-requests/02-application-form-redacted.png' | relative_url }}"><img src="{{ '/assets/images/2200/audience-requests/02-application-form-redacted.png' | relative_url }}" alt="2．填寫主播資料、頻道與聯絡方式，再按「檢查申請內容…」。本圖的電子信箱已隱藏；頻道網址、公開名稱等資訊保留作為範例。" width="1602" height="932" loading="lazy" decoding="async"></a>
  <figcaption>2．填寫主播資料、頻道與聯絡方式，再按「檢查申請內容…」。本圖的電子信箱已隱藏；頻道網址、公開名稱等資訊保留作為範例。</figcaption>
</figure>

<figure class="manual-figure">
  <a href="{{ '/assets/images/2200/audience-requests/03-application-pending.png' | relative_url }}"><img src="{{ '/assets/images/2200/audience-requests/03-application-pending.png' | relative_url }}" alt="3．送出後會顯示「申請已送出」。等待管理員審核，再按「檢查開通狀態」，不需要重複申請。" width="1602" height="932" loading="lazy" decoding="async"></a>
  <figcaption>3．送出後會顯示「申請已送出」。等待管理員審核，再按「檢查開通狀態」，不需要重複申請。</figcaption>
</figure>


裝置身分由軟體產生並保存在這台電腦，不需要自行建立、記錄或輸入登入密碼。之後啟動時會使用已保存的身分自動連線。

## 公開歌單並開始一場點歌

<figure class="manual-figure">
  <a href="{{ '/assets/images/2200/audience-requests/04-session-ready.png' | relative_url }}"><img src="{{ '/assets/images/2200/audience-requests/04-session-ready.png' | relative_url }}" alt="4．開通並連線後，確認公開名稱與目前專案。圖中尚未開始場次，公開歌曲數為 0；按「開啟線上點歌」才會公開歌單。" width="1602" height="932" loading="lazy" decoding="async"></a>
  <figcaption>4．開通並連線後，確認公開名稱與目前專案。圖中尚未開始場次，公開歌曲數為 0；按「開啟線上點歌」才會公開歌單。</figcaption>
</figure>

1. 先開啟準備演唱的專案，確認歌曲名稱、演出者與分類。
2. 回到「觀眾點歌」，確認「公開名稱」，視需要設定頭像與場次名稱。場次名稱留空會使用當天日期。
3. 按「開啟線上點歌」，閱讀確認內容後開始。這會將**目前專案**的歌單資料送到網站，建立這一場點歌。
4. 複製軟體顯示的「觀眾點歌連結」，放在直播說明、聊天室或社群。請分享軟體產生的完整連結，觀眾不需要安裝 S3S。
5. 用「開啟連結」檢查觀眾實際看到的頁面。觀眾可搜尋、篩選歌曲，填寫暱稱與選填留言，確認後提出點歌。

<figure class="manual-figure">
  <a href="{{ '/assets/images/2200/audience-requests/05-session-open.png' | relative_url }}"><img src="{{ '/assets/images/2200/audience-requests/05-session-open.png' | relative_url }}" alt="5．場次開始後，檢查已發布歌曲數、上次更新與場次開始時間，再複製「觀眾點歌連結」分享。圖中已發布 112 首歌曲。" width="1602" height="932" loading="lazy" decoding="async"></a>
  <figcaption>5．場次開始後，檢查已發布歌曲數、上次更新與場次開始時間，再複製「觀眾點歌連結」分享。圖中已發布 112 首歌曲。</figcaption>
</figure>


公開的是歌名、演出者、歌曲長度、曲風、語言、自訂歌單分類與可點歌狀態等歌單資料；不會因此上傳本機音訊檔、來源路徑、歌詞或人聲效果設定。這個網站是點歌入口，觀眾不會透過它收聽你的本機伴奏。

修改歌曲或切換專案後，請確認來源，再按「更新歌單」重新公開。**本機修改不等於網站已經更新**；可查看頁面上的公開歌曲數與上次更新時間。請勿把 OBS 使用的本機歌單／歌詞連結當作觀眾點歌連結。

<figure class="manual-figure">
  <a href="{{ '/assets/images/2200/audience-requests/06-viewer-songbook.png' | relative_url }}"><img src="{{ '/assets/images/2200/audience-requests/06-viewer-songbook.png' | relative_url }}" alt="6．這是觀眾看到的公開歌單網頁。觀眾可切換分類、搜尋或篩選、加入最愛，再按歌曲旁的「點歌」提出申請。" width="1273" height="1259" loading="lazy" decoding="async"></a>
  <figcaption>6．這是觀眾看到的公開歌單網頁。觀眾可切換分類、搜尋或篩選、加入最愛，再按歌曲旁的「點歌」提出申請。</figcaption>
</figure>

## 審核點歌與安排待播

收到點歌後，「觀眾點歌」會顯示通知數量。開啟這個分頁或「審核待處理」查看歌名、觀眾與留言，可用「本場全部／待審核／已接受／已拒絕」篩選。

<figure class="manual-figure">
  <a href="{{ '/assets/images/2200/audience-requests/07-review-request.png' | relative_url }}"><img src="{{ '/assets/images/2200/audience-requests/07-review-request.png' | relative_url }}" alt="7．收到新點歌時，分頁與「審核待處理」會顯示數量。開啟審核視窗，確認歌曲、觀眾及留言，再選擇「接受」或「拒絕」。" width="1596" height="928" loading="lazy" decoding="async"></a>
  <figcaption>7．收到新點歌時，分頁與「審核待處理」會顯示數量。開啟審核視窗，確認歌曲、觀眾及留言，再選擇「接受」或「拒絕」。</figcaption>
</figure>

| 操作或狀態 | 會發生什麼事 |
| --- | --- |
| 接受 | 將歌曲加入現有的「待播」清單；不會立即開始播放。 |
| 拒絕 | 保留這筆點歌的審核結果，不加入待播。 |
| 待播 | 可沿用原本的拖曳排序與播放操作，和手動加入的歌曲一起安排。 |
| 播放／已唱 | 播放進度與審核結果分開顯示；接受並不代表已經唱完。 |

<figure class="manual-figure">
  <a href="{{ '/assets/images/2200/audience-requests/08-accepted-reserve.png' | relative_url }}"><img src="{{ '/assets/images/2200/audience-requests/08-accepted-reserve.png' | relative_url }}" alt="8．接受後，審核狀態變為「已接受」，歌曲也加入右側待播清單。這時仍是等待播放，不會因為接受就自動開唱。" width="1602" height="932" loading="lazy" decoding="async"></a>
  <figcaption>8．接受後，審核狀態變為「已接受」，歌曲也加入右側待播清單。這時仍是等待播放，不會因為接受就自動開唱。</figcaption>
</figure>


播放仍由桌面軟體執行。請讓目前專案中的歌曲音源保持可用；若檔案移動、刪除或 YouTube 來源無法使用，先修正音源再播放。待播的基本操作請參考[歌曲庫與播放]({{ '/library-and-playback.html' | relative_url }}#待播與已唱)。

「暫不接受點歌」只會暫停新申請，保留場次與既有紀錄；要繼續收歌時再切回接受點歌。要結束本場則按「關閉線上點歌」並確認；本機待播和這一場的點歌紀錄會保留可用，下一場可重新開啟線上點歌。

## 用手機操作主播後台（Studio）

在桌面按「開啟主播後台網頁」，依頁面提供的方式在瀏覽器或手機進入 Studio，再選擇要查看的場次，審核點歌或查看紀錄。Studio 需要主播授權，請保留私人進入連結或登入工作階段給自己使用；**分享給觀眾的是觀眾點歌連結**。

手機 Studio 協助管理線上點歌，歌曲仍在桌面軟體播放；它不會把手機變成音源播放器，也不能取代這台電腦保存的裝置身分。若私人進入連結已失效，回到軟體重新開啟主播後台。一般瀏覽器帳號登入也不等於已備份桌面裝置身分。

## 設定點歌上限與備份身分

按「設定」展開設定頁；可用「收合設定」或「返回點歌列表」回去。

- **未完成點歌上限**：開啟限制後，可用左側減號、中央數值或右側加號設定每位觀眾的上限（1–20 首），再按「儲存」。待審核及已接受但尚未唱完的點歌都會計入。
- **備份主播身分**：匯出加密的 `.s3sidentity` 備份，自訂至少 8 字元的備份密碼，將檔案和密碼妥善保管。這個密碼是你選擇的備份密碼，與自動保存的登入資料不同。
- **還原主播身分**：換電腦或需要復原時使用備份檔及密碼；先結束目前線上場次，再進行還原。只複製專案檔不能還原主播身分，遺失備份密碼也無法解開備份。

## 連線或開通狀態異常時

| 畫面或情況 | 如何處理 |
| --- | --- |
| 審核中／申請未通過 | 查看開通狀態；有疑問時聯絡管理員，不必重複送出同一份申請。 |
| 重新連線中 | 軟體會自動嘗試恢復連線與更新登入憑證，不需要每隔幾小時手動登入。等待網路恢復，必要時使用重新連線。 |
| 伺服器停機維護中 | 線上操作暫時被阻擋，已保存身分會保留；等待維護結束，或稍後按「重試連線」。 |
| 伺服器暫時無法使用 | 可能是網路或服務異常，並不代表帳號遭刪除。先確認網路，稍後重試。只有伺服器明確標示維護時才顯示維護畫面。 |
| 裝置停用／觀眾點歌已停權 | 管理員停用了主播裝置；使用「檢查開通狀態」確認，或聯絡管理員處理，重新安裝不會解除限制。 |
| 主播帳號已移除 | 軟體收到伺服器確認移除的狀態後，會回到可重新申請的畫面。若只有連線錯誤，請先排除連線問題。 |
| 要求還原主播身分 | 使用先前匯出的加密備份；不要把它當作第一次使用而反覆申請新身分。 |

後台封鎖「觀眾裝置」限制的是該觀眾瀏覽器的點歌，與停用「主播裝置」不同。網路、維護或審核限制影響的是雲端點歌；原本的本機歌曲庫、待播與播放器仍可使用，YouTube 等網路音源則仍需要網路。線上紀錄更新需等連線恢復後確認，離線時不要把網站的舊狀態當作最新結果。
