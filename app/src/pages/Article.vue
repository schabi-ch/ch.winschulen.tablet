<template>
  <q-page
    class="q-pa-md"
    style="margin: 0 auto; max-width: 760px"
    v-if="!initLoading"
  >
    <h1>{{ article.title }}</h1>
    <div v-html="article.content"></div>

    <q-banner class="text-white bg-orange q-ma-lg" rounded v-if="error"
      >ERROR: {{ error }}
      <pre>{{ error }}</pre>
    </q-banner>

    <div class="text-white bg-secondary row q-pa-md justify-center">
      <q-btn
        outline
        :label="setTaskDoneLabel"
        stretch
        @click="toggleTaskDone"
        class="q-mr-md"
      ></q-btn>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("app", ["initLoading", "articles"]),
    article: function() {
      return this.articles.find(i => i.id == this.articleId);
    },
    icon: function() {
      if (this.article != null && this.article.done) {
        //return "check_circle_outline";
        return "check";
      } else {
        return ""; //"adjust";
      }
    },
    setTaskDoneLabel: function() {
      if (this.article != null && this.article.done) {
        return "als ungelesen markieren";
      } else {
        return "als gelesen markieren";
      }
    }
  },
  data() {
    return {
      loading: false,
      articleId: null,
      response: false,
      error: null
    };
  },
  methods: {
    ...mapActions("app", ["setTaskDone"]),
    toggleTaskDone() {
      this.setTaskDone({
        id: this.article.id,
        value: !this.article.done
      });
    }
  },
  async created() {
    this.articleId = this.$route.params.id;
    console.l;
    /*
    this.$q.loading.show({ message: "Inhalt wird geladen..." });
    //this.$route.params.id
    //https://github.com/axios/axios/issues/2505

    const options = {
      url: process.env.API + "posts/" + this.$route.params.id,
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
    

    this.$q.loading.hide();
 */
  }
};
</script>

<style></style>
