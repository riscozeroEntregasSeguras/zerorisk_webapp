import HTTP from '../http';

export default {
  status() {
    return HTTP.api().get('/status');
  },
};
