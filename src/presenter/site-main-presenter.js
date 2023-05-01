import SortingView from '../view/sorting-view.js';
import SortingItemView from '../view/sorting-item-view.js';
import { render } from '../render.js';

export default class SiteMainPresenter {
  sortingComponent = new SortingView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.sortingComponent, this.container);
    render(new SortingItemView(), this.sortingComponent.getElement());
  }
}

