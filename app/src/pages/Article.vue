<template>
  <q-page
    class="q-pa-md"
    style="margin: 0 auto; max-width: 760px"
    v-if="!initLoading"
  >
    <div v-if="loading">lade Inhalt...</div>
    <div v-else>
      <div class="row">
        <q-btn
          outline
          rounded
          v-if="currentCategory != null"
          :label="currentCategory.label"
          @click="$router.push(`/kategorie/${currentCategory.id}`)"
          icon="expand_less"
          class="q-mb-md"
          no-caps
        />
        <q-space />
        <q-btn
          outline
          rounded
          @click="saveArticle"
          :icon="articleSaved ? 'bookmark' : 'bookmark_border'"
          class="q-mb-md"
          no-caps
        />
      </div>

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
          v-if="!article.done"
          outline
          :label="setTaskDoneLabel"
          stretch
          @click="toggleTaskDone"
          class="q-mr-md"
          style="font-weight: bold"
        ></q-btn>
        <q-btn
          v-else
          outline
          :label="setTaskDoneLabel"
          stretch
          color="grey"
          @click="toggleTaskDone"
          class="q-mr-md"
        ></q-btn>
      </div>

      <div v-if="currentCategory != null" class="row q-my-md">
        <q-btn
          v-if="previousArticle != null"
          outline
          rounded
          @click="
            $router.push(`/artikel/${previousArticle.id}`);
            loadArticle();
          "
          icon="chevron_left"
          no-caps
        />
        <q-space v-if="previousArticle != null" />
        <q-btn
          outline
          rounded
          :label="currentCategory.label"
          @click="$router.push(`/kategorie/${currentCategory.id}`)"
          icon="expand_less"
          no-caps
        />
        <q-space v-if="nextArticle != null" />
        <q-btn
          v-if="nextArticle != null"
          outline
          rounded
          @click="
            $router.push(`/artikel/${nextArticle.id}`);
            loadArticle();
          "
          icon="chevron_right"
          no-caps
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import YoutubeVideo from "components/YouTubeVideo";
//import VimeoVideo from "components/VimeoVideo";
import Vue from "vue";

export default {
  computed: {
    ...mapGetters("app", [
      "initLoading",
      "articles",
      "currentCategory",
      "savedArticles"
    ]),
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
    },
    nextArticle: function() {
      if (this.currentCategory != null) {
        var currentIndex = this.currentCategory.articles.findIndex(
          q => q.id == this.articleId
        );
        console.log("currentIndex", currentIndex);
        if (currentIndex == this.currentCategory.articles.length - 1) {
          return null;
        } else {
          console.log(
            "next article",
            this.currentCategory.articles[currentIndex + 1]
          );
          return this.currentCategory.articles[currentIndex + 1];
        }
      } else {
        return null;
      }
    },
    previousArticle: function() {
      if (this.currentCategory != null) {
        var currentIndex = this.currentCategory.articles.findIndex(
          q => q.id == this.articleId
        );
        if (currentIndex == 0) {
          return null;
        } else {
          return this.currentCategory.articles[currentIndex - 1];
        }
      } else {
        return null;
      }
    },
    articleSaved: function() {
      var index = this.mySavedArticles.indexOf(this.article.id);
      if (index >= 0) {
        return true;
      } else {
        return false;
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
      videosVimeo: [],
      mySavedArticles: []
    };
  },
  methods: {
    ...mapActions("app", [
      "setTaskDone",
      "getSavedArticles",
      "setSavedArticles"
    ]),
    toggleTaskDone() {
      this.setTaskDone({
        id: this.article.id,
        value: !this.article.done
      });
    },
    async loadArticle() {
      this.loading = true;
      this.articleId = this.$route.params.id;

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
      /* Vimeo Videos (not working)
      this.articleContent = this.articleContent.replace(
        /(\[\[vimeo:)(.*?)(\]\])/g,
        match => {
          url = match.slice(8, -2);
          this.videosVimeo.push({ url: url });
          return `<div class="vimeo" id="vimeo-${url}" ref="vimeo-${url}"></div>`;
        }
      );
      */
      var YoutubeComponentClass = Vue.extend(YoutubeVideo);
      this.videosYoutube.forEach(video => {
        video.component = new YoutubeComponentClass({
          propsData: { url: video.url }
        });
        video.component.$mount(); // pass nothing
      });

      /* Vimeo Videos (not working)
      var VimeoComponentClass = Vue.extend(VimeoVideo);
      this.videosVimeo.forEach(video => {
        video.component = new VimeoComponentClass({
          propsData: { url: video.url }
        });
        video.component.$mount(); // pass nothing
      });
 */
      this.loading = false;

      // https://css-tricks.com/creating-vue-js-component-instances-programmatically/
    },
    saveArticle() {
      if (!this.articleSaved) {
        // save article
        this.mySavedArticles.push(this.article.id);
        this.setSavedArticles(this.mySavedArticles);
      } else {
        // remove articele from saved articles
        var index = this.mySavedArticles.indexOf(this.article.id);
        this.mySavedArticles.splice(index, 1);
        this.setSavedArticles(this.mySavedArticles);
      }
    }
  },
  async created() {
    await this.getSavedArticles();
    this.mySavedArticles = this.savedArticles.slice();
  },
  async beforeMount() {
    await this.loadArticle();
  },
  updated() {
    this.videosYoutube.forEach(video => {
      var container = document.getElementById("youtube-" + video.url);
      container.appendChild(video.component.$el);
    });
    /* Vimeo Videos (not working)
    this.videosVimeo.forEach(video => {
      var container = document.getElementById("vimeo-" + video.url);
      container.appendChild(video.component.$el);
    });
    */
  }
};
</script>

<style></style>
