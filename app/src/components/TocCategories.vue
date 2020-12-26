<template>
  <div>
    <q-list separator class="rounded-borders">
      <q-expansion-item
        v-for="category in categoryTree"
        :key="category.id"
        expand-separator
        :label="category.label"
        group="level1"
        header-class="bg-secondary text-white"
        expand-icon-class="text-white"
      >
        <div
          v-for="categoryLevel1 in category.children"
          :key="categoryLevel1.id"
        >
          <q-expansion-item
            v-if="categoryLevel1.children != null"
            :header-inset-level="1"
            expand-separator
            :label="categoryLevel1.label"
            group="level2"
            header-class="bg-teal-2"
          >
            <q-expansion-item
              v-for="categoryLevel2 in categoryLevel1.children"
              :key="categoryLevel2.id"
              switch-toggle-side
              dense-toggle
              :label="categoryLevel2.label"
              :header-inset-level="1"
              :content-inset-level="2"
              group="level3"
            >
            </q-expansion-item>
          </q-expansion-item>
          <template v-else>
            <q-item
              clickable
              v-ripple
              class="bg-teal-2"
              @click="displayCategory(categoryLevel1.id)"
            >
              {{ categoryLevel1.label }}
            </q-item>
          </template>
          <q-separator color="secondary" />
        </div>
      </q-expansion-item>
    </q-list>
    <!--
    <q-tree
      :nodes="categoryTree"
      :selected.sync="selected"
      node-key="id"
      label-key="label"
      accordion
      @update:selected="displayCategory"
    />
    -->
    <!--
    <q-separator spaced />
    selected: {{ selected }}
    <q-separator spaced />

    https://ipad-help.muwa.ch/wp-json/wp/v2/categories
    https://ipad-help.muwa.ch/wp-json/wp/v2/posts/7
    https://ipad-help.muwa.ch/wp-json/wp/v2/posts?categories=3
-->
    <q-banner class="text-white bg-orange q-ma-lg" rounded v-if="error"
      >ERROR: {{ error }}
      <pre>{{ error }}</pre>
    </q-banner>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TOC",
  computed: {
    ...mapGetters("app", ["userMode", "categoryTree", "categories"])
  },
  data() {
    return {
      selected: null,
      error: null
    };
  },
  methods: {
    ...mapActions("app", [
      "setUserMode",
      "getCategories",
      "setCurrentCategory"
    ]),
    displayCategory(node) {
      var category = this.categories.find(i => i.id == node);
      console.log("click tree", category);
      this.setCurrentCategory(category);
      this.$router.push(`/kategorie/${node}`);
    },
    switchUserMode() {
      this.setUserMode(this.userModeSwitcher);
      this.$router.push(`/${this.userModeSwitcher}`);
    },
    openBackend() {
      window.open("https://tablet-admin.winschulen.ch/wp-admin", "_blank");
    }
  },
  created() {
    if (this.$q.localStorage.has("userMode")) {
      this.setUserMode(this.$q.localStorage.getItem("userMode"));
      this.userModeSwitcher = this.userMode;
    }
    //this.getCategories();
  }
};
</script>

<style></style>
