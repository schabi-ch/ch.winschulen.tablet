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
              @click="clickHelppoint"
            />
            <area
              shape="poly"
              class="pointer"
              coords="172,129,308,115,230,8,137,5"
              @click="clickFallschirm"
            />
            <area
              shape="poly"
              class="pointer"
              coords="344,358,447,358,445,330,345,321"
              @click="clickSchnitzeljagd"
            />
            <area
              shape="poly"
              class="pointer"
              coords="194,410,291,408,295,311,186,308"
              @click="clickKletterpark"
            />
            <area
              shape="poly"
              class="pointer"
              coords="7,441,172,415,157,357,5,357"
              @click="clickAdlerhorst"
            />
            <area
              shape="poly"
              class="pointer"
              coords="46,483,58,580,150,582,154,532,204,522,194,474"
              @click="clickWandergruppe"
            />
            <area
              shape="poly"
              class="pointer"
              coords="193,559,173,620,172,698,278,702,356,564"
              @click="clickMord"
            />
            <area
              shape="poly"
              class="pointer"
              coords="467,521,392,667,625,679,555,521"
              @click="clickPanoramaweg"
            />
            <area
              shape="poly"
              class="pointer"
              coords="650,676,970,705,1002,636,970,461,808,497,645,612"
              @click="clickWege"
            />
          </map>
          <!-- Dorfrundgang top=Y, left=X -->
          <map-point
            :articleId="9"
            :categoryId="2"
            style="top:146px;left:227px"
          />
          <map-point
            :articleId="12"
            :categoryId="2"
            style="top:177px;left:187px"
          />
          <map-point
            :articleId="29"
            :categoryId="2"
            style="top:222px;left:160px"
          />
          <map-point
            :articleId="14"
            :categoryId="2"
            style="top:233px;left:205px"
          />
          <map-point
            :articleId="17"
            :categoryId="2"
            style="top:209px;left:254px"
          />
          <map-point
            :articleId="19"
            :categoryId="2"
            style="top:183px;left:297px"
          />
          <map-point
            :articleId="70"
            :categoryId="2"
            style="top:191px;left:350px"
          />
          <map-point
            :articleId="21"
            :categoryId="2"
            style="top:185px;left:403px"
          />
          <map-point
            :articleId="27"
            :categoryId="2"
            style="top:150px;left:419px"
          />

          <!-- Zum Berge des Gipfels -->
          <map-point
            :articleId="33"
            :categoryId="3"
            style="top:113px;left:374px"
          />
          <map-point
            :articleId="72"
            :categoryId="3"
            style="top:116px;left:420px"
          />
          <map-point
            :articleId="74"
            :categoryId="3"
            style="top:120px;left:466px"
          />
          <map-point
            :articleId="77"
            :categoryId="3"
            style="top:117px;left:509px"
          />
          <map-point
            :articleId="79"
            :categoryId="3"
            style="top:109px;left:555px"
          />
          <map-point
            :articleId="81"
            :categoryId="3"
            style="top:107px;left:600px"
          />
          <map-point
            :articleId="83"
            :categoryId="3"
            style="top:110px;left:649px"
          />
          <map-point
            :articleId="85"
            :categoryId="3"
            style="top:104px;left:695px"
          />

          <!-- Die Bergtour -->
          <map-point
            :articleId="87"
            :categoryId="16"
            style="top:75px;left:726px"
          />
          <map-point
            :articleId="89"
            :categoryId="16"
            style="top:61px;left:785px"
          />
          <map-point
            :articleId="91"
            :categoryId="16"
            style="top:29px;left:799px"
          />
          <map-point
            :articleId="93"
            :categoryId="16"
            style="top:1px;left:751px"
          />

          <!-- Zum Bergsee -->
          <map-point
            :articleId="95"
            :categoryId="17"
            style="top:118px;left:773px"
          />
          <map-point
            :articleId="97"
            :categoryId="17"
            style="top:152px;left:851px"
          />
          <map-point
            :articleId="99"
            :categoryId="17"
            style="top:188px;left:934px"
          />
          <map-point
            :articleId="126"
            :categoryId="17"
            style="top:232px;left:884px"
          />
          <map-point
            :articleId="101"
            :categoryId="17"
            style="top:268px;left:961px"
          />
          <map-point
            :articleId="104"
            :categoryId="17"
            style="top:268px;left:824px"
          />

          <!-- Wahlprogramm: Zusatzschritte für Schrittzähler -->
          <map-point
            :articleId="130"
            :categoryId="19"
            style="top:350px;left:557px"
          />
          <map-point
            :articleId="31"
            :categoryId="19"
            style="top:405px;left:582px"
          />
          <map-point
            :articleId="133"
            :categoryId="19"
            style="top:437px;left:533px"
          />
          <map-point
            :articleId="135"
            :categoryId="19"
            style="top:426px;left:471px"
          />
          <map-point
            :articleId="137"
            :categoryId="19"
            style="top:435px;left:392px"
          />
          <map-point
            :articleId="139"
            :categoryId="19"
            style="top:368px;left:418px"
          />

          <!-- Wahlprogramm: Abendspaziergang für Kreative -->
          <map-point
            :articleId="23"
            :categoryId="20"
            style="top:300px;left:889px"
          />
          <map-point
            :articleId="151"
            :categoryId="20"
            style="top:311px;left:990px"
          />
          <map-point
            :articleId="153"
            :categoryId="20"
            style="top:398px;left:944px"
          />
          <map-point
            :articleId="155"
            :categoryId="20"
            style="top:345px;left:838px"
          />

          <!-- Wahlprogramm: Entdeckungstour für Forscher -->
          <map-point
            :articleId="143"
            :categoryId="18"
            style="top:376px;left:777px"
          />
          <map-point
            :articleId="141"
            :categoryId="19"
            style="top:409px;left:872px"
          />
          <map-point
            :articleId="145"
            :categoryId="18"
            style="top:448px;left:821px"
          />
          <map-point
            :articleId="149"
            :categoryId="18"
            style="top:445px;left:717px"
          />
          <map-point
            :articleId="147"
            :categoryId="18"
            style="top:394px;left:647px"
          />
        </div>
      </div>
    </q-page>
  </div>
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
    ...mapActions("app", ["setCurrentCategory"]),
    clickHelppoint() {
      this.$router.push(`/artikel/104`);
      /*
      window.open(
        "https://www.mindmeister.com/maps/public_map_shell/1266060434/ipad-troubleshooting"
      );
      */
    },
    clickFallschirm() {
      // this.$router.push(`/kategorie/25`);
      var category = this.categories.find(i => i.id == 25);
      this.setCurrentCategory(category);
      this.$router.push(`/kategorie/25`);
    },
    clickSchnitzeljagd() {
      this.$router.push(`/artikel/1128`);
    },
    clickKletterpark() {
      this.$router.push(`/artikel/1130`);
    },
    clickAdlerhorst() {
      this.$router.push(`/artikel/1132`);
    },
    clickWandergruppe() {
      this.$router.push(`/artikel/1146`);
    },
    clickMord() {
      this.$router.push(`/artikel/1178`);
    },
    clickPanoramaweg() {
      this.$router.push(`/artikel/1188`);
    },
    clickWege() {
      this.$router.push(`/artikel/1190`);
    }
  },

  created() {
    this.setCurrentCategory(null);
  }
};
</script>
