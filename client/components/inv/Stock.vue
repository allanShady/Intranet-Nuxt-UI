<template>
<v-flex>
  <v-card-title>
    <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa stocks" single-line hide-details></v-text-field>
  </v-card-title>
  <v-data-table :headers="headers" :items="pedding_Items" :search="search">
    <template v-slot:item.businessArea="{ item }">{{ getPrincipalBussinessArea(item)}}</template>
  </v-data-table>
  </v-flex>
</template>

<script>
import gasServices from '@/services/gasServices.js';

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
    //Gets the doc type from query  
    let doc_type = this.$route.query.tipo; 

    switch (doc_type) {
      case 'gases': // --- gas documents
        this.headers = gasServices.getTableHeadersView('stocks');
        this.pedding_Items = await this.getGasBottlesInProject();
        return; break;
      default:
        break;
    }

    console.log('The stock list was created');
    
    this.businessArea = await this.$store.dispatch(
      "getDataAsync",
      "businessArea"
    );

    let doc = this.$router.currentRoute.query["tipo"];

    this.documentTypes = await this.$store.dispatch(
      "getDataAsync",
      `documenttypes/${doc}`
    );

    this.classifier = doc;
    let documentType = this.documentTypes[0];

    if (documentType.isStockMovimentEntity) {
      this.url = `products/entity/${"all"}/filters?hasstock=${1}&type=${this.documentTypes[0].typeArticle}`;

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
        { text: "Artigo", value: "product_id" },
        { text: "Descrição", value: "description" },
        { text: "UN", value: "Product.Unity.base" },
        { text: "Qnt.", value: "quantity" }
      ];
    }

  

    if (documentType.isStockMoviment) {
      this.url = `products/warehouse/${"all"}/filters?hasstock=${1}&type=${
        this.documentTypes[0].typeArticle
      }`;

      this.headers = [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "sel"
        },
        { text: "Artigo", value: "Product.id" },
        { text: "Descrição", value: "Product.description" },
        { text: "Armazem", value: "Warehouse.description" },
        { text: "Filial", value: "Warehouse.branch" },
        { text: "Stock", value: "stock" }
      ];
    }

    //this.url = `products/entity/${"all"}/filters?hasstock=${this.hasStock}&type=${this.productType}`
    //console.log(' THE URL IS: ', this.url);
    this.pedding_Items = await this.$store.dispatch("getDataAsync", this.url);
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
