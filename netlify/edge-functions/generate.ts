// Netlify Edge Function - 完全クライアントサイド対応（プロキシのみ）
// 生成ロジックはブラウザ側で実行

import type { Context } from "https://edge.netlify.com";

// このエンドポイントは将来の拡張用（現在は使用しない）
// すべての生成処理はクライアントサイドで完結

export default async (request: Request, context: Context) => {
  const origin = request.headers.get('origin') || '';
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:4173',
    context.site.url
  ];

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : context.site.url,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // すべての処理はクライアントサイドで行うため、このエンドポイントは使用しない
  return new Response('Client-side generation only', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : context.site.url
    }
  });
};
