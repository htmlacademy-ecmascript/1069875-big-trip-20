import SortingView from '../view/sorting-view.js';
import SortingItemView from '../view/sorting-item-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import { render } from '../render.js';

export default class SiteMainPresenter {
  sortingComponent = new SortingView();
  eventsListComponent = new EventsListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.sortingComponent, this.container);
    render(new SortingItemView(), this.sortingComponent.getElement());
    render(this.eventsListComponent, this.container);
    for (let i = 1; i <= 3; i++) {
      render(new EventView(), this.eventsListComponent.getElement());
    }
  }
}

