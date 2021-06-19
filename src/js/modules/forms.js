import checkNumInputs from "./checkNumInputs";


const forms = (state) => {
   // получаем элементы с которыми будем работать
   const form = document.querySelectorAll('form'),
         inputs = document.querySelectorAll('input');

   checkNumInputs('input[name="user_phone"]');
   // сообщения вывода пользователю в зависимости от результата отправки данных формы
   const message = {
      loading: 'Загружаем Ваши данные...',
      success: 'Успех! Ожидайте звонка нашего менеджера.',
      failure: 'Упс... Что то пошло не так...'
   };

   // отправка запроса на сервер
   const postData = async (url, data) => {
      document.querySelector('.status').textContent = message.loading;

      let res = await fetch(url, {
         method: 'POST',
         body: data,
      });
      return await res.text();
   };
   // очистка ВСЕХ инпутов форм
   const clearInputs = () => {
      inputs.forEach(item => {
         item.value = '';
      });
   };
   //  перебр всех форм
   // сбор введенных данных 
   form.forEach(item => {
      item.addEventListener('submit', (e) => {
         e.preventDefault();
         
         // вывод сообшений пользоваетлю
         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status');
         item.appendChild(statusMessage);
         
         // функция закрития модального окна после успешной отправки
         const hideModal = function() {
            const modal = document.querySelector('.popup_calc_end');
               modal.style.display = "none";
               document.body.style.overflow = "";
          };
          //фиксируем набраные данные для отправки на сервер
         const formData = new FormData(item);
         if(item.getAttribute('data-calc') === "end"){
            for(let key in state) {
               formData.append(key, state[key]);
            }
            setTimeout(() => {
               hideModal();
            }, 4000);
         }

      // отправка запроса на сервер по одресу:
         postData('assets/server.php', formData)
            .then(res => {
               // console.log(res);
               statusMessage.textContent = message.success;
            })
            .catch(() => {
               statusMessage.textContent = message.failure;
            }) 
            .finally(() => {
               clearInputs();
               setTimeout(() => {
                  statusMessage.remove();
               }, 6000);
            });
      });
   });
};

export default forms;