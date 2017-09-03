// All core system state goes which is directly relevant to app behaviour
// In general, user-facing components wouldn't interact with these.

// We keep out mutation constant and local only to this file so other stores
// cannot access them 'easily'.
const SYSTEM_APP_INITIALISED = 'SYSTEM:APP_INITIALISED';

const localState = {
  isAppInitialised: false,
};

const localGetters = {
  isAppInitialised: (state => state.isAppInitialised),
};

const localActions = {
  markAppAsInitialised({ commit }) {
    commit(SYSTEM_APP_INITIALISED);
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  [SYSTEM_APP_INITIALISED](state) {
    state.isAppInitialised = true;
  },
};
/* eslint-disable no-param-reassign */

export default {
  state: localState,
  actions: localActions,
  getters: localGetters,
  mutations,
};
