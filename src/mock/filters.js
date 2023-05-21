import { filtersFunctions } from '../utils.js';

function getFilters(events) {
  return Object.entries(filtersFunctions).map(
    ([name, filterFn]) => ({
      name,
      isActive: Boolean(filterFn(events).length),
    })
  );
}

export { getFilters };
