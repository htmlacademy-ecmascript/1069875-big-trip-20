import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class DestinationsModel extends Observable {
  #destinations = new Map();
  #apiService = null;

  constructor({ apiService }) {
    super();
    this.#apiService = apiService;
  }

  async init() {
    try {
      const data = await this.#apiService.destinations;
      this.#destinations = new Map(
        data.map((destination) => [destination.id, destination])
      );
    } catch (err) {
      this.#destinations = new Map();
    }
    this._notify(UpdateType.INIT, { destinations: true });
  }

  get destinations() {
    return this.#destinations;
  }
}
