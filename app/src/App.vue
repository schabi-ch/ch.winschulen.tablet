<template>
  <div id="q-app">
    <!--<router-view :key="$route.fullPath"></router-view> -->
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions("app", ["init"])
  },
  async created() {
    this.$q.loading.show({ message: "Inhalt wird geladen..." });
    await this.init();
    this.$q.loading.hide();
  }
};
</script>
