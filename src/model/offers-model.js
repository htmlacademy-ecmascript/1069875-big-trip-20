import { createMockOffersByTypes } from '../mock/offers';

export default class OffersModel {
  #offers = createMockOffersByTypes();

  get offers() {
    return this.#offers;
  }
}
