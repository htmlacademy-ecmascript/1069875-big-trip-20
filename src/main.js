import SiteMainPresenter from './presenter/site-main-presenter.js';

const siteMainElement = document.querySelector('.trip-events');

const siteMainPresenter = new SiteMainPresenter({ container: siteMainElement });
siteMainPresenter.init();
