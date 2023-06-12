import Observable from '../framework/observable.js';
import { getRandomEvent } from '../mock/event.js';

const EVENTS_NUMBER = 5;

export default class EventsModel extends Observable {
  #events = new Map(
    Array.from({ length: EVENTS_NUMBER }, getRandomEvent).map((event) => [
      event.id,
      event,
    ])
  );

  get events() {
    return Array.from(this.#events.values());
  }

  updateEvent(updateType, update) {
    if (!this.#events.has(update.id)) {
      throw new Error('Can\'t update nonexisting task');
    }
    this.#events.set(update.id, update);
    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events.set(update.id, update);
    this._notify(updateType, update);
  }

  removeEvent(updateType, update) {
    if (!this.#events.has(update.id)) {
      throw new Error('Can\'t delete nonexisting task');
    }
    this.#events.delete(update.id);
    this._notify(updateType, update);
  }
}
