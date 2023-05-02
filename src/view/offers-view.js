import { createElement } from '../render.js';

function createOffersTemplate() {
  return '<div class="event__available-offers"></div>';
}

export default class OffersView {
  getTemplate() {
    return createOffersTemplate();
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
