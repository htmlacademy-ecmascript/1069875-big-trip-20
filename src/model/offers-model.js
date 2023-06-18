import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OffersModel extends Observable {
  #offers = new Map();
  #apiService = null;

  constructor({ apiService }) {
    super();
    this.#apiService = apiService;
  }

  async init() {
    try {
      const data = await this.#apiService.offers;
      this.#offers = new Map(
        data.map(({ type, offers }) => [
          type,
          new Map(offers.map((offer) => [offer.id, offer])),
        ])
      );
    } catch (err) {
      this.#offers = new Map();
    }
    this._notify(UpdateType.INIT, { offers: true });
  }

  get offers() {
    return this.#offers;
  }
}
