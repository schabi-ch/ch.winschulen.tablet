<template>
  <q-page class="flex flex-center">
    <div class="text-h2">
      ❤️-lich Willkommen! Viel Erfolg mit deinem Tablet!
    </div>
    <div class="q-gutter-md">
      <q-btn
        label="Ich bin eine Schülerin oder ein Schüler"
        color="primary"
        push
        to="/sus"
      ></q-btn>
      <q-btn
        label="Ich bin eine Lehrperson"
        color="primary"
        push
        to="/lul"
      ></q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex"
};
</script>
