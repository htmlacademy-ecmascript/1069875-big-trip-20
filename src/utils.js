import { DurationFormats, FiltersNames } from './const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function getRandomNumber(min = 1, max = 10) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getRandomArrayElement(items) {
  return items[getRandomNumber(0, items.length - 1)];
}

function transformDate(date, format) {
  return dayjs(date).format(format);
}

function getDuration(timeFrom, timeTo) {
  const timeDuration = dayjs.duration(dayjs(timeTo).diff(timeFrom));

  const isDaysLong = Boolean(timeDuration.days());
  const isHoursLong = Boolean(timeDuration.hours());

  let format;

  switch (true) {
    case isDaysLong:
      format = DurationFormats.DAYS;
      break;
    case isHoursLong:
      format = DurationFormats.HOURS;
      break;
    default:
      format = DurationFormats.MINUTES;
  }

  return timeDuration.format(format);
}

function startStringWithCapital(str) {
  return str[0].toUpperCase() + str.substring(1);
}

function isKeyEscape(evt) {
  return evt.key === 'Escape';
}

const filtersFunctions = {
  [FiltersNames.ALL]: (event) => event,
  [FiltersNames.FUTURE]: (event) =>
    event.filter(({ dateFrom }) => dayjs(dateFrom).isAfter(dayjs(), 'day')),
  [FiltersNames.PRESENT]: (event) =>
    event.filter(
      ({ dateFrom, dateTo }) =>
        dayjs(dateFrom).isSameOrBefore(dayjs(), 'day') &&
        dayjs(dateTo).isSameOrAfter(dayjs(), 'day')
    ),
  [FiltersNames.PAST]: (event) =>
    event.filter(({ dateTo }) => dayjs(dateTo).isBefore(dayjs(), 'day')),
};

export {
  getRandomNumber,
  getRandomArrayElement,
  transformDate,
  getDuration,
  startStringWithCapital,
  isKeyEscape,
  filtersFunctions,
};
