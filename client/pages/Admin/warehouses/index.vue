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
        title: "Armazéns",
        headers: [
          { text: "Armazén", value: "code" },
          { text: "Descrição", value: "description" },
          { text: "Morada 1", value: "address1" },
          { text: "Morada 2", value: "address2" },
          { text: "Cidade", value: "city" },
          { text: "Estado", value: "state" },
          { text: "Pais", value: "country" },
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
      this.list.loading = true
      this.list.records = await this.$store.dispatch("getDataAsync", "warehouse");
      this.list.loading = false
    }
  },

  created() {
    this.initData();
  }
  
};
</script>
