import { createElement } from '../render.js';

function createOffersListTemplate() {
  return '<div class="event__available-offers"></div>';
}

export default class OffersListView {
  getTemplate() {
    return createOffersListTemplate();
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
