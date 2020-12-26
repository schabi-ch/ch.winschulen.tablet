<template>
  <q-page class="q-ma-md">
    <h1>Kategorien</h1>
    <div class="q-pa-md q-gutter-sm">
      <q-tree :nodes="categories" node-key="label" />
    </div>

    <p class="text-h6">categories</p>
    {{ categories }}

    <p class="text-h6">Response</p>
    {{ response }}

    <q-separator spaced />
    student<br />
    https://ipad-help.muwa.ch/wp-json/wp/v2/categories
    https://ipad-help.muwa.ch/wp-json/wp/v2/posts/7
    https://ipad-help.muwa.ch/wp-json/wp/v2/posts?categories=3

    <q-banner class="text-white bg-orange q-ma-lg" rounded v-if="error"
      >ERROR: {{ error }}
      <pre>{{ error }}</pre>
    </q-banner>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      response: null,
      categories: [],
      error: null
      /*
      {
          label: 'Node 1',
          children: [
            { label: 'Node 1.1', lazy: true },
            { label: 'Node 1.2', lazy: true }
          ]
        },
        */
    };
  },
  async created() {}
};
</script>

<style></style>
