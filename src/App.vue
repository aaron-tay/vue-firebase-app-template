<!--
The approach taken here is similar to mobile apps.
Basically we have a 'load/start-up' time where the app is essentially 'locked'
whilst is it initialising. Onces all its dependencies have been loaded, it will
transition to the proper routes.
-->
<template>
  <div id="app">
    <template v-if="!isAppInitialised">
      <app-startup></app-startup>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppStartup from '@/components/AppStartup';

export default {
  name: 'app',
  components: {
    AppStartup,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('nexus', [
      'isAppInitialised',
    ]),
    ...mapGetters([
      'isAuthenticated',
    ]),
  },
  watch: {
    isAppInitialised(current) {
      if (!current) { return; }

      // These guards are triggered when the app immediately transitions to READY
      // Because the state is now completely initialised, we can act appropriately
      // on any of the route rules for the current route (i.e. $this.route).

      // When the app is recently initialised, we should obey any redirect parameters
      // We use 'replace' to make the history a bit cleaner
      // see /router/index.js for complementary behaviour of handling the redirect parameter
      if (this.$route.query.redirect) {
        this.$router.replace({
          path: this.$route.query.redirect,
        });
        return;
      }

      // Check if authentication state permits access to route. If not, redirect
      // See App.vue for complementary behaviour of handling the redirect parameter
      if (this.$route.matched.some(record => record.meta.requiresAuthentication)) {
        if (!this.isAuthenticated) {
          this.$router.replace({
            name: 'Login',
            query: { redirect: this.$route.fullPath },
          });
          return;
        }
      }

      // When the app is recently initialised, we should auto-redirect the user from
      //  /login or /register pages
      // We use 'replace' to make the history a bit cleaner
      // see /router/index.js for complementary behaviour of handling the redirect parameter
      if (this.$route.matched.some(record => record.meta.redirectIfAuthenticated)) {
        if (this.isAuthenticated) {
          this.$router.replace({
            name: this.$route.meta.whenAuthenticatedRedirectToRouteName,
          });
        }
      }
    },
  },
};
</script>

<style>
</style>
