import ApiService from '../framework/api-service';

const Methods = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Methods.PUT,
      body: JSON.stringify(event),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    const parseResponse = await ApiService.parseResponse(response);
    return parseResponse;
  }
}
