import Swiper from 'swiper/bundle';
import {Controller} from 'stimulus';

export default class extends Controller {
  static targets = [ `container`, `prev`, `next` ]
  connect() {
    if(window.matchMedia('(min-width: 1199px)').matches){
      this.init();
    }
  }
  init() {
    const swiper = new Swiper(this.containerTarget, {
      slidesPerView: 'auto',
      spaceBetween: 49,
      navigation: {
        nextEl: this.nextTarget,
        prevEl: this.prevTarget,
      },

    });
  }

}
