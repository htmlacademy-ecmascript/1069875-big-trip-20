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
  FULL: 'YYYY-MM-DDTHH:mm',
  DAY_MACHINE: 'YYYY-MM-DD',
  DAY_HUMAN: 'D MMMM',
  TIME: 'h:mm',
};

export { EVENTS_TYPES, FILTERS_NAMES, SORTING_NAMES, DateFormats };
