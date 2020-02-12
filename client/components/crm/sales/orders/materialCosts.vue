<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>


      <v-flex lg12>
        <v-card>
          <v-toolbar flat dense color="transparent">
            <v-toolbar-title class="subheading ft-200">Material's</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon class="text--secondary">add</v-icon>
            </v-btn>
          </v-toolbar>
          <template>
            <v-data-table :headers="headers" :items="listMaterials">
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>List's Material's</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px" :v-show="dialog">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                    </template>

                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <!-- <v-text-field v-model="editedItem.material" label="Designation"></v-text-field> -->

                              <v-select
                                id="listMaterials"
                                :items="listMaterials"
                                v-validate="'required'"
                                data-vv-name="editedItem.material"
                                :error-messages="errors.collect('material')"
                                v-model="editedItem.material"
                                label="Designation"
                                required
                                item-text="material"
                                item-value="material"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.fabricatedMaterial.kd_m"
                                label="kg/m or kg/item"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.fabricatedMaterial.meters"
                                label="Meters or qty/item"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.fabricatedMaterial.total"
                                :value="subtotalRow1"
                                label="Total Weight (kg)"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.rawMaterial.length" label="Type"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                type="number"
                                v-model="editedItem.rawMaterial.dim"
                                label="Unit Weight(kg)"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                type="number"
                                v-model="editedItem.rawMaterial.unitWeigt"
                                label="Unit Weight(kg)"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                type="number"
                                v-model="editedItem.rawMaterial.qty"
                                label="Qty"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                type="number"
                                v-model="editedItem.rawMaterial.total_Weigth"
                                :value="subtotalRow2"
                                label="Total Weight (kg)"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                <v-icon small @click="deleteItem(item)">delete</v-icon>
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
import Materials from "@/api/sales/materials";

export default {
  data: () => ({
    order_Number: Items[0].document,
    country: null,
    date: new Date().toISOString().substr(0, 10),
    customer: "11102",

    customers: Customers,
    headers: [
      // {
      //   text: "#",
      //   align: "left",
      //   sortable: false,
      //   value: "id"
      // },
      { text: "Designation", value: "material" },
      { text: "kg/m or kg/item", value: "fabricatedMaterial.kd_m" },
      { text: "Meters or qty/item ", value: "fabricatedMaterial.meters" },
      { text: "Total Weight (kg)", value: "fabricatedMaterial.total" },

      { text: "Type (length/dim. per item)", value: "rawMaterial.length" },
      { text: "Type ", value: "rawMaterial.dim" },
      { text: "Unit Weight(kg)", value: "rawMaterial.unitWeigt" },
      { text: "Qty", value: "rawMaterial.qty" },
      { text: "Total Weight (kg)", value: "rawMaterial.total_Weigth" },
      { text: "Actions", value: "action", sortable: false }
    ],
    items: Items[0].items,
    materials: [],
    listMaterials: Materials,
    project: Items[0].project,
    item: null,
    qty: null,
    design_nr: null,
    name: null,
    dialog: false,
    editedIndex: -1,
    editedItem: {
      material: "",
      fabricatedMaterial: {
        kd_m: 0,
        meters: 0,
        total: 0
      },
      rawMaterial: {
        length: "6",
        dim: "m",
        unitWeigt: 0,
        qty: 0,
        total_Weigth: 0
      }
    },
    defaultItem: {
      material: "",
      fabricatedMaterial: {
        kd_m: 0,
        meters: 0,
        total: 0
      },
      rawMaterial: {
        length: "6",
        dim: "m",
        unitWeigt: 0,
        qty: 0,
        total_Weigth: 0
      }
    }
  }),
  watch: {
    customer: function(customerNew, customerOld) {},
    item: function(itemNew, itemOld) {
      var item = Items[0].items.filter(d => d.item === itemNew);

      if (item.length > 0) {
        this.qty = item[0].qty;
        this.name = item[0].name;
        this.design_nr = item[0].design_nr;
        this.materials = item[0].cost_Materials.items;
      }
    },
    dialog(val) {
      //val || this.close();
    }
  },
  methods: {
    changeCustomer() {},
    updateQuantity(event) {
      //this.editedItem.rawMaterial.qty = event.target.value
      //this.editedItem.rawMaterial.total_Weigth = this.editedItem.rawMaterial.qty * this.form.rawMaterial.unitWeigt
    }
  },
  created() {
    setInterval(this.getNow, 1000);
  },

  computed: {
    subtotalRow1() {
      this.editedItem.fabricatedMaterial.total =
        this.editedItem.fabricatedMaterial.meters *
        this.editedItem.fabricatedMaterial.kd_m;
      return this.editedItem.fabricatedMaterial.total;
    },
    subtotalRow2() {
      this.editedItem.rawMaterial.total_Weigth =
        this.editedItem.rawMaterial.unitWeigt * this.editedItem.rawMaterial.qty;
      return this.editedItem.rawMaterial.total_Weigth;
    },

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
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    editItem(item) {
      this.editedIndex = this.materials.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.materials.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.materials.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.materials[this.editedIndex], this.editedItem);
      } else {
        this.materials.push(this.editedItem);
      }
      this.dialog = false;
      //close()
    }
  }
};
</script>
