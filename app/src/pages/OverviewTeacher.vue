<template>
  <div>
    <q-page class="page">
      <div class="orientation-portrait absolute-center text-center">
        <q-icon name="screen_rotation" size="xl" class="q-pa-lg"></q-icon>
        <p>Bitte drehe das Tablet, umd die Karte anzuzeigen.</p>
      </div>
      <div class="orientation-landscape">
        <div v-if="initLoading" class=" absolute-center text-center">
          <q-icon name="online_prediction" size="xl" class="q-pa-lg"></q-icon>
          <p>Inhalt wird geladen, bitte kurz warten...</p>
        </div>
        <div v-else>
          <img src="Wanderkarte.jpeg" class="map" />
          <map-point :articleId="9" style="top:133px;left:207px" />
          <map-point :articleId="12" style="top:163px;left:182px" />
          <map-point :articleId="29" style="top:193px;left:197px" />
          <q-btn
            style="top:100px;left:1000px"
            round
            dense
            color="red"
            size="sm"
            icon="check_circle_outline"
            class="station"
          />
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import MapPoint from "src/components/MapPoint.vue";
import { mapGetters } from "vuex";

export default {
  components: { MapPoint },
  computed: {
    ...mapGetters("app", ["initLoading"])
  },
  data() {
    return {};
  },

  created() {}
};
</script>

<style>
.page {
  width: 1024px;
  height: calc(100vh - 50px);
  overflow: hidden;
  margin: 0 auto;
}
.map {
  width: 100%;
  height: auto;
}
</style>
