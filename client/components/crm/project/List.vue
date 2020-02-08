<template>
  <v-card>
    <v-card-title>
      Project's
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        single-select
        :items-per-page="20"
        item-key="code"
        class="elevation-0"
      >
        <template v-slot:item.progress="{ item }">
          <v-progress-linear :value="item.progress" height="5" :color="item.color"></v-progress-linear>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon small  @click="detailsItem(item)">mdi-eye</v-icon>
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>

        </template>
      </v-data-table>

      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>
<script>
import {Projects} from "@/api/crm/project";

export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Year", value: "year" },
      { text: "Project", value: "code" },
      { text: "Description", value: "description" },
      { text: "Client", value: "client.name" },
      { text: "Proponent", value: "proponent.name" },
      { text: "Dead Line", value: "deadline" },
      { text: "Progress", value: "progress" },
      { text: "Status", value: "status" },
      { text: "Supervisor", value: "supervisor.name" },
      { text: "Actions", value: "action", sortable: false }
    ],
    items: Projects
  }),
  methods: {
    detailsItem(value){
      this.$router.push('/project/detail?id='+value.code)
    },
    editItem(value){

    },
    deleteItem(value){

    }
  }
};
</script>
