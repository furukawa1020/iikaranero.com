// いいから寝ろ.com - メインクライアント// いいから寝ろ.com - メインクライアント// いいから寝ろ.com - メインクライアント

// 完全ブラウザベース生成AI（APIキー不要）

// 超軽量・完全ブラウザベース生成AI// 超軽量・完全ブラウザベース生成AI

interface AppState {

  isGenerating: boolean;

  lastResponse: string;

  dimTimer: number | null;// ===== 型定義 =====// ===== フルスクラッチ生成AIエンジン =====

}

interface AppState {

const state: AppState = {

  isGenerating: false,  isGenerating: boolean;// 危機語パターン

  lastResponse: '',

  dimTimer: null  lastResponse: string;const CRISIS_PATTERNS = [

};

  dimTimer: number | null;  /死にたい|自殺|消えたい|終わりたい/,

// 危機語検知

const CRISIS_PATTERNS = [}  /殺す|殺したい|暴力|危害/,

  /死にたい|自殺|消えたい|終わりたい/,

  /殺す|殺したい|暴力|危害/,  /虐待|いじめ|DV/,

  /虐待|いじめ|DV/,

  /薬.*大量|OD|過剰摂取/// ===== フルスクラッチ生成AIエンジン =====  /薬.*大量|OD|過剰摂取/

];

];

const SLEEP_PATTERNS = [

  /眠れない|寝れない|寝られない|眠くない/,// 危機語パターン

  /不眠|睡眠.*困|寝付けない/

];const CRISIS_PATTERNS = [// 眠れない意図パターン



const CATEGORY_PATTERNS: { [key: string]: RegExp } = {  /死にたい|自殺|消えたい|終わりたい/,const SLEEP_PATTERNS = [

  work: /仕事|会社|上司|同僚|職場|残業|転職|就活|面接/,

  love: /恋愛|好き|彼氏|彼女|元カレ|元カノ|片思い|別れ|復縁|浮気|デート/,  /殺す|殺したい|暴力|危害/,  /眠れない|寝れない|寝られない|眠くない/,

  study: /勉強|試験|テスト|受験|学校|大学|成績|留年/,

  future: /将来|進路|夢|目標|不安|人生|キャリア/,  /虐待|いじめ|DV/,  /不眠|睡眠.*困|寝付けない/

  health: /体調|病気|痛い|具合|健康|疲れ|ストレス/,

  money: /お金|給料|貯金|借金|ローン|生活費|バイト/,  /薬.*大量|OD|過剰摂取/];

  family: /家族|親|父|母|兄弟|姉妹|子供|実家/,

  friend: /友達|友人|人間関係|付き合い|孤独|ぼっち/];

};

// カテゴリ// フォーム送信

const TEMPLATES: { [key: string]: Array<{ mirror: string; logic: string }> } = {

  work: [// 眠れない意図パターンform.addEventListener('submit', (e) => {

    { mirror: '仕事の心配', logic: '夜に増幅する。明日の脳のほうが強い' },

    { mirror: '職場の問題', logic: '寝不足では解決しない。休息が先だ' }const SLEEP_PATTERNS = [  e.preventDefault();

  ],

  love: [  /眠れない|寝れない|寝られない|眠くない/,  const text = input.value;

    { mirror: '相手の気持ち', logic: '今夜は読めない。既読も睡眠には勝てない' },

    { mirror: 'その恋愛', logic: '夜の感情は暴走する。冷静さは朝にある' }  /不眠|睡眠.*困|寝付けない/  

  ],

  study: [];  if (!text.trim()) {

    { mirror: '試験の不安', logic: '徹夜は記憶を殺す。寝たほうが点は取れる' },

    { mirror: 'その勉強', logic: '眠いまま続けても頭に入らない。寝ろ' }    responseArea.textContent = '黙っててもいい。いいから寝ろ。';

  ],

  future: [// カテゴリ検知パターン    state.lastResponse = responseArea.textContent;

    { mirror: '将来の不安', logic: '夜の計画は破綻する。寝てから考えろ' },

    { mirror: 'その進路', logic: '疲れた頭で決めるな。朝のほうがマシだ' }const CATEGORY_PATTERNS = {    actions.style.display = 'flex';

  ],

  health: [  work: /仕事|会社|上司|同僚|職場|残業|転職|就活|面接/,    startDimTimer();

    { mirror: 'その体調', logic: '心配するより寝たほうが治る。休め' },

    { mirror: 'ストレス', logic: '睡眠不足が増幅させる。断ち切れ' }  love: /恋愛|好き|彼氏|彼女|元カレ|元カノ|片思い|別れ|復縁|浮気|デート/,    return;

  ],

  money: [  study: /勉強|試験|テスト|受験|学校|大学|成績|留年|就活/,  }

    { mirror: 'お金の不安', logic: '夜に計算しても増えない。寝てから稼げ' },

    { mirror: 'その金策', logic: '焦っても無駄だ。冷静になるには睡眠が要る' }  future: /将来|進路|夢|目標|不安|人生|キャリア/,  

  ],

  family: [  health: /体調|病気|痛い|具合|健康|疲れ|ストレス/,  generateResponseLocal(text);

    { mirror: '家族の問題', logic: '夜に考えても解決しない。距離を置いて寝ろ' },

    { mirror: 'その関係', logic: '感情的になっても悪化する。一度寝ろ' }  money: /お金|給料|貯金|借金|ローン|生活費|バイト/,});ATEGORY_PATTERNS = {

  ],

  friend: [  family: /家族|親|父|母|兄弟|姉妹|子供|実家/,  work: /仕事|会社|上司|同僚|職場|残業|転職|就活|面接/,

    { mirror: '人間関係', logic: '夜は孤独が強まる。朝になれば違って見える' },

    { mirror: '孤独感', logic: '夜に増幅するだけだ。朝まで待て' }  friend: /友達|友人|人間関係|付き合い|孤独|ぼっち/  love: /恋愛|好き|彼氏|彼女|元カレ|元カノ|片思い|別れ|復縁|浮気|デート/,

  ],

  default: [};  study: /勉強|試験|テスト|受験|学校|大学|成績|留年|就活/,

    { mirror: 'その悩み', logic: '夜に考えても解決しない。明日やれ' },

    { mirror: 'その問題', logic: '疲れた頭では判断できない。寝てからだ' }  future: /将来|進路|夢|目標|不安|人生|キャリア/,

  ]

};// 応答テンプレート（論理構造: 鏡映 + 論拠 + 締め句）  health: /体調|病気|痛い|具合|健康|疲れ|ストレス/,



