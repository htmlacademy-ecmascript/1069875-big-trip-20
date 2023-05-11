const EVENTS_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const FILTERS_NAMES = ['everything', 'future', 'present', 'past'];

const SORTING_NAMES = ['day', 'event', 'time', 'price', 'offers'];

const DateFormats = {
  FOR_FORM: 'DD/MM/YY h:mm',
  FULL: 'YYYY-MM-DDTHH:mm',
  DAY_MACHINE: 'YYYY-MM-DD',
  DAY_HUMAN: 'D MMMM',
  TIME: 'h:mm',
};

const EMPTY_EVENT = {
  type: EVENTS_TYPES[0],
  destination: '',
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  offers: [],
  isFavorite: false,
};

export { EVENTS_TYPES, FILTERS_NAMES, SORTING_NAMES, DateFormats, EMPTY_EVENT };
