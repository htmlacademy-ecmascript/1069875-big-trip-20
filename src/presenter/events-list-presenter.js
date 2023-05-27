import EventsListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';
import EventPresenter from './event-presenter.js';
import { render } from '../framework/render.js';
import { NoEventsMessages } from '../const.js';

export default class EventsListPresenter {
  #container = null;

  #eventsListComponent = new EventsListView();

  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #events = [];
  #offers = null;
  #destinations = null;

  constructor({ container, eventsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationsModel.destinations;
    this.#renderEventsList();
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#container);

    if (!this.#events.length) {
      render(
        new NoEventsView({ message: NoEventsMessages.ALL }),
        this.#eventsListComponent.element
      );
      return;
    }

    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      offers: this.#offers,
      destinations: this.#destinations,
    });
    eventPresenter.init(event);
  }
}
