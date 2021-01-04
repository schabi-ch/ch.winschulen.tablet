<template>
  <q-page class="q-pa-md" style="margin: 0 auto; max-width: 760px">
    <div v-if="searchResults == null">Suchergebnisse werden geladen...</div>
    <div v-else-if="searchResults.length == 0">
      Zu "{{ searchString }}" wurde leider nichts gefunden. Versuche einen
      anderen Suchbegriff.
    </div>
    <div v-else>
      <h1>Suchresultate</h1>
      <q-list separator bordered>
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
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("app", ["searchResults", "searchString"])
  },
  data() {
    return {
      loading: true
    };
  }
};
</script>

<style></style>
