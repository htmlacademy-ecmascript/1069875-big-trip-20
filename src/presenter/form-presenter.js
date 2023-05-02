import FormView from '../view/form-view.js';
import FormMainView from '../view/form-main-view.js';
import { render/*, RenderPosition*/ } from '../render.js';

export default class FormPresenter {
  formComponent = new FormView();
  formMainComponent = new FormMainView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.formComponent, this.container);
    render(this.formMainComponent, this.formComponent.getElement());
  }
}
