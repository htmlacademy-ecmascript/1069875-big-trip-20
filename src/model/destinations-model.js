export default class DestinationsModel {
  #destinations = new Map();
  #apiService = null;

  constructor({ apiService }) {
    this.#apiService = apiService;
  }

  async init() {
    try {
      const data = await this.#apiService.destinations;
      this.#destinations = new Map(data.map((destination) => [destination.id, destination]));
    } catch (err) {
      this.#destinations = new Map();
    }
  }

  get destinations() {
    return this.#destinations;
  }
}
