import { USER_STATUS, USER_LOCATION } from '@/store/interfaces/user';
import HTTP from '../http';

export default {
  register(email: string, password: string, age: number) {
    return HTTP.api().post('/user/register', { email, password, age });
  },
  login(email: string, password: string) {
    return HTTP.api().post('/user/token', { email, password });
  },
  changeStatus(status: USER_STATUS) {
    return HTTP.api().post('/user/status', { status });
  },
  changeLocation(location: USER_LOCATION) {
    return HTTP.api().post('/user/location', { location });
  },
  // Refactor
  reflect() {
    return HTTP.api().get('/user/token');
  },
  getRegister(token: string) {
    return HTTP.api().get('/register', { params: { token } });
  },
  performRegister(token: string, password: string) {
    return HTTP.api().patch('/register', { password, token });
  },
};
