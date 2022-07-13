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
