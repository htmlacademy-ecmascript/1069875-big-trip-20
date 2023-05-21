import AbstractView from '../framework/view/abstract-view.js';

function createFiltersItemTemplate({ name, isActive }, index) {
  const isCheckedAttribute = index === 0 ? 'checked' : '';
  const isActiveAttribute = isActive ? '' : 'disabled';
  return `<div class="trip-filters__filter">
            <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isCheckedAttribute} ${isActiveAttribute}>
            <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
          </div>`;
}

function createFiltersTemplate(filters) {
  const filtersItemsTemplate = filters
    .map((filter, index) => createFiltersItemTemplate(filter, index))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
            <button class="visually-hidden" type="submit">Accept filter</button>
            ${filtersItemsTemplate}
          </form>`;
}

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
