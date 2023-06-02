import { EVENTS_TYPES } from '../const.js';
import { DESTINATIONS_TITLES } from './destinations.js';
import { getRandomNumber, getRandomArrayElement } from '../utils.js';

const mockEvents = [
  {
    type: getRandomArrayElement(EVENTS_TYPES),
    destination: getRandomNumber(0, DESTINATIONS_TITLES.length - 1),
    basePrice: 700,
    dateFrom: new Date('2023-05-19T03:20:00'),
    dateTo: new Date('2023-05-22T04:20:00'),
    offers: [1, 3, 5],
    isFavorite: getRandomArrayElement([true, false]),
  },
  {
    type: getRandomArrayElement(EVENTS_TYPES),
    destination: getRandomNumber(0, DESTINATIONS_TITLES.length - 1),
    basePrice: 130,
    dateFrom: new Date('2023-06-17T12:00:00'),
    dateTo: new Date('2023-06-18T12:30:00'),
    offers: [1, 2],
    isFavorite: getRandomArrayElement([true, false]),
  },
  {
    type: getRandomArrayElement(EVENTS_TYPES),
    destination: getRandomNumber(0, DESTINATIONS_TITLES.length - 1),
    basePrice: 270,
    dateFrom: new Date('2023-06-03T19:45:00'),
    dateTo: new Date('2023-06-04T00:00:00'),
    offers: [2, 3, 4],
    isFavorite: getRandomArrayElement([true, false]),
  },
  {
    type: getRandomArrayElement(EVENTS_TYPES),
    destination: getRandomNumber(0, DESTINATIONS_TITLES.length - 1),
    basePrice: 2530,
    dateFrom: new Date('2023-06-30T15:15:00'),
    dateTo: new Date('2023-06-30T16:45:00'),
    offers: [1, 2, 3, 4, 5],
    isFavorite: getRandomArrayElement([true, false]),
  },
  {
    type: getRandomArrayElement(EVENTS_TYPES),
    destination: getRandomNumber(0, DESTINATIONS_TITLES.length - 1),
    basePrice: 13,
    dateFrom: new Date('2023-07-02T17:20:00'),
    dateTo: new Date('2023-07-02T18:00:00'),
    offers: [],
    isFavorite: getRandomArrayElement([true, false]),
  },
];

function getRandomEvent() {
  return {
    id: crypto.randomUUID(),
    ...getRandomArrayElement(mockEvents),
  };
}

export { getRandomEvent };
