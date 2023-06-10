import EventsListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';
import SortingView from '../view/sorting-view.js';
import EventPresenter from './event-presenter.js';
import { render, remove } from '../framework/render.js';
import { NoEventsMessages, SortingNames } from '../const.js';
import { sortByTime, sortByPrice } from '../utils.js';

export default class BoardPresenter {
  #container = null;

  #eventsListComponent = null;
  #sortingComponent = null;
  #noEventsComponent = null;

  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #eventsPresenters = new Map();

  #currentSorting = SortingNames.DAY;

  constructor({ container, eventsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#renderBoard();
  }

  get events() {
    switch (this.#currentSorting) {
      case SortingNames.TIME:
        return this.#eventsModel.events.sort(sortByTime);
      case SortingNames.PRICE:
        return this.#eventsModel.events.sort(sortByPrice);
    }

    return this.#eventsModel.events;
  }

  #renderBoard() {
    if (!this.events.length) {
      this.#renderNoEvents(NoEventsMessages.ALL);
      return;
    }

    this.#renderSorting();
    this.#renderEventsList();
  }

  #clearBoard() {
    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
      this.#noEventsComponent = null;
    }
    if (this.#sortingComponent) {
      remove(this.#sortingComponent);
      this.#sortingComponent = null;
    }
    if (this.#eventsListComponent) {
      remove(this.#eventsListComponent);
      this.#eventsListComponent = null;
      if (this.#eventsPresenters.size) {
        this.#clearEventsList();
      }
    }
  }

  #renderNoEvents(message) {
    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }
    this.#noEventsComponent = new NoEventsView({ message });
    render(this.#noEventsComponent, this.#eventsListComponent.element);
  }

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      onSortingClick: this.#handleSortingClick,
    });
    render(this.#sortingComponent, this.#container);
  }

  #renderEventsList() {
    this.#eventsListComponent = new EventsListView();
    render(this.#eventsListComponent, this.#container);
    this.#renderEvents();
  }

  #clearEventsList() {
    this.#eventsPresenters.forEach((presenter) => presenter.destroy());
    this.#eventsPresenters.clear();
  }

  #renderEvents() {
    if (!this.events.length) {
      this.#renderNoEvents(NoEventsMessages.ALL);
      return;
    }
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onEventChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventsPresenters.set(event.id, eventPresenter);
  }

  #handleSortingClick = (sortType) => {
    if (sortType === this.#currentSorting) {
      return;
    }
    this.#currentSorting = sortType;
    this.#clearEventsList();
    this.#renderEvents();
  };

  #handleEventChange = (updatedEvent) => {
    //
    this.#eventsPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventsPresenters.forEach((presenter) => presenter.resetView());
  };
}