import { createElement } from '../render.js';

function createFormTemplate() {
  return '<form class="event event--edit" action="#" method="post"></form>';
}

export default class FormView {
  getTemplate() {
    return createFormTemplate();
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
