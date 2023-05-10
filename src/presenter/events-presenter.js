import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import FormPresenter from './form-presenter.js';
import { render } from '../render.js';

export default class EventsPresenter {
  eventsListComponent = new EventsListView();
  formComponent = new FormPresenter({ container: this.eventsListComponent.getElement() });

  constructor({ container, eventsModel, offersModel }) {
    this.container = container;
    this.eventsModel = eventsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    this.offers = this.offersModel.getOffers();

    this.formComponent.init();
    render(this.eventsListComponent, this.container);

    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      const typeOffers = this.offers.get(event.type);
      render(new EventView({ event: event, typeOffers: typeOffers }), this.eventsListComponent.getElement());
    }
  }
}

