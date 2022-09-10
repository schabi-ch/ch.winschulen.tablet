<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated v-if="userMode != null">
      <q-toolbar style="padding: 0">
        <q-btn
          flat
          stretch
          icon="menu"
          aria-label="Inhaltsverzeichnis"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="userMode != 'eltern' && userMode != 'public'"
        />
        <q-btn
          flat
          stretch
          v-if="previousRoute != null"
          icon="chevron_left"
          @click="goBack"
        ></q-btn>

        <q-space />
        <q-btn
          flat
          stretch
          icon="home"
          @click="$router.push({ name: 'home' })"
          class="q-mr-md"
          v-if="userMode != 'eltern' && userMode != 'public'"
        ></q-btn>
        <search-field />
        <q-space />
        <q-btn
          flat
          stretch
          icon="bookmark_border"
          class="q-ml-md"
          aria-label="Gespeicherte Artikel"
          @click="$router.push({ name: 'myArticles' })"
          v-if="userMode != 'eltern' && userMode != 'public'"
        />
        <q-btn flat stretch icon="more_horiz">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item
                clickable
                @click="switchUserMode('lul')"
                :class="userMode == 'lul' ? 'activeUserMode' : ''"
              >
                <q-item-section>Lehrpersonen-Ansicht</q-item-section>
              </q-item>
              <q-item
                clickable
                @click="switchUserMode('sus')"
                :class="userMode == 'sus' ? 'activeUserMode' : ''"
              >
                <q-item-section>Schüler_innen-Ansicht</q-item-section>
              </q-item>
              <q-item
                clickable
                @click="switchUserMode('eltern')"
                :class="userMode == 'eltern' ? 'activeUserMode' : ''"
              >
                <q-item-section>Eltern-Ansicht</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="$router.push('/info')">
                <q-item-section>Infos zur App</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/datenschutz')">
                <q-item-section>Datenschutzerklärung</q-item-section>
              </q-item>
              <q-separator
                v-if="
                  $q.platform.is.desktop &&
                    userMode != 'public' &&
                    userMode != 'eltern'
                "
              />
              <q-item
                clickable
                @click="openBackend"
                v-if="
                  $q.platform.is.desktop &&
                    userMode != 'public' &&
                    userMode != 'eltern'
                "
              >
                <q-item-section>Backend</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      side="left"
      overlay
      content-class="bg-grey-1"
    >
      <toc-categories />
    </q-drawer>

    <q-page-container>
      <q-banner
        v-if="error != null"
        inline-actions
        class="bg-negative text-white"
        >{{ error }}
        <template v-slot:action>
          <q-btn
            flat
            color="white"
            icon="cancel"
            round
            @click="setError(null)"
          />
        </template>
      </q-banner>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TocCategories from "components/TocCategories.vue";
import SearchField from "components/SearchField.vue";

export default {
  name: "MainLayout",
  components: { TocCategories, SearchField },
  computed: {
    ...mapGetters("app", ["userMode", "previousRoute", "error"])
  },
  data() {
    return {
      leftDrawerOpen: false,
      userModeSwitcher: null
    };
  },
  methods: {
    ...mapActions("app", [
      "setUserMode",
      "getCategories",
      "search",
      "setError"
    ]),
    switchUserMode(userMode) {
      this.setUserMode(userMode);
      this.$router.push(`/${userMode}`);
    },
    openBackend() {
      window.open("https://tablet-admin.winschulen.ch/wp-admin", "_blank");
    },
    goBack() {
      console.log("go back", this.previousRoute);
      this.$router.go(-1);
    }
  },
  created() {
    if (this.$q.localStorage.has("userMode")) {
      this.setUserMode(this.$q.localStorage.getItem("userMode"));
      this.userModeSwitcher = this.userMode;
      console.log("userMode: " + this.userMode);
    }
  }
};
</script>

<style lang="scss">
.q-page-container {
  background-color: white;
}
.activeUserMode {
  background-color: $secondary;
  color: white;
}
</style>
