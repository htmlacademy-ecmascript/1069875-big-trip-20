import { DateFormats } from '../const.js';
import { transformDate, getDuration } from '../utils.js';
import { createElement } from '../render.js';

function getChosenOffers(offers, offersIds) {
  return offersIds.map((offerId) => offers.get(offerId));
}

function createOfferTemplate({ title, price }) {
  return `<li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>`;
}

function createOffersTemplate({ typeOffers, offers }) {
  const offersItemsTemplate = getChosenOffers(typeOffers, offers)
    .map((offer) => createOfferTemplate(offer))
    .join('');

  return `<h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">${offersItemsTemplate}</ul>`;
}

function createEventTemplate(event, typeOffers) {
  const { type, destination, basePrice, isFavorite, offers, dateFrom, dateTo } = event;

  const offersTemplate = offers.length ? createOffersTemplate({ typeOffers: typeOffers, offers: offers }) : '';

  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  const duration = getDuration(dateFrom, dateTo);

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date"
                  datetime="${transformDate(dateFrom,DateFormats.DAY_MACHINE)}">
                  ${transformDate(dateFrom, DateFormats.DAY_HUMAN)}
                </time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time"
                      datetime="${transformDate(dateFrom, DateFormats.FULL)}">
                      ${transformDate(dateFrom, DateFormats.TIME)}
                    </time>
                    &mdash;
                    <time class="event__end-time"
                      datetime="${transformDate(dateTo, DateFormats.FULL)}">
                      ${transformDate(dateTo, DateFormats.TIME)}
                    </time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                  ${offersTemplate}
                <button class="event__favorite-btn ${favoriteClass}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class EventView {

  constructor({ event, typeOffers }) {
    this.event = event;
    this.typeOffers = typeOffers;
  }

  getTemplate() {
    return createEventTemplate(this.event, this.typeOffers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
