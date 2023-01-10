import * as v from "./variables.js";

// Knoppen combo cards Robbert Tutorial
function filter(e) {
  const allArticle = document.querySelectorAll("article");
  allArticle.forEach((item) => {
    item.classList.add("hidden");

    if (item.getAttribute("data-name") === e.target.value) {
      item.classList.remove("hidden");
    }
  });
}

v.buttons.forEach(button => {
  button.addEventListener("click", filter);
});


function filterAll() {
  const allArticle = document.querySelectorAll("article");
  allArticle.forEach(item => {
    item.classList.remove("hidden");
  });
}

v.firstBtn.addEventListener("click", filterAll);

// Filter voor knoppen https://www.youtube.com/watch?v=OeMuUKedtPc&ab_channel=CodingNepal
const filterItem = document.querySelector("nav");
window.onload = () => {
  filterItem.onclick = selectedItem => {
    if (selectedItem.target.classList.contains("btn")) {
      filterItem.querySelector(".active").classList.remove("active");
      selectedItem.target.classList.add("active");
    }
  };
};

// Intersection observer https://www.youtube.com/watch?v=2IbRtjez6ag&t=316s&ab_channel=WebDevSimplified
function addEvents(element) {
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
      });
    },
    {
      threshold: 0.5,
    }
  );

  cards.forEach(card => {
    observer.observe(card);
  });
}

// Dark mode button
function darkMode() {
  v.body.classList.toggle("dark-mode");
}
v.darkBtn.addEventListener("click", darkMode);

// Barchart
v.barSec.classList.add("hidden");

function showBar() {
  v.barSec.classList.toggle("hidden");
}
v.barBtn.addEventListener("click", showBar);

export { filter, filterAll, addEvents, darkMode, showBar };
