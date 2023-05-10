import { getRandomEvent } from '../mock/event.js';

const EVENTS_NUMBER = 5;

export default class EventsModel {
  events = Array.from({ length: EVENTS_NUMBER }, getRandomEvent);

  getEvents() {
    return this.events;
  }
}
