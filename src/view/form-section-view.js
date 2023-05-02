import { createElement } from '../render.js';

function createFormSectionTemplate() {
  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          </section>`;
}

export default class FormSectionView {
  getTemplate() {
    return createFormSectionTemplate();
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
