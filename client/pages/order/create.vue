<template>
  <div id="page-forms">

  <v-tabs>
    <v-tab>Financial Proposal</v-tab>
    <v-tab>Item Two</v-tab>
    <v-tab>Costs Machine/Men</v-tab>

    <v-tab-item>
        <v-card
          flat
          tile
        >
          <v-card-text>
            <order-form></order-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          flat
          tile
        >
          <v-card-text>
            
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          flat
          tile
        >
          <v-card-text>
             <machineCost-form></machineCost-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
  </v-tabs>

  

    
    
  </div>
</template>

<script>
import OrderForm from "@/components/widgets/form/orders/order";
import MachineCostForm from "@/components/widgets/form/orders/machineCosts";

export default {
  layout: "dashboard",
  components: {
    OrderForm,
    MachineCostForm
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>