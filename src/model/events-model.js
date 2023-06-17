import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class EventsModel extends Observable {
  #apiService = null;
  #events = [];

  constructor({ apiService }) {
    super();
    this.#apiService = apiService;
  }

  async init() {
    try {
      const data = await this.#apiService.events;
      this.#events = new Map(
        data.map((event) => [event.id, this.#apiService.adaptToClient(event)])
      );
    } catch (err) {
      this.#events = new Map();
    }
    this._notify(UpdateType.INIT, { events: true });
  }

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
