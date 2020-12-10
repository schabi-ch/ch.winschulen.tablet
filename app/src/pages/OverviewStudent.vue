<template>
  <q-page class="q-ma-md">
    <h1>Kategorien</h1>
    <div class="q-pa-md q-gutter-sm">
      <q-tree :nodes="categories" node-key="label" />
    </div>

    <p class="text-h6">categories</p>
    {{ categories }}

    <p class="text-h6">Response</p>
    {{ response }}

    <q-separator spaced />
    student<br />
    https://ipad-help.muwa.ch/wp-json/wp/v2/categories
    https://ipad-help.muwa.ch/wp-json/wp/v2/posts/7
    https://ipad-help.muwa.ch/wp-json/wp/v2/posts?categories=3
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      response: null,
      categories: []
      /*
      {
          label: 'Node 1',
          children: [
            { label: 'Node 1.1', lazy: true },
            { label: 'Node 1.2', lazy: true }
          ]
        },
        */
    };
  },
  async created() {
    this.$q.loading.show({ message: "PDF wird zusammengebaut..." });
    await axios
      .get("https://ipad-help.muwa.ch/wp-json/wp/v2/categories?per_page=100")
      .then(response => {
        this.response = response.data;
        const firstLayer = response.data.filter(p => p.parent == 0);
        firstLayer.forEach(n => {
          var newNode = { id: n.id, label: n.name };
          newNode = buildTree(newNode, response.data);
          this.categories.push(newNode);
        });
      })
      .catch(error => {
        console.log("error", error);
      });
    this.$q.loading.hide();
  }
};

function buildTree(node, data) {
  const nextLayer = data.filter(p => p.parent == node.id);
  if (nextLayer.length > 0) {
    node.children = [];
    nextLayer.forEach(n => {
      var newNode = { id: n.id, label: n.name };
      newNode = buildTree(newNode, data);
      node.children.push(newNode);
    });
  }
  return node;
}
</script>

<style></style>
