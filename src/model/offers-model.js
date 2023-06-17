export default class OffersModel {
  #offers = new Map();
  #apiService = null;

  constructor({ apiService }) {
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
  }

  get offers() {
    return this.#offers;
  }
}
