import EventsModel from '../model/events-model.js';
import OffersModel from '../model/offers-model.js';
import DestinationsModel from '../model/destinations-model.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersPresenter from './filters-presenter.js';
import SortingPresenter from './sorting-presenter.js';
import EventsListPresenter from './events-list-presenter.js';
import { getFilters } from '../mock/filters.js';
import { render, RenderPosition } from '../framework/render.js';

export default class AppPresenter {
  #tripMainElement = null;
  #filtersElement = null;
  #siteMainElement = null;

  #filtersComponent = null;
  #sortingComponent = null;
  #eventsComponent = null;

  #eventsModel = new EventsModel();
  #offersModel = new OffersModel();
  #destinationsModel = new DestinationsModel();

  #filters = getFilters(this.#eventsModel.events);

  constructor({ tripMainElement, filtersElement, siteMainElement }) {
    this.#tripMainElement = tripMainElement;
    this.#filtersElement = filtersElement;
    this.#siteMainElement = siteMainElement;
  }

  init() {
    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderSorting();
    this.#renderEventsList();
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
      filters: this.#filters,
    });
    this.#filtersComponent.init();
  }

  #renderSorting() {
    this.#sortingComponent = new SortingPresenter({
      container: this.#siteMainElement,
    });
    this.#sortingComponent.init();
  }

  #renderEventsList() {
    this.#eventsComponent = new EventsListPresenter({
      container: this.#siteMainElement,
      eventsModel: this.#eventsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
    });
    this.#eventsComponent.init();
  }
}