<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg12>PROFORMA INVOICE Nº {{order_Number}}</v-flex>
      <v-flex lg4>

        <v-card class="mb-3">
          <v-toolbar flat dense color="transparent">
            <v-toolbar-title class="subheading ft-200">Customer</v-toolbar-title>
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
            <v-text-field label="Att" placeholder v-model="att_Name" required ref="att_Name"></v-text-field>
            <v-text-field label="Number" placeholder v-model="att_Number" required ref="Att_Number"></v-text-field>
            <v-text-field
              label="Address Line"
              placeholder=""
              v-model="address"
              ref="address"
              counter="50"
              required
            ></v-text-field>
            <v-text-field
              label="Y/ Ref"
              placeholder=""
              v-model="ref"
              ref="ref"
              required
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-flex>

      <v-flex lg8>
        <v-card >
          <v-toolbar flat dense color="transparent">
            <v-toolbar-title class="subheading ft-200">FABRICATION AND SUPPLY OIL BUND WALL SKID</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon class="text--secondary">more_vert</v-icon>
            </v-btn>
          </v-toolbar>

          <v-col cols="12" sm="6" md="4">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="date" label="Date" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <template>
            <v-data-table
              :headers="headers"
              :items="items"

              class="elevation-0 table-striped"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.item }}</td>
                <td class="text-xs-left">{{ props.item.desc }}</td>
                <td class="text-xs-left">{{ props.item.unity }}</td>
                <td class="text-xs-left">{{ props.item.qty }}</td>
                <td class="text-xs-left">{{ props.item.priceUnity }}</td>
                <td class="text-xs-left">{{ props.item.total }}</td>
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
import items from "@/api/sales/orders";


export default {

  data: () => ({
    order_Number: items[0].document,
    country: null,
    date: new Date().toISOString().substr(0, 10),
    customer: '11102',
    att_Name: "Paulo Magazique",
    att_Number: "(+258) 84 864 8231",
    projeto: null,
    address: 'Rua de Chuindi No. 67, Maputo, Mozambique',
    ref:'RFQ No: ',

    customers: Customers,
    headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'Descritpion', value: 'desc' },
        { text: 'UNITS', value: 'unity' },
        { text: 'Qty', value: 'qty' },
        { text: 'UNIT EX-WORK PRICE (MT)', value: 'priceUnity' },
        { text: 'TOTAL EX-WORK PRICE', value: 'total' },

      ],
    items: items[0].items
  }),
  watch: {
    customer: function(customerNew, customerOld) {
      var cust = Customers.filter(d => d.Customer === customerNew);

      if (cust.length > 0) {
        this.att_Name = cust[0].Att_Name;
        this.att_Number = cust[0].Att_Number;
        this.address = cust[0].Address;
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
