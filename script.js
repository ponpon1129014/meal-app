const result =
document.getElementById("result");

const guideMessage =
document.getElementById("guideMessage");

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

let selectedTypes = [];

let historyData = [];

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

guideMessage.textContent =
  hasSelected ? "" : "ジャンルを選んでね 🍚";

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

        const selectedMeal = filtered[finalIndex].name;

result.textContent = "🎯 " + selectedMeal;

addHistory(selectedMeal);

historyData.unshift(selectedMeal);

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
  navigator.serviceWorker.register("service-worker.js")
    .then(() => {
      console.log("Service Worker Registered");
    });
    
syncUI();



}

