// Ancienne adresse : ce service worker efface l'ancienne version en cache puis recharge la page, qui redirige vers la nouvelle adresse.
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(
  caches.keys().then(k=>Promise.all(k.map(c=>caches.delete(c))))
    .then(()=>self.registration.unregister())
    .then(()=>self.clients.matchAll({type:"window"}))
    .then(cs=>cs.forEach(c=>c.navigate(c.url)))
));
