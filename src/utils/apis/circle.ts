import HTTP from '../http';

export default {
  load() {
    return HTTP.api().get('/circle');
  },
};
