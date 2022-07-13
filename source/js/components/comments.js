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
