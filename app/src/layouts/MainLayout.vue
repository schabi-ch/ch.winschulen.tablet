<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar style="padding: auto 0">
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
          icon="map"
          @click="$router.push({ name: 'home' })"
          class="q-mr-md"
        ></q-btn>
        <search-field />
        <q-btn
          flat
          stretch
          icon="toc"
          class="q-ml-md"
          aria-label="Inhaltsverzeichnis"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space />
        <q-btn
          flat
          stretch
          icon="bookmark_border"
          class="q-ml-md"
          aria-label="Gespeicherte Artikel"
          @click="$router.push({ name: 'myArticles' })"
        />
        <q-btn flat stretch icon="more_horiz">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable @click="$router.push('/info')">
                <q-item-section>Info</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/datenschutz')">
                <q-item-section>Datenschutzerklärung</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="openBackend">
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
      <div class="q-ma-md font-sm">
        <div class="q-py-sm">Ansicht wechseln:</div>
        <q-btn-toggle
          v-model="userModeSwitcher"
          toggle-color="primary"
          class="font-sm"
          no-caps
          rounded
          @click="switchUserMode"
          :options="[
            { label: 'Lehrperson', value: 'lul' },
            { label: 'Schüler_in', value: 'sus' }
          ]"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn
        @click="leftDrawerOpen = !leftDrawerOpen"
        round
        color="accent"
        icon="toc"
      />
    </q-page-sticky>
  </q-layout>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import TocCategories from "components/TocCategories.vue";
import SearchField from "components/SearchField.vue";

export default {
  name: "MainLayout",
  components: { TocCategories, SearchField },
  computed: {
    ...mapGetters("app", ["userMode", "previousRoute"])
  },
  data() {
    return {
      leftDrawerOpen: false,
      userModeSwitcher: null
    };
  },
  methods: {
    ...mapActions("app", ["setUserMode", "getCategories", "search"]),
    switchUserMode() {
      this.setUserMode(this.userModeSwitcher);
      this.$router.push(`/${this.userModeSwitcher}`);
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
    }
  }
};
</script>
