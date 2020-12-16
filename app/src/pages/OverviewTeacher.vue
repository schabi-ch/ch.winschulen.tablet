<template>
  <div>
    <q-page class="flex flex-center">
      <div
        class="q-pa-md row items-start q-gutter-md"
        @click="$router.push('/lul/dorfrundgang')"
      >
        <q-card class="content-card">
          <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
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
        <q-card class="content-card">
          <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
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
        <q-card class="content-card">
          <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
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

      <div>
        <h6>LocalStorage</h6>
        Test:{{ test }}<br />
        LocalStorage:
        <pre>{{ $q.localStorage.getAll() }}</pre>
        <q-btn label="Test befüllen" @click="addTest" />
      </div>
    </q-page>
  </div>
</template>

<script>
import { LocalStorage } from "quasar";

export default {
  data() {
    return {
      test: this.$q.localStorage.getItem("test")
    };
  },
  methods: {
    gotoChecklist() {},
    addTest() {
      this.$q.localStorage.set("test", "hallo welt" + Date.now());
      this.test = this.$q.localStorage.getItem("test");
    }
  },
  created() {}
};
</script>

<style></style>
