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

  let days = timeDuration.days();
  days = days ? `${days}D ` : '';

  let hours = timeDuration.hours();
  hours = hours || days ? `${hours}H ` : '';

  const minutes = `${timeDuration.minutes()}M`;

  return days + hours + minutes;
}

export { getRandomNumber, getRandomArrayElement, transformDate, getDuration };
