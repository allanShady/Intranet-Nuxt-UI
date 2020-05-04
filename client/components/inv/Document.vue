<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar height="35px" color="primary" dark>
            <v-toolbar-title>{{form.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="requestCloseForm">close</v-icon>
          </v-toolbar>

          <v-card-text>
            <v-flex lg12>
              <HeaderDocument-Form
                v-bind:form="form"
                @search-entities="searchEntities"
                v-bind:formModel="formModel"
              ></HeaderDocument-Form>
            </v-flex>
            <v-flex lg12>
              <LinesDocument-Form v-bind:form="form" v-bind:formModel="formModel"></LinesDocument-Form>
            </v-flex>
          </v-card-text>

          <v-card-actions class="pb-3">
            <div class="d-flex">
              <v-switch
                label="Ao gravar abrir novo documento"
                v-model="formModel.isSavingDataAndClose"
              ></v-switch>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="primary" small :loading="formModel.isSavingData" @click="submit(1)">Gravar</v-btn>

            <v-btn @click="clearDoc" small>Limpar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <!-- File upload snack bar reporting -->
      <v-snackbar v-model="snackBar.show" top :color="snackBar.color" :timeout="snackBar.timeout">
        {{ snackBar.display_message }}
        <v-btn small text @click="snackBar.show = false">Close</v-btn>
      </v-snackbar>

      <!-- Document snack bar -->
      <v-snackbar
          v-model="docSnackBar.show"
          :bottom="docSnackBar.bottom"
          :color="docSnackBar.color"
          :left="docSnackBar.left"
          :right="docSnackBar.right"
          :timeout="docSnackBar.timeout"
          :top="docSnackBar.top"
        >
          {{ docSnackBar.display_message }}
          <v-btn text @click="docSnackBar.show = false">Close</v-btn>
        </v-snackbar>
      <!-- end snack bar-->
    </v-layout>
  </v-container>
</template>

<script>
import LinesDocumentForm from "@/components/inv/LinesDocument";
import HeaderDocumentForm from "@/components/inv/HeaderDocument";
import ppcServices from "@/services/ppcServices.js";

export default {
  components: {
    LinesDocumentForm,
    HeaderDocumentForm
  },
  props: {
    formModel: {
      type: Object,
      default: () => ({
        title: "Documentos internos",
        documenttype: {},
        loadingEntity: false,
        date: new Date().toISOString().substr(0, 10),
        referenceDoc: "",
        typeEntity: "U",
        entity: null,
        businessArea: null,
        attachement: [],
        createdBy: "Guimarães Mahota",
        createdAt: new Date().toISOString(),
        isSavingDataAndClose: false,
        isSavingData: false,
        items: []
      })
    },
    form: {
      type: Object,
      default: () => ({
        title: "Documentos internos",
        typeDocument: null,
        loadingEntity: false,
        requiredBussinessArea: true,
        requiredExternalDocNumber: true,
        requiredAttachs: false,
        requiredProject: true,
        requiredNotes: true,
        isSelectedProduct: false,
        canAddProduct: true,
        employees: [],
        product_suppliers: [],
        projects: [],
        businessArea: [],
        docTypes: [],
        products: [],
        unitys: [],
        rulesQuantity: {
          required: value => !!value || "Required.",
          loanMin: value => value >= 0 || "Quantidade não pode ser menor de 0",
          loanMax: value =>
            value <= 50000 || "Quantidade não pode ser menor de 50000"
        }
      })
    }
  },
  data: () => ({
    snackBar: {
      show: false,
      color: "cyan darken-2",
      display_message: "O upload do anexo foi terminado com sucesso",
      timeout: 6000
    },

    docSnackBar: {
    show: false,
    color: 'info',
    display_message: '',
    timeout: 3000,
    Bottom: true,
    left: true,
    right: false,
    top: false,
  }, 
  }),

  beforeMount: async function() {
    let doc = this.$router.currentRoute.query["doc"];
    let classifier = this.$router.currentRoute.query["tipo"];

    /*this.form.employees = await this.$store.dispatch(
      "getDataAsync",
      "employees"
    );*/

    this.form.businessArea = await this.$store.dispatch(
      "getDataAsync",
      "businessArea"
    );
    this.form.projects = await this.$store.dispatch("getDataAsync", "projects");

    this.form.docTypes = await this.$store.dispatch(
      "getDataAsync",
      "documenttypes"
    );
    this.form.docTypes = this.form.docTypes.filter(p => p.code == doc);

    //Call state action to
    this.$store.dispatch("setCurrentDocument", this.form.docTypes[0]);

    this.formModel.documenttype = this.form.docTypes[0];
    this.form.isSelectedProduct = this.form.docTypes[0].isSelectedProduct;
    this.form.canAddProduct = this.form.docTypes[0].isSelectedProduct;

    this.form.unitys = await this.$store.dispatch("getDataAsync", "units");
  },

  methods: {
    async redirectDashboard() {
      let doc = this.$router.currentRoute.query["doc"];
      let classifier = this.$router.currentRoute.query["tipo"];

      var url = `/inventory/EFGC/Dashboard?id=${classifier}`;

      this.$router.push(url);
    },

    async searchEntities(value) {
      this.form.loadingEntity = true

      if (this.$route.query.doc === "DRGAS")
        this.form.product_suppliers = await this.$store.dispatch(
          "getDataAsync",
          `products/suppliers?supplier=${value}`
        );
      else {
        this.form.employees = await this.$store.dispatch(
          "getDataAsync",
          `entities?SearchTerm=${value}`
        );
      }

      this.form.loadingEntity = false
    },

    async clearDoc() {
      this.formModel = {
        documenttype: this.formModel.documenttype,
        date: new Date().toISOString().substr(0, 10),
        referenceDoc: "",
        typeEntity: "U",
        entity: null,
        businessArea: null,
        attachement: [],
        createdBy: "Guimarães Mahota",
        createdAt: new Date().toISOString(),
        isSavingDataAndClose: false,
        isSavingData: false,
        items: []
      };
    },

    requestCloseForm() {
      alert("are you sure want close this form?");

      this.redirectDashboard();
    },
    filterCodeName(item, queryText, itemText) {
      if (!queryText) return "";

      const textOne = item.code.toLowerCase();
      const textTwo = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },

    filterCodeDesc(item, queryText, itemText) {
      if (!queryText) return "";

      const textOne = item.code.toLowerCase();
      const textTwo = item.description.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },

    prepareItems4_DPPC_doc(items) {
      items.forEach(element => {
        element.status_id = element.status.code
      });

      return items;
    },

    prepareItems4_DRGAS_doc(items) {

      let itemsToSave = [];

      items.forEach(element => {
        itemsToSave.push({
          product_id: element.id,
          description: element.description,
          unit_id: element.Unity ? element.Unity.base || "UN" : "UN",
          status_id: element.status.code || element.status_id,
          notes: "Reabastecimento da botija",
          in_out: this.formModel.documenttype.type,
          factor: 1,
          branch_id: localStorage.branch,
          warehouse_id: localStorage.warehouse || "Sede",
          location: localStorage.localization || "Sede"
        });
      });

      console.log('Items to save are -----------: ', itemsToSave);

      return itemsToSave;
    },

    async uploadFile(subDirectory, ownerId) {
      const formData = new FormData();

      formData.append("files", this.formModel.attachments);

      if (this.formModel.attachments && ownerId) {
        await this.$store
          .dispatch("postDataWithCustomHeaderAsync", {
            api_resourse: `file/upload/${subDirectory}/${ownerId}`,
            post_data: formData,
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(resp => {
            console.log(resp);
          });
      }
    },

    async submit() {
      let details = [];

      let typeArticle = this.formModel.documenttype.typeArticle;

      if (this.formModel.documenttype.type == "E") {
        details = this.formModel.selected;
      } else {
        details = this.formModel.items;
      }

      const post_data = {
        from_warehouse_id: null,
        document_type_id: this.formModel.documenttype.code,
        entity_id: !this.formModel.entity ? null : this.formModel.entity.code,
        entity_name: !this.formModel.entity ? null : this.formModel.entity.name,
        business_area_id: !this.formModel.businessArea
          ? null
          : this.formModel.businessArea.code,
        date: this.formModel.date,
        reference_doc: this.formModel.referenceDoc,
        entity_type: this.formModel.typeEntity || null,
        attachement:
          this.formModel.attachement.length || "note attached any doc",
        details: this.formModel.items
      };

      if (this.$route.query.doc === "DRGAS") {
        post_data.details = this.prepareItems4_DRGAS_doc(this.formModel.items);
        post_data.entity_id = null;
        post_data.supplier_id = !this.formModel.entity
          ? null
          : this.formModel.entity.code;
      } else if (this.$route.query.doc === "DPPC" || this.$route.query.doc === "DE" || this.$route.query.doc === "DF") {
        if(this.$route.query.doc === "DE" || this.$route.query.doc === "DF")
          post_data.details = this.formModel.pending_selected_items
        else if(this.$route.query.doc === 'DPPC')
          post_data.details = this.prepareItems4_DPPC_doc(this.formModel.pending_selected_items)

      } else if(this.$route.query.doc === "SE" || this.$route.query.doc === "SF")
        post_data.details = ppcServices.prepareLinesToSave(
          this.formModel.items
        );

      this.formModel.isSavingData = true;

      await this.$store
        .dispatch("postDataAsync", { api_resourse: "stocks", post_data })
        .then(async response => {
          //Pass value for the globally snack bar
            this.docSnackBar.color = 'success'
            this.docSnackBar.display_message = `${this.formModel.documenttype.code} - gravado com sucesso. Fazendo upload dos ficheiros`
            this.docSnackBar.timeout = 12000
            this.docSnackBar.Bottom = true
            this.docSnackBar.left = true
            this.docSnackBar.right = false
            this.docSnackBar.top = false
            this.docSnackBar.show = true
          
          //Upload file
          await this.uploadFile(this.$route.query.tipo, response.id).then(
            res => {
              this.snackBar.show = true;
              //2. Update document file
              this.formModel.isSavingData = !this.formModel.isSavingData;

              if (this.isSavingDataAndClose == true) {
                this.redirectDashboard();
              } else {
                this.clearDoc();
              }
            }
          );
        })
        .catch(error => {
            console.log("Erro: ", error);
            this.docSnackBar.color = "error"
            this.docSnackBar.display_message = `Erro ao gravar - ${this.$route.query.doc}.`
            this.docSnackBar.timeout = 7000
            this.docSnackBar.Bottom = true
            this.docSnackBar.left = true
            this.docSnackBar.right = false
            this.docSnackBar.top = false
            this.docSnackBar.show = true
        });
    },
    //==============================================================================================================================================
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    }
  },

  computed: {
    location: () => window.location
  }
};
</script>
