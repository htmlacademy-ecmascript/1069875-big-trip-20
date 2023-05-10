import { createMockOffersByTypes } from '../mock/offers';

export default class OffersModel {
  offers = createMockOffersByTypes();

  getOffers() {
    return this.offers;
  }
}
