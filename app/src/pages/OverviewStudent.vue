<template>
  <q-page class="q-ma-md">
    <div class="text-center">
      <h1>Ansicht Schülerinnen und Schüler</h1>

      <p>Todo</p>
    </div>
    <div class="row">
      <!--
      <div
        class="q-pa-md col items-start q-gutter-md"
        @click="$router.push('/kategorie/2')"
      >
        <q-card class="content-card" style="width:300px">
          <q-img src="winterthur.jpg" :ratio="16 / 9" />
          <div class="q-pa-md">
            <div class="col text-h6 ellipsis">
              Dorfrundgang
            </div>
            <div class="text-subtitle1">
              1. Etappe
            </div>
            <div class="text-caption text-grey">
              Hake die Liste ab.
            </div>
          </div>
        </q-card>
      </div>
-->
    </div>
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
