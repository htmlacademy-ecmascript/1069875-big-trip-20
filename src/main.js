import FiltersPresenter from './presenter/filters-presenter.js';
import SortingPresenter from './presenter/sorting-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const filtersPresenter = new FiltersPresenter({ container: filtersElement });
filtersPresenter.init();

const sortingPresenter = new SortingPresenter({ container: siteMainElement });
sortingPresenter.init();

const eventsPresenter = new EventsPresenter({ container: siteMainElement });
eventsPresenter.init();
