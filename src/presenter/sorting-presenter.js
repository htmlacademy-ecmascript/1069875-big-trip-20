import SortingView from '../view/sorting-view.js';
import { render } from '../render.js';

export default class SortingPresenter {
  sortingComponent = new SortingView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.sortingComponent, this.container);
  }
}