const SLEEP_TIPS = [const RESPONSE_TEMPLATES = {  money: /お金|給料|貯金|借金|ローン|生活費|バイト/,

  '深呼吸を10回。それでダメなら諦めて横になれ',

  '画面を消せ。光が脳を起こしてる',  work: [  family: /家族|親|父|母|兄弟|姉妹|子供|実家/,

  '布団に入れ。考えるのは明日だ',

  '目を閉じろ。寝なくても休める'    { mirror: '仕事の心配', logic: '夜に増幅する。明日の脳のほうが強い' },  friend: /友達|友人|人間関係|付き合い|孤独|ぼっち/

];

    { mirror: '職場の問題', logic: '寝不足では解決しない。休息が先だ' },};

const NIGHT_SHORT = [

  { mirror: 'その悩み', logic: '朝まで放置しろ' },    { mirror: 'その案件', logic: '今夜考えても変わらない。寝てから判断しろ' }

  { mirror: 'それ', logic: '明日考えろ' }

];  ],// 応答テンプレート（論理構造: 鏡映 + 論拠 + 締め句）



const CRISIS_RESPONSE = `あなたの状況は深刻かもしれない。専門家に相談してほしい。  love: [const RESPONSE_TEMPLATES = {



▼ 相談窓口    { mirror: '相手の気持ち', logic: '今夜は読めない。既読も睡眠には勝てない' },  work: [

https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/jisatsu/soudan_tel.html

    { mirror: 'その恋愛', logic: '夜の感情は暴走する。冷静さは朝にある' },    { mirror: '仕事の心配', logic: '夜に増幅する。明日の脳のほうが強い' },

それでも、今は休め。いいから寝ろ。`;

    { mirror: '恋の悩み', logic: '不安は夜に膨らむ。寝たら半分消える' }    { mirror: '職場の問題', logic: '寝不足では解決しない。休息が先だ' },

function detectCategory(text: string): string {

  for (const [cat, pattern] of Object.entries(CATEGORY_PATTERNS)) {  ],    { mirror: 'その案件', logic: '今夜考えても変わらない。寝てから判断しろ' }

    if (pattern.test(text)) return cat;

  }  study: [  ],

  return 'default';

}    { mirror: '試験の不安', logic: '徹夜は記憶を殺す。寝たほうが点は取れる' },  love: [



function detectCrisis(text: string): boolean {    { mirror: 'その勉強', logic: '眠いまま続けても頭に入らない。寝ろ' },    { mirror: '相手の気持ち', logic: '今夜は読めない。既読も睡眠には勝てない' },

  return CRISIS_PATTERNS.some(p => p.test(text.replace(/\s+/g, '')));

}    { mirror: '成績の心配', logic: '今夜悩んでも変わらない。明日やれ' }    { mirror: 'その恋愛', logic: '夜の感情は暴走する。冷静さは朝にある' },



function detectSleep(text: string): boolean {  ],    { mirror: '恋の悩み', logic: '不安は夜に膨らむ。寝たら半分消える' }

  return SLEEP_PATTERNS.some(p => p.test(text));

}  future: [  ],



function randomChoice<T>(arr: T[]): T {    { mirror: '将来の不安', logic: '夜の計画は破綻する。寝てから考えろ' },  study: [

  return arr[Math.floor(Math.random() * arr.length)];

}    { mirror: 'その進路', logic: '疲れた頭で決めるな。朝のほうがマシだ' },    { mirror: '試験の不安', logic: '徹夜は記憶を殺す。寝たほうが点は取れる' },



function generateText(input: string, isNight: boolean, isSleep: boolean): string {    { mirror: '人生の迷い', logic: '深夜の決断は後悔する。寝ろ' }    { mirror: 'その勉強', logic: '眠いまま続けても頭に入らない。寝ろ' },

  if (detectCrisis(input)) return CRISIS_RESPONSE;

    ],    { mirror: '成績の心配', logic: '今夜悩んでも変わらない。明日やれ' }

  if (isSleep) {

    const tip = randomChoice(SLEEP_TIPS);  health: [  ],

    return `眠れないのは辛い。でも焦るな。\n${tip}。\n\nいいから寝ろ。`;

  }    { mirror: 'その体調', logic: '心配するより寝たほうが治る。休め' },  future: [

  

  const cat = detectCategory(input);    { mirror: '疲労の蓄積', logic: '夜更かしが一番の敵だ。今すぐ寝ろ' },    { mirror: '将来の不安', logic: '夜の計画は破綻する。寝てから考えろ' },

  const temps = isNight ? NIGHT_SHORT : (TEMPLATES[cat] || TEMPLATES.default);

  const t = randomChoice(temps);    { mirror: 'ストレス', logic: '睡眠不足が増幅させる。断ち切れ' }    { mirror: 'その進路', logic: '疲れた頭で決めるな。朝のほうがマシだ' },

  

  return `${t.mirror}は${t.logic}。\n\nいいから寝ろ。`;  ],    { mirror: '人生の迷い', logic: '深夜の決断は後悔する。寝ろ' }

}

  money: [  ],

