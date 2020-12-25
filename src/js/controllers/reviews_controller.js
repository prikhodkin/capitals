import Swiper from 'swiper/bundle';
import {Controller} from 'stimulus';

export default class extends Controller {
  static targets = [ `container`, `prev`, `next`, `inner` ]
  connect() {
    this.init();
  }
  init() {
    const swiper = new Swiper(this.containerTarget, {
      loop: true,
      navigation: {
        nextEl: this.nextTarget,
        prevEl: this.prevTarget,
      },
      breakpoints: {
        768: {
          slidesPerView: 'auto',
          spaceBetween: 50,
        },
        1200: {
          slidesPerView: 'auto',
          spaceBetween: 157,
        },
      }

    });

    this.innerTargets.forEach((item) => {
      const inner = new Swiper(item, {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1200: {
            slidesPerView: 'auto',
            autoplay: false
          },
        }

      });
    })


  }

}
