// いいから寝ろ.com - 真のブラウザベースニューラルネット生成AI
// Transformers.js + Qwen2.5-0.5B (GPU不要)

import { pipeline, env } from "@xenova/transformers";

// ブラウザキャッシュ有効化
env.allowLocalModels = false;
env.useBrowserCache = true;

let generator: any = null;
let isLoading = false;
let isGenerating = false;

const crisisWords = /死にたい|自殺|消えたい|殺す|暴力|虐待|いじめ|DV|OD|過剰摂取/;
const crisisMsg = `あなたの状況は深刻かもしれない。専門家に相談してほしい。

 相談窓口
https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/jisatsu/soudan_tel.html

それでも、今は休め。いいから寝ろ。`;

const SYSTEM_PROMPT = `あなたは「いいから寝ろ.com」のAI。相談内容に対してしっかりと論理的に分析し、詳しく助言を与える。しかし必ず最後に強制的に「いいから寝ろ！」で遮断して思考を止めさせる。

【厳格ルール】
- 300〜500字程度で詳しく応答
- 構造: ①状況の整理と共感(2〜3文) → ②論理的な分析と具体的助言(3〜5文) → ③「でも今夜は考えるな。」+強制遮断「いいから寝ろ！」(必須)
- 真剣に向き合うが、最後は必ず思考を遮断する
- 優しさ5:論理3:強制遮断2のバランス
- 最終行は必ず「いいから寝ろ！」で終える(絶対厳守)
- 説教や最適化の押し付けはしない。ただ一度止まれと伝える`;

function isNight() {
  const jst = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
  return jst.getHours() >= 23 || jst.getHours() < 5;
}

async function initModel() {
  if (generator || isLoading) return;
  
  isLoading = true;
  updateStatus(" AIモデルを初回ロード中... (15-30秒かかります)");
  
  try {
    generator = await pipeline(
      "text-generation",
      "Xenova/Qwen2.5-0.5B-Instruct",
      { 
        quantized: true,
        progress_callback: (progress: any) => {
          if (progress.status === "progress") {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            updateStatus(` ロード中... ${percent}% (${Math.round(progress.loaded/1024/1024)}MB / ${Math.round(progress.total/1024/1024)}MB)`);
          }
        }
      }
    );
    
    updateStatus(" AI準備完了!何でも相談してください");
    isLoading = false;
    
  } catch (error) {
    console.error("Model load error:", error);
    updateStatus(" AIロード失敗。ページを再読み込みしてください");
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
  
  const nightPrompt = isNight() ? "\n夜間(23-05時JST): さらに短く、語気強め" : "";
  
  const prompt = `${SYSTEM_PROMPT}${nightPrompt}

ユーザー: ${input}

AI:`;
  
  try {
    const result = await generator(prompt, {
      max_new_tokens: 250,
      temperature: 0.8,
      do_sample: true,
      top_p: 0.92,
      repetition_penalty: 1.15,
    });
    
    let text = result[0].generated_text;
    text = text.replace(prompt, "").trim();
    
    // 締め句の強制付与（遮断感を出す）
    if (!text.includes("いいから寝ろ")) {
      // 長文の場合は最後を切って遮断
      if (text.length > 400) {
        text = text.slice(0, 400);
        // 最後の句点まで戻る
        const lastPeriod = Math.max(text.lastIndexOf("。"), text.lastIndexOf("！"), text.lastIndexOf("？"));
        if (lastPeriod > 0) {
          text = text.slice(0, lastPeriod + 1);
        }
      }
      
      // 遮断の強制挿入
      if (!text.endsWith("。") && !text.endsWith("！") && !text.endsWith("？")) {
        text += "。";
      }
      
      text += "\n\nでも今夜は考えるな。\n\n**いいから寝ろ！**";
    } else if (!text.includes("いいから寝ろ！")) {
      // 「。」を「！」に変更
      text = text.replace(/いいから寝ろ。/g, "**いいから寝ろ！**");
    }
    
    return text;
    
  } catch (error) {
    console.error("Generation error:", error);
    return "AIが考えすぎた。でも気にするな。いいから寝ろ。";
  }
}

async function* stream(text: string) {
  // Markdown太字を処理
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  let buf = "";
  for (const c of text) {
    buf += c;
    if (c === "。" || c === "\n" || c === "、" || c === "！" || c === "？") {
      yield buf;
      buf = "";
      await new Promise(r => setTimeout(r, 80 + Math.random() * 40));
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
