<template>
  <q-page class="q-ma-lg">
    <div v-if="article == null">laden...</div>
    <div v-else>
      <h1>{{ article.title.rendered }}</h1>
      <div v-html="article.content.rendered"></div>
    </div>
    <q-banner class="text-white bg-orange q-ma-lg" rounded v-if="error"
      >ERROR: {{ error }}
      <pre>{{ error }}</pre>
    </q-banner>
    <q-list bordered class="rounded-borders">
      <q-expansion-item expand-separator label="Development Infos">
        <pre>{{ article }}</pre>
      </q-expansion-item>
    </q-list>
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
    //https://github.com/axios/axios/issues/2505

    const options = {
      url:
        "https://tablet-admin.winschulen.ch/wp-json/wp/v2/posts/" +
        this.$route.params.id,
      method: "get"
    };

    delete options["data"];
    axios(options)
      .then(response => {
        this.article = response.data;
      })
      .catch(error => {
        this.error = error;
        console.log("error", error);
      });

    /*
    await axios
      .get(
        "https://ipad-help.muwa.ch/wp-json/wp/v2/posts/" + this.$route.params.id
      )
      .then(response => {
        this.article = response.data;
      })
      .catch(error => {
        this.error = error;
        console.log("error", error);
      });
     */

    this.$q.loading.hide();
  }
};
</script>

<style></style>
