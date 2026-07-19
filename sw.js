const CACHE_NAME='wealthtrack-v2026071901';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(url.hostname==='api.anthropic.com'||url.hostname==='api.github.com')return;const path=url.pathname;if(path.endsWith('/')||path.endsWith('index.html')||path.endsWith('sw.js')){e.respondWith(fetch(e.request,{cache:'no-store'}).then(res=>{const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,clone));return res;}).catch(()=>caches.match(e.request)));return;}e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(res=>{const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,clone));return res;})));});
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting();});
