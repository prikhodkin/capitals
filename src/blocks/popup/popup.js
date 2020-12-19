class Popup {
  constructor(popup) {

    this.popup = popup
    this.name = this.popup.getAttribute('data-popup');
    this.open_btn = document.querySelectorAll('.get-popup[data-popup="' + this.name + '"]');
    this.popupClose = this.popup.querySelector('.popup__close');
    this.closer = this.popup.querySelector('.button--close');


    this.events();
  }
  events() {

    this.open_btn.forEach(btn => {
      btn.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.openPopup();
      });
    });

    if (this.closer) {

      this.closer.addEventListener('click', () => {
        this.hidePopup();
      });
    }

    document.body.addEventListener('click', (e) => {
      if(e.target.classList.contains('popup__wrapper')){
        this.hidePopup();
      }
    });

    this.popupClose.addEventListener('click', () => {
      this.hidePopup();
    });

    window.addEventListener('keydown', (e) => {
      if(e.keyCode === 27){
        this.hidePopup();
      }
    });
  }

  openPopup() {
    let prevPopup = document.querySelector('.popup.opened');
    if(prevPopup) {
      prevPopup.classList.remove('opened');
    }
    this.popup.classList.add('opened');
    document.body.classList.add('lock');
  }

  hidePopup() {
    this.popup.classList.remove('opened');
    document.body.classList.remove('lock');
  }
}

class PopupThanks extends Popup {
  constructor(popup) {
    super(popup);

    this.isOpened = false;
    this.closer = this.popup.querySelector('.popup__close');
  }

  events() {
    this.hidePopup();
  }
  openPopup() {
    super.openPopup();
    this.isOpened = true;
  }

  hidePopup() {
    super.hidePopup();
    this.isOpened = false;
  }
}


export {Popup, PopupThanks};
