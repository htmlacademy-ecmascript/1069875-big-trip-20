import { getRandomArrayElement } from '../utils.js';
import { EVENTS_TYPES } from '../const.js';

const OFFERS_NUMBER = 5;

const OFFERS_TITLES = [
  'Upgrade',
  'Downgrade',
  'Get cold drink',
  'Get hot drink',
  'Get blanket',
  'Get sandwich',
];

const OFFERS_PRICES = [100, 13, 75, 40, 5, 66];

function createMockOffers() {
  const offers = new Map();

  for (let i = 1; i <= OFFERS_NUMBER; i ++) {
    offers.set(String(i), {
      id: String(i),
      title: getRandomArrayElement(OFFERS_TITLES),
      price: getRandomArrayElement(OFFERS_PRICES),
    });
  }
  return offers;
}

function createMockOffersByTypes() {
  const mockOffers = new Map();
  EVENTS_TYPES.forEach((type) => mockOffers.set(type, createMockOffers()));
  return mockOffers;
}

export { createMockOffersByTypes };
