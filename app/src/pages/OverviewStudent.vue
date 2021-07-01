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
        <img src="WanderkarteSuS.jpg" class="map" usemap="#schulhaus" />
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
        <!-- Altstadt top=Y, left=X -->
        <map-point
          :articleId="777"
          :categoryId="14"
          style="top:249px;left:586px"
        />
        <map-point
          :articleId="783"
          :categoryId="14"
          style="top:195px;left:661px"
        />
        <map-point
          :articleId="785"
          :categoryId="14"
          style="top:92px;left:784px"
        />
        <map-point
          :articleId="787"
          :categoryId="14"
          style="top:172px;left:860px"
        />

        <!-- Drills Park -->
        <map-point
          :articleId="14"
          :categoryId="29"
          style="top:330px;left:899px"
        />
        <map-point
          :articleId="17"
          :categoryId="29"
          style="top:411px;left:936px"
        />
        <map-point
          :articleId="19"
          :categoryId="29"
          style="top:504px;left:927px"
        />
        <map-point
          :articleId="70"
          :categoryId="29"
          style="top:569px;left:831px"
        />
        <map-point
          :articleId="27"
          :categoryId="29"
          style="top:528px;left:709px"
        />
        <map-point
          :articleId="77"
          :categoryId="29"
          style="top:523px;left:606px"
        />

        <!-- Waldegg-See -->
        <map-point
          :articleId="79"
          :categoryId="30"
          style="top:692px;left:538px"
        />
        <map-point
          :articleId="81"
          :categoryId="30"
          style="top:672px;left:405px"
        />
        <map-point
          :articleId="91"
          :categoryId="30"
          style="top:689px;left:268px"
        />
        <map-point
          :articleId="99"
          :categoryId="30"
          style="top:648px;left:142px"
        />

        <!-- Projektzimmer -->
        <map-point
          :articleId="72"
          :categoryId="31"
          style="top:339px;left:21px"
        />
        <map-point
          :articleId="83"
          :categoryId="31"
          style="top:278px;left:25px"
        />
        <map-point
          :articleId="139"
          :categoryId="31"
          style="top:247px;left:76px"
        />

        <!-- Kopierzimmer -->
        <map-point
          :articleId="95"
          :categoryId="32"
          style="top:462px;left:235px"
        />
        <map-point
          :articleId="97"
          :categoryId="32"
          style="top:423px;left:172px"
        />

        <!-- Kreativzimmer -->
        <map-point
          :articleId="23"
          :categoryId="33"
          style="top:247px;left:295px"
        />
        <map-point
          :articleId="85"
          :categoryId="33"
          style="top:198px;left:220px"
        />
        <map-point
          :articleId="151"
          :categoryId="33"
          style="top:151px;left:286px"
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