async function* streamText(text: string): AsyncGenerator<string> {

  const chunks = text.split('');    { mirror: 'お金の不安', logic: '夜に計算しても増えない。寝てから稼げ' },  health: [

  let buf = '';

      { mirror: 'その金策', logic: '焦っても無駄だ。冷静になるには睡眠が要る' },    { mirror: 'その体調', logic: '心配するより寝たほうが治る。休め' },

  for (let i = 0; i < chunks.length; i++) {

    buf += chunks[i];    { mirror: '経済的な悩み', logic: '疲れた頭では判断を誤る。寝ろ' }    { mirror: '疲労の蓄積', logic: '夜更かしが一番の敵だ。今すぐ寝ろ' },

    if (chunks[i] === '。' || chunks[i] === '\n' || i === chunks.length - 1) {

      yield buf;  ],    { mirror: 'ストレス', logic: '睡眠不足が増幅させる。断ち切れ' }

      buf = '';

      await new Promise(r => setTimeout(r, 150 + Math.random() * 100));  family: [  ],

    }

  }    { mirror: '家族の問題', logic: '夜に考えても解決しない。距離を置いて寝ろ' },  money: [

}

    { mirror: 'その関係', logic: '感情的になっても悪化する。一度寝ろ' },    { mirror: 'お金の不安', logic: '夜に計算しても増えない。寝てから稼げ' },

const form = document.getElementById('input-form') as HTMLFormElement;

const input = document.getElementById('input-text') as HTMLTextAreaElement;    { mirror: '家庭の悩み', logic: '冷静さは睡眠から生まれる。休め' }    { mirror: 'その金策', logic: '焦っても無駄だ。冷静になるには睡眠が要る' },

const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;

const responseArea = document.getElementById('response-area') as HTMLDivElement;  ],    { mirror: '経済的な悩み', logic: '疲れた頭では判断を誤る。寝ろ' }

const actions = document.getElementById('actions') as HTMLDivElement;

const shareX = document.getElementById('share-x') as HTMLButtonElement;  friend: [  ],

const shareLine = document.getElementById('share-line') as HTMLButtonElement;

const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;    { mirror: '人間関係', logic: '夜は孤独が強まる。朝になれば違って見える' },  family: [

const nightBadge = document.getElementById('night-badge') as HTMLSpanElement;

    { mirror: 'その友人', logic: '今夜考えても答えは出ない。寝ろ' },    { mirror: '家族の問題', logic: '夜に考えても解決しない。距離を置いて寝ろ' },

function isNightTime(): boolean {

  const now = new Date();    { mirror: '孤独感', logic: '夜に増幅するだけだ。朝まで待て' }    { mirror: 'その関係', logic: '感情的になっても悪化する。一度寝ろ' },

  const jst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));

  return jst.getHours() >= 23 || jst.getHours() < 5;  ],    { mirror: '家庭の悩み', logic: '冷静さは睡眠から生まれる。休め' }

}

  default: [  ],

function applyNightMode(): void {

  if (isNightTime()) {    { mirror: 'その悩み', logic: '夜に考えても解決しない。明日やれ' },  friend: [

    document.body.classList.add('night-mode');

    nightBadge.style.display = 'inline-block';    { mirror: 'その問題', logic: '疲れた頭では判断できない。寝てからだ' },    { mirror: '人間関係', logic: '夜は孤独が強まる。朝になれば違って見える' },

  } else {

    document.body.classList.remove('night-mode');    { mirror: 'その心配', logic: '今夜は無理だ。朝の自分に任せろ' }    { mirror: 'その友人', logic: '今夜考えても答えは出ない。寝ろ' },

    nightBadge.style.display = 'none';

  }  ]    { mirror: '孤独感', logic: '夜に増幅するだけだ。朝まで待て' }

}

};  ],

