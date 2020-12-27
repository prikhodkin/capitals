// class SendForm {
//   constructor(evt) {
//     console.log(global.ajax_url)
//     this._send(evt);
//   }

//   _ajaxSend(url, method, data) {
//     return fetch(url, {
//       method: method,
//       headers: {
//         "X-Requested-With": "XMLHttpRequest"
//       },
//       body: data
//     })
//       .then(
//         function (response) {
//           if (response.status !== 200) {
//             console.log('Looks like there was a problem. Status Code: ' +
//               response.status);
//             return;
//           }
//           return response.json();
//         }
//       )
//       .catch(error => console.log(error))
//   }

//   _send(evt) {
//     console.log("test")
//     const {target} = evt;
//     evt.preventDefault();
//     console.log(target);
//     const formData = new FormData(target);
//     console.log(formData);
//     if (this._formValidate(target)) {
//       this._ajaxSend(global.ajax_url, 'post', formData).then((data) => console.log(data));
//       target.reset();
//     } else {
//       console.log("error")
//     }
//   }

//   _formValidate(form) {
//     const fields = form.elements;
//     let result = true;
//     const phoneRegular = /^\d+$/;
//     [].forEach.call(fields,(el)=> {
//       const parent = el.parentElement;
//       let label = parent.querySelector('label');
//       // Переопределяем если у элемента отсутствует label (кнопки управления, кастомные селекты)
//       if (!label) {
//         // Проверяем элемент на наличие кнопки отправки
//         if(parent.classList.contains('offers__controls')) {
//           return
//         }
//         // Переопределяем в кастомном селекте
//         label = parent.closest('.offers__item').querySelector('label');
//       }
//       const tel = el.classList.contains('field__input--phone');
//       const errorMessage = parent.dataset.message;
//       const labelText = label.getAttribute('data-description');
//       if (
//         (el.required && el.value.length < 1) ||
//         (tel && el.value.length < 18 && !phoneRegular.test(el.value)) ||
//         (el.inputMode === 'email' && el.value.length >= 1 && el.value.indexOf("@") < 1)
//       ) {

//         if(el.value.length < 1) {
//           label.innerHTML = 'Поле должно быть заполнено'
//         } else {
//           label.innerHTML = errorMessage;
//         }

//         parent.classList.add('field--no-empty')
//         parent.classList.add('field--error')

//         setTimeout(function () {
//           parent.classList.remove('field--error')
//           label.innerHTML = labelText;
//           if(el.value.length === 0) {
//             parent.classList.remove('field--no-empty')
//           }
//         }, 2000);
//         result = false;
//       }
//     })
//     return result;
//   }
// }

const ajaxSend = (url, method, data) => {
  return fetch(url, {
    method: method,
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    body: data
  })
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        return response.json();
      }
    )
    .catch(error => console.log(error))
}

const formValidate = (form) => {
  const fields = form.elements;
  let result = true;
  const phoneRegular = /^\d+$/;
  [].forEach.call(fields,(el)=> {
    const parent = el.parentElement;
    let label = parent.querySelector('label');
    // Переопределяем если у элемента отсутствует label (кнопки управления, кастомные селекты)
    if (!label) {
      // Проверяем элемент на наличие кнопки отправки
      if(parent.classList.contains('offers__controls')) {
        return
      }
      // Переопределяем в кастомном селекте
      label = parent.closest('.offers__item').querySelector('label');
    }
    const tel = el.classList.contains('field__input--phone');
    const errorMessage = parent.dataset.message;
    const labelText = label.getAttribute('data-description');
    if (
      (el.required && el.value.length < 1) ||
      (tel && el.value.length < 18 && !phoneRegular.test(el.value)) ||
      (el.inputMode === 'email' && el.value.length >= 1 && el.value.indexOf("@") < 1)
    ) {

      if(el.value.length < 1) {
        label.innerHTML = 'Поле должно быть заполнено'
      } else {
        label.innerHTML = errorMessage;
      }

      parent.classList.add('field--no-empty')
      parent.classList.add('field--error')

      setTimeout(function () {
        parent.classList.remove('field--error')
        label.innerHTML = labelText;
        if(el.value.length === 0) {
          parent.classList.remove('field--no-empty')
        }
      }, 2000);
      result = false;
    }
  })
  return result;
}

const send = (evt) => {
  evt.preventDefault();
  console.log("test")
  const {target} = evt;
  console.log(target);
  const formData = new FormData(target);
  console.log(formData);
  if (formValidate(target)) {
    ajaxSend(global.ajax_url, 'post', formData).then((data) => console.log(data));
    target.reset();
  } else {
    console.log("error")
  }
}

export {send};
