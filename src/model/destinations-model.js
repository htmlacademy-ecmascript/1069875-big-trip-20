import { createMockDestinations } from '../mock/destinations.js';

export default class DestinationsModel {
  offers = createMockDestinations();

  getDestinations() {
    return this.offers;
  }
}
