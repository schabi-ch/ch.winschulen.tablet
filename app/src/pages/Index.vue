<template>
  <q-page class="flex flex-center q-gutter-md q-pa-md">
    <div class="text-h2 text-center">
      ❤️-lich Willkommen und<br />viel Erfolg mit deinem Tablet!
    </div>

    <q-btn
      label="Ich bin eine Schülerin oder ein Schüler"
      color="primary"
      push
      size="lg"
      to="/sus"
    ></q-btn>

    <q-btn
      size="lg"
      label="Ich bin eine Lehrerin oder ein Lehrer"
      color="primary"
      push
      to="/lul"
    ></q-btn>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex"
};
</script>
