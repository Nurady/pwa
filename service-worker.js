const CACHE_NAME = "Revisi3";
var urlsToCache = [
  "/",
  '/manifest.json',
  "/icon192.png",
  "/pwa-512x512.png",
  "/images/foto.jpg",
  "/images/smartcity.jpg",
  "/images/electrical.png",
  "/images/email.png",
  "/images/facebook.png",
  "/images/hero.png",
  "/images/instagram.png",
  "/images/linkedin.png",
  "/images/network.png",
  "/images/planning.png",
  "/images/profile.png",
  "/images/telephone.png",
  "/images/web.png",
  "/images/whatsapp.png",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/profile.html",
  "/pages/contact.html",
  "/pages/news.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/script.js"
];
 
// self.addEventListener("install", function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });


  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });