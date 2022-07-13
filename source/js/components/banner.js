// Close banner
const closeBtn = document.querySelector('.banner__close');
const bannerItem = document.querySelector('.banner');

const addClassHide = function(button, body) {
    button.onclick = () => body.classList.add('hide');
}

if (bannerItem) {
    addClassHide(closeBtn, bannerItem);
}
