import { EVENTS_TYPES, EMPTY_EVENT, DateFormats } from '../const.js';
import { startStringWithCapital, transformDate } from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

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

function createOffersItemTemplate({ offer, offerId }) {
  const { title, price, isSelected } = offer;
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

function createOffersTemplate({ typeOffers }) {
  let offersItemsTemplate = '';
  typeOffers.forEach((offer, offerId) => {
    offersItemsTemplate += createOffersItemTemplate({ offer, offerId });
  });

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">${offersItemsTemplate}<div>
          </section>`;
}

function createDataListItemTemplate(title) {
  return `<option value='${title}'></option>`;
}

function createFormTemplate({ event, destinationsNames }) {
  const {
    type,
    dateFrom,
    dateTo,
    basePrice,
    typeOffers,
    destinationInfo,
  } = event;

  const dataListTemplate = destinationsNames
    .map((title) => createDataListItemTemplate(title))
    .join('');

  const typesListTemplate = EVENTS_TYPES.map((title) =>
    createTypesListItemTemplate(title)
  ).join('');

  const offersTemplate = typeOffers.size
    ? createOffersTemplate({ typeOffers })
    : '';

  const destinationInfoTemplate = destinationInfo.description
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
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
                    value="${destinationInfo.name}" list="destination-list-1">
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

export default class FormView extends AbstractStatefulView {
  #offersModel = null;
  #destinationsModel = null;

  #offers = null;
  #destinations = null;
  #destinationsNames = null;

  #handleCloseForm = null;
  #handleFormSubmit = null;

  constructor({
    event = EMPTY_EVENT,
    offersModel,
    destinationsModel,
    closeForm,
    onFormSubmit,
  }) {
    super();
    this.#offersModel = offersModel;
    this.#offers = new Map(this.#offersModel.offers);
    this.#destinationsModel = destinationsModel;
    this.#destinations = new Map(this.#destinationsModel.destinations);
    this.#destinationsNames = Array.from(this.#destinations.values()).map(
      (info) => info.name
    );
    this._setState(
      FormView.parseEventToState({
        event,
        offers: this.#offers,
        destinations: this.#destinations,
      })
    );
    this.#handleCloseForm = closeForm;
    this.#handleFormSubmit = onFormSubmit;
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editBtnClickHandler);
  }

  get template() {
    return createFormTemplate({ event: this._state, destinationsNames: this.#destinationsNames });
  }

  static parseOffersMap({ allOffers, type, chosenOffers = [] }) {
    const typeOffers = allOffers.get(type);
    if (!typeOffers.size) {
      return new Map();
    }
    const offers = new Map(typeOffers);
    offers.forEach((info, id) => {
      info.isSelected = chosenOffers.includes(id);
    });
    return offers;
  }

  static parseEventToState({ event, offers, destinations }) {
    const state = { ...event };
    state.typeOffers = FormView.parseOffersMap({
      allOffers: offers,
      type: state.type,
      chosenOffers: state.offers,
    });
    state.destinationInfo = destinations.get(state.destination);

    return state;
  }

  static parseStateToEvent(state) {
    const event = { ...state };
    delete event.typeOffers;
    delete event.destinationInfo;

    return event;
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormView.parseStateToEvent(this._state));
  };

  #editBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseForm();
  };
}
