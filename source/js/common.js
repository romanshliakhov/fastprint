// burger
let menuBtnOpen = document.querySelector('.mobile__header-btn--open');
let menuBtnClose = document.querySelector('.mobile__header-btn--close');
let menu = document.querySelector('.mobile__menu');
let disableScroll = document.querySelector('body');

menuBtnOpen.addEventListener('click', function () {
    menuBtnOpen.classList.add('active');
    menu.classList.add('active');
    disableScroll.classList.add('body-scroll');
});

menuBtnClose.addEventListener('click', function () {
    menuBtnOpen.classList.remove('active');
    menu.classList.remove('active');
    disableScroll.classList.remove('body-scroll');
});

// Select
let headerLang = document.querySelectorAll('.header__lang');
let filter = document.querySelectorAll('.filter');
const breakpoint = 576;

let selectScript = function (select) {
    select.forEach((item) => {
        const selectCurrent = item.querySelector(".select__current");
        item.addEventListener("click", (event) => {
            const el = event.target.dataset.choice;
            const text = event.target.innerHTML;
            if (el === "choosen" && selectCurrent.innerHTML !== text) {
                selectCurrent.innerHTML = text;
            }
            item.classList.toggle("is-active");
        });
        document.addEventListener("click", function (event) {
            if (!item.contains(event.target)) {
                item.classList.remove("is-active");
            }
        });
    });
}

selectScript(headerLang);

const mobileSelectInit = () => {
    let containerWidth = document.documentElement.clientWidth;

    if (containerWidth <= breakpoint) {
        selectScript(filter);
    }
};

window.addEventListener("DOMContentLoaded", () => {
    mobileSelectInit();
});

window.addEventListener("resize", () => {
    mobileSelectInit();
});

// Dynamic row
let sliderDynamicRow = new Swiper(".sale__slider", {
    slidesPerView: "auto",
    spaceBetween: 60,
    loop: true,
    observer: true,
    speed: 20000,
    autoplay: {
        delay: 0,
    },
});


// Article slider
let sliderArticle = new Swiper(".more__slider", {
    slidesPerView: 3,
    spaceBetween: 40,
    loop: true,
    navigation: {
        nextEl: ".more__arrow--prev",
        prevEl: ".more__arrow--next",
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



// SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных слойлеров
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular);
    }

    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction);
            } else {
                spollersBlock.classList.remove('_init');
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction);
            }
        });
    }

    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_active')) {
                        spollerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spollerTitle.setAttribute('tabindex', '-1');
                    spollerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }

    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                    hideSpollersBody(spollersBlock);
                }
                spollerTitle.classList.toggle('_active');
                _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }

    function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
    }
}

//SlideToggle
let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
};

let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
};

let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};

// comments
const body = document.body;
const block = document.querySelector('.feedback__comments');

function setHeaderHeight() {
    let header = document.querySelector('.feedback__all'),
        headerHeight = header && header.clientHeight + 'px';
    block && block.style.setProperty('--comments-max-height', headerHeight)
}

window.addEventListener("DOMContentLoaded", () => {
    setHeaderHeight();
});

window.addEventListener("resize", () => {
    setHeaderHeight();
});

// Video

lightGallery(document.querySelector('[data-modal="footer-video"]'), {
    controls: 0,
});

// Timer
// document.addEventListener('DOMContentLoaded', () => {
// 	const newYear = new Date('mar 01 2022 00:00:00'); // пишем тут дату

// 	const daysVal = document.querySelector('.timer__count-days .timer__count-val');
// 	const hoursVal = document.querySelector('.timer__count-hours .timer__count-val');
// 	const minutesVal = document.querySelector('.timer__count-minutes .timer__count-val');

// 	const timeCount = () => {
// 		let now = new Date();
// 		let leftUntil = newYear - now;

// 		let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
// 		let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
// 		let minutes = Math.floor(leftUntil / 1000 / 60) % 60;

//     if (leftUntil < 0 ) {
//       days = 0;
//       hours = 0;
//       minutes = 0;
//     } else {
//       daysVal.textContent = ('0' + days).slice(-2);
//       hoursVal.textContent = ('0' + hours).slice(-2);
//       minutesVal.textContent = ('0' + minutes).slice(-2);
//     }
// 	};

// 	timeCount();
// 	setInterval(timeCount, 1000);
// });


// Close banner
const closeBtn = document.querySelector('.banner__close');
const bannerItem = document.querySelector('.banner');

const addClassHide = function(button, body) {
    button.onclick = () => body.classList.add('hide');
}

addClassHide(closeBtn, bannerItem);

