const CACHE_NAME = "gacha-v2.7.9";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./meals.js",
  "./images/default.jpg",
  "./images/curry.jpg",
  "./images/ramen.jpg",
  "./images/sushi.jpg",
  "./images/yakiniku.jpg",
  "./images/hamburg.jpg",
  "./images/steak.jpg",
  "./images/friedrice.jpg",
  "./images/karaage.jpg",
  "./images/gyudon.jpg",
  "./images/tendon.jpg",
  "./images/udon.jpg",
  "./images/soba.jpg",
  "./images/salad.jpg",
  "./images/sandwich.jpg",
  "./images/onigiri.jpg",
  "./images/soup.jpg",
  "./images/hiyashi.jpg",
  "./images/yogurt.jpg",
  "./images/fruits.jpg",
  "./images/oyakodon.jpg",
  "./images/omurice.jpg",
  "./images/napolitan.jpg",
  "./images/gyoza.jpg",
  "./images/yakisoba.jpg",
  "./images/gratin.jpg",
  "./images/doria.jpg",
  "./images/pizza.jpg",
  "./images/takoyaki.jpg",
  "./images/okonomiyaki.jpg",
  "./menu/menu-detail.js",
  "./menu/menu.css",
  "./menu/curry.html",
  "./menu/ramen.html",
  "./menu/sushi.html",
  "./menu/yakiniku.html",
  "./menu/hamburg.html",
  "./menu/steak.html",
  "./menu/friedrice.html",
  "./menu/karaage.html",
  "./menu/gyudon.html",
  "./menu/tendon.html",
  "./menu/udon.html",
  "./menu/soba.html",
  "./menu/salad.html",
  "./menu/sandwich.html",
  "./menu/onigiri.html",
  "./menu/soup.html",
  "./menu/hiyashi.html",
  "./menu/yogurt.html",
  "./menu/fruits.html",
  "./menu/oyakodon.html",
  "./menu/omurice.html",
  "./menu/napolitan.html",
  "./menu/gyoza.html",
  "./menu/yakisoba.html",
  "./menu/gratin.html",
  "./menu/doria.html",
  "./menu/pizza.html",
  "./menu/takoyaki.html",
  "./menu/okonomiyaki.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});