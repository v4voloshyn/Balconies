import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
   const windowForm = document.querySelectorAll('.balcon_icons_img'),
         windowWidth = document.querySelectorAll('#width'),
         windowHeight = document.querySelectorAll('#height'),
         windowType = document.querySelectorAll('#view_type'),
         windowProfile = document.querySelectorAll('.checkbox');
// Валидация инпутов для ввода только чисел
   checkNumInputs('#width');
   checkNumInputs('#height');

   // выделение идентификатоора формы для дальнейшей передачи его в объект и на сервер???
   function bindActionToElements(event, elem, property) {
      elem.forEach((item, i) => {
         item.addEventListener(event, () => {
            switch(item.nodeName) {
               case 'SPAN' :
                     state[property] = i;
                     break;
               case 'INPUT' :
                  if (item.getAttribute('type') === 'checkbox') {
                     i === 0 ? state[property] = "Холодное" : state[property] = "Тёплое";
                     elem.forEach((box, j) => {
                        box.checked = false;
                        if (i == j) {
                           box.checked = true;
                        }
                     });
                  } else {
                     state[property] = item.value;
                  }
                  break;
               case 'SELECT' :
                  state[property] = item.value;
                  break;
            }
            console.log(state);
         });
      });
   }
   bindActionToElements('click', windowForm, 'form');
   bindActionToElements('input', windowHeight, 'height');
   bindActionToElements('input', windowWidth, 'width');
   bindActionToElements('change', windowType, 'type');
   bindActionToElements('change', windowProfile, 'profile');
};

export default changeModalState;