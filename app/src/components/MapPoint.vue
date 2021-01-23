<template>
  <q-btn
    round
    flat
    dense
    :icon="icon"
    size="md"
    class="station"
    @click="showDetails()"
  />
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    articleId: Number,
    categoryId: {
      type: Number,
      required: false
    }
  },
  computed: {
    ...mapGetters("app", ["articles", "categories"]),
    article: function() {
      return this.articles.find(i => i.id == this.articleId);
    },
    icon: function() {
      if (this.article != null && this.article.done) {
        return "img:done.png";
      } else {
        return "img:open.png";
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
    ...mapActions("app", ["setTaskDone", "setCurrentCategory"]),
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
              if (this.categoryId != null) {
                var category = this.categories.find(
                  q => q.id == this.categoryId
                );
                this.setCurrentCategory(category);
              }
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
