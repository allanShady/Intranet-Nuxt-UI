<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg4>
        <v-card class="mb-3">
          <v-toolbar color="transparent" dense card>
            <v-toolbar-title class="subheading ft-200">Header</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon class="text--secondary">more_vert</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-select
              id="listCustomer"
              :items="customers"
              v-validate="'required'"
              data-vv-name="customer"
              :error-messages="errors.collect('customer')"
              v-model="customer"
              label="Client"
              required
              item-text="Name"
              item-value="Customer"
            ></v-select>
            <v-text-field label="Project" placeholder v-model="project" required ref="project"></v-text-field>

            <v-select
              id="listItems"
              :items="items"
              v-validate="'required'"
              data-vv-name="item"
              :error-messages="errors.collect('items')"
              v-model="item"
              label="item"
              required
              item-text="desc"
              item-value="item"
            ></v-select>

            <v-text-field label="Name" placeholder v-model="name" required ref="name"></v-text-field>
            <v-text-field
              label="Design Nr."
              placeholder
              v-model="design_nr"
              required
              ref="design_nr"
            ></v-text-field>
            <v-text-field label="Qty" placeholder v-model="qty" required ref="qty" type="number"></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-flex>

      <v-flex lg8>
        <v-card>
          <v-toolbar color="transparent" dense card>
              <v-toolbar-title>Expandable Table</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon class="text--secondary">add</v-icon>
              </v-btn>
            </v-toolbar>
<template>

            <v-data-table
          :headers="headers"
          :items="materials"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="machine"
          show-expand
          class="elevation-1"
        >
          
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
import Customers from "@/api/sales/customers";
import Items from "@/api/sales/orders";
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
    items: Items[0].items,
    item: null,
    qty: null,
    design_nr: null,
    name: null,

    headers: [
      { text: "Machine", value: "machine" },
      { text: "Rate", value: "rate" },
      { text: "Duration", value: "duration" },
      { text: "Total Machine", value: "Total" }
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