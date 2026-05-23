const result =
document.getElementById("result");

const mealImage =
document.getElementById("mealImage");

const historyList =
document.getElementById("historyList");

const button =
document.getElementById("chooseButton");

const filterButtons =
document.querySelectorAll(".filter-btn");

let selectedTypes = [];

let historyData = [];

button.addEventListener("click", chooseMeal);

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;

    if (type === "all") {
      if (selectedTypes.length === 0) {
        selectedTypes = ["light", "normal", "heavy"];
      } else {
        selectedTypes = [];
      }

      syncUI();
      return;
    }
    
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
  const allBtn = document.querySelector(".filter-btn[data-type='all']");
  const normalBtns = document.querySelectorAll(".filter-btn:not([data-type='all'])");

  filterButtons.forEach(b => b.classList.remove("active"));

    if (selectedTypes.length === 0) {
    return; 
    }

  if (selectedTypes.includes("all")) {
    filterButtons.forEach(b => b.classList.add("active"));
    return;
  }

  normalBtns.forEach(btn => {
    if (selectedTypes.includes(btn.dataset.type)) {
      btn.classList.add("active");
    }
  });
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

        const finalIndex = Math.floor(Math.random() * filtered.length);

        mealImage.style.opacity = 0;

        setTimeout(() => {
          mealImage.src = filtered[finalIndex].image;
          mealImage.style.opacity = 1;
        }, 150);

        result.textContent = "🎯 " + filtered[finalIndex].name;

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

