<template>
  <div id="page-forms">
    <v-tabs>
      <v-tab>Financial Proposal</v-tab>
      <v-tab>Resume</v-tab>
      <v-tab>Costs Materials</v-tab>
      <v-tab>Costs Consumble</v-tab>
      <v-tab>Costs Machine/Men</v-tab>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <order-form></order-form>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <orderResume-form></orderResume-form>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <materialCost-form></materialCost-form>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <consumbleCost-form></consumbleCost-form>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card tile>
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
import MaterialCostForm from "@/components/widgets/form/orders/materialCosts";
import ConsumbleCostForm from "@/components/widgets/form/orders/consumbleCosts";
import OrderResumeForm from "@/components/widgets/form/orders/OrderResume";


export default {
  layout: "dashboard",
  components: {
    OrderForm,
    MachineCostForm,
    MaterialCostForm,
    ConsumbleCostForm,
    OrderResumeForm
  },
  data() {
    return {
      menu: false
    };
  },
  computed: {},
  methods: {}
};
</script>