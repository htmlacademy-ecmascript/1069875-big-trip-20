import { SortingNames, EVENT_ITEMS } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortingItemTemplate(name) {
  const isActiveSorting = SortingNames[name.toUpperCase()];
  const attribute = isActiveSorting
    ? `data-sort-type=${isActiveSorting}`
    : 'disabled';

  return `<div class="trip-sort__item  trip-sort__item--${name}">
            <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${attribute}>
            <label class="trip-sort__btn" for="sort-${name}">${name}</label>
          </div>`;
}

function createSortingTemplate() {
  const sortingItemsTemplate = EVENT_ITEMS.map((item) =>
    createSortingItemTemplate(item)
  ).join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${sortingItemsTemplate}</form>`;
}

export default class SortingView extends AbstractView {
  #handleSortingClick = null;

  constructor({ onSortingClick }) {
    super();
    this.#handleSortingClick = onSortingClick;
    this.element
      .addEventListener('click', this.#onSortingClickHandler);
  }

  get template() {
    return createSortingTemplate();
  }

  #onSortingClickHandler = (evt) => {
    if (!evt.target.dataset.sortType) {
      return;
    }
    this.#handleSortingClick(evt.target.dataset.sortType);
  };
}
