import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import IMask from 'imask';
import {debounce} from "./util";
import Tabs from "%modules%/tabs/tabs";
import Typewriter from 'typewriter-effect/dist/core';
const application = Application.start()
const context = require.context("./controllers", true, /\.js$/);

const infinity = document.querySelector('.promo__accent b');
const inputs = document.querySelectorAll('.field__input');
const phones = document.querySelectorAll(`.field__input--phone`);
const textareas = document.querySelectorAll('.field__textarea');
const tabs = document.querySelectorAll(`.tabs`);
const phoneOption = {
  mask: '{+7} (000) 000-00-00',
  lazy: true
}

application.load(definitionsFromContext(context));

function fixTextareaSize(textarea) {
  textarea.style.height = textarea.scrollHeight + 2 + "px"
}

function addInfinity() {
  for (let i = 2; i <= 200; i++) {
    setTimeout(() => {
      if(i === 200) {
        infinity.innerHTML = '∞'
        infinity.parentNode.classList.add('promo__accent--big')
      } else {
        infinity.innerHTML = i;
      }
    }, i * 17)
  }
}

tabs.forEach(item => new Tabs(item));


// Инициализация маски для телефона
phones.forEach((item) => {
  const mask = IMask(item, phoneOption);
  item.addEventListener('focus', function() {
    mask.updateOptions({ lazy: false });
  }, true);
  item.addEventListener('blur', function() {
    mask.updateOptions({ lazy: true });
    if (!mask.masked.rawInputValue) {
      mask.value = '';
      item.parentNode.classList.remove('field--no-empty');
    }
  }, true);
});

inputs.forEach((item) => {
  item.addEventListener('input', () => {
    if(item.value.length > 0) {
      item.parentNode.classList.add('field--no-empty');
    } else {
      console.log('ff')
      item.parentNode.classList.remove('field--no-empty');
    }
  })
})

textareas.forEach((item) => {
  item.addEventListener('input', function (e) { fixTextareaSize(e.target) })
  fixTextareaSize(item)
})

if(infinity) {
  addInfinity()
}




// function formValidate(form)
// {
//   const fields = form.elements;
//   let result = true;
//   const phoneRegular = /^\d+$/;
//   [].forEach.call(fields,(el)=> {
//     const parent = el.parentElement;
//     const label = parent.querySelector('.field__label');
//     const tel = el.classList.contains('field__input--phone');
//     const errorMessage = parent.dataset.message;
//     const labelText = label.textContent;
//     if (
//         (el.required && el.value.length < 1) ||
//         (tel && el.value.length < 18 && !phoneRegular.test(el.value)) ||
//         (el.inputMode === 'email' && el.value.length >= 1 && el.value.indexOf("@") < 1)
//       ) {
//
//       if(el.value.length < 1) {
//         label.innerHTML = 'Поле должно быть заполнено'
//       } else {
//         label.innerHTML = errorMessage;
//       }
//
//       parent.classList.add('field--no-empty')
//       parent.classList.add('field--error')
//
//       setTimeout(function () {
//         parent.classList.remove('field--error')
//         label.innerHTML = labelText;
//         if(el.value.length === 0) {
//           parent.classList.remove('field--no-empty')
//         }
//       }, 2000);
//       result = false;
//     }
//   })
//   console.log(result)
//   return result;
// }

// const forms = document.querySelectorAll('.popup__form');
//
// forms.forEach((item) => {
//   const button = item.querySelector('.popup__button');
//
//   button.addEventListener('click', function (evt) {
//     evt.preventDefault();
//     formValidate(item);
//   })
// })


function getCoords(elem) { // кроме IE8-
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

const about = document.querySelector(`.about`);
const cta = document.querySelector(`.cta`);
const chatMessages = document.querySelectorAll(`.chat__item`);
let isChatAnimate = true;

window.addEventListener(`scroll`, () => {
  if(window.pageYOffset >= (getCoords(about).top - 150)) {
    if(isChatAnimate) {
      animateChat();
    }
  }

  if(window.pageYOffset >= (getCoords(cta).top - 150)) {
    cta.classList.add(`cta--active`);
  }
})

function animateChat() {
  chatMessages.forEach((item,index) => {
    const text = item.querySelector(`.chat__text`);
    const time = text.getAttribute(`data-time`);

    setTimeout(() => {
      item.classList.add(`chat__item--active`);
      setTimeout(() => {
        addWriteText(text);
      }, 300)
    }, index * time)
  });
  isChatAnimate = false;
}

function addWriteText(target) {
  const word = target.getAttribute(`data-word`);
  const writer = new Typewriter(target, {
    strings: word,
    autoStart: true,
    loop: false,
    delay: 50,
    cursor: '',
  })
}
