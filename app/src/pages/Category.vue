<template>
  <q-page
    class="q-pa-md"
    style="margin: 0 auto; max-width: 760px"
    v-if="currentCategory != null"
  >
    <h1>{{ currentCategory.label }}</h1>
    <q-list separator v-if="currentCategory.articles != null">
      <q-item
        tag="label"
        v-ripple
        v-for="article in currentCategory.articles"
        :key="article.id"
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="article.done"
            @input="toggleCheckbox(article.id, article.done)"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ article.title }}</q-item-label>
          <q-item-label
            caption
            lines="2"
            v-html="getSubtitle(article.subtitle)"
          />
        </q-item-section>
        <q-item-section side>
          <q-btn
            label="Anleitung"
            color="primary"
            rounded
            outline
            no-caps
            :to="`/artikel/${article.id}`"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("app", ["categories", "currentCategory"])
  },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    ...mapActions("app", ["getArticles", "setTaskDone"]),
    toggleCheckbox(id, value) {
      this.setTaskDone({ id: id, value: value });
    },
    getSubtitle(originalString) {
      originalString = originalString.toString();
      var strippedString = originalString.replace(/(<([^>]+)>)/gi, "");
      return strippedString;
    }
  },
  created() {
    //this.category = this.categories.find(i => i.id == this.$route.params.id);
    //https://ipad-help.muwa.ch/wp-json/wp/v2/posts?categories=3
  }
};
</script>

<style></style>
