<template>
  <q-page class="q-ma-md">
    <div v-if="article == null">laden...</div>
    <div v-else>
      <h1>{{ article.title.rendered }}</h1>
      <div v-html="article.content.rendered"></div>
      {{ article }}
      <div v-if="error">ERROR: {{ error }}</div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      article: null,
      response: false,
      error: null
    };
  },
  async created() {
    this.$q.loading.show({ message: "Inhalt wird geladen..." });
    //this.$route.params.id
    await axios
      .get(
        "https://ipad-help.muwa.ch/wp-json/wp/v2/posts/" + this.$route.params.id
      )
      .then(response => {
        this.article = response.data;
        /*
        const firstLayer = response.data.filter(p => p.parent == 0);
        firstLayer.forEach(n => {
          var newNode = { id: n.id, label: n.name };
          newNode = buildTree(newNode, response.data);
          this.categories.push(newNode);
        });
        */
      })
      .catch(error => {
        this.error = error;
        console.log("error", error);
      });
    this.$q.loading.hide();
  }
};
</script>

<style></style>
