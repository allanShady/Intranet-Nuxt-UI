<template>
  <v-flex>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="pedding_Items.records"
      :group-by="'product'"
      :search="search"
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
    hasStock: 0,
    productType: "",
    url: "",
    classifier: null,
    businessArea: [],
    headers: []
  }),

  async created() {
        this.headers = [
          { text: "Artigo", value: "productDescription" },
          { text: "Armazém ", value: "warehouseDescription" },
          { text: "Stock", value: "stock" }
        ];

        this.pedding_Items = await this.$store.dispatch(
          "getDataAsync",
          `stocks/erpbalance`
        );

        console.log(this.pedding_Items)
  },

  methods: {
    async getStockBalances(product_type, entity) {
      this.loading = true
      return await this.$store.dispatch(
        "getDataAsync",
        `stocks/erpbalance`
      );

      this.loading = false
    },
  }
};
</script>
