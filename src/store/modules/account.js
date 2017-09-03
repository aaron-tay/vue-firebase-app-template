// Manages authentication and 'self' user state
import Vue from 'vue';
import lodash from 'lodash';
import firebase from 'firebase';

const localState = {
  myProfile: {},
  isAuthenticationInProgess: false,
};

const localGetters = {
  myProfile: state => state.myProfile,
  isAuthenticationInProgess: state => state.isAuthenticationInProgess,
  isAuthenticated: state => !lodash.isEmpty(state.myProfile),
};

const ACCOUNT_SET_MYSELF = 'ACCOUNT:SET_MYSELF';
const ACCOUNT_CLEAR_MYSELF = 'ACCOUNT:CLEAR_MYSELF';
const ACCOUNT_IN_PROGRESS = 'ACCOUNT:IN_PROGRESS';

const localActions = {
  beginAuthWithGoogle({ commit }) {
    commit(ACCOUNT_IN_PROGRESS);
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithRedirect(provider);
  },
  logoutFromApp({ commit }) {
    commit(ACCOUNT_IN_PROGRESS);
    firebase.auth().signOut();
    commit(ACCOUNT_CLEAR_MYSELF);
  },
  finishAuthWithProviderCredentials({ commit }, { firebaseUserId, providerCredentials }) {
    console.log(commit, firebaseUserId, providerCredentials);
  },
  finishAuthWithUser({ commit }, firebaseUser) {
    const userId = firebaseUser.uid;
    const userPath = `user/${userId}`;
    const userPromise = firebase.database().ref(userPath).once('value').then((snapshot) => {
      // User exists, return it immediately
      if (snapshot.val() !== null) { return snapshot.val(); }

      const userData = {
        displayName: firebaseUser.displayName,
        photoUrl: firebaseUser.photoURL,
      };

      return firebase.database().ref(userPath).set(userData).then(() => userData);
    });

    // Promise returned so it can be chained
    return userPromise.then((user) => {
      commit(ACCOUNT_SET_MYSELF, {
        userId,
        displayName: user.displayName,
        photoUrl: user.photoUrl,
      });
    });
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  [ACCOUNT_SET_MYSELF](state, { userId, displayName, photoUrl }) {
    Vue.set(state, 'myProfile', {
      userId, displayName, photoUrl,
    });
    Vue.set(state, 'isAuthenticationInProgess', false);
  },
  [ACCOUNT_CLEAR_MYSELF](state) {
    Vue.set(state, 'myProfile', {});
    Vue.set(state, 'isAuthenticationInProgess', false);
  },
  [ACCOUNT_IN_PROGRESS](state) {
    Vue.set(state, 'isAuthenticationInProgess', true);
  },
};
/* eslint-disable no-param-reassign */

export default {
  state: localState,
  actions: localActions,
  getters: localGetters,
  mutations,
};
