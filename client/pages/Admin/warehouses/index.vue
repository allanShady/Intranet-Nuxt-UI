<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-flex>
        
            <list :list="list" @display-warehouse-locations="updateLocations"></list>
      </v-flex>

      <v-dialog
      v-model="dialog"     
       max-width="500px"
      transition="dialog-transition"
    >
      <locations-list :list="locations"/>
    </v-dialog>
    </v-container>
  </div>
</template>

<script>
import List from "@/components/admin/List";
import LocationsList from "@/components/admin/warehouseLocations/list.vue";

export default {
  layout: "dashboard",
  middleware: ["custom-auth"],
  components: {
    List,
    LocationsList
  },
  data() {
    return {
      menu: false,
      dialog: false,
      list: {
        title: "Armazéns",
        headers: [
          { text: "Armazén", value: "code" },
          { text: "Filial", value: "branch" },
          { text: "Descrição", value: "description" },
          { text: "Morada 1", value: "address1" },
          { text: "Morada 2", value: "address2" },
          { text: "Cidade", value: "city" },
          { text: "Distrito", value: "state" },
          { text: "Pais", value: "country" },
          { text: "Localizaçoes", value: "viewLoaciton", align: 'center' },
          { text: "", value: "action", sortable: false }
        ],

        records: [],
        itemKey: "code",
        loading: false
      },
      locations: {
        title: "Localizaçoes",
        warehouse: '',
        headers: [
          { text: "Localização", value: "code" },
          { text: "Descrição", value: "description" }
        ],

        records: [],
        itemKey: "code"
      }
    };
  },

  methods: {
    async initData() {
      this.list.loading = true;
      this.list.records = await this.$store.dispatch(
        "getDataAsync",
        "warehouse"
      );

      this.list.loading = false;
    },

    updateLocations(warehouse){
      this.locations.records = warehouse.localizations
      this.locations.warehouse = warehouse.code
      this.dialog = true
    }
  },

  created() {
    this.initData();
  }
};
</script>
