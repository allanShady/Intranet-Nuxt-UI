<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg4>
        <v-card class="mb-3">
          <v-toolbar color="transparent" flat dense card>
            <v-toolbar-title class="subheading ft-200">Costs Men-Men and Men-Machine</v-toolbar-title>
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
              label="To"
              required
              item-text="Name"
              item-value="Customer"
            ></v-select>
            <v-text-field
              label="Project Name"
              placeholder
              v-model="project_Name"
              required
              ref="project_Name"
            ></v-text-field>
            <v-text-field
              label="Product Description"
              placeholder
              v-model="product_Description"
              required
              ref="product_Description"
            ></v-text-field>
            <v-text-field
              label="Design Number"
              placeholder
              v-model="design_Number"
              required
              ref="design_Number"
            ></v-text-field>
            <v-text-field label="Qty" placeholder v-model="qty" required ref="qty"></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-flex>

      <v-flex lg8>
        <v-data-table
          :headers="headers"
          :items="items"
          :expanded="[items[0]]"
          item-key="machine"
          
        >
         <template slot="items" slot-scope="props">
                <td>{{ props.item.machine }}</td>
                <td class="text-xs-left">{{ props.item.duration }}</td>
                <td class="text-xs-left">{{ props.item.rate }}</td>
                <td class="text-xs-left">{{ props.item.total }}</td>
        </template>
          <template v-slot:item="{ item, expand, isExpanded }">
                <tr>
                  <td @click="expand(!isExpanded)">
                    {{item.machine}}
                  </td>
                </tr>
            </template>


          <template v-slot:expanded-item="{item }">
            {{ item.name }}
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Customers from "@/api/sales/customers";
import Orders from "@/api/sales/orders";
export default {
  data: () => ({
    country: null,
    customer: null,
    project_Name: null,
    project: null,
    customers: Customers,
    expanded: [],
    singleExpand: false,
    headers: [
      { text: "Machine",value: "machine" },
      { text: "Rate", value: "rate" },
      { text: "Duration", value: "duration" },
      { text: "Total Machine", value: "Total" }
    ],
    items: Orders[0].items[0].cost_Machine
  })
};
</script>