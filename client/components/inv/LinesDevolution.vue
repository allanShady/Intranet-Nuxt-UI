<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-key="article"
    class="elevation-1"
    show-select
  >
    <template v-slot:top>
      <v-toolbar flat dense color="transparent">
        <v-toolbar-title>
          <h3>Linhas</h3>
        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template v-slot:no-data>0 - Linhas Adicionadas</template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    headers: [
      { text: "Artigo", value: "article" },
      { text: "Descrição", value: "description" },
      { text: "UN", value: "unity" },
      { text: "Qnt.", value: "quantity" },
      { text: "Projeto", value: "project" },
      { text: "Notas", value: "notes" }
    ]
  }),
  methods: {}
};
</script>
