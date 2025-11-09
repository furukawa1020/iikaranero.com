# Netlify環境変数設定手順

## Netlifyダッシュボードで設定が必要な環境変数

### HF_TOKEN
Hugging Face APIトークン

**設定方法:**
1. Netlify Dashboard → あなたのサイト → Site settings
2. 左メニュー「Environment variables」をクリック
3. 「Add a variable」をクリック
4. Key: `HF_TOKEN`
5. Value: `あなたのHugging Faceトークン（hf_で始まる文字列）`
6. 「Create variable」をクリック

**重要:** 
- この環境変数はサーバーサイド（Netlify Functions）でのみ使用されます
- ブラウザには公開されません（安全）
- 設定後は再デプロイが必要です
