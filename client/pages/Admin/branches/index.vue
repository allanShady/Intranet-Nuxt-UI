<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-flex lg12 sm12 xs12>
        <list :list="list"  @show-warehouse-dialog="showWarehouse"></list>
      </v-flex>

      <v-dialog
      v-model="dialog"     
       max-width="500px"
      transition="dialog-transition"
    >
      <warehouse-list :list="warehouses"/>
    </v-dialog>
    </v-container>
  </div>
</template>

<script>
import List from "@/components/admin/List";
import WarehouseList from "@/components/admin/branchWarehouses/list.vue";

export default {
  layout: "dashboard",
  middleware: ["custom-auth"],
  components: {
    List, WarehouseList
  },
  data() {
    return {
      menu: false,
      dialog: false,
      list: {
        title: "Filiais",
        headers: [
          { text: "Filial", value: "code" },
          { text: "Descrição", value: "description" },
          { text: "Morada 1", value: "address1" },
          { text: "Morada 2", value: "address2" },
          { text: "Cidade", value: "city" },
          { text: "Estado", value: "state" },
          { text: "Pais", value: "country" },
          { text: "Armazéns", value: "view", sortable: false, align: 'center' },
          { text: "", value: "action", sortable: false }
        ],

        records: [],
        itemKey: "code",
        loading: false
      },
      warehouses: {
        title: "Armazéns",
        branch: '',
        headers: [
          { text: "Armazém", value: "code" },
          { text: "Descrição", value: "description" }
        ],

        records: [],
        itemKey: "code"
      }
    };
  },

  methods: {
    async initData() {
      this.list.loading = true
      this.list.records = await this.$store.dispatch("getDataAsync", "branch");
      this.list.loading = false
    },

    showWarehouse(branch) {
      console.log(branch)
      this.warehouses.records = branch.Warehouses
      this.warehouses.branch = branch.code
      this.dialog = true
    }
  },

  created() {
    this.initData();
  }
};
</script>
