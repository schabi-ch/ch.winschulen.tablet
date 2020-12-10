<template>
  <div>
    <q-page class="flex flex-center">
      <div
        class="q-pa-md row items-start q-gutter-md"
        @click="$router.push('/lul/checkliste')"
      >
        <q-card class="content-card">
          <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <div class="q-pa-md">
            <div class="col text-h6 ellipsis">
              Checkliste
            </div>
            <div class="text-subtitle1">
              Einführung, 1. Halbtag
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
    </q-page>
  </div>
</template>

<script>
export default {
  methods: {
    gotoChecklist() {}
  }
};
</script>

<style></style>
