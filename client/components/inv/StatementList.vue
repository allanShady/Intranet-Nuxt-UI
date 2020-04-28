<template>
  <v-data-table
    :headers="headers"
    :items="items"
    v-model="selected"
    item-key="id"
    class="elevation-1"
    :show-select="isSelectedProduct"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat dense color="transparent">
        <v-toolbar-title>
          <h3>Movimentos</h3>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-col>
          <v-menu
            ref="dateMenu1"
            v-model="dateMenu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="50px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateBegin"
                label="Inicio"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateBegin" no-title @input="dateMenu1 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <v-menu
            ref="dateMenu2"
            v-model="dateMenu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="50px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="dateEnd" label="Fim" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="dateEnd" no-title @input="dateMenu2 = false"></v-date-picker>
          </v-menu>
        </v-col>


        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisa"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="openStatement">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-toolbar>
    </template>

    <template v-slot:no-data>0 - Linhas Em Inventario</template>
  </v-data-table>
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
      { text: "Artigo", value: "Product.code" },
      { text: "Descrição", value: "description" },
      { text: "UN", value: "Unity.code" },
      { text: "Qnt.", value: "quantity" },
      { text: "Funcionário", value: "Entity.name" },
      { text: "Area de Negocio", value: "BusinessArea.description" },
      { text: "Cliente", value: "Project.description" },
      { text: "Estado", value: "status" }
    ]
  }),
  beforeMount: async function() {},
  methods: {
    async openStatement() {
      let doc = this.$router.currentRoute.query["tipo"];

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
    console.log('The statment List was created');
  }
};
</script>