function startDimTimer(): void {

  if (state.dimTimer) clearTimeout(state.dimTimer);  default: [

  document.body.classList.remove('dim');

  state.dimTimer = window.setTimeout(() => document.body.classList.add('dim'), 5000);// 眠れない用Tip    { mirror: 'その悩み', logic: '夜に考えても解決しない。明日やれ' },

}

const SLEEP_TIPS = [    { mirror: 'その問題', logic: '疲れた頭では判断できない。寝てからだ' },

function cancelDim(): void {

  if (state.dimTimer) clearTimeout(state.dimTimer);  '深呼吸を10回。それでダメなら諦めて横になれ',    { mirror: 'その心配', logic: '今夜は無理だ。朝の自分に任せろ' }

  document.body.classList.remove('dim');

}  '画面を消せ。光が脳を起こしてる',  ]



async function generate(text: string): Promise<void> {  '布団に入れ。考えるのは明日だ',};

  if (state.isGenerating || !text.trim()) return;

    '目を閉じろ。寝なくても休める',

  state.isGenerating = true;

  submitBtn.disabled = true;  '体を温めろ。冷えてると眠れない'// 眠れない用Tip

  responseArea.textContent = '';

  actions.style.display = 'none';];const SLEEP_TIPS = [

  cancelDim();

    '深呼吸を10回。それでダメなら諦めて横になれ',

  try {

    const response = generateText(text, isNightTime(), detectSleep(text));// 夜間の短縮応答  '画面を消せ。光が脳を起こしてる',

    

    for await (const chunk of streamText(response)) {const NIGHT_SHORT_RESPONSES = [  '布団に入れ。考えるのは明日だ',

      responseArea.textContent += chunk;

      state.lastResponse = responseArea.textContent;  { mirror: 'その悩み', logic: '朝まで放置しろ' },  '目を閉じろ。寝なくても休める',

      responseArea.scrollTop = responseArea.scrollHeight;

    }  { mirror: 'それ', logic: '明日考えろ' },  '体を温めろ。冷えてると眠れない'

    

    if (state.lastResponse) {  { mirror: 'その件', logic: '今は無理だ' }];

      actions.style.display = 'flex';

      startDimTimer();];

    }

  } catch (error) {// 夜間の短縮応答

    responseArea.textContent = 'エラーが起きた。でも気にするな。いいから寝ろ。';

    state.lastResponse = responseArea.textContent;// 危機対応テンプレートconst NIGHT_SHORT_RESPONSES = [

    setTimeout(() => { actions.style.display = 'flex'; }, 500);

  } finally {const CRISIS_RESPONSE = `あなたの状況は深刻かもしれない。専門家に相談してほしい。  { mirror: 'その悩み', logic: '朝まで放置しろ' },

    state.isGenerating = false;

    submitBtn.disabled = false;  { mirror: 'それ', logic: '明日考えろ' },

    input.value = '';

  }▼ 相談窓口  { mirror: 'その件', logic: '今は無理だ' }

}

https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/jisatsu/soudan_tel.html];

form.addEventListener('submit', (e) => {

  e.preventDefault();

  const text = input.value;

  それでも、今は休め。いいから寝ろ。`;// 危機対応テンプレート

  if (!text.trim()) {

    responseArea.textContent = '黙っててもいい。いいから寝ろ。';const CRISIS_RESPONSE = `あなたの状況は深刻かもしれない。専門家に相談してほしい。

    state.lastResponse = responseArea.textContent;

    actions.style.display = 'flex';// カテゴリ検知

    startDimTimer();

    return;function detectCategory(text: string): keyof typeof RESPONSE_TEMPLATES {▼ 相談窓口

  }

    for (const [category, pattern] of Object.entries(CATEGORY_PATTERNS)) {https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/jisatsu/soudan_tel.html

  generate(text);

});    if (pattern.test(text)) {



resetBtn.addEventListener('click', () => {      return category as keyof typeof RESPONSE_TEMPLATES;それでも、今は休め。いいから寝ろ。`;

  responseArea.textContent = '';

  actions.style.display = 'none';    }

  state.lastResponse = '';

  cancelDim();  }// カテゴリ検知

  input.focus();

});  return 'default';function detectCategory(text: string): string {



shareX.addEventListener('click', () => {}  for (const [category, pattern] of Object.entries(CATEGORY_PATTERNS)) {

  const url = 'https://twitter.com/intent/tweet';

  const text = encodeURIComponent('AIに相談したら「いいから寝ろ。」って言われた\n\n#いいから寝ろ');    if (pattern.test(text)) {

  const shareUrl = encodeURIComponent(window.location.href);

  window.open(`${url}?text=${text}&url=${shareUrl}`, '_blank', 'noopener,noreferrer');// 危機語検知      return category;

});

function detectCrisis(text: string): boolean {    }

shareLine.addEventListener('click', () => {

  const text = encodeURIComponent('AIに相談したら「いいから寝ろ。」って言われた');  const normalized = text.toLowerCase().replace(/\s+/g, '');  }

  const url = encodeURIComponent(window.location.href);

    return CRISIS_PATTERNS.some(pattern => pattern.test(normalized));  return 'default';

  if (navigator.share) {

    navigator.share({}}

      title: 'いいから寝ろ.com',

      text: 'AIに相談したら「いいから寝ろ。」って言われた',

      url: window.location.href

    }).catch(() => {});// 眠れない意図検知// 危機語検知

  } else {

    window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer');function detectSleepIntent(text: string): boolean {function detectCrisis(text: string): boolean {

  }

});  return SLEEP_PATTERNS.some(pattern => pattern.test(text));  const normalized = text.toLowerCase().replace(/\s+/g, '');



document.body.addEventListener('click', () => {}  return CRISIS_PATTERNS.some(pattern => pattern.test(normalized));

  if (document.body.classList.contains('dim')) cancelDim();

});}



