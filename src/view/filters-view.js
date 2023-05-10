import { FILTERS_NAMES } from '../const.js';
import { createElement } from '../render.js';

function createFiltersItemTemplate(name) {
  return `<div class="trip-filters__filter">
            <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}">
            <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
          </div>`;
}

function createFiltersTemplate() {
  const filtersItems = FILTERS_NAMES.map((name) => createFiltersItemTemplate(name)).join('');

  return `<form class="trip-filters" action="#" method="get">
            <button class="visually-hidden" type="submit">Accept filter</button>
            ${filtersItems}
          </form>`;
}

export default class FiltersView {
  getTemplate() {
    return createFiltersTemplate();
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
