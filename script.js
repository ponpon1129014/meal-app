const result = document.getElementById("result");
const selectedLabel = document.getElementById("selectedLabel");
const mealImage = document.getElementById("mealImage");
const historyList = document.getElementById("historyList");
const button = document.getElementById("chooseButton");
const filterButtons = document.querySelectorAll(".filter-btn");
const mealCard = document.querySelector(".meal-card");
const resultCard = document.querySelector(".result-card");
const commentText = document.getElementById("commentText");

const typeLabels = {
  light: "あっさり",
  normal: "そこそこ",
  heavy: "がっつり"
};

const catLabels = {
  rice: "ご飯もの",
  noodle: "麺類",
  meat: "肉料理",
  fish: "魚料理",
  flour: "粉もの・チーズ系",
  nabe: "鍋・汁物",
  side: "軽食・サイド"
};

let selectedTypes = [];
let selectedCats = [];
let selectedTags = [];
let historyData = [];
let isSpinning = false;

const comments = {
  noodle: ["🍜 麺の日かも", "🔥 すすりたい気分", "✨ 熱いうまさ"],
  rice:   ["🍚 米は正義", "✨ 安定感ある", "🍛 満足感ありそう"],
  meat:   ["🥩 パワー補給！", "🔥 がっつりいこう", "💪 スタミナ大事"],
  light:  ["🥗 軽めで整える", "✨ 今日はやさしく", "🍃 バランス大事"],
  snack:  ["🧀 テンション上がる系", "🔥 みんな好きなやつ", "🍴 罪のうまさ"],
  fish:   ["🐟 魚の日！", "✨ さっぱりいこう", "🍣 ヘルシーチョイス"],
  flour:  ["🧀 粉もんの誘惑", "🍕 チーズ最高", "🔥 これ一択でしょ"],
  nabe:   ["🍲 体が温まる", "✨ 鍋の季節かも", "🔥 みんなで囲もう"],
  side:   ["🥗 軽めにいこう", "✨ サクッと済ませる", "🍴 これで十分"]
};

// ── ボリュームボタン ──
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    const idx = selectedTypes.indexOf(type);
    if (idx === -1) selectedTypes.push(type);
    else selectedTypes.splice(idx, 1);
    syncUI();
  });
});

// ── プルダウン開閉 ──
function initDropdown(triggerId, panelId) {
  const trigger = document.getElementById(triggerId);
  const panel = document.getElementById(panelId);
  trigger.addEventListener("click", () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    trigger.setAttribute("aria-expanded", String(!isOpen));
    trigger.classList.toggle("open", !isOpen);
  });
  document.addEventListener("click", e => {
    if (!trigger.contains(e.target) && !panel.contains(e.target)) {
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      trigger.classList.remove("open");
    }
  });
}
initDropdown("catTrigger", "catPanel");
initDropdown("tagTrigger", "tagPanel");

// ── カテゴリチェックボックス ──
document.querySelectorAll("#catPanel input[type=checkbox]").forEach(cb => {
  cb.addEventListener("change", () => {
    selectedCats = [...document.querySelectorAll("#catPanel input:checked")].map(c => c.value);
    updateBadges("cat");
    updateTagAvailability();
    syncUI();
  });
});

// ── タグチェックボックス ──
document.querySelectorAll("#tagPanel input[type=checkbox]").forEach(cb => {
  cb.addEventListener("change", () => {
    selectedTags = [...document.querySelectorAll("#tagPanel input:checked")].map(c => c.value);
    updateBadges("tag");
    updateTagAvailability();
    syncUI();
  });
});

function updateTagAvailability() {
  // 現在のボリューム・カテゴリで絞り込んだリストをベースにする
  let base = meals;
  if (selectedTypes.length > 0) base = base.filter(m => selectedTypes.includes(m.type));
  if (selectedCats.length > 0) base = base.filter(m => m.category.some(c => selectedCats.includes(c)));

  document.querySelectorAll("#tagPanel input[type=checkbox]").forEach(cb => {
    if (cb.checked) { cb.disabled = false; return; }
    const testTags = [...selectedTags, cb.value];
    const hit = base.filter(m => testTags.every(t => m.tags.includes(t)));
    cb.disabled = hit.length === 0;
    cb.closest(".chk-item").style.opacity = hit.length === 0 ? "0.4" : "1";
  });
}


// ── バッジ更新 ──
function updateBadges(group) {
  const badgeContainer = document.getElementById(group + "Badges");
  const items = group === "cat" ? selectedCats : selectedTags;
  const labelMap = group === "cat" ? catLabels : null;

  badgeContainer.innerHTML = items.map(val => {
    const label = labelMap ? (labelMap[val] || val) : val;
    return `<span class="badge">${label}<button class="badge-x" data-group="${group}" data-val="${val}" aria-label="${label}を外す">✕</button></span>`;
  }).join("");

  badgeContainer.querySelectorAll(".badge-x").forEach(btn => {
    btn.addEventListener("click", () => {
      const g = btn.dataset.group;
      const v = btn.dataset.val;
      const cb = document.querySelector(`#${g}Panel input[value="${v}"]`);
      if (cb) { cb.checked = false; cb.dispatchEvent(new Event("change")); }
    });
  });
}

