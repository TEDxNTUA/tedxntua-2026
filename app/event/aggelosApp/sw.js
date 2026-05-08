const CACHE='tedx-2025-v1';
const STATIC=['/','index.html','manifest.json','icons/icon-192.png','icons/icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const url=e.request.url;
  if(url.includes('firestore')||url.includes('firebase')||url.includes('googleapis'))return;
  e.respondWith(caches.match(e.request).then(cached=>{
    const net=fetch(e.request).then(resp=>{
      if(resp&&resp.status===200&&resp.type==='basic'){
        const cl=resp.clone();
        caches.open(CACHE).then(c=>c.put(e.request,cl));
      }
      return resp;
    }).catch(()=>cached||caches.match('/index.html'));
    return cached||net;
  }));
});
