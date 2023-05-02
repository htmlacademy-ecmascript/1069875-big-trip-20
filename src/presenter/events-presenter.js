import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import FormPresenter from './form-presenter.js';
import { render } from '../render.js';

export default class EventsPresenter {
  eventsListComponent = new EventsListView();
  formComponent = new FormPresenter({ container: this.eventsListComponent.getElement() });

  constructor({ container }) {
    this.container = container;
  }

  init() {
    this.formComponent.init();
    render(this.eventsListComponent, this.container);
    for (let i = 1; i <= 3; i++) {
      render(new EventView(), this.eventsListComponent.getElement());
    }
  }
}

