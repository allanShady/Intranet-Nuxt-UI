<template>
  <v-layout column justify-space-around>
    <v-flex>
      <v-card>
        <v-btn-toggle>
        <v-bottom-navigation color="primary" horizontal>

          <v-btn v-for="document in documentTypes" :key="document.code" @click="openFrm(document)">
            <span>{{document.code}}</span>
            <v-icon>{{document.icon}}</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-btn-toggle>

      </v-card>
    </v-flex>
    <v-flex>
      <statement></statement>
    </v-flex>
    </v-layout>
</template>
<script>
import Statement from "@/components/inv/gases/Statement";

export default {
  layout: "inventory",
  components: {
    Statement
  },
  data: () => ({
    documentTypes: [],
    classifier: null,
  }),
  beforeMount: async function() {
    this.businessArea = await this.$store.dispatch(
      "getDataAsync",
      "businessArea"
    );

    var fullPathEleInArray = this.$router.currentRoute.fullPath.split('/');
    let docType = fullPathEleInArray[fullPathEleInArray.length - 1];
    
    this.documentTypes = await this.$store.dispatch(
      "getDataAsync",
      `documenttypes/${docType}`
    );

    this.classifier = docType;
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
  },

  created() {
    console.log(`I'm loading this form 44444 now`)
  },
  methods: {
    openFrm(item) {
      var url = `/inventory/EFGC/Form?doc=${item.code}&tipo=${this.classifier}`;

      this.$router.push(url);

      this.$forceUpdate();
    },
  }
};
</script>
