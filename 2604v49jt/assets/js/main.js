// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Ingredients Swiper
document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".ingredientsSwiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });

  // Testimonials Swiper
  new Swiper(".testimonialsSwiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      900: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next-testimonial",
      prevEl: ".swiper-button-prev-testimonial",
    },
  });
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
