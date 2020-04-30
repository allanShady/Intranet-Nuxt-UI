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
      :items="pedding_Items"
      :group-by=" $route.query.tipo == 'gases' ? 'project.description': 'entity'"
      :search="search"
    >
      <template v-slot:item.businessArea="{ item }">{{ getPrincipalBussinessArea(item)}}</template>
    </v-data-table>
  </v-flex>
</template>

<script>
import gasServices from "@/services/gasServices.js";
import genericServices from "@/services/genericServices.js";

export default {
  data: () => ({
    search: "",
    isLoading: false,
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
    //Gets the doc type from query
    let doc_type = this.$route.query.tipo;

    //get the products type based on the document
    this.documentTypes = await this.$store.dispatch(
      "getDataAsync",
      `documenttypes/${this.$router.currentRoute.query.tipo}`
    );

    //get the products type of the document
    let product_type = this.documentTypes[0].typeArticle;

    switch (doc_type) {
      case "gases": // --- gas documents
        this.headers = gasServices.getTableHeadersView("stocks");
        this.pedding_Items = await this.getGasBottlesInProject();
        return;
      case "Equipamentos": // --- Equipments documents
        this.initStocksBalance("stock_balaces", product_type, "*");
        return;
      case "Ferramentas": // --- Tools documents
        this.initStocksBalance("stock_balaces", product_type, "*");
        return;
      case "PPC": // --- Tools documents
        this.initStocksBalance("stock_balaces", product_type, "*");
        return;
      default:
        this.url = `products/warehouse/${"all"}/filters?hasstock=${1}&type=${product_type}`;

        this.headers = [
          { text: "Artigo", value: "Product.id" },
          { text: "Descrição", value: "Product.description" },
          { text: "Armazem", value: "Warehouse.description" },
          { text: "Filial", value: "Warehouse.branch" },
          { text: "Stock", value: "stock" }
        ];

        this.pedding_Items = await this.$store.dispatch(
          "getDataAsync",
          this.url
        );
        break;
    }

    console.log("The stock list was created");

    this.businessArea = await this.$store.dispatch(
      "getDataAsync",
      "businessArea"
    );

    if (this.documentTypes[0].isStockMoviment) {
    }
  },
  methods: {
    async getGasBottlesInProject(project) {
      return await this.$store.dispatch("getDataAsync", `products/gasbottle`);
    },

    async getStockBalances(product_type, entity) {
      console.log("product_type: ", product_type, "entity: ", entity);
      return await this.$store.dispatch(
        "getDataAsync",
        `stocks/balance?ProductType=${product_type}&Entity=${entity}`
      );
    },

    async initStocksBalance(tableHeaderView, product_type, entity) {
      this.headers = genericServices.getTableHeadersView(tableHeaderView);
      this.pedding_Items = await this.getStockBalances(product_type, entity);
    },

    getPrincipalBussinessArea(item) {
      if (!item) return "";

      let buss = item.Entity.BusinessArea.filter(d => d.isPrincipal === true);

      if (buss.length > 0) {
        return this.businessArea.find(p => p.code == buss[0].businessArea)
          .description;
      }
    }
  }
};
</script>
