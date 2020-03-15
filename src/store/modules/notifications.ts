import { cloneDeep } from 'lodash';
import Vue from 'vue';
import MUTATIONS from '../types-mutations';
import ACTIONS from '../types-actions';
import { Notification } from '../interfaces/notification';
import { ActionInputs } from '../interfaces/api';
import { randomChars } from '../../utils/auxFunctions';

interface DefaultState {
  active: { [index: string]: Notification },
}

const defaultState: DefaultState = {
  active: {},
};

const moduleState = cloneDeep(defaultState);

const getters = {};

const actions = {
  [ACTIONS.NOTIFICATION_CREATE](
    { commit }: ActionInputs,
    { notification }: { notification: Notification },
  ) {
    if (!notification.time) throw new Error('Notification object must provide a time.');
    const id = randomChars(6);
    commit(MUTATIONS.NOTIFICATION_PUSH, { notification, id });
    setTimeout(() => {
      commit(MUTATIONS.NOTIFICATION_REMOVE, { id });
    }, notification.time * 1000);
  },
};

const mutations = {
  [MUTATIONS.NOTIFICATION_PUSH](
    state: DefaultState,
    { notification, id }: { notification: Notification, id: string },
  ) {
    Vue.set(state.active, id, notification);
  },
  [MUTATIONS.NOTIFICATION_REMOVE](state: DefaultState, { id }: { id: string }) {
    Vue.delete(state.active, id);
  },
  [MUTATIONS.NOTIFICATION_REMOVE_ALL](state: DefaultState) {
    Vue.set(state, 'active', {});
  },
};

export default {
  state: moduleState,
  getters,
  actions,
  mutations,
};
