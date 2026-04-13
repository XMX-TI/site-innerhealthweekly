const swiper = new Swiper(".testimonials-swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
    },
  },
});

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

function getQueryParams() {
  return new URLSearchParams(window.location.search);
}

// Função para combinar os parâmetros do href original com os parâmetros da URL atual
function combineParams(originalHref, currentParams) {
  let [baseUrl, originalParamsString] = originalHref.split("?");
  let originalParams = new URLSearchParams(originalParamsString || "");

  // Adiciona os parâmetros atuais da URL aos parâmetros originais
  currentParams.forEach((value, key) => {
    // Verifica se o parâmetro já existe para evitar duplicação
    if (!originalParams.has(key)) {
      originalParams.append(key, value);
    }
  });

  // Monta a URL final
  let finalParamsString = originalParams.toString();
  return finalParamsString ? `${baseUrl}?${finalParamsString}` : baseUrl;
}

// Adiciona os parâmetros da URL aos links de checkout
document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.querySelectorAll(".area-kits a");
  let currentParams = getQueryParams();

  buttons.forEach(function (button) {
    let originalHref = button.getAttribute("href");
    button.setAttribute("href", combineParams(originalHref, currentParams));
  });
});

document.querySelectorAll(".zoom-container").forEach((container) => {
  const img = container.querySelector(".zoom-image");
  const lens = container.querySelector(".zoom-lens");

  container.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    lens.style.left = `${x - lens.offsetWidth / 2}px`;
    lens.style.top = `${y - lens.offsetHeight / 2}px`;
    lens.style.backgroundImage = `url('${img.src}')`;
    lens.style.backgroundPosition = `-${x * 2 - lens.offsetWidth / 2}px -${
      y * 2 - lens.offsetHeight / 2
    }px`;
    lens.style.backgroundSize = `${img.width * 2}px ${img.height * 2}px`;
    lens.style.display = "block";
  });

  container.addEventListener("mouseleave", () => {
    lens.style.display = "none";
  });
});

const rotulo = document.querySelector(".rotulo");
const modal = document.getElementById("rotuloModal");
const closeBtn = document.getElementById("closeRotulo");

rotulo.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fechar ao clicar fora da imagem
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

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
