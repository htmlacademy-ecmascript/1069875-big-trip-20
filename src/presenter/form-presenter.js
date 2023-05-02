import FormView from '../view/form-view.js';
import FormMainView from '../view/form-main-view.js';
import FormDetailsView from '../view/form-details-view.js';
import FormSectionView from '../view/form-section-view.js';
import OffersPresenter from './offers-presenter.js';
import DescriptionView from '../view/description-view.js';
import { render } from '../render.js';

export default class FormPresenter {
  formComponent = new FormView();
  formMainComponent = new FormMainView();
  formDetailsComponent = new FormDetailsView();
  offersSectionComponent = new FormSectionView();
  offersComponent = new OffersPresenter({ container: this.offersSectionComponent.getElement() });
  descriptionSectionComponent = new FormSectionView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.formComponent, this.container);
    render(this.formMainComponent, this.formComponent.getElement());
    render(this.formDetailsComponent, this.formComponent.getElement());
    render(this.offersSectionComponent, this.formDetailsComponent.getElement());
    this.offersComponent.init();
    render(this.descriptionSectionComponent, this.formDetailsComponent.getElement());
    render(new DescriptionView(), this.descriptionSectionComponent.getElement());
  }
}
