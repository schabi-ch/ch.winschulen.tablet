<template>
  <q-page class="q-pa-md" style="margin: 0 auto; max-width: 760px">
    <h1>Meine gespeicherten Anleitungen</h1>
    <q-list separator v-if="savedArticles != null && savedArticles.length > 0">
      <q-item
        tag="label"
        v-ripple
        v-for="articleId in savedArticles"
        :key="articleId"
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="article(articleId).done"
            @input="
              toggleCheckbox(article(articleId).id, article(articleId).done)
            "
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ article(articleId).title }}</q-item-label>
          <q-item-label
            caption
            lines="2"
            v-html="getSubtitle(article(articleId).subtitle)"
          />
        </q-item-section>
        <q-item-section side>
          <q-btn
            label="Anleitung"
            color="primary"
            rounded
            outline
            no-caps
            :to="`/artikel/${articleId}`"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-else>
      <p>
        Hast du eine Anleitung gelesen, die du später schnell zur Hand haben
        möchtest? Oder nochmals in Ruhe lesen?
      </p>
      <p>
        Dann klicke bei der gewünschten Anleitung oberhalb des Titels auf das
        Lesezeichen-Symbol und schon erscheint es hier in der Liste.
      </p>
      <q-btn outline rounded @click="testSave" icon="bookmark_border" />
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("app", ["articles", "savedArticles"])
  },
  methods: {
    ...mapActions("app", ["setTaskDone"]),
    toggleCheckbox(id, value) {
      this.setTaskDone({ id: id, value: value });
    },
    article: function(articleId) {
      return this.articles.find(i => i.id == articleId);
    },
    getSubtitle(originalString) {
      originalString = originalString.toString();
      var strippedString = originalString.replace(/(<([^>]+)>)/gi, "");
      return strippedString;
    },
    testSave() {
      this.$q.notify({
        message: "So sieht das Lesezeichen-Symbol aus 😉",
        color: "secondary"
      });
    }
  }
};
</script>

<style></style>
