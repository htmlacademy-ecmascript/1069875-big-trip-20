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

const FiltersNames = {
  ALL : 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortingNames = {
  DAY: 'default',
  TIME: 'time',
  PRICE: 'price',
};

const EVENT_ITEMS = ['day', 'event', 'time', 'price', 'offers'];

const NoEventsMessages = {
  ALL: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
};


const DateFormats = {
  FOR_FORM: 'DD/MM/YY h:mm',
  FULL: 'YYYY-MM-DDTHH:mm',
  DAY_MACHINE: 'YYYY-MM-DD',
  DAY_HUMAN: 'D MMMM',
  TIME: 'h:mm',
  FLATPICKR: 'd/m/y H:i',
};

const DurationFormats = {
  DAYS: 'DD[D] HH[H] mm[M]',
  HOURS: 'HH[H] mm[M]',
  MINUTES: 'mm[M]',
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

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  EVENTS_TYPES,
  FiltersNames,
  NoEventsMessages,
  SortingNames,
  EVENT_ITEMS,
  DateFormats,
  DurationFormats,
  EMPTY_EVENT,
  UserAction,
  UpdateType,
};
