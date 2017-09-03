<template>
  <div class="login">
    <h1>
      Welcome
    </h1>
    <div>
      Login to continue
    </div>
    <hr />
    <button @click="loginWithGoogle" :disabled="isAuthenticationInProgess">
      <span>
        Log in with Google
      </span>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'login',
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'isAuthenticationInProgess',
    ]),
  },
  methods: {
    ...mapActions([
      'beginAuthWithGoogle',
    ]),
    loginWithGoogle() {
      this.beginAuthWithGoogle();
    },
  },
};
</script>

<style lang="scss">
</style>
