import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import FormPresenter from './form-presenter.js';
import { render } from '../render.js';

export default class EventsPresenter {
  eventsListComponent = new EventsListView();
  formComponent = new FormPresenter({ container: this.eventsListComponent.getElement() });

  constructor({ container, eventsModel }) {
    this.container = container;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];

    this.formComponent.init();
    render(this.eventsListComponent, this.container);

    for (let i = 0; i < this.events.length; i++) {
      render(new EventView({ event: this.events[i] }), this.eventsListComponent.getElement());
    }
  }
}

