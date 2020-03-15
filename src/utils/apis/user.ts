import HTTP from '../http';

export default {
  register(email: string, password: string, age: number) {
    return HTTP.api().post('/user/register', { email, password, age });
  },
  login(email: string, password: string) {
    return HTTP.api().post('/user/token', { email, password });
  },
  // Refactor
  reflect() {
    return HTTP.api().get('/user/reflect');
  },
  getRegister(token: string) {
    return HTTP.api().get('/register', { params: { token } });
  },
  performRegister(token: string, password: string) {
    return HTTP.api().patch('/register', { password, token });
  },
};
