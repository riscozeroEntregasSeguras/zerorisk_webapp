import Vue from 'vue';
import Vuex from 'vuex';
import { AxiosResponse } from 'axios';
import HTTP from '../utils/http';
import ACTIONS from './types-actions';
import MUTATIONS from './types-mutations';
import API from '../utils/api';
// Modules
import user from './modules/user';
import notifications from './modules/notifications';
import invitations from './modules/invitations';
import circle from './modules/circle';

Vue.use(Vuex);

const API_URL = 'http://localhost:3011/';
HTTP.set({ baseURL: API_URL });

export default new Vuex.Store({
  modules: {
    user,
    notifications,
    invitations,
    circle,
  },
  state: {
    online: true,
    masterLoading: false,
  },
  actions: {
    [ACTIONS.APP_STATUS]({ commit }: { commit: any }) {
      return API.global
        .status()
        .then((response: AxiosResponse) => { console.log(response.data.message); })
        .catch(() => {
          // FIXME: uncomment when its fixed
          // commit(MUTATIONS.GLOBAL_SET_API_OFFLINE);
        });
    },
  },
  mutations: {
    [MUTATIONS.GLOBAL_SET_API_OFFLINE](state) {
      state.online = false;
    },
    [MUTATIONS.GLOBAL_MASTER_LOADING_START](state) {
      state.masterLoading = true;
    },
    [MUTATIONS.GLOBAL_MASTER_LOADING_END](state) {
      state.masterLoading = false;
    },
  },
});
