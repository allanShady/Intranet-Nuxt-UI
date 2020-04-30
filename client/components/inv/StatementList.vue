<template>
  <div>
    <v-container >
      <v-card  tile >
          <v-row no-gutters align="center" justify="space-around">
            <v-col md="2" class="px-4">
            <v-menu class="mr-4" 
              ref="dateMenu1"
              v-model="dateMenu1"
              :close-on-content-click="false"
              transition="scale-transition"
              min-width="50px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field 
                  v-model="dateBegin"
                  label="Data de início "
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dateBegin" no-title @input="dateMenu1 = false"></v-date-picker>
            </v-menu>
             </v-col> 
             <v-col md="2" class="px-4">
            <v-menu
              ref="dateMenu2"
              v-model="dateMenu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="50px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="dateEnd" label="Data de fim" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="dateEnd" no-title @input="dateMenu2 = false"></v-date-picker>
            </v-menu>
             </v-col>
          <v-spacer></v-spacer>
          <v-col md="2" class="px-4">
            <v-btn block color="success"  @click="openStatement">
              <v-icon >mdi-magnify</v-icon>
            </v-btn>
          </v-col>
          </v-row>
          </v-card >
    </v-container>
    <!-- End container -->

    <v-data-table
      :headers="headers"
      :items="items"
      v-model="selected"
      item-key="id"
      class="elevation-1"

      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat dense color="transparent">
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:no-data>0 - Linhas Em Inventario</template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    search: "",
    isLoading: false,
    dateEnd: new Date(Date.now()).toISOString().substr(0, 10),
    dateBegin: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 10),
    dateMenu1: false,
    dateMenu2: false,
    items: [],
    selected: [],
    documentTypes: [],
    isSelectedProduct: true,
    headers: [
      { text: "Data", value: "date" },
      { text: "Documento", value: "DocumentType.code" },
      { text: "Descrição", value: "description" }, // Artigo
      { text: "Número de série", value: "Product.barcode" },
      { text: "Unidade", value: "Unity.code" },
      { text: "Qtd.", value: "quantity" },
      { text: "Funcionário", value: "Entity.name" },
      { text: "Area de negócio", value: "BusinessArea.description" },
      { text: "Entidade", value: "Project.description" },
      { text: "Estado", value: "status" }
    ]
  }),
  beforeMount: async function() {},
  methods: {
    async openStatement() {
      let currentQuery = this.$route.query.tipo;
      console.log(currentQuery);
      let doc = this.$router.currentRoute.query["tipo"];
      console.log(doc);
      this.documentTypes = await this.$store.dispatch(
        "getDataAsync",
        "documenttypes/" + doc
      );
      let warehouseId = localStorage.warehouse;

      var url = `Stocks/filters?warehouseId=${warehouseId}&type=${this.documentTypes[0].typeArticle}&dateBegin=${this.dateBegin}&dateEnd=${this.dateEnd}`;

      this.items = await this.$store.dispatch("getDataAsync", url);

      console.log(this.items);
    }
  },

  created() {
    console.log("The statment List was created");
  }
};
</script>
