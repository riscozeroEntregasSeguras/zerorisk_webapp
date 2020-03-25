import Vue from 'vue';
import { cloneDeep } from 'lodash';
import { setCookie, removeCookie } from 'tiny-cookie';
import { AxiosResponse, AxiosError } from 'axios';
import { ActionInputs, ApiError } from '../interfaces/api';
import {
  USER_INPUTS,
  USER,
  USER_STATUS,
  USER_LOCATION,
} from '../interfaces/user';
import ACTIONS from '../types-actions';
import MUTATIONS from '../types-mutations';
import API from '../../utils/api';
import HTTP from '../../utils/http';

interface DefaultState {
  validSession: boolean
  token: string
  user: null | USER
}

const defaultState: DefaultState = {
  validSession: false,
  token: '',
  user: null,
};

const moduleState = cloneDeep(defaultState);

const getters = {};

const actions = {

  [ACTIONS.USER_REGISTER](
    { commit }: ActionInputs,
    {
      email,
      name,
      nickname,
      password,
    }: USER_INPUTS,
  ): Promise<boolean> {
    return API.user.register(email, name, nickname, password).then((response: AxiosResponse) => {
      return true;
    }).catch((error: AxiosError | ApiError) => {
      throw API.buildError(error as AxiosError);
    });
  },

  /**
   * Requests a token for a user/password combination.
   * If keepSignedIn, saves the token to a cookie for session recover.
   * If the token is successfully retrieve, requests the user data.
   * If the user/password combination is invalid or the request
   * for the user data fails, cleans all the user session related
   * data.
   * @param param0
   * @param param1
   */
  [ACTIONS.USER_REQUEST_TOKEN](
    { commit, dispatch }: ActionInputs,
    { email, password }: { email: string, password: string },
  ): Promise<boolean> {
    return API.user.login(email, password).then((response: AxiosResponse) => {
      commit(MUTATIONS.USER_SET_TOKEN, { token: response.data.data.token });
      commit(MUTATIONS.USER_LOAD_DATA, { user: response.data.data.user });
      dispatch(ACTIONS.INVITATIONS_LOAD, { userId: response.data.data.user.id });
      return true;
    }).catch((error: AxiosError | ApiError) => {
      console.log({ error });
      dispatch(ACTIONS.USER_LOGOUT);
      throw API.buildError(error as AxiosError);
    });
  },

  /**
   * Request the user data
   * @param param0
   */
  [ACTIONS.USER_LOAD_DATA]({ state, commit, dispatch }: ActionInputs): boolean | Promise<boolean> {
    // Cannot request user data if no token is set
    if (!state.token) return false;
    // Only make this call once.
    // If the user data and session are already in store, void it.
    if (state.user !== null && state.validSession) return true;

    // Master load for app load state
    commit(MUTATIONS.GLOBAL_MASTER_LOADING_START);
    return API.user.reflect().then((response: any) => {
      commit(MUTATIONS.USER_LOAD_DATA, { user: response.data.data.user });
      dispatch(ACTIONS.INVITATIONS_LOAD, { userId: response.data.data.user.id });
      return true;
    }).catch((error: any) => {
      dispatch(ACTIONS.USER_LOGOUT);
      throw API.buildError(error);
    }).finally(() => {
      commit(MUTATIONS.GLOBAL_MASTER_LOADING_END);
    });
  },

  [ACTIONS.USER_LOGOUT]({ commit }: ActionInputs) {
    commit(MUTATIONS.USER_LOGOUT);
    // NOTE: list all store reset mutations here:
    commit(MUTATIONS.INVITATIONS_RESET);
  },

  [ACTIONS.USER_CHANGE_STATE](
    { commit, state }: ActionInputs,
    { status }: { status: USER_STATUS },
  ): void | Promise<void> {
    // Not valid for non registered users
    if (!state.validSession) return undefined;
    // No need to call  if user is not changing the status
    if (status === state.user.status) return undefined;
    // User cannot set FALECIDO to himself
    if (status === USER_STATUS.FALECIDO) return undefined;

    commit(MUTATIONS.GLOBAL_MASTER_LOADING_START);
    return API.user.changeStatus(status).then((response: any) => {
      commit(MUTATIONS.USER_LOAD_DATA, { user: response.data.data.user });
    }).catch((error: any) => {
      throw API.buildError(error);
    }).finally(() => {
      commit(MUTATIONS.GLOBAL_MASTER_LOADING_END);
    });
  },

  [ACTIONS.USER_CHANGE_LOCATION](
    { commit, state }: ActionInputs,
    { location }: { location: USER_LOCATION },
  ): void | Promise<void> {
    // Not valid for non registered users
    if (!state.validSession) return undefined;
    // No need to call  if user is not changing the status
    if (location === state.user.location) return undefined;

    commit(MUTATIONS.GLOBAL_MASTER_LOADING_START);
    return API.user.changeLocation(location).then((response: any) => {
      commit(MUTATIONS.USER_LOAD_DATA, { user: response.data.data.user });
    }).catch((error: any) => {
      throw API.buildError(error);
    }).finally(() => {
      commit(MUTATIONS.GLOBAL_MASTER_LOADING_END);
    });
  },

  [ACTIONS.USER_INVITE_USER](
    { commit, state }: ActionInputs,
    { email }: { email: string },
  ): void | Promise<any> {
    return API.user.invite(email).catch((error: any) => {
      throw API.buildError(error);
    });
  },
};

const mutations = {

  /**
   * Set up the user token in the utilities that use it.
   * 1. Use the token for futher HTTP requests.
   * 2. Save the token into the store state
   * 3. Either save or clean the token to a cookie according to keepSignedIn
   * @param state
   * @param param1
   */
  [MUTATIONS.USER_SET_TOKEN](state: DefaultState, { token }: { token: string }) {
    HTTP.setHeader({ key: 'authorization', value: token });
    state.token = token;
    setCookie('authToken', token, { expires: '60D' });
  },

  /**
   * Save the user data and set the session as valid.
   * We only consider a session valid if we get the user data.
   * Just having a token string is not enough
   * @param state
   * @param user
   */
  [MUTATIONS.USER_LOAD_DATA](state: DefaultState, { user }: { user: USER }) {
    state.validSession = true;
    state.user = user;
  },

  /**
   * All process to invalidate a user session.
   * 1. Clear the cookie. Does not matter if it does not exist.
   * 2. Clear the token from the store.
   * 3. Invalidate the session.
   * 4. Default the user state to null (no user)
   * @param state
   */
  [MUTATIONS.USER_LOGOUT](state: DefaultState) {
    removeCookie('authToken');
    HTTP.unsetHeader({ key: 'authorization' });
    state.token = '';
    state.validSession = false;
    state.user = null;
  },
};

export default {
  state: moduleState,
  getters,
  actions,
  mutations,
};
