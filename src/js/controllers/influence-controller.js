import {Controller} from 'stimulus';

const items = document.querySelectorAll(`.influence__item`);
const influenceButtons = document.querySelectorAll(`.influence__button`);

export default class extends Controller {
  static targets = [ `link` ];

  initialize() {}

  toggle(e) {
    e.preventDefault();

    const item = e.target.closest(`.influence__item`);
    const button = item.querySelector(`.influence__button`);

    if (!item.classList.contains(`influence__item--opened`)) {
      this.close();
    }

    item.classList.toggle(`influence__item--opened`);
    button.classList.toggle(`influence__button--opened`)
  }

  close() {
    items.forEach(it => {
      if(it.classList.contains(`influence__item--opened`)) {
        it.classList.remove(`influence__item--opened`)
      }
    })

    influenceButtons.forEach(it => {
      if(it.classList.contains(`influence__button--opened`)) {
        it.classList.remove(`influence__button--opened`)
      }
    })
  }
}
