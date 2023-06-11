import AbstractView from '../framework/view/abstract-view.js';
import { NoEventsMessages } from '../const.js';

function createNoEventsTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class NoEventsView extends AbstractView {
  #message = '';

  constructor({ currentFilter }) {
    super();
    this.#message = NoEventsMessages[currentFilter];
  }

  get template() {
    return createNoEventsTemplate(this.#message);
  }
}
