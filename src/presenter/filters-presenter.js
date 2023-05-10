import FiltersView from '../view/filters-view.js';
import { render } from '../render.js';

export default class FiltersPresenter {
  filtersComponent = new FiltersView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.filtersComponent, this.container);
  }
}
