// Change href anchor
let currentLinkUrl = document.querySelector('.first__wrapp-order'); // класс ссылки
const breakpoint = 576;

let changeLinkToAnchor = function () {
  currentLinkUrl?.setAttribute("onclick", "location.href='./calculate-mobile.html'");
}

const mobileChangeAnchor = () => {
  let containerWidth = document.documentElement.clientWidth;

  if (containerWidth <= breakpoint) {
    changeLinkToAnchor();
  }
};

window.addEventListener("DOMContentLoaded", () => {
  mobileChangeAnchor ();
});

window.addEventListener("resize", () => {
  mobileChangeAnchor ();
});
