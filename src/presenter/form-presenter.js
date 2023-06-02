import FormView from '../view/form-view.js';
import { render } from '../framework/render.js';

export default class FormPresenter {
  #container = null;

  constructor({
    container,
    event,
    offersModel,
    destinationsModel,
    closeForm,
    onFormSubmit,
  }) {
    this.#container = container;
    this.formComponent = new FormView({
      event,
      offersModel,
      destinationsModel,
      closeForm,
      onFormSubmit,
    });
  }

  init() {
    render(this.formComponent, this.#container);
  }
}
