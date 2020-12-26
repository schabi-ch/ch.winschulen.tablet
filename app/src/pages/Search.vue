<template>
  <q-page class="q-pa-md" style="margin: 0 auto; max-width: 760px">
    resulte: {{ searchResults }}
    <div v-if="searchResults == null">Suchergebnisse werden geladen...</div>
    <div v-else-if="searchResults.length == 0">
      Zu "{{ searchString }}" wurde leider nichts gefunden. Versuche einen
      anderen Suchbegriff.
    </div>
    <div v-else>
      <q-list separator>
        <q-item
          v-for="article in searchResults"
          :key="article.id"
          clickable
          v-ripple
          @click="$router.push({ path: `/artikel/${article.id}` })"
        >
          <q-item-section>
            <q-item-label>{{ article.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      {{ results }}
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("app", ["searchResults"])
  },
  data() {
    return {
      loading: true,
      searchString: "",
      results: null
    };
  },
  methods: {
    async search() {
      this.loading = true;
      console.log("search:", this.$route.params.search);
      await axios
        .get(process.env.API + "search?search=" + this.searchString) ///posts?=search[plugin]
        .then(response => {
          console.log("search result", response.data);
          this.results = response.data;
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
          console.log("error", error);
        });
    }
  },
  created() {
    //this.$route.params.id
    //this.searchString = this.$route.params.search;
    //this.search();
    //console.log("results", this.$route.params.search);
    //this.results = this.$route.params.search;
  }
};
</script>

<style></style>
