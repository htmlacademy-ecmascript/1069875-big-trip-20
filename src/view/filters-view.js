import { FILTERS_NAMES } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFiltersItemTemplate(name) {
  return `<div class="trip-filters__filter">
            <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}">
            <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
          </div>`;
}

function createFiltersTemplate() {
  const filtersItemsTemplate = FILTERS_NAMES.map((name) => createFiltersItemTemplate(name)).join('');

  return `<form class="trip-filters" action="#" method="get">
            <button class="visually-hidden" type="submit">Accept filter</button>
            ${filtersItemsTemplate}
          </form>`;
}

export default class FiltersView extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}
