<template>
  <div>
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
          <img src="Wanderkarte.jpg" class="map" usemap="#wanderkarte" />

          <map name="wanderkarte">
            <area
              shape="poly"
              class="pointer"
              coords="366,550,396,480,330,456,253,459,258,541"
              @click="$router.push('/artikel/104')"
            />
          </map>
          <!-- Dorfrundgang top=Y, left=X -->
          <map-point :articleId="9" style="top:146px;left:227px" />
          <map-point :articleId="12" style="top:177px;left:187px" />
          <map-point :articleId="29" style="top:222px;left:160px" />
          <map-point :articleId="14" style="top:233px;left:205px" />
          <map-point :articleId="17" style="top:209px;left:254px" />
          <map-point :articleId="19" style="top:183px;left:297px" />
          <map-point :articleId="70" style="top:191px;left:350px" />
          <map-point :articleId="21" style="top:185px;left:403px" />
          <map-point :articleId="27" style="top:150px;left:419px" />

          <!-- Zum Berge des Gipfels -->
          <map-point :articleId="33" style="top:113px;left:374px" />
          <map-point :articleId="72" style="top:116px;left:420px" />
          <map-point :articleId="74" style="top:120px;left:466px" />
          <map-point :articleId="77" style="top:117px;left:509px" />
          <map-point :articleId="79" style="top:109px;left:555px" />
          <map-point :articleId="81" style="top:107px;left:600px" />
          <map-point :articleId="83" style="top:110px;left:649px" />
          <map-point :articleId="85" style="top:104px;left:695px" />

          <!-- Die Bergtour -->
          <map-point :articleId="87" style="top:75px;left:726px" />
          <map-point :articleId="89" style="top:66px;left:780px" />
          <map-point :articleId="91" style="top:29px;left:799px" />
          <map-point :articleId="93" style="top:1px;left:751px" />

          <!-- Zum Bergsee -->
          <map-point :articleId="95" style="top:118px;left:773px" />
          <map-point :articleId="97" style="top:152px;left:851px" />
          <map-point :articleId="99" style="top:188px;left:934px" />
          <map-point :articleId="126" style="top:232px;left:884px" />
          <map-point :articleId="101" style="top:268px;left:961px" />
          <map-point :articleId="104" style="top:268px;left:824px" />

          <!-- Wahlprogramm: Zusatzschritte für Schrittzähler -->
          <map-point :articleId="130" style="top:350px;left:557px" />
          <map-point :articleId="31" style="top:405px;left:582px" />
          <map-point :articleId="133" style="top:437px;left:533px" />
          <map-point :articleId="135" style="top:426px;left:471px" />
          <map-point :articleId="137" style="top:435px;left:392px" />
          <map-point :articleId="139" style="top:368px;left:418px" />
          <map-point :articleId="141" style="top:326px;left:500px" />

          <!-- Wahlprogramm: Abendspaziergang für Kreative -->
          <map-point :articleId="23" style="top:300px;left:889px" />
          <map-point :articleId="151" style="top:311px;left:990px" />
          <map-point :articleId="153" style="top:398px;left:944px" />
          <map-point :articleId="155" style="top:345px;left:838px" />

          <!-- Wahlprogramm: Entdeckungstour für Forscher -->
          <map-point :articleId="143" style="top:376px;left:777px" />
          <map-point :articleId="145" style="top:448px;left:821px" />
          <map-point :articleId="149" style="top:445px;left:717px" />
          <map-point :articleId="147" style="top:394px;left:647px" />
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
.map-container {
  width: 1024px;
  height: 724px;
  overflow: hidden;
  margin: 0 auto;
}
.map-frame {
  position: relative;
}
.map {
  width: 100%;
  height: auto;
}
</style>
