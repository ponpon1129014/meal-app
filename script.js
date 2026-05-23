const result =
document.getElementById("result");

const typeSelect =
document.getElementById("type");

const mealImage =
document.getElementById("mealImage");

const historyList =
document.getElementById("historyList");

const button =
document.getElementById("chooseButton");

let historyData = [];

button.addEventListener("click", chooseMeal);

mealImage.onerror = () => {
  mealImage.src = "images/default.jpg";
};

const savedHistory = localStorage.getItem("mealHistory");

if (savedHistory) {

  historyData = JSON.parse(savedHistory);

  historyData.forEach(mealName => {

    const li = document.createElement("li");

    li.textContent = mealName;

    historyList.appendChild(li);

  });

}

    const meals = [

  { name: "カレー", type: "heavy", image: "images/curry.jpg" },
  { name: "ラーメン", type: "heavy", image: "images/ramen.jpg" },
  { name: "寿司", type: "heavy", image: "images/sushi.jpg" },
  { name: "焼肉", type: "heavy", image: "images/yakiniku.jpg" },
  { name: "ハンバーグ", type: "heavy", image: "images/hamburg.jpg" },
  { name: "ステーキ", type: "heavy", image: "images/steak.jpg" },
  { name: "チャーハン", type: "heavy", image: "images/friedrice.jpg" },
  { name: "唐揚げ", type: "heavy", image: "images/karaage.jpg" },
  { name: "牛丼", type: "heavy", image: "images/gyudon.jpg" },
  { name: "天丼", type: "heavy", image: "images/tendon.jpg" },

  { name: "うどん", type: "light", image: "images/udon.jpg" },
  { name: "そば", type: "light", image: "images/soba.jpg" },
  { name: "サラダ", type: "light", image: "images/salad.jpg" },
  { name: "サンドイッチ", type: "light", image: "images/sandwich.jpg" },
  { name: "おにぎり", type: "light", image: "images/onigiri.jpg" },
  { name: "スープ", type: "light", image: "images/soup.jpg" },
  { name: "冷やし中華", type: "light", image: "images/hiyashi.jpg" },
  { name: "ヨーグルト", type: "light", image: "images/yogurt.jpg" },
  { name: "フルーツ", type: "light", image: "images/fruits.jpg" },
  
  { name: "親子丼", type: "normal", image: "images/oyakodon.jpg" },
  { name: "オムライス", type: "normal", image: "images/omurice.jpg" },
  { name: "ナポリタン", type: "normal", image: "images/napolitan.jpg" },
  { name: "餃子", type: "normal", image: "images/gyoza.jpg" },
  { name: "焼きそば", type: "normal", image: "images/yakisoba.jpg" },
  { name: "グラタン", type: "normal", image: "images/gratin.jpg" },
  { name: "ドリア", type: "normal", image: "images/doria.jpg" },
  { name: "ピザ", type: "normal", image: "images/pizza.jpg" },
  { name: "たこ焼き", type: "normal", image: "images/takoyaki.jpg" },
  { name: "お好み焼き", type: "normal", image: "images/okonomiyaki.jpg" }

];

function chooseMeal() {

  const type = typeSelect.value;

  let filtered = meals;
  if (type !== "all") {
    filtered = meals.filter(m => m.type === type);
  }

  let count = 0;
  const maxCount = 15;

  result.textContent = "ガチャ中...";

  result.classList.add("spinning");
  button.disabled = true;  

  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * filtered.length);
    result.textContent = filtered[randomIndex].name;

    count++;

    if (count >= maxCount) {
      clearInterval(interval);

      result.classList.remove("spinning");

      setTimeout(() => {

        mealImage.style.opacity = 0;

const finalIndex = Math.floor(Math.random() * filtered.length);

setTimeout(() => {

  mealImage.src =
  filtered[finalIndex].image;

  mealImage.style.opacity = 1;

}, 150);

        result.textContent = "🎯 " + filtered[finalIndex].name;

const li = document.createElement("li");

li.textContent =
filtered[finalIndex].name;

historyList.prepend(li);

historyData.unshift(filtered[finalIndex].name);

if (historyData.length > 5) {
  historyData.pop();
}

localStorage.setItem(
  "mealHistory",
  JSON.stringify(historyData)
);

if (historyList.children.length > 5) {
  historyList.removeChild(historyList.lastChild);
}

        result.classList.remove("pop");
        void result.offsetWidth; 
        result.classList.add("pop");
        button.disabled = false;

      }, 150);
    }
  }, 80);
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => {
      console.log("Service Worker Registered");
    });
}