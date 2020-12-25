import { Controller } from "stimulus";

const menu = document.querySelector(`.menu__wrapper`);
const burger = document.querySelector(`.menu__burger`);
const logo = document.querySelector(`.header__logo`);
const overlay = document.querySelector(`.overlay-menu`);
const logoImg = logo.querySelector(`img`);
const logoWhiteSrc = "img/logo.svg";
const logoDarkSrc = "img/logo@dark.svg";

export default class extends Controller {
  static targets = [`link, close-link`]

  initialize() {}

  toggle(e) {
    e.preventDefault();

    // Проверяем наличие классов для внутренних страниц с логотипом другого цвета
    // Меняем лого
    if (logo.classList.contains(`header-inside__logo`) && !logo.classList.contains(`header__logo--opened`)) {
      logoImg.src = logoWhiteSrc;
    }

    if (logo.classList.contains(`header-inside__logo`) && logo.classList.contains(`header__logo--opened`)) {
      logoImg.src = logoDarkSrc;
    }
    //

    menu.classList.toggle(`menu__wrapper--opened`);
    burger.classList.toggle(`menu__burger--opened`);
    logo.classList.toggle(`header__logo--opened`);
    overlay.classList.toggle(`overlay-menu--opened`);
    document.body.classList.toggle(`overlay-body__body`);
  }
}
