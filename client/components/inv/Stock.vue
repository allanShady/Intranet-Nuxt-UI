<template>
<v-flex>
  <v-card-title>
    <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa" single-line hide-details></v-text-field>
  </v-card-title>
  <v-data-table :headers="headers" :items="pedding_Items" :search="search">
    <template v-slot:item.businessArea="{ item }">{{ getPrincipalBussinessArea(item)}}</template>
  </v-data-table>
  </v-flex>
</template>
<script>
export default {
  data: () => ({
    search: "",
    isLoading: false,
    documentTypes: [],
    pedding_Items: [],
    hasStock: 0,
    productType: '',
    url: '',
    classifier: null,
    businessArea: [],
    headers: []
  }),

  async created() {
    let doc = this.$route.query.tipo;

    this.businessArea = await this.$store.dispatch(
      "getDataAsync",
      "businessArea"
    );

    this.documentTypes = await this.$store.dispatch(
      "getDataAsync",
      `documenttypes/${doc}`
    );

    this.classifier = doc;
    let documentType = this.documentTypes[0];

    console.log(documentType)

    if (documentType.isStockMovimentEntity) {

      this.headers = [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "sel"
        },
        { text: "Aréa Negocio", value: "businessArea" },
        { text: "Funcionario", value: "Entity.code" },
        { text: "Nome", value: "Entity.name" },
        { text: "Artigo", value: "Product.code" },
        { text: "Descrição", value: "Product.description" },
        { text: "UN", value: "Product.Unity.base" },
        { text: "Qnt.", value: "quantity" }
      ];

      this.url = `products/entity/${"all"}/filters?HasStock=${1}&Type=${this.documentTypes[0].typeArticle}`;
      this.pedding_Items = await this.$store.dispatch("getDataAsync", this.url);
console.log(' THE URL IS: ', this.url);
      return
    }

    if(this.$route.query.tipo == 'gases') {

      this.headers = [
        { text: "Artigo", value: "product.code" },
        { text: "Descrição", value: "product.description" },
        { text: "Projecto", value: "project.description" },
        { text: "Estado", value: "status.description" },
        { text: "Fornecedor", value: "supplier.name" }
      ];

      this.pedding_Items = await this.getGasBottlesInProject();
      return
    }

    if (documentType.isStockMoviment) {

      this.headers = [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "sel"
        },
        { text: "Artigo", value: "Product.code" },
        { text: "Descrição", value: "Product.description" },
        { text: "Armazem", value: "Warehouse.description" },
        { text: "Filial", value: "Warehouse.branch" },
        { text: "Stock", value: "stock" }
      ];

      this.url = `products/warehouse/${"all"}/filters?hasstock=${1}&type=${
        this.documentTypes[0].typeArticle
      }`;

      this.pedding_Items = await this.$store.dispatch("getDataAsync", this.url);
      return
    }

  },
  methods:{
    async getGasBottlesInProject(project) {
      return await this.$store.dispatch("getDataAsync", `products/gasbottle`);
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
