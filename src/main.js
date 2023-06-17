import AppPresenter from './presenter/app-presenter';


const tripMainElement = document.querySelector('.trip-main');
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const AUTHORIZATION = 'Basic 1069875';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const appComponent = new AppPresenter({
  tripMainElement,
  filtersElement,
  siteMainElement,
  authorization: AUTHORIZATION,
  endPoint: END_POINT,
});

appComponent.init();
