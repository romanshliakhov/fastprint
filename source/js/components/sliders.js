import Swiper from '../vendor/swiper.js';

// // Dynamic row
let sliderDynamicRow = new Swiper(".sale__slider", {
  slidesPerView: "auto",
  spaceBetween: 60,
  loop: true,
  observer: true,
  speed: 20000,
  autoplay: {
      delay: 0,
  },
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    576: {
      spaceBetween: 15,
    },
    769: {
      spaceBetween: 60,
    }
}
});


// // Article slider
let sliderArticle = new Swiper(".more__slider", {
  slidesPerView: 3,
  spaceBetween: 40,
  loop: true,
  navigation: {
      nextEl: ".more__arrow--next",
      prevEl: ".more__arrow--prev",
      clickable: true,
  },
  breakpoints: {
      320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
      576: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      }
  }
});
