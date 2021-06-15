
// подставляются класс заголовка, классы табов, класы контента подвязаного к табу, и клас активности таба.
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
   const header = document.querySelector(headerSelector),
         tab = document.querySelectorAll(tabSelector),
         content = document.querySelectorAll(contentSelector);
   //скрыть табы
   function hideTabContent() {
      content.forEach(item => {
         item.style.display = 'none';
      });
   //убираем класс активности
      tab.forEach(item => {
         item.classList.remove(activeClass);
      });

   }
   //показать табы + добавить клас активности
   function showTabContent(i = 0) {
      content[i].style.display = 'block';
      tab[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();
// навешиваем обработчик клика на общую область, что соединяет табы
   header.addEventListener('click', (e) => {
         const target = e.target;
         if(target &&
            (target.classList.contains(tabSelector.slice(1)) || //убираем точку с класса методом реплейс
            target.parentNode.classList.contains(tabSelector.slice(1)) ) ) { //tabSelector.slice(1); //tabSelector.replace(/\./, ''))
               tab.forEach((item, i) => {
                  if (target == item || target.parentNode == item) {
                     hideTabContent();
                     showTabContent(i);
                  }
               });
         }
   });

};

export default tabs;