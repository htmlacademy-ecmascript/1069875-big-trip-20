import EventView from '../view/event-view.js';
import FormView from '../view/form-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isKeyEscape } from '../utils.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #container = null;

  #event = null;
  #mode = Mode.DEFAULT;

  #eventComponent = null;
  #formComponent = null;

  #offersModel = null;
  #destinationsModel = null;

  #handleEventChange = null;
  #handleModeChange = null;

  constructor({
    container,
    offersModel,
    destinationsModel,
    onEventChange,
    onModeChange,
  }) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleEventChange = onEventChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;
    const typeOffers = this.#offersModel.offers.get(event.type);
    const destinationName = this.#destinationsModel.destinations.get(
      event.destination
    ).name;

    const prevEventComponent = this.#eventComponent;
    const prevFormComponent = this.#formComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      typeOffers,
      destinationName,
      onFormOpen: this.#handleFormOpen,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#formComponent = new FormView({
      event: this.#event,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      container: this.#container,
      onFormClose: this.#handleFormClose,
      onFormSubmit: this.#handleFormSubmit,
      onFormReset: this.#handleFormReset,
    });

    if (prevEventComponent === null || prevFormComponent === null) {
      render(this.#eventComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#formComponent, prevFormComponent);
    }

    remove(prevEventComponent);
    remove(prevFormComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#formComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#handleFormReset();
      this.#handleFormClose();
    }
  }

  #switchEventToForm() {
    replace(this.#formComponent, this.#eventComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #switchFormToEvent() {
    replace(this.#eventComponent, this.#formComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (!isKeyEscape(evt)) {
      return;
    }
    evt.preventDefault();
    this.#handleFormReset();
    this.#handleFormClose();
  };

  #handleFormOpen = () => {
    this.#switchEventToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormClose = () => {
    this.#switchFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (changedEvent) => {
    this.#handleEventChange(changedEvent);
    this.#handleFormClose();
  };

  #handleFormReset = () => {
    this.#formComponent.reset(this.#event);
  };

  #handleFavoriteClick = () => {
    this.#handleEventChange({
      ...this.#event,
      isFavorite: !this.#event.isFavorite,
    });
  };
}
