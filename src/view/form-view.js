import { EVENTS_TYPES, EMPTY_EVENT, DateFormats } from '../const.js';
import { createElement } from '../render.js';
import { startStringWithCapital, transformDate } from '../utils.js';

function createTypesListItemTemplate(title) {
  return `<div class="event__type-item">
            <input id="event-type-${title}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${title}">
            <label class="event__type-label  event__type-label--${title}" for="event-type-${title}-1">
              ${startStringWithCapital(title)}
            </label>
          </div>`;
}

function createPicturesListTemplate(pictures) {
  const listItemsTemplate = pictures
    .map(
      ({ src, description }) =>
        `<img class="event__photo" src="${src}" alt="${description}">`
    )
    .join('');

  return `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${listItemsTemplate}
            </div>
          </div>`;
}

function createDestinationInfoTemplate(destination) {
  const { description, pictures } = destination;

  const picturesTemplate = pictures ? createPicturesListTemplate(pictures) : '';

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${picturesTemplate}
          </section>`;
}

function createOffersItemTemplate({ offerId, offerInfo, isSelected }) {
  const { title, price } = offerInfo;
  const selectedAttribute = isSelected ? 'checked' : '';
  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerId}-1" type="checkbox" name="event-offer-${offerId}" ${selectedAttribute}>
            <label class="event__offer-label" for="event-offer-${offerId}-1">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`;
}

function createOffersTemplate({ allOffers, selectedOffersIds }) {
  let offersItemsTemplate = '';
  for (const [offerId, offerInfo] of allOffers.entries()) {
    const isSelected = selectedOffersIds.includes(offerId);
    offersItemsTemplate += createOffersItemTemplate({
      offerId: offerId,
      offerInfo: offerInfo,
      isSelected: isSelected,
    });
  }

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">${offersItemsTemplate}<div>
          </section>`;
}

function createDataListItemTemplate(title) {
  return `<option value='${title}'></option>`;
}

function createFormTemplate({ event = EMPTY_EVENT, typeOffers = [], destinations }) {
  const { type, destination, dateFrom, dateTo, basePrice, offers } = event;

  const dataListTemplate = Array.from(destinations.keys())
    .map((title) => createDataListItemTemplate(title))
    .join('');

  const typesListTemplate = EVENTS_TYPES.map((title) =>
    createTypesListItemTemplate(title)
  ).join('');

  const offersTemplate = typeOffers.size
    ? createOffersTemplate({ allOffers: typeOffers, selectedOffersIds: offers })
    : '';

  const destinationInfo = destinations.get(destination);
  const destinationInfoTemplate = destinationInfo
    ? createDestinationInfoTemplate(destinationInfo)
    : '';

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>
                      ${typesListTemplate}
                    </fieldset>
                  </div>
                </div>
                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${startStringWithCapital(type)}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
                  <datalist id="destination-list-1">${dataListTemplate}</datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
                    value="${transformDate(dateFrom, DateFormats.FOR_FORM)}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
                    value="${transformDate(dateTo, DateFormats.FOR_FORM)}">
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Delete</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">
                ${offersTemplate}
                ${destinationInfoTemplate}
              </section>
            </form>
          </li>`;
}

export default class FormView {
  constructor({ event, typeOffers, destinations }) {
    this.event = event;
    this.typeOffers = typeOffers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createFormTemplate({
      event: this.event,
      typeOffers: this.typeOffers,
      destinations: this.destinations,
    });
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
