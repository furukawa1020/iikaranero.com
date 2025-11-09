// Service Worker - オフライン対応 & プッシュ通知
const CACHE_NAME = 'iikarasnero-v1';
const OFFLINE_RESPONSE = 'ネットが寝てる。いいから寝ろ。';

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.svg'
];

// インストール
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // キャッシュ失敗は無視
      });
    })
  );
  self.skipWaiting();
});

// アクティベーション
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// プッシュ通知受信
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'いいから寝ろ';
  const options = {
    body: data.body || 'こんな時間まで起きてるな。いいから寝ろ。',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'sleep-reminder',
    requireInteraction: true,
    actions: [
      { action: 'sleep', title: '寝る' },
      { action: 'ignore', title: '後で' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 通知クリック
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'sleep') {
    // 「寝る」を押したらアプリを開く
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// フェッチ
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // 静的アセット
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request).catch(() => {
        // 完全オフライン時は基本HTMLを返す
        if (request.mode === 'navigate') {
          return caches.match('/');
        }
        return new Response('', { status: 503 });
      });
    })
  );
});
