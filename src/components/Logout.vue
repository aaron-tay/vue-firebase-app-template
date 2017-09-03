<template>
  <div class="logout">
    <h1>
      logging out...
    </h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'logout',
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
    ]),
  },
  methods: {
    ...mapActions([
      'logoutFromApp',
    ]),
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.replace({
        name: 'Login',
      });
      return;
    }

    this.logoutFromApp();
  },
  watch: {
    isAuthenticated(current) {
      if (!current) {
        this.$router.replace({
          name: 'Login',
        });
      }
    },
  },
};
</script>

<style lang="scss">
</style>
