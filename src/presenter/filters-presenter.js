import FiltersView from '../view/filters-view.js';
import FiltersItemView from '../view/filters-item-view.js';
import { render, RenderPosition } from "../render.js";

export default class FiltersPresenter {
  filtersComponent = new FiltersView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.filtersComponent, this.container);
    render(
      new FiltersItemView(),
      this.filtersComponent.getElement(),
      RenderPosition.AFTERBEGIN
    );
  }
}
