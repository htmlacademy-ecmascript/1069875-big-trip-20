import FormView from '../view/form-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { isKeyEscape } from '../utils.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewEventPresenter {
  #container = null;

  #formComponent = null;

  #offersModel = null;
  #destinationsModel = null;

  #handleDataChange = null;
  #handleDestroyNewEvent = null;

  constructor({
    container,
    offersModel,
    destinationsModel,
    onDataChange,
    onDestroy
  }) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroyNewEvent = onDestroy;
  }

  init() {
    if (this.#formComponent) {
      return;
    }
    this.#formComponent = new FormView({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      container: this.#container,
      onFormSubmit: this.#handleFormSubmit,
      onFormReset: () => this.destroy(),
    });

    render(this.#formComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (!this.#formComponent) {
      return;
    }
    this.#handleDestroyNewEvent();
    remove(this.#formComponent);
    this.#formComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (!isKeyEscape(evt)) {
      return;
    }
    evt.preventDefault();
    this.destroy();
  };

  #handleFormSubmit = (newEvent) => {
    this.#handleDataChange(UserAction.ADD_EVENT, UpdateType.MINOR, {
      ...newEvent,
      id: crypto.randomUUID(),
    });
    this.destroy();
  };
}