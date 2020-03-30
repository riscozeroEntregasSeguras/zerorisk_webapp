import Vue from 'vue';
import { cloneDeep } from 'lodash';
import { AxiosResponse, AxiosError } from 'axios';
import { ActionInputs, ApiError } from '../interfaces/api';
import CIRCLE_USER from '../interfaces/circle';
import ACTIONS from '../types-actions';
import MUTATIONS from '../types-mutations';
import API from '../../utils/api';
import HTTP from '../../utils/http';

interface DefaultState {
  circle: CIRCLE_USER[]
}

const defaultState: DefaultState = {
  circle: [],
};

const moduleState = cloneDeep(defaultState);

const getters = {};

const actions = {
  [ACTIONS.CIRCLE_LOAD]({ commit }: ActionInputs) {
    return API.circle.load().then((response: AxiosResponse) => {
      commit(MUTATIONS.CIRCLE_LOAD, { circle: response.data.data.circle });
    });
  },
};

const mutations = {
  [MUTATIONS.CIRCLE_RESET](state: DefaultState) {
    state.circle = [];
  },
  [MUTATIONS.CIRCLE_LOAD](
    state: DefaultState,
    { circle }: { circle: CIRCLE_USER[] },
  ) {
    state.circle = circle;
  },
};

export default {
  state: moduleState,
  getters,
  actions,
  mutations,
};
