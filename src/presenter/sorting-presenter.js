import SortingView from '../view/sorting-view.js';
import { render } from '../framework/render.js';

export default class SortingPresenter {
  #container = null;

  #sortingComponent = new SortingView();

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    render(this.#sortingComponent, this.#container);
  }
}

