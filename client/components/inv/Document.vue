<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{form.title}}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon @click="requestCloseForm">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-flex lg12>
              <HeaderDocument-Form v-bind:form = form v-bind:formModel =formModel ></HeaderDocument-Form>
            </v-flex>
            <v-flex lg12>
              <LinesDocument-Form v-bind:form = form v-bind:formModel =formModel></LinesDocument-Form>
            </v-flex>
          </v-card-text>

          <v-card-actions class="pb-3">
            <div class="d-flex">
              <v-switch
                label="Ao Gravar Abre Novo Documento"
                v-model="formModel.isSavingDataAndClose"
              ></v-switch>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="primary" :loading="formModel.isSavingData" @click="submit(1)">Gravar</v-btn>

            <v-btn @click="clearDoc">Clear</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import LinesDocumentForm from "@/components/inv/LinesDocument";
import HeaderDocumentForm from "@/components/inv/HeaderDocument";

export default {
  components: {
    LinesDocumentForm,
    HeaderDocumentForm
  },
  props: {
    formModel: {
      type: Object,
      default: () => ({
        title: "Documentos Internos",
        typeDocument: null,
        date: new Date().toISOString().substr(0, 10),
        docNumber: "",
        typeEntity: "U",
        entity: null,
        businessArea: null,
        Attachs: [],
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
        title: "Documentos Internos",
        typeDocument: null,
        requiredBussinessArea: true,
        requiredExternalDocNumber: true,
        requiredAttachs: false,
        requiredProject: true,
        requiredNotes: true,
        isSelectedProduct:false,
        canAddProduct:true,
        employees: [],
        projects: [],
        businessArea: [],
        docTypes: [],
        products:[],
        unitys:[]
      })
    }
  },
  data: () => ({

  }),
  beforeMount: async function() {
    let doc = this.$router.currentRoute.query["doc"];
    let classifier = this.$router.currentRoute.query["tipo"];

    this.form.employees = await this.$store.dispatch("getDataAsync", 'employees');
    this.form.businessArea = await this.$store.dispatch("getDataAsync", 'businessArea');
    this.form.projects = await this.$store.dispatch("getDataAsync", 'projects');
    this.form.docTypes = await this.$store.dispatch("getDataAsync", 'documenttypes');
    this.form.docTypes = this.form.docTypes.filter(p=> p.code == doc);

    this.formModel.typeDocument = this.form.docTypes[0];
    this.form.isSelectedProduct = this.form.docTypes[0].isSelectedProduct;
    this.form.canAddProduct = this.form.docTypes[0].isSelectedProduct;

    this.form.products = await this.$store.dispatch("getDataAsync", 'products/filters?type=' + this.formModel.typeDocument.typeArticle);
    this.form.unitys =await this.$store.dispatch("getDataAsync", 'units');

    console.log(this.form.projects );
  },
  methods: {
    changeEntity(item) {
      if (!item) {
      } else {
        var buss = item.BusinessArea.filter(d => d.isPrincipal === true);

        if (buss.length > 0) {
          this.formModel.businessArea = buss[0].businessArea;
        }
      }

      this.formModel.items = [];
    },

    clearDoc() {
      this.formModel = {
        title: "Documentos Internos",
        typeDocument: null,
        date: new Date().toISOString().substr(0, 10),
        docNumber: "",
        typeEntity: "Fúncionario",
        entity: null,
        Attachs: [],
        items: []
      };
    },

    requestCloseForm() {
      alert("are you sure want close this form?");
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

    submit() {
      console.log(this.formModel);
      this.formModel.isSavingData = true;
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
