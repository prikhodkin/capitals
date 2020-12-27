import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import IMask from 'imask';
import {debounce} from "./util";
import Tabs from "%modules%/tabs/tabs";
import Typewriter from 'typewriter-effect/dist/core';
import SendForm from './util/send-form';
// formmm()
const application = Application.start()
const context = require.context("./controllers", true, /\.js$/);
const WORD_DELAY = 50;

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


const stepsButton = document.querySelector(`.how-order__button`);
const stepsList = document.querySelector(`.steps`);

if(stepsList) {

stepsButton.addEventListener(`click`, () => {
  stepsList.classList.remove(`steps--hidden`);
  stepsButton.style.display = `none`;
})

}

function getCoords(elem) { // кроме IE8-
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

const about = document.querySelector(`.about`);
const cta = document.querySelector(`.cta`);
const consultation = document.querySelector(`.consultation`);
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

  if(window.pageYOffset >= (getCoords(consultation).top - 150)) {
    consultation.classList.add(`consultation--active`);
  }
})

function animateChat() {
  // Массив временных промежутков, за каждый из которых текст полностью печатается в определенном блоке
  const timerArray = getTimeArray();

  // Объявляем переменную задержки времени между блоками
  let time;

  chatMessages.forEach((item,index) => {
    const text = item.querySelector(`.chat__text`);
    // const time = text.getAttribute(`data-time`);

    // Переопределяем задержку времени для кажого блока в зависимости от итерации
    timerArray[index] == 0 ? time = 0 : time = time + timerArray[index] + 1100;

    // Отрисовываем текст
    setTimeout(() => {
      // Отображаем блок
      item.classList.add(`chat__item--active`);

      setTimeout(() => {
        writeText(text)
      }, 300)
    }, time)
  });
  isChatAnimate = false;
}

/**
 * Автоматический набор текста
  txt : блок с текстом
  word : текст из дата атрибута
  wordArray : разбивает строку текста на отдельные буквы и записывает в массив
 *
 */
const writeText = (txt) => {
  const word = txt.getAttribute(`data-word`);
  const wordArray = word.split('')

  for (let i = 0; i < wordArray.length; i++) {
    setTimeout(()=>{
      txt.innerHTML = txt.innerHTML + wordArray[i];
    }, WORD_DELAY * i)
  }
}

// Получает массив задержек, за сколько отрисовывается КАЖДЫЙ текст в блоке по отдельности, задержку от нулевого индекса приравниваем к 0
const getTimeArray = () => {
  const timer = [0];

  chatMessages.forEach((item) => {
    // Находит длину каждого текста и умножает на задержку между буквами
    const time = item.querySelector(`.chat__text`).getAttribute(`data-word`).length * WORD_DELAY;
    // Пушит новое значение в массив
    timer.push(time);
  })
  return timer;
}

document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

const form = document.querySelector('.popup__form');
const offersForm = document.querySelector('.offers__form');

form.addEventListener('submit', function(evt) {
  new SendForm(evt);
});

if (offersForm) {
  offersForm.addEventListener('submit', function(evt) {
    new SendForm(evt);
  });
}

var map;

        // Функция initMap которая отрисует карту на странице
        function initMap() {

            // В переменной map создаем объект карты GoogleMaps и вешаем эту переменную на <div id="map"></div>
            map = new google.maps.Map(document.getElementById('map'), {
                // При создании объекта карты необходимо указать его свойства
                // center - определяем точку на которой карта будет центрироваться
                center: {lat: -34.397, lng: 150.644},
                // zoom - определяет масштаб. 0 - видно всю платнеу. 18 - видно дома и улицы города.
                zoom: 8
            });
        }
