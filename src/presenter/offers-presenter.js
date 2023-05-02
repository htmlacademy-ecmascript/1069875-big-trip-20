import OffersView from '../view/offers-view.js';
import OffersItemView from '../view/offers-item-view.js';
import { render } from '../render.js';

export default class OffersPresenter {
  offersComponent = new OffersView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.offersComponent, this.container);
    render(new OffersItemView(), this.offersComponent.getElement());
  }
}
