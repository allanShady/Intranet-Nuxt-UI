<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-flex>
        <v-row>
          <v-col cols="12" sm="12" :md=" locations.records.length ? 8 : 12">
            <list :list="list" @display-warehouse-locations="updateLocations"></list>
          </v-col>
          <v-col md="4" v-show="locations.records.length">
            <locations-list :list="locations" />
          </v-col>
        </v-row>
      </v-flex>
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
      list: {
        title: "Armazéns",
        headers: [
          { text: "Armazén", value: "code" },
          { text: "Descrição", value: "description" },
          { text: "Morada 1", value: "address1" },
          { text: "Morada 2", value: "address2" },
          { text: "Cidade", value: "city" },
          { text: "Distrito", value: "state" },
          { text: "Pais", value: "country" },
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

      this.updateLocations(this.list.records[0]);
      this.list.loading = false;
    },

    updateLocations(warehouse){
      this.locations.records = warehouse.localizations
      this.locations.warehouse = warehouse.code
    }
  },

  created() {
    this.initData();
  }
};
</script>
