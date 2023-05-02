import { createElement } from '../render.js';

function createFormAdditionTemplate() {
  return '<section class="event__details"></section>';
}

export default class FormAdditionView {
  getTemplate() {
    return createFormAdditionTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
