<template>
  <v-flex>
    <v-card-title>
      <v-text-field
        v-model="watchStockBalances"
        append-icon="mdi-magnify"
        label="Pesquisar"
        :search-input.sync="watchStockBalances"
        single-line        
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="pedding_Items.records"
      :loading="loading"
    >
    </v-data-table>
  </v-flex>
</template>

<script>

export default {
  data: () => ({
    search: "",
    isLoading: false,
    loading: false,
    documentTypes: [],
    pedding_Items: [],
    watchStockBalances: null,
    hasStock: 0,
    productType: "",
    url: "",
    classifier: null,
    businessArea: [],
    headers: []
  }),

  async created() {
        this.headers = [
          { text: "Artigo", value: "product" },
          { text: "Descrição", value: "productDescription" },
          { text: "Armazém ", value: "warehouseDescription" },
          { text: "Stock", value: "stock" }
        ];

        this.pedding_Items = await this.getStockBalances('')
  },

  methods: {
    async getStockBalances(searchTerm) {
      this.loading = true

      const result = await this.$store.dispatch(
        "getDataAsync",
        searchTerm ? `stocks/erpbalance?SearchTerm=${searchTerm}` : `stocks/erpbalance` 
      );

      this.loading = false

      return result
    },
  },

  watch: {
    async watchStockBalances(searchTerm) {
      this.pedding_Items = await this.getStockBalances(searchTerm)
      console.log('search term:', searchTerm, 'result:', this.pedding_Items)
    }
  }
};
</script>
