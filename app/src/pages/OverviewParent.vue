<template>
  <q-page
    class="q-ma-md"
    style="margin: 0 auto; max-width: 1200px"
    v-if="!initLoading"
  >
    <h1 class="q-pa-md">Informationen für die Eltern (Prototyp)</h1>
    <div class="row">
      <div class="col-md-6 q-px-sm">
        <q-list bordered>
          <q-expansion-item
            icon="tv"
            label="Warum bekommt jede Schülerin und jeder Schüler ein eigenes Tablet?"
            default-opened
            header-class="text-secondary"
          >
            <q-card>
              <q-card-section>
                <youtube-video url="ToeFsdYUuss" />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
      <div class="col-md-6 q-pl-sm">
        <q-list bordered>
          <q-expansion-item
            group="somegroup"
            icon="explore"
            label="Wie begleite ich mein Kind?"
            default-opened
            header-class="text-primary"
          >
            <q-card>
              <q-card-section v-html="chapter1"> </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            group="somegroup"
            icon="tablet_mac"
            label="Technische Einschränkungen"
            header-class="text-primary"
          >
            <q-card>
              <q-card-section v-html="chapter2"> </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            group="somegroup"
            icon="info"
            label="Ich möchte mehr wissen!"
            header-class="text-primary"
          >
            <q-card>
              <q-card-section v-html="chapter3"> </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            group="somegroup"
            icon="support"
            label="Ich oder mein Kind brauchen Hilfe!"
            header-class="text-accent"
          >
            <q-card>
              <q-card-section v-html="chapter4"> </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import YoutubeVideo from "components/YouTubeVideo";

export default {
  components: {
    YoutubeVideo
  },
  computed: {
    ...mapGetters("app", ["initLoading", "articles"])
  },
  data() {
    return {
      loading: false,
      chapter1: "",
      chapter2: "",
      chapter3: "",
      chapter4: ""
    };
  },
  async beforeMount() {
    this.chapter1 = this.articles.find(i => i.id == 1023).content;
    this.chapter2 = this.articles.find(i => i.id == 1025).content;
    this.chapter3 = this.articles.find(i => i.id == 1027).content;
    this.chapter4 = this.articles.find(i => i.id == 1029).content;
  }
};
</script>

<style lang="scss">
.q-item__label {
  font-weight: 700;
}
</style>
