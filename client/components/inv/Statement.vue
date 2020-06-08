<template>
  <div id="page-forms">
    <v-tabs>
      <v-tab>{{$route.query.tipo.toLowerCase() !== 'stock' ? 'Pendentes de devolução' : 'Stock geral' }}</v-tab>
      <v-tab v-if="$route.query.tipo == 'Stock'">{{$route.query.tipo.toLowerCase() !== 'stock' ? 'Pendentes de devolução' : 'Stock (Primavera)' }}</v-tab>
      <v-tab v-if="wharehouseTabVisible">Resumo de artigos</v-tab>
      <v-tab v-if="tabVisible || $route.query.tipo.toLowerCase() == 'gases'">Análise</v-tab>
      <v-tab>Extracto</v-tab>

      <v-tab-item>
        <v-card tile>
          <Stock></Stock>
        </v-card>
      </v-tab-item>

      <v-tab-item v-if="$route.query.tipo == 'Stock'">
        <v-card tile>
          <third-part-balance/>
        </v-card>
      </v-tab-item>

      <v-tab-item  v-if="wharehouseTabVisible">
        <v-card tile>
          <Inventory-form v-if="wharehouseTabVisible"></Inventory-form>
        </v-card>
      </v-tab-item>
      
      <!-- Validation tables -->
      <v-tab-item v-if="$route.query.tipo.toLowerCase() == 'ppc' || $route.query.tipo.toLowerCase() == 'epi' || $route.query.tipo.toLowerCase() == 'gases'">
        <v-card tile>
          <v-card-text>
            <items-delivery-validation-tab></items-delivery-validation-tab>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card tile>
            <Statement-List></Statement-List>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import InventoryForm from "@/components/inv/Inventory";
import StatementList from "@/components/inv/StatementList";
import Stock from "@/components/inv/Stock";
import ThirdPartBalance from "@/components/third-part-erp/balance";
import ItemsDeliveryValidationTab from './ItemsDeliveryValidationTab';

export default {
  data() {
    return {
      tabVisible: false,
      wharehouseTabVisible: true
    };
  },
  components: {
    InventoryForm,
    StatementList,
    Stock,
    ItemsDeliveryValidationTab,
    ThirdPartBalance
  },

  created() {
    //Hide the validation tab if the area is for gases
    let currentQuery = this.$route.query.tipo;

    console.log(currentQuery)

    if (currentQuery === "PPC") this.tabVisible = true;
    if (currentQuery === "Stock") this.wharehouseTabVisible = false;

  }
};
</script>
