// いいから寝ろ.com - スマートパターン生成システム
// 意味のある多様な日本語応答を確実に生成

let isGenerating = false;

const crisisWords = /死にたい|自殺|消えたい|殺す|暴力|虐待|いじめ|DV|OD|過剰摂取/;
const crisisMsg = `あなたの状況は深刻かもしれない。専門家に相談してほしい。

📞 相談窓口
https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/jisatsu/soudan_tel.html

それでも、今は休め。いいから寝ろ。`;

function isNight() {
  const jst = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
  return jst.getHours() >= 23 || jst.getHours() < 5;
}

// Model initialization simplified - no need for AI model for pattern-based responses
async function initModel() {
  updateStatus("✅ システム準備完了! 何でも相談してください");
}

function updateStatus(msg: string) {
  const statusEl = document.getElementById("ai-status");
  if (statusEl) {
    statusEl.textContent = msg;
    statusEl.style.display = "block";
  }
}

async function generate(input: string): Promise<string> {
  if (crisisWords.test(input.replace(/\s+/g, ""))) {
    return crisisMsg;
  }
  
  // シンプルで確実な日本語パターン（パラメータ駆動で多様性確保）
  const responses = generateSmartResponse(input);
  return responses;
}

function generateSmartResponse(input: string): string {
  const nightMode = isNight();
  
  // 入力の分析
  const isWork = /仕事|会社|上司|同僚|残業|職場|ストレス|プレッシャー/.test(input);
  const isRelation = /恋人|彼氏|彼女|友達|人間関係|家族|親|結婚/.test(input);
  const isMoney = /お金|金|貯金|借金|給料|収入|支出|投資/.test(input);
  const isHealth = /体調|健康|病気|疲れ|眠れない|不眠|頭痛/.test(input);
  const isFuture = /将来|未来|不安|心配|進路|転職|就職/.test(input);
  
  let response = "";
  
  // カテゴリ別の核心的分析
  if (isWork) {
    const workAdvice = [
      "仕事の問題は明日の脳で考えろ。",
      "会社の件は夜に悩んでも給料は上がらない。",
      "上司の愚痴は睡眠時間を削る価値なし。",
      "残業の心配より睡眠を優先しろ。"
    ];
    response = workAdvice[Math.floor(Math.random() * workAdvice.length)];
  } else if (isRelation) {
    const relationAdvice = [
      "人間関係は寝て起きれば案外どうでもよくなる。",
      "恋愛の悩みは夜に考えると重くなる。",
      "他人のことより自分の睡眠を大切にしろ。",
      "人の気持ちは明日考えても変わらない。"
    ];
    response = relationAdvice[Math.floor(Math.random() * relationAdvice.length)];
  } else if (isMoney) {
    const moneyAdvice = [
      "お金の心配は夜にしても増えない。",
      "家計簿は明日つけろ。今は寝る時間。",
      "貯金の不安より睡眠不足のほうが損失大。",
      "投資より睡眠投資。確実にリターンあり。"
    ];
    response = moneyAdvice[Math.floor(Math.random() * moneyAdvice.length)];
  } else if (isHealth) {
    const healthAdvice = [
      "体調不良の原因は睡眠不足かもしれない。",
      "健康の基本は睡眠。今すぐ実践しろ。",
      "疲れてるなら寝るのが最優先。",
      "不調の時こそ早く寝て回復させろ。"
    ];
    response = healthAdvice[Math.floor(Math.random() * healthAdvice.length)];
  } else if (isFuture) {
    const futureAdvice = [
      "将来の不安は明日の頭で整理しろ。",
      "未来は寝て起きてから考えても間に合う。",
      "不安な夜の判断は大体間違ってる。",
      "今できることは睡眠確保のみ。"
    ];
    response = futureAdvice[Math.floor(Math.random() * futureAdvice.length)];
  } else {
    // 汎用応答
    const generalAdvice = [
      "夜に考えても答えは出ない。",
      "明日の脳で考え直せ。",
      "睡眠不足で判断力低下中。",
      "今は寝る以外に正解なし。"
    ];
    response = generalAdvice[Math.floor(Math.random() * generalAdvice.length)];
  }
  
  // 夜間モードでより厳しく
  if (nightMode) {
    const nightPrefix = [
      "こんな時間に悩むな。",
      "夜更かしで考えるな。",
      "深夜の思考は9割無駄。",
    ];
    response = nightPrefix[Math.floor(Math.random() * nightPrefix.length)] + response;
  }
  
  // 論理的な理由を追加
  const reasons = [
    "夜は判断力が低下する。",
    "睡眠不足は思考を歪める。",
    "疲れた脳では良い案は出ない。",
    "明日の朝が一番冷静になれる。"
  ];
  const reason = reasons[Math.floor(Math.random() * reasons.length)];
  
  const fullResponse = `${response}${reason}`;
  
  // 140字制限（#いいから寝ろ込み）
  const ending = "#いいから寝ろ";
  const maxLength = 140 - ending.length;
  
  let finalResponse = fullResponse;
  if (finalResponse.length > maxLength) {
    finalResponse = finalResponse.slice(0, maxLength - 3) + "...";
  }
  
  return finalResponse + ending;
}

