import FormView from '../view/form-view.js';
import { render } from '../framework/render.js';

export default class FormPresenter {
  #container = null;

  #formComponent = null;

  constructor({ container, event, typeOffers, destinations, closeForm }) {
    this.#container = container;
    this.#formComponent = new FormView({
      event,
      typeOffers,
      destinations,
      closeForm,
    });
  }

  init() {
    render(this.#formComponent, this.#container);
  }

  get component() {
    return this.#formComponent;
  }
}