// ── UI同期 ──
function syncUI() {
  filterButtons.forEach(btn => {
    btn.classList.toggle("active", selectedTypes.includes(btn.dataset.type));
  });

button.disabled = false;

const hasAny = selectedTypes.length > 0 || selectedCats.length > 0 || selectedTags.length > 0;

let label = hasAny ? "選択中：" : "今日なに食べる？ 🍚絞り込みもできるよ！";

if (hasAny) {
  const parts = [];
  if (selectedTypes.length > 0) parts.push(selectedTypes.map(t => typeLabels[t]).join("・"));
  if (selectedCats.length > 0) parts.push(selectedCats.map(c => catLabels[c]).join("・"));
  if (selectedTags.length > 0) parts.push(selectedTags.join("・"));
  label += parts.join("　");
}

  selectedLabel.textContent = label;
}

// ── 絞り込みロジック ──
function getFiltered() {
  let list = meals;

  if (selectedTypes.length > 0) {
    list = list.filter(m => selectedTypes.includes(m.type));
  }
  if (selectedCats.length > 0) {
    list = list.filter(m => m.category.some(c => selectedCats.includes(c)));
  }
  if (selectedTags.length > 0) {
    list = list.filter(m => selectedTags.every(t => m.tags.includes(t)));
  }

  return list;
}

// ── 画像エラー ──
mealImage.onerror = () => { mealImage.src = "images/default.png"; };

// ── 履歴読み込み ──
const savedHistory = localStorage.getItem("mealHistory");
if (savedHistory) {
  historyData = JSON.parse(savedHistory);
  historyData.forEach(mealName => addHistory(mealName, false));
}

// ── 履歴追加 ──
function addHistory(mealName, isNew = true) {
  const li = document.createElement("li");
  li.textContent = mealName;
  li.dataset.name = mealName;

  li.addEventListener("click", () => {
    if (isSpinning) return;
    const meal = meals.find(m => m.name === li.dataset.name);
    if (!meal) return;
    showMeal(meal);
    mealCard.classList.remove("flash");
    void mealCard.offsetWidth;
    mealCard.classList.add("flash");
  });

  if (isNew) historyList.prepend(li);
  else historyList.appendChild(li);

  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

// ── 結果表示 ──
function showMeal(meal) {
  result.textContent = "🎯 " + meal.name;
  mealImage.src = meal.image;
  mealImage.alt = meal.name;

  const detailLink = document.getElementById("detailLink");
  if (meal.id) {
    detailLink.href = "menu/" + meal.id + ".html";
    detailLink.style.display = "block";
  } else {
    detailLink.style.display = "none";
  }

  const cat = Array.isArray(meal.category) ? meal.category[0] : meal.category;
  const categoryComments = comments[cat] || comments[meal.category] || ["🍴 おいしく食べよう"];
  commentText.textContent = categoryComments[Math.floor(Math.random() * categoryComments.length)];

  selectedLabel.textContent = "ジャンル：" + typeLabels[meal.type];
}

// ── ガチャ本体 ──
button.addEventListener("click", chooseMeal);

function chooseMeal() {
  const filtered = getFiltered();

  const detailLink = document.getElementById("detailLink");
  detailLink.style.display = "none";

  result.textContent = "ガチャ中...";
  result.classList.add("spinning");
  button.disabled = true;
  isSpinning = true;
  filterButtons.forEach(btn => { btn.disabled = true; });

  let count = 0;
  let speed = 40;
  const maxCount = 14;

  function spin() {
    result.textContent = filtered[Math.floor(Math.random() * filtered.length)].name;
    count++;
    speed += 8;
    if (count < maxCount) {
      setTimeout(spin, speed);
    } else {
      const selectedMeal = filtered[Math.floor(Math.random() * filtered.length)];
      setTimeout(() => {
        mealImage.style.opacity = 0;
        setTimeout(() => {
          mealImage.src = selectedMeal.image;
          mealImage.style.opacity = 1;
        }, 150);

        showMeal(selectedMeal);

        addHistory(selectedMeal.name);
        historyData.unshift(selectedMeal.name);
        if (historyData.length > 10) historyData.pop();
        localStorage.setItem("mealHistory", JSON.stringify(historyData));
        localStorage.setItem("selectedTypes", JSON.stringify(selectedTypes));

        result.classList.remove("spinning");
        result.classList.remove("pop");
        void result.offsetWidth;
        result.classList.add("pop");

        mealCard.classList.remove("flash");
        void mealCard.offsetWidth;
        mealCard.classList.add("flash");

        button.textContent = "もう一回！";
        button.disabled = false;
        isSpinning = false;
        filterButtons.forEach(btn => { btn.disabled = false; });
      }, 300);
    }
  }
  spin();
}

// ── PWA ──
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

// ── URLパラメータ復元 ──
const params = new URLSearchParams(window.location.search);
const typesParam = params.get("types");
if (typesParam) {
  try {
    const parsed = JSON.parse(typesParam);
    if (Array.isArray(parsed)) {
      selectedTypes = parsed;
      syncUI();
      chooseMeal();
    }
  } catch(e) {}
} else {
  syncUI();
}
