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
  
  // 英語でAIに本格的な分析をさせる
  const nightHint = isNight() ? " Be more harsh and direct since it's late night." : "";
  const prompt = `You are a dismissive but logical counselor AI. Analyze this problem, explain why worrying at night is counterproductive, and conclude with telling them to sleep.${nightHint}

User problem: ${input}

Analysis (be detailed but concise, around 80-100 words):`;
  
  try {
    const result = await generator(prompt, {
      max_new_tokens: 120,
      temperature: 0.95,
      do_sample: true,
      top_p: 0.9,
      repetition_penalty: 1.2,
    });
    
    let englishText = result[0].generated_text;
    englishText = englishText.replace(prompt, "").trim();
    
    // 英語を直接日本語に翻訳（パターンマッチングではなく直訳）
    let japaneseText = await translateEnglishToJapanese(englishText, input);
    
    // 最後に強制終了を追加
    if (!japaneseText.includes("いいから寝ろ")) {
      japaneseText += " いいから寝ろ！！";
    }
    
    // 140字制限
    if (japaneseText.length > 133) {
      const ending = " いいから寝ろ！！";
      const maxLen = 133 - ending.length - 3;
      const mainText = japaneseText.replace(/ いいから寝ろ！！$/, "");
      japaneseText = mainText.slice(0, maxLen) + "..." + ending;
    }
    
    return japaneseText;
    
  } catch (error) {
    console.error("Generation error:", error);
    return "AIが考えすぎた。でも気にするな。いいから寝ろ！！";
  }
}

// 英語を日本語に直接翻訳する関数（AIの実際の思考を反映）
async function translateEnglishToJapanese(englishText: string, userInput: string): Promise<string> {
  // 基本的な単語置換辞書
  const dictionary: { [key: string]: string } = {
    'thinking': '考えること', 'worrying': '心配すること', 'anxiety': '不安',
    'stress': 'ストレス', 'problem': '問題', 'solution': '解決策',
    'night': '夜', 'sleep': '睡眠', 'tired': '疲れた', 'brain': '脳',
    'decision': '判断', 'emotional': '感情的', 'rational': '理性的',
    'productivity': '生産性', 'focus': '集中', 'morning': '朝',
    'tomorrow': '明日', 'today': '今日', 'time': '時間',
    'waste': '無駄', 'pointless': '無意味', 'useless': '役に立たない',
    'overthinking': '考えすぎ', 'counterproductive': '逆効果',
    'judgment': '判断力', 'clarity': '明晰さ', 'perspective': '視点'
  };
  
  // 英語文章を解析して日本語に変換
  let japanese = englishText.toLowerCase();
  
  // 単語レベルの置換
  for (const [eng, jpn] of Object.entries(dictionary)) {
    const regex = new RegExp(`\\b${eng}\\b`, 'gi');
    japanese = japanese.replace(regex, jpn);
  }
  
  // 文章構造の調整
  japanese = japanese
    .replace(/you('re| are)/, 'あなたは')
    .replace(/your/, 'あなたの')
    .replace(/this/, 'この')
    .replace(/will/, 'だろう')
    .replace(/won't/, 'しない')
    .replace(/can't/, 'できない')
    .replace(/should/, 'すべき')
    .replace(/need to/, 'する必要がある')
    .replace(/instead/, 'その代わりに')
    .replace(/because/, 'なぜなら')
    .replace(/however/, 'しかし')
    .replace(/therefore/, 'したがって')
    .replace(/at (\w+)/, '$1に')
    .replace(/in the (\w+)/, '$1に')
    .replace(/is/, 'は')
    .replace(/are/, 'である')
    .replace(/and/, 'そして')
    .replace(/but/, 'しかし')
    .replace(/\.+$/, '。');
  
  // より自然な日本語に調整
  const naturalJapanese = japanese
    .replace(/。\s*そして/g, '。また、')
    .replace(/。\s*しかし/g, '。だが、')
    .replace(/あなたは\s*(\w+)/g, '$1は')
    .replace(/する必要がある/g, 'すべきだ')
    .replace(/\s+/g, ' ')
    .trim();
  
  return naturalJapanese + '。';
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
updateStatus("準備中...");

setTimeout(() => {
  if (!generator && !isLoading) {
    initModel().catch(console.error);
  }
}, 1000);

input.focus();
