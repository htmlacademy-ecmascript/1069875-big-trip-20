import FormView from '../view/form-view.js';
import { render } from '../framework/render.js';

export default class FormPresenter {
  #container = null;
  #event = null;
  #typeOffers = null;
  #destinations = null;

  #formComponent = null;

  constructor({ container, event, typeOffers, destinations }) {
    this.#container = container;
    this.#event = event;
    this.#typeOffers = typeOffers;
    this.#destinations = destinations;
  }

  init() {
    this.#formComponent = new FormView({
      event: this.#event,
      typeOffers: this.#typeOffers,
      destinations: this.#destinations,
    });
    render(this.#formComponent, this.#container);
  }
}
