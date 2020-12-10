<template>
  <q-page class="q-pa-md">
    <h1>Checkliste für Lehrpersonen</h1>
    <div class="q-gutter-sm">
      <q-list>
        <!--
        Rendering a <label> tag (notice tag="label")
        so QCheckboxes will respond to clicks on QItems to
        change Toggle state.
      -->

        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-checkbox v-model="checklist" val="teal" />
          </q-item-section>
          <q-item-section>
            <q-item-label
              >Ich beherrsche die Bedienung mit dem Touchscreen</q-item-label
            >
            <q-item-label caption
              >tippen, wischen, halten, scrollen, zoomen, zwichen Apps hin- und
              herwechseln</q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-btn label="Anleitung" push to="/lul" />
          </q-item-section>
        </q-item>

        <q-item tag="label">
          <q-item-section avatar>
            <q-checkbox v-model="checklist" val="orange" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Orange</q-item-label>
            <q-item-label caption>With description</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn label="Anleitung" />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section avatar top>
            <q-checkbox v-model="checklist" val="cyan" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cyan</q-item-label>
            <q-item-label caption>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn label="Anleitung" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      checklist: []
    };
  }
};
</script>

<style></style>
