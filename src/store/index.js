import Vue from 'vue';
import Vuex from 'vuex';
import nexus from './modules/nexus';
import account from './modules/account';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    nexus: {
      ...nexus,
      namespaced: true,
    },
    account,
  },
  strict: debug,
});
