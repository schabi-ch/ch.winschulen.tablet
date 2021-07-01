<template>
  <q-page
    class="q-ma-md"
    style="margin: 0 auto; max-width: 1200px"
    v-if="!initLoading"
  >
    <h1 class="q-py-md">{{ title }}</h1>
    <div v-html="content"></div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("app", ["userMode", "initLoading", "articles"])
  },
  data() {
    return {
      loading: false,
      content: "",
      title: ""
    };
  },
   methods: {
    ...mapActions("app", [
      "setUserMode"
    ])
    },
  async beforeMount() {
    if (this.userMode == null) {
      this.setUserMode("public");
    }
    this.content = this.articles.find(i => i.id == 1208).content;
    this.title = this.articles.find(i => i.id == 1208).title;
  }
};
</script>

<style lang="scss">
.q-item__label {
  font-weight: 700;
}
</style>
