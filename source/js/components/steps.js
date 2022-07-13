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
