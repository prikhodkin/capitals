import NativejsSelect from 'nativejs-select';

import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [ "input" ]

  connect() {
    this.init();

    console.log('init')
  }

  init() {
    new NativejsSelect({
      selector: '.select__input'
    });
  }
}
