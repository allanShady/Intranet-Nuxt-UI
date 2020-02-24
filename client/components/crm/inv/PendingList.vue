<template>
  <v-card>
    <v-card-title>
      Pending Documents
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :items-per-page="20"
        item-key="docNumber"
        class="elevation-0"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        show-expand
      >
        <template v-slot:item.progress="{ item }">
          <v-progress-linear :value="item.progress" height="5" :color="item.color"></v-progress-linear>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon small @click="detailsItem(item)">mdi-eye</v-icon>
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>

        <template v-slot:expanded-item="{ headers,item }">
          <td :colspan="headers.length">
            <v-data-table
              :single-select="singleSelect"
              item-key="provider"
              show-select
              :headers="headers2"
              :items="item.items"
              class="elevation-1"
            >
            <template v-slot:item.action="{ item }">

              <v-icon color="teal" small class="mr-2 " @click="editItem(item)">mdi-thumb-up</v-icon>
              <v-icon color="error" small @click="detailsItem(item)">mdi-thumb-down</v-icon>
            </template>

            </v-data-table>
          </td>
        </template>
      </v-data-table>

      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>
<script>
import { Documents } from "@/api/inv/internalDoc";

import { Employees } from "@/api/rh/employments";
import { Projects } from "@/api/crm/project";
import { BusinessArea } from "@/api/base/businessArea";
import { Articles } from "@/api/base/articles";


export default {
  data: () => ({
    expanded: [],
    singleExpand: false,
    singleSelect:false,

    search: "",
    headers: [
      { text: "Date", value: "createdAt" },
      { text: "Requester", value: "requester.name" },
      { text: "Summary", value: "summary" },
      { text: "Bussines Area", value: "businessArea.name" },
      { text: "Progress", value: "progress" },
      { text: "Status", value: "status" },
      { text: "Supervisor", value: "supervisor.name" },
      { text: "Actions", value: "action", sortable: false }
    ],


    items: Documents,

    headers2: [
      { text: "Article", value: "article" },
      { text: "Desc", value: "description" },
      { text: "UN", value: "unity" },
      { text: "Qnt.", value: "quantity" },

      { text: "Project", value: "project" },
      { text: "Notes", value: "notes" },

      { text: "Actions", value: "action", sortable: false }
    ],
  }),
  methods: {
    detailsItem(value) {
      this.$router.push("/inventory/details?id=" + value.code);
    },
    editItem(value) {},
    deleteItem(value) {}
  }
};
</script>
