const CACHE = 'cadernetas-v1';
const CORE = ['./index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

// network-first for data (json), cache-first for the app shell
self.addEventListener('fetch', (e)=>{
  const url = e.request.url;
  if(url.endsWith('.json')){
    e.respondWith(
      fetch(e.request).then(res=>{
        const clone = res.clone();
        caches.open(CACHE).then(c=>c.put(e.request, clone));
        return res;
      }).catch(()=>caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
  }
});
