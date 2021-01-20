<template>
  <div id="q-app">
    <!--<router-view :key="$route.fullPath"></router-view> -->
    <router-view v-if="!initLoading"></router-view>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters("app", ["initLoading"])
  },
  methods: {
    ...mapActions("app", ["init"])
  },

  async created() {
    this.$q.loading.show({ message: "Inhalt wird geladen..." });

    console.log("start init");
    await this.init();
    console.log("end init");

    this.$q.loading.hide();
  }
};
</script>
