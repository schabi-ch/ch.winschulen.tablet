<template>
  <q-page
    class="q-pa-md"
    style="margin: 0 auto; max-width: 760px"
    v-if="!initLoading"
  >
    <div v-if="loading">lade Inhalt...</div>
    <div v-else>
      <h1>{{ article.title }}</h1>
      <div v-html="articleContent"></div>

      <q-banner class="text-white bg-orange q-ma-lg" rounded v-if="error"
        >ERROR: {{ error }}
        <pre>{{ error }}</pre>
      </q-banner>

      <div
        class="text-white bg-secondary row q-pa-md justify-center"
        style="margin-top: 50px"
      >
        <q-btn
          outline
          :label="setTaskDoneLabel"
          stretch
          @click="toggleTaskDone"
          class="q-mr-md"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import YoutubeVideo from "components/YouTubeVideo";
import VimeoVideo from "components/VimeoVideo";
import Vue from "vue";

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
      articleContent: "",
      response: false,
      error: null,
      videosYoutube: [],
      videosVimeo: []
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
  },
  async beforeMount() {
    this.loading = true;
    this.articleId = this.$route.params.id;

    console.log("created in article", this.articles);
    this.articleContent = await this.article.content;

    // transform youtube links
    //<div class="youtube" id="ho30rpZ20ro" ref="youtube-ho30rpZ20ro"></div>
    var url = "";
    this.articleContent = this.article.content.replace(
      /(\[\[youtube:)(.*?)(\]\])/g,
      match => {
        url = match.slice(10, -2);
        this.videosYoutube.push({ url: url });
        return `<div class="youtube" id="youtube-${url}"></div>`;
      }
    );
    this.articleContent = this.articleContent.replace(
      /(\[\[vimeo:)(.*?)(\]\])/g,
      match => {
        url = match.slice(8, -2);
        this.videosVimeo.push({ url: url });
        return `<div class="vimeo" id="vimeo-${url}" ref="vimeo-${url}"></div>`;
      }
    );

    var YoutubeComponentClass = Vue.extend(YoutubeVideo);
    this.videosYoutube.forEach(video => {
      video.component = new YoutubeComponentClass({
        propsData: { url: video.url }
      });
      video.component.$mount(); // pass nothing
    });

    var VimeoComponentClass = Vue.extend(VimeoVideo);
    this.videosVimeo.forEach(video => {
      video.component = new VimeoComponentClass({
        propsData: { url: video.url }
      });
      video.component.$mount(); // pass nothing
    });

    this.loading = false;

    // https://css-tricks.com/creating-vue-js-component-instances-programmatically/
  },
  updated() {
    this.videosYoutube.forEach(video => {
      var container = document.getElementById("youtube-" + video.url);
      container.appendChild(video.component.$el);
    });

    this.videosVimeo.forEach(video => {
      var container = document.getElementById("vimeo-" + video.url);
      container.appendChild(video.component.$el);
    });
    console.log("vimeo", this.videosVimeo);
  }
};
</script>

<style></style>
