<template>
  <q-page class="page">
    <div class="orientation-portrait absolute-center text-center">
      <q-icon name="screen_rotation" size="xl" class="q-pa-lg"></q-icon>
      <p>Bitte drehe das Tablet, umd die Karte anzuzeigen.</p>
    </div>
    <div class="map-container orientation-landscape">
      <div v-if="initLoading" class=" absolute-center text-center">
        <q-icon name="online_prediction" size="xl" class="q-pa-lg"></q-icon>
        <p>Inhalt wird geladen, bitte kurz warten...</p>
      </div>
      <div v-else class="map-frame">
        <img src="Schulhaus.jpg" class="map" usemap="#schulhaus" />
        <map name="wanderkarte">
          <!--
            <area
              shape="poly"
              class="pointer"
              coords="366,550,396,480,330,456,253,459,258,541"
              @click="clickHelppoint"
            />
            -->
        </map>
        <!-- Spielplatz top=Y, left=X -->
        <map-point
          :articleId="777"
          :categoryId="14"
          style="top:668px;left:649px"
        />
        <map-point
          :articleId="783"
          :categoryId="14"
          style="top:668px;left:529px"
        />
        <map-point
          :articleId="785"
          :categoryId="14"
          style="top:669px;left:387px"
        />
        <map-point
          :articleId="787"
          :categoryId="14"
          style="top:687px;left:236px"
        />

        <!-- Erste Schritte -->
        <map-point
          :articleId="14"
          :categoryId="29"
          style="top:571px;left:443px"
        />
        <map-point
          :articleId="17"
          :categoryId="29"
          style="top:529px;left:489px"
        />
        <map-point
          :articleId="19"
          :categoryId="29"
          style="top:422px;left:636px"
        />
        <map-point
          :articleId="70"
          :categoryId="29"
          style="top:463px;left:664px"
        />
        <map-point
          :articleId="27"
          :categoryId="29"
          style="top:450px;left:709px"
        />
        <map-point
          :articleId="77"
          :categoryId="29"
          style="top:465px;left:770px"
        />

        <!-- 1x1 Zimmer -->
        <map-point
          :articleId="79"
          :categoryId="30"
          style="top:329px;left:792px"
        />
        <map-point
          :articleId="81"
          :categoryId="30"
          style="top:326px;left:732px"
        />
        <map-point
          :articleId="91"
          :categoryId="30"
          style="top:310px;left:673px"
        />
        <map-point
          :articleId="99"
          :categoryId="30"
          style="top:320px;left:620px"
        />

        <!-- Projektzimmer -->
        <map-point
          :articleId="72"
          :categoryId="31"
          style="top:329px;left:313px"
        />
        <map-point
          :articleId="83"
          :categoryId="31"
          style="top:329px;left:252px"
        />
        <map-point
          :articleId="139"
          :categoryId="31"
          style="top:327px;left:196px"
        />

        <!-- Kopierzimmer -->
        <map-point
          :articleId="95"
          :categoryId="32"
          style="top:183px;left:102px"
        />
        <map-point
          :articleId="97"
          :categoryId="32"
          style="top:210px;left:84px"
        />

        <!-- Kreativzimmer -->
        <map-point
          :articleId="23"
          :categoryId="33"
          style="top:149px;left:169px"
        />
        <map-point
          :articleId="85"
          :categoryId="33"
          style="top:127px;left:234px"
        />
        <map-point
          :articleId="151"
          :categoryId="33"
          style="top:197px;left:327px"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import MapPoint from "src/components/MapPoint.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { MapPoint },
  computed: {
    ...mapGetters("app", ["initLoading", "categories"])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("app", ["setCurrentCategory"])
  },
  created() {
    this.setCurrentCategory(null);
  }
};
</script>

<style></style>
