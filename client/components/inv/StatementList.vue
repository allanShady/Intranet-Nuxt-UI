<template>
  <div>
    <v-container >
      <v-card class="pa-2" tile >
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
      class="caption"
      :loading="loadingContent"

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

      <!--Format the date in user friendly-->
      <template v-slot:item.date="{ item }">
          {{item.date.slice(0, 10)}}
      </template>

      <template v-slot:item.StatusDescription="{ item }">
        <v-chip
          outlined
          small
          :color="getColor(item.StatusDescription)"
          class="caption"
        >{{item.StatusDescription}}</v-chip>
      </template>

      <!--View doc attachment-->
      <template v-slot:item.Document="{ item }">
        <!--strong>{{item.Document.attachement_path}}</strong-->
         <a @click="documentAttachmentPath(item.Document.attachement_path)" target="_blank">
          <v-icon color="primary" small >
            mdi-eye
          </v-icon>
          </a>
      </template>

      <template v-slot:no-data> <p color="info">Especifique o intervalo de data e click no botão a direita para listar extracto.</p></template>
    </v-data-table>
  
  <!-- Errors and notifications snack bar reporting -->
      <v-snackbar v-model="snackBar.show" bottom left :color="snackBar.color" :timeout="snackBar.timeout">
        {{ snackBar.display_message }}
        <v-btn small text @click="snackBar.show = false">Close</v-btn>
      </v-snackbar>
    </div>  
</template>
<script>
export default {
  data: () => ({
    search: "",
    loadingContent: false,
    dateEnd: new Date(Date.now()).toISOString().substr(0, 10),
    dateBegin: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 10),
    dateMenu1: false,
    dateMenu2: false,
    items: [],
    selected: [],
    snackBar: {
      show: false,
      color: "error",
      display_message: "",
      timeout: 5000,
      bottom: true,
      left: true,
    },
    documentTypes: [],
    isSelectedProduct: true,
    headers: [
      { text: "Data", value: "date" },
      { text: "Acção", value: "DocumentType.generatedAction" },
      { text: "Funcionário", value: "Entity.name" },
      { text: "Area de negócio", value: "BusinessArea.description" },      
      { text: "Artigo", value: "description" }, // Artigo
      //{ text: "Unidade", value: "Unity.code" },
      { text: "Qtd.", value: "quantity" },  
      { text: "Estado", value: "StatusDescription" },
      { text: "Anexo", value: "Document", align: 'center' },
    ]
  }),
  beforeMount: async function() {},
  methods: {
    getColor(value) {    
      if (value)
        switch (value.split(" ")[1] || value) {
          case "Danificado":
            return "error";
            break;
          case "Lavandaria":
            return "info";
            break;
          case "Armazem":
            return "success";
            break;
          case "Cheio":
            return "success";
            break;
          case "Fúncionario":
            return "warning";
            break;
          default:
            return  "primary"
            break;
        }
    },

    async openStatement() {

      let currentQuery = this.$route.query.tipo;
      //console.log(currentQuery);
      let doc = this.$router.currentRoute.query["tipo"];
      //console.log(doc);
      this.documentTypes = await this.$store.dispatch(
        "getDataAsync",
        "documenttypes/" + doc
      );

      //TODO: Get the warehouse from store not if not available into localstorage and not selected o navbar
      const warehouseId = localStorage.warehouse || this.$store.getters.getWarehouse;

      if(!warehouseId) {
        this.snackBar.display_message = "O Armazém é obrigatório. Por favor preencha esse campo na barra de navegação acima."; 
        this.snackBar.show = true;
        //return;
      }

      var url = `Stocks/filters?warehouseId=${warehouseId}&type=${this.documentTypes[0].typeArticle}&dateBegin=${this.dateBegin}&dateEnd=${this.dateEnd}`;

      this.loadingContent = true;
      this.items = await this.$store.dispatch("getDataAsync", url);
      this.loadingContent = false;

      //console.log(this.items);
    },

    forceFileDownload(response) {
      console.log('response to download', response);
      const url = URL.createObjectURL(response);
      const link = document.createElement('a')

      link.href = url;
      link.target ='_blank'
      
      document.body.appendChild(link)
      link.click()
    },

    async documentAttachmentPath(document) {
      const response = await this.$store.dispatch("fetchFileWithCustomHeaderAsync", `file/DownloadSingle/${encodeURI(document)}`);
      this.forceFileDownload(response);
    }
  },

  created() {
    //Add  the number of bottles
    //TODO: Also add the number of project
    if(this.$route.query.tipo.toLowerCase() == 'gases') {
      this.headers.splice(4, 0,  { text: "Número da botija", value: "Product.barcode" })
      this.headers.splice(5, 0,  { text: "Entidade", value: "Project.description" })
      //this.headers.splice((this.headers.length - 1), 0, { text: "Estado", value: "status" });
    }
    console.log("The statment List was created");
  },

  computed: {
    
  }
};
</script>
