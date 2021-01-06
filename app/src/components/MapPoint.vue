<template>
  <q-btn
    round
    dense
    :icon="icon"
    :flat="!article.done"
    color="secondary"
    size="xs"
    class="station"
    @click="showDetails()"
  />
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    articleId: Number
  },
  computed: {
    ...mapGetters("app", ["articles"]),
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
  methods: {
    ...mapActions("app", ["setTaskDone"]),
    showDetails() {
      this.$q.notify({
        message: `<b>${this.article.title}</b>`,
        caption: this.article.subtitle,
        color: "secondary",
        html: true,
        actions: [
          {
            label: this.setTaskDoneLabel,
            color: "grey",
            handler: () => {
              this.setTaskDone({
                id: this.article.id,
                value: !this.article.done
              });
            }
          },
          {
            label: "Anleitung",
            color: "white",
            handler: () => {
              this.$router.push(`/artikel/${this.article.id}`);
            }
          }
        ]
      });
    }
  }
};
</script>

<style>
.station {
  position: absolute;
}
</style>