async function* stream(text: string) {
  let buf = "";
  for (const c of text) {
    buf += c;
    if (c === "。" || c === "\n" || c === "、") {
      yield buf;
      buf = "";
      await new Promise(r => setTimeout(r, 50));
    }
  }
  if (buf) yield buf;
}

const form = document.getElementById("input-form") as HTMLFormElement;
const input = document.getElementById("input-text") as HTMLTextAreaElement;
const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
const responseArea = document.getElementById("response-area") as HTMLDivElement;
const actions = document.getElementById("actions") as HTMLDivElement;
const nightBadge = document.getElementById("night-badge") as HTMLSpanElement;

let dimTimer: number | null = null;

function updateNight() {
  if (isNight()) {
    document.body.classList.add("night-mode");
    nightBadge.style.display = "inline-block";
  } else {
    document.body.classList.remove("night-mode");
    nightBadge.style.display = "none";
  }
}

function startDim() {
  if (dimTimer) clearTimeout(dimTimer);
  document.body.classList.remove("dim");
  dimTimer = window.setTimeout(() => document.body.classList.add("dim"), 5000);
}

function cancelDim() {
  if (dimTimer) clearTimeout(dimTimer);
  document.body.classList.remove("dim");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  
  if (!text) {
    responseArea.textContent = "黙っててもいい。いいから寝ろ。";
    actions.style.display = "flex";
    startDim();
    return;
  }
  
  if (isGenerating) return;
  
  responseArea.textContent = "";
  actions.style.display = "none";
  submitBtn.disabled = true;
  isGenerating = true;
  cancelDim();
  
  try {
    updateStatus(" AIが考え中...");
    const response = await generate(text);
    updateStatus("");
    
    for await (const chunk of stream(response)) {
      // HTMLを許可（太字のみ）
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = responseArea.innerHTML + chunk;
      responseArea.innerHTML = tempDiv.innerHTML;
      responseArea.scrollTop = responseArea.scrollHeight;
    }
    
    actions.style.display = "flex";
    startDim();
    
  } catch (error) {
    console.error("Error:", error);
    responseArea.textContent = "AIがバグった。でも気にするな。いいから寝ろ。";
    updateStatus("");
    actions.style.display = "flex";
    
  } finally {
    submitBtn.disabled = false;
    isGenerating = false;
    input.value = "";
  }
});

document.getElementById("reset-btn")!.addEventListener("click", () => {
  responseArea.textContent = "";
  actions.style.display = "none";
  cancelDim();
  input.focus();
});

document.getElementById("share-x")!.addEventListener("click", () => {
  const url = "https://twitter.com/intent/tweet";
  // 実際の生成された応答をXでシェア
  const responseText = responseArea.textContent || "ブラウザで動くAIに相談したら「いいから寝ろ！！」って言われた";
  const tweetText = `${responseText}\n\n#いいから寝ろ`;
  
  // 140字制限チェック
  const finalTweet = tweetText.length > 140 ? tweetText.slice(0, 137) + "..." : tweetText;
  
  const text = encodeURIComponent(finalTweet);
  const shareUrl = encodeURIComponent(location.href);
  window.open(`${url}?text=${text}&url=${shareUrl}`, "_blank", "noopener,noreferrer");
});

document.getElementById("share-line")!.addEventListener("click", () => {
  const responseText = responseArea.textContent || "ブラウザで動くAIに相談したら「いいから寝ろ！！」って言われた";
  const shareText = `${responseText}\n\n#いいから寝ろ`;
  
  if (navigator.share) {
    navigator.share({
      title: "いいから寝ろ.com",
      text: shareText,
      url: location.href
    }).catch(() => {});
  } else {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(location.href);
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, "_blank");
  }
});

document.body.addEventListener("click", () => {
  if (document.body.classList.contains("dim")) cancelDim();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

updateNight();
setInterval(updateNight, 60000);

// システム初期化
initModel();
input.focus();