if ('serviceWorker' in navigator) {// キーワード抽出（簡易形態素解析風）

  window.addEventListener('load', () => {

    navigator.serviceWorker.register('/sw.js').catch(() => {});function extractKeywords(text: string): string[] {// 眠れない意図検知

  });

}  const stopwords = /^(が|は|を|に|へ|で|と|から|まで|より|の|や|か|な|ね|よ|さ|だ|です|ます|ません|ました|でした)$/;function detectSleepIntent(text: string): boolean {



applyNightMode();  const words = text.split(/[\s、。！？,.!?]+/).filter(w => w.length > 1 && !stopwords.test(w));  return SLEEP_PATTERNS.some(pattern => pattern.test(text));

setInterval(applyNightMode, 60000);

input.focus();  return words.slice(0, 3);}


}

// キーワード抽出（簡易形態素解析風）

// ランダム選択function extractKeywords(text: string): string[] {

function randomChoice<T>(arr: T[]): T {  // 助詞・助動詞を除去

  return arr[Math.floor(Math.random() * arr.length)];  const stopwords = /^(が|は|を|に|へ|で|と|から|まで|より|の|や|か|な|ね|よ|さ|だ|です|ます|ません|ました|でした)$/;

}  const words = text.split(/[\s、。！？,.!?]+/).filter(w => w.length > 1 && !stopwords.test(w));

  return words.slice(0, 3); // 最大3つ

// 応答生成エンジン}

function generateResponse(input: string, isNight: boolean, isSleepIntent: boolean): string {

  // 危機語チェック// ランダム選択

  if (detectCrisis(input)) {function randomChoice<T>(arr: T[]): T {

    return CRISIS_RESPONSE;  return arr[Math.floor(Math.random() * arr.length)];

  }}



  // 眠れない意図// 応答生成エンジン

  if (isSleepIntent) {function generateResponse(input: string, isNight: boolean, isSleepIntent: boolean): string {

    const tip = randomChoice(SLEEP_TIPS);  // 危機語チェック

    return `眠れないのは辛い。でも焦るな。\n${tip}。\n\nいいから寝ろ。`;  if (detectCrisis(input)) {

  }    return CRISIS_RESPONSE;

  }

  // カテゴリ検知

  const category = detectCategory(input);  // 眠れない意図

  const templates = isNight ? NIGHT_SHORT_RESPONSES : RESPONSE_TEMPLATES[category];  if (isSleepIntent) {

  const template = randomChoice(templates);    const tip = randomChoice(SLEEP_TIPS);

    return `眠れないのは辛い。でも焦るな。\n${tip}。\n\nいいから寝ろ。`;

  // キーワード抽出（オプション: より具体的な鏡映）  }

  const keywords = extractKeywords(input);

  const mirror = keywords.length > 0 && Math.random() > 0.5   // カテゴリ検知

    ? `「${keywords[0]}」の件`   const category = detectCategory(input);

    : template.mirror;  const templates = isNight ? NIGHT_SHORT_RESPONSES : (RESPONSE_TEMPLATES[category as keyof typeof RESPONSE_TEMPLATES] || RESPONSE_TEMPLATES.default);

  const template = randomChoice(templates);

  // 応答構築

  const response = `${mirror}は${template.logic}。\n\nいいから寝ろ。`;  // キーワード抽出（オプション: より具体的な鏡映）

  const keywords = extractKeywords(input);

  return response;  const mirror = keywords.length > 0 && Math.random() > 0.5 

}    ? `「${keywords[0]}」の件` 

    : template.mirror;

// ストリーミング風に遅延出力（人間らしさ演出）

async function* streamResponse(response: string): AsyncGenerator<string> {  // 応答構築

  const chars = response.split('');  const response = `${mirror}は${template.logic}。\n\nいいから寝ろ。`;

  let buffer = '';

  return response;

  for (let i = 0; i < chars.length; i++) {}

    buffer += chars[i];

// ストリーミング風に遅延出力（人間らしさ演出）

    // 句読点で区切るasync function* streamResponse(response: string): AsyncGenerator<string> {

    if (chars[i] === '。' || chars[i] === '\n' || chars[i] === '、' || i === chars.length - 1) {  const chars = response.split('');

      yield buffer;  let buffer = '';

      buffer = '';

      await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 100));  for (let i = 0; i < chars.length; i++) {

    }    buffer += chars[i];

  }

    // 句読点で区切る

  if (buffer) {    if (chars[i] === '。' || chars[i] === '\n' || chars[i] === '、' || i === chars.length - 1) {

    yield buffer;      yield buffer;

  }      buffer = '';

}      await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 100));

    }

// ===== UIロジック =====  }



const state: AppState = {  if (buffer) {

  isGenerating: false,    yield buffer;

  lastResponse: '',  }

  dimTimer: null}- メインクライアント

};// 超軽量・フルスクラッチ生成AI（完全クライアントサイド）



// DOM要素interface AppState {

const form = document.getElementById('input-form') as HTMLFormElement;  isGenerating: boolean;

const input = document.getElementById('input-text') as HTMLTextAreaElement;  lastResponse: string;

const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;  dimTimer: number | null;

const responseArea = document.getElementById('response-area') as HTMLDivElement;}

const actions = document.getElementById('actions') as HTMLDivElement;

const shareX = document.getElementById('share-x') as HTMLButtonElement;const state: AppState = {

const shareLine = document.getElementById('share-line') as HTMLButtonElement;  isGenerating: false,

const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;  lastResponse: '',

const nightBadge = document.getElementById('night-badge') as HTMLSpanElement;  dimTimer: null

};

