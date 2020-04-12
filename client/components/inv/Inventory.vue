<template>
  <v-flex>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisa"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      v-model="selected"
      item-key="product_id"
      class="elevation-1"
      :show-select="!isSelectedProduct"
      :search="search"
    >
      <template v-slot:item.businessArea="{ item }">
        {{
        getPrincipalBussinessArea(item)
        }}
      </template>

      <template v-slot:no-data>0 - Linhas Com Funcionario</template>
    </v-data-table>
  </v-flex>
</template>
<script>
import gasServices from '@/services/gasServices.js';

export default {
  data: () => ({
    type: "",
    search: "",
    menuArea: '',
    isLoading: false,
    items: [],
    selected: [],
    documentTypes: [],
    isSelectedProduct: true,
    headers: [
      { text: "Funcionario", value: "Entity.name" },
      { text: "Departamento", value: "BussinessArea.description" },
      { text: "Artigo", value: "product_id" },
      { text: "Descrição", value: "Product.description" },
      { text: "UN", value: "unit_id" },
      { text: "Qnt.", value: "quantity" },
      { text: "Estado", value: "status" }
    ]
  }),

  methods: {
    async initComponent(menuArea) {
      if(menuArea === 'gases') { // project filter
        let value = 'all' //TODO : search form
        let url = `products/filters?type=55&code=${value}&project=${value}`;

        //Init headers
        this.headers = gasServices.getTableHeadersView('productView');
        this.items = await this.$store.dispatch("getDataAsync", url);
      } else {
        //TODO: Implement the appropriet logic here
        this.type = menuArea;
        this.documentTypes = await this.$store.dispatch(
          "getDataAsync",
          "documenttypes/" + this.type
        );

        let url = `products/entity/${'all'}/filters?hasstock=${1}&documentType=${
          this.documentTypes[0].typeArticle
        }`;

        this.items = await this.$store.dispatch("getDataAsync", url);
      }
    }
  },

  async created() {
    this.initComponent(this.$route.query.tipo);
  },
};
</script>
