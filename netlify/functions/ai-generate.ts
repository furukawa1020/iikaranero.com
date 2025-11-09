// Netlify Function: AI生成エンドポイント
// Hugging Face APIをサーバー側で呼び出してCORS問題を回避

import { Handler } from '@netlify/functions';

const HF_MODEL = "microsoft/Phi-3-mini-4k-instruct";
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

export const handler: Handler = async (event) => {
  // CORSヘッダー
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // OPTIONS リクエスト（CORS preflight）
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // POSTリクエストのみ受け付け
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // リクエストボディを解析
    const { input, systemPrompt } = JSON.parse(event.body || '{}');

    if (!input) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Input is required' }),
      };
    }

    // 環境変数からトークンを取得
    const HF_TOKEN = process.env.HF_TOKEN;
    
    if (!HF_TOKEN) {
      console.error('HF_TOKEN not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    // プロンプト作成
    const fullPrompt = `${systemPrompt}\n\nユーザー: ${input}\n\nアシスタント:`;

    console.log('🔄 Calling Hugging Face API...');

    // Hugging Face APIを呼び出し
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.8,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false,
        },
        options: {
          wait_for_model: true,
          use_cache: false,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ HF API Error:', response.status, errorText);
      
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: `API Error: ${response.status}`,
          details: errorText 
        }),
      };
    }

    const data = await response.json();
    console.log('✅ HF API Success');

    // レスポンスからテキストを抽出
    let generatedText = '';
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      generatedText = data[0].generated_text;
    } else if (data.generated_text) {
      generatedText = data.generated_text;
    } else if (typeof data === 'string') {
      generatedText = data;
    } else {
      console.error('❌ Unexpected format:', data);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Unexpected API response format' }),
      };
    }

    // 成功レスポンス
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        text: generatedText,
      }),
    };

  } catch (error) {
    console.error('❌ Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
