<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg12>
        <v-card>
          <v-toolbar flat dense color="transparent">
            <v-toolbar-title>Expandable Table</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon class="text--secondary">add</v-icon>
            </v-btn>
          </v-toolbar>
          <template>
            <v-data-table
              :headers="headers"
              :items="machines"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              item-key="machine"
              show-expand
              class="elevation-1"
            >
              <template v-slot:item.TotalMen="{ item }">
                <span>{{ totalMen(item) }}</span>
              </template>

<template v-slot:item.Total="{ item }">
                <span>{{ totalCost(item) }}</span>
              </template>


              <template v-slot:expanded-item="{ headers,item }">
                <td :colspan="headers.length">
                  <v-data-table
                    :single-select="singleSelect"
                    item-key="provider"
                    show-select
                    :headers="headers2"
                    :items="item.providers"
                  ></v-data-table>
                </td>
              </template>
            </v-data-table>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import {Customers} from "@/api/sales/customers";
import Items from "@/api/sales/orders";
import Machines from "@/api/sales/costMachine";

export default {
  data: () => ({
    country: null,
    customer: null,
    project_Name: null,
    project: null,
    customers: Customers,
    customer: "11102",
    expanded: [],
    singleExpand: false,
    project: Items[0].project,
    machines: Machines,
    items: Items[0].items,
    item: null,
    qty: null,
    design_nr: null,
    name: null,

    headers: [
      { text: "Machine", value: "machine" },
      { text: "Rate", value: "rate" },
      { text: "Duration", value: "duration" },
      { text: "Total Machine", value: "total",align: 'rigth' },
      { text: "Total Men", value: "TotalMen",align: 'rigth' },
      { text: "Total", value: "Total",align: 'rigth' }
    ],
    materials: [],
    headers2: [
      { text: "Provider", value: "provider" },
      { text: "Qty", value: "qty" },
      { text: "Rate", value: "rate" },
      { text: "Total", value: "total" }
    ]
  }),
  watch: {
    customer: function(customerNew, customerOld) {},
    item: function(itemNew, itemOld) {
      var item = Items[0].items.filter(d => d.item === itemNew);

      if (item.length > 0) {
        this.qty = item[0].qty;
        this.name = item[0].name;
        this.design_nr = item[0].design_nr;
        this.materials = item[0].cost_Machine;
      }
    }
  },
  methods: {
    totalMen(prov) {
      let totalM = 0;
      console.log(prov.providers);
      if (prov.providers != null) {
        console.log(prov.providers.length);

        prov.providers.forEach(e => {
          totalM += e.total;
        });
      }
      return totalM.toFixed(2);
    },
    totalCost(prov) {
      let totalM = 0;
      console.log(prov.providers);
      if (prov.providers != null) {
        console.log(prov.providers.length);

        prov.providers.forEach(e => {
          totalM += e.total;
        });
      }

      totalM +=  prov.total;
      return totalM.toFixed(2);
    },
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
