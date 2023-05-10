import TripInfoView from '../view/trip-info-view.js';
import FiltersPresenter from './filters-presenter.js';
import SortingPresenter from './sorting-presenter.js';
import EventsPresenter from './events-presenter.js';
import { render, RenderPosition } from '../render.js';

export default class AppPresenter {

  constructor({ tripMainElement, filtersElement, siteMainElement }) {
    this.tripMainElement = tripMainElement;
    this.filtersElement = filtersElement;
    this.siteMainElement = siteMainElement;
  }

  init() {
    this.filtersComponent = new FiltersPresenter({
      container: this.filtersElement,
    });
    this.sortingComponent = new SortingPresenter({
      container: this.siteMainElement,
    });
    this.eventsComponent = new EventsPresenter({
      container: this.siteMainElement,
    });
    render(new TripInfoView(), this.tripMainElement, RenderPosition.AFTERBEGIN);
    this.filtersComponent.init();
    this.sortingComponent.init();
    this.eventsComponent.init();
  }
}
