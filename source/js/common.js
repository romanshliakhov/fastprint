// Select

let select = function () {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle);
  });

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle('is-active');
  }

  function selectChoose() {
    let text = this.innerHTML,
        select = this.closest('.select'),
        currentText = select.querySelector('.select__current');
    currentText.innerHTML = text;
    select.classList.remove('is-active');
  }
};

select();


// Dynamic row
let slider = new Swiper(".logo-section__slider", {
    slidesPerView: "auto",
    spaceBetween: 60,
    loop: true,
    observer: true,
    speed: 5000,
    autoplay: {
      delay: 0,
    },
  });