// 夜間モード判定（JST 23:00-05:00）

function isNightTime(): boolean {// DOM要素

  const now = new Date();const form = document.getElementById('input-form') as HTMLFormElement;

  const jst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));const input = document.getElementById('input-text') as HTMLTextAreaElement;

  const hour = jst.getHours();const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;

  return hour >= 23 || hour < 5;const responseArea = document.getElementById('response-area') as HTMLDivElement;

}const actions = document.getElementById('actions') as HTMLDivElement;

const shareX = document.getElementById('share-x') as HTMLButtonElement;

// 夜間モード適用const shareLine = document.getElementById('share-line') as HTMLButtonElement;

function applyNightMode(): void {const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;

  if (isNightTime()) {const nightBadge = document.getElementById('night-badge') as HTMLSpanElement;

    document.body.classList.add('night-mode');

    nightBadge.style.display = 'inline-block';// ===== フルスクラッチ生成AIエンジン =====

  } else {

    document.body.classList.remove('night-mode');// 主題抽出パターン

    nightBadge.style.display = 'none';const TOPIC_PATTERNS = [

  }  { pattern: /仕事|職場|会社|上司|同僚|残業|業務/, topic: '仕事' },

}  { pattern: /恋愛|好き|彼氏|彼女|片思い|告白|デート|別れ/, topic: '恋愛' },

  { pattern: /将来|進路|就活|転職|キャリア|不安|心配/, topic: '将来' },

// 自動減光タイマー  { pattern: /人間関係|友達|友人|付き合い|コミュ/, topic: '人間関係' },

function startDimTimer(): void {  { pattern: /家族|親|兄弟|姉妹|実家/, topic: '家族' },

  if (state.dimTimer) clearTimeout(state.dimTimer);  { pattern: /お金|金銭|貯金|借金|給料|収入/, topic: '金銭' },

  document.body.classList.remove('dim');  { pattern: /健康|体調|病気|痛い|具合/, topic: '健康' },

    { pattern: /勉強|試験|テスト|受験|成績/, topic: '学業' },

  state.dimTimer = window.setTimeout(() => {  { pattern: /眠れない|寝れない|不眠|寝付けない/, topic: '睡眠' }

    document.body.classList.add('dim');];

  }, 5000);

}// 論拠生成パターン（主題別）

const LOGIC_TEMPLATES = {

// 減光解除  '仕事': [

function cancelDim(): void {    '仕事の心配は夜に増幅する。明日の脳のほうが強い。',

  if (state.dimTimer) clearTimeout(state.dimTimer);    '残業の疲労は判断力を奪う。寝てから考えろ。',

  document.body.classList.remove('dim');    '職場の問題は今夜は解決しない。脳を休めるのが先だ。',

}    '上司のことは寝不足で考えるな。冷静さが死ぬ。'

  ],

// 生成実行（完全クライアントサイド）  '恋愛': [

async function generateResponseLocal(text: string): Promise<void> {    '相手の気持ちは今夜は読めない。既読も睡眠には勝てない。',

  if (state.isGenerating || !text.trim()) return;    '恋愛は寝不足で判断すると後悔する。朝まで待て。',

      '好きな人のことは明日考えろ。夜の妄想は暴走する。',

  state.isGenerating = true;    '告白のタイミングは疲れた脳で決めるな。寝ろ。'

  submitBtn.disabled = true;  ],

  responseArea.textContent = '';  '将来': [

  actions.style.display = 'none';    '将来の計画は寝不足に殺される。寝てから決めろ。',

  cancelDim();    '不安は夜に10倍になる。明日の朝に再評価しろ。',

      '進路の選択は今夜は保留だ。脳が疲れてる。',

  try {    'キャリアの悩みは朝の自分に任せろ。今は寝ろ。'

    const isNight = isNightTime();  ],

    const isSleep = detectSleepIntent(text);  '人間関係': [

        '人間関係は夜に考えると悪化する。距離を置いて寝ろ。',

    // 応答生成    '友達のことは明日考えろ。疲れた脳は被害妄想を生む。',

    const response = generateResponse(text, isNight, isSleep);    'コミュニケーションの悩みは睡眠不足が悪化させる。',

        '付き合い方は朝の頭で考えろ。今は無理だ。'

    // ストリーミング風表示  ],

    for await (const chunk of streamResponse(response)) {  '家族': [

      responseArea.textContent += chunk;    '家族の問題は一晩で解決しない。まず休め。',

      state.lastResponse = responseArea.textContent;    '親のことは明日話せ。夜の感情は偏る。',

      responseArea.scrollTop = responseArea.scrollHeight;    '実家のことは寝てから考えろ。距離感が狂う。',

    }    '家族関係は疲労で悪化する。冷静になるには寝ろ。'

      ],

    // アクション表示  '金銭': [

    if (state.lastResponse) {    'お金の計算は夜にするな。ミスが増える。',

      actions.style.display = 'flex';    '金銭の不安は朝に再計算しろ。夜は正確性が落ちる。',

      startDimTimer();    '借金の心配は明日の自分に任せろ。今は寝ろ。',

    }    '収入の悩みは睡眠を削っても解決しない。'

      ],

  } catch (error) {  '健康': [

    console.error('Generation error:', error);    '体調不良は睡眠不足が悪化させる。まず寝ろ。',

    responseArea.textContent = 'エラーが起きた。でも気にするな。いいから寝ろ。';    '病気の心配は夜に膨らむ。朝に再評価しろ。',

    state.lastResponse = responseArea.textContent;    '痛みは疲労で増幅する。休息が最優先だ。',

        '健康は寝ることから始まる。今すぐ寝ろ。'

    setTimeout(() => {  ],

      actions.style.display = 'flex';  '学業': [

    }, 500);    '勉強の効率は睡眠不足で半減する。寝てから再開しろ。',

        '試験の不安は夜に考えるな。明日やれ。',

  } finally {    '成績のことは朝の頭で考えろ。夜は無駄だ。',

    state.isGenerating = false;    '受験の心配は寝不足が悪化させる。今は寝ろ。'

    submitBtn.disabled = false;  ],

    input.value = '';  '睡眠': [

  }    '眠れないときは考えるな。目を閉じて横になれ。',

}    '不眠は焦ると悪化する。諦めて目を閉じろ。',

    '寝付けないなら一度起きろ。そして10分後に戻れ。',

