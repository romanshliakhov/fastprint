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
