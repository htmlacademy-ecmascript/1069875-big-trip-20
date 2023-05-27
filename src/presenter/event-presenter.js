import EventView from '../view/event-view.js';
import FormPresenter from './form-presenter.js';
import { render, replace, remove } from '../framework/render.js';
import { isKeyEscape } from '../utils.js';

export default class EventPresenter {
  #container = null;

  #event = null;

  #eventComponent = null;
  #formPresenter = null;

  #offers = null;
  #destinations = null;

  constructor({ container, offers, destinations }) {
    this.#container = container;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init(event) {
    this.#event = event;
    const typeOffers = this.#offers.get(event.type);

    const prevEventComponent = this.#eventComponent;
    const prevFormPresenter = this.#formPresenter;

    this.#eventComponent = new EventView({
      event: this.#event,
      typeOffers,
      onEditBtnClick: () => {
        this.#switchEventToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#formPresenter = new FormPresenter({
      event: this.#event,
      typeOffers,
      destinations: this.#destinations,
      container: this.#container,
      closeForm: () => {
        this.#switchFormToEvent();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    if (prevEventComponent === null || prevFormPresenter === null) {
      render(this.#eventComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevEventComponent)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#container.contains(prevFormPresenter)) {
      replace(this.#formPresenter, prevFormPresenter);
    }

    remove(prevEventComponent);
    remove(prevFormPresenter);
  }

  #switchEventToForm() {
    replace(this.#formPresenter.component, this.#eventComponent);
  }

  #switchFormToEvent() {
    replace(this.#eventComponent, this.#formPresenter.component);
  }

  #escKeyDownHandler(evt) {
    if (!isKeyEscape(evt)) {
      return;
    }
    evt.preventDefault();
    this.#switchFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}