<!-- Firebase component is dumb and simply retrieves immediate user state -->
<template>
  <div></div>
</template>

<script>
import firebase from 'firebase';
import { mapActions } from 'vuex';

firebase.initializeApp(process.env.FIREBASE);

export default {
  created() {
    // Always check redirect result on load
    this.checkAuthFromRedirectResult();

    // Register our listener to auth state changes
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  },
  methods: {
    ...mapActions([
      'finishAuthWithProviderCredentials',
      'finishAuthWithUser',
    ]),
    signalFirebaseAsInitialised() {
      this.$emit('onFirebaseInitialised');
    },
    handleAuthStateChange(user) {
      console.log('authchanged', user);
      if (user) {
        // User is signed in.
        const self = this;
        this.finishAuthWithUser(user).then(() => {
          self.signalFirebaseAsInitialised();
        });
      } else {
        // No user is signed in.
        // self.onFinishAuthWithoutUser();
        this.signalFirebaseAsInitialised();
      }
    },
    checkAuthFromRedirectResult() {
      // NOTE(ajt): This is more useful for retrieving errors if the user denied us
      // The only thing most useful to us it the provider-specific credential
      // But other user data can be retrieve via 'onAuthStateChanged()'
      const self = this;
      firebase.auth().getRedirectResult().then((result) => {
        if (!result.user) { return; }

        // We ONLY get provider credentials after an immediate redirect.
        if (result.credential) {
          const providerCredentials = result.credential;
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = providerCredentials.accessToken;
          const idToken = providerCredentials.idToken;
          const provider = providerCredentials.provider;
          console.log('credentials', token, idToken, provider);
          console.log(result.user.uid);

          self.finishAuthWithProviderCredentials({
            userId: result.user.uid,
            providerCredentials,
          });
        }
        // We handle the case of user information on state changes
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        // Optional information about the user if available
        // Email and type of auth credentials / provider
        const email = error.email;
        const credential = error.credential;
        console.log('AuthFailed:', errorCode, errorMessage, email, credential);
        // NOTE(ajt): Writing to the VuexStore will allow more fine grain control
      });
    },
  },
};
</script>
