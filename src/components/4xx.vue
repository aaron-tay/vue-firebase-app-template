<template>
  <div class="4xx">
    <h1>
      404 = page not found
    </h1>
    <hr />
    <router-link :to="{ name: 'home' }">
      back home
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'Core4xx',
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss">
</style>
