<template>
  <q-page class="q-pa-md">
    <h1>Tests</h1>
    Alle Artikel
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    //...mapGetters("app", ["categories", "currentCategory"])
  },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    //...mapActions("app", ["getArticles"])
  },
  created() {
    console.log("api", process.env.API);
    /*
    axios
      .get(process.env.API + "posts?per_page=100")
      .then(response => {
        console.log("posts", response.data);
      })
      .catch(error => {
        this.error = error;
        console.log("error", error);
      });
      */
    //this.category = this.categories.find(i => i.id == this.$route.params.id);
    //https://ipad-help.muwa.ch/wp-json/wp/v2/posts?categories=3
  }
};
</script>

<style></style>
