import FormView from '../view/form-view.js';
import { render } from '../render.js';

export default class FormPresenter {
  constructor({ container, event, typeOffers, destinations }) {
    this.container = container;
    this.event = event;
    this.typeOffers = typeOffers;
    this.destinations = destinations;
  }

  init() {
    this.formComponent = new FormView({ event: this.event, typeOffers: this.typeOffers, destinations: this.destinations });
    render(this.formComponent, this.container);
  }
}
