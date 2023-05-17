import { createMockDestinations } from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = createMockDestinations();

  get destinations() {
    return this.#destinations;
  }
}
