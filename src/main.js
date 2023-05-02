import TripInfoView from './view/trip-info-view.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import SortingPresenter from './presenter/sorting-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';
import { render, RenderPosition } from './render.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

const filtersPresenter = new FiltersPresenter({ container: filtersElement });
filtersPresenter.init();

const sortingPresenter = new SortingPresenter({ container: siteMainElement });
sortingPresenter.init();

const eventsPresenter = new EventsPresenter({ container: siteMainElement });
eventsPresenter.init();
