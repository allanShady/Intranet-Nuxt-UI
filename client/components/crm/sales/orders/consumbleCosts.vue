<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>


      <v-flex lg12>
        <v-card>
          <v-toolbar flat dense color="transparent">
            <v-toolbar-title class="subheading ft-200">Consumble's</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon class="text--secondary">add</v-icon>
            </v-btn>
          </v-toolbar>
          <template>
            <v-data-table
            :headers="headers"
          :items="consumbles"
          >


          </v-data-table>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Customers from "@/api/sales/customers";
import Items from "@/api/sales/orders";
import Consumbles from "@/api/sales/consumables";


export default {
  data: () => ({
    order_Number: Items[0].document,
    country: null,
    date: new Date().toISOString().substr(0, 10),
    customer: "11102",

    customers: Customers,
    headers: [
      {
        text: "#",
        align: "left",
        sortable: false,
        value: "id"
      },
      { text: "Designation", value: "consumble" },

      { text: "QTY PER PACK", value: "rawMaterial.length" },
      { text: "Type ", value: "rawMaterial.unity" },
      { text: "Unit Weight(kg)", value: "rawMaterial.unitWeigt" },
      { text: "Qty", value: "rawMaterial.qty" },
      { text: "Total Weight (kg)", value: "rawMaterial.total_Weigth" }
    ],
    items: Items[0].items,
    consumbles: Consumbles,
    project: Items[0].project,
    item: null,
    qty: null,
    design_nr: null,
    name: null
  }),
  watch: {

  },
  methods: {
    changeCustomer() {}
  },
  created() {
    setInterval(this.getNow, 1000);

  },

  computed: {
    location: () => window.location,

    getNow: function() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    }
  }
};
</script>
