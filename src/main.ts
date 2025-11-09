// いいから寝ろ.com - Hugging Face LLM搭載
// GPU不要・高品質日本語生成AI

let isGenerating = false;

// バズ対策: 動的タイトル変更でタブから目立つ
let titleIndex = 0;
const dynamicTitles = [
  "🌙 寝れない？ → いいから寝ろ.com",
  "😰 不安？ → いいから寝ろ.com",
  "😫 ストレス？ → いいから寝ろ.com",
  "🌃 夜の悩み → いいから寝ろ.com",
  "💤 いいから寝ろ.com",
  "⚠️ 深夜2時 → 寝ろ！",
  "🔴 まだ起きてる？ → 寝ろ！"
];

function rotateDynamicTitle() {
  if (document.hidden) {
    // タブが非アクティブの時だけ変更
    document.title = dynamicTitles[titleIndex];
    titleIndex = (titleIndex + 1) % dynamicTitles.length;
  } else {
    document.title = "寝れない・不安・夜の悩み相談 | いいから寝ろ.com";
  }
}

// 3秒ごとにタイトル変更
setInterval(rotateDynamicTitle, 3000);

// タブの表示/非表示イベント
document.addEventListener("visibilitychange", rotateDynamicTitle);

// 危機的ワード検出 - より広範囲にカバー
const crisisWords = /死にたい|自殺|自死|自害|自傷|リストカット|消えたい|いなくなりたい|生きていたくない|死ぬ|殺す|殺したい|暴力|虐待|いじめ|DV|家庭内暴力|OD|過剰摂取|薬|大量|飛び降り|首|練炭|睡眠薬|遺書|さよなら|ありがとう.*さよなら/i;

const crisisMsg = `<div style="background: #ff4444; color: #fff; padding: 1.5rem; border-radius: 12px; line-height: 1.8; margin: 1rem 0;">
<strong style="font-size: 1.2rem; display: block; margin-bottom: 1rem;">⚠️ 今すぐ専門家に相談してください</strong>

<p style="margin-bottom: 1rem;">あなたの状況は深刻です。このサイトは医療サービスではありません。<br>
<strong>必ず</strong>以下の専門機関に連絡してください。</p>

<div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>📞 24時間対応の相談窓口:</strong><br><br>

<strong>こころの健康相談統一ダイヤル</strong><br>
<a href="tel:0570-064-556" style="color: #fff; font-size: 1.3rem; text-decoration: underline;">📞 0570-064-556</a><br>
<span style="font-size: 0.9rem;">（各都道府県の相談窓口につながります）</span><br><br>

<strong>よりそいホットライン</strong><br>
<a href="tel:0120-279-338" style="color: #fff; font-size: 1.3rem; text-decoration: underline;">📞 0120-279-338</a><br>
<span style="font-size: 0.9rem;">（24時間無料・通話料無料）</span><br><br>

<strong>いのちの電話</strong><br>
<a href="tel:0570-783-556" style="color: #fff; font-size: 1.3rem; text-decoration: underline;">📞 0570-783-556</a><br>
<span style="font-size: 0.9rem;">（10:00-22:00 無料）</span>
</div>

<p style="margin-top: 1rem; font-size: 0.95rem;">
詳しい相談窓口一覧:<br>
<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/jisatsu/soudan_tel.html" target="_blank" style="color: #fff; text-decoration: underline;">厚生労働省 相談窓口案内</a>
</p>

<p style="margin-top: 1.5rem; font-weight: bold; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 1rem;">
それでも、今は少し休んでください。<br>
深夜の思考は歪みます。まず寝て、明日、専門家に相談してください。
</p>
</div>`;

// Hugging Face Inference API設定（より確実なエンドポイント）
// 標準のInference APIを使用（chat completionsではなくtext-generation）
const HF_MODEL = "microsoft/Phi-3-mini-4k-instruct";
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
const HF_TOKEN = (import.meta as any).env?.VITE_HF_TOKEN || ""; // .envファイルから読み込み

// デバッグ: トークンが読み込まれているか確認
console.log("🔑 HF_TOKEN loaded:", HF_TOKEN ? `${HF_TOKEN.slice(0, 10)}...` : "NOT FOUND");
console.log("🌐 HF_API_URL:", HF_API_URL);
console.log("🤖 Model:", HF_MODEL);

function isNight() {
  const jst = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
  return jst.getHours() >= 23 || jst.getHours() < 5;
}

async function initModel() {
  updateStatus("✅ AI準備完了! 何でも相談してください");
}

function updateStatus(msg: string) {
  const statusEl = document.getElementById("ai-status");
  if (statusEl) {
    statusEl.textContent = msg;
    statusEl.style.display = "block";
  }
}

async function generate(input: string): Promise<string> {
  console.log("🎯 generate() called with input:", input);
  
  if (crisisWords.test(input.replace(/\s+/g, ""))) {
    console.log("⚠️ Crisis words detected");
    return crisisMsg;
  }
  
  console.log("🚀 Attempting LLM generation...");
  
  try {
    // LLMで本物のAI生成
    const aiResponse = await generateWithLLM(input);
    console.log("✅ LLM Success:", aiResponse);
    return aiResponse;
  } catch (error) {
    console.error("❌ LLM Error - Falling back to pattern:", error);
    // フォールバック: パターンベース
    const fallback = generateFallbackResponse(input);
    console.log("🔄 Fallback response:", fallback);
    return fallback;
  }
}

