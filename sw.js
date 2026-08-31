const CACHE = 'cadernetas-v2';
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

// network-first para tudo: tenta sempre buscar a versão mais recente da
// internet primeiro, e só usa a cópia guardada se não houver ligação
// (offline). Assim as atualizações ao site chegam sempre ao telemóvel.
self.addEventListener('fetch', (e)=>{
  e.respondWith(
    fetch(e.request).then(res=>{
      const clone = res.clone();
      caches.open(CACHE).then(c=>c.put(e.request, clone));
      return res;
    }).catch(()=>caches.match(e.request))
  );
});
