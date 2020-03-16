<template>
  <v-flex>
    <v-card-title>
      <v-text-field v-model="search" append-icon="search" label="Pesquisa" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      v-model="selected"
      item-key="product_id"
      class="elevation-1"
      :show-select="isSelectedProduct"
      :search="search"
    >
      <template v-slot:item.businessArea="{ item }">{{ getPrincipalBussinessArea(item)}}</template>

      <template v-slot:no-data>0 - Linhas Com Funcionario</template>
    </v-data-table>
  </v-flex>
</template>
<script>
export default {
  data: () => ({
    type: "",
    search: "",
    isLoading: false,
    items: [],
    selected: [],
    documentTypes: [],
    isSelectedProduct: true,
    headers: [
      { text: "Funcionario", value: "Entity.name" },
      { text: "Departamento", value: "BussinessArea.description" },
      { text: "Artigo", value: "product_id" },
      { text: "Descrição", value: "description" },
      { text: "UN", value: "unit_id" },
      { text: "Qnt.", value: "quantity" },
      { text: "Estado", value: "status" }
    ]
  }),
  beforeMount: async function() {
    this.type = this.$router.currentRoute.query["tipo"];

    this.documentTypes = await this.$store.dispatch(
      "getDataAsync",
      "documenttypes/" + this.type
    );

    var url = `products/entity/${'all'}/filters?hasstock=${1}&documentType=${
      this.documentTypes[0].typeArticle
    }`;

    this.items = await this.$store.dispatch("getDataAsync", url);

    console.log("THE DOCUMENT TYPES: ", this.items, "THE ENDPOINT IS: ", url);
  }
};
</script>
