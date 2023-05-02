import OffersListView from '../view/offers-list-view.js';
import OffersItemView from '../view/offers-item-view.js';
import { render } from '../render.js';

export default class OffersPresenter {
  offersListComponent = new OffersListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.offersListComponent, this.container);
    render(new OffersItemView(), this.offersListComponent.getElement());
  }
}
