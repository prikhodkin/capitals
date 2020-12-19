import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [ "name" ]

  send(evt) {
    evt.preventDefault();
    if (this.formValidate(this.element)) {
      const formData = new FormData(this.element);
      console.log(formData)
      this.ajaxSend('http://capitals.local/wp-admin/admin-ajax.php', 'post', formData).then((data) => console.log(data));
      alert('Отправлено');
      this.element.reset();
    } else {
      console.log("error")
    }
  }

  formValidate(form) {
    const fields = form.elements;
    let result = true;
    const phoneRegular = /^\d+$/;
    [].forEach.call(fields,(el)=> {
      const parent = el.parentElement;
      const label = parent.querySelector('.field__label');
      const tel = el.classList.contains('field__input--phone');
      const errorMessage = parent.dataset.message;
      const labelText = label.textContent;
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
    console.log(result)
    return result;
  }

  ajaxSend(url, method, data) {
    return fetch(url, {
      method: method,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        'Content-Type': 'application/x-www-form-urlencoded;'
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
        // console.log(response);
        return response.json();
      }
    )
    .catch(error => console.log(error))
  }
}
