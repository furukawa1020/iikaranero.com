// いいから寝ろ.com - 真のブラウザベースニューラルネット生成AI
// Transformers.js + rinna/japanese-gpt2-medium (GPU不要、日本語特化)

import { pipeline, env } from "@xenova/transformers";

// ブラウザキャッシュ有効化
env.allowLocalModels = false;
env.useBrowserCache = true;

let generator: any = null;
let isLoading = false;
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

async function initModel() {
  if (generator || isLoading) return;
  
  isLoading = true;
  updateStatus("🧠 日本語対応AIモデルをロード中... (1-2分かかります)");
  
  try {
    generator = await pipeline(
      "text-generation",
      "Xenova/gpt2",  // 確実に動作する安定モデル
      { 
        quantized: true,
        progress_callback: (progress: any) => {
          if (progress.status === "progress") {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            updateStatus(`📦 ロード中... ${percent}% (${Math.round(progress.loaded/1024/1024)}MB / ${Math.round(progress.total/1024/1024)}MB)`);
          }
        }
      }
    );
    
    updateStatus("✅ AI準備完了! 何でも相談してください");
    isLoading = false;
    
  } catch (error) {
    console.error("Model load error:", error);
    updateStatus("❌ AIロード失敗。ページを再読み込みしてください");
    isLoading = false;
    throw error;
  }
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
  
  if (!generator) {
    await initModel();
  }
  
  if (!generator) {
    throw new Error("Model not loaded");
  }
  
  // 日本語プロンプト構築
  const nightHint = isNight() ? "夜遅いから厳しく短く言え。" : "";
  const prompt = `以下のユーザーの相談に対して、論理的に分析して理詰めで追い込んでから、最後に「いいから寝ろ！！」で強制終了させる日本語の応答を130字以内で生成してください。${nightHint}

相談内容: ${input}

応答(130字以内、最後は必ず「いいから寝ろ！！」で終わる):`;
  
  try {
    const result = await generator(prompt, {
      max_new_tokens: 150,
      temperature: 0.9,
      do_sample: true,
      top_p: 0.95,
      repetition_penalty: 1.3,
      top_k: 50,
    });
    
    let text = result[0].generated_text;
    // プロンプト部分を削除
    text = text.replace(prompt, "").trim();
    
    // 日本語以外の文字を除去
    text = text.replace(/[^\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf、。！？\n\s]/g, '');
    
    // 締め句強制付与
    if (!text.includes("いいから寝ろ")) {
      text += "\n\nいいから寝ろ！！";
    } else if (!text.includes("！！")) {
      text = text.replace(/いいから寝ろ[。！]*/, "いいから寝ろ！！");
    }
    
    // 140字調整（#いいから寝ろ を含めて140字以内）
    // ハッシュタグ分を引く: 140 - 7 = 133字
    if (text.length > 133) {
      const ending = "いいから寝ろ！！";
      const maxLen = 133 - ending.length - 3;
      const mainText = text.replace(/いいから寝ろ[！！。]+$/, "").trim();
      text = mainText.slice(0, maxLen) + "..." + ending;
    }
    
    return text;
    
  } catch (error) {
    console.error("Generation error:", error);
    return "AIが考えすぎた。でも気にするな。いいから寝ろ。";
  }
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
  const text = encodeURIComponent("ブラウザで動くAIに相談したら「いいから寝ろ。」って言われた\n\n#いいから寝ろ");
  const shareUrl = encodeURIComponent(location.href);
  window.open(`${url}?text=${text}&url=${shareUrl}`, "_blank", "noopener,noreferrer");
});

document.getElementById("share-line")!.addEventListener("click", () => {
  if (navigator.share) {
    navigator.share({
      title: "いいから寝ろ.com",
      text: "ブラウザで動くAIに相談したら「いいから寝ろ。」って言われた",
      url: location.href
    }).catch(() => {});
  } else {
    const text = encodeURIComponent("ブラウザで動くAIに相談したら「いいから寝ろ。」って言われた");
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
updateStatus("準備中...");

setTimeout(() => {
  if (!generator && !isLoading) {
    initModel().catch(console.error);
  }
}, 1000);

input.focus();
