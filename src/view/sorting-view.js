import { SORTING_NAMES } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortingItemTemplate(name) {
  return `<div class="trip-sort__item  trip-sort__item--${name}">
            <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}">
            <label class="trip-sort__btn" for="sort-${name}">${name}</label>
          </div>`;
}

function createSortingTemplate() {
  const sortingItemsTemplate = SORTING_NAMES.map((name) => createSortingItemTemplate(name)).join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${sortingItemsTemplate}</form>`;
}

export default class SortingView extends AbstractView {
  get template() {
    return createSortingTemplate();
  }
}
