const fs = require("fs");

const mealsText = fs.readFileSync("meals.js", "utf8");
const ids = [...mealsText.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);

const staticFiles = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./meals.js",
  "./images/default.png",
  "./images/ogp.png",
  "./menu-detail.js",
  "./menu.css",
  "./tag.html",
  "./category.html",
];

const imageFiles = ids.map(id => `./images/${id}.png`);
const menuFiles = ids.map(id => `./menu/${id}.html`);

const allFiles = [...staticFiles, ...imageFiles, ...menuFiles];

const swContent = `const CACHE_NAME = "gacha-v4.0.0";

const urlsToCache = [
${allFiles.map(f => `  "${f}"`).join(",\n")}
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
`;

fs.writeFileSync("service-worker.js", swContent, "utf8");
console.log(`完了！${allFiles.length}ファイルをキャッシュリストに追加しました`);