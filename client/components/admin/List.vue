<template>
  <v-card>
    <v-card-title>
      {{list.title}}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
      <v-icon @click="gotoRoute('create')" large color="primary">mdi-plus-circle-outline</v-icon>
    </v-card-title>

    <v-card-text class="pa-0">
      <v-data-table
        :headers="list.headers"
        :items="list.records"
        :search="search"
        single-select
        :items-per-page="20"
        :item-key="list.ItemKey"
        class="elevation-0"
        :loading="list.loading"
        :loading-text="list.loadingRecordsText"
      >
        <template v-slot:item.inactive="{ item }">
          <!--v-chip
            small
            :color="item.inactive ? 'error' : 'success'"
            dark
          >{{ item.inactive ? 'inactivo': 'activo' }}</v-chip-->
          <v-icon small v-if="!item.inactive" color="success">mdi-check</v-icon>
          <v-icon small v-else color="error">mdi-close</v-icon>
        </template>

        <template v-slot:item.active="{ item }">
          <v-icon small v-if="item.active" color="success">mdi-check</v-icon>
        </template>

        <template v-slot:item.anual="{ item }">
          <v-icon small v-if="item.anual" color="success">mdi-check</v-icon>
        </template>

        <template v-if="$route.path =='/admin/branches'" v-slot:item.view="{ item }">
          <v-icon color="primary" small @click="showWarehouseDialog(item)">mdi-eye</v-icon>
        </template>

        <template v-if="$route.path =='/admin/warehouses'" v-slot:item.viewLoaciton="{ item }">
          <v-icon color="primary" small @click="vewDetails(item)">mdi-eye</v-icon>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon v-if="$route.path =='/admin/users'" color="warning" small class="mr-2" @click="gotoRoute(item.email)">mdi-pencil</v-icon>
          <v-icon v-else color="warning" small class="mr-2" @click="gotoRoute(item.code)">mdi-pencil</v-icon>
          <v-icon color="error" small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    list: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    search: "",
    users: [],
    userModel: {},
    dialog: false,
    formTitle: "Criar"
  }),

  created() {},

  methods: {
    gotoRoute(param) {
      this.$router.push(`${this.$route.fullPath}/${param}`);
    },

    deleteItem(value) {},

    vewDetails(warehouse) {
      this.$emit("display-warehouse-locations", warehouse);
    },

    showWarehouseDialog(branch) {
      this.$emit("show-warehouse-dialog", branch);
    }
  }
};
</script>
