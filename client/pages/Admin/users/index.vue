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
        title: "Utilizadores",
        headers: [
          { text: "Nome", value: "first_name" },
          { text: "Apelido", value: "last_name" },
          { text: "Email", value: "email" },
          { text: "Celular", value: "phone_number_1" },
          { text: "Estado", value: "inactive" },
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
      this.list.records = await this.$store.dispatch(
        "getDataAsync",
        "auth/users"
      );
      this.list.loading = false
    }
  },

  created() {
    this.initData();
  }
};
</script>
