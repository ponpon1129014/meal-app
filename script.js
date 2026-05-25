const result =
document.getElementById("result");

const selectedLabel =
document.getElementById("selectedLabel");

const typeLabels = {
  light: "あっさり",
  normal: "そこそこ",
  heavy: "がっつり"
};

const mealImage =
document.getElementById("mealImage");

const historyList =
document.getElementById("historyList");

const button =
document.getElementById("chooseButton");

const filterButtons =
document.querySelectorAll(".filter-btn");

const mealCard =
document.querySelector(".meal-card");

const resultCard = document.querySelector(".result-card");

const commentText =
document.getElementById("commentText");


let selectedTypes = [];

let historyData = [];

const comments = {

  noodle: [
    "🍜 麺の日かも",
    "🔥 すすりたい気分",
    "✨ 熱いうまさ"
  ],

  rice: [
    "🍚 米は正義",
    "✨ 安定感ある",
    "🍛 満足感ありそう"
  ],

  meat: [
    "🥩 パワー補給！",
    "🔥 がっつりいこう",
    "💪 スタミナ大事"
  ],

  light: [
    "🥗 軽めで整える",
    "✨ 今日はやさしく",
    "🍃 バランス大事"
  ],

  snack: [
    "🧀 テンション上がる系",
    "🔥 みんな好きなやつ",
    "🍴 罪のうまさ"
  ]

};


button.addEventListener("click", chooseMeal);

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    
    const index = selectedTypes.indexOf(type);

    if (index === -1) {
      selectedTypes.push(type);
    } else {
      selectedTypes.splice(index, 1);
    }

    syncUI();
  });
});

function syncUI() {

  filterButtons.forEach(btn => {
    if (selectedTypes.includes(btn.dataset.type)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const hasSelected = selectedTypes.length > 0;
  button.disabled = !hasSelected;

  if (selectedTypes.length === 0) {
    selectedLabel.textContent = "ジャンルを選んでね 🍚";
  } else {
    selectedLabel.textContent = "選択中：" + selectedTypes
      .map(type => typeLabels[type])
      .join("・");
  }
}

mealImage.onerror = () => {
  mealImage.src = "images/default.jpg";
};

const savedHistory = localStorage.getItem("mealHistory");

if (savedHistory) {

  historyData = JSON.parse(savedHistory);

  historyData.forEach(mealName => {

     addHistory(mealName,false);
});

}

function addHistory(mealName, isNew = true) {

  const li = document.createElement("li");

  li.textContent = mealName;
  li.dataset.name = mealName;

li.addEventListener("click", () => {

  const meal = meals.find(
    m => m.name === li.dataset.name
  );

  if (!meal) return;

  result.textContent = "🍽️ " + meal.name;
  mealImage.src = meal.image;
  mealImage.alt = meal.name;

selectedLabel.textContent =
  "ジャンル：" + typeLabels[meal.type];

const categoryComments =
  comments[meal.category]
  || ["🍴 おいしく食べよう"];

const randomComment =
  categoryComments[
    Math.floor(Math.random() * categoryComments.length)
  ];

commentText.textContent =
  randomComment;

  mealCard.classList.remove("flash");
void mealCard.offsetWidth;
mealCard.classList.add("flash");

});

  if (isNew) {
    historyList.prepend(li);
  } else {
    historyList.appendChild(li);
  }

  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

function chooseMeal() {

  let filtered = meals;

  if (selectedTypes.length > 0) {
    filtered = meals.filter(m => selectedTypes.includes(m.type));
  }

  result.textContent = "ガチャ中...";
  result.classList.add("spinning");
  button.disabled = true;

filterButtons.forEach(btn => {
  btn.disabled = true;
});

  let count = 0;
  let speed = 40; //

  const maxCount = 14;

  function spin() {

    const randomIndex = Math.floor(Math.random() * filtered.length);
    result.textContent = filtered[randomIndex].name;

    count++;

    speed += 8;

    if (count < maxCount) {
      setTimeout(spin, speed);
    } else {

      const finalIndex = Math.floor(Math.random() * filtered.length);

      setTimeout(() => {

        mealImage.style.opacity = 0;

        setTimeout(() => {
          mealImage.src = filtered[finalIndex].image;
          mealImage.style.opacity = 1;
        }, 150);

        const selectedMeal = filtered[finalIndex];

result.textContent =
  "🎯 " + selectedMeal.name;
  mealImage.src = selectedMeal.image;
mealImage.alt = selectedMeal.name; 

const categoryComments =
  comments[selectedMeal.category]
  || ["🍴 おいしく食べよう"];

const randomComment =
  categoryComments[
    Math.floor(Math.random() * categoryComments.length)
  ];

commentText.textContent = randomComment;

addHistory(selectedMeal.name);

historyData.unshift(selectedMeal.name);

if (historyData.length > 10) {
  historyData.pop();
}

localStorage.setItem(
  "mealHistory",
  JSON.stringify(historyData)
);

result.classList.remove("spinning");

result.classList.remove("pop");
void result.offsetWidth;
result.classList.add("pop");

mealCard.classList.remove("flash");
void mealCard.offsetWidth;
mealCard.classList.add("flash");

button.disabled = false;

filterButtons.forEach(btn => {
  btn.disabled = false;
});

      }, 300);
    }
  }

  spin();
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

syncUI();

