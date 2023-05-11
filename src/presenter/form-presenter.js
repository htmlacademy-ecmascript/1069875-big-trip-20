import FormView from '../view/form-view.js';
import { render } from '../render.js';

export default class FormPresenter {
  constructor({ container }) {
    this.container = container;
  }

  init() {
    this.formComponent = new FormView();
    render(this.formComponent, this.container);
  }
}
