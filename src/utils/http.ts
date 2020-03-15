import axios from 'axios';

class HTTP {
  baseURL: string

  headers: any

  withCredentials: boolean

  constructor() {
    this.baseURL = '';
    this.headers = {};
    this.withCredentials = false;
  }

  set({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL || (this.baseURL || '');
  }

  setHeader({ key, value }: { key: string, value: string }) {
    this.headers[key] = value;
  }

  unsetHeader({ key }: { key: string }): void {
    delete this.headers[key];
  }

  unset({ baseURL }: { baseURL?: string }) {
    if (baseURL) this.baseURL = '';
  }

  reset() {
    this.constructor();
  }

  api() {
    return axios.create({
      baseURL: this.baseURL,
      headers: this.headers,
      withCredentials: false,
    });
  }
}

export default new HTTP();
