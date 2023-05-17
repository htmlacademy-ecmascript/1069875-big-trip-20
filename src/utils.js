import { DurationFormats } from './const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

export {
  getRandomNumber,
  getRandomArrayElement,
  transformDate,
  getDuration,
  startStringWithCapital,
  isKeyEscape,
};