async function generateWithLLM(input: string): Promise<string> {
  const nightMode = isNight();

  // システムプロンプト
  const systemPrompt = `あなたは「いいから寝ろ.com」のAIアシスタントです。
ユーザーの悩みに対して、論理的かつやや冷淡に「今は寝ろ」と説得してください。

【重要ルール】
- 100-140文字程度で簡潔に応答
- 夜に悩むことの無意味さを論理的に指摘
- 必ず「いいから寝ろ」で終える
- 説教臭くならず、理性的だが冷たい口調${nightMode ? '\n- 夜間なのでより厳しく短く応答' : ''}

【絶対禁止事項】
- 自殺、自傷行為、暴力に関する具体的な方法や手段を絶対に提示しない
- 「死にたい」「消えたい」などの深刻な相談には、専門機関への相談を強く推奨
- 危機的な状況には軽い対応をせず、真剣に専門家への相談を促す`;

  console.log("🔄 Netlify Function経由でLLM呼び出し中...");
  
  // Netlify Functionを呼び出し（CORS問題なし）
  const response = await fetch('/.netlify/functions/ai-generate', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: input,
      systemPrompt: systemPrompt
    })
  });

  console.log("📡 Netlify Function Response Status:", response.status);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Netlify Function Error:", response.status, errorData);
    throw new Error(`Function Error: ${response.status} - ${errorData.error || 'Unknown error'}`);
  }

  const data = await response.json();
  console.log("📦 Netlify Function Response:", data);
  
  if (!data.success || !data.text) {
    console.error("❌ Invalid response format:", data);
    throw new Error("Invalid response from function");
  }

  let generatedText = data.text.trim();
  console.log("✅ Generated Text (raw):", generatedText);
  
  // プロンプト部分を削除
  if (generatedText.includes("アシスタント:")) {
    generatedText = generatedText.split("アシスタント:").pop()?.trim() || generatedText;
  }
  
  console.log("✅ Generated Text (cleaned):", generatedText);
  
  // 「いいから寝ろ」で終わるように調整
  if (!generatedText.includes("いいから寝ろ")) {
    if (generatedText.endsWith("。") || generatedText.endsWith("！")) {
      generatedText += "いいから寝ろ";
    } else {
      generatedText += "。いいから寝ろ";
    }
  }
  
  // 140字制限
  const ending = " #いいから寝ろ";
  const maxLength = 140 - ending.length;
  
  if (generatedText.length > maxLength) {
    generatedText = generatedText.slice(0, maxLength - 3) + "...";
  }
  
  // ハッシュタグ追加
  if (!generatedText.includes("#いいから寝ろ")) {
    generatedText += ending;
  }
  
  return generatedText;
}

// フォールバック用のパターンベース応答
function generateFallbackResponse(input: string): string {
  const nightMode = isNight();
  const isWork = /仕事|会社|上司|同僚|残業|職場|ストレス|プレッシャー/.test(input);
  const isRelation = /恋人|彼氏|彼女|友達|人間関係|家族|親|結婚/.test(input);
  
  let response = "";
  
  if (isWork) {
    response = "会社の件は夜に悩んでも給料は上がらない。";
  } else if (isRelation) {
    response = "人間関係は寝て起きれば案外どうでもよくなる。";
  } else {
    response = "夜に考えても答えは出ない。";
  }
  
  if (nightMode) {
    response = "こんな時間に悩むな。" + response;
  }
  
  return response + "明日の朝が一番冷静になれる。いいから寝ろ#いいから寝ろ";
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
    updateStatus("🧠 LLMが考え中...");
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
    responseArea.textContent = "AIがバグった。でも気にするな。いいから寝ろ#いいから寝ろ";
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

// Service Worker & プッシュ通知
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("✅ Service Worker registered");
      
      // 通知権限をリクエスト（23時以降のみ自動表示）
      if (isNight() && Notification.permission === "default") {
        setTimeout(() => {
          requestNotificationPermission(registration);
        }, 3000); // 3秒後に表示
      }
      
      // 23時以降の定期通知をスケジュール
      scheduleNightlyNotifications(registration);
      
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });
}

// 通知許可リクエスト
async function requestNotificationPermission(registration: ServiceWorkerRegistration) {
  if (!("Notification" in window)) return;
  
  const permission = await Notification.requestPermission();
  
  if (permission === "granted") {
    console.log("✅ Notification permission granted");
    // 即座にウェルカム通知
    registration.showNotification("いいから寝ろ", {
      body: "こんな時間まで起きてるな。通知で定期的に寝ろって言ってやる。",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: "welcome"
    });
  }
}

// 23時以降の定期通知スケジュール
function scheduleNightlyNotifications(registration: ServiceWorkerRegistration) {
  if (Notification.permission !== "granted") return;
  
  // 1時間ごとにチェック
  setInterval(() => {
    const jst = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
    const hour = jst.getHours();
    const minute = jst.getMinutes();
    
    // 23時、0時、1時、2時、3時、4時に通知
    if (minute === 0 && (hour === 23 || hour === 0 || hour === 1 || hour === 2 || hour === 3 || hour === 4)) {
      const messages = [
        "まだ起きてるのか? いいから寝ろ。",
        "夜更かしは明日のパフォーマンスを下げるだけ。寝ろ。",
        "この時間に考え事しても答えは出ない。いいから寝ろ。",
        "脳が疲れてる。今すぐ寝ろ。",
        "寝ないと判断力が鈍る。いいから寝ろ。"
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      registration.showNotification("🌙 いいから寝ろ", {
        body: randomMessage,
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        vibrate: [200, 100, 200],
        tag: "sleep-reminder",
        requireInteraction: true,
        actions: [
          { action: "sleep", title: "寝る" },
          { action: "ignore", title: "後で" }
        ]
      });
    }
  }, 60000); // 1分ごとにチェック
}

updateNight();
setInterval(updateNight, 60000);

// システム初期化
initModel();
input.focus();
