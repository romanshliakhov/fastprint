// Close timer
// const closeBtnTimer = document.querySelector('.calculate__shipping-close');
// const timerItem = document.querySelector('.calculate__shipping');

// const addClassHideTimer = function(button, body) {
//     button.onclick = () => body.classList.add('hide');
// }

// if (closeBtnTimer && timerItem) {
//   addClassHideTimer(closeBtnTimer, timerItem);
// }

const [timer, btn] = document.querySelectorAll('.calculate__shipping, .calculate__shipping-close');
btn?.addEventListener('click', () => timer.classList.add('hide'));
