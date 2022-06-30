import './_vendor';
import vars from './_vars';
import './_functions';
import './_components';


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

// Steps
const stepsBtns = [...document.querySelectorAll('.calculate__types-item')];
const stepsWrapper = document.querySelector('.calculate__steps-all');
const cutrentForms = [...document.querySelectorAll(".calculate__steps-pressed")];
let btnData;
let active;
let show;

const itemAddClass = function(item,activeClass) {
    item.classList.add(activeClass);
}

const itemRemoveClass = function(item,activeClass) {
    item.classList.remove(activeClass);
}

const itemToggleClass = function(item,activeClass) {
    item.classList.toggle(activeClass);
}

stepsBtns.map(function(stepsBtn) {
    stepsBtn.addEventListener('click', function() {
        active = 'active';
        show = 'show';

        btnData = this.dataset.choose;
        cutrentForms.map(function(item){
            item.dataset.form !== btnData ?
            itemRemoveClass(item,active) :
            itemAddClass(item,active);

            let stepsPrev = item.querySelector('.calculate__steps-btn--back');

            stepsPrev.onclick = function(e){
                e.preventDefault();
                itemRemoveClass(stepsWrapper,show);
                itemRemoveClass(item,active);
            };
        });

        itemAddClass(stepsWrapper,show);
    });
})

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




// Close banner
const closeBtn = document.querySelector('.banner__close');
const bannerItem = document.querySelector('.banner');

const addClassHide = function(button, body) {
    button.onclick = () => body.classList.add('hide');
}

if (bannerItem) {
    addClassHide(closeBtn, bannerItem);
}

// dropdown
document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

    dropDownBtn.addEventListener('click', function (e) {
      dropDownList.classList.toggle('dropdown__list--visible');
      this.classList.add('dropdown__button--active');
    });

    dropDownListItems.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropDownBtn.innerHTML = this.innerHTML;
        dropDownBtn.focus();
        dropDownInput.value = this.dataset.value;
        dropDownList.classList.remove('dropdown__list--visible');
        this.classList.remove('dropdown__button--active');
      });
    });

    document.addEventListener('click', function (e) {
      if (!dropDownBtn.contains(e.target)) {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
      }
    });
});

// tabs

function tabsInit() {
  const tabsParrents = [...document.querySelectorAll('.tabs')];

  tabsParrents.map(function(tabsParr) {
    if (tabsParr) {
      document.addEventListener('DOMContentLoaded', () => {
        const tabsBtn = tabsParr.querySelectorAll('.tablinks');
        const tabsContent = tabsParr.querySelectorAll('.tabcontent');

        tabsParr.addEventListener('click', (e) => {
            if (e.target.classList.contains('tablinks')) {
                const tabsPath = e.target.getAttribute('tabs-btn');
                tabsBtn.forEach(el => {el.classList.remove('active')});
                tabsParr.querySelector(`[tabs-btn="${tabsPath}"]`).classList.add('active');
                tabsHandler(tabsPath);
            }
        });

        const tabsHandler = (path) => {
          tabsContent.forEach(el => {el.classList.remove('active')});
          tabsParr.querySelector(`[tabs-content="${path}"]`).classList.add('active');
        };
      });
    }}
  );
}

tabsInit();



// lightgallery
let videoBlock = [...document.querySelectorAll('[data-modal="video"]')]

const videoInit = (items) => {
    for (const item of items) {
        lightGallery(item), {

            controls: 0,
        };
    }
}


if (videoBlock) {
    videoInit(videoBlock);
}



// modals
class Modal {
  constructor (options) {
      let defaultOptions = {
          onOpen: () => {},
          onClose: () => {},
      };
      this.options = Object.assign(defaultOptions, options);
      this.modal = document.querySelector('.modal');
      this.speed = false;
      this.animation = false;
      this.isOpen = false;
      this.modalContainer = false;
      this.previousActiveElement = false;
      this.fixBlocks = document.querySelectorAll('.fix-block');
      this.focusElements = [
          'a[href]',
          'input',
          'button',
          'select',
          'textarea',
          '[tabindex]'
      ];
      this.events();
  }

  events() {
      if (this.modal) {
          document.addEventListener('click', function (e) {
              const clickedElement = e.target.closest('[data-path]');
              if (clickedElement) {
                  if (this.isOpen) {
                    this.close();
                  }
                  tabsInit();


                  let target = clickedElement.dataset.path;
                  let animation = clickedElement.dataset.animation;
                  let speed = clickedElement.dataset.speed;
                  this.animation = animation ? animation : 'fade';
                  this.speed = speed ? parseInt(speed) : 300;
                  this.modalContainer = document.querySelector(`[data-target="${target}"]`);
                  this.open();
                  return;
              }

              if (e.target.closest('.modal-close')) {
                  this.close();
                  return;
              }
          }.bind(this));

          window.addEventListener('keydown', function (e) {
              if (e.keyCode == 27) {
                  if (this.isOpen) {
                      this.close();
                  }
              }
          }.bind(this));

          this.modal.addEventListener('click', function (e) {
              if (!e.target.classList.contains('.modal__container') && !e.target.closest('.modal__container') && this.isOpen) {
              this.close();
              }
          }.bind(this));
      }
  }

  open() {
      this.previousActiveElement = document.activeElement;

      this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
      this.modal.classList.add('is-open');
      this.disableScroll();

      this.modalContainer.classList.add('modal-open');
      this.modalContainer.classList.add(this.animation);

      setTimeout(() => {
          this.modalContainer.classList.add('animate-open');
          this.options.onOpen(this);
          this.isOpen = true;
      }, this.speed);
  }

  close() {
      if (this.modalContainer) {
          this.modalContainer.classList.remove('animate-open');
          this.modalContainer.classList.remove(this.animation);
          this.modal.classList.remove('is-open');
          this.modalContainer.classList.remove('modal-open');

          this.enableScroll();
          this.options.onClose(this);
          this.isOpen = false;
      }
  }

  focusCatch(e) {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }

      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        focusArray[0].focus();
        e.preventDefault();
      }
  }

  focusTrap() {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      if (this.isOpen) {
          focusable[0].focus();
      } else {
      }
  }

  disableScroll() {
      let pagePosition = window.scrollY;
      this.lockPadding();
      document.body.classList.add('disable-scroll');
      document.body.dataset.position = pagePosition;
      document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
      let pagePosition = parseInt(document.body.dataset.position, 10);
      this.unlockPadding();
      document.body.style.top = 'auto';
      document.body.classList.remove('disable-scroll');
      window.scroll({ top: pagePosition, left: 0 });
      document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this.fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding () {
    this.fixBlocks.forEach((el) => {
    el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}

const modal = new Modal({
  onOpen: (modal) => {

  },
  onClose: () => {

  },
});

// scroll to
document.querySelectorAll('a.first__wrapp-order').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const href = this.getAttribute('href').substring(1);

    const scrollTarget = document.getElementById(href);
    const topOffset = 0;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    })
  })
})

// const scrollLinks = document.querySelector('.first__wrapp-order[data-goto]');
// if (scrollLinks.length > 0) {
//   scrollLinks.forEach(scrollLink => {
//     scrollLink.addEventListener('click', onScrollLinkClick);

//     function onScrollLinkClick(e) {
//       const scrollLink = e.target;
//       if(scrollLink.dataset.goto && document.querySelector(scrollLink.dataset.goto)) {
//         const gotoBlock = document.querySelector(scrollLink.dataset.goto);
//         // const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

//         window.scrollTo({
//           top: gotoBlock,
//           behavior: 'smooth'
//         });
//         // e.preventDefault();
//       }
//     }
//   })
// }

