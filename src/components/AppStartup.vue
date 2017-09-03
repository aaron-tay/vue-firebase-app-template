<!-- AppStartup is responsible for ensuring the app has loaded runtime dependencies -->
<template>
  <div class="app-startup">
    <h1>
      loading application...
    </h1>

    <!-- Our firebase component does the actual initilisation of itself -->
    <firebase @onFirebaseInitialised="onFirebaseInitialised"></firebase>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import lodash from 'lodash';
import Firebase from '@/components/Firebase';

export default {
  components: {
    Firebase,
  },
  data() {
    return {
      dependencies: {
        firebase: false,
      },
    };
  },
  methods: {
    ...mapActions('nexus', [
      'markAppAsInitialised',
    ]),
    onFirebaseInitialised() {
      this.dependencies.firebase = true;
    },
  },
  watch: {
    dependencies: {
      deep: true,
      handler(current) {
        if (!current) { return; }
        const numberLoaded = lodash.size(lodash.filter(current, i => i));
        const numberRequired = lodash.size(current);
        const allDependenciesLoaded = (numberLoaded === numberRequired);

        if (allDependenciesLoaded) {
          this.markAppAsInitialised();
        }
      },
    },
  },
};
</script>

<style lang="scss">
.app-startup .hero-head .nav {
  background: white;
}
</style>
