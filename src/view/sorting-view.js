import { SORTING_NAMES } from '../const.js';
import { createElement } from '../render.js';

function createSortingItemTemplate(name) {
  return `<div class="trip-sort__item  trip-sort__item--${name}">
            <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}">
            <label class="trip-sort__btn" for="sort-${name}">${name}</label>
          </div>`;
}

function createSortingTemplate() {
  const sortingItems = SORTING_NAMES.map((name) => createSortingItemTemplate(name)).join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${sortingItems}</form>`;
}

export default class SortingView {
  getTemplate() {
    return createSortingTemplate();
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
