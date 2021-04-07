<template>
  <q-page class="flex flex-center q-gutter-md q-pa-md">
    <div v-if="!loading" class="q-gutter-xl">
      <div class="text-h2 text-center q-mb-xl">
        <img src="party_popper.gif" />
        <br /><br />
        <div class="q-mb-md">
          Viel Erfolg mit deinem Tablet!
        </div>
        <q-btn
          label="Ich bin eine Schülerin oder ein Schüler."
          color="primary"
          outline
          rounded
          no-caps
          push
          size="lg"
          class="q-mt-xl  q-mb-md"
          @click="switchUserMode('sus')"
        ></q-btn>
        <br />
        <q-btn
          size="lg"
          class="q-mt-md q-mb-md"
          label="Ich bin eine Lehrerin oder ein Lehrer."
          color="primary"
          outline
          rounded
          no-caps
          push
          @click="switchUserMode('lul')"
        ></q-btn>
        <br />
        <q-btn
          size="lg"
          label="Ich bin eine Mutter oder ein Vater."
          color="primary"
          outline
          rounded
          no-caps
          push
          @click="switchUserMode('eltern')"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Loading } from "quasar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PageIndex",
  computed: {
    ...mapGetters("app", ["userMode"])
  },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    ...mapActions("app", ["setUserMode"]),
    switchUserMode(mode) {
      this.setUserMode(mode);
      this.$router.push(`/${mode}`);
    }
  },
  created() {
    Loading.show({
      delay: 200,
      message: "Inhalt wird geladen..."
    });
    if (this.userMode) {
      this.$router.replace(`/${this.userMode}`);
    } else {
      this.loading = false;
    }
    Loading.hide();
  }
};
</script>
