<template>
  <div>
    <h1>
      Welcome back!
    </h1>
    <div>
      {{ myProfile.displayName }}
    </div>
    <hr />
    <router-link :to="{ name: 'Logout' }" class="button">
      logout
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'home',
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'myProfile',
    ]),
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
  },
};
</script>

<style lang="scss" scoped>
</style>
