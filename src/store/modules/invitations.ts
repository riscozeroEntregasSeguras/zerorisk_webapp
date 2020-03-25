import Vue from 'vue';
import { cloneDeep } from 'lodash';
import { AxiosResponse, AxiosError } from 'axios';
import { ActionInputs, ApiError } from '../interfaces/api';
import INVITATION from '../interfaces/invitation';
import ACTIONS from '../types-actions';
import MUTATIONS from '../types-mutations';
import API from '../../utils/api';
import HTTP from '../../utils/http';

interface DefaultState {
  pending: INVITATION[]
}

const defaultState: DefaultState = {
  pending: [],
};

const moduleState = cloneDeep(defaultState);

const getters = {};

const actions = {
  [ACTIONS.INVITATIONS_LOAD]({ commit }: ActionInputs, { userId }: { userId: string }) {
    return API.invitations.pending().then((response: AxiosResponse) => {
      commit(MUTATIONS.INVITATIONS_LOAD, { invitations: response.data.data.invitations });
    });
  },
  [ACTIONS.INVITATIONS_ACCEPT]({ commit }: ActionInputs, { id }: { id: string }) {
    return API.invitations.accept(id).then((response: AxiosResponse) => {
      commit(MUTATIONS.INVITATIONS_REMOVE, { id });
    });
  },
  [ACTIONS.INVITATIONS_REJECT]({ commit }: ActionInputs, { id }: { id: string }) {
    return API.invitations.reject(id).then((response: AxiosResponse) => {
      commit(MUTATIONS.INVITATIONS_REMOVE, { id });
    });
  },
};

const mutations = {
  [MUTATIONS.INVITATIONS_RESET](state: DefaultState) {
    state.pending = [];
  },
  [MUTATIONS.INVITATIONS_LOAD](
    state: DefaultState,
    { invitations }: { invitations: INVITATION[] },
  ) {
    state.pending = invitations;
  },
  [MUTATIONS.INVITATIONS_REMOVE](state: DefaultState, { id }: { id: string }) {
    const findIndex = state.pending.findIndex(invitation => invitation.id === id);
    if (findIndex === -1) return;
    Vue.delete(state.pending, findIndex);
  },
};

export default {
  state: moduleState,
  getters,
  actions,
  mutations,
};
