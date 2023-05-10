import { getRandomArrayElement } from '../utils.js';
import { EVENTS_TYPES } from '../const.js';

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
  return [
    {
      id: 1,
      title: getRandomArrayElement(OFFERS_TITLES),
      price: getRandomArrayElement(OFFERS_PRICES),
    },
    {
      id: 2,
      title: getRandomArrayElement(OFFERS_TITLES),
      price: getRandomArrayElement(OFFERS_PRICES),
    },
    {
      id: 3,
      title: getRandomArrayElement(OFFERS_TITLES),
      price: getRandomArrayElement(OFFERS_PRICES),
    },
    {
      id: 4,
      title: getRandomArrayElement(OFFERS_TITLES),
      price: getRandomArrayElement(OFFERS_PRICES),
    },
    {
      id: 5,
      title: getRandomArrayElement(OFFERS_TITLES),
      price: getRandomArrayElement(OFFERS_PRICES),
    },
  ];
}

function createMockOffersByTypes() {
  return EVENTS_TYPES.forEach((title) => ({
    type: title,
    offers: createMockOffers(),
  }));
}

export { createMockOffersByTypes };
