<template>
  <div id="page-forms">
    <v-tabs>
      <v-tab>Stock</v-tab>
      <v-tab>Armazém</v-tab>
      <v-tab>Validação</v-tab>
      <v-tab>Extrato</v-tab>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <Stock></Stock>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <Inventory-form></Inventory-form>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card tile>
          <v-card-text>

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

import InventoryForm from "@/components/inv/gases/Inventory";
import StatementList from "@/components/inv/gases/StatementList";
import Stock from "@/components/inv/gases/Stock";

export default {
  components: {
    InventoryForm,
    StatementList,
    Stock
  }
};
</script>
