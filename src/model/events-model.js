import { getRandomEvent } from '../mock/event.js';

const EVENTS_NUMBER = 5;

export default class EventsModel {
  #events = new Map(
    Array.from({ length: EVENTS_NUMBER }, getRandomEvent)
      .map((event) => [event.id, event])
  );

  get events() {
    return Array.from(this.#events.values());
  }
}