// フォーム送信    '睡眠は強制できない。リラックスだけしろ。'

form.addEventListener('submit', (e) => {  ],

  e.preventDefault();  'default': [

  const text = input.value;    'その悩みは夜に考えるな。朝の脳のほうが賢い。',

      '疲れた頭で考えても答えは出ない。寝てから考えろ。',

  if (!text.trim()) {    '夜の思考は信用するな。判断力が落ちてる。',

    responseArea.textContent = '黙っててもいい。いいから寝ろ。';    '今夜は無理だ。明日の自分に任せろ。'

    state.lastResponse = responseArea.textContent;  ]

    actions.style.display = 'flex';};

    startDimTimer();

    return;// 危機語パターン

  }const CRISIS_PATTERNS = [

    /死にたい|自殺|消えたい|終わりたい/,

  generateResponseLocal(text);  /殺す|殺したい|暴力|危害/,

});  /虐待|いじめ|DV/,

  /薬.*大量|OD|過剰摂取/

// リセット];

resetBtn.addEventListener('click', () => {

  responseArea.textContent = '';// 感情抽出

  actions.style.display = 'none';const EMOTION_PATTERNS = [

  state.lastResponse = '';  { pattern: /辛い|苦しい|しんどい|きつい/, emotion: 'negative' },

  cancelDim();  { pattern: /不安|心配|怖い|恐い/, emotion: 'anxiety' },

  input.focus();  { pattern: /疲れ|だるい|眠い/, emotion: 'tired' },

});  { pattern: /嬉しい|楽しい|良かった/, emotion: 'positive' },

  { pattern: /悲しい|寂しい|虚しい/, emotion: 'sad' },

// X共有  { pattern: /腹立つ|ムカつく|イライラ/, emotion: 'angry' }

shareX.addEventListener('click', () => {];

  const url = 'https://twitter.com/intent/tweet';

  const text = encodeURIComponent(// 主題抽出

    'AIに相談したら「いいから寝ろ。」って言われた\n\n#いいから寝ろ'function extractTopic(text: string): TopicKey {

  );  for (const { pattern, topic } of TOPIC_PATTERNS) {

  const shareUrl = encodeURIComponent(window.location.href);    if (pattern.test(text)) {

  window.open(`${url}?text=${text}&url=${shareUrl}`, '_blank', 'noopener,noreferrer');      return topic as TopicKey;

});    }

  }

// LINE共有  return 'default';

shareLine.addEventListener('click', () => {}

  const text = encodeURIComponent('AIに相談したら「いいから寝ろ。」って言われた');

  const url = encodeURIComponent(window.location.href);// 感情抽出

  function extractEmotion(text: string): string {

  if (navigator.share) {  for (const { pattern, emotion } of EMOTION_PATTERNS) {

    navigator.share({    if (pattern.test(text)) {

      title: 'いいから寝ろ.com',      return emotion;

      text: 'AIに相談したら「いいから寝ろ。」って言われた',    }

      url: window.location.href  }

    }).catch(() => {});  return 'neutral';

  } else {}

    window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer');

  }// 危機語検知

});function detectCrisis(text: string): boolean {

  return CRISIS_PATTERNS.some(pattern => pattern.test(text));

// 減光解除（タップ）}

document.body.addEventListener('click', () => {

  if (document.body.classList.contains('dim')) {// 鏡映生成（主題の要約）

    cancelDim();function generateMirror(text: string, topic: string, emotion: string): string {

  }  const mirrors = [

});    `${topic}のことか。`,

    `${topic}で悩んでるのか。`,

// PWA登録    `${topic}の話だな。`,

if ('serviceWorker' in navigator) {    `${topic}が気になるのか。`

  window.addEventListener('load', () => {  ];

    navigator.serviceWorker.register('/sw.js').catch(() => {});  

  });  if (emotion === 'negative' || emotion === 'anxiety') {

}    return mirrors[Math.floor(Math.random() * mirrors.length)];

  }

// 初期化  

applyNightMode();  return mirrors[0];

setInterval(applyNightMode, 60000); // 1分ごとに再チェック}

input.focus();

// 論拠生成
function generateLogic(topic: TopicKey, isNight: boolean): string {
  const templates = LOGIC_TEMPLATES[topic];
  const selected = templates[Math.floor(Math.random() * templates.length)];
  
  // 夜間は短縮
  if (isNight && selected.length > 30) {
    const parts = selected.split('。');
    return parts[0] + '。';
  }
  
  return selected;
}

// 危機対応
function generateCrisisResponse(): string {
  return `あなたの状況は深刻かもしれない。専門家に相談してほしい。

▼ 相談窓口
https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/jisatsu/soudan_tel.html

それでも、今は休め。いいから寝ろ。`;
}

// メイン生成関数
function generateResponse(text: string, isNight: boolean): string {
  // 危機語チェック
  if (detectCrisis(text)) {
    return generateCrisisResponse();
  }
  
  // 空入力
  if (!text.trim() || text.length < 2) {
    return '黙っててもいい。いいから寝ろ。';
  }
  
  // 主題・感情抽出
  const topic = extractTopic(text);
  const emotion = extractEmotion(text);
  
  // 構造生成
  const mirror = generateMirror(text, topic, emotion);
  const logic = generateLogic(topic, isNight);
  const ending = 'いいから寝ろ。';
  
  return `${mirror}\n${logic}\n${ending}`;
}

// ストリーミング風アニメーション
async function* streamText(text: string): AsyncGenerator<string> {
  const chars = text.split('');
  let buffer = '';
  
  for (const char of chars) {
    buffer += char;
    
    // 句読点で区切り
    if (char === '。' || char === '\n' || char === '、') {
      yield buffer;
      buffer = '';
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  
  if (buffer) {
    yield buffer;
  }
}

// 夜間モード判定（JST 23:00-05:00）
function isNightTime(): boolean {
  const now = new Date();
  const jst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  const hour = jst.getHours();
  return hour >= 23 || hour < 5;
}

// 夜間モード適用
function applyNightMode(): void {
  if (isNightTime()) {
    document.body.classList.add('night-mode');
    nightBadge.style.display = 'inline-block';
  } else {
    document.body.classList.remove('night-mode');
    nightBadge.style.display = 'none';
  }
}

// 自動減光タイマー
function startDimTimer(): void {
  if (state.dimTimer) clearTimeout(state.dimTimer);
  document.body.classList.remove('dim');
  
  state.dimTimer = window.setTimeout(() => {
    document.body.classList.add('dim');
  }, 5000);
}

// 減光解除
function cancelDim(): void {
  if (state.dimTimer) clearTimeout(state.dimTimer);
  document.body.classList.remove('dim');
}

// 生成実行（完全クライアントサイド）
async function executeGeneration(text: string): Promise<void> {
  if (state.isGenerating || !text.trim()) return;
  
  state.isGenerating = true;
  submitBtn.disabled = true;
  responseArea.textContent = '';
  actions.style.display = 'none';
  cancelDim();
  
  try {
    // 夜間判定
    const isNight = isNightTime();
    
    // AI生成
    const fullResponse = generateResponse(text, isNight);
    
    // ストリーミング風表示
    for await (const chunk of streamText(fullResponse)) {
      responseArea.textContent += chunk;
      state.lastResponse = responseArea.textContent;
      responseArea.scrollTop = responseArea.scrollHeight;
    }
    
    // アクション表示
    if (state.lastResponse) {
      actions.style.display = 'flex';
      startDimTimer();
    }
    
  } catch (error) {
    console.error('Generation error:', error);
    responseArea.textContent = 'エラーが出た。いいから寝ろ。';
    state.lastResponse = responseArea.textContent;
    
    setTimeout(() => {
      actions.style.display = 'flex';
    }, 500);
    
  } finally {
    state.isGenerating = false;
    submitBtn.disabled = false;
    input.value = '';
  }
}

// フォーム送信
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  
  if (!text.trim()) {
    responseArea.textContent = '黙っててもいい。いいから寝ろ。';
    state.lastResponse = responseArea.textContent;
    actions.style.display = 'flex';
    startDimTimer();
    return;
  }
  
  executeGeneration(text);
});

// リセット
resetBtn.addEventListener('click', () => {
  responseArea.textContent = '';
  actions.style.display = 'none';
  state.lastResponse = '';
  cancelDim();
  input.focus();
});

// X共有
shareX.addEventListener('click', () => {
  const url = 'https://twitter.com/intent/tweet';
  const text = encodeURIComponent(
    'AIに相談したら「いいから寝ろ。」って言われた\n\n#いいから寝ろ'
  );
  const shareUrl = encodeURIComponent(window.location.href);
  window.open(`${url}?text=${text}&url=${shareUrl}`, '_blank', 'noopener,noreferrer');
});

// LINE共有
shareLine.addEventListener('click', () => {
  const text = encodeURIComponent('AIに相談したら「いいから寝ろ。」って言われた');
  const url = encodeURIComponent(window.location.href);
  
  if (navigator.share) {
    navigator.share({
      title: 'いいから寝ろ.com',
      text: 'AIに相談したら「いいから寝ろ。」って言われた',
      url: window.location.href
    }).catch(() => {});
  } else {
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer');
  }
});

// 減光解除（タップ）
document.body.addEventListener('click', () => {
  if (document.body.classList.contains('dim')) {
    cancelDim();
  }
});

// PWA登録
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// 初期化
applyNightMode();
setInterval(applyNightMode, 60000); // 1分ごとに再チェック
input.focus();
