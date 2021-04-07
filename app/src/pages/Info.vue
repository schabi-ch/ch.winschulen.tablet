<template>
  <q-page class="q-pa-md" style="margin: 0 auto; max-width: 760px">
    <h1>Informationen</h1>
    <p>
      Diese App/Website wurde für die Einführung der 1:1-Tablet-Umgebung in den
      Sekundarschulen der Stadt Winterthur entwickelt. Sie bietet Lehrerinnen
      und Lehrer, sowie Schülerinnen und Schüler die Möglichkeit, ihr neues
      Arbeitsgerät selbständig kennenzulernen. Auch für die Eltern werden
      wichtige Informationen bereitgestellt. Diese App kann auch als Webseite
      unter
      <a href="https://tablet.winschulen.ch">https://tablet.winschulen.ch</a>
      benutzt werden.
    </p>
    <h2>Herausgeber</h2>
    <p>
      Stadt Winterthur<br />
      Departement Schule und Sport<br />
      Abteilung SCHU::COM<br />
      Pionierstrasse 7<br />8400 Winterthur
    </p>
    <p>
      E-Mail:
      <a href="mailto:schucom@win.ch">schucom@win.ch</a><br />Website:
      <a href="https://stadt.winterthur.ch/schucom"
        >https://stadt.winterthur.ch/schucom</a
      >
    </p>
    <p>
      <b>Konzept und Idee</b><br />
      Michael Brügger, Christof Müller, Thomas Staub
    </p>
    <p>
      <b>Autorinnen und Autoren</b><br />
      Michael Brügger, Werner Heiniger, Christof Müller, Remo Müller, Corinne
      Schafroth, Thomas Staub, Marcel Wettstein
    </p>
    <p>
      <b>Illustrationen</b><br />
      Nina Arigoni
    </p>
    <p>
      <b>App- und Website-Entwicklung</b><br />
      Christof Müller
    </p>
    <hr />
    <h2>Support</h2>
    <p>Der Support läuft wie gewohnt über den BSC vor Ort.</p>
    <hr />
    <h3>Open Source</h3>
    <p>
      Die App wurde unter der
      <a
        href="https://github.com/schabi-ch/ch.winschulen.tablet/blob/main/LICENSE"
        >MIT Licence</a
      >
      veröffentlicht. Damit steht der
      <a
        href="https://github.com/schabi-ch/ch.winschulen.tablet"
        target="_blank"
        >Source Code</a
      >
      allen zur Verfügung und darf nach Belieben angepasst und für eigene Zwecke
      genutzt werden.
    </p>
    <hr />
    <h2>Zurücksetzen</h2>
    Alle Daten löschen (bereits gelesene Artikel, gespeicherte Anleitungen):
    <q-btn
      label="Alles löschen"
      no-caps
      color="red"
      size="sm"
      @click="deleteAll"
    />
  </q-page>
</template>

<script>
import { LocalStorage, SessionStorage } from "quasar";
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("app", ["initLoading"])
  },
  methods: {
    ...mapActions("app", ["init"]),
    deleteAll() {
      this.$q
        .dialog({
          title: "Alles löschen",
          message:
            "Willst du wirklich alle bereits gelesenen Artikel und gespeicherten Anleitungen löschen?",
          cancel: true,
          persistent: true,
          noCaps: true
        })
        .onOk(async () => {
          this.$q.loading.show({
            message: "Alles wird zurückgesetzt und neu geladen..."
          });
          await this.init();
          this.$q.localStorage.clear();
          this.$q.sessionStorage.clear();
          this.$router.push(`/`);
          this.$q.loading.hide();
        });
    }
  }
};
</script>

<style></style>
