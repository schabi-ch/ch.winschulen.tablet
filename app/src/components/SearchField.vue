<template>
  <q-input
    rounded
    outlined
    dense
    v-model="searchInput"
    color="primary"
    bg-color="grey-2"
    @keyup.enter="searchArticle"
  >
    <template v-slot:append>
      <q-btn icon="search" round flat @click="searchArticle" />
    </template>
  </q-input>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      searchInput: ""
    };
  },
  methods: {
    ...mapActions("app", ["search"]),
    async searchArticle() {
      this.search(this.searchInput);
      this.$router.push({
        name: "search"
      });
    }
  }
};
</script>

<style></style>
