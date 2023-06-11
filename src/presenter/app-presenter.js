import EventsModel from '../model/events-model.js';
import OffersModel from '../model/offers-model.js';
import DestinationsModel from '../model/destinations-model.js';
import FilterModel from '../model/filter-model.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersPresenter from './filters-presenter.js';
import BoardPresenter from './board-presenter.js';
import { render, RenderPosition } from '../framework/render.js';

export default class AppPresenter {
  #tripMainElement = null;
  #filtersElement = null;
  #siteMainElement = null;

  #filtersComponent = null;
  #eventsComponent = null;

  #eventsModel = new EventsModel();
  #offersModel = new OffersModel();
  #destinationsModel = new DestinationsModel();
  #filterModel = new FilterModel();

  constructor({ tripMainElement, filtersElement, siteMainElement }) {
    this.#tripMainElement = tripMainElement;
    this.#filtersElement = filtersElement;
    this.#siteMainElement = siteMainElement;
  }

  init() {
    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderBoard();
  }

  #renderTripInfo() {
    render(
      new TripInfoView(),
      this.#tripMainElement,
      RenderPosition.AFTERBEGIN
    );
  }

  #renderFilters() {
    this.#filtersComponent = new FiltersPresenter({
      container: this.#filtersElement,
      filterModel: this.#filterModel,
      eventsModel: this.#eventsModel,
    });
    this.#filtersComponent.init();
  }

  #renderBoard() {
    this.#eventsComponent = new BoardPresenter({
      container: this.#siteMainElement,
      eventsModel: this.#eventsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      filterModel: this.#filterModel,
    });
    this.#eventsComponent.init();
  }
}
