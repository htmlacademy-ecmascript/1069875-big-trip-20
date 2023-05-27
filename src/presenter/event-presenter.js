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

  #handleEventChange = null;

  constructor({ container, offers, destinations, onEventChange }) {
    this.#container = container;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEventChange = onEventChange;
  }

  init(event) {
    this.#event = event;
    const typeOffers = this.#offers.get(event.type);

    const prevEventComponent = this.#eventComponent;
    const prevFormPresenter = this.#formPresenter;

    this.#eventComponent = new EventView({
      event: this.#event,
      typeOffers,
      openForm: this.#handleOpenFormClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#formPresenter = new FormPresenter({
      event: this.#event,
      typeOffers,
      destinations: this.#destinations,
      container: this.#container,
      closeForm: this.#handleCloseFormClick,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevEventComponent === null || prevFormPresenter === null) {
      render(this.#eventComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#container.contains(prevFormPresenter.formComponent.element)) {
      replace(
        this.#formPresenter.formComponent,
        prevFormPresenter.formComponent
      );
    }

    remove(prevEventComponent);
    remove(prevFormPresenter.formComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#formPresenter.formComponent);
  }

  #switchEventToForm() {
    replace(this.#formPresenter.formComponent, this.#eventComponent);
  }

  #switchFormToEvent() {
    replace(this.#eventComponent, this.#formPresenter.formComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (!isKeyEscape(evt)) {
      return;
    }
    evt.preventDefault();
    this.#switchFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleOpenFormClick = () => {
    this.#switchEventToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleCloseFormClick = () => {
    this.#switchFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleEventChange({ ...this.#event, isFavorite: !this.#event.isFavorite});
  };

  #handleFormSubmit = (changedEvent) => {
    this.#handleEventChange(changedEvent);
    this.#handleCloseFormClick();
  };
}
