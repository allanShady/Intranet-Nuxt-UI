<template>
  <v-layout column justify-space-around>
    <v-flex>
      <v-card>
        <v-btn-toggle>
        <v-bottom-navigation color="primary" horizontal>
          <v-btn @click="openBalance">
            <span>Extrato</span>
            <v-icon>text-box</v-icon>
          </v-btn>
          <v-btn v-for="document in documentTypes" :key="document.code" @click="openFrm(document)">
            <span>{{document.code}}</span>
            <v-icon>{{document.icon}}</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-btn-toggle>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Pesquisa"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="pedding_Items"
        item-key="product"
        :search="search"
      >
        <template v-slot:item.businessArea="{ item }">{{ getPrincipalBussinessArea(item)}}</template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    search: '',
    documentTypes: [],
    pedding_Items: [],
    classifier: null,
    businessArea: [],
    headers: []
  }),
  beforeMount: async function() {
    this.businessArea = await this.$store.dispatch(
      "getDataAsync",
      "businessArea"
    );

    let doc = this.$router.currentRoute.query["id"];

    this.documentTypes = await this.$store.dispatch(
      "getDataAsync",
      "documenttypes/" + doc
    );

    this.classifier = doc;
    let documentType = this.documentTypes[0];

    if (documentType.isStockMovimentEntity) {
      var url = `products/entity/${"all"}/filters?hasstock=${1}&type=${
        this.documentTypes[0].typeArticle
      }`;

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
      var url = `products/warehouse/${"all"}/filters?hasstock=${1}&type=${
        this.documentTypes[0].typeArticle
      }`;

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
    }
    this.pedding_Items = await this.$store.dispatch("getDataAsync", url);
    console.log(this.pedding_Items);
  },
  methods: {
    openFrm(item) {
      var url = `/inventory/EFGC/Form?doc=${item.code}&tipo=${this.classifier}`;

      this.$router.push(url);
    },
    openBalance() {
      var url = `/inventory/EFGC/Statement?tipo=${this.classifier}`;

      this.$router.push(url);
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
