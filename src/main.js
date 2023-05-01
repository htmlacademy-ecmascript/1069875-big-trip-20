import FiltersPresenter from './presenter/filters-presenter.js';
import SiteMainPresenter from './presenter/site-main-presenter.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const filtersPresenter = new FiltersPresenter({ container: filtersElement });
filtersPresenter.init();

const siteMainPresenter = new SiteMainPresenter({ container: siteMainElement });
siteMainPresenter.init();
