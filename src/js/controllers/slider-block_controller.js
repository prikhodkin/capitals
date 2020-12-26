import Swiper from 'swiper/bundle';
import {Controller} from 'stimulus';

export default class extends Controller {
  static targets = [ `container`, `prev`, `next` ];
  connect() {
    this.init();
  }
  init() {
    const swiper = new Swiper(this.containerTarget, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      navigation: {
        nextEl: this.nextTarget,
        prevEl: this.prevTarget,
      },

    });
  }

}
