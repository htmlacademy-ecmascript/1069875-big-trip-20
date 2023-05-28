import EventsListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';
import SortingView from '../view/sorting-view.js';
import EventPresenter from './event-presenter.js';
import { render } from '../framework/render.js';
import { NoEventsMessages, SortingNames } from '../const.js';
import { sortByTime, sortByPrice, sortMap } from '../utils.js';

export default class EventsListPresenter {
  #container = null;

  #eventsListComponent = new EventsListView();
  #sortingComponent = null;

  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #events = null;
  #sourcedEvents = null;
  #offers = null;
  #destinations = null;

  #eventPresenters = new Map();

  #currentSorting = SortingNames.DAY;

  constructor({ container, eventsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#events = new Map(
      this.#eventsModel.events.map((event) => [event.id, event])
    );
    this.#sourcedEvents = new Map(this.#events);
    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationsModel.destinations;
    this.#renderSorting();
    this.#renderEventsList();
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#container);

    if (!this.#events.size) {
      render(
        new NoEventsView({ message: NoEventsMessages.ALL }),
        this.#eventsListComponent.element
      );
      return;
    }
    this.#renderEvents();
  }

  #renderEvents() {
    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      offers: this.#offers,
      destinations: this.#destinations,
      onEventChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      onSortingClick: this.#handleSortingClick,
    });
    render(this.#sortingComponent, this.#eventsListComponent.element);
  }

  #sortEvents(sortType) {
    this.#currentSorting = sortType;
    switch (sortType) {
      case SortingNames.TIME:
        this.#events = sortMap(this.#sourcedEvents, sortByTime);
        break;
      case SortingNames.PRICE:
        this.#events = sortMap(this.#sourcedEvents, sortByPrice);
        break;
      default:
        this.#events = new Map(this.#sourcedEvents);
    }
  }

  #handleSortingClick = (sortType) => {
    if (sortType === this.#currentSorting) {
      return;
    }
    this.#sortEvents(sortType);
    this.#clearEventsList();
    this.#renderEvents();
  };

  #handleEventChange = (updatedEvent) => {
    this.#events.set(updatedEvent.id, updatedEvent);
    this.#sourcedEvents.set(updatedEvent.id, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };
}
