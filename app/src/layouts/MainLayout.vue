<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-btn flat stretch icon="chevron_left" @click="$router.go(-1)"></q-btn>
        <q-breadcrumbs class="text-grey" active-color="white">
          <q-breadcrumbs-el icon="home" to="/" />
          <!--
          <q-breadcrumbs-el
            label="Docs"
            icon="widgets"
            to="/start/pick-quasar-flavour"
          />
          <q-breadcrumbs-el
            label="Breadcrumbs"
            icon="navigation"
            to="/vue-components/breadcrumbs"
          />
          <q-breadcrumbs-el label="Build" icon="build" />
          -->
        </q-breadcrumbs>
        <q-toolbar-title>
          Mein Tablet
        </q-toolbar-title>

        <div>v0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="left"
      content-class="bg-grey-1 q-pa-md"
    >
      <q-btn-toggle
        v-model="userModeSwitcher"
        toggle-color="primary"
        @click="switchUserMode"
        :options="[
          { label: 'LP', value: 'lul' },
          { label: 'SuS', value: 'sus' }
        ]"
      />

      <div class="q-mt-lg">
        <i>Backend: </i>
        <a href="https://ipad-help.muwa.ch" target="_blank"
          >https://ipad-help.muwa.ch</a
        >
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EssentialLink from "components/EssentialLink.vue";

export default {
  name: "MainLayout",
  components: {},
  computed: {
    ...mapGetters("app", ["userMode"])
  },
  data() {
    return {
      leftDrawerOpen: false,
      userModeSwitcher: null
    };
  },
  methods: {
    ...mapActions("app", ["setUserMode"]),
    switchUserMode() {
      this.setUserMode(this.userModeSwitcher);
      this.$router.push(`/${this.userModeSwitcher}`);
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
