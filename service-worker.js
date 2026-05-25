const CACHE_NAME = "gacha-v1.5";

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
  "./images/okonomiyaki.jpg"
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