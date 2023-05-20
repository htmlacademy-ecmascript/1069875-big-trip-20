import FiltersView from '../view/filters-view.js';
import { render } from '../framework/render.js';

export default class FiltersPresenter {
  #container = null;

  #filtersComponent = null;

  constructor({ container, filters }) {
    this.#container = container;
    this.#filtersComponent = new FiltersView({ filters });
  }

  init() {
    render(this.#filtersComponent, this.#container);
  }
}
