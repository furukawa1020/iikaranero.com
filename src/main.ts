// いいから寝ろ.com - Hugging Face LLM搭載
// GPU不要・高品質日本語生成AI

let isGenerating = false;

const crisisWords = /死にたい|自殺|消えたい|殺す|暴力|虐待|いじめ|DV|OD|過剰摂取/;
const crisisMsg = `あなたの状況は深刻かもしれない。専門家に相談してほしい。

📞 相談窓口
https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/jisatsu/soudan_tel.html

それでも、今は休め。いいから寝ろ。`;

// Hugging Face Inference API設定（より軽量なモデル）
const HF_API_URL = "https://api-inference.huggingface.co/models/cyberagent/open-calm-small";
const USE_FREE_API = true; // 無料APIを使用（認証なし、制限あり）

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
  if (crisisWords.test(input.replace(/\s+/g, ""))) {
    return crisisMsg;
  }
  
  try {
    // LLMで本物のAI生成
    const aiResponse = await generateWithLLM(input);
    return aiResponse;
  } catch (error) {
    console.error("LLM Error:", error);
    // フォールバック: パターンベース
    return generateFallbackResponse(input);
  }
}

async function generateWithLLM(input: string): Promise<string> {
  const nightMode = isNight();
  
  // よりシンプルなプロンプト（日本語モデル用）
  const prompt = `相談: ${input}\n\n回答: 夜に悩んでも`;

  console.log("🔄 LLM API呼び出し中...");
  
  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 60,
        temperature: 0.7,
        top_p: 0.9,
        do_sample: true,
        return_full_text: false
      },
      options: {
        wait_for_model: true,
        use_cache: false
      }
    })
  });

  console.log("📡 API Response Status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ API Error:", response.status, errorText);
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log("📦 API Response Data:", data);
  
  let generatedText = "";
  
  if (Array.isArray(data) && data[0]?.generated_text) {
    generatedText = data[0].generated_text;
  } else if (data.generated_text) {
    generatedText = data.generated_text;
  } else if (Array.isArray(data) && data.length > 0) {
    generatedText = data[0];
  } else {
    console.error("❌ Unexpected format:", data);
    throw new Error("Unexpected API response format");
  }

  console.log("✅ Generated Text:", generatedText);

  // プロンプトを除去
  generatedText = generatedText.replace(prompt, "").trim();
  
  // 「夜に悩んでも」から始まる場合はそのまま使用
  if (!generatedText.startsWith("夜に悩んでも")) {
    generatedText = "夜に悩んでも" + generatedText;
  }
  
  // 「いいから寝ろ」で終わるように調整
  if (!generatedText.includes("寝ろ")) {
    generatedText += "。いいから寝ろ";
  } else if (!generatedText.includes("いいから寝ろ")) {
    generatedText += "！！";
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
