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
            <v-toolbar-title class="subheading ft-200">Consumble's</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon class="text--secondary">add</v-icon>
            </v-btn>
          </v-toolbar>
          <template>
            <v-data-table
            :headers="headers"
          :items="materials"
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
    materials: [],
    project: Items[0].project,
    item: null,
    qty: null,
    design_nr: null,
    name: null
  }),
  watch: {
    customer: function(customerNew, customerOld) {},
    item: function(itemNew, itemOld) {
      var item = Items[0].items.filter(d => d.item === itemNew);

      if (item.length > 0) {
        this.qty = item[0].qty;
        this.name = item[0].name;
        this.design_nr = item[0].design_nr;
        this.materials = item[0].cost_Consumables.items;
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