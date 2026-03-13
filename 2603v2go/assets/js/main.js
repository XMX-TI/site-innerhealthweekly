function getQueryParams() {
  return new URLSearchParams(window.location.search);
}

const countdownElements = document.querySelectorAll(".countdown");
let totalSeconds = 18 * 60; // 30 minutos

function updateCountdown() {
  if (totalSeconds <= 0) {
    countdownElements.forEach((el) => (el.textContent = "00:00"));
    return;
  }

  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  countdownElements.forEach((el) => {
    el.textContent = `${minutes}:${seconds}`;
  });

  totalSeconds--;
  setTimeout(updateCountdown, 1000);
}

updateCountdown();

// Combina os parâmetros do href original com os da URL atual
function combineParams(originalHref, currentParams) {
  let [baseUrl, originalParamsString] = originalHref.split("?");
  let originalParams = new URLSearchParams(originalParamsString || "");

  currentParams.forEach((value, key) => {
    if (!originalParams.has(key)) {
      originalParams.append(key, value);
    }
  });

  let finalParamsString = originalParams.toString();
  return finalParamsString ? `${baseUrl}?${finalParamsString}` : baseUrl;
}

document.querySelectorAll(".accordion .item .header").forEach((header) => {
  header.addEventListener("click", function () {
    const item = this.parentNode;
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    } else {
      document
        .querySelectorAll(".accordion .item")
        .forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    }
  });
});

// Adiciona parâmetros da URL aos links de checkout
document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.querySelectorAll(".area-kits a");
  let currentParams = getQueryParams();

  buttons.forEach(function (button) {
    let originalHref = button.getAttribute("href");
    button.setAttribute("href", combineParams(originalHref, currentParams));
  });
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
