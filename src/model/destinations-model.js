import { createMockDestinations } from '../mock/destinations.js';

export default class DestinationsModel {
  destinations = createMockDestinations();

  getDestinations() {
    return this.destinations;
  }
}
