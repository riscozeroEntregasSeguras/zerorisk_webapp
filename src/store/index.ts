import Vue from 'vue';
import Vuex from 'vuex';
import MUTATIONS from './types-mutations';
import HTTP from '../utils/http';
// Modules
import user from './modules/user';
import notifications from './modules/notifications';

Vue.use(Vuex);

const API_URL = 'http://localhost:3011/';
HTTP.set({ baseURL: API_URL });

export default new Vuex.Store({
  state: {
    masterLoading: false,
  },
  mutations: {
    [MUTATIONS.GLOBAL_MASTER_LOADING_START](state) {
      state.masterLoading = true;
    },
    [MUTATIONS.GLOBAL_MASTER_LOADING_END](state) {
      state.masterLoading = false;
    },
  },
  actions: {},
  modules: {
    user,
    notifications,
  },
});
