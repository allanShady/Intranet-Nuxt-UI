<template>
  <v-layout column justify-space-around>

    <v-flex>

      <v-card outlined class="mr-4 mt-4">
          <v-row no-gutters align="center" >
              <!--v-col-->
                <v-btn large outlined class="px-4 mr-4"
                 v-for="document in documentTypes" :key="document.code" color="success"
                 v-if="!(['ELAV', 'EDPC', 'DDPC', 'ERPC', 'DRPC'].includes(document.code))"  
                 @click="openFrm(document)">
                  {{ document.friendlyUserName }}</v-btn>      
                <v-btn v-if="$route.query.tipo == 'PPC'" large outlined class="px-4 mr-4"  color="warning"  @click="openFrm({code: 'more'})">Mais</v-btn>    
             <!--/v-col-->
          </v-row>
          </v-card >

    <!-- End container -->
    </v-flex>
    <!--v-flex>
      <v-btn-toggle>
        <v-bottom-navigation color="primary"  horizontal>
          <v-btn mr-4
            depressed

            
            v-for="document in documentTypes"
            :key="document.code"
           
          >
            {{document.friendlyUserName}}
            <v-icon>{{document.icon}}</v-icon-->
          <!--/v-btn-->
        <!--/v-bottom-navigation>
      </v-btn-toggle>
    </v-flex-->
    <v-flex>
      <statement></statement>
    </v-flex>
  </v-layout>
</template>
<script>
import Statement from "@/components/inv/Statement";

export default {
  components: {
    Statement
  },
  data: () => ({
    documentTypes: [],
    classifier: null,
    url: null,
    hasStockParam: 0 // to track the query params that retrieve product that has stocks and value
  }),
  beforeMount: async function() {
    this.businessArea = await this.$store.dispatch(
      "getDataAsync",
      "businessArea"
    );

    let docType = this.$router.currentRoute.query["tipo"];

    this.documentTypes = await this.$store.dispatch(
      "getDataAsync",
      `documenttypes/${docType}`
    );

    this.classifier = docType;
    let documentType = this.documentTypes[0];

    if (documentType.isStockMovimentEntity) {
      this.hasStockParam = 1;

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
      this.hasStockParam = 1;

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

    this.url = `products/warehouse/${"all"}/filters?hasstock=${
      this.hasStockParam
    }&type=${this.documentTypes[0].typeArticle}`;

    this.pedding_Items = await this.$store.dispatch("getDataAsync", this.url);
  },

  created() {},

  methods: {
    openFrm(item) {
      this.$router.push(
        `/inventory/EFGC/Form?doc=${item.code}&tipo=${this.classifier}`
      );
      this.$forceUpdate();
    },

    gotoEPIForm(){
       this.$router.push(`/epi/more`) 
    },

    getColor(displayName){
      switch (displayName) {
        case 'Atribuir':
          return 'teal'
          break;
      case 'Registar Devolução':
          return 'success'
          break;
      case 'Recepção à lavandaria':
          return 'orange'
          break;
        default:
          break;
      }
    }
  }
};
</script>
