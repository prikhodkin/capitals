import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import IMask from 'imask';

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/);

const infinity = document.querySelector('.promo__accent b');
const inputs = document.querySelectorAll('.field__input');
const phones = document.querySelectorAll(`.field__input--phone`);
const textareas = document.querySelectorAll('.field__textarea');

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




