// if (window.boxercontainer) {
//   // Parallax phone
//   const boxer = boxercontainer.querySelector("img"),
//     boxerCenterX = boxer.offsetLeft + (boxer.offsetWidth / 2),
//     boxerCenterY = boxer.offsetTop + (boxer.offsetHeight / 2),
//     fluidboxer = window.matchMedia("(min-width: 726px)");

//   function getMousePos(xRef, yRef) {
//     let panelRect = boxercontainer.getBoundingClientRect();
//     return {
//       x: Math.floor(xRef - panelRect.left) / (panelRect.right - panelRect.left) * boxercontainer.offsetWidth,
//       y: Math.floor(yRef - panelRect.top) / (panelRect.bottom - panelRect.top) * boxercontainer.offsetHeight
//     };
//   }

//   document.body.addEventListener("mousemove", function (e) {
//     let mousePos = getMousePos(e.clientX, e.clientY),
//       distX = mousePos.x - boxerCenterX,
//       distY = mousePos.y - boxerCenterY;
//     if (Math.abs(distX) < 500 && distY < 200 && fluidboxer.matches) {
//       boxer.style.transform = "translate(" + (-1 * distX) / 20 + "px," + (-1 * distY) / 20 + "px)";
//       boxercontainer.style.backgroundPosition = `calc(50% + ${distX / 5}px) calc(50% + ${distY / 5}px)`;
//     }
//   })
// }
