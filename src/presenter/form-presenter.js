import FormView from '../view/form-view.js';
import { render } from '../framework/render.js';

export default class FormPresenter {
  #container = null;

  constructor({
    container,
    event,
    typeOffers,
    destinations,
    closeForm,
    onFormSubmit,
  }) {
    this.#container = container;
    this.formComponent = new FormView({
      event,
      typeOffers,
      destinations,
      closeForm,
      onFormSubmit,
    });
  }

  init() {
    render(this.formComponent, this.#container);
  }
}
