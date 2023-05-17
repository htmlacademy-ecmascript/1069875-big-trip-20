import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import FormPresenter from './form-presenter.js';
import { render } from '../framework/render.js';

export default class EventsPresenter {
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

    render(this.#eventsListComponent, this.#container);

    this.formComponent = new FormPresenter({
      container: this.#eventsListComponent.element,
      event: this.#events[0],
      typeOffers: this.#offers.get(this.#events[0].type),
      destinations: this.#destinations,
    });
    this.formComponent.init();

    for (let i = 1; i < this.#events.length; i++) {
      const event = this.#events[i];
      const typeOffers = this.#offers.get(event.type);
      render(
        new EventView({ event, typeOffers }),
        this.#eventsListComponent.element
      );
    }
  }
}

