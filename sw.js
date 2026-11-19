/* COOP/COEP enabler — Video Compressor (Zerouki Ahmed Moaadh) */
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",(e)=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",(e)=>{
  if(e.request.cache==="only-if-cached"&&e.request.mode!=="same-origin")return;
  e.respondWith(fetch(e.request).then((r)=>{
    const h=new Headers(r.headers);
    if(e.request.mode==="navigate"){h.set("Cross-Origin-Embedder-Policy","require-corp");h.set("Cross-Origin-Opener-Policy","same-origin");}
    else{h.set("Cross-Origin-Resource-Policy","cross-origin");}
    return new Response(r.body,{status:r.status,statusText:r.statusText,headers:h});
  }).catch(()=>fetch(e.request)));
});