<template>
  <div id="page-forms">
    <v-tabs>
      <v-tab>Stock</v-tab>
      <v-tab v-if="wharehouseTabVisible">Armazém</v-tab>
      <v-tab v-if="tabVisible">Validação</v-tab>
      <v-tab>Extrato</v-tab>

      <v-tab-item>
        <v-card tile>
          <Stock></Stock>
        </v-card>
      </v-tab-item>

      <v-tab-item  v-if="wharehouseTabVisible">
        <v-card tile>
          <Inventory-form v-if="wharehouseTabVisible"></Inventory-form>
        </v-card>
      </v-tab-item>

      <v-tab-item v-if="tabVisible">
        <v-card tile>
          <v-card-text>
            <!--Wharehouse component goes here-->
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <Statement-List></Statement-List>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import InventoryForm from "@/components/inv/Inventory";
import StatementList from "@/components/inv/StatementList";
import Stock from "@/components/inv/Stock";

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
    Stock
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
