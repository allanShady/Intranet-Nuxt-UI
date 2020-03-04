<template>
  <v-data-table
    :headers="headers"
    :items="items"
    v-model="selected"
    item-key="product_id"
    class="elevation-1"
    :show-select="isSelectedProduct"
  >
    <template v-slot:top>
      <v-toolbar flat dense color="transparent">
        <v-toolbar-title>
          <h3>Linhas</h3>
        </v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
    </template>

    <template v-slot:no-data>0 - Linhas Em Inventario</template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    items: [],
    selected: [],
    documentTypes: [],
    isSelectedProduct: true,
    headers: [
      {
        text: "#",
        align: "left",
        sortable: false,
        value: "sel"
      },
      { text: "Artigo", value: "product_id" },
      { text: "Descrição", value: "description" },
      { text: "UN", value: "unit_id" },
      { text: "Qnt.", value: "quantity" },
      { text: "Funcionario", value: "Entity.name" },
      { text: "Departamento", value: "bussinessName" },
      { text: "Estado", value: "status" }
    ]
  }),
  beforeMount: async function() {
    let type = this.$router.currentRoute.query["tipo"];

    this.documentTypes = await this.$store.dispatch(
      "getDataAsync",
      "documenttypes"
    );

    console.log(this.documentTypes);

    var url = `products/filters?hasstock=${1}&documentType=${
      this.documentTypes[0].typeArticle
    }`;

    this.items = await this.$store.dispatch("getDataAsync", url);
  }
};
</script>
