import AbstractView from '../framework/view/abstract-view.js';

function createNewEventButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewEventButtonView extends AbstractView {
  #onClickHandler = null;

  constructor({ onClick }) {
    super();
    this.#onClickHandler = onClick;
    this.element.addEventListener('click', this.#handleButtonClick);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #handleButtonClick = (evt) => {
    evt.preventDefault();
    this.#onClickHandler();
  };
}
