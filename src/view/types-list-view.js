import { createElement } from '../render.js';

function createTypesListTemplate() {
  return `<fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
          </fieldset>`;
}

export default class TypesListView {
  getTemplate() {
    return createTypesListTemplate();
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
