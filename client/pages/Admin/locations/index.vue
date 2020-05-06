<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-flex lg12 sm12 xs12>
        <list :list="list"></list>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import List from "@/components/admin/List";

export default {
  layout: "dashboard",
  middleware: ["custom-auth"],
  components: {
    List
  },
  data() {
    return {
      menu: false,
      list: {
        title: "Localizaçoes",
        headers: [
          { text: "Localização", value: "code" },
          { text: "Armazén", value: "warehouseId" },
          { text: "Descrição", value: "description" },
          { text: "Activo", value: "active" },
          { text: "Anual", value: "anual" },
          { text: "", value: "action", sortable: false }
        ],

        records: [],
        itemKey: "code",
        loading: false
      }
    };
  },

  methods: {
    async initData() {
      this.loading = !this.loading;
      this.list.records = await this.$store.dispatch("getDataAsync", "locations");
      this.loading = !this.loading;
    }
  },

  created() {
    this.initData();
  }
  
};
</script>
