import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import FormPresenter from './form-presenter.js';
import { render, replace } from '../framework/render.js';
import { isKeyEscape } from '../utils.js';

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

    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(event) {
    const typeOffers = this.#offers.get(event.type);

    const eventComponent = new EventView({
      event,
      typeOffers,
      onEditBtnClick: () => {
        switchEventToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const formPresenter = new FormPresenter({
      event,
      typeOffers,
      destinations: this.#destinations,
      container: this.#eventsListComponent.element,
      closeForm: () => {
        switchFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function switchEventToForm() {
      replace(formPresenter.component, eventComponent);
    }

    function switchFormToEvent() {
      replace(eventComponent, formPresenter.component);
    }

    function escKeyDownHandler(evt) {
      if (!isKeyEscape(evt)) {
        return;
      }
      evt.preventDefault();
      switchFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(eventComponent, this.#eventsListComponent.element);
  }
}
