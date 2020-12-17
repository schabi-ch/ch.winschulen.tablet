<template>
  <q-page class="q-pa-md">
    <h1>Checkliste für Lehrpersonen</h1>
    <div class="q-gutter-sm">
      <q-list separator>
        <!--
        Rendering a <label> tag (notice tag="label")
        so QCheckboxes will respond to clicks on QItems to
        change Toggle state.
      -->
        <q-item
          tag="label"
          v-ripple
          v-for="task in checklistDorfrundgang"
          :key="task.id"
        >
          <q-item-section avatar>
            <q-checkbox
              v-model="task.done"
              @input="toggleCheckbox(task.id, task.done)"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ task.title }}</q-item-label>
            <q-item-label caption>{{ task.description }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              label="Anleitung"
              color="primary"
              rounded
              :to="`/artikel/${task.id}`"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("app", ["tasksDone"])
  },
  methods: {
    ...mapActions("app", ["setTaskDone", "getAllTasksDone"]),
    toggleCheckbox(id, value) {
      this.setTaskDone({ id: id, value: value });
    }
  },
  data() {
    return {
      checklistDorfrundgang: [
        {
          id: 9,
          title: "Ich beherrsche die Bedienung mit dem Touchscreen",
          description:
            "tippen, wischen, halten, scrollen, zoomen, zwischen Apps hin- und herwechseln",
          done: false
        },
        {
          id: 12,
          title:
            "Ich weiss, wie die Bestandteile des iPads heissen und kenne deren Funktion",
          description: "Standby- und Home-Taste, Lautstärketasten, Anschlüsse",
          done: false
        },
        {
          id: 14,
          title:
            "Ich kann mit der Hardware- und der Software-Tastatur arbeiten",
          description: "Spezialtasten, ...",
          done: false
        },
        {
          id: 17,
          title:
            "Ich kann Text eingeben, sowie einen Text auswählen, kopieren und einfügen",
          description:
            "Umlaute, Sonderzeichen, Zahlen, Autokorrektur, Copy-Paste",
          done: false
        },
        {
          id: 19,
          title:
            "Ich kenne die Mitteilungszentrale und das Kontrollzentrum und kann Einstellungen anpassen",
          description:
            "Lautstärke, Helligkeit, Drehsperre, Flugmodus, WLAN zu Hause einrichten",
          done: false
        },
        {
          id: 21,
          title: "Ich kann Fotos und Filme aufnehmen und finde sie wieder",
          description:
            "Wechsel zwischen Front- und Rückkamera, verschiedene Aufnahmemodi (Foto, Video, Panorama), Bilder anschauen in Fotos, Bilder optimieren (zuschneiden, usw.)",
          done: false
        },
        {
          id: 23,
          title: "Ich kann Töne aufnehmen",
          description: "Tonaufnahme erstellen, Aufnahme kürzen und teilen",
          done: false
        },
        {
          id: 27,
          title:
            "Ich kann ein Bild aus dem Web speichern und einen Screenshot erstellen",
          description: "",
          done: false
        },
        {
          id: 29,
          title: "Ich kann Anwendungen suchen und schliessen",
          description: "",
          done: false
        },
        {
          id: 31,
          title: "Ich kann Apps neu anordnen in Ordnern gruppieren",
          description: "",
          done: false
        },
        {
          id: 33,
          title:
            "Ich kann weitere Apps über den Self-Service installieren und Apps löschen",
          description: "",
          done: false
        }
      ]
    };
  },
  async created() {
    this.$q.loading.show();
    var allTasksDone = await this.getAllTasksDone();
    console.log("allTasksDone", allTasksDone);
    if (allTasksDone != null) {
      this.checklistDorfrundgang.forEach(task => {
        if (allTasksDone.includes(task.id)) {
          task.done = true;
        }
      });
    }
    this.$q.loading.hide();
  }
};
</script>

<style></style>
