<template>
  <q-page class="q-ma-md">
    <div class="row">
      <div class="col"><h1>SuS Homepage [TODO]</h1></div>
    </div>
    <div class="row">
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

      <div
        @click="$router.push('/artikel/7')"
        class="q-pa-md row items-start q-gutter-md"
      >
        <q-card class="content-card" style="width:300px">
          <q-img src="winterthur.jpg" :ratio="16 / 9" />
          <div class="q-pa-md">
            <div class="col text-h6 ellipsis">
              Wanderkarte
            </div>
            <div class="text-subtitle1">
              Einführung, 1. Halbtag
            </div>
            <div class="text-caption text-grey">
              Viel Spass.
            </div>
          </div>
        </q-card>
      </div>

      <div
        @click="$router.push('/artikel/7')"
        class="q-pa-md row items-start q-gutter-md"
      >
        <q-card class="content-card" style="width:300px">
          <q-img src="winterthur.jpg" :ratio="16 / 9" />
          <div class="q-pa-md">
            <div class="col text-h6 ellipsis">
              Artikel ID 7
            </div>
            <div class="text-subtitle1">
              Test
            </div>
            <div class="text-caption text-grey">
              Viel Spass.
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div class="row"><h1>2. Einführungshalbtag</h1></div>
    <div class="row">
      <div class="col">
        <div
          class="q-pa-md row items-start q-gutter-md"
          @click="$router.push('/lul/dorfrundgang')"
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
      </div>
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
