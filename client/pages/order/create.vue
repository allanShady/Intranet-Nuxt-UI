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
            <!-- <Resume-form></Resume-form> -->
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
import OrderForm from "@/components/crm/sales/orders/order";
import MachineCostForm from "@/components/crm/sales/orders/machineCosts";
import MaterialCostForm from "@/components/crm/sales/orders/materialCosts";
import ConsumbleCostForm from "@/components/crm/sales/orders/consumbleCosts";
// import ResumeForm from "@/components/crm/sales/orders/resume";

export default {
  layout: "dashboard",
  components: {
    OrderForm,
    MachineCostForm,
    MaterialCostForm,
    ConsumbleCostForm,
    // ResumeForm
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
