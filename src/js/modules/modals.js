// Modal Window

const modals = () => {
   function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

      const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScrollWidth();

      trigger.forEach(item => {
         item.addEventListener('click', (e) => {
            if (e.target) {
               e.preventDefault();
            }
            // при открытии одного модал окна мы закрываем предыдущее окно
            windows.forEach(item => {
               item.style.display = 'none';
            });
   
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            document.body.style.marginRight = scroll + 'px';
         });
      });

      close.addEventListener('click', () => {
         //при нажатии на крестик мы закрываем все ранее открытые и текущие модальные окна
         windows.forEach(item => {
            item.style.display = 'none';
         });

         modal.style.display = "none";
         document.body.style.overflow = "";
         document.body.style.marginRight = 0;
      });

      modal.addEventListener('click', (e) => {
         if (e.target === modal && closeClickOverlay) {
            windows.forEach(item => {
               item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = 0;
         }
      });
   }

   function showModalByTime (selector, time) {
      setTimeout(() => {
         document.querySelector(selector).style.display = "block";
         document.body.style.overflow = "hidden";
      }, time);
   }

   //Убираем дёрганье страницы при оверфлове (открытии поп-апа)
   function calcScrollWidth () {
      let div = document.createElement('div');
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.overflowY = 'scroll';
      div.style.visibility = 'hidden';

      document.body.appendChild(div);
      let scrollWidth = div.offsetWidth - div.clientWidth;
      div.remove(); 

      return scrollWidth;
   }

   bindModals('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
   bindModals('.phone_link', '.popup', '.popup .popup_close');
   //Открытие формы-калькулятора
   bindModals('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
   bindModals('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
   bindModals('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
   showModalByTime('.popup', 60000);
};

export default modals;